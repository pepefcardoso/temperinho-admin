import { SubscriptionFormData } from "../schemas/finance";
import { FetchParams, PaginatedResponse } from "../types/api";
import { apiClient } from "./client";
import { Subscription } from "@/lib/types/subscription";

export async function getSubscriptions(
  token: string,
  params: FetchParams
): Promise<PaginatedResponse<Subscription>> {
  const response = await apiClient.get("/api/subscriptions", {
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

export async function createSubscription(
  data: SubscriptionFormData,
  token: string
): Promise<Subscription> {
  const response = await apiClient.post("/api/subscriptions", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
}

export async function updateSubscription(
  id: number,
  data: SubscriptionFormData,
  token: string
): Promise<Subscription> {
  const response = await apiClient.put(`/api/subscriptions/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
}

export async function deleteSubscription(
  id: number,
  token: string
): Promise<void> {
  await apiClient.delete(`/api/subscriptions/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
