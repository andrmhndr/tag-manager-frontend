"use server";

import { apiDelete } from "@/core/api";
import { EndPointEnum } from "@/core/endpoint.enum";
import { handleApiError } from "@/core/handle.api";

export const deleteTagApi = async (id: string) => {
  try {
    const result = await apiDelete(EndPointEnum.deleteTag, { data: { id } });
    if (result.success) {
      return result;
    }
    throw result;
  } catch (error) {
    return handleApiError(error);
  }
};
