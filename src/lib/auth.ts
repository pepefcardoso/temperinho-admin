"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "axios";
import { AuthResponse, AuthState } from "./types/api";
import { loginSchema } from "./schemas/auth";
import { User } from "./types/user";

export async function login(
  prevState: AuthState | undefined,
  formData: FormData
): Promise<AuthState> {
  const validatedFields = loginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.issues.map((e) => e.message).join(", "),
      success: false,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const response = await axios.post<AuthResponse>(
      `${process.env.API_URL}/api/auth/login`,
      { email, password }
    );
    const { token } = response.data;

    const cookieStore = await cookies();
    cookieStore.set("session_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 422) {
      return {
        message: "Credenciais inválidas. Verifique seu e-mail e senha.",
        success: false,
      };
    }
    return {
      message: "Ocorreu um erro. Por favor, tente novamente mais tarde.",
      success: false,
    };
  }

  redirect("/dashboard");
}

export async function logout() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;

  if (token) {
    try {
      await axios.post(
        `${process.env.API_URL}/api/auth/logout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Falha ao fazer logout na API:", error);
    }
  }

  cookieStore.delete("session_token");
  redirect("/login");
}

export async function getSession(): Promise<{ user: User } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;

  if (!token) {
    return null;
  }

  try {
    const response = await axios.get<{ data: User }>(
      `${process.env.API_URL}/api/users/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return { user: response.data.data };
  } catch {
    return null;
  }
}
