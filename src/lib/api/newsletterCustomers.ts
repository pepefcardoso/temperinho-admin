import { NewsletterCustomerFormData } from "../schemas/customers";
import { FetchParams, PaginatedResponse } from "../types/api";
import { apiClient } from "./client";
import { NewsletterCustomer } from "@/lib/types/customer";

export async function getNewsletterCustomers(
  token: string,
  params: FetchParams
): Promise<PaginatedResponse<NewsletterCustomer>> {
  const response = await apiClient.get("/api/newsletter", {
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

export async function createNewsletterCustomer(
  data: NewsletterCustomerFormData,
  token: string
): Promise<NewsletterCustomer> {
  const response = await apiClient.post("/api/newsletter", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
}

export async function updateNewsletterCustomer(
  id: number,
  data: NewsletterCustomerFormData,
  token: string
): Promise<NewsletterCustomer> {
  const response = await apiClient.put(`/api/newsletter/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
}

export async function deleteNewsletterCustomer(
  id: number,
  token: string
): Promise<void> {
  await apiClient.delete(`/api/newsletter/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
