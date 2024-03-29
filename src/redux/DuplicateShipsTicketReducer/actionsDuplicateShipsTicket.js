import {
  MAIN_URL,
  PORT,
  API_DUP_SHIP_TICKET_DATA,
  API_GET_BOAT_CARD_FOR_DUPLICATE,
  API_GET_APP_INFO_DUPLICATE,
  API_GET_DUPLICATE_DECISION_INFO,
} from "../../constants/constants";
import {
  GET_DUP_SHIP_TICKET_INFO,
  GET_BOAT_CARD_FOR_DUPLICATE,
  ADD_DATA_FOR_DUPLICATE,
  GET_DUPLICATE_DECISION_INFO,
} from "../types";

import {
  setOptionsRayonForOblast,
  setOptionsGorodForRayon,
} from "../../components/AdministrativeProcedures/commonComponents/InfoRepresentPerson/optionInfoRepresentPerson";

import { setOptions as setOptionsIndividual } from "../../components/AdministrativeProcedures/commonComponents/InformationAboutIndividual/optionsForInformationAboutIndividual";
import { setOptions as setOptionsEntity } from "../../components/AdministrativeProcedures/commonComponents/InformationAboutEntity/optionsInformationAboutEntity";

export function getDataDupShipsTicketBySearchParams(params) {
  return async (dispatch) => {
    const response = await fetch(MAIN_URL + PORT + API_DUP_SHIP_TICKET_DATA, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }).catch((err) => console.log(err));
    if (response.ok) {
      const data = await response.json();
      for (let item of data) {
        if (item.operDate) {
          item.operDate = item.operDate.split("-").reverse().join(".");
        }
      }
      dispatch({
        type: GET_DUP_SHIP_TICKET_INFO,
        data: data,
      });
    }
  };
}
export function getBoatCardInfoForDuplicate(id) {
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
        type: GET_BOAT_CARD_FOR_DUPLICATE,
        data: response,
      });
    }
  };
}
export function addDataForDuplicate(data) {
  return {
    type: ADD_DATA_FOR_DUPLICATE,
    data: data,
  };
}

export function getAppInfoDuplicate(id) {
  return async (dispatch) => {
    const request = await fetch(MAIN_URL + PORT + API_GET_APP_INFO_DUPLICATE + id).catch((err) =>
      console.log(err),
    );
    if (request.status === 200) {
      const response = await request.json();
      response.personType = response.personType.ptcode;
      response.docType = response.docType !== null ? response.docType.dtcode : null;
      response.agentDocType = response.agentDocType !== null ? response.agentDocType.dtcode : null;
      response.fileType = response.fileDoc ? "fileDoc" : response.filePdf ? "filePdf" : "";
      dispatch({
        type: GET_BOAT_CARD_FOR_DUPLICATE,
        data: response,
      });
    }
  };
}

export function getDuplicateDecisionCardInfo(id) {
  return async (dispatch) => {
    const request = await fetch(MAIN_URL + PORT + API_GET_DUPLICATE_DECISION_INFO + id);

    if (request.status === 200) {
      const response = await request.json();
      // dataAppEng.map((item) => {
      //   item.engtype = item.engTypeName;
      //   return item;
      // });
      const jsonData = {
        data: response,
        boatCardAppEngList: response.boatCardAppEngList,
        boatCardAppDealsList: response.boatCardAppDealsList,
        boatCardAppSpecMarkList: response.boatCardAppSpecMarkList,
      };
      dispatch({
        type: GET_DUPLICATE_DECISION_INFO,
        data: jsonData,
      });
    } else {
      console.log(request);
    }
  };
}
