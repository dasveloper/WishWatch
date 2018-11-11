import axios from "axios";
import {
  FETCH_USER,
  FETCH_AFFILIATE_DETAILS,
  FETCH_AFFILIATE_PRODUCTS,
  FETCH_PRODUCT,
  FETCH_WATCHLIST,
  FETCH_STORES
} from "./types";
import { SubmissionError } from "redux-form";

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
    })
    .catch(function(error) {
      dispatch({ type: FETCH_AFFILIATE_DETAILS, payload: false });
    });
};
export const fetchStores = userId => async dispatch => {
  axios
    .get("/affiliate/fetchStores", {
      params: {
        userId
      }
    })
    .then(function(response) {
      console.log(response.data);
      console.log("IN");
      console.log(response.data.stores);
      dispatch({
        type: FETCH_STORES,
        payload: response.data.stores
      });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_STORES, payload: false });
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
export const fetchProduct = (storeId, productId) => async dispatch => {
  axios
    .get("/product/fetchProduct", {
      params: {
        storeId,
        productId
      }
    })
    .then(function(response) {
      console.log(response);
      dispatch({
        type: FETCH_PRODUCT,
        payload: response.data.product
      });
    })
    .catch(function(error) {
      console.log(error);
      dispatch({ type: FETCH_PRODUCT, payload: false });
    });
};

export const fetchWatchlist = () => async dispatch => {
  axios
    .get("/user/fetchWatchlist")
    .then(function(response) {
      const { watchlist } = response.data;

      dispatch({
        type: FETCH_WATCHLIST,
        payload: watchlist
      });
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const addToWishlist = (product, history) => async dispatch => {
  axios
    .post("/user/addToWishlist", {
      product
    })
    .then(function(response) {
      history.push("/wishlist");
      dispatch({ type: FETCH_USER, payload: response.data });
    })
    .catch(function(error) {
      // dispatch({ type: FETCH_USER, payload: false });
    });
};

export const signupUser = (values, history) => async dispatch => {
  const { email, password, confirmPassword } = values;

  return axios
    .post("/auth/signup", {
      email,
      password,
      confirmPassword
    })
    .then(response => {
      history.push("/dashboard");
      dispatch({ type: FETCH_USER, payload: response.data });
    })
    .catch(error => {
      throw new SubmissionError({
        _error: error.response.data
      });
    });
};

export const loginUser = (values, history) => async dispatch => {
  const { email, password } = values;
  return axios
    .post("/auth/login", {
      email,
      password
    })
    .then(response => {
      dispatch({ type: FETCH_USER, payload: response.data });
      history.push("/dashboard");
    })
    .catch(error => {
      throw new SubmissionError({
        _error: error.response.data
      });
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
      dispatch({
        type: FETCH_AFFILIATE_DETAILS,
        payload: response.data.success
      });
    })
    .catch(function(error) {
      dispatch({
        type: FETCH_AFFILIATE_DETAILS,
        payload: error.response.data.success
      });
    });
};
