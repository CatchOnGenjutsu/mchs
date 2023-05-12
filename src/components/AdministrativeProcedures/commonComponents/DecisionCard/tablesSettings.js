export const ownerTableColumns = {
  caption: "Информация о собственнике",
  keyTable: "ownerTableColumns",
  nameColumn: [
    {
      id: "boatName",
      value: "Название (при наличии)",
      key: "",
    },
    {
      id: "fio",
      value: "Собственник (ФИО либо наименование юридического лица)",
      key: "nameLe",
    },
    {
      id: "address",
      value: "Адрес",
      key: "",
    },
    {
      id: "persNum",
      value: "Идентификационный номер",
      key: "",
    },
    {
      id: "note2",
      value: "Арендатор, лизингополучатель (ФИО либо наименование юридического лица)",
      key: "",
    },
  ],
};

export const boatTableColumns = {
  caption: "Корпус",
  keyTable: "boatTableColumns",
  nameColumn: [
    {
      id: "boatTypeVid",
      value: "Тип, вид",
      key: "",
    },
    {
      id: "boatVin",
      value: "Заводской  (идентификационный) номер",
      key: "",
    },
    {
      id: "boatYear",
      value: "Год постройки",
      key: "",
    },
    {
      id: "bodyMaterial",
      value: "Материал",
      key: "",
    },
    {
      id: "boatLength",
      value: "Длина, м",
      key: "",
    },
    {
      id: "boatWidth",
      value: "Ширина, м",
      key: "",
    },
    {
      id: "boatHeight",
      value: "Высота, м",
      key: "",
    },
    {
      id: "boatPayload",
      value: "Грузоподъемность,кг",
      key: "",
    },
    {
      id: "passengersNum",
      value: "Допустимое количество людей на борту, чел",
      key: "",
    },
    {
      id: "engpwrmax",
      value: "Предельная мощность двигателей , л.с.",
      key: "",
    },
    {
      id: "saCategory",
      value: "Категория и разряд сложности района плавания",
      key: "",
    }
  ],
};
