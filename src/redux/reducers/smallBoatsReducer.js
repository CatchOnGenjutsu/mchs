import {
  GET_BOATS_CARDS_LIST,
  GET_BOAT_CARD_INFO,
  CLEAR_BOAT_CARD_INFO,
  GET_DATA_BY_SEARCH_PARAMS_BOAT,
  SET_SEARCH_PARAMS_BOATS
} from "../types";

const initialState = {
  data: [],
  boatInfo: {},
  searchParams: {
    personSurname: "",
    personName: "",
    personMidname: "",
    regNum: "",
    nameLe: "",
    unp: "",
    boatVin: "",
    engvin: "",
    cardStatus: "Активная",
  }
}

export const smallBoatsReducer = (state = initialState, action) => {
  console.log("smallBoatsReducer >>", action.data)
  switch (action.type) {
    case GET_BOATS_CARDS_LIST:
      return (() => ({
        ...state,
        data: [
          ...action.data
        ],
      }))();
    case GET_BOAT_CARD_INFO:
      return (() => ({
        ...state,
        boatInfo: Object.assign({}, action.data)
      }))();
    case CLEAR_BOAT_CARD_INFO:
      return (() => ({
        ...state,
        boatInfo: Object.assign({}, action.data)
      }))();
    case SET_SEARCH_PARAMS_BOATS:
      return (() => ({
        ...state,
        searchParams: Object.assign(state.searchParams, action.data)
      }))();
    case GET_DATA_BY_SEARCH_PARAMS_BOAT:
      return (() => ({
        ...state,
        data: [
          ...action.data
        ],
      }))();
    default:
      // console.log('выход')
      return state;
  }
};