// import {
//   setOptionsTypesBoat,
//   setOptionsVidBoat,
//   setOptionsBodyBoat,
//   setReadOptionForInputs,
//   setOptionsSaCategory,
// } from "../../AdministrativeProcedures/commonComponents/utilities";
import {
  setOptionsTypesBoat,
  setOptionsVidBoat,
} from "../../AdministrativeProcedures/commonComponents/utilities";
export const TransportAccidentFormSettings = {
  section: {
    key: "section",
    value: "Участок",
    type: "select",
    flexDirection: "inline",
    options: [{ value: 0, label: "Все", key: "section" }],
  },
  inspector: {
    key: "inspector",
    value: "Инспектор",
    type: "select",
    flexDirection: "inline",
    options: [{ value: 0, label: "", key: "inspector" }],
  },
  boatRegNum: {
    key: "boatRegNum",
    value: "Регистрационный номер судна",
    type: "text",
    flexDirection: "column",
  },
  boatVid: {
    key: "boatVid",
    value: "Вид маломерного судна",
    type: "select",
    flexDirection: "column",
    defaultValue: null,
    readOnly: false,
    options: [],
    disabled: false,
    required: true,
  },
  boatType: {
    key: "boatType",
    value: "Тип маломерного судна",
    type: "select",
    flexDirection: "column",
    defaultValue: null,
    readOnly: false,
    options: [],
    disabled: false,
    required: true,
  },
  boatName: {
    key: "boatName",
    value: "Название маломерного судна",
    type: "text",
    flexDirection: "column",
  },
  incidentDate: {
    key: "incidentDate",
    value: "Дата аварийного случая*",
    type: "date",
    flexDirection: "column",
  },
  incidentTime: {
    key: "incidentTime",
    value: "Время аварийного случая",
    type: "text",
    flexDirection: "column",
  },
  incidentPlace: {
    key: "incidentPlace",
    value: "Место аварийного случая *",
    type: "text",
    flexDirection: "column",
  },
  incidentReasons: {
    key: "incidentReasons",
    value: "Причины аварийного случая",
    type: "text",
    flexDirection: "column",
  },
  ownerSurname: {
    key: "ownerSurname",
    value: "Фамилия судовладельца",
    type: "text",
    flexDirection: "column",
  },
  ownerName: {
    key: "ownerName",
    value: "Имя судовладельца",
    type: "text",
    flexDirection: "column",
  },
  ownerMidname: {
    key: "ownerMidname",
    value: "Отчество судовладельца",
    type: "text",
    flexDirection: "column",
  },
  ownerBirthDate: {
    key: "ownerBirthDate",
    value: "Дата рождения судовладельца",
    type: "date",
    flexDirection: "column",
  },
  ownerWorkplace: {
    key: "ownerWorkplace",
    value: "Место работы",
    type: "text",
    flexDirection: "column",
  },
  driverSurname: {
    key: "driverSurname",
    value: "Фамилия судоводителя",
    type: "text",
    flexDirection: "column",
  },
  driverName: {
    key: "driverName",
    value: "Имя судоводителя",
    type: "text",
    flexDirection: "column",
  },
  driverMidname: {
    key: "driverMidname",
    value: "Отчество судоводителя",
    type: "text",
    flexDirection: "column",
  },
  driverBirthDate: {
    key: "driverBirthDate",
    value: "Дата рождения судоводителя",
    type: "date",
    flexDirection: "column",
  },
  driverWorkplace: {
    key: "driverWorkplace",
    value: "Место работы",
    type: "text",
    flexDirection: "column",
  },
  driverDrunk: {
    key: "driverDrunk",
    value: "Агкогольное опьянение",
    type: "select",
    isSearchable: false,
    options: [
      { value: true, label: "Да", key: "driverDrunk" },
      { value: false, label: "Нет", key: "driverDrunk" },
    ],
    flexDirection: "column",
  },
};

export const culpritsListOptions = {
  keyTable: "culpritsList",
  caption: "Сведения о виновниках",
  nameColumn: [
    {
      value: "Фамилия виновника",
      key: "culpritSurname",
      type: "text",
      neededInModal: true,
    },
    {
      value: "Имя виновника",
      key: "culpritName",
      type: "text",
      neededInModal: true,
    },
    {
      value: "Отчество виновника",
      key: "culpritMidname",
      type: "text",
      neededInModal: true,
    },
    {
      value: "Дата рождения виновника",
      key: "culpritBirthDate",
      type: "date",
      neededInModal: true,
    },
    {
      value: "Место работы",
      key: "culpritWorkplace",
      type: "text",
      neededInModal: true,
    },
    {
      value: "Агкогольное опьянение",
      key: "culpritDrunk",
      type: "select",
      selectOptions: [
        { value: 1, label: "Да", key: "engtype" },
        { value: 2, label: "Нет", key: "engtype" },
      ],
      neededInModal: true,
    },
  ],
};
export const injuredsListOptions = {
  keyTable: "injuredsList",
  caption: "Сведения о постарадавших",
  nameColumn: [
    {
      value: "Фамилия постадавшего",
      key: "injuredSurname",
      type: "text",
      neededInModal: true,
    },
    {
      value: "Имя постадавшего",
      key: "injuredName",
      type: "text",
      neededInModal: true,
    },
    {
      value: "Отчество постадавшего",
      key: "injuredMidname",
      type: "text",
      neededInModal: true,
    },
    {
      value: "Дата рождения постадавшего",
      key: "injuredBirthDate",
      type: "date",
      neededInModal: true,
    },
    {
      value: "Место работы",
      key: "injuredWorkplace",
      type: "text",
      neededInModal: true,
    },
    {
      value: "Агкогольное опьянение",
      key: "injuredDrunk",
      type: "select",
      selectOptions: [
        { value: 1, label: "Да", key: "engtype" },
        { value: 2, label: "Нет", key: "engtype" },
      ],
      neededInModal: true,
    },
  ],
};

export const setOptionsForInputsATE = (inputsOptions) => {
  if (TransportAccidentFormSettings.section.options.length === 1) {
    TransportAccidentFormSettings.section.options.push(...inputsOptions);
  }
};

export const setOptionsForInputsUsers = (inputsOptions) => {
  TransportAccidentFormSettings.inspector.options = inputsOptions.map((item) => {
    return { value: item.userid, label: item.name, key: "inspector" };
  });
};

export function setOptionsForBoat(types, kinds) {
  TransportAccidentFormSettings.boatType.options = types;
  TransportAccidentFormSettings.boatVid.options = kinds;
  console.log(TransportAccidentFormSettings.boatType.options);
  console.log(TransportAccidentFormSettings.boatVid.options);
  // fieldBoatOptions.bodyMaterial.options = materials;
  // fieldBoatOptions.saCategory.options = saCategory;
  return TransportAccidentFormSettings;
}
