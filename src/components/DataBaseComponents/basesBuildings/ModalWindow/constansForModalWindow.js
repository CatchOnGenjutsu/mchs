import { getRayon, getSection } from "../../../AdministrativeProcedures/commonComponents/utilities";

export const optionsForModalWindow = {
  ownerType: {
    key: "ownerType",
    label: "Форма собственности",
    type: "select",
    options: [],
  },
  ownerLeName: {
    key: "ownerLeName",
    label: "Наименование ЮЛ",
    type: "text",
  },
  ownerAdress: {
    key: "ownerAddress",
    label: "Адрес эксплуатанта базы",
    type: "text",
  },
  ownerPhone: {
    key: "ownerPhone",
    label: "Телефон эксплуатанта базы",
    type: "text",
  },
  ownerOblast: {
    key: "ownerOblast",
    label: "Область местонахождения базы",
    type: "selectSearch",
    isDisabled: false,
    isSearchable: false,
    options: [
      { value: 1, label: "Брестская", key: "ownerOblast" },
      { value: 2, label: "Витебская", key: "ownerOblast" },
      { value: 3, label: "Гомельская", key: "ownerOblast" },
      { value: 4, label: "Гродненская", key: "ownerOblast" },
      { value: 6, label: "Минская", key: "ownerOblast" },
      { value: 7, label: "Могилевская", key: "ownerOblast" },
    ],
  },
  ownerRayon: {
    key: "ownerRayon",
    label: "Район местонахождения базы",
    type: "selectSearch",
    isDisabled: true,
    isSearchable: true,
    options: [],
  },

  section: {
    key: "section",
    label: "Участок местонахождения базы",
    type: "selectSearch",
    isDisabled: true,
    isSearchable: false,
    options: [],
  },
  location: {
    key: "location",
    label: "Местонахождение базы",
    type: "text",
  },
  phone1: {
    key: "phone1",
    label: "Основной телефон",
    type: "text",
  },
  phone2: {
    key: "phone2",
    label: "Дополнительный телефон",
    type: "text",
  },
  responPosition: {
    key: "responPosition",
    label: "Должность ответственного за эксплуатацию базы",
    type: "text",
  },
  responFio: {
    key: "responFio",
    label: "ФИО ответственного за эксплуатацию базы",
    type: "text",
  },
  responDocnum: {
    key: "responDocnum",
    label: "Номер приказа о назначении ответственного за эксплуатацию базы",
    type: "text",
  },
  responDocdate: {
    key: "responDocdate",
    label: "Дата приказа о назначении ответственного за эксплуатацию базы",
    type: "date",
  },
  note: {
    key: "note",
    label: "Примечание",
    type: "text",
  },
};
export const optionsButton = {
  add: "Добавить новую базу",
  edit: "Редактировать запись",
  delete: "Удалить запись",
};

export const setOptionsForModalWindow = async (prop, field) => {
  if (prop) {
    switch (field) {
      case "ownerType": {
        optionsForModalWindow.ownerType.options = prop;
        break;
      }
      case "ownerOblast": {
        optionsForModalWindow.ownerRayon.options = await getRayon(prop);
        optionsForModalWindow.ownerRayon.options = optionsForModalWindow.ownerRayon.options.map((el) => {
          return { ...el, key: "ownerRayon" };
        });
        optionsForModalWindow.ownerRayon.isDisabled = optionsForModalWindow.ownerRayon.options.length
          ? false
          : true;
        optionsForModalWindow.section.options = [];
        optionsForModalWindow.section.isDisabled = true;
        break;
      }
      case "ownerRayon": {
        optionsForModalWindow.section.options = await getSection(prop);
        optionsForModalWindow.section.isDisabled = optionsForModalWindow.section.options.length
          ? false
          : true;
        break;
      }
      default:
        break;
    }
  } else {
    optionsForModalWindow.ownerRayon.options = [];
    optionsForModalWindow.ownerRayon.isDisabled = true;
    optionsForModalWindow.section.options = [];
    optionsForModalWindow.section.isDisabled = true;
  }
};
export const getOptionsForModalWindow = () => optionsForModalWindow;
