export const tableLossOfControl = {
    keyTable: 'lossControl',
    caption: "Отметка о лишении права управления:",
    nameColumn: {
        term: 'Cрок лишения',
        organ: 'Орган',
        number: 'Дата и номер решения'
    }
}

export const tableCertificateWithdrawal = {
    keyTable: 'certificateWithdrawal',
    caption: "Отметка об изъятиии удостоверения:",
    nameColumn: {
        date: 'Дата изъятия',
        organ: 'Орган',
        position: 'Должность (кем произведено изъятие)',
        fio: ' Ф.И.О. должностного лица',
    }
}
export const boatDrivingLicenseSpecmarksList = {
    keyTable: 'boatDrivingLicenseSpecmarksList',
    caption: "Особые отметки:",
    nameColumn: [
        ['markDate', 'Дата'],
        ["mark", 'Отметка'],
    ]
}
