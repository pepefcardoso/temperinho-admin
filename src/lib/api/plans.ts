import { PlanFormData } from "../schemas/finance";
import { FetchParams, PaginatedResponse } from "../types/api";
import { apiClient } from "./client";
import { Plan } from "@/lib/types/plan";

export async function getPlans(
  token: string,
  params: FetchParams
): Promise<PaginatedResponse<Plan>> {
  const response = await apiClient.get("/api/plans", {
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

export async function createPlan(
  data: PlanFormData,
  token: string
): Promise<Plan> {
  const response = await apiClient.post("/api/plans", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
}

export async function updatePlan(
  id: number,
  data: PlanFormData,
  token: string
): Promise<Plan> {
  const response = await apiClient.put(`/api/plans/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
}

export async function deletePlan(id: number, token: string): Promise<void> {
  await apiClient.delete(`/api/plans/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
