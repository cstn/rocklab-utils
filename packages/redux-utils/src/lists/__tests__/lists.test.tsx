import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { screen } from '@testing-library/react';
import nock from 'nock';
import renderWithStore from '../../test/utils';
import { listApi } from '../index';

type TestItem = {
  id: number;
  name: string;
};

const testApi = listApi<TestItem>({
  baseUrl: 'https://api.test.local',
  path: 'items',
  reducerPath: 'test',
  tagType: 'Test',
});

const TestComponent = () => {
  const { data: items, error, isLoading, isError } = testApi.useGetAllQuery();

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div data-testid="error">{error}</div>;
  }

  if (!items?.length) {
    return <div>No items</div>;
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>${item.name}</li>
      ))}
      <li />
    </ul>
  );
};

describe('lists', () => {
  nock('https://api.test.local')
    .get('/items')
    .reply(200, [
      {
        id: 1,
        name: 'one',
      },
    ]);

  const store = configureStore({
    reducer: {
      [testApi.reducerPath]: testApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(testApi.middleware),
  });

  it('should render lists', () => {
    renderWithStore(<TestComponent />, { store });

    expect(screen.getByText('Loading')).toBeInTheDocument();
  });
});
