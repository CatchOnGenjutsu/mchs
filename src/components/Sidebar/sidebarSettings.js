import uniqid from "uniqid";

export const sidebarSettings = {
  database: {
    title: "База данных",
    id: "database",
    listModal: [
      { title: "Маломерные суда", id: "smallboats" },
      { title: "Удостоверения", id: "certificates" },
      { title: "Базы и сооружения", id: "basesbuilding" },
    ],
    isHidden: true,
  },
  procedures: {
    title: "Административные процедуры",
    id: "procedures",
    listModal: [
      { title: "Регистрация маломерных судов", id: "smallboatsreg" },
      { title: "Регистрация изменений сведений", id: "reginformationchanges" },
      { title: "Техническое освидетельствование судов", id: "" },
      { title: "Выдача судового билета", id: "shipsticket" },
      { title: "Выдача дубликата судового билета", id: "dupshipsticket" },
      { title: "Выдача (обмен) удостоверений", id: "" },
      { title: "Предоставление информации", id: "provisioninformation" },
      { title: "Журнал регистрации АП", id: "" },
      { title: "Оплата административных процедур", id: "" },
    ],
    isHidden: true,
  },
  analytics: {
    title: "Статистика и аналитика",
    id: "analytics",
    listModal: [
      { title: "Учет транспортных аварийных случаев", id: "transportaccidents" },
      { title: "Статистика работы инспектора", id: "inspectorworkstat" },
      { title: "Отчеты ", id: "reports" },
    ],
    isHidden: true,
  },
  administration: {
    title: "Администрирование",
    id: "administration",
    listModal: [],
    isHidden: true,
  },
  training: {
    title: "Обучение и проверка знаний",
    id: "training",
    listModal: [],
    isHidden: true,
  },
  revisions: {
    title: "Проверки и ревизии",
    id: "revisions",
    listModal: [],
    isHidden: true,
  },
  nsi: {
    title: "Нормативно-справочная информация",
    id: "nsi",
    listModal: [],
    isHidden: true,
  },
};

// export const setActiveItem = (pageId) => {
//   Object.values(sidebarSettings).map((item) => {
//     const index = item.listModal.findIndex((elem) => elem.id === pageId);
//     console.log(index);
//     console.log(item);
//     if (index >= 0) {
//       item.isHidden = false;
//     } else {
//       item.isHidden = true;
//     }
//     return item;
//   });
// };
