import { getRayon, getGorod } from "../utilities";
export const fieldPassportOptions = {
  surname: {
    key: "surname",
    value: "Фамилия",
    type: "text",
    defaultValue: null,
    readOnly: false,
    required: true,
  },
  name: {
    key: "name",
    value: "Имя",
    type: "text",
    defaultValue: null,
    readOnly: false,
    required: true,
  },
  midname: {
    key: "midname",
    value: "Отчество",
    type: "text",
    defaultValue: null,
    readOnly: false,
    required: true,
  },
  docType: {
    key: "docType",
    value: "Документ",
    type: "selectSearch",
    defaultValue: null,
    readOnly: false,
    isSearchable: false,
    required: true,
    options: [
      {
        value: 1,
        label: "Паспорт",
        key: "docType",
      },
      {
        value: 2,
        label: "Вид на жительство",
        key: "docType",
      },
    ],
  },
  serialOfPassport: {
    key: "serialOfPassport",
    value: "Серия",
    type: "text",
    defaultValue: null,
    readOnly: false,
    required: true,
  },
  numberOfPassport: {
    key: "numberOfPassport",
    value: "Номер",
    type: "text",
    defaultValue: null,
    readOnly: false,
    required: true,
  },
  docDateIssue: {
    key: "docDateIssue",
    value: "Дата выдачи",
    type: "date",
    defaultValue: null,
    readOnly: false,
    required: true,
  },
  docDepartment: {
    key: "docDepartment",
    value: "Кем выдан",
    type: "text",
    defaultValue: null,
    readOnly: false,
    required: true,
  },
  persNum: {
    key: "persNum",
    value: "Идентификационный номер",
    type: "text",
    defaultValue: null,
    readOnly: false,
    required: true,
    maxlength: 15,
  },
};

export const fieldAddressOptions = {
  stranId: {
    key: "stranId",
    value: "Страна",
    type: "text",
    defaultValue: "Республика Беларусь",
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
    required: true,
    options: [],
  },
  gorodId: {
    key: "gorodId",
    value: "Город",
    type: "selectSearch",
    defaultValue: null,
    disabled: true,
    readOnly: false,
    isSearchable: true,
    required: true,
    options: [],
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
    value: "Квартира",
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
        fieldAddressOptions.rayonId.disabled = fieldAddressOptions.rayonId.options.length ? false : true;
        fieldAddressOptions.gorodId.options = [];
        fieldAddressOptions.gorodId.disabled = true;
        return fieldAddressOptions;
      }
      case "rayonId": {
        fieldAddressOptions.gorodId.options = await getGorod(id);
        fieldAddressOptions.gorodId.disabled = fieldAddressOptions.gorodId.options.length ? false : true;
        return fieldAddressOptions;
      }
      default:
        return fieldAddressOptions;
    }
  }
}
export function getOptions() {
  return {
    passport: fieldPassportOptions,
    address: fieldAddressOptions,
  };
}
