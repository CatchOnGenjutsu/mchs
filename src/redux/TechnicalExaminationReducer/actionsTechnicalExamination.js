import { GET_DATA_BY_SEARCH_PARAMS_TECH_EXAM, GET_TECH_EXAM_CHANGES_BOAT_CARDS } from "../types";

import {
  MAIN_URL,
  PORT,
  API_GET_TECH_EXAM_LIST_SEARCH,
  API_REG_INFORM_CHANGE_BOAT_CARD,
} from "../../constants/constants";

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

export function getDataTechExamBoatCardsBySearchParams(params) {
  return async (dispatch) => {
    const response = await fetch(MAIN_URL + PORT + API_REG_INFORM_CHANGE_BOAT_CARD, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }).catch((err) => console.log(err));
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      for (let item of data) {
        item["fio"] = `${item.ownerSurname ? item.ownerSurname : ""} ${
          item.ownerName ? item.ownerName : ""
        } ${item.ownerMidname ? item.ownerMidname : ""}`;
      }
      dispatch({
        type: GET_TECH_EXAM_CHANGES_BOAT_CARDS,
        data: data,
      });
    }
  };
}
