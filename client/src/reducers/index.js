import { combineReducers } from "redux";
import authReducer from "./authReducer";
import affiliateReducer from "./affiliateReducer";

export default combineReducers({
  auth: authReducer,
  affiliate: affiliateReducer,
  
});
