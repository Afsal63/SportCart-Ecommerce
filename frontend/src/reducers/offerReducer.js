import {
  OFFER_ADD_FAIL,
  OFFER_ADD_REQUEST,
  OFFER_ADD_SUCCESS,
  OFFER_LIST_FAIL,
  OFFER_LIST_REQUEST,
  OFFER_LIST_RESET,
  OFFER_LIST_SUCCESS,
  OFFER_DELETE_REQUEST,
  OFFER_DELETE_SUCCESS,
  OFFER_DELETE_FAIL,
  OFFER_DELETE_RESET,
  OFFER_ADD_RESET,
  COOPENS_LIST_REQUEST,
  COOPENS_LIST_SUCCESS,
  COOPENS_LIST_FAIL,
  COOPENS_LIST_RESET,
  COOPENS_APPLY_REQUEST,
  COOPENS_APPLY_SUCCESS,
  COOPENS_APPLY_FAIL,
  COOPENS_APPLY_RESET,
  COOPENS_DELETE_REQUEST,
  COOPENS_DELETE_SUCCESS,
  COOPENS_DELETE_FAIL,
  COOPENS_DELETE_RESET,
  COOPEN_ADD_REQUEST,
  COOPEN_ADD_SUCCESS,
  COOPEN_ADD_FAIL,
} from "../constants/offerConstants";

export const offerListReducer = (state = { offerslist: [] }, action) => {
  switch (action.type) {
    case OFFER_LIST_REQUEST:
      return { ...state, loading: true };
    case OFFER_LIST_SUCCESS:
      return { loading: false, offerslist: action.payload };
    case OFFER_LIST_FAIL:
      return { loading: false, error: action.payload.data };
    case OFFER_LIST_RESET:
      return {
        offerslist: [],
      };
    default:
      return state;
  }
};

export const addNewOfferReducer = (state = {}, action) => {
  switch (action.type) {
    case OFFER_ADD_REQUEST:
      return { loading: true };
    case OFFER_ADD_SUCCESS:
      return { loading: false, success: true };
    case OFFER_ADD_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const addNewCouponReducer = (state = {}, action) => {
  switch (action.type) {
    case COOPEN_ADD_REQUEST:
      return { loading: true };
    case COOPEN_ADD_SUCCESS:
      return { loading: false, success: true };
    case COOPEN_ADD_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const offerDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case OFFER_DELETE_REQUEST:
      return { loading: true, success: false };
    case OFFER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case OFFER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case OFFER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const coopenListReducer = (state = { coopensList: [] }, action) => {
  switch (action.type) {
    case COOPENS_LIST_REQUEST:
      return { ...state, loading: true };
    case COOPENS_LIST_SUCCESS:
      return { loading: false, coopensList: action.payload };
      
    case COOPENS_LIST_FAIL:
      return { loading: false, error: action.payload.data };
    case COOPENS_LIST_RESET:
      return {
        offerslist: [],
      };
    default:
      return state;
  }
};

export const applyCoopenReducer = (state = { coopenAppleys: [] }, action) => {
  switch (action.type) {
    case COOPENS_APPLY_REQUEST:
      return { ...state, loading: true };
    case COOPENS_APPLY_SUCCESS:
      return { loading: false, coopenAppleys: action.payload };
    case COOPENS_APPLY_FAIL:
      return { loading: false, error: action.payload.data };
   case COOPENS_APPLY_RESET:
     return{coopenAppleys:[]}
    default:
      return state;
  }
};

export const couponDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COOPENS_DELETE_REQUEST:
      return { loading: true, success: false };
    case COOPENS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case COOPENS_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case COOPENS_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
