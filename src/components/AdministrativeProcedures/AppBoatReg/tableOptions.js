export const boatCardAppEngDtoList = {
  keyTable: 'boatCardAppEngDtoList',
  caption: "Сведения о двигателе маломерного судна (при его наличии)",
  nameColumn: [
    {
      value: "Название",
      key: "engname",
      type: "text"
    },
    {
      value: "Заводской (идентификационный) номер",
      key: "engvin",
      type: "text"
    },
    {
      value: "Тип двигателя",
      key: "engtype",
      type: "select",
      selectOptions: [
        {value: 1, label: "Бензиновый", key: "engtype"},
        {value: 2, label: "Электрический", key: "engtype"}
      ]
    },
    {
      value: "Мощность",
      key: "engpwr",
      type: "text"
    },
    {
      value: "Год выпуска",
      key: "engProdYear",
      type: "text"
    },
  ]
}