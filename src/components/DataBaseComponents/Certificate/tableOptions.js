export const tableLossOfControl = {
  keyTable: 'lossControl',
  caption: "Отметка о лишении права управления:",
  nameColumn: [
    {
      id: "lossControl",
      value: "Дата решения",
      key: "confDate",
      type: "date"
    },
    {
      id: "lossControl",
      value: "Номер решения",
      key: "confDocNum",
      type: ""
    },
    {
      id: "lossControl",
      value: "Орган",
      key: "confOrg",
      type: ""
    },
    {
      id: "lossControl",
      value: "Срок лишения, лет",
      key: "confDuration",
      type: ""
    },
    {
      id: "lossControl",
      value: "Лишение до",
      key: "confDateEnd",
      type: ""
    },
  ]
}

export const tableCertificateWithdrawal = {
  keyTable: 'certificateWithdrawal',
  caption: "Отметка об изъятиии удостоверения:",
  nameColumn: [
    {
      id: "certificateWithdrawal",
      value: "Дата изъятия",
      key: "confDate",
      type: "date"
    },
    {
      id: "certificateWithdrawal",
      value: "Орган",
      key: "confOrg",
      type: ""
    },
    {
      id: "certificateWithdrawal",
      value: "Должность (кем произведено изъятие)",
      key: "userPositions",
      type: ""
    },
    {
      id: "certificateWithdrawal",
      value: "Ф.И.О. должностного лица",
      key: "name",
      type: ""
    },
  ]
}
export const boatDrivingLicenseSpecmarksList = {
  keyTable: 'boatDrivingLicenseSpecmarksList',
  caption: "Особые отметки:",
  nameColumn: [
    {
      id: "boatDrivingLicenseSpecmarksList",
      value: "Дата",
      key: "markDate",
      type: "date"
    },
    {
      id: "boatDrivingLicenseSpecmarksList",
      value: "Отметка",
      key: "mark",
      type: ""
    },
  ]
}
