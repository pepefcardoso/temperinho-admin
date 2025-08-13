import { CustomerContactFormData } from "../schemas/customers";
import { FetchParams, PaginatedResponse } from "../types/api";
import { apiClient } from "./client";
import { CustomerContact } from "@/lib/types/customer";

export async function getCustomerContacts(
  token: string,
  params: FetchParams
): Promise<PaginatedResponse<CustomerContact>> {
  const response = await apiClient.get("/api/contact", {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      page: params.pageIndex + 1,
      per_page: params.pageSize,
      order_by: params.sorting[0]?.id ?? "name",
      order_direction: params.sorting[0]?.desc ? "desc" : "asc",
      search: params.searchTerm,
    },
  });
  return response.data;
}

export async function createCustomerContact(
  data: CustomerContactFormData,
  token: string
): Promise<CustomerContact> {
  const response = await apiClient.post("/api/contact", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
}

export async function updateCustomerContact(
  id: number,
  data: CustomerContactFormData,
  token: string
): Promise<CustomerContact> {
  const response = await apiClient.put(`/api/contact/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
}

export async function deleteCustomerContact(
  id: number,
  token: string
): Promise<void> {
  await apiClient.delete(`/api/contact/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
