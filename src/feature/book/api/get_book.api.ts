"use server";

import { apiGet } from "@/core/api";
import { EndPointEnum } from "@/core/endpoint.enum";
import { handleApiError } from "@/core/handle.api";

export const getBookApi = async ({ id }: { id?: string } = {}) => {
  try {
    const result = await apiGet([EndPointEnum.getBook, id].join("/"));
    if (result.success) {
      return result;
    }

    throw result;
  } catch (error) {
    return handleApiError(error);
  }
};
