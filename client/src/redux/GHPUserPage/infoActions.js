export const FETCH_INFO_REQUEST = 'FETCH_INFO_REQUEST';
export const FETCH_INFO_SUCCESS = 'FETCH_INFO_SUCCESS';
export const FETCH_INFO_FAILURE = 'FETCH_INFO_FAILURE';
const axios = require('axios');

export const fetchInfoRequest = () => {
  return {
    type: FETCH_INFO_REQUEST
  }
}

export const fetchInfoSuccess = (userinf) => {
  return {
    type: FETCH_INFO_SUCCESS,
    payload: userinf
  }
}

export const fetchInfoFailure = (error) => {
  return {
    type: FETCH_INFO_FAILURE,
    payload: error
  }
}
