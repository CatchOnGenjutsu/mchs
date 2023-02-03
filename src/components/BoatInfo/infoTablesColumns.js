export const primaryTableLines = [
  {
    id: "regNum",
    value: "Регистрацонный номер маломерного судна:",
    key: ""
  },
  {
    id: "boatName",
    value: "Название маломерного судна:",
    key: ""
  },
  {
    id: "parkingPlace",
    value:
      "Местоположение (включая юридический адрес и страну):",
    key: ""
  },
  {
    id: "something",
    value:
      "Информация об организации-строителя маломерного судна или изготовителя:",
    key: ""
  },
  {
    id: "boatType",
    value: "Тип:",
    key: "btname"
  },
  {
    id: "something",
    value: "Вид:",
    key: ""
  },
  {
    id: "something",
    value: "Год постройки:",
    key: ""
  },
  {
    id: "boatVin",
    value: "Заводской номер:",
    key: ""
  },
  {
    id: "engineNum",
    value: "Количество двигателей:",
    key: ""
  }
];

export const sizeTableColumns = [
  {
    id: "boatLength",
    value: "Длина (м)",
    key: "",
  },
  {
    id: "boatWidth",
    value: "Ширина (м)",
    key: "",
  },
  {
    id: "boatHeight",
    value: "Высота борта (м)",
    key: "",
  },
  {
    id: "bodyMaterial",
    value: "Материал корпуса",
    key: "matname",
  },
  {
    id: "boatPayload",
    value: "Грузоподъёмность (кг)",
    key: "",
  },
  {
    id: "passengersNum",
    value: "Пассажировместимость",
    key: "",
  },
];

export const toTableColumns = [
  {
    id: "toDate",
    value: "Дата",
    key: "",
  },
  {
    id: "name",
    value: "Должностное лицо, проводившее ТО (Ф.И.О., номер печати)",
    key: "stampNum",
  },
  {
    id: "result",
    value: "Годное/негодное",
    key: "",
  },
  {
    id: "docname",
    value: "№ акта ТО маломерного судна при признании его негодным (запрещенным к эксплуатации)",
    key: "",
  },
  {
    id: "name",
    value: "Ф.И.О. составителя",
    key: "",
  },
  {
    id: "docdate",
    value: "Время составления акта",
    key: "",
  },
]

export const userTableColumns = [
  {
    id: "owner",
    value: "Ф.И.О.",
    key: "fio",
  },
  {
    id: "owner",
    value: "Адрес",
    key: "address",
  },
  {
    id: "owner",
    value: "Идентификационный номер",
    key: "persNum",
  },
  {
    id: "owner",
    value: "Сведения о юридическом лице, ИП",
    key: "nameLe",
  },
  {
    id: "owner",
    value: "Номера телефонов для связи",
    key: "phone",
  },
]

export const engineTableColumns = [
  {
    id: "enginesList",
    value: "Название (марка)",
    key: "engname",
  },
  {
    id: "enginesList",
    value: "Заводской (идентификационный номер)",
    key: "engvin",
  },
  {
    id: "enginesList",
    value: "Мощность (л.с.)",
    key: "engpwr",
  },
  {
    id: "enginesList",
    value: "Срок службы (лет)",
    key: "engpwr",
  },
  {
    id: "enginesList",
    value: "Дата постановки на учет",
    key: "recdate",
  },
  {
    id: "enginesList",
    value: "Дата снятия с учета",
    key: "recdate",
  },
]

export const ownersHistoryTableColumns = [
  {
    id: "owner",
    value: "Ф.И.О. владельца",
    key: "fio",
  },
  {
    id: "owner",
    value: "Дата установления права собственности",
    key: "recdate",
  },
]