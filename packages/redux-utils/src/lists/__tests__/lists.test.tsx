import React from 'react';
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import { configureStore, Store } from '@reduxjs/toolkit';
import { screen, waitFor } from '@testing-library/react';
import renderWithStore from '../../test/utils';
import { listApi } from '../index';

enableFetchMocks();

type TestItem = {
  id: number;
  name: string;
};

const testApi = listApi<TestItem>({
  baseUrl: 'https://api.test.local',
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
      [testApi.reducerPath]: testApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(testApi.middleware),
  });

const TestComponent = () => {
  const { data: items, error, isLoading, isError } = testApi.useGetAllQuery();

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div data-testid="error">{error?.toString()}</div>;
  }

  if (!items?.length) {
    return <div>No items</div>;
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

describe('lists', () => {
  let store: Store;

  beforeEach(() => {
    fetchMock.resetMocks();
    store = setup();
  });

  it('should render loading state', () => {
    fetchMock.mockResponseOnce(JSON.stringify([{ id: 1, name: 'test' }]));

    renderWithStore(<TestComponent />, { store });

    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('should render an error', async () => {
    fetchMock.mockReject(new Error('Could not fetch'));

    renderWithStore(<TestComponent />, { store });

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });
  });

  it('should render a list', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([{ id: 1, name: 'test' }]));

    renderWithStore(<TestComponent />, { store });

    await waitFor(() => {
      expect(screen.getByText('test')).toBeInTheDocument();
    });
  });

  it('should render no items', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]));

    renderWithStore(<TestComponent />, { store });

    await waitFor(() => {
      expect(screen.getByText('No items')).toBeInTheDocument();
    });
  });
});
