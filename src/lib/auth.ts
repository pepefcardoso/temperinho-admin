"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthState } from "./types/api";
import {
  loginWithCredentials,
  logoutFromApi,
  fetchUserProfile,
} from "./api/auth";
import { User } from "./types/user";
import axios from "axios";
import { cache } from "react";

export async function login(
  _prevState: AuthState | undefined,
  formData: FormData
): Promise<AuthState> {
  try {
    const { token } = await loginWithCredentials(formData);

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
    if (error instanceof Error) {
      return { message: error.message, success: false };
    }
    return {
      message:
        "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.",
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
      await logoutFromApi(token);
    } catch (error) {
      console.error("Falha ao fazer logout na API:", error);
    }
  }

  cookieStore.delete("session_token");
  redirect("/auth/login");
}

export const getSession = cache(
  async (): Promise<{
    user: User;
    token: string;
  } | null> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;

    if (!token) {
      return null;
    }

    try {
      const { user } = await fetchUserProfile(token);
      return { user, token };
    } catch {
      return null;
    }
  }
);
