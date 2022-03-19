const HYDRATE = 'hydrate';

type Payload<T> = Record<string, Record<string, T>>;

const createHydrateAction = <T>(payload: Payload<T>) => ({
  type: HYDRATE,
  payload: Object.keys(payload).reduce((reducerPaths, reducerPath) => {
    // eslint-disable-next-line no-param-reassign
    reducerPaths[reducerPath] = {
      queries: Object.keys(payload[reducerPath]).reduce((queries, query) => {
        // eslint-disable-next-line no-param-reassign
        queries[query] = {
          status: 'fulfilled',
          data: payload[reducerPath][query],
        };
        return queries;
      }, {} as Record<string, { status: string; data: T }>),
      mutations: {},
      provided: {},
    };
    return reducerPaths;
  }, {} as Record<string, { queries: Record<string, { status: string; data: T }>; mutations: Record<string, never>; provided: Record<string, never> }>),
});

export { HYDRATE, createHydrateAction };
