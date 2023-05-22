export const fieldBoatOptionsDuplicate = {
  boatName: {
    key: "boatName",
    value: "Название (при наличии)",
    type: "text",
    readOnly: true,
    disabled: true,
    required: false,
  },
  boatVin: {
    key: "boatVin",
    value: "Заводской\n" + "(идентификационный) номер",
    type: "text",
    readOnly: true,
    disabled: true,
    required: false,
  },
  boatYear: {
    key: "boatYear",
    value: "Год постройки",
    type: "text",
    readOnly: true,
    disabled: true,
    required: false,
  },
  tiketNum: {
    key: "tiketNum",
    value: "Номер судового билета",
    type: "text",
    readOnly: true,
    disabled: true,
    required: false,
  },
  operDate: {
    key: "operDate",
    value: "Дата выдачи",
    type: "text",
    readOnly: true,
    disabled: true,
    required: false,
  },
};

// export function setOptionsReqForBoat() {
//   Object.values(fieldBoatOptionsDuplicate)
//   fieldBoatOptions.boatVid.options = kinds;
//   fieldBoatOptions.bodyMaterial.options = materials;
//   fieldBoatOptions.saCategory.options = saCategory;
//   return fieldBoatOptions;
// }
