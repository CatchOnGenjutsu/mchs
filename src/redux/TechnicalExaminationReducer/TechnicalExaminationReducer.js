import {
  SET_SEARCH_PARAMS_TECH_EXAM,
  GET_DATA_BY_SEARCH_PARAMS_TECH_EXAM,
  SET_SEARCH_PARAMS_BOATS_TECH_EXAM,
  GET_TECH_EXAM_CHANGES_BOAT_CARDS,
} from "../types";

const initialState = {
  data: [],
  searchParams: {
    ownerSurname: "",
    ownerName: "",
    ownerMidname: "",
    appNum: "",
    leUnp: "",
    leName: "",
    section: 0,
    status: 0,
  },
  searchParamsBoatCards: {
    ownerSurname: "",
    ownerName: "",
    ownerMidname: "",
    regNum: "",
    leName: "",
    leUnp: "",
    boatVin: "",
    engvin: "",
  },
  dataBoatCards: [],
  // causersList: [],
  // victimsList: [],
  // newAccidentData: {},
  // personType: "",
  // fileList: [],
};

export const TechnicalExaminationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_PARAMS_TECH_EXAM:
      return (() => ({
        ...state,
        searchParams: Object.assign(state.searchParams, action.data),
      }))();
    case GET_DATA_BY_SEARCH_PARAMS_TECH_EXAM:
      return (() => ({
        ...state,
        data: [...action.data],
      }))();
    case SET_SEARCH_PARAMS_BOATS_TECH_EXAM:
      return (() => ({
        ...state,
        searchParamsBoatCards: Object.assign(state.searchParamsBoatCards, action.data),
      }))();
    case GET_TECH_EXAM_CHANGES_BOAT_CARDS:
      return (() => ({
        ...state,
        dataBoatCards: [...action.data],
      }))();
    default:
      return state;
  }
};
