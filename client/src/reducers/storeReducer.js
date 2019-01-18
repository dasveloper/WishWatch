import {
  FETCH_STORE_DETAILS,
  FETCH_STORE_PRODUCTS,
  FETCH_STORE_OFFERS,

  FETCH_STORES
} from "../actions/types";

export function store(state = null, action) {
  switch (action.type) {
    case FETCH_STORE_DETAILS:
      return action.payload || false;
    default:
      return state;
  }
}
export function storeProducts(state = null, action) {
  switch (action.type) {
    case FETCH_STORE_PRODUCTS:
      return action.payload || false;
    default:
      return state;
  }
}
export function storeOffers(state = null, action) {
  switch (action.type) {
    case FETCH_STORE_OFFERS:
      return action.payload || false;
    default:
      return state;
  }
}
export function storeStores(state = [], action) {
  switch (action.type) {
    case FETCH_STORES:
      return action.payload || false;
    default:
      return state;
  }
}
