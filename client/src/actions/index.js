import axios from "axios";
import { FETCH_USER, FETCH_AFFILIATE_DETAILS } from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/auth/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchAffilliateDetails = affiliateId => async dispatch => {
  axios.get("/affiliate/fetchDetails", {
    params: {
      affiliateId
    }
  }).then(function (response) {
    dispatch({ type: FETCH_AFFILIATE_DETAILS, payload: response.data.affiliate });
  })
  .catch(function (error) {
    dispatch({ type: FETCH_AFFILIATE_DETAILS, payload: false });
  });
};
