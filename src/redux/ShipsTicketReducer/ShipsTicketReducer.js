import {
  SET_SEARCH_PARAMS_SHIPS_TICKET,
  GET_SHIPS_TICKET_INFO,
  GET_BOAT_CARD_FOR_DUPLICATE,
  ADD_DATA_FOR_DUPLICATE,
  GET_SHIPS_TICKET_DECISION_INFO,
} from "../types";

const initialState = {
  data: [],
  searchParams: {
    surname: "",
    name: "",
    midname: "",
    regNum: "",
    unp: "",
    nameLe: "",
    section: 0,
    status: 0,
  },
  newAppDupl: {},
  personType: null,
  boatCardAppEngList: [],
  boatCardAppSpecMarkList: [],
  boatCardAppDealsList: [],
  appDecisionData: {},
};

export const ShipsTicketReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_PARAMS_SHIPS_TICKET:
      return (() => ({
        ...state,
        searchParams: Object.assign(state.searchParams, action.data),
      }))();
    case GET_SHIPS_TICKET_INFO:
      return (() => ({
        ...state,
        data: action.data,
      }))();
    // case GET_BOAT_CARD_FOR_DUPLICATE:
    //   return (() => ({
    //     ...state,
    //     newAppDupl: action.data,
    //     personType: action.data.personType,
    //   }))();
    // case ADD_DATA_FOR_DUPLICATE:
    //   return (() => ({
    //     ...state,
    //     newAppDupl: { ...state.newAppDupl, ...action.data },
    //   }))();
    case GET_SHIPS_TICKET_DECISION_INFO:
      return (() => ({
        ...state,
        appDecisionData: action.data.data,
        boatCardAppEngList: [...action.data.boatCardAppEngList],
        boatCardAppDealsList: [...action.data.boatCardAppDealsList],
        boatCardAppSpecMarkList: [...action.data.boatCardAppSpecMarkList],
      }))();

    default:
      return state;
  }
};
