import {
  MAIN_URL,
  PORT,
  API_GET_DICTIONARY_RAYON_FOR_OBL,
  API_GET_DICTIONARY_GOROD_FOR_RAYON
} from "../../../../constants/constants"

import {setRayon,setGorod} from '../utilities'
export const optionInfoRepresentPersonSummary = {
  agentSurname:{
    key: "agentSurname",
    value: "Фамилия",
    type:'text'
  },
  agentName:{
    key: "agentName",
    value: "Имя",
    type:'text'
  },
  agentMidname: {
    key: "agentMidname",
    value: "Отчество",
    type:'text'
  },
  agentDocType:{
    key: "agentDocType",
    value: "Документ",
    type:'select',
    selectOption: [{value:1, label:'Паспорт', key: "agentDocType"}, {value:2, label:'Вид на жительство',key: "agentDocType"}]
  },
  agentSerialOfPassport:{
    key: "agentSerialOfPassport",
    value: "Серия",
    type:'text'
  },
  agentNumberOfPassport:{
    key: "agentNumberOfPassport",
    value: "Номер",
    type:'text'
  },
  agentDocDate:{
    key: "agentDocDate",
    value: "Дата выдачи:",
    type:'date'
  },
  agentDocDepartment:{
    key: "agentDocDepartment",
    value: "Кем выдан",
    type:'text'
  },
  agentPersNum:{
    key: "agentPersNum",
    value: "Идентификационный номер",
    type:'text'
  },
}

export const optionInfoRepresentPersonAddress = {
  agentCountry:{
    key: "agentCountry",
    value: "Страна",
    type:'text'
  },
  agentOblId:{
    key: "agentOblId",
    value: "Область",
    type:'select',
    selectOption: [
      {value:1,label:"Брестская", key: "agentObl" },
      {value:2,label:"Витебская", key: "agentObl"},
      {value:3,label:"Гомельская", key: "agentObl"},
      {value:4,label:"Гродненская", key: "agentObl"},
      {value:6,label:"Минская", key: "agentObl"},
      {value:7,label:"Могилевская", key: "agentObl"}
    ]
  },
  agentRayonId: {
    key: "agentRayonId",
    value: "Район",
    type:'customSelect',
    selectOption:[]
  },
  agentGorodId: {
    key: "agentGorodId",
    value: "Город",
    type:'customSelect',
    selectOption:[{value:0, label:'Все'}]
  },
  agentUlica:{
    key: "agentUlica",
    value: "Улица",
    type:'text'
  },
  agentDom: {
    key: "agentDom",
    value: "Дом",
    type:'text'
  },
  agentKorpus: {
    key: "agentKorpus",
    value: "Корпус",
    type:'text'
  },
  agentKv:{
    key: "agentKv",
    value: "Квартира",
    type:'text'
  },
  agentPhone:{
    key: "agentPhone",
    value: "Телефон",
    type:'text'
  },
}

export const powerOfAttorney = {
  key: "powerOfAttorney",
  value: "Сведения о доверенности",
  type:'text'
}

export const setOptionsRayonForOblast = async (id) => {
      const response = await fetch(MAIN_URL + PORT + API_GET_DICTIONARY_RAYON_FOR_OBL + id);
      const result = await response.json();
      optionInfoRepresentPersonAddress.agentRayonId.selectOption.length = 0
      result.forEach(item => {
        optionInfoRepresentPersonAddress.agentRayonId.selectOption.push({value: item.id, label: item.name, key: "agentRayonId"})
      });
}

export const setOptionsGorodForRayon = async (id) => {
      const response = await fetch(MAIN_URL + PORT + API_GET_DICTIONARY_GOROD_FOR_RAYON + id);
      const result = await response.json();
      optionInfoRepresentPersonAddress.agentGorodId.selectOption.length = 0
      result.forEach(item => {
        optionInfoRepresentPersonAddress.agentGorodId.selectOption.push({value: item.id, label: item.name2, key: "agentGorodId"})
      });
}