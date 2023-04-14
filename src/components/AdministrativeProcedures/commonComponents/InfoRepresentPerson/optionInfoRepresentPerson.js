import {
  MAIN_URL,
  PORT,
  API_GET_DICTIONARY_RAYON_FOR_OBL,
  API_GET_DICTIONARY_GOROD_FOR_RAYON
} from "../../../../constants/constants"


export const optionInfoRepresentPersonLeft = {
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
    selectOption: [{id:1, value:'Паспорт'}, {id:2, value:'Вид на жительство'}]
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

export const optionInfoRepresentPersonRight = {
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
      {id:1,value:"Брестская"},
      {id:2,value:"Витебская"},
      {id:3,value:"Гомельская"},
      {id:4,value:"Гродненская"},
      {id:5,value:"Минск"},
      {id:6,value:"Минская"},
      {id:7,value:"Могилевская"}
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

export const setOptionsRayonForOblast = async (path, id) => {
  switch (true) {
    case path.includes("smallboatsreg"):
      const response = await fetch(MAIN_URL + PORT + API_GET_DICTIONARY_RAYON_FOR_OBL + id);
      const result = await response.json();
      optionInfoRepresentPersonRight.agentRayonId.selectOption.length = 0
      result.forEach(item => {
        optionInfoRepresentPersonRight.agentRayonId.selectOption.push({value: item.id, label: item.name, key: "rayon"})
      });
      console.log("result", result)
      break;
  
    default:
      break;
  }
}

export const setOptionsGorodForRayon = async (path, id) => {
  switch (true) {
    case path.includes("smallboatsreg"):
      const response = await fetch(MAIN_URL + PORT + API_GET_DICTIONARY_GOROD_FOR_RAYON + id);
      const result = await response.json();
      optionInfoRepresentPersonRight.agentGorodId.selectOption.length = 0
      result.forEach(item => {
        optionInfoRepresentPersonRight.agentGorodId.selectOption.push({value: item.id, label: item.name2, key: "gorod"})
      });
      console.log("result", result)
      break;
  
    default:
      break;
  }
}