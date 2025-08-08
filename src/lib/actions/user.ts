"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { updateUserProfile, updateUserPassword } from "@/lib/api/user";
import { updateProfileSchema, updatePasswordSchema } from "@/lib/schemas/user";

type ActionState = {
  message?: string;
  success: boolean;
};

export async function updateProfileAction(
  userId: number,
  _prevState: ActionState | undefined,
  formData: FormData
): Promise<ActionState> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;

  if (!token) {
    return { message: "Não autorizado", success: false };
  }

  const imageFile = formData.get("image") as File;
  if (imageFile && imageFile.size === 0) {
    formData.delete("image");
  }

  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = updateProfileSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.issues.map((e) => e.message).join(", "),
      success: false,
    };
  }

  try {
    await updateUserProfile(userId, formData, token);

    revalidatePath("/dashboard/profile");
    revalidatePath("/dashboard");
    return { message: "Perfil atualizado com sucesso!", success: true };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Ocorreu um erro ao atualizar o perfil.";
    return { message: errorMessage, success: false };
  }
}

export async function updatePasswordAction(
  userId: number,
  _prevState: ActionState | undefined,
  formData: FormData
): Promise<ActionState> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;

  if (!token) {
    return { message: "Não autorizado", success: false };
  }

  try {
    const validatedFields = updatePasswordSchema.safeParse(
      Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
      return {
        message: validatedFields.error.issues.map((e) => e.message).join(", "),
        success: false,
      };
    }

    await updateUserPassword(userId, validatedFields.data, token);

    return { message: "Senha atualizada com sucesso!", success: true };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Ocorreu um erro ao atualizar a senha.";
    return { message: errorMessage, success: false };
  }
}
