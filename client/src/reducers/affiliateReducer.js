import {
  FETCH_AFFILIATE_DETAILS
} from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_AFFILIATE_DETAILS:
      return action.payload || false;
    default:
      return state;
  }
}
