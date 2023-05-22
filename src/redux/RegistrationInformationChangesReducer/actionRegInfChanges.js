import store from "../store";
import { GET_REG_INFORM_CHANGES, GET_REG_INFORM_CHANGES_BOAT_CARDS } from "../types";
import {
  MAIN_URL,
  PORT,
  API_REG_INFORM_CHANGE,
  API_REG_INFORM_CHANGE_BOAT_CARD,
} from "../../constants/constants";

export function getDataRegInfChangeBySearchParams(params) {
  const state = store.getState();
  const ateLibrary = state.dictionaryReducer.ateLibrary;
  return async (dispatch) => {
    const response = await fetch(MAIN_URL + PORT + API_REG_INFORM_CHANGE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }).catch((err) => console.log(err));
    if (response.ok) {
      const data = await response.json();
      // console.log(data);
      for (let item of data) {
        item["fio"] = `${item.surname  ? item.surname  : ""} ${
          item.name ? item.name : ""
        } ${item.midname ? item.midname : ""}`;
      }
      dispatch({
        type: GET_REG_INFORM_CHANGES,
        data: data,
      });
    }
  };
}

export function getDataRegInfChangeBoatCardsBySearchParams(params) {
  const state = store.getState();
  console.log(params);
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
        type: GET_REG_INFORM_CHANGES_BOAT_CARDS,
        data: data,
      });
    }
  };
}
