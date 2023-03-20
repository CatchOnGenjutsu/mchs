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
  signName: "",
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
    const sign = action.data.documentsDtos.find(item => item.docnote === "signature")
    console.log("sign >!>!", sign)
    return (() => ({
    ...state,
    boatInfo: Object.assign({}, action.data),
    signName: !!sign ? sign.docname : ""
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
    case "boatArrestsTableColumns":
      return (() => ({
      ...state,
      boatInfo: {
        ...state.boatInfo,
        boatArrests: [action.data.newInfo, ...state.boatInfo.boatArrests]
      },
      }))();
    case "documentsTableColumns":
      console.log("action.data.fileType", action.data.fileType)
      console.log("action.data.newInfo.docname", action.data.newInfo.docname)
      return (() => ({
      ...state,
      boatInfo: {
        ...state.boatInfo,
        documentsDtos: [action.data.newInfo, ...state.boatInfo.documentsDtos],
        signName: action.data.fileType ? action.data.newInfo.docname : ""
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
      case "boatArrestsTableColumns":
        return (() => ({
          ...state,
          boatInfo: {
            ...state.boatInfo,
            boatArrests: [...state.boatInfo.boatArrests.map(item => item.arrId === action.data.newInfo.arrId ? action.data.newInfo : item)]
          },
        }))();
        case "documentsTableColumns":
        return (() => ({
          ...state,
          boatInfo: {
            ...state.boatInfo,
            documentsDtos: [...state.boatInfo.documentsDtos.filter(item => item.docid !== action.data.newInfo)],
            signName: action.data.fileType === "file" ? state.signName : ""
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