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
} from "../../constants/constants";

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
export function deleteNewNoteAccident(data) {
  return {
    type: DELETE_NEW_NOTE_ACCIDENT,
    data: data,
  };
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
          data.boatVid = Object.values(response.boatVid).length > 0 ? response.boatVid.id : null;
          data.boatType = Object.values(response.boatType).length > 0 ? response.boatType.btcode : null;
          data.boatName = response.boatName ? response.boatName : "";
          if (Object.values(response.ownerType).length > 0) {
            if (response.ownerType.ptcode === 2) {
              data.leName = response.leName;
              data.leUnp = response.leUnp;
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
        data.leName = "";
        data.leUnp = "";
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
      responseMain.boatVid = responseMain.boatVid.id;
      responseMain.boatType = responseMain.boatType.btcode;
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
  data.incidentDate = `${data.incidentDate} ${data.incidentTime}.000`;
  delete data.incidentTime;
  data.createDate = new Date().toISOString().split("T").join(" ").slice(0, -1);
  data.locked = false;
  if (!!id) {
    return async (dispatch) => {
      const request = await fetch(
        MAIN_URL + PORT_FOR_REPORT + API_SAVE_TRANSPORT_ACCIDENT_MAIN_INFO + "/" + id,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        },
      );
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
