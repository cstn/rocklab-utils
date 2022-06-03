export type AuthError = {
  status: number;
  message: string;
  data?: Record<string, unknown>;
};
