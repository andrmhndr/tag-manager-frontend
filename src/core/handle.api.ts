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
    message: error?.message ?? error.message ?? "An error occurred",
    error: error?.error ?? null,
    success: false,
    statusCode: error?.statusCode ?? 400,
    data: error?.data ?? null,
  };
}
