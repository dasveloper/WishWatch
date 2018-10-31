import {
  FETCH_AFFILIATE_DETAILS,
  FETCH_AFFILIATE_PRODUCTS
} from "../actions/types";

export function affiliate(state = null, action) {
  switch (action.type) {
    case FETCH_AFFILIATE_DETAILS:
      return action.payload || false;
    default:
      return state;
  }
}
export function affiliateProducts(state = null, action) {
  switch (action.type) {
    case FETCH_AFFILIATE_PRODUCTS:
      return action.payload || false;
    default:
      return state;
  }
}
