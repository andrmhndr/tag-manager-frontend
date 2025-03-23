import { apiPut } from "@/core/api";
import { EndPointEnum } from "@/core/endpoint.enum";
import { handleApiError } from "@/core/handle.api";

interface Props {
  _id: string;
  name: string;
  hex: string;
}

export const updateTagApi = async (props: Props) => {
  try {
    const result = await apiPut(EndPointEnum.updateTag, { data: props });
    if (result.success) {
      return result;
    }
    throw result;
  } catch (error) {
    return handleApiError(error);
  }
};
