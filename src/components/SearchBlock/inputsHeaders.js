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
  rayonId: {
    key: "rayonId",
    value: "Участок",
    type: "selectRayon",
    selectOption: [{ value: 0, label: "Все" }],
  },
  status: {
    key: "status",
    value: "Статус",
    type: "select",
    selectOption: [
      { id: 0, value: "Все" },
      { id: 2, value: "Зарегистрировано" },
      { id: 1, value: "Черновик" },
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
  regNum: {
    key: "regNum",
    value: "Рег. номер судна",
    description: "В формате XX 1111",
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
  rayonId: {
    key: "rayonId",
    value: "Участок",
    type: "selectRayon",
    selectOption: [{ value: 0, label: "Все" }],
  },
  status: {
    key: "status",
    value: "Статус",
    type: "select",
    selectOption: [
      { id: 0, value: "Все" },
      { id: 2, value: "Зарегистрировано" },
      { id: 1, value: "Черновик" },
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
  rayonId: {
    key: "rayonId",
    value: "Участок",
    type: "selectRayon",
    selectOption: [{ value: 0, label: "Все" }],
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

export const setOptionsForInputs = (nsiCheckStatusOptions) => {
  if (inputsHeadersBasesBuildings.checkStatus.selectOption.length === 1) {
    inputsHeadersBasesBuildings.checkStatus.selectOption.push(...nsiCheckStatusOptions);
  }
};

export const setOptionsForInputsATE = (inputsOptions, path) => {
  switch (path) {
    case "smallboatsreg":
      if (inputsHeadersSmallBoatsRegistration.rayonId.selectOption.length === 1) {
        inputsHeadersSmallBoatsRegistration.rayonId.selectOption.push(...inputsOptions);
      }
      break;
    case "reginformationchanges":
      if (inputsRegInformChange.rayonId.selectOption.length === 1) {
        inputsRegInformChange.rayonId.selectOption.push(...inputsOptions);
      }
      break;
    case "dupshipsticket":
      if (inputsHeadersDuplicateShipsTicket.rayonId.selectOption.length === 1) {
        inputsHeadersDuplicateShipsTicket.rayonId.selectOption.push(...inputsOptions);
      }
      break;
  }
};
