import {
  MAIN_URL,
  PORT,
  API_GET_DICTIONARY_RAYON_FOR_OBL,
  API_GET_DICTIONARY_GOROD_FOR_RAYON,
  API_GET_BOAT_TYPES,
  API_GET_BOAT_VID,
  API_GET_BOAT_BODY,
} from "../../../constants/constants";

export async function setRayon(id) {
  const response = await fetch(MAIN_URL + PORT + API_GET_DICTIONARY_RAYON_FOR_OBL + id);
  const result = await response.json();
  return result.map((item) => {
    return { value: item.id, label: item.name, key: "rayonId" };
  });
}

export async function setGorod(id, key) {
  const response = await fetch(MAIN_URL + PORT + API_GET_DICTIONARY_GOROD_FOR_RAYON + id);
  const result = await response.json();
  return result.map((item) => {
    return { value: item.id, label: item.name, key: "gorod_id" };
  });
}

export async function setOptionsTypesBoat() {
  const response = await fetch(MAIN_URL + PORT + API_GET_BOAT_TYPES);
  const result = await response.json();
  return result.map((item) => {
    return { value: item.btcode, label: item.btname, key: "boatType" };
  });
}

export async function setOptionsVidBoat() {
  const response = await fetch(MAIN_URL + PORT + API_GET_BOAT_VID);
  const result = await response.json();
  return result.map((item) => {
    return { value: item.id, label: item.name, key: "boatVid" };
  });
}

export async function setOptionsBodyBoat() {
  const response = await fetch(MAIN_URL + PORT + API_GET_BOAT_BODY);
  const result = await response.json();
  return result.map((item) => {
    return { value: item.matcode, label: item.matname, key: "bodyMaterial" };
  });
}

// export async function setOptionsBodyBoat(){
//     const response = await fetch(MAIN_URL + PORT+API_GET_BOAT_BODY)
//     const result = await response.json();
//     return result.map(item=>{ return {value:item.matcode,label:item.matname}})
// }

export function setReadOptionForInputs(options,readFields) {
    readFields.forEach(field=>{
        options[field].readOnly = true
        options[field].disabled = true

    })
}