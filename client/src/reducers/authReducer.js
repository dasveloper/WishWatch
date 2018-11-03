import {FETCH_USER, INVALID_LOGIN} from "../actions/types";

export function fetchUser(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;

    default:
      return state;
  }
}

export function fetchUserError(state = null, action) {
  switch (action.type) {
    case INVALID_LOGIN:
      return action.payload || false;
    default:
      return state;
  }
}
