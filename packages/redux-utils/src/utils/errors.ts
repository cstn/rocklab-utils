type ErrorWithMessage = {
  message: string;
};

type ErrorWithDetails = {
  data: {
    message: string;
  };
};

const hasMessage = (error: unknown): error is ErrorWithMessage =>
  typeof error === 'object' &&
  error !== null &&
  'message' in error &&
  typeof (error as Record<string, unknown>).message === 'string';

const hasDetails = (error: unknown): error is ErrorWithDetails =>
  typeof error === 'object' &&
  error !== null &&
  'data' in error &&
  typeof (error as Record<string, unknown>).data === 'object' &&
  (error as Record<string, unknown>).data !== null &&
  'message' in (error as Record<string, object>).data &&
  typeof (error as Record<string, Record<string, unknown>>).data.message === 'string';

const toErrorWithMessage = (error: unknown): ErrorWithMessage => {
  if (hasMessage(error)) {
    return error;
  }

  if (hasDetails(error)) {
    return new Error(error.data.message);
  }

  try {
    return new Error(JSON.stringify(error));
  } catch {
    return new Error(String(error));
  }
};

const getErrorMessage = (error: unknown): string => toErrorWithMessage(error).message;

export default getErrorMessage;
