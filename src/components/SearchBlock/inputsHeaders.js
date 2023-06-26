import { optionsForModalWindow } from "../basesBuildings/ModalWindow/constansForModalWindow";

export const inputsHeadersSmallBoats = {
  ownerSurname: {
    key: "ownerSurname",
    value: "Фамилия",
    type: "text",
  },
  ownerName: {
    key: "ownerName",
    value: "Имя",
    type: "text",
  },
  ownerMidname: {
    key: "ownerMidname",
    value: "Отчество",
    type: "text",
  },
  regNum: {
    key: "regNum",
    value: "Рег. номер судна",
    description: "В формате XX 1111",
    type: "text",
  },
  leName: {
    key: "leName",
    value: "Наим. организации",
    type: "text",
  },
  leUnp: {
    key: "leUnp",
    value: "УНП",
    type: "text",
  },
  engvin: {
    key: "engvin",
    value: "Заводской номер двигателя",
    type: "text",
  },
  boatVin: {
    key: "boatVin",
    value: "Заводской номер судна",
    description: "Цифры и латиница",
    type: "text",
  },
  cardStatusCode: {
    key: "cardStatusCode",
    value: "Статус карточки",
    type: "select",
    selectOption: [
      { id: 1, value: "Активная" },
      { id: 0, value: "Архивная" },
      { id: 2, value: "Все" },
    ],
  },
};

export const inputsHeadersCertificates = {
  surname: {
    key: "surname",
    value: "Фамилия",
    type: "text",
  },
  name: {
    key: "name",
    value: "Имя",
    type: "text",
  },
  midname: {
    key: "midname",
    value: "Отчество",
    type: "text",
  },
  birthDate: {
    key: "birthDate",
    value: "Дата рождения",
    type: "date",
  },
  licenseNum: {
    key: "licenseNum",
    value: "Номер удост.",
    type: "text",
  },
  persNum: {
    key: "persNum",
    value: "Ид. номер",
    description: "В формате 1111111X111XX1",
    type: "text",
  },
  isActive: {
    key: "isActive",
    value: "Статус карточки",
    type: "select",
    selectOption: [
      { id: 1, value: "Активная" },
      { id: 0, value: "Архивная" },
      { id: 2, value: "Все" },
    ],
  },
};

export const inputsHeadersBasesBuildings = {
  ownerCommonName: {
    key: "ownerCommonName",
    value: "Наименование ЮЛ, ФИО эксплуатанта",
    type: "text",
  },
  ownerUnp: {
    key: "ownerUnp",
    value: "УНП",
    type: "text",
  },
  location: {
    key: "location",
    value: "Местонах.\n" + "базы",
    type: "text",
  },
  startDate: {
    key: "startDate",
    value: "Дата последнего обследования от",
    type: "date",
  },
  endDate: {
    key: "endDate",
    value: "Дата последнего обследования до",
    type: "date",
  },
  checkStatus: {
    key: "checkStatus",
    value: "Результат обследования",
    type: "select",
    selectOption: [{ id: 0, value: "" }],
  },
};

