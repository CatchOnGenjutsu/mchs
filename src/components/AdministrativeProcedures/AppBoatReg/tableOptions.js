export const boatCardAppEngDtoList = {
  keyTable: "boatCardAppEngDtoList",
  caption: "Сведения о двигателе маломерного судна (при его наличии)",
  nameColumn: [
    {
      value: "Название",
      key: "engname",
      type: "text",
    },
    {
      value: "Заводской (идентификационный) номер",
      key: "engvin",
      type: "text",
    },
    {
      value: "Тип двигателя",
      key: "engtype",
      type: "select",
      selectOptions: [
        { value: 1, label: "Бензиновый", key: "engtype" },
        { value: 2, label: "Электрический", key: "engtype" },
      ],
    },
    {
      value: "Мощность",
      key: "engpwr",
      type: "text",
    },
    {
      value: "Год выпуска",
      key: "engProdYear",
      type: "text",
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
    },
    {
      value: "Дата",
      key: "asmDate",
      type: "date",
    },
    {
      value: "Отметка",
      key: "asmNote",
      type: "text",
    },
  ],
};
