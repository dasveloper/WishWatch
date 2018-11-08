import {
    FETCH_PRODUCT,
    FETCH_WATCHLIST
  } from "../actions/types";
  
  export function product(state = null, action) {
    switch (action.type) {
      case FETCH_PRODUCT:
        return action.payload || false;
      default:
        return state;
    }
  }
  export function fetchWatchlist(state = [], action) {
    switch (action.type) {
      case FETCH_WATCHLIST:
        return action.payload || false;
      default:
        return state;
    }
  }