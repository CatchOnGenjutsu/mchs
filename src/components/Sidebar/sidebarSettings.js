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
    { title: "Регистрация маломерных судов", id: uniqid() },
    { title: "Регистрация изменений сведений", id: uniqid() },
    { title: "Техническое освидетельствование судов", id: uniqid() },
    { title: "Выдача (обмен) удостоверений", id: uniqid() },
    { title: "Выдача дубликата судового билета", id: uniqid() },
    { title: "Предоставление информации", id: uniqid() },
    { title: "Журнал регистрации АП", id: uniqid() },
    { title: "Оплата административных процедур", id: uniqid() },
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
  ["Справочная информация", "information", { listModal: [], isHidden: true }]
]