"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import {
  createCustomerContact,
  updateCustomerContact,
  deleteCustomerContact,
  getCustomerContacts,
} from "@/lib/api/customerContacts";
import { customerContactSchema } from "@/lib/schemas/customers";
import { ActionState, FetchParams, PaginatedResponse } from "../types/api";
import { CustomerContact } from "../types/customer";

export async function getCustomerContactsAction(
  params: FetchParams
): Promise<PaginatedResponse<CustomerContact>> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;
  if (!token) {
    throw new Error("Não autorizado");
  }

  const customerContacts = await getCustomerContacts(token, params);
  return customerContacts;
}

export async function createCustomerContactAction(
  _prevState: ActionState | undefined,
  formData: FormData
): Promise<ActionState> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;
  if (!token) return { message: "Não autorizado", success: false };

  const validatedFields = customerContactSchema.safeParse({
    email: formData.get("email"),
    name: formData.get("name"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.issues.map((e) => e.message).join(", "),
      success: false,
    };
  }

  try {
    await createCustomerContact(validatedFields.data, token);
    revalidatePath("/dashboard/customer-contacts");
    return { message: "Contato criado com sucesso!", success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Falha ao criar contato.";
    return { message, success: false };
  }
}

export async function updateCustomerContactAction(
  id: number,
  _prevState: ActionState | undefined,
  formData: FormData
): Promise<ActionState> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;
  if (!token) return { message: "Não autorizado", success: false };

  const validatedFields = customerContactSchema.safeParse({
    email: formData.get("email"),
    name: formData.get("name"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.issues.map((e) => e.message).join(", "),
      success: false,
    };
  }

  try {
    await updateCustomerContact(id, validatedFields.data, token);
    revalidatePath("/dashboard/customer-contacts");
    return { message: "Contato atualizado com sucesso!", success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Falha ao atualizar contato.";
    return { message, success: false };
  }
}

export async function deleteCustomerContactAction(
  id: number
): Promise<ActionState> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;
  if (!token) return { message: "Não autorizado", success: false };

  try {
    await deleteCustomerContact(id, token);
    revalidatePath("/dashboard/customer-contacts");
    return { message: "Contato excluído com sucesso.", success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Falha ao excluir contato.";
    return { message, success: false };
  }
}
