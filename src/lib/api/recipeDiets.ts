import { FetchParams, PaginatedResponse } from "../types/api";
import { apiClient } from "./client";
import { RecipeDiet } from "@/lib/types/recipe";

export async function getRecipeDiets(
  token: string,
  params: FetchParams
): Promise<PaginatedResponse<RecipeDiet>> {
  const response = await apiClient.get("/api/recipe-diets", {
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

export async function createRecipeDiet(
  data: { name: string },
  token: string
): Promise<RecipeDiet> {
  const response = await apiClient.post("/api/recipe-diets", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
}

export async function updateRecipeDiet(
  id: number,
  data: { name: string },
  token: string
): Promise<RecipeDiet> {
  const response = await apiClient.put(`/api/recipe-diets/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
}

export async function deleteRecipeDiet(
  id: number,
  token: string
): Promise<void> {
  await apiClient.delete(`/api/recipe-diets/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
