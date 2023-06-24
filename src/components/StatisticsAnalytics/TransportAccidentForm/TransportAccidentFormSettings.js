export const TransportAccidentFormSettingsIndividual = {
  sectionId: {
    key: "sectionId",
    value: "Участок",
    type: "select",
    flexDirection: "inline",
    options: [
      // { value: 0, label: "Все", key: "section" }
    ],
  },
  inspectorId: {
    key: "inspectorId",
    value: "Инспектор",
    type: "select",
    flexDirection: "inline",
    options: [
      // { value: 0, label: "", key: "inspectorId" }
    ],
  },
  boatRegNum: {
    key: "boatRegNum",
    value: "Регистрационный номер судна",
    type: "text",
    flexDirection: "column",
  },
  boatVidId: {
    key: "boatVidId",
    value: "Вид маломерного судна",
    type: "select",
    flexDirection: "column",
    defaultValue: null,
    readOnly: false,
    options: [],
    disabled: false,
    required: true,
  },
  boatTypeId: {
    key: "boatTypeId",
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
    value: "Дата рождения",
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
    value: "Дата рождения",
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

export const TransportAccidentFormSettingsEntity = {
  sectionId: {
    key: "sectionId",
    value: "Участок",
    type: "select",
    flexDirection: "inline",
    options: [
      // { value: 0, label: "Все", key: "section" }
    ],
  },
  inspectorId: {
    key: "inspectorId",
    value: "Инспектор",
    type: "select",
    flexDirection: "inline",
    options: [
      // { value: 0, label: "", key: "inspector" }
    ],
  },
  boatRegNum: {
    key: "boatRegNum",
    value: "Регистрационный номер судна",
    type: "text",
    flexDirection: "column",
  },
  boatVidId: {
    key: "boatVidId",
    value: "Вид маломерного судна",
    type: "select",
    flexDirection: "column",
    defaultValue: null,
    readOnly: false,
    options: [],
    disabled: false,
    required: true,
  },
  boatTypeId: {
    key: "boatTypeId",
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
  leName: {
    key: "leName",
    value: "Наименование судовладельца",
    type: "text",
    flexDirection: "column",
  },
  leUnp: {
    key: "leUnp",
    value: "УНП судовладельца",
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
    value: "Дата рождения",
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
      value: "Фамилия",
      key: "surname",
      type: "text",
      neededInModal: true,
    },
    {
      value: "Имя",
      key: "name",
      type: "text",
      neededInModal: true,
    },
    {
      value: "Отчество",
      key: "midname",
      type: "text",
      neededInModal: true,
    },
    {
      value: "Дата рождения",
      key: "birthDate",
      type: "date",
      neededInModal: true,
    },
    {
      value: "Место работы",
      key: "workplace",
      type: "text",
      neededInModal: true,
    },
    {
      value: "Агкогольное опьянение",
      key: "drunk",
      type: "select",
      selectOptions: [
        { value: true, label: "Да", key: "drunk" },
        { value: false, label: "Нет", key: "drunk" },
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
      value: "Фамилия",
      key: "surname",
      type: "text",
      neededInModal: true,
    },
    {
      value: "Имя",
      key: "name",
      type: "text",
      neededInModal: true,
    },
    {
      value: "Отчество",
      key: "midname",
      type: "text",
      neededInModal: true,
    },
    {
      value: "Дата рождения",
      key: "birthDate",
      type: "date",
      neededInModal: true,
    },
    {
      value: "Место работы",
      key: "workplace",
      type: "text",
      neededInModal: true,
    },
    {
      value: "Агкогольное опьянение",
      key: "drunk",
      type: "select",
      selectOptions: [
        { value: true, label: "Да", key: "drunk" },
        { value: false, label: "Нет", key: "drunk" },
      ],
      neededInModal: true,
    },
  ],
};

export const TransportAccidentFormSettingsFooter = {
  incidentType: {
    key: "incidentType",
    value: "Вид транспортного аварийного случая",
    type: "select",
    options: [
      { value: 1, label: "Авария", key: "incidentType" },
      { value: 2, label: "Инцендент", key: "incidentType" },
    ],
  },
  deadAdult: {
    key: "deadAdult",
    value: "Количество погибших взрослых",
    type: "text",
    flexDirection: "column",
  },
  deadDrunk: {
    key: "deadDrunk",
    value: "Количество погибших в состоянии алкогольного опьянения",
    type: "text",
    flexDirection: "column",
  },
  deadChildren: {
    key: "deadChildren",
    value: "Количество погибших детей",
    type: "text",
    flexDirection: "column",
  },
  saveNum: {
    key: "saveNum",
    value: "Количество спасенных",
    type: "text",
    flexDirection: "column",
  },
  note: {
    key: "note",
    value: "Примечание",
    type: "text",
    flexDirection: "column",
  },
};

export const setOptionsForInputsATE = (inputsOptions, path) => {
  console.log(path);
  switch (true) {
    case path.includes("individual"):
      if (TransportAccidentFormSettingsIndividual.sectionId.options.length === 0) {
        TransportAccidentFormSettingsIndividual.sectionId.options.push(...inputsOptions);
      }
      break;
    case path.includes("entity"):
      if (TransportAccidentFormSettingsEntity.sectionId.options.length === 0) {
        TransportAccidentFormSettingsEntity.sectionId.options.push(...inputsOptions);
      }
      break;
    default:
      break;
  }
  if (path.includes("individual")) {
    return TransportAccidentFormSettingsIndividual;
  } else {
    return TransportAccidentFormSettingsEntity;
  }
};

export const setOptionsForInputsUsers = (inputsOptions, path) => {
  switch (true) {
    case path.includes("individual"):
      TransportAccidentFormSettingsIndividual.inspectorId.options = inputsOptions.map((item) => {
        return { value: item.userid, label: item.name, key: "inspectorId" };
      });
      break;
    case path.includes("entity"):
      TransportAccidentFormSettingsEntity.inspectorId.options = inputsOptions.map((item) => {
        return { value: item.userid, label: item.name, key: "inspectorId" };
      });
      break;
    default:
      break;
  }
  if (path.includes("individual")) {
    return TransportAccidentFormSettingsIndividual;
  } else {
    return TransportAccidentFormSettingsEntity;
  }
};

export function setOptionsForBoat(types, kinds, path) {
  TransportAccidentFormSettingsIndividual.boatTypeId.options = types.map((item) => {
    item.key = "boatTypeId";
    return item;
  });
  TransportAccidentFormSettingsIndividual.boatVidId.options = kinds.map((item) => {
    item.key = "boatVidId";
    return item;
  });
  TransportAccidentFormSettingsEntity.boatTypeId.options = types.map((item) => {
    item.key = "boatTypeId";
    return item;
  });
  TransportAccidentFormSettingsEntity.boatVidId.options = kinds.map((item) => {
    item.key = "boatVidId";
    return item;
  });
  console.log(new Date().toISOString());
  if (path.includes("individual")) {
    return TransportAccidentFormSettingsIndividual;
  } else {
    return TransportAccidentFormSettingsEntity;
  }
  // fieldBoatOptions.bodyMaterial.options = materials;
  // fieldBoatOptions.saCategory.options = saCategory;
}
