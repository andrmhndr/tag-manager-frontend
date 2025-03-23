export interface BaseErrorResponse {
  statusCode?: number;
  success?: boolean;
  data?: any;
  message?: string;
  timestamp?: Date;
  error?: string[] | string;
}

export function handleApiError(error: any): BaseErrorResponse {
  return {
    message:
      error?.response?.data?.message ?? error.message ?? "An error occurred",
    error: error?.response?.data?.error ?? null,
    success: false,
    statusCode: error?.response?.status ?? 400,
    data: error?.response?.data ?? null,
  };
}
