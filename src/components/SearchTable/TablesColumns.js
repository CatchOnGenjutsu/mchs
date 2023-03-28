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
  }
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
  }
]
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
  Header: "Местонахождение и телефон базы",
  accessor: "baseContact",
  },
  {
  Header: "Наименование должности, ФИО, ответственного за эксплуатацию базы, номер и дата приказа о назначении",
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
]
export const SMALLBOATS_REG_COLUMNS = [
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
    Header: "Рег. номер судна",
    accessor: "regNum",
  },
  {
    Header: "Участок",
    accessor: "rayonId",
  },
  {
    Header: "Статус заявления",
    accessor: "statusName",
  }
]