import { combineReducers } from "redux";
import { fetchUser} from "./authReducer";
import {affiliate, affiliateProducts} from "./affiliateReducer";
import {product,fetchWatchlist} from "./userReducer";

import {reducer as reduxForm} from 'redux-form';
export default combineReducers({
  auth: fetchUser,
  product: product,
  affiliate: affiliate,
  affiliateProducts: affiliateProducts,
  form: reduxForm,
  watchlist: fetchWatchlist
  
});
