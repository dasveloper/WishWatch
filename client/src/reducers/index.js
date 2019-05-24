import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import { fetchUser } from './authReducer';
import {
  store, storeProducts, storeOffers, storeStores,
} from './storeReducer';
import { product, fetchWishlist } from './userReducer';

export default combineReducers({
  auth: fetchUser,
  product,
  affiliateStore: store,
  storeProducts,
  storeOffers,

  form: reduxForm,
  wishlist: fetchWishlist,
  stores: storeStores,
});
