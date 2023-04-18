import {
    MAIN_URL,
    PORT,
    API_GET_DICTIONARY_RAYON_FOR_OBL,
    API_GET_DICTIONARY_GOROD_FOR_RAYON
} from "../../../constants/constants"

export async function setRayon(id){
    const response = await fetch(MAIN_URL + PORT + API_GET_DICTIONARY_RAYON_FOR_OBL + id);
    const result = await response.json();
    return  result.map(item => {return {value: item.id, label: item.name, key: "rayon"}})
}

export async function setGorod(id){
    const response = await fetch(MAIN_URL + PORT + API_GET_DICTIONARY_GOROD_FOR_RAYON + id);
    const result = await response.json();
    return  result.map(item => {return {value: item.id, label: item.name, key: "gorod"}})
}
