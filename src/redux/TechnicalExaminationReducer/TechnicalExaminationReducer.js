import { SET_SEARCH_PARAMS_TECH_EXAM, GET_DATA_BY_SEARCH_PARAMS_TECH_EXAM } from "../types";

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
  causersList: [],
  victimsList: [],
  newAccidentData: {},
  personType: "",
  fileList: [],
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
    default:
      return state;
  }
};
