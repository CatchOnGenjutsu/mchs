import {
  SET_SEARCH_PARAMS_TRANSPORT_ACCIDENTS,
  GET_DATA_BY_SEARCH_PARAMS_TRANSPORT_ACCIDENTS,
  ADD_NEW_CULPRIT,
  ADD_NEW_INJURED,
  DELETE_NEW_NOTE_ACCIDENT,
} from "../types";

import { v4 as uuidv4 } from "uuid";

const initialState = {
  data: [],
  searchParams: {
    section: 0,
    ownerSurname: "",
    ownerName: "",
    ownerMidname: "",
    boatRegNum: "",
    incidentType: 0,
    date1: "",
    date2: "",
    driverDrunk: 0,
    incidentPlace: "",
  },
  culpritsList: [],
  injuredsList: [],
  // newAppDupl: {},
  // personType: null,
  // boatCardAppEngList: [],
  // boatCardAppSpecMarkList: [],
  // boatCardAppDealsList: [],
  // appDecisionData: {},
};

export const TransportAccidentsReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_PARAMS_TRANSPORT_ACCIDENTS:
      return (() => ({
        ...state,
        searchParams: Object.assign(state.searchParams, action.data),
      }))();
    case GET_DATA_BY_SEARCH_PARAMS_TRANSPORT_ACCIDENTS:
      return (() => ({
        ...state,
        data: [...action.data],
      }))();
    case ADD_NEW_CULPRIT:
      action.data["innerId"] = uuidv4();
      return (() => ({
        ...state,
        culpritsList: [action.data, ...state.culpritsList],
      }))();
    case ADD_NEW_INJURED:
      action.data["innerId"] = uuidv4();
      return (() => ({
        ...state,
        injuredsList: [action.data, ...state.injuredsList],
      }))();
    case DELETE_NEW_NOTE_ACCIDENT:
      switch (action.data.type) {
        case "culpritsList":
          return (() => ({
            ...state,
            culpritsList: [...state.culpritsList.filter((item) => item.innerId !== action.data.id)],
          }))();
        case "injuredsList":
          return (() => ({
            ...state,
            injuredsList: [...state.injuredsList.filter((item) => item.innerId !== action.data.id)],
          }))();
        default:
          return state;
      }
    // case GET_SHIPS_TICKET_DECISION_INFO:
    //   return (() => ({
    //     ...state,
    //     appDecisionData: action.data.data,
    //     boatCardAppEngList: [...action.data.boatCardAppEngList],
    //     boatCardAppDealsList: [...action.data.boatCardAppDealsList],
    //     boatCardAppSpecMarkList: [...action.data.boatCardAppSpecMarkList],
    //   }))();

    default:
      return state;
  }
};
