import axios from "axios";
import {
  FETCH_USER,
  INVALID_LOGIN,
  FETCH_AFFILIATE_DETAILS,
  FETCH_AFFILIATE_PRODUCTS,
  DOMAIN_VERIFICATION
} from "./types";
import formValues from "redux-form/lib/formValues";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchAffiliateDetails = affiliateId => async dispatch => {
  axios
    .get("/affiliate/fetchDetails", {
      params: {
        affiliateId
      }
    })
    .then(function(response) {
      dispatch({
        type: FETCH_AFFILIATE_DETAILS,
        payload: response.data.affiliate
      });
      if (response.data.affiliate.verified){
        dispatch({
          type: DOMAIN_VERIFICATION,
          payload: true
        });
      }
      else{
        dispatch({
          type: DOMAIN_VERIFICATION,
          payload: false
        });
      }
    })
    .catch(function(error) {
      dispatch({ type: FETCH_AFFILIATE_DETAILS, payload: false });
    });
};

export const fetchAffiliateProducts = affiliateId => async dispatch => {
  axios
    .get("/product/fetchAffiliateProducts", {
      params: {
        affiliateId
      }
    })
    .then(function(response) {
      dispatch({
        type: FETCH_AFFILIATE_PRODUCTS,
        payload: response.data.products
      });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_AFFILIATE_PRODUCTS, payload: false });
    });
};

export const signupUser = (email, password) => async dispatch => {
  axios
    .post("/auth/signup", {
      email,
      password
    })
    .then(function(response) {
      // dispatch({ type: FETCH_AFFILIATE_PRODUCTS, payload: response.data.products });
    })
    .catch(function(error) {
      //dispatch({ type: FETCH_AFFILIATE_PRODUCTS, payload: false });
    });
};

export const loginUser = (values, history) => async dispatch => {
  const { email, password } = values;
  axios
    .post("/auth/login", {
      email,
      password
    })
    .then(response => {
      history.push("/dashboard");
      dispatch({ type: FETCH_USER, payload: response.data });
    })
    .catch(error => {
      dispatch({ type: INVALID_LOGIN, payload: error.response.data });
    });

  //if (res)
  //dispatch({ type: FETCH_USER, payload: res.data });
};

export const verifyDomain = (affiliateId, domain) => async dispatch => {
  
  axios
    .post("/affiliate/verifyDomain", {
      affiliateId
    })
    .then(response => {
      console.log("IN")
        dispatch({ type: DOMAIN_VERIFICATION, payload: response.data.success });
    })
    .catch(function(error) {
      console.log("error", error);
      dispatch({ type: DOMAIN_VERIFICATION, payload: error.response.data.success });
    });
};
