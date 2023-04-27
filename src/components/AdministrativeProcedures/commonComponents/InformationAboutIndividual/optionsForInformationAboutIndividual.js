import { setRayon, setGorod } from "../utilities";
export const fieldPassportOptions = {
  surname: {
    key: "surname",
    value: "Фамилия",
    type: "text",
    defaultValue: null,
    readOnly: false,
  },
  name: {
    key: "name",
    value: "Имя",
    type: "text",
    defaultValue: null,
    readOnly: false,
  },
  midname: {
    key: "midname",
    value: "Отчество",
    type: "text",
    defaultValue: null,
    readOnly: false,
  },
  docType: {
    key: "docType",
    value: "Документ",
    type: "selectSearch",
    defaultValue: null,
    readOnly: false,
    isSearchable: false,
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
  },
  numberOfPassport: {
    key: "numberOfPassport",
    value: "Номер",
    type: "text",
    defaultValue: null,
    readOnly: false,
  },
  docDateIssue: {
    key: "docDateIssue",
    value: "Дата выдачи",
    type: "date",
    defaultValue: null,
    readOnly: false,
  },
  docDepartment: {
    key: "docDepartment",
    value: "Кем выдан",
    type: "text",
    defaultValue: null,
    readOnly: false,
  },
  persNum: {
    key: "persNum",
    value: "Идентификационный номер",
    type: "text",
    defaultValue: null,
    readOnly: false,
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
  },
  gorod_id: {
    key: "gorod_id",
    value: "Город",
    type: "selectSearch",
    defaultValue: null,
    disabled: true,
    readOnly: false,
    isSearchable: true,
    options: [],
  },
  ulica: {
    key: "ulica",
    value: "Улица",
    type: "text",
    defaultValue: null,
    readOnly: false,
  },
  korpus: {
    key: "korpus",
    value: "Корпус",
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
  },
};

export async function setOptions(id, key) {
  switch (key) {
    case "oblId": {
      fieldAddressOptions.rayonId.options = await setRayon(id);
      fieldAddressOptions.rayonId.disabled = false;
      fieldAddressOptions.gorod_id.options = [];
      fieldAddressOptions.gorod_id.disabled = true;
      return fieldAddressOptions;
    }
    case "rayonId": {
      fieldAddressOptions.gorod_id.options = await setGorod(id);
      fieldAddressOptions.gorod_id.disabled = false;
      return fieldAddressOptions;
    }
    default:
      return fieldAddressOptions;
  }
}
