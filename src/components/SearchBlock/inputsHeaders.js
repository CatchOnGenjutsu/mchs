export const inputsHeadersSmallBoats = [
  {
    key: "ownerSurname",
    value: "Фамилия",
    type:'text'

  },
  {
    key: "ownerName",
    value: "Имя",
    type:'text'
  },
  {
    key: "ownerMidname",
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
    key: "leName",
    value: "Наим. организации",
    type:'text'
  },
  {
    key: "leUnp",
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
    key: "cardStatusCode",
    value: "Статус карточки",
    type:'select',
    selectOption:[{id:1,value:'Активная'},{id:0,value:'Архивная'},{id:2,value:'Все'}]
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
    type:'date'
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
    key: "isActive",
    value: "Статус карточки",
    type:'select',
    selectOption:[{id:1,value:'Активная'},{id:0,value:'Архивная'},{id:2,value:'Все'}]
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
    type:'date'
  },
  {
    key: "endDate",
    value: "Дата последнего обследования до",
    type:'date'
  },
  {
    key: "statusName",
    value: "Результат обследования",
    type:'select',
    selectOption:['','Справка','Предписание об устранении нарушений','Предложение о приостановлении(запрете) эксплуатации']
  },
];