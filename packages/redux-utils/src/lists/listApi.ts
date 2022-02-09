import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Item {
  id: number;
}

interface ListApiOptions {
  baseUrl: string;
  path: string;
  reducerPath: string;
  tagType: string;
}

interface ListResponse<T> {
  offset: number;
  limit: number;
  total: number;
  count: number;
  data: T[];
}

const listApi = <T extends Item>({ baseUrl, path, reducerPath, tagType }: ListApiOptions) => {
  const api = createApi({
    reducerPath,
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: [tagType],
    endpoints: (builder) => ({
      findAll: builder.query<ListResponse<T>, number>({
        query: (offset = 0, limit = 10) => `${path}?offset=${offset}&limit=${limit}`,
        providesTags: (result) =>
          result
            ? [...result.data.map(({ id }) => ({ type: tagType, id })), { type: tagType, id: 'PARTIAL-LIST' }]
            : [{ type: tagType, id: 'PARTIAL-LIST' }],
      }),
      getAll: builder.query<T[], void>({
        query: () => path,
        providesTags: (result) =>
          result
            ? [...result.map(({ id }) => ({ type: tagType, id })), { type: tagType, id: 'LIST' }]
            : [{ type: tagType, id: 'LIST' }],
      }),
      getItem: builder.query<T, string>({
        query: (id) => `${path}/${id}`,
        providesTags: (result, error, id) => [{ type: tagType, id }],
      }),
      addItem: builder.mutation<T, Partial<T>>({
        query: (body) => ({
          url: path,
          method: 'POST',
          body,
        }),
        invalidatesTags: [{ type: tagType, id: 'LIST' }],
      }),
      updateItem: builder.mutation<void, Pick<T, 'id'> & Partial<T>>({
        query: ({ id, ...patch }) => ({
          url: `${path}/${id}`,
          method: 'PUT',
          body: patch,
        }),
        async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            api.util.updateQueryData('getItem', id as string, (draft) => {
              Object.assign(draft, patch);
            })
          );
          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        },
        invalidatesTags: (result, error, { id }) => [{ type: tagType, id }],
      }),
      deleteItem: builder.mutation<{ success: boolean; id: number }, number>({
        query(id) {
          return {
            url: `${path}/${id}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: (result, error, id) => [{ type: tagType, id }],
      }),
    }),
  });

  const {
    endpoints,
    reducer,
    middleware,
    useFindAllQuery,
    useGetItemQuery,
    useGetAllQuery,
    useAddItemMutation,
    useUpdateItemMutation,
    useDeleteItemMutation,
  } = api;

  return {
    endpoints,
    reducerPath,
    reducer,
    middleware,
    useFindAllQuery,
    useGetItemQuery,
    useGetAllQuery,
    useAddItemMutation,
    useUpdateItemMutation,
    useDeleteItemMutation,
  };
};

export default listApi;
export { ListApiOptions };
