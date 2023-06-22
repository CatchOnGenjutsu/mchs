import {
  SET_SEARCH_PARAMS_TRANSPORT_ACCIDENTS,
  GET_DATA_BY_SEARCH_PARAMS_TRANSPORT_ACCIDENTS,
} from "../types";

const initialState = {
  data: [],
  searchParams: {
    section: 0,
    ownerSurname: "",
    ownerName: "",
    ownerMidname: "",
    boatRegNum: "",
    incidentType: 1,
    date1: "",
    date2: "",
    driverDrunk: false,
    incidentPlace: "",
  },
  // newAppDupl: {},
  // personType: null,
  // boatCardAppEngList: [],
  // boatCardAppSpecMarkList: [],
  // boatCardAppDealsList: [],
  // appDecisionData: {},
};

export const TransportAccidentsReportReducer = (state = initialState, action) => {
  console.log(action.data);
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
