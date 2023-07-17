import {
  GET_DATA_BY_SEARCH_PARAMS_TECH_EXAM,
  GET_TECH_EXAM_CHANGES_BOAT_CARDS,
  GET_BOAT_CARD_FOR_TECH_EXAM,
} from "../types";

import {
  MAIN_URL,
  PORT,
  API_GET_TECH_EXAM_LIST_SEARCH,
  API_REG_INFORM_CHANGE_BOAT_CARD,
  API_GET_BOAT_CARD_FOR_DUPLICATE,
} from "../../constants/constants";

import {
  setOptionsRayonForOblast,
  setOptionsGorodForRayon,
} from "../../components/AdministrativeProcedures/commonComponents/InfoRepresentPerson/optionInfoRepresentPerson";

import { setOptions as setOptionsIndividual } from "../../components/AdministrativeProcedures/commonComponents/InformationAboutIndividual/optionsForInformationAboutIndividual";
import { setOptions as setOptionsEntity } from "../../components/AdministrativeProcedures/commonComponents/InformationAboutEntity/optionsInformationAboutEntity";

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

export function getBoatCardInfoForTechExam(id) {
  return async (dispatch) => {
    const request = await fetch(MAIN_URL + PORT + API_GET_BOAT_CARD_FOR_DUPLICATE + id).catch((err) =>
      console.log(err),
    );
    if (request.status === 200) {
      const response = await request.json();
      if (response.oblId && response.rayonId) {
        if (response.personType === 1) {
          await setOptionsIndividual(response.oblId, "oblId");
          await setOptionsIndividual(response.rayonId, "rayonId");
        } else {
          await setOptionsEntity(response.oblId, "oblId");
          await setOptionsEntity(response.rayonId, "rayonId");
        }
      }
      if (response.agentOblId && response.agentRayonId) {
        await setOptionsRayonForOblast(response.agentOblId);
        await setOptionsGorodForRayon(response.agentRayonId);
      }
      dispatch({
        type: GET_BOAT_CARD_FOR_TECH_EXAM,
        data: response,
      });
    }
  };
}
