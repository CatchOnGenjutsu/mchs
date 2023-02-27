export const inputsHeadersSmallBoats = [
  {
    key: "personSurname",
    value: "Фамилия",
    type:'text'

  },
  {
    key: "personName",
    value: "Имя",
    type:'text'
  },
  {
    key: "personMidname",
    value: "Отчество",
    type:'text'
  },
  {
    key: "regNum",
    value: "Рег. номер судна",
    description: "В формате XX 1111",
    type:'text'
  },
  {
    key: "nameLe",
    value: "Наим. организации",
    type:'text'
  },
  {
    key: "unp",
    value: "УНП",
    type:'text'
  },
  {
    key: "engvin",
    value: "Заводской номер двигателя",
    type:'text'
  },
  {
    key: "boatVin",
    value: "Заводской номер судна",
    description: "Цифры и латиница",
    type:'text'
  },
  {
    key: "cardStatus",
    value: "Статус карточки",
    type:'select',
    selectOption:['Активная','Архивная']
  },
];

export const inputsHeadersCertificates = [
  {
    key: "surname",
    value: "Фамилия",
    type:'text'
  },
  {
    key: "name",
    value: "Имя",
    type:'text'
  },
  {
    key: "midname",
    value: "Отчество",
    type:'text'
  },
  {
    key: "birthDate",
    value: "Дата рождения",
    description: "В формате: 11.11.1111",
    type:'text'
  },
  {
    key: "licenseNum",
    value: "Номер удост.",
    type:'text'
  },
  {
    key: "persNum",
    value: "Ид. номер",
    description: "В формате 1111111X111XX1",
    type:'text'
  },
  {
    key: "statusCard",
    value: "Статус карточки",
    type:'select',
    selectOption:['Активная','Архивная']
  },
];

export const inputsHeadersBasesBuildings = [
  {
    key: "ownerCommonName",
    value: "Наименование ЮЛ, ФИО эксплуатанта",
    type:'text'
  },
  {
    key: "location",
    value: "Местонах.\n" + "базы",
    type:'text'
  },
  {
    key: "startDate",
    value: "Дата последнего обследования от",
    description: "В формате: 11.11.1111",
    type:'text'
  },
  {
    key: "endDate",
    value: "Дата последнего обследования до",
    description: "В формате: 11.11.1111",
    type:'text'
  },
  {
    key: "statusName",
    value: "Результат обследования",
    type:'select',
    selectOption:['','Справка','Предписание об устранении нарушений','Предложение о приостановлении(запрете) эксплуатации']
  },
];