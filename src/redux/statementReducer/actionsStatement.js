import {
  GET_BOATS_REG_INFO,
  ADD_NEW_ENGINE_CHECK,
  ADD_NEW_SPEC_MARK_APP,
  DELETE_NEW_NOTE_APP,
  ADD_NEW_STATEMENT_DATA,
  ADD_NEW_DEAL,
  SET_DATA_FOR_STATEMENT_TABLES,
  ADD_NEW_STATEMENT,
  CLEAR_NEW_STATEMENT,
  GET_BOATS_DECISION_INFO,
  CLEAR_DECISION_DATA,
} from "../types";

import {
  MAIN_URL,
  PORT,
  API_ADD_NEW_ENGINE_CHECK,
  API_ADD_NEW_STATEMENT,
  API_GET_BOATS_REG_INFO,
  API_GET_BOATS_REG_ENG,
  API_GET_BOATS_REG_DEALS,
  API_GET_BOATS_REG_SPEC_MARKS,
  API_GET_BOATS_DECISION_INFO,
} from "../../constants/constants";

import {
  setOptionsRayonForOblast,
  setOptionsGorodForRayon,
} from "../../components/AdministrativeProcedures/commonComponents/InfoRepresentPerson/optionInfoRepresentPerson";

import { setOptions as setOptionsIndividual } from "../../components/AdministrativeProcedures/commonComponents/InformationAboutIndividual/optionsForInformationAboutIndividual";
import { setOptions as setOptionsEntity } from "../../components/AdministrativeProcedures/commonComponents/InformationAboutEntity/optionsInformationAboutEntity";

import { fieldAddressOptions } from "../../components/AdministrativeProcedures/commonComponents/InformationAboutIndividual/optionsForInformationAboutIndividual";
import { fieldAddressOptions as fieldLEAddressOptions } from "../../components/AdministrativeProcedures/commonComponents/InformationAboutEntity/optionsInformationAboutEntity";

export function getBoatRegInfo(id) {
  return async (dispatch) => {
    const requestData = await fetch(MAIN_URL + PORT + API_GET_BOATS_REG_INFO + id);
    const requestEngines = await fetch(MAIN_URL + PORT + API_GET_BOATS_REG_ENG + id);
    const requestDeals = await fetch(MAIN_URL + PORT + API_GET_BOATS_REG_DEALS + id);
    const requestSpecMarks = await fetch(MAIN_URL + PORT + API_GET_BOATS_REG_SPEC_MARKS + id);
    const dataApp = await requestData.json();
    const dataAppEng = await requestEngines.json();
    const dataAppDeals = await requestDeals.json();
    const dataAppSpecMarks = await requestSpecMarks.json();
    dataApp.docDateIssue = !!dataApp.docDateIssue ? dataApp.docDateIssue.slice(0, 10) : null;
    dataApp.docType = !!dataApp.docType ? dataApp.docType.dtcode : null;
    dataApp.kv === 0 ? (dataApp.kv = null) : (dataApp.kv = dataApp.kv);
    if (dataApp.oblId && dataApp.rayonId) {
      if (dataApp.personType.ptcode === 1) {
        await setOptionsIndividual(dataApp.oblId, "oblId");
        await setOptionsIndividual(dataApp.rayonId, "rayonId");
      } else {
        await setOptionsEntity(dataApp.oblId, "oblId");
        await setOptionsEntity(dataApp.rayonId, "rayonId");
      }
    }
    dataApp.agentDocDate = !!dataApp.agentDocDate ? dataApp.agentDocDate.slice(0, 10) : null;
    dataApp.agentDocType = !!dataApp.agentDocType ? dataApp.agentDocType.dtcode : null;
    dataApp.agentKv === 0 ? (dataApp.agentKv = null) : (dataApp.agentKv = dataApp.agentKv);
    if (dataApp.agentOblId && dataApp.agentRayonId) {
      await setOptionsRayonForOblast(dataApp.agentOblId);
      await setOptionsGorodForRayon(dataApp.agentRayonId);
    }
    dataApp.boatType = !!dataApp.boatType ? dataApp.boatType.btcode : null;
    dataApp.bodyMaterial = !!dataApp.bodyMaterial ? dataApp.bodyMaterial.matcode : null;
    dataApp.boatVid = !!dataApp.boatVid ? dataApp.boatVid.id : null;
    dataApp.saCategory = !!dataApp.saCategory ? dataApp.saCategory.sacCode : null;
    dataApp.fileType = dataApp.fileDoc ? "fileDoc" : dataApp.filePdf ? "filePdf" : "";

    // dataAppEng.map((item) => {
    //   item.engtype = item.engTypeName;
    //   return item;
    // });
    // let fullName = "";
    // let fullAddress = "";
    // if (dataApp.personType.ptcode === 1) {
    //   fullName = `${dataApp.surname} ${dataApp.name} ${dataApp.midname}`;
    //   fullAddress = `Республика Беларусь, ${
    //     fieldAddressOptions.oblId.options.find((item) => item.value === dataApp.oblId).label
    //   } область, ${
    //     fieldAddressOptions.rayonId.options.find((item) => item.value === dataApp.rayonId).label
    //   } район, ${
    //     fieldAddressOptions.gorodId.options.find((item) => item.value === dataApp.gorodId).label
    //   } район,`;
    // } else {
    //   fullName = dataApp.nameLe;
    //   fullAddress = `Республика Беларусь, ${
    //     fieldLEAddressOptions.oblId.options.find((item) => item.value === dataApp.oblId).label
    //   } область, ${
    //     fieldLEAddressOptions.rayonId.options.find((item) => item.value === dataApp.rayonId).label
    //   } район, ${
    //     fieldLEAddressOptions.gorodId.options.find((item) => item.value === dataApp.gorodId).label
    //   },`;
    // }
    if (requestData.ok) {
      const jsonData = {
        dataApp: dataApp,
        dataAppEng: dataAppEng,
        dataAppDeals: dataAppDeals,
        dataAppSpecMarks: dataAppSpecMarks,
      };
      dispatch({
        type: GET_BOATS_REG_INFO,
        data: jsonData,
      });
    }
  };
}

export function getDecisionCardInfo(id) {
  return async (dispatch) => {
    const request = await fetch(MAIN_URL + PORT + API_GET_BOATS_DECISION_INFO + id);

    if (request.status === 200) {
      const response = await request.json();
      console.log("response", response);
      const dataAppEng = response.boatCardAppEngDtoList;
      const dataAppDeals = response.boatCardAppDealDtoList;
      const dataAppSpecMarks = response.boatCardAppSmDtoList;
      dataAppEng.map((item) => {
        item.engtype = item.engTypeName;
        return item;
      });
      const jsonData = {
        data: response,
        dataAppEng: dataAppEng,
        dataAppDeals: dataAppDeals,
        dataAppSpecMarks: dataAppSpecMarks,
      };
      dispatch({
        type: GET_BOATS_DECISION_INFO,
        data: jsonData,
      });
    }
  };
}

export function addNewEngineCheck(engineVin, newEngine) {
  return async (dispatch) => {
    const response = await fetch(MAIN_URL + PORT + API_ADD_NEW_ENGINE_CHECK + engineVin, {
      method: "POST",
    });
    const data = await response.text();
    if (data === "OK") {
      dispatch({
        type: ADD_NEW_ENGINE_CHECK,
        data: newEngine,
      });
    }
  };
}
export function setDataForTable(data) {
  return {
    type: SET_DATA_FOR_STATEMENT_TABLES,
    data: data,
  };
}

export function addNewSpecMarkApp(newMark) {
  return {
    type: ADD_NEW_SPEC_MARK_APP,
    data: newMark,
  };
}

export function deleteNewNote(data) {
  console.log(data);
  return {
    type: DELETE_NEW_NOTE_APP,
    data: data,
  };
}
export function addNewDealApp(newDeal) {
  return {
    type: ADD_NEW_DEAL,
    data: newDeal,
  };
}
export function addNewStatementData(data) {
  return {
    type: ADD_NEW_STATEMENT_DATA,
    data: data,
  };
}

export function addNewStatement(data) {
  console.log("action data", data);
  return async (dispatch) => {
    const request = await fetch(MAIN_URL + PORT + API_ADD_NEW_STATEMENT, {
      method: "POST",
      body: data,
    });
    const response = await request.json();
    dispatch({
      type: ADD_NEW_STATEMENT,
      data: response,
    });
  };
}

export function clearNewStatement() {
  return {
    type: CLEAR_NEW_STATEMENT,
    data: {},
  };
}

export function clearDecisionData() {
  return {
    type: CLEAR_DECISION_DATA,
    data: {},
  };
}
