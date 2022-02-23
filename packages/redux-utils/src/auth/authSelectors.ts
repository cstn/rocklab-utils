import { RootState } from '../types';

const selectSelf = (state: RootState) => state.auth;

export default selectSelf;
