import {
  MAIN_URL,
  PORT,
  API_GET_DICTIONARY_RAYON_FOR_OBL,
  API_GET_DICTIONARY_GOROD_FOR_RAYON,
} from "../../../../constants/constants";

import {setRayon,setGorod} from '../utilities'

export const optionInfoRepresentPersonSummary = {
  agentSurname: {
    key: "agentSurname",
    value: "Фамилия",
    type: "text",
  },
  agentName: {
    key: "agentName",
    value: "Имя",
    type: "text",
  },
  agentMidname: {
    key: "agentMidname",
    value: "Отчество",
    type: "text",
  },
  agentDocType: {
    key: "agentDocType",
    value: "Документ",
    type: "select",
    selectOption: [
      { value: 1, label: "Паспорт", key: "agentDocType" },
      { value: 2, label: "Вид на жительство", key: "agentDocType" },
    ],
  },
  agentSerialOfPassport: {
    key: "agentSerialOfPassport",
    value: "Серия",
    type: "text",
  },
  agentNumberOfPassport: {
    key: "agentNumberOfPassport",
    value: "Номер",
    type: "text",
  },
  agentDocDate: {
    key: "agentDocDate",
    value: "Дата выдачи:",
    type: "date",
  },
  agentDocDepartment: {
    key: "agentDocDepartment",
    value: "Кем выдан",
    type: "text",
  },
  agentPersNum: {
    key: "agentPersNum",
    value: "Идентификационный номер",
    type: "text",
  },
};

export const optionInfoRepresentPersonAddress = {
  agentCountry: {
    key: "agentCountry",
    value: "Страна",
    type: "text",
    readOnly: true,
    defaultValue: "Республика Беларусь"
  },
  agentOblId: {
    key: "agentOblId",
    value: "Область",
    type: "select",
    isDisabled: false,
    isSearchable: false,
    selectOption: [
      { value: 1, label: "Брестская", key: "agentOblId" },
      { value: 2, label: "Витебская", key: "agentOblId" },
      { value: 3, label: "Гомельская", key: "agentOblId" },
      { value: 4, label: "Гродненская", key: "agentOblId" },
      { value: 6, label: "Минская", key: "agentOblId" },
      { value: 7, label: "Могилевская", key: "agentOblId" },
    ],
  },
  agentRayonId: {
    key: "agentRayonId",
    value: "Район",
    type: "select",
    isSearchable: true,
    disabled: true,
    selectOption: [],
  },
  agentGorodId: {
    key: "agentGorodId",
    value: "Город",
    type: "select",
    isSearchable: true,
    disabled: true,
    selectOption: [],
  },
  agentUlica: {
    key: "agentUlica",
    value: "Улица",
    type: "text",
    readOnly: false
  },
  agentDom: {
    key: "agentDom",
    value: "Дом",
    type: "text",
    readOnly: false
  },
  agentKorpus: {
    key: "agentKorpus",
    value: "Корпус",
    type: "text",
    readOnly: false
  },
  agentKv: {
    key: "agentKv",
    value: "Квартира",
    type: "text",
    readOnly: false
  },
  agentPhone: {
    key: "agentPhone",
    value: "Телефон",
    type: "text",
    readOnly: false
  },
};

export const agentDoverennost = {
  key: "agentDoverennost",
  value: "Сведения о доверенности",
  type: "text",
  readOnly: false
};

export const setOptionsRayonForOblast = async (id) => {
  const response = await fetch(
    MAIN_URL + PORT + API_GET_DICTIONARY_RAYON_FOR_OBL + id,
  );
  const result = await response.json();
  console.log("agentOblId", result)
  optionInfoRepresentPersonAddress.agentRayonId.selectOption.length = 0;
  result.forEach((item) => {
    optionInfoRepresentPersonAddress.agentRayonId.selectOption.push({
      value: item.id,
      label: item.name,
      key: "agentRayonId",
    });
  });
  optionInfoRepresentPersonAddress.agentRayonId.disabled = false;
  optionInfoRepresentPersonAddress.agentGorodId.disabled = true;
  optionInfoRepresentPersonAddress.agentGorodId.selectOption = [];
  // return optionInfoRepresentPersonAddress;
};


// export async function setOptions(id,key) {
//   switch (key) {
//       case "oblId":{
//           fieldAddressOptions.rayonId.options = await setRayon(id, "optionsForInformationAboutIndividual")
//           fieldAddressOptions.rayonId.disabled=false
//           fieldAddressOptions.gorod_id.options = []
//           fieldAddressOptions.gorod_id.disabled = true
//           return fieldAddressOptions
//       }
//       case "rayonId":{
//           fieldAddressOptions.gorod_id.options = await  setGorod(id, "optionsForInformationAboutIndividuals")
//           fieldAddressOptions.gorod_id.disabled = false
//           return fieldAddressOptions
//       }
//       default: return fieldAddressOptions

//   }

// }
export const setOptionsGorodForRayon = async (id) => {
  const response = await fetch(
    MAIN_URL + PORT + API_GET_DICTIONARY_GOROD_FOR_RAYON + id,
  );
  const result = await response.json();
  optionInfoRepresentPersonAddress.agentGorodId.selectOption.length = 0;
  result.forEach((item) => {
    optionInfoRepresentPersonAddress.agentGorodId.selectOption.push({
      value: item.id,
      label: item.name2,
      key: "agentGorodId",
    });
  });
  optionInfoRepresentPersonAddress.agentGorodId.disabled = false;

};
