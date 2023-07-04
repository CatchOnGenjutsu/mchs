import { GET_DATA_BY_SEARCH_PARAMS_TECH_EXAM } from "../types";

import { MAIN_URL, PORT, API_GET_TECH_EXAM_LIST_SEARCH } from "../../constants/constants";

export function getDataTechExamBySearchParams(params) {
  // const state = store.getState();
  // const ateLibrary = state.dictionaryReducer.ateLibrary;
  return async (dispatch) => {
    const response = await fetch(MAIN_URL + PORT + API_GET_TECH_EXAM_LIST_SEARCH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }).catch((err) => console.log(err));
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      dispatch({
        type: GET_DATA_BY_SEARCH_PARAMS_TECH_EXAM,
        data: data,
      });
    }
  };
}