export const inputsHeadersSmallBoatsRegistration = {
  surname: {
    key: "surname",
    value: "Фамилия",
    type: "text",
  },
  name: {
    key: "name",
    value: "Имя",
    type: "text",
  },
  midname: {
    key: "midname",
    value: "Отчество",
    type: "text",
  },
  appNum: {
    key: "appNum",
    value: "Рег. номер заявления",
    type: "text",
  },
  unp: {
    key: "unp",
    value: "УНП",
    type: "text",
  },
  nameLe: {
    key: "nameLe",
    value: "Наименование организации",
    type: "text",
  },
  section: {
    key: "section",
    value: "Участок",
    type: "selectRayon",
    selectOption: [{ value: 0, label: "Все", key: "section" }],
  },
  status: {
    key: "status",
    value: "Статус",
    type: "select",
    selectOption: [
      { id: 0, value: "Все" },
      { id: 3, value: "К выдаче" },
      { id: 1, value: "Зарегистрировано" },
      { id: 2, value: "Отказано" },
    ],
  },
};
export const inputsRegInformChange = {
  surname: {
    key: "surname",
    value: "Фамилия",
    type: "text",
  },
  name: {
    key: "name",
    value: "Имя",
    type: "text",
  },
  midname: {
    key: "midname",
    value: "Отчество",
    type: "text",
  },
  appNum: {
    key: "appNum",
    value: "Рег. номер заявления",
    type: "text",
  },
  nameLe: {
    key: "nameLe",
    value: "Наименование организации",
    type: "text",
  },
  unp: {
    key: "unp",
    value: "УНП",
    type: "text",
  },
  section: {
    key: "section",
    value: "Участок",
    type: "selectRayon",
    selectOption: [{ value: 0, label: "Все", key: "section" }],
  },
  status: {
    key: "status",
    value: "Статус",
    type: "select",
    selectOption: [
      { id: 0, value: "Все" },
      { id: 1, value: "Зарегистрировано" },
      { id: 2, value: "Отказано" },
      { id: 3, value: "К выдаче" },
      { id: 4, value: "АП завершена" },
    ],
  },
};
export const inputsFindBoatToChange = {
  ownerSurname: {
    key: "ownerSurname",
    value: "Фамилия",
    type: "text",
  },
  ownerName: {
    key: "ownerName",
    value: "Имя",
    type: "text",
  },
  ownerMidname: {
    key: "ownerMidname",
    value: "Отчество",
    type: "text",
  },
  regNum: {
    key: "regNum",
    value: "Рег. номер судна",
    description: "В формате XX 1111",
    type: "text",
  },
  leName: {
    key: "leName",
    value: "Наим. организации",
    type: "text",
  },
  leUnp: {
    key: "leUnp",
    value: "УНП организации",
    type: "text",
  },
  boatVin: {
    key: "boatVin",
    value: "Зав. номер судна",
    description: "Цифры и латиница",
    type: "text",
  },
  engvin: {
    key: "engvin",
    value: "Заводской номер двигателя",
    description: "Цифры и латиница",
    type: "text",
  },
};

export const inputsHeadersDuplicateShipsTicket = {
  surname: {
    key: "surname",
    value: "Фамилия",
    type: "text",
  },
  name: {
    key: "name",
    value: "Имя",
    type: "text",
  },
  midname: {
    key: "midname",
    value: "Отчество",
    type: "text",
  },
  appNum: {
    key: "regNum",
    value: "Рег. номер судна",
    type: "text",
  },
  unp: {
    key: "unp",
    value: "УНП",
    type: "text",
  },
  nameLe: {
    key: "nameLe",
    value: "Наименование организации",
    type: "text",
  },
  section: {
    key: "section",
    value: "Участок",
    type: "selectRayon",
    selectOption: [{ value: 0, label: "Все", key: "section" }],
  },
  status: {
    key: "status",
    value: "Статус",
    type: "select",
    selectOption: [
      { id: 0, value: "Все" },
      { id: 3, value: "К выдаче" },
      { id: 8, value: "Выдан" },
      { id: 2, value: "Отказано" },
    ],
  },
};
export const inputsHeadersShipsTicket = {
  surname: {
    key: "surname",
    value: "Фамилия",
    type: "text",
  },
  name: {
    key: "name",
    value: "Имя",
    type: "text",
  },
  midname: {
    key: "midname",
    value: "Отчество",
    type: "text",
  },
  //Это что за хрень проверить
  appNum: {
    //Это что за хрень проверить
    key: "regNum",
    value: "Рег. номер судна",
    type: "text",
  },
  unp: {
    key: "unp",
    value: "УНП",
    type: "text",
  },
  nameLe: {
    key: "nameLe",
    value: "Наименование организации",
    type: "text",
  },
  section: {
    key: "section",
    value: "Участок",
    type: "selectRayon",
    selectOption: [{ value: 0, label: "Все", key: "section" }],
  },
  status: {
    key: "status",
    value: "Статус",
    type: "select",
    selectOption: [
      { id: 0, value: "Все" },
      { id: 3, value: "К выдаче" },
      { id: 8, value: "Выдан" },
      { id: 2, value: "Отказано" },
    ],
  },
};
export const inputsProvisionInformation = {
  surname: {
    key: "surname",
    value: "Фамилия",
    type: "text",
  },
  name: {
    key: "name",
    value: "Имя",
    type: "text",
  },
  midname: {
    key: "midname",
    value: "Отчество",
    type: "text",
  },
  appNum: {
    key: "appNum",
    value: "Рег. номер заявления",
    type: "text",
  },
  nameLe: {
    key: "nameLe",
    value: "Наименование организации",
    type: "text",
  },
  unp: {
    key: "unp",
    value: "УНП",
    type: "text",
  },
  section: {
    key: "section",
    value: "Участок",
    type: "selectRayon",
    selectOption: [{ value: 0, label: "Все", key: "section" }],
  },
  status: {
    key: "status",
    value: "Статус",
    type: "select",
    selectOption: [
      { id: 0, value: "Все" },
      { id: 1, value: "Зарегистрировано" },
      { id: 4, value: "АП Завершена" },
    ],
  },
};

