import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AuthState, RootState } from './types';

const selectAuth = <S extends RootState>(state: S): AuthState => state.auth;

const useTypedAuthSelector: TypedUseSelectorHook<RootState> = useSelector;

export default selectAuth;
export { useTypedAuthSelector };
