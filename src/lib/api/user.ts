import { apiClient } from "./client";
import { User } from "../types/user";
import { UpdatePasswordData } from "../schemas/user";

export async function updateUserProfile(
  userId: number,
  formData: FormData,
  token: string
): Promise<{ user: User }> {
  formData.append("_method", "PATCH");

  const response = await apiClient.post<{ data: User }>(
    `/api/users/${userId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return { user: response.data.data };
}

export async function updateUserPassword(
  userId: number,
  data: UpdatePasswordData,
  token: string
): Promise<void> {
  await apiClient.patch(`/api/users/${userId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
