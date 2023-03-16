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
  id: "maxPowerEngine",
  value: "Предельная мощность двигателей:",
  key: ""
  },
  {
  id: "engineNum",
  value: "Количество двигателей:",
  key: ""
  },
  {
  id: "categoryDifficultyArea",
  value: "Категория сложности района плавания:",
  key: ""
  },
  {
  id: "rankDifficultyArea",
  value: "Разряд сложности района плавания:",
  key: ""
  },
  {
  id: "NumberAndDateShipTicket",
  value: "№ и дата выдачи судового билета (в том числе дубликата судового билета):",
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
  id: "validity",
  value: "Cрок действия",
  key: "",
  },
  {
  id: "endDate",
  value: "Дата окончания ТО",
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
  }
]

export const userTableColumns = [
  {
  id: "owner",
  value: "Правовая форма заявителя",
  key: "legalForm"
  },
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
  value: "Сведения о документе, удостоверяющем личность",
  key: "persDocumentData",
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
  value: "Тип двигателя",
  key: "typeEngine"
  },
  {
  id: "enginesList",
  value: "Мощность (л.с.)",
  key: "engpwr",
  },
  {
  id: "enginesList",
  value: "Предельная мощность двигателей судна",
  key: "maxpwr",
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

export const dealsHistoryTableColumns = {
  keyTable: 'dealsHistoryTableColumns',
  caption: "Информация о совершаемых в отношении судна сделок:",
  nameColumn: [
  {
    id: "boatDeals",
    value: "Дата сделки",
    key: "dealDate",
    type: "date"
  },
  {
    id: "boatDeals",
    value: "Сделка",
    key: "note",
    type: ""
  },
  {
    id: "boatDeals",
    value: "Наименование документа",
    key: "docName",
    type: ""
  },
  {
    id: "boatDeals",
    value: "Номер документа",
    key: "docNum",
    type: ""
  },
  {
    id: "boatDeals",
    value: "Дата документа",
    key: "docDate",
    type: "date"
  },
  ]


}

export const boatArrestsTableColumns = {
  keyTable: 'boatArrestsTableColumns',
  caption: "Налагаемые аресты:",
  nameColumn: [
  {
    id: "boatArrest",
    value: "Дата",
    key: "onDate",
    type: "date"
  },
  {
    id: "boatArrest",
    value: "Признак ареста",
    key: "isActiv",
    type: ""
  },
  {
    id: "boatArrest",
    value: "Орган",
    key: "onOrg",
    type: ""
  },
  {
    id: "boatArrest",
    value: "Должностное лицо, принявшее решение",
    key: "onOfficer",
    type: ""
  },
  {
    id: "boatArrest",
    value: "Наименование и номер документа",
    key: "onDocName",
    type: ""
  },
  {
    id: "boatArrest",
    value: "Дата документа",
    key: "onDocDate",
    type: "date"
  },
  {
    id: "boatArrest",
    value: "Примечание",
    key: "onNote",
    type: ""
  }
  ]
}

export const liftedArrestsTableColumns = [
  {
  id: "liftedArrest",
  value: "Дата",
  key: "date"
  },
  {
  id: "liftedArrest",
  value: "Орган",
  key: "agency"
  },
  {
  id: "liftedArrest",
  value: "Должностное лицо, принявшее решение",
  key: "officer"
  },
  {
  id: "liftedArrest",
  value: "Примечание",
  key: "note"
  },
]

export const noteShipBookTableColumns = [
  {
  id: "noteShipBook",
  value: "Дата",
  key: "date"
  },
  {
  id: "noteShipBook",
  value: "Орган",
  key: "agency"
  },
  {
  id: "noteShipBook",
  value: "Должностное лицо, внесшее изменение",
  key: "officer"
  },
  {
  id: "noteShipBook",
  value: "Какой раздел редактировался",
  key: "section"
  },
]

export const enterNoteShipBookTableColumns = [
  {
  id: "enterNoteShipBook",
  value: "Дата внесения в судовую книгу",
  key: "enterDate"
  },
  {
  id: "enterNoteShipBook",
  value: "Дата исключения из судовой книги",
  key: "endDate"
  }
]

export const specialMarksTableColumns = {
  keyTable: 'specialMarksTableColumns',
  caption: "Особые отметки:",
  nameColumn: [
  {
    id: "specialMarks",
    value: "Ограничение на рег. действия",
    key: "bsmLock",
    type: "checkbox"
  },
  {
    id: "specialMarks",
    value: "Дата",
    key: "bsmDate",
    type: "date"
  },
  {
    id: "specialMarks",
    value: "Отметка",
    key: "bsmNote",
    type: ""
  },
  ]

}

export const documentsTableColumns = {
  keyTable: 'documentsTableColumns',
  caption: "Документы:",
  nameColumn: [
  {
    id: "documents",
    value: "Дата",
    key: "docdate",
    type: "date"
  },
  {
    id: "documents",
    value: "Наименование документа",
    key: "docname",
    type: ""
  }, {
    id: "documents",
    value: "Документ",
    key: "docfile",
    type: "file"
  }
  ]
}


// export const testMainTable = {
//   caption:"Информация об объекте:",
//   regNum:"Регистрацонный номер маломерного судна:",
//   boatName:"Название маломерного судна:",
//   parkingPlace:"Местоположение (включая юридический адрес и страну):",
//   boatType:{
//   value: "Тип:",
//   key: "btname"
//   },
//   something:"Вид:",
//   boatYear:"Год постройки",
//   boatVin:"Заводской номер",
//   maxPowerEngine:"Предельная мощность двигателей:",
//   engineNum:"Количество двигателей:",
//   categoryDifficultyArea:"Категория сложности района плавания:",
//   rankDifficultyArea:"Разряд сложности района плавания:",
//   NumberAndDateShipTicket:"№ и дата выдачи судового билета (в том числе дубликата судового билета):",
// }
//
// export const sizeTableColumnsObj = {
//   caption:"Размерения судна:",
//   boatLength:"Длина (м)",
//   boatWidth:"Ширина (м)",
//   boatHeight:"Высота борта (м)",
//   bodyMaterial:"Материал корпуса",
//   boatPayload:"Грузоподъёмность (кг)",
//   passengersNum:"Пассажировместимость"
// }