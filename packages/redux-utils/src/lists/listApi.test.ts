import listApi, { ListApiOptions } from './listApi';

type TestItem = {
  id: number;
  name: string;
  description: string;
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
global.fetch = jest.fn();

describe('listApi', () => {
  it('should generate a list Api', () => {
    const options: ListApiOptions = {
      baseUrl: 'https://api.test.local/v2/',
      path: 'test',
      reducerPath: 'test',
      tagType: 'Test',
    };

    const api = listApi<TestItem>(options);

    expect(api.reducerPath).toEqual('test');
    expect(api.reducer).toBeDefined();
    expect(api.useFindAllQuery).toBeDefined();
    expect(api.useFindByQuery).toBeDefined();
    expect(api.useGetAllQuery).toBeDefined();
    expect(api.useGetItemQuery).toBeDefined();
    expect(api.useAddItemMutation).toBeDefined();
    expect(api.useUpdateItemMutation).toBeDefined();
    expect(api.useDeleteItemMutation).toBeDefined();
  });
});
