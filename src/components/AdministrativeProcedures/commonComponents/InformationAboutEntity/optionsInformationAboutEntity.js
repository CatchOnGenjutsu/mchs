import { getRayon, getGorod } from "../../../../utilities";

export const fieldLEInformOptions = {
  nameLe: {
    key: "nameLe",
    value: "Наименование ЮЛ",
    type: "text",
    defaultValue: null,
    readOnly: false,
    required: true,
  },
  docDepartmentLe: {
    key: "docDepartmentLe",
    value: "Наименование гос. организации, осуществляющей регистрацию",
    type: "text",
    defaultValue: null,
    readOnly: false,
    required: true,
  },
  egrNum: {
    key: "egrNum",
    value: "Единый  ЕГРЮЛиИП",
    type: "text",
    defaultValue: null,
    readOnly: false,
    required: true,
  },
  unp: {
    key: "unp",
    value: "УНП",
    type: "text",
    defaultValue: null,
    readOnly: false,
    required: true,
  },
};

export const fieldAddressOptions = {
  stranId: {
    key: "stranId",
    value: "Страна",
    type: "text",
    defaultValue: "Республика Беларусь",
    disabled: true,
    readOnly: true,
  },
  oblId: {
    key: "oblId",
    value: "Область",
    type: "selectSearch",
    defaultValue: null,
    disabled: false,
    readOnly: false,
    isSearchable: false,
    required: true,
    options: [
      { value: 1, label: "Брестская", key: "oblId" },
      { value: 2, label: "Витебская", key: "oblId" },
      { value: 3, label: "Гомельская", key: "oblId" },
      { value: 4, label: "Гродненская", key: "oblId" },
      { value: 6, label: "Минская", key: "oblId" },
      { value: 7, label: "Могилевская", key: "oblId" },
    ],
  },
  rayonId: {
    key: "rayonId",
    value: "Район",
    type: "selectSearch",
    defaultValue: null,
    disabled: true,
    readOnly: false,
    isSearchable: true,
    options: [],
    required: true,
  },
  gorodId: {
    key: "gorodId",
    value: "Город",
    type: "selectSearch",
    defaultValue: null,
    disabled: true,
    readOnly: false,
    isSearchable: true,
    options: [],
    required: true,
  },
  ulica: {
    key: "ulica",
    value: "Улица",
    type: "text",
    defaultValue: null,
    readOnly: false,
  },
  dom: {
    key: "dom",
    value: "Дом",
    type: "text",
    defaultValue: null,
    readOnly: false,
    required: true,
  },
  korpus: {
    key: "korpus",
    value: "Корпус",
    type: "text",
    defaultValue: null,
    readOnly: false,
  },
  kv: {
    key: "kv",
    value: "Квартира (офис)",
    type: "text",
    defaultValue: null,
    readOnly: false,
  },
  phone: {
    key: "phone",
    value: "Телефон",
    type: "text",
    defaultValue: null,
    readOnly: false,
    required: true,
  },
};

export async function setOptions(id, key) {
 if(id){
   switch (key) {
     case "oblId": {
       fieldAddressOptions.rayonId.options = await getRayon(id);
       fieldAddressOptions.rayonId.disabled = fieldAddressOptions.rayonId.options.length ?false:true;
       fieldAddressOptions.gorodId.options = [];
       fieldAddressOptions.gorodId.disabled = true;
       return fieldAddressOptions;
     }
     case "rayonId": {
       fieldAddressOptions.gorodId.options = await getGorod(id);
       fieldAddressOptions.gorodId.disabled = fieldAddressOptions.gorodId.options.length ?false:true;
       return fieldAddressOptions;
     }
     default:
       return fieldAddressOptions;
   }
 }
}
export function getOptions() {
  return {
    infoEntity: fieldLEInformOptions,
    address: fieldAddressOptions,
  }
}