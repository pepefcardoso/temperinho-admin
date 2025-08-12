import { PaymentMethodFormData } from "../schemas/finance";
import { FetchParams, PaginatedResponse } from "../types/api";
import { apiClient } from "./client";
import { PaymentMethod } from "@/lib/types/paymentMethod";

export async function getPaymentMethods(
  token: string,
  params: FetchParams
): Promise<PaginatedResponse<PaymentMethod>> {
  const response = await apiClient.get("/api/payment-methods", {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      page: params.pageIndex + 1,
      per_page: params.pageSize,
      order_by: params.sorting[0]?.id ?? "due_date",
      order_direction: params.sorting[0]?.desc ? "desc" : "asc",
      search: params.searchTerm,
    },
  });
  return response.data;
}

export async function createPaymentMethod(
  data: PaymentMethodFormData,
  token: string
): Promise<PaymentMethod> {
  const response = await apiClient.post("/api/payment-methods", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
}

export async function updatePaymentMethod(
  id: number,
  data: PaymentMethodFormData,
  token: string
): Promise<PaymentMethod> {
  const response = await apiClient.put(`/api/payment-methods/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
}

export async function deletePaymentMethod(
  id: number,
  token: string
): Promise<void> {
  await apiClient.delete(`/api/payment-methods/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
