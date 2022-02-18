import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const getErrorMessage = (error?: SerializedError | FetchBaseQueryError): string | undefined => {
  if (!error) {
    return undefined;
  }

  const fetchError = error as FetchBaseQueryError;

  if (fetchError.data) {
    return (
      (fetchError as { error: string; data: { message: string } }).data.message ||
      (fetchError as { error: string; data: { message: string } }).error
    );
  }

  return (error as SerializedError).message;
};

export default getErrorMessage;
