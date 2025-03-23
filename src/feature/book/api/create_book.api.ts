import { apiPost } from "@/core/api";
import { EndPointEnum } from "@/core/endpoint.enum";
import { handleApiError } from "@/core/handle.api";

interface Props {
  title: string;
  description?: string;
  tags?: string[];
}

export const createBookApi = async (props: Props) => {
  try {
    const result = await apiPost(EndPointEnum.createBook, {
      data: props,
    });
    if (result.success) {
      return result;
    }
    throw result.data;
  } catch (error) {
    return handleApiError(error);
  }
};
