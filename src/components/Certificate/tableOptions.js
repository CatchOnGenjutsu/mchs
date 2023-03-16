export const tableLossOfControl = {
  keyTable: 'lossControl',
  caption: "Отметка о лишении права управления:",
  nameColumn: [
    ["confDateEnd", 'Cрок лишения'],
    ["confOrg", 'Орган'],
    ["confDocNum", 'Номер решения'],
    ["confDate", 'Дата решения']
  ]
}

export const tableCertificateWithdrawal = {
  keyTable: 'certificateWithdrawal',
  caption: "Отметка об изъятиии удостоверения:",
  nameColumn: [
    ["confDate", 'Дата изъятия'],
    ["confOrg", 'Орган'],
    ["userPositions", 'Должность (кем произведено изъятие)'],
    ["name", ' Ф.И.О. должностного лица'],
  ]
}
export const boatDrivingLicenseSpecmarksList = {
  keyTable: 'boatDrivingLicenseSpecmarksList',
  caption: "Особые отметки:",
  nameColumn: [
    ['markDate', 'Дата'],
    ["mark", 'Отметка'],
  ]
}
