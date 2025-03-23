"use server";

import { apiPost } from "@/core/api";
import { EndPointEnum } from "@/core/endpoint.enum";
import { handleApiError } from "@/core/handle.api";

interface Props {
  name: string;
  hex: string;
}

export const createTagApi = async (props: Props) => {
  try {
    const result = await apiPost(EndPointEnum.createTag, { data: props });
    if (result.success) {
      return result;
    }
    throw result;
  } catch (error) {
    return handleApiError(error);
  }
};
