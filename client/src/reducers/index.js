import { combineReducers } from "redux";
import { fetchUser,loginUserError, signupUserError} from "./authReducer";
import {affiliate, affiliateProducts, domainVerified} from "./affiliateReducer";
import {reducer as reduxForm} from 'redux-form';
export default combineReducers({
  auth: fetchUser,
  loginUserError: loginUserError,
  signupUserError: signupUserError,

  affiliate: affiliate,
  affiliateProducts: affiliateProducts,
  form: reduxForm,
  domainVerified: domainVerified
  
});
