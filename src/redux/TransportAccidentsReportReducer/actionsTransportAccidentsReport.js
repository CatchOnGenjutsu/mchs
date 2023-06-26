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
        case "injuredsList":
          request = await fetch(
            MAIN_URL + PORT_FOR_REPORT + API_DELETE_TRANSPORT_ACCIDENT_VICTIMS_INFO + innerData.id,
          );
          break;
        case "culpritsList":
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
          if (Object.values(response.ownerType).length > 0) {
            if (response.ownerType.ptcode === 2) {
              data.ownerLename = response.leName;
              data.ownerLeUnp = response.leUnp;
            } else {
              data.ownerSurname = response.ownerSurname;
              data.ownerName = response.ownerName;
              data.ownerMidname = response.ownerMidname;
              data.ownerBirthDate = response.ownerBirthDate;
            }
          }
          dispatch({
            type: GET_BOAT_INFO_BY_REGNUM,
            data: data,
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
      responseMain.boatVidId = responseMain.boatVid.id;
      responseMain.boatTypeId = responseMain.boatType.btcode;
      const personType = responseMain.ownerLename ? "entity" : "individual";
      const requestCulprits = await fetch(
        MAIN_URL + PORT_FOR_REPORT + API_GET_TRANSPORT_ACCIDENT_VICTIMS_INFO + responseMain.id,
      );
      const requestInjureds = await fetch(
        MAIN_URL + PORT_FOR_REPORT + API_GET_TRANSPORT_ACCIDENT_CAUSERS_INFO + responseMain.id,
      );
      const responseCulprits = await requestCulprits.json();
      const responseInjureds = await requestInjureds.json();
      const data = {
        responseMain: responseMain,
        personType: personType,
        culpritsList: responseCulprits,
        injuredsList: responseInjureds,
      };
      dispatch({
        type: GET_TRANSPORT_ACCIDENT_INFO,
        data: data,
      });
    }
  };
}

export function saveTransportAccident(data, culpritsList, injuredsList, id) {
  console.log(id);
  data.incidentDate = `${data.incidentDate} ${data.incidentTime}.000`;
  delete data.incidentTime;
  const optionsDate = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  data.createDate = `${new Date()
    .toLocaleString("en-GB", optionsDate)
    .slice(0, 10)
    .split("/")
    .reverse()
    .join("-")} ${new Date().toLocaleString("en-GB", optionsDate).slice(12, 20) + ".000"}`;
  data.locked = false;
  if (!!id) {
    return async (dispatch) => {
      console.log(data);
      delete data.inspector;
      delete data.section;
      delete data.boatType;
      delete data.boatVid;
      if (data.ownerMidname === null) {
        delete data.ownerMidname;
      }
      if (data.ownerName === null) {
        delete data.ownerName;
      }
      if (data.ownerSurname === null) {
        delete data.ownerSurname;
      }
      if (data.ownerWorkplace === null) {
        delete data.ownerWorkplace;
      }
      if (data.ownerBirthDate === null) {
        delete data.ownerBirthDate;
      }
      if (data.ownerLeUnp === null) {
        delete data.ownerLeUnp;
      }
      if (data.ownerLename === null) {
        delete data.ownerLename;
      }
      console.log(data);
      const request = await fetch(MAIN_URL + PORT_FOR_REPORT + API_SAVE_TRANSPORT_ACCIDENT_MAIN_INFO, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });
      if (request.status === 200) {
        const response = await request.json();
        // for (let item of culpritsList) {
        //   item.drunk = item.drunk === "true" ? true : false;
        //   item.incidentId = response.id;
        //   delete item.innerId;
        //   item.birthDate = new Date(item.birthDate).getTime();
        //   const request = await fetch(MAIN_URL + PORT_FOR_REPORT + API_SAVE_TRANSPORT_ACCIDENT_VICTIMS_INFO, {
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     method: "POST",
        //     body: JSON.stringify(item),
        //   });
        // }
        // for (let item of injuredsList) {
        //   item.drunk = item.drunk === "true" ? true : false;
        //   item.incidentId = response.id;
        //   delete item.innerId;
        //   delete item.drunk;
        //   item.birthDate = new Date(item.birthDate).getTime();
        //   const request = await fetch(MAIN_URL + PORT_FOR_REPORT + API_SAVE_TRANSPORT_ACCIDENT_CAUSERS_INFO, {
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     method: "POST",
        //     body: JSON.stringify(item),
        //   });
        // }
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
        body: JSON.stringify(data),
      });
      if (request.status === 200) {
        const response = await request.json();
        for (let item of culpritsList) {
          item.drunk = item.drunk === "true" ? true : false;
          item.incidentId = response.id;
          delete item.innerId;
          item.birthDate = new Date(item.birthDate).getTime();
        }
        const requestCulprits = await fetch(
          MAIN_URL + PORT_FOR_REPORT + API_SAVE_TRANSPORT_ACCIDENT_VICTIMS_INFO,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(culpritsList),
          },
        );
        for (let item of injuredsList) {
          item.drunk = item.drunk === "true" ? true : false;
          item.incidentId = response.id;
          delete item.innerId;
          delete item.drunk;
          item.birthDate = new Date(item.birthDate).getTime();
        }
        const requestInjureds = await fetch(
          MAIN_URL + PORT_FOR_REPORT + API_SAVE_TRANSPORT_ACCIDENT_CAUSERS_INFO,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(injuredsList),
          },
        );
        console.log(response);
      }
    };
  }
}
