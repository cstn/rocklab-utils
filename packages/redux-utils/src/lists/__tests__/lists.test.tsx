import React from 'react';
import { Store } from '@reduxjs/toolkit';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderWithStore from '../../test/utils';
import getErrorMessage from '../../utils/errors';
import setup, { api } from './setup';

xdescribe('lists', () => {
  let store: Store;

  beforeEach(() => {
    store = setup();
  });

  describe('getAll', () => {
    const TestGetAll = () => {
      const { data, error, isLoading, isError } = api.useGetAllQuery();

      if (isLoading) {
        return <div>Loading</div>;
      }

      if (isError) {
        return <div data-testid="error">{getErrorMessage(error)}</div>;
      }

      if (!data?.items?.length) {
        return <div>No items</div>;
      }

      return (
        <ul>
          {data.items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      );
    };

    it('should render loading state', () => {
      renderWithStore(<TestGetAll />, { store });

      expect(screen.getByText('Loading')).toBeInTheDocument();
    });

    it('should render a list', async () => {
      renderWithStore(<TestGetAll />, { store });

      expect(await screen.findByText('one')).toBeInTheDocument();
      expect(await screen.findByText('two')).toBeInTheDocument();
    });
  });

  describe('findAll', () => {
    const TestFindAll = ({ offset, limit }: { offset: number; limit: number }) => {
      const { data, error, isLoading, isError } = api.useFindAllQuery({ offset, limit });

      if (isLoading) {
        return <div>Loading</div>;
      }

      if (isError) {
        return <div data-testid="error">{getErrorMessage(error)}</div>;
      }

      return (
        <div>
          <h1>Result</h1>
          <ul>{data?.items?.map((item) => <li key={item.id}>{item.name}</li>)}</ul>
          <div data-testid="count">{data?.count}</div>
          <div data-testid="total">{data?.total}</div>
        </div>
      );
    };

    it('should render a paginated list', async () => {
      renderWithStore(<TestFindAll limit={1} offset={0} />, { store });

      expect(await screen.findByRole('heading')).toHaveTextContent('Result');
      expect(screen.getByText('one')).toBeInTheDocument();
      expect(screen.queryByText('two')).not.toBeInTheDocument();
      expect(screen.getByTestId('count')).toHaveTextContent('1');
      expect(screen.getByTestId('total')).toHaveTextContent('2');
    });
  });

  describe('FindBy', () => {
    const TestFindBy = ({ name }: { name: string }) => {
      const { data, error, isLoading, isError } = api.useFindByQuery({ name });

      if (isLoading) {
        return <div>Loading</div>;
      }

      if (isError && error) {
        return <div data-testid="error">{getErrorMessage(error)}</div>;
      }

      return (
        <div>
          <h1>Result</h1>
          <ul>{data?.items?.map((item) => <li key={item.id}>{item.name}</li>)}</ul>
          <div data-testid="count">{data?.count}</div>
          <div data-testid="total">{data?.total}</div>
        </div>
      );
    };

    it('should render a filtered list', async () => {
      renderWithStore(<TestFindBy name="two" />, { store });

      expect(await screen.findByRole('heading')).toHaveTextContent('Result');
      expect(screen.getByText('two')).toBeInTheDocument();
      expect(screen.queryByText('one')).not.toBeInTheDocument();
      expect(screen.getByTestId('count')).toHaveTextContent('1');
      expect(screen.getByTestId('total')).toHaveTextContent('2');
    });

    it('should not find anything', async () => {
      renderWithStore(<TestFindBy name="three" />, { store });

      expect(await screen.findByTestId('error')).toHaveTextContent('No items found');
    });
  });
});
