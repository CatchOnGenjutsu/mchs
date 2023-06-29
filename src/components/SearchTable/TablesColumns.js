export const SMALLBOATS_COLUMNS = [
  {
    Header: "Рег. номер",
    accessor: "regNum",
  },
  {
    Header: "Заводской номер судна",
    accessor: "boatVin",
  },
  {
    Header: "ФИО Собственника",
    accessor: "owner",
  },
  {
    Header: "Идентификационный номер",
    accessor: "ownerPersNum",
  },
  {
    Header: "Наименование организации",
    accessor: "leName",
  },
  {
    Header: "УНП",
    accessor: "leUnp",
  },
  {
    Header: "Адрес",
    accessor: "address",
  },
];

export const SERTIFICATES_COLUMNS = [
  {
    Header: "Номер удостоверения",
    accessor: "licenseNum",
  },
  {
    Header: "ФИО",
    accessor: "fio",
  },
  {
    Header: "Дата рождения",
    accessor: "birthDate",
  },
  {
    Header: "Идентификационный номер",
    accessor: "persNum",
  },
  {
    Header: "Тип удостоверения",
    accessor: "licenseType",
  },
  {
    Header: "Дата выдачи",
    accessor: "licenseDate",
  },
  {
    Header: "Действителен до",
    accessor: "licenseDateEnd",
  },
];
export const BUILDING_COLUMNS = [
  {
    Header: "Наименование ЮЛ (ФИО ФЛ, ИП) эксплуатанта базы",
    accessor: "ownerLeName",
  },
  {
    Header: "Адрес и телефон эксплуатанта базы",
    accessor: "ownerContact",
  },
  {
    Header: "УНП",
    accessor: "unp",
  },
  {
    Header: "Местонахождение и телефон базы",
    accessor: "baseContact",
  },
  {
    Header:
      "Наименование должности, ФИО, ответственного за эксплуатацию базы, номер и дата приказа о назначении",
    accessor: "responData",
  },
  {
    Header: "Дата последнего обследования",
    accessor: "checkDate",
  },
  {
    Header: "Результат последнего обследования",
    accessor: "statusName",
  },
  {
    Header: "Участок",
    accessor: "sectionName",
  },
  {
    Header: "Примечание",
    accessor: "note",
  },
];
export const SMALLBOATS_ADMIN_COLUMNS = [
  {
    Header: "Рег. номер заявления",
    accessor: "appNum",
  },
  {
    Header: "Дата регистрации заявления",
    accessor: "operDate",
  },
  {
    Header: "ФИО",
    accessor: "fio",
  },
  {
    Header: "Ид. номер заявителя",
    accessor: "persNum",
  },
  {
    Header: "Наим. организации",
    accessor: "nameLe",
  },
  {
    Header: "УНП",
    accessor: "unp",
  },
  // {
  //   Header: "Рег. номер судна",
  //   accessor: "regNum",
  // },
  {
    Header: "Участок",
    accessor: "sctName",
  },
  {
    Header: "Статус заявления",
    accessor: "statusName",
  },
];
export const COLUMNS_FORM_SEARCH_BOAT_CARDS = [
  {
    Header: "Рег. номер судна",
    accessor: "regNum",
  },
  {
    Header: "Зав. номер судна",
    accessor: "boatVin",
  },
  {
    Header: "ФИО Собственника",
    accessor: "fio",
  },
  {
    Header: "Идентификационный номер",
    accessor: "ownerPersNum",
  },
  {
    Header: "Наименование организации",
    accessor: "leName",
  },
  {
    Header: "УНП",
    accessor: "unp",
  },
  {
    Header: "Номер судового билета",
    accessor: "tiketNum",
  },
];

export const SHIPS_TICKET_COLUMNS = [
  // {
  //   Header: "Рег. номер заявления",
  //   accessor: "appNum",
  // },
  // {
  //   Header: "Дата регистрации заявления",
  //   accessor: "operDate",
  // },
  {
    Header: "ФИО",
    accessor: "fio",
  },
  {
    Header: "Ид. номер заявителя",
    accessor: "persNum",
  },
  {
    Header: "Наим. организации",
    accessor: "nameLe",
  },
  {
    Header: "УНП",
    accessor: "unp",
  },
  {
    Header: "Судовой билет №",
    accessor: "tiketNum",
  },
  // {
  //   Header: "Рег. номер судна",
  //   accessor: "regNum",
  // },
  {
    Header: "Участок",
    accessor: "sctName",
  },
  {
    Header: "Статус заявления",
    accessor: "statusName",
  },
];

export const PRIVISION_INFORMATION_COLUMNS = [
  {
    Header: "Рег. номер заявления",
    accessor: "appNum",
  },
  {
    Header: "Дата регистрации заявления",
    accessor: "operDate",
  },
  {
    Header: "ФИО",
    accessor: "fio",
  },
  {
    Header: "Ид. номер заявителя",
    accessor: "persNum",
  },
  {
    Header: "Наим. организации",
    accessor: "nameLe",
  },
  {
    Header: "УНП",
    accessor: "unp",
  },
  {
    Header: "Участок",
    accessor: "sctName",
  },
  {
    Header: "Статус заявления",
    accessor: "statusName",
  },
];

export const TRANSPORT_ACCIDENT_COLUMNS = [
  {
    Header: "Дата",
    accessor: "incidentDate",
  },
  {
    Header: "Место транспортного аварийного случая",
    accessor: "incidentPlace",
  },
  {
    Header: "Участок",
    accessor: "sctName",
  },
  {
    Header: "Судовладелец",
    accessor: "owner",
  },
  {
    Header: "Регистрационный номер",
    accessor: "boatRegNum",
  },
  {
    Header: "Причина",
    accessor: "incidentReasons",
  },
  {
    Header: "Вид транспортного аварийного случая",
    accessor: "incidentType",
  },
  {
    Header: "Количество спасенных",
    accessor: "saveNum",
  },
  {
    Header: "Количество погибших",
    accessor: "deadTotal",
  },
  {
    Header: "Погибших в состоянии алкогольного опьянения",
    accessor: "deadDrunk",
  },
];
