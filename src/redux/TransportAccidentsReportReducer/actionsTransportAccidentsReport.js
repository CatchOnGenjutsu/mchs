import {
  ADD_NEW_CULPRIT,
  ADD_NEW_INJURED,
  DELETE_NEW_NOTE_ACCIDENT,
  ADD_NEW_ACCIDENT_DATA,
  CLEAR_ACCIDENT_DATA,
  GET_TRANSPORT_ACCIDENT_INFO,
  GET_BOAT_INFO_BY_REGNUM,
} from "../types";

import {
  MAIN_URL,
  PORT_FOR_REPORT,
  API_FIND_BOAT_INFO_BY_REGNUM,
  API_GET_TRANSPORT_ACCIDENT_LIST_SEARCH,
  API_SAVE_TRANSPORT_ACCIDENT_MAIN_INFO,
  API_SAVE_TRANSPORT_ACCIDENT_VICTIMS_INFO,
  API_SAVE_TRANSPORT_ACCIDENT_CAUSERS_INFO,
  API_GET_TRANSPORT_ACCIDENT_VICTIMS_INFO,
  API_GET_TRANSPORT_ACCIDENT_CAUSERS_INFO,
  API_DELETE_TRANSPORT_ACCIDENT_VICTIMS_INFO,
  API_DELETE_TRANSPORT_ACCIDENT_CAUSERS_INFO,
} from "../../constants/constants";

import {
  TransportAccidentFormSettingsIndividual,
  TransportAccidentFormSettingsEntity,
} from "../../components/StatisticsAnalytics/TransportAccidentForm/TransportAccidentFormSettings";

export function addNewCulprit(newCulprit) {
  return {
    type: ADD_NEW_CULPRIT,
    data: newCulprit,
  };
}
export function addNewInjured(newInjured) {
  return {
    type: ADD_NEW_INJURED,
    data: newInjured,
  };
}
export function deleteNewNoteAccident(innerData) {
  if (innerData.mode === "add") {
    return {
      type: DELETE_NEW_NOTE_ACCIDENT,
      data: innerData,
    };
  }
  if (innerData.mode === "edit") {
    return async (dispatch) => {
      let request;
      switch (innerData.type) {
        case "victimsList":
          request = await fetch(
            MAIN_URL + PORT_FOR_REPORT + API_DELETE_TRANSPORT_ACCIDENT_VICTIMS_INFO + innerData.id,
          );
          break;
        case "causersList":
          request = await fetch(
            MAIN_URL + PORT_FOR_REPORT + API_DELETE_TRANSPORT_ACCIDENT_CAUSERS_INFO + innerData.id,
          );
          break;
        default:
          break;
      }
      if (request.status === 200) {
        dispatch({
          type: DELETE_NEW_NOTE_ACCIDENT,
          data: innerData,
        });
      }
    };
  }
}
export function addNewAccidentData(data) {
  return {
    type: ADD_NEW_ACCIDENT_DATA,
    data: data,
  };
}
export function findBoatInfoByRegNum(regNum) {
  return async (dispatch) => {
    const request = await fetch(MAIN_URL + PORT_FOR_REPORT + API_FIND_BOAT_INFO_BY_REGNUM + regNum);
    if (request.status === 200) {
      try {
        const response = await request.json();
        if (Object.values(response).length > 0) {
          const data = {};
          data.boatVidId = Object.values(response.boatVid).length > 0 ? response.boatVid.id : null;
          data.boatTypeId = Object.values(response.boatType).length > 0 ? response.boatType.btcode : null;
          data.boatName = response.boatName ? response.boatName : "";
          let personType;
          if (Object.values(response.ownerType).length > 0) {
            if (response.ownerType.ptcode === 2) {
              data.ownerLename = response.leName;
              data.ownerLeUnp = response.leUnp;
              personType = "entity";
            } else {
              data.ownerSurname = response.ownerSurname;
              data.ownerName = response.ownerName;
              data.ownerMidname = response.ownerMidname;
              data.ownerBirthDate = response.ownerBirthDate;
              personType = "individual";
            }
          }
          const allData = {
            data: data,
            personType: personType,
          };
          dispatch({
            type: GET_BOAT_INFO_BY_REGNUM,
            data: allData,
          });
        }
      } catch (error) {
        const data = {};
        data.boatVid = null;
        data.boatType = null;
        data.boatName = "";
        data.ownerLename = "";
        data.ownerLeUnp = "";
        data.ownerSurname = "";
        data.ownerName = "";
        data.ownerMidname = "";
        data.ownerBirthDate = null;
        dispatch({
          type: GET_BOAT_INFO_BY_REGNUM,
          data: data,
        });
      }
    }
  };
}
export function clearAccidentData() {
  return {
    type: CLEAR_ACCIDENT_DATA,
    data: {},
  };
}

export function getAccidentInfoById(id) {
  return async (dispatch) => {
    const requestMain = await fetch(
      MAIN_URL + PORT_FOR_REPORT + API_GET_TRANSPORT_ACCIDENT_LIST_SEARCH + "/" + id,
    );
    if (requestMain.status === 200) {
      const responseMain = await requestMain.json();
      responseMain.incidentTime = responseMain.incidentDate.slice(11, 19);
      responseMain.incidentDate = responseMain.incidentDate.slice(0, 10);
      if (!!responseMain.boatVidId) {
        responseMain.boatVidId = responseMain.boatVid.id;
      }
      if (!!responseMain.boatTypeId) {
        responseMain.boatTypeId = responseMain.boatType.btcode;
      }
      let personType;
      if (
        !!responseMain.ownerLename ||
        !!responseMain.ownerSurname ||
        !!responseMain.ownerName ||
        !!responseMain.ownerMidname
      ) {
        personType = responseMain.ownerLename ? "entity" : "individual";
      } else {
        personType = "individual";
      }
      const requestVictims = await fetch(
        MAIN_URL + PORT_FOR_REPORT + API_GET_TRANSPORT_ACCIDENT_VICTIMS_INFO + responseMain.id,
      );
      const requestCausers = await fetch(
        MAIN_URL + PORT_FOR_REPORT + API_GET_TRANSPORT_ACCIDENT_CAUSERS_INFO + responseMain.id,
      );
      const responseCausers = await requestCausers.json();
      const responseVictims = await requestVictims.json();
      const data = {
        responseMain: responseMain,
        personType: personType,
        causersList: responseCausers,
        victimsList: responseVictims,
      };
      dispatch({
        type: GET_TRANSPORT_ACCIDENT_INFO,
        data: data,
      });
    }
  };
}

export function saveTransportAccident(newAccidentData, causersList, victimsList, id, formKey) {
  console.log(newAccidentData);
  newAccidentData.incidentDate = `${newAccidentData.incidentDate} ${newAccidentData.incidentTime}.000`;
  delete newAccidentData.incidentTime;
  const optionsDate = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  newAccidentData.createDate = `${new Date()
    .toLocaleString("en-GB", optionsDate)
    .slice(0, 10)
    .split("/")
    .reverse()
    .join("-")} ${new Date().toLocaleString("en-GB", optionsDate).slice(12, 20) + ".000"}`;
  if (formKey === "form") {
    newAccidentData.locked = true;
  } else {
    newAccidentData.locked = false;
  }
  if (!!id) {
    return async (dispatch) => {
      delete newAccidentData.inspector;
      delete newAccidentData.section;
      delete newAccidentData.boatType;
      delete newAccidentData.boatVid;
      if (newAccidentData.ownerMidname === null) {
        delete newAccidentData.ownerMidname;
      }
      if (newAccidentData.ownerName === null) {
        delete newAccidentData.ownerName;
      }
      if (newAccidentData.ownerSurname === null) {
        delete newAccidentData.ownerSurname;
      }
      if (newAccidentData.ownerWorkplace === null) {
        delete newAccidentData.ownerWorkplace;
      }
      if (newAccidentData.ownerBirthDate === null) {
        delete newAccidentData.ownerBirthDate;
      }
      if (newAccidentData.ownerLeUnp === null) {
        delete newAccidentData.ownerLeUnp;
      }
      if (newAccidentData.ownerLename === null) {
        delete newAccidentData.ownerLename;
      }
      const request = await fetch(MAIN_URL + PORT_FOR_REPORT + API_SAVE_TRANSPORT_ACCIDENT_MAIN_INFO, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(newAccidentData),
      });
      if (request.status === 200) {
        const response = await request.json();
        for (let item of causersList) {
          item.drunk = item.drunk === "true" || item.drunk === true ? true : false;
          item.incidentId = response.id;
          if (item.hasOwnProperty("innerId")) {
            delete item.innerId;
          }
          item.birthDate = new Date(item.birthDate).getTime();
        }
        const requestCausers = await fetch(
          MAIN_URL + PORT_FOR_REPORT + API_SAVE_TRANSPORT_ACCIDENT_CAUSERS_INFO,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(causersList),
          },
        );
        for (let item of victimsList) {
          item.drunk = item.drunk === "true" || item.drunk === true ? true : false;
          item.incidentId = response.id;
          if (item.hasOwnProperty("innerId")) {
            delete item.innerId;
          }
          item.birthDate = new Date(item.birthDate).getTime();
        }
        const requestVictims = await fetch(
          MAIN_URL + PORT_FOR_REPORT + API_SAVE_TRANSPORT_ACCIDENT_VICTIMS_INFO,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(victimsList),
          },
        );
        console.log(response);
      }
    };
  } else {
    return async (dispatch) => {
      const request = await fetch(MAIN_URL + PORT_FOR_REPORT + API_SAVE_TRANSPORT_ACCIDENT_MAIN_INFO, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(newAccidentData),
      });
      if (request.status === 200) {
        const response = await request.json();
        for (let item of causersList) {
          item.drunk = item.drunk === "true" || item.drunk === true ? true : false;
          item.incidentId = response.id;
          if (item.hasOwnProperty("innerId")) {
            delete item.innerId;
          }
          item.birthDate = new Date(item.birthDate).getTime();
        }
        const requestCausers = await fetch(
          MAIN_URL + PORT_FOR_REPORT + API_SAVE_TRANSPORT_ACCIDENT_CAUSERS_INFO,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(causersList),
          },
        );
        for (let item of victimsList) {
          item.drunk = item.drunk === "true" || item.drunk === true ? true : false;
          item.incidentId = response.id;
          if (item.hasOwnProperty("innerId")) {
            delete item.innerId;
          }
          item.birthDate = new Date(item.birthDate).getTime();
        }
        const requestVictims = await fetch(
          MAIN_URL + PORT_FOR_REPORT + API_SAVE_TRANSPORT_ACCIDENT_VICTIMS_INFO,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(victimsList),
          },
        );
        console.log(response);
      }
    };
  }
}
