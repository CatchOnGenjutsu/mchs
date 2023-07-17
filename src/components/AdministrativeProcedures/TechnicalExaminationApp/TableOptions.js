export const boatTo = {
  keyTable: "boatTo",
  caption: "Сведения о двигателе маломерного судна (при его наличии)",
  nameColumn: [
    {
      value: "Дата ТО",
      key: "toDate",
      type: "date",
      neededInModal: true,
    },
    {
      value: "Должностное лицо, проводившее ТО (ФИО, номер печати)",
      key: "toUserid",
      type: "customSelect",
      selectOptions: [],
      neededInModal: true,
    },
    {
      value: "Годное/негодное",
      key: "result",
      type: "customSelect",
      selectOptions: [
        { value: true, label: "Годное", key: "result" },
        { value: false, label: "Негодное", key: "result" },
      ],
      neededInModal: true,
    },
    {
      value: "Срок действия",
      key: "validityMonths",
      type: "customSelect",
      selectOptions: [
        { value: 0, label: "—", key: "validityMonths" },
        { value: 12, label: "1 год", key: "validityMonths" },
        { value: 24, label: "2 года", key: "validityMonths" },
        { value: 26, label: "3 года", key: "validityMonths" },
        { value: 60, label: "5 лет", key: "validityMonths" },
      ],
      neededInModal: true,
    },
    {
      value: "ФИО составителя",
      key: "recuser",
      type: "customSelect",
      selectOptions: [],
      neededInModal: true,
    },
  ],
};

export const setOptionsForInputsUsers = (users) => {
  boatTo.nameColumn.forEach((item) => {
    if (item.key === "toUserid" || item.key === "recuser") {
      if (item.selectOptions.length === 0) {
        users.forEach((elem) => {
          elem.key = item.key;
          item.selectOptions.push(elem);
        });
      }
    }
  });
  // if (inputsHeadersBasesBuildings.checkStatus.selectOption.length === 0) {
  //   inputsHeadersBasesBuildings.checkStatus.selectOption.push(...users);
  // }
};
