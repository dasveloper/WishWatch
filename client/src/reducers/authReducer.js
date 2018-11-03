import {FETCH_USER, INVALID_LOGIN, INVALID_SIGNUP} from "../actions/types";

export function fetchUser(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;

    default:
      return state;
  }
}

export function loginUserError(state = null, action) {
  switch (action.type) {
    case INVALID_LOGIN:
      return action.payload || false;
    default:
      return state;
  }
}

export function signupUserError(state = null, action) {
  switch (action.type) {
    case INVALID_SIGNUP:
      return action.payload || false;
    default:
      return state;
  }
}