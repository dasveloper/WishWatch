import {
  FETCH_PRODUCT,
  FETCH_WISHLIST,
} from '../actions/types';

export function product(state = null, action) {
  switch (action.type) {
    case FETCH_PRODUCT:
      return action.payload || false;
    default:
      return state;
  }
}
export function fetchWishlist(state = [], action) {
  switch (action.type) {
    case FETCH_WISHLIST:
      return action.payload || false;
    default:
      return state;
  }
}
