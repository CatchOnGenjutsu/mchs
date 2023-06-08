import {
  MAIN_URL,
  PORT,
  API_GET_SHIPS_TICKET_DATA,
  API_GET_BOAT_CARD_FOR_DUPLICATE,
  API_GET_APP_INFO_DUPLICATE,
  API_GET_SHIPS_TICKET_DECISION_INFO,
} from "../../constants/constants";

import {
  GET_SHIPS_TICKET_INFO,
  GET_BOAT_CARD_FOR_DUPLICATE,
  ADD_DATA_FOR_DUPLICATE,
  GET_SHIPS_TICKET_DECISION_INFO,
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
      for (let item of data[0].boatCardAppList) {
        item.key = "boatCardAppId";
        if (item.operDate) {
          item.operDate = item.operDate.split("-").reverse().join(".");
        }
        if (item.name) {
          item.fio = `${item.surname} ${item.name} ${item.midname}`;
        }
      }
      for (let item of data[0].boatcardModifList) {
        item.key = "boatCardModifId";
        if (item.operDate) {
          item.operDate = item.operDate.split("-").reverse().join(".");
        }
        if (item.name) {
          item.fio = `${item.surname} ${item.name} ${item.midname}`;
        }
      }
      const validData = [...data[0].boatCardAppList, ...data[0].boatcardModifList];
      console.log(validData);
      dispatch({
        type: GET_SHIPS_TICKET_INFO,
        data: validData,
      });
    }
  };
}

export function getShipsTicketDecisionInfo(id, key) {
  return async (dispatch) => {
    const request = await fetch(
      MAIN_URL +
        PORT +
        API_GET_SHIPS_TICKET_DECISION_INFO +
        "?" +
        new URLSearchParams({
          [`${key}`]: id,
        }),
    );

    if (request.status === 200) {
      const response = await request.json();
      console.log(response);
      const jsonData = {
        data: response,
        boatCardAppEngList: response.boatCardAppEngDtoList
          ? response.boatCardAppEngDtoList
          : response.boatCardModifEngDtoList,
        boatCardAppDealsList: response.boatCardAppDealDtoList
          ? response.boatCardAppDealDtoList
          : response.boatCardModifDealsDtoList,
        boatCardAppSpecMarkList: response.boatCardAppSmDtoList
          ? response.boatCardAppSmDtoList
          : response.boatCardModifSmDtoList,
      };
      dispatch({
        type: GET_SHIPS_TICKET_DECISION_INFO,
        data: jsonData,
      });
    } else {
      console.log(request);
    }
  };
}
