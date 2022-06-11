import { createApi, fetchBaseQuery, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react';
import { FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';

interface Item {
  id: number;
}

interface ListResponse<T> {
  offset: number;
  limit: number;
  total: number;
  count: number;
  items: T[];
}

type ListApiOptions<T, R = unknown> = FetchBaseQueryArgs & {
  path: string;
  reducerPath: string;
  tagType: string;
  transformQueryResponse?: (
    baseQueryReturnValue: R,
    meta: FetchBaseQueryMeta | undefined,
    arg: QueryParams | void
  ) => ListResponse<T> | Promise<ListResponse<T>>;
};

type PaginationParams = { offset: number; limit: number };

const DefaultPaginationParams = { offset: 0, limit: 10 };

type QueryParams = {
  [key: string]: string | number;
};

const listApi = <T extends Item, R = unknown>({
  baseUrl,
  fetchFn,
  path,
  prepareHeaders,
  reducerPath,
  transformQueryResponse,
  tagType,
  ...passThrough
}: ListApiOptions<T, R>) => {
  const api = createApi({
    reducerPath,
    baseQuery: fetchBaseQuery({ baseUrl, prepareHeaders, fetchFn }),
    tagTypes: [tagType],
    endpoints: (builder) => ({
      getAll: builder.query<ListResponse<T>, void>({
        query: () => path,
        providesTags: (result) =>
          result
            ? [...result.items.map(({ id }) => ({ type: tagType, id })), { type: tagType, id: 'LIST' }]
            : [{ type: tagType, id: 'LIST' }],
        transformResponse: transformQueryResponse,
      }),
      findAll: builder.query<ListResponse<T>, PaginationParams>({
        query: ({ offset, limit } = DefaultPaginationParams) => `${path}?offset=${offset}&limit=${limit}`,
        providesTags: (result) =>
          result
            ? [...result.items.map(({ id }) => ({ type: tagType, id })), { type: tagType, id: 'PARTIAL-LIST' }]
            : [{ type: tagType, id: 'PARTIAL-LIST' }],
        transformResponse: transformQueryResponse,
      }),
      findBy: builder.query<ListResponse<T>, QueryParams>({
        query: (params = {}) =>
          Object.keys(params)
            .reduce(
              (acc, param) => (typeof params[param] !== 'undefined' ? `${acc}&${param}=${params[param]}` : acc),
              `${path}?`
            )
            .replace(/\?$/, ''),
        providesTags: (result) =>
          result
            ? [...result.items.map(({ id }) => ({ type: tagType, id })), { type: tagType, id: 'FILTERED-LIST' }]
            : [{ type: tagType, id: 'FILTERED-LIST' }],
        transformResponse: transformQueryResponse,
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
    ...passThrough,
  });

  const {
    endpoints,
    reducer,
    middleware,
    useFindAllQuery,
    useFindByQuery,
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
    useFindByQuery,
    useGetItemQuery,
    useGetAllQuery,
    useAddItemMutation,
    useUpdateItemMutation,
    useDeleteItemMutation,
  };
};

export default listApi;
export { ListApiOptions, ListResponse, PaginationParams, QueryParams };
