import { combineReducers } from "redux";
import { fetchUser} from "./authReducer";
import {store, storeProducts, storeOffers, storeStores} from "./storeReducer";
import {product,fetchWishlist} from "./userReducer";

import {reducer as reduxForm} from 'redux-form';
export default combineReducers({
  auth: fetchUser,
  product: product,
  affiliateStore: store,
  storeProducts: storeProducts,
  storeOffers: storeOffers,

  form: reduxForm,
  wishlist: fetchWishlist,
  stores: storeStores
});
