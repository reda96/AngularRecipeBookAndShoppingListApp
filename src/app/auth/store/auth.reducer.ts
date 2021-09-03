import * as fromAppReducer from '../../store/app.reducer';
import * as AuthActions from './auth.actions';
import { User } from '../user.model';
export interface State {
  user: User;
  authError: string;
  loading: boolean;
}
const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const newUser = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return { ...state, authError: null, user: newUser, loading: false };
      break;
    case AuthActions.LOGOUT:
      return { ...state, user: null, loading: false };
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        authError: action.payload,
        user: null,
        loading: false,
      };
    case AuthActions.LOGIN_START:
      return { ...state, authError: null, loading: true };
    case AuthActions.SIGNUP_START:
      return { ...state, authError: null, loading: true };
    case AuthActions.CLEAR_ERROR:
      return { ...state, authError: null };

    default:
      return state;
      break;
  }
}
