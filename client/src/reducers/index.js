import { combineReducers } from "redux";
import { fetchUser,fetchUserError} from "./authReducer";
import {affiliate, affiliateProducts, domainVerified} from "./affiliateReducer";
import {reducer as reduxForm} from 'redux-form';
export default combineReducers({
  auth: fetchUser,
  fetchUserError: fetchUserError,
  affiliate: affiliate,
  affiliateProducts: affiliateProducts,
  form: reduxForm,
  domainVerified: domainVerified
  
});
