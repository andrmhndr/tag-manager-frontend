"use server";

import { apiGet } from "@/core/api";
import { EndPointEnum } from "@/core/endpoint.enum";
import { handleApiError } from "@/core/handle.api";

export const getTagApi = async ({ id }: { id?: string } = {}) => {
  try {
    const result = await apiGet([EndPointEnum.getTag, id].join("/"));
    if (result.success) {
      return result;
    }
    throw result;
  } catch (error) {
    return handleApiError(error);
  }
};
