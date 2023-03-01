import {
  SHOW_HIDDEN_MENU,
  COLOR_MENU_ITEM,
  GET_BOATS_CARDS_LIST,
  GET_BOAT_CARD_INFO,
  CLEAR_BOAT_CARD_INFO,
  GET_DATA_BY_SEARCH_PARAMS_LICENSE,
  GET_DATA_BY_SEARCH_PARAMS_BOAT,
  GET_LICENSE_BY_ID,
  GET_DATA_BY_SEARCH_PARAMS_BASES_BUILDING,
  SET_SEARCH_PARAMS_BASES_BUILDING,
  SET_SEARCH_PARAMS_BOATS,
  SET_SEARCH_PARAMS_LICENSE
} from './types';
import {
  MAIN_URL,
  PORT,
  API_GET_BOATS_LIST_SERCH,
  API_GET_BOAT_INFO_CARD,
  API_GET_LICENSE_LIST_SERCH,
  API_GET_LICENSE_INFO_CARD,
  API_GET_BASES_BUILDING_LIST_SERCH,
  API_GET_LICENSE_ADD_INFO_CARD,
  API_GET_LICENSE_INFO_FROM_LIBS_OBLAST,
  API_GET_LICENSE_INFO_FROM_LIBS_RAYON,
  API_GET_LICENSE_INFO_FROM_LIBS_GOROD
} from "../constants/constants";

export function showHiddenMenu(id) {
  return {
    type: SHOW_HIDDEN_MENU,
    data: { id },
  };
}

export function colorMenuItem(id) {
  return {
    type: COLOR_MENU_ITEM,
    data: { id },
  };
}

// export function getBoatsCardsList() {
//   return async dispatch => {
//     const response = await fetch(MAIN_URL+PORT+API_BOATS_LIST);
//     const data = await response.json();
//     for (let item of data) {
//       const owner = `${item.agent.personSurname} ${item.agent.personName} ${item.agent.personMidname}`;
//       item["boatType"] = item["boatType"]["btname"]
//       item["owner"] = owner;
//     }
//     const jsonData = data;
//     dispatch({
//       type: GET_BOATS_CARDS_LIST,
//       data: jsonData
//     })
//   };
// }

export function getBoatCardInfo(id) {
  return async dispatch => {
    let jsonData = {};
    if (id !== "") {
      const response = await fetch(MAIN_URL + PORT + API_GET_BOAT_INFO_CARD + String(id));
      jsonData = await response.json();
    }
    dispatch({
      type: GET_BOAT_CARD_INFO,
      data: jsonData
    })
  };
}

export function clearBoatCardInfo() {
  return (
    {
      type: CLEAR_BOAT_CARD_INFO,
      data: {}
    }
  )
}
export function setSearchParams(id, value, url) {
  let object = { [`${id}`]: value }
  switch (true) {
    case url.includes('certificates'): {
      return (
        {
          type: SET_SEARCH_PARAMS_LICENSE,
          data: object
        }
      )
      break;
    }
    case url.includes('smallboats'): {
      return (
        {
          type: SET_SEARCH_PARAMS_BOATS,
          data: object
        }
      )
      break;
    }
    case url.includes('basesbuilding'): {
      return (
        {
          type: SET_SEARCH_PARAMS_BASES_BUILDING,
          data: object
        }
      )
      break;
    }
    default: ;
  }

}

export function getDataBoatsBySearchParams(params) {
  return async dispatch => {
    // let url = "http://192.168.70.81:8080/boats/search"
    // for (let key in params) {
    //   if (params[key] !== "") {
    //     url += `?${key}=${String(params[key])}`
    //   }
    // }
    // console.log(url)
    const response = await fetch(MAIN_URL + PORT + API_GET_BOATS_LIST_SERCH, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });
    const data = await response.json();
    console.log("data from action >>", data)
    for (let item of data) {
      const owner = `${item.personSurname} ${item.personName} ${item.personMidname}`;
      item["owner"] = owner;
    }
    const jsonData = data;

    dispatch({
      type: GET_DATA_BY_SEARCH_PARAMS_BOAT,
      data: jsonData
    })
  };
}

export function getDataCerticatesBySearchParams(params) {
  return async dispatch => {
    console.log(dispatch)
    const response = await fetch(MAIN_URL + PORT + API_GET_LICENSE_LIST_SERCH, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }).catch(err => console.log(err));
    if (response.ok) {
      const data = await response.json();
      for (let item of data) {
        const fio = `${item.surname} ${item.name} ${item.midname}`;
        item["fio"] = fio;
      }
      const jsonData = data;
      console.log(jsonData)
      dispatch({
        type: GET_DATA_BY_SEARCH_PARAMS_LICENSE,
        data: jsonData
      })
    }

  }

}

export function getLicenseById(id) {
  return async dispatch => {
    const response = await fetch(MAIN_URL + PORT + API_GET_LICENSE_INFO_CARD + id);
    if (response.ok) {
      const data = await response.json();
      data["docType"] = data["docType"]["dtname"]
      data["licenseType"] = data["licenseType"]["name"]
      data["docSeries"] = data["docNum"].slice(2);
      data["docNum"] = data["docNum"].slice(0, 2);
      const oblast = await fetch(MAIN_URL + PORT + API_GET_LICENSE_INFO_FROM_LIBS_OBLAST + data.oblId);
      const rayon = await fetch(MAIN_URL + PORT + API_GET_LICENSE_INFO_FROM_LIBS_RAYON + data.rayonId);
      const gorod = await fetch(MAIN_URL + PORT + API_GET_LICENSE_INFO_FROM_LIBS_GOROD + data.gorodId);
      const oblastName = await oblast.json();
      const rayonName = await rayon.json();
      const gorodName = await gorod.json();
      data["oblId"] = oblastName["name"];
      data["rayonId"] = rayonName["name"];
      data["gorodId"] = gorodName["name2"];
      const licenseAddReq = await fetch(MAIN_URL + PORT + API_GET_LICENSE_ADD_INFO_CARD + id);
      const licenseAdd = await licenseAddReq.json();
      // data["licenseAdd"] = licenseAdd;
      const jsonData = { data: data, licenseAdd: licenseAdd }
      dispatch({
        type: GET_LICENSE_BY_ID,
        data: jsonData
      })
    }
  };
}

export function getDataBasesBuildingBySearchParams(params) {
  return async dispatch => {
    let queryParams = ''
    switch (true) {
      case Boolean(params.startDate) && Boolean(params.endDate):
        queryParams = `?startDate=${params.startDate}&endDate=${params.endDate}`
        break;
      case Boolean(params.startDate):
        queryParams = `?startDate=${params.startDate}`
        break;
      case Boolean(params.endDate):
        queryParams = `?endDate=${params.endDate}`
        break;
      default: queryParams = ''
    }
    const response = await fetch(MAIN_URL + PORT + API_GET_BASES_BUILDING_LIST_SERCH + queryParams, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }).catch(err => console.log(err));
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      const jsonData = data;
      console.log(jsonData)
      dispatch({
        type: GET_DATA_BY_SEARCH_PARAMS_BASES_BUILDING,
        data: jsonData
      })
    }

  }

}