export const inputsHeadersTransportAccidentsReport = {
  section: {
    key: "section",
    value: "Участок",
    type: "selectRayon",
    selectOption: [{ value: 0, label: "Все", key: "section" }],
  },
  ownerSurname: {
    key: "ownerSurname",
    value: "Фамилия судовладельца",
    type: "text",
  },
  ownerName: {
    key: "ownerName",
    value: "Имя судовладельца",
    type: "text",
  },
  ownerMidname: {
    key: "ownerMidname",
    value: "Отчество судовладельца",
    type: "text",
  },
  boatRegNum: {
    key: "boatRegNum",
    value: "Регистрационный номер судна",
    type: "text",
  },
  incidentType: {
    key: "incidentType",
    value: "Вид транспортного аварийного случая",
    type: "selectRayon",
    selectOption: [
      { value: 0, label: "Все", key: "incidentType" },
      { value: 1, label: "Авария", key: "incidentType" },
      { value: 2, label: "Инциндент", key: "incidentType" },
    ],
  },
  incidentPlace: {
    key: "incidentPlace",
    value: "Место транспортного аварийного случая",
    type: "text",
  },
  date1: {
    key: "date1",
    value: "Дата с",
    type: "date",
  },
  date2: {
    key: "date2",
    value: "Дата по",
    type: "date",
  },
  driverDrunk: {
    key: "driverDrunk",
    value: "Алкогольное опьянение",
    type: "selectRayon",
    selectOption: [
      { value: 0, label: "Все", key: "driverDrunk" },
      { value: true, label: "Да", key: "driverDrunk" },
      { value: false, label: "Нет", key: "driverDrunk" },
    ],
  },
};

export const setOptionsForInputs = (nsiCheckStatusOptions) => {
  if (inputsHeadersBasesBuildings.checkStatus.selectOption.length === 1) {
    inputsHeadersBasesBuildings.checkStatus.selectOption.push(...nsiCheckStatusOptions);
  }
};

export const setOptionsForInputsATE = (inputsOptions, path) => {
  switch (path) {
    case "smallboatsreg":
      if (inputsHeadersSmallBoatsRegistration.section.selectOption.length === 1) {
        inputsHeadersSmallBoatsRegistration.section.selectOption.push(...inputsOptions);
      }
      break;
    case "reginformationchanges":
      if (inputsRegInformChange.section.selectOption.length === 1) {
        inputsRegInformChange.section.selectOption.push(...inputsOptions);
      }
      break;
    case "provisioninformation":
      if (inputsProvisionInformation.section.selectOption.length === 1) {
        inputsProvisionInformation.section.selectOption.push(...inputsOptions);
      }
      break;
    case "dupshipsticket":
      if (inputsHeadersDuplicateShipsTicket.section.selectOption.length === 1) {
        inputsHeadersDuplicateShipsTicket.section.selectOption.push(...inputsOptions);
      }
      break;
    case "shipsticket":
      if (inputsHeadersShipsTicket.section.selectOption.length === 1) {
        inputsHeadersShipsTicket.section.selectOption.push(...inputsOptions);
      }
      break;
    case "transportaccidents":
      if (inputsHeadersTransportAccidentsReport.section.selectOption.length === 1) {
        inputsHeadersTransportAccidentsReport.section.selectOption.push(...inputsOptions);
      }
      break;
  }
};
