import {
  SHOW_HIDDEN_MENU
} from "./types";

const initialState = {
  sidebarListArray: [
    ["База данных", "database", { listModal: ["Маломерные суда", "Удостоверения"], isHidden: true }],
    ["Административные процедуры", "procedures", {
      listModal: [
        "Регистрация маломерных судов",
        "Регистрация изменений сведений",
        "Техническое освидетельствование судов",
        "Выдача (обмен) удостоверений",
        "Выдача дубликата судового билета",
        "Предоставление информации",
        "Журнал регистрации АП",
        "Оплата административных процедур"
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
}


export const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_HIDDEN_MENU:
      return (() => ({
        ...state,
        sidebarListArray: [
          ...state.sidebarListArray.map((item) => {
            if (item[1] === action.data.id && item[2] !== undefined) {
              item[2].isHidden = !item[2].isHidden;
            } else if (action.data.id === "undefined" && item[2] !== undefined) {
              item[2].isHidden = true;
            }
            return item;
          }),
        ],
      }))();
    default:
      return state;
  }
};