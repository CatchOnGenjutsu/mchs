import {
  SET_SEARCH_PARAMS_TRANSPORT_ACCIDENTS,
  GET_DATA_BY_SEARCH_PARAMS_TRANSPORT_ACCIDENTS,
  ADD_NEW_CULPRIT,
  ADD_NEW_INJURED,
  DELETE_NEW_NOTE_ACCIDENT,
  ADD_NEW_ACCIDENT_DATA,
  CLEAR_ACCIDENT_DATA,
  GET_TRANSPORT_ACCIDENT_INFO,
  GET_BOAT_INFO_BY_REGNUM,
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
  newAccidentData: {},
  personType: "",
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
      console.log(action.data);
      switch (action.data.type) {
        case "culpritsList":
          return (() => ({
            ...state,
            culpritsList: [
              ...state.culpritsList.filter((item) => {
                if (item.hasOwnProperty("id")) {
                  if (Number(item.id) !== Number(action.data.id)) return item;
                } else if (item.hasOwnProperty("innerId")) {
                  if (item.innerId !== action.data.id) return item;
                }
              }),
            ],
          }))();
        case "injuredsList":
          return (() => ({
            ...state,
            injuredsList: [...state.injuredsList.filter((item) => item.innerId !== action.data.id)],
          }))();
        default:
          return state;
      }
    case ADD_NEW_ACCIDENT_DATA:
      return (() => ({
        ...state,
        newAccidentData: { ...state.newAccidentData, ...action.data },
      }))();
    case CLEAR_ACCIDENT_DATA:
      return (() => ({
        ...state,
        newAccidentData: action.data,
        culpritsList: [],
        injuredsList: [],
      }))();
    case GET_TRANSPORT_ACCIDENT_INFO:
      return (() => ({
        ...state,
        newAccidentData: { ...state.newAccidentData, ...action.data.responseMain },
        personType: action.data.personType,
        culpritsList: action.data.culpritsList,
        injuredsList: action.data.injuredsList,
      }))();
    case GET_BOAT_INFO_BY_REGNUM:
      return (() => ({
        ...state,
        newAccidentData: { ...state.newAccidentData, ...action.data },
      }))();
    default:
      return state;
  }
};
