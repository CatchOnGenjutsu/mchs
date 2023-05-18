import {
  GET_DUP_SHIP_TICKET_INFO,
  SET_SEARCH_PARAMS_BOATS_DUP_SHIP_TICKET,
  SET_SEARCH_PARAMS_DUP_SHIP_TICKET,
  GET_DUP_SHIP_TICKET_BOAT_CARDS,
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
  // searchParamsBoatCards: {
  //   ownerSurname: "",
  //   ownerName: "",
  //   ownerMidname: "",
  //   regNum: "",
  //   nameLe: "",
  //   unp: "",
  //   boatVin: "",
  //   engvin: "",
  // },
  dataBoatCards: [],
};

export const DuplicateShipsTicketReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_PARAMS_DUP_SHIP_TICKET:
      return (() => ({
        ...state,
        searchParams: Object.assign(state.searchParams, action.data),
      }))();
    case SET_SEARCH_PARAMS_BOATS_DUP_SHIP_TICKET:
      console.log(state);
      return (() => ({
        ...state,
        searchParamsBoatCards: Object.assign(state.searchParamsBoatCards, action.data),
      }))();
    case GET_DUP_SHIP_TICKET_INFO:
      return (() => ({
        ...state,
        data: action.data,
      }))();
    // case GET_DUP_SHIP_TICKET_BOAT_CARDS:
    //   return (() => ({
    //     ...state,
    //     dataBoatCards: action.data,
    //   }))();
    default:
      return state;
  }
};
