import React, { ComponentType, FC, ReactElement } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { CurrentUserProvider, User, UserProfile } from '../index';

type Props = {
  // eslint-disable-next-line react/no-unused-prop-types
  profile: UserProfile | undefined;
  // eslint-disable-next-line react/no-unused-prop-types
  user: User | undefined;
};

const renderWithCurrentUser = (ui: ReactElement, options: Omit<RenderOptions, 'wrapper'> & Props): RenderResult => {
  const { user, profile, ...restOptions } = options;

  const Provider: FC<Props> = ({ children }) => (
    <CurrentUserProvider profile={options.profile} user={options.user}>
      {children}
    </CurrentUserProvider>
  );

  return render(ui, { wrapper: Provider as ComponentType, ...restOptions });
};

export default renderWithCurrentUser;
