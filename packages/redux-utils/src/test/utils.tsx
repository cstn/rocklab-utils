import React, { ComponentType, FC, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { Store } from '@reduxjs/toolkit';

type Props = {
  // eslint-disable-next-line react/no-unused-prop-types
  store: Store;
};

const renderWithStore = (ui: ReactElement, options: Omit<RenderOptions, 'wrapper'> & Props): RenderResult => {
  const { store } = options;

  const StoreProvider: FC<Props> = ({ children }) => <Provider store={store}>{children}</Provider>;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return render(ui, { wrapper: StoreProvider as ComponentType });
};

export default renderWithStore;
