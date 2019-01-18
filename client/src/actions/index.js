import axios from "axios";
import {
  FETCH_USER,
  FETCH_STORE_DETAILS,
  FETCH_STORE_PRODUCTS,
  FETCH_PRODUCT,
  FETCH_WISHLIST,
  FETCH_STORES
} from "./types";
import { SubmissionError } from "redux-form";

import formValues from "redux-form/lib/formValues";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/auth/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchStoreDetails = storeId => async dispatch => {
  axios
    .get("/store/fetch", {
      params: {
        storeId
      }
    })
    .then(function(response) {
      dispatch({
        type: FETCH_STORE_DETAILS,
        payload: response.data.store
      });
    })
    .catch(function(error) {
      console.log(error);
      dispatch({ type: FETCH_STORE_DETAILS, payload: false });
    });
};
export const fetchStores = userId => async dispatch => {
  axios
    .get("/store/fetchAll", {
      params: {
        userId
      }
    })
    .then(function(response) {
      dispatch({
        type: FETCH_STORES,
        payload: response.data.stores
      });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_STORES, payload: false });
    });
};

export const removeOffers = offers => async dispatch => {
  console.log("remove", offers);
  axios
    .post("/store/removeOffers", {
      offers
    })
    .then(function(response) {
     //console.log(response);
    })
    .catch(function(error) {
     // console.log(error);
    });
};

export const fetchStoreOffers = storeId => async dispatch => {
  axios
    .get("/store/fetchOffers", {
      params: {
        storeId
      }
    })
    .then(function(response) {
      //console.log(response)
      dispatch({
        type: FETCH_STORE_PRODUCTS,
        payload: response.data.offers
      });
    })
    .catch(function(error) {
      //console.log(error)

      dispatch({ type: FETCH_STORE_PRODUCTS, payload: false });
    });
};
export const fetchStoreProducts = storeId => async dispatch => {
  axios
    .get("/store/fetchProducts", {
      params: {
        storeId
      }
    })
    .then(function(response) {
      dispatch({
        type: FETCH_STORE_PRODUCTS,
        payload: response.data.products
      });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_STORE_PRODUCTS, payload: false });
    });
};
export const fetchProduct = (storeId, productId) => async dispatch => {
  axios
    .get("/store/fetchProduct", {
      params: {
        storeId,
        productId
      }
    })
    .then(function(response) {
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

export const fetchWishlist = () => async dispatch => {
  axios
    .get("/user/fetchWishlist")
    .then(function(response) {
      const { wishlist } = response.data;

      dispatch({
        type: FETCH_WISHLIST,
        payload: wishlist
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

export const verifyDomain = (storeId, domain) => async dispatch => {
  axios
    .post("/store/verifyDomain", {
      storeId
    })
    .then(response => {
      dispatch({
        type: FETCH_STORE_DETAILS,
        payload: response.data.success
      });
    })
    .catch(function(error) {
      console.log(error);
      //dispatch({
     //   type: FETCH_STORE_DETAILS,
     //   payload: error.response.data.success
     // });
    });
};
