import {
  MAIN_URL,
  PORT,
  API_GET_SHIPS_TICKET_DATA,
  API_GET_BOAT_CARD_FOR_DUPLICATE,
  API_GET_APP_INFO_DUPLICATE,
  API_GET_DUPLICATE_DECISION_INFO,
} from "../../constants/constants";

import {
  GET_SHIPS_TICKET_INFO,
  GET_BOAT_CARD_FOR_DUPLICATE,
  ADD_DATA_FOR_DUPLICATE,
  GET_DUPLICATE_DECISION_INFO,
} from "../types";

export function getDataShipsTicketBySearchParams(params) {
  return async (dispatch) => {
    const response = await fetch(MAIN_URL + PORT + API_GET_SHIPS_TICKET_DATA, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }).catch((err) => console.log(err));
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      for (let item of data[0].boatCardAppList) {
        if (item.operDate) {
          item.operDate = item.operDate.split("-").reverse().join(".");
        }
        if (item.name) {
          item.fio = `${item.surname} ${item.name} ${item.midname}`;
        }
      }
      for (let item of data[0].boatcardModifList) {
        if (item.operDate) {
          item.operDate = item.operDate.split("-").reverse().join(".");
        }
        if (item.name) {
          item.fio = `${item.surname} ${item.name} ${item.midname}`;
        }
      }
      const validData = [...data[0].boatCardAppList, ...data[0].boatcardModifList];
      dispatch({
        type: GET_SHIPS_TICKET_INFO,
        data: validData,
      });
    }
  };
}
