"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import {
  createRecipeDiet,
  updateRecipeDiet,
  deleteRecipeDiet as deleteDietApi,
} from "@/lib/api/recipeDiets";
import { recipeDietSchema } from "@/lib/schemas/recipeDiet";
import { ActionState } from "../types/api";

export async function createDietAction(
  _prevState: ActionState | undefined,
  formData: FormData
): Promise<ActionState> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;
  if (!token) return { message: "Não autorizado", success: false };

  const validatedFields = recipeDietSchema.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.issues.map((e) => e.message).join(", "),
      success: false,
    };
  }

  try {
    await createRecipeDiet(validatedFields.data, token);
    revalidatePath("/dashboard/recipe-diets");
    return { message: "Dieta criada com sucesso!", success: true };
  } catch (error: any) {
    return {
      message: error.message || "Falha ao criar dieta.",
      success: false,
    };
  }
}

export async function updateDietAction(
  id: number,
  _prevState: ActionState | undefined,
  formData: FormData
): Promise<ActionState> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;
  if (!token) return { message: "Não autorizado", success: false };

  const validatedFields = recipeDietSchema.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.issues.map((e) => e.message).join(", "),
      success: false,
    };
  }

  try {
    await updateRecipeDiet(id, validatedFields.data, token);
    revalidatePath("/dashboard/recipe-diets");
    return { message: "Dieta atualizada com sucesso!", success: true };
  } catch (error: any) {
    return {
      message: error.message || "Falha ao atualizar dieta.",
      success: false,
    };
  }
}

export async function deleteDietAction(id: number): Promise<ActionState> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;
  if (!token) return { message: "Não autorizado", success: false };

  try {
    await deleteDietApi(id, token);
    revalidatePath("/dashboard/recipe-diets");
    return { message: "Dieta excluída com sucesso.", success: true };
  } catch (error: any) {
    return {
      message: error.message || "Falha ao excluir dieta.",
      success: false,
    };
  }
}
