import { FetchParams, PaginatedResponse } from "../types/api";
import { apiClient } from "./client";
import { PostTopic } from "@/lib/types/post";

export async function getPostTopics(
  token: string,
  params: FetchParams
): Promise<PaginatedResponse<PostTopic>> {
  const response = await apiClient.get("/api/post-topics", {
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

export async function createPostTopic(
  data: { name: string },
  token: string
): Promise<PostTopic> {
  const response = await apiClient.post("/api/post-topics", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
}

export async function updatePostTopic(
  id: number,
  data: { name: string },
  token: string
): Promise<PostTopic> {
  const response = await apiClient.put(`/api/post-topics/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
}

export async function deletePostTopic(
  id: number,
  token: string
): Promise<void> {
  await apiClient.delete(`/api/post-topics/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
