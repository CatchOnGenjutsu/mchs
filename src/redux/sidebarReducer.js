import {
  SHOW_HIDDEN_MENU,
  COLOR_MENU_ITEM
} from "./types";
import uniqid from 'uniqid';

const initialState = {
  sidebarListArray: [
    ["База данных", "database", {
      listModal: [
        { title: "Маломерные суда", id: "smallboats", colored: true },
        { title: "Удостоверения", id: "certificates", colored: false },
      ],
      isHidden: false
    }],
    ["Административные процедуры", "procedures", {
      listModal: [
        { title: "Регистрация маломерных судов", id: uniqid(), colored: false },
        { title: "Регистрация изменений сведений", id: uniqid(), colored: false },
        { title: "Техническое освидетельствование судов", id: uniqid(), colored: false },
        { title: "Выдача (обмен) удостоверений", id: uniqid(), colored: false },
        { title: "Выдача дубликата судового билета", id: uniqid(), colored: false },
        { title: "Предоставление информации", id: uniqid(), colored: false },
        { title: "Журнал регистрации АП", id: uniqid(), colored: false },
        { title: "Оплата административных процедур", id: uniqid(), colored: false },
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
    case COLOR_MENU_ITEM:
      return (() => ({
        ...state,
        sidebarListArray: [
          ...state.sidebarListArray.map((item) => {
            item[2].listModal.map((elem) => {
              if (elem.id === action.data.id) {
                elem.colored = true;
              } else if (action.data.id === "undefined") {
                elem.colored = false;
              } else {
                elem.colored = false;
              }
              return elem;
            })
            return item;
          }),
        ],
      }))();
    default:
      return state;
  }
};