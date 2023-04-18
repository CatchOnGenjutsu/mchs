export const boatCardAppEngDtoList = {
  keyTable: "boatCardAppEngDtoList",
  caption: "Сведения о двигателе маломерного судна (при его наличии)",
  nameColumn: [
    {
      value: "Название",
      key: "engname",
      type: "text",
      neededInModal: true,
    },
    {
      value: "Заводской (идентификационный) номер",
      key: "engvin",
      type: "text",
      neededInModal: true,
    },
    {
      value: "Тип двигателя",
      key: "engtype",
      type: "select",
      selectOptions: [
        { value: 1, label: "Бензиновый", key: "engtype" },
        { value: 2, label: "Электрический", key: "engtype" },
      ],
      neededInModal: true,
    },
    {
      value: "Мощность",
      key: "engpwr",
      type: "text",
      neededInModal: true,
    },
    {
      value: "Год выпуска",
      key: "engProdYear",
      type: "text",
      neededInModal: true,
    },
  ],
};

export const boatCardAppSmDtoList = {
  keyTable: "boatCardAppSmDtoList",
  caption: "Особые отметки",
  nameColumn: [
    {
      value: "Ограничение на рег. действия",
      key: "asmLock",
      type: "checkbox",
      neededInModal: true,
    },
    {
      value: "Дата",
      key: "asmDate",
      type: "date",
      neededInModal: true,
    },
    {
      value: "Отметка",
      key: "asmNote",
      type: "text",
      neededInModal: true,
    },
  ],
};
