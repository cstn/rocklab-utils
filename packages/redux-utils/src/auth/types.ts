export type AuthError = {
  message: string;
  status?: number;
  statusText?: string;
  error?: string;
  description?: string;
  data?: Record<string, never>;
};

export type Credentials = {
  username: string;
  password: string;
};

export type Account = {
  email: string;
  username: string;
  password: string;
};

export type Payload = Record<string, never>;

export type Response = {
  status: number;
  statusText: string;
  data?: Payload;
};

export type AuthOptions = {
  transformError?: (response: unknown) => AuthError;
};

export type AuthAPI = {
  login: (credentials: Credentials) => Promise<Response>;
  logout: () => Promise<Response>;
  session: (token: string) => Promise<Response>;
  register: (account: Account) => Promise<Response>;
  confirmAccount: (userId: string, token: string) => Promise<Response>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<Response>;
  requestPassword: (email: string) => Promise<Response>;
  resetPassword: (token: string, newPassword: string) => Promise<Response>;
};
