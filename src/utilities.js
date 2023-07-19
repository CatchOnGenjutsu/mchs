import {
  API_GET_BOAT_BODY,
  API_GET_BOAT_TYPES,
  API_GET_BOAT_VID,
  API_GET_DICTIONARY_GOROD_FOR_RAYON,
  API_GET_DICTIONARY_RAYON_FOR_OBL,
  API_GET_DICTIONARY_SECTION_FOR_RAYON,
  API_GET_SA_CATEGORY,
  MAIN_URL,
  PORT
} from "./constants/constants";

export async function getRayon(id) {
  if(id){
    const response = await fetch(MAIN_URL + PORT + API_GET_DICTIONARY_RAYON_FOR_OBL + id);
    if(response.ok){
      const result = await response.json();
      return result.map((item) => {
        return { value: item.id, label: item.name, key: "rayonId" };
      });
    }else return []
  }

}

export async function getGorod(id) {
  if(id){
    const response = await fetch(MAIN_URL + PORT + API_GET_DICTIONARY_GOROD_FOR_RAYON + id);
    if(response.ok){
      const result = await response.json();
      return result.map((item) => {
        return { value: item.id, label: item.name2, key: "gorodId" };
      });
    } else return []
  }
}
 export async function getSection(id) {
  if(id){
    const response = await fetch(MAIN_URL + PORT + API_GET_DICTIONARY_SECTION_FOR_RAYON + id);
    if(response.ok){
      const result = await response.json();
      const arrResult=[]
      arrResult.push(result)
      return arrResult.map((item) => {
        return { value: item.sctId, label: item.sctName, key: "section" };
      });
    } else return []
  }
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
export async function setOptionsSaCategory() {
  const response = await fetch(MAIN_URL + PORT + API_GET_SA_CATEGORY);
  const result = await response.json();
  return result.map((item) => {
    return { value: item.sacCode, label: item.sacName, key: "saCategory" };
  });
}

export const parseDate = (dateString) => {
  if (!dateString) return null;

  const [day, month, year] = dateString.split('.');
  return new Date(`${year}-${month}-${day}`);
};

export const sortDates = (dateA, dateB) => {
  if (!dateA) return -1;
  if (!dateB) return 1;
  return dateA.getTime() - dateB.getTime();
};

// export async function setOptionsBodyBoat(){
//     const response = await fetch(MAIN_URL + PORT+API_GET_BOAT_BODY)
//     const result = await response.json();
//     return result.map(item=>{ return {value:item.matcode,label:item.matname}})
// }

// export function setReadOptionForInputs(options,readFields) {
//     readFields.forEach(field=>{
//         options[field].readOnly = true
//         options[field].disabled = true
//
//     })
// }


