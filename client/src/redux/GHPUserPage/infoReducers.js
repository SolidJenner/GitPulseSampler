import { FETCH_INFO_REQUEST, FETCH_INFO_SUCCESS, FETCH_INFO_FAILURE } from './infoActions';

const initialState = {
  userinf: {},
  loading: false,
  error: null
}

export const infoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INFO_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        userinf: action.payload
      }
    case FETCH_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export default infoReducer;