import {
  GET_BOATS_CARDS_LIST,
  GET_BOAT_CARD_INFO,
  CLEAR_BOAT_CARD_INFO,
  GET_DATA_BY_SEARCH_PARAMS_BOAT,
  SET_SEARCH_PARAMS_BOATS,
  ADD_NEW_BOAT_INFO,
  EDIT_BOAT_INFO
} from "../types";

const initialState = {
  data: [],
  boatInfo: {},
  searchParams: {
  ownerSurname: "",
  ownerName: "",
  ownerMidname: "",
  regNum: "",
  leName: "",
  leUnp: "",
  boatVin: "",
  engvin: "",
  cardStatusCode: 1,
  }
}

export const smallBoatsReducer = (state = initialState, action) => {
  console.log("smallBoatsReducer >>>", action.data)
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
  case ADD_NEW_BOAT_INFO:
    switch (action.data.tableType) {
    case "dealsHistoryTableColumns":
      return (() => ({
      ...state,
      boatInfo: {
        ...state.boatInfo,
        boatDeals: [...state.boatInfo.boatDeals, action.data.newInfo]
      },
      }))();
    case "specialMarksTableColumns":
      return (() => ({
      ...state,
      boatInfo: {
        ...state.boatInfo,
        specMarks: [...state.boatInfo.specMarks, action.data.newInfo]
      },
      }))();

    default:
      break;
    }
  break;
  case EDIT_BOAT_INFO:
    switch (action.data.tableType) {
    case "dealsHistoryTableColumns":
      console.log("smallBoatsReducer >>", action.data.newInfo)
      return (() => ({
      ...state,
      boatInfo: {
        ...state.boatInfo,
        boatDeals: [...state.boatInfo.boatDeals.map(item => item.dealId === action.data.newInfo.dealId ? action.data.newInfo : item)]
      },
      }))();
    case "specialMarksTableColumns":
      return (() => ({
      ...state,
      boatInfo: {
        ...state.boatInfo,
        specMarks: [...state.boatInfo.specMarks.map(item => item.bsmId === action.data.newInfo.bsmId ? action.data.newInfo : item)]
      },
      }))();
    default:
      break;
    }
    break;
  default:
    return state;
  }
};