import { configureStore, Store } from '@reduxjs/toolkit';
import { listApi } from '../index';

type TestItem = {
  id: number;
  name: string;
};

const api = listApi<TestItem>({
  baseUrl: '/',
  prepareHeaders: (headers) => {
    headers.set('authorization', `Bearer test`);
    return headers;
  },
  path: 'items',
  reducerPath: 'test',
  tagType: 'Test',
});

const setup = (): Store =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  });

export default setup;
export { api };
