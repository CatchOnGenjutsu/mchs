import { SET_SEARCH_PARAMS_TRANSPORT_ACCIDENTS } from "../types";

const initialState = {
  data: [],
  searchParams: {
    section: 0,
    fio: "",
    regNum: "",
    vid: 0,
    dateS: "",
    datePo: "",
    alco: 0,
    accidentPlace: "",
  },
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
    // case GET_SHIPS_TICKET_INFO:
    //   return (() => ({
    //     ...state,
    //     data: action.data,
    //   }))();

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
