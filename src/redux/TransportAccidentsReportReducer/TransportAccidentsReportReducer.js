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
  DELETE_ACCIDENT_FILE,
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
  causersList: [],
  victimsList: [],
  newAccidentData: {},
  personType: "",
  fileList: [],
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
        causersList: [action.data, ...state.causersList],
      }))();
    case ADD_NEW_INJURED:
      action.data["innerId"] = uuidv4();
      return (() => ({
        ...state,
        victimsList: [action.data, ...state.victimsList],
      }))();
    case DELETE_NEW_NOTE_ACCIDENT:
      console.log(action.data);
      switch (action.data.type) {
        case "causersList":
          return (() => ({
            ...state,
            causersList: [
              ...state.causersList.filter((item) => {
                if (item.hasOwnProperty("id")) {
                  if (Number(item.id) !== Number(action.data.id)) return item;
                } else if (item.hasOwnProperty("innerId")) {
                  if (item.innerId !== action.data.id) return item;
                }
              }),
            ],
          }))();
        case "victimsList":
          return (() => ({
            ...state,
            victimsList: [
              ...state.victimsList.filter((item) => {
                if (item.hasOwnProperty("id")) {
                  if (Number(item.id) !== Number(action.data.id)) return item;
                } else if (item.hasOwnProperty("innerId")) {
                  if (item.innerId !== action.data.id) return item;
                }
              }),
            ],
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
        causersList: [],
        victimsList: [],
        personType: "",
        fileList: [],
      }))();
    case DELETE_ACCIDENT_FILE:
      return (() => ({
        ...state,
        fileList: [...state.fileList.filter((item) => Number(item.docid) !== Number(action.data))],
      }))();
    case GET_TRANSPORT_ACCIDENT_INFO:
      return (() => ({
        ...state,
        newAccidentData: { ...state.newAccidentData, ...action.data.responseMain },
        personType: action.data.personType,
        causersList: action.data.causersList,
        victimsList: action.data.victimsList,
        fileList: action.data.fileList,
      }))();
    case GET_BOAT_INFO_BY_REGNUM:
      return (() => ({
        ...state,
        newAccidentData: { ...state.newAccidentData, ...action.data.data },
        personType: action.data.personType,
      }))();
    default:
      return state;
  }
};
