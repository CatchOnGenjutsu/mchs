import {
  GET_DUP_SHIP_TICKET_INFO,
  SET_SEARCH_PARAMS_DUP_SHIP_TICKET,
  GET_BOAT_CARD_FOR_DUPLICATE,
  ADD_DATA_FOR_DUPLICATE,
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
    rayonId: 0,
    status: 0,
  },
  newAppDupl: {},
  personType: null,
};

export const DuplicateShipsTicketReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_PARAMS_DUP_SHIP_TICKET:
      return (() => ({
        ...state,
        searchParams: Object.assign(state.searchParams, action.data),
      }))();
    case GET_DUP_SHIP_TICKET_INFO:
      return (() => ({
        ...state,
        data: action.data,
      }))();
    case GET_BOAT_CARD_FOR_DUPLICATE:
      return (() => ({
        ...state,
        newAppDupl: action.data,
        personType: action.data.personType,
      }))();
    case ADD_DATA_FOR_DUPLICATE:
      return (() => ({
        ...state,
        newAppDupl: { ...state.newAppDupl, ...action.data },
      }))();

    default:
      return state;
  }
};
