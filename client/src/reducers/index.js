import { combineReducers } from "redux";
import authReducer from "./authReducer";
import {affiliate, affiliateProducts} from "./affiliateReducer";

export default combineReducers({
  auth: authReducer,
  affiliate: affiliate,
  affiliateProducts: affiliateProducts
  
});
