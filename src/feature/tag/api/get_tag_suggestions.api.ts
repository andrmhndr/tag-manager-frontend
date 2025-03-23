import { apiGet } from "@/core/api";
import { EndPointEnum } from "@/core/endpoint.enum";
import { handleApiError } from "@/core/handle.api";
import React from "react";

interface Props {
  search: string;
}

export const getTagSuggestionsApi = async (props: Props) => {
  try {
    const result = await apiGet(EndPointEnum.getTagSuggestions, {
      params: { ...props },
    });
    if (result.success) {
      return result;
    }
    throw result;
  } catch (error) {
    return handleApiError(error);
  }
};
