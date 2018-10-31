import axios from "axios";
import { FETCH_USER, FETCH_AFFILIATE_DETAILS, FETCH_AFFILIATE_PRODUCTS } from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchAffiliateDetails = affiliateId => async dispatch => {
  axios.get("/affiliate/fetchDetails", {
    params: {
      affiliateId
    }
  }).then(function (response) {
    console.log(response);
    dispatch({ type: FETCH_AFFILIATE_DETAILS, payload: response.data.affiliate });
  })
  .catch(function (error) {
    dispatch({ type: FETCH_AFFILIATE_DETAILS, payload: false });
  });
};



export const fetchAffiliateProducts = affiliateId => async dispatch => {
  axios.get("/product/fetchAffiliateProducts", {
    params: {
      affiliateId
    }
  }).then(function (response) {
    console.log(response);
    dispatch({ type: FETCH_AFFILIATE_PRODUCTS, payload: response.data.products });
  })
  .catch(function (error) {
    console.log(error);

    dispatch({ type: FETCH_AFFILIATE_PRODUCTS, payload: false });
  });
};