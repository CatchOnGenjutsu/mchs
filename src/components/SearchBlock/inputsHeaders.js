import {optionsForModalWindow} from "../basesBuildings/ModalWindow/constansForModalWindow";

export const inputsHeadersSmallBoats = {
  ownerSurname:{
  key: "ownerSurname",
  value: "Фамилия",
  type:'text'
  },
  ownerName:{
  key: "ownerName",
  value: "Имя",
  type:'text'
  },
  ownerMidname:{
  key: "ownerMidname",
  value: "Отчество",
  type:'text'
  },
  regNum:{
  key: "regNum",
  value: "Рег. номер судна",
  description: "В формате XX 1111",
  type:'text'
  },
  leName:{
  key: "leName",
  value: "Наим. организации",
  type:'text'
  },
  leUnp:{
  key: "leUnp",
  value: "УНП",
  type:'text'
  },
  engvin:{
  key: "engvin",
  value: "Заводской номер двигателя",
  type:'text'
  },
  boatVin:{
  key: "boatVin",
  value: "Заводской номер судна",
  description: "Цифры и латиница",
  type:'text'
  },
  cardStatusCode:
    {
    key: "cardStatusCode",
    value: "Статус карточки",
    type:'select',
    selectOption:[{id:1,value:'Активная'},{id:0,value:'Архивная'},{id:2,value:'Все'}]
    },
}


export const inputsHeadersCertificates ={
  surname:{
  key: "surname",
  value: "Фамилия",
  type:'text'
  },
  name:{
  key: "name",
  value: "Имя",
  type:'text'
  },
  midname: {
  key: "midname",
  value: "Отчество",
  type:'text'
  },
  birthDate:{
  key: "birthDate",
  value: "Дата рождения",
  type:'date'
  },
  licenseNum:{
  key: "licenseNum",
  value: "Номер удост.",
  type:'text'
  },
  persNum:{
  key: "persNum",
  value: "Ид. номер",
  description: "В формате 1111111X111XX1",
  type:'text'
  },
  isActive: {
  key: "isActive",
  value: "Статус карточки",
  type:'select',
  selectOption:[{id:1,value:'Активная'},{id:0,value:'Архивная'},{id:2,value:'Все'}]
  }
}


export const inputsHeadersBasesBuildings ={
  ownerCommonName: {
  key: "ownerCommonName",
  value: "Наименование ЮЛ, ФИО эксплуатанта",
  type:'text'
  },
  location:{
  key: "location",
  value: "Местонах.\n" + "базы",
  type:'text'
  },
  startDate:{
  key: "startDate",
  value: "Дата последнего обследования от",
  type:'date'
  },
  endDate:{
  key: "endDate",
  value: "Дата последнего обследования до",
  type:'date'
  },
  checkStatus:{
  key: "checkStatus",
  value: "Результат обследования",
  type:'select',
  selectOption:[{id:0,value:''}]
  },
}


export const setOptionsForInputs = (nsiCheckStatusOptions)=>{
  if(inputsHeadersBasesBuildings.checkStatus.selectOption.length===1){
  inputsHeadersBasesBuildings.checkStatus.selectOption.push(...nsiCheckStatusOptions)
  }

}