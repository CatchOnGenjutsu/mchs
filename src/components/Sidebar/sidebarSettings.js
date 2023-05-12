import uniqid from 'uniqid';


export const sidebarSettings = [
  ["База данных", "database", {
  listModal: [
    { title: "Маломерные суда", id: "smallboats" },
    { title: "Удостоверения", id: "certificates" },
    { title: "Базы и сооружения", id: "basesbuilding" },
  ],
  isHidden: false
  }],
  ["Административные процедуры", "procedures", {
  listModal: [
    { title: "Регистрация маломерных судов", id: "smallboatsreg" },
    { title: "Регистрация изменений сведений", id: "reginformationchanges" },
    { title: "Техническое освидетельствование судов", id: "" },
    { title: "Выдача (обмен) удостоверений", id: "" },
    { title: "Выдача дубликата судового билета", id: "" },
    { title: "Предоставление информации", id: "" },
    { title: "Журнал регистрации АП", id: "" },
    { title: "Оплата административных процедур", id: "" },
  ],
  isHidden: true
  }],
  ["Аналитика", "analytics", {
  listModal: [],
  isHidden: true
  }],
  ["Администрирование", "administration", { listModal: [], isHidden: true }],
  ["Обучение и проверка знаний", "training", { listModal: [], isHidden: true }],
  ["Проверки и ревизии", "revisions", { listModal: [], isHidden: true }],
  ["Нормативно-справочная информация", "nsi", { listModal: [], isHidden: true }]
]