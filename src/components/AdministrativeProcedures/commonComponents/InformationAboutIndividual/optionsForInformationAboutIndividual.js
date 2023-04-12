export const fieldOptions= {
    surname: {
        key: "surname",
        value: "Фамилия",
        type: 'text'
    },
    name: {
        key: "name",
        value: "Имя",
        type: 'text'
    },
    midname: {
        key: "midname",
        value: "Отчество",
        type: 'text'
    },
    docType: {
        key: "docType",
        value: "Документ",
        type: 'select',
        options:[
            {
                id:1,
                value:'Паспорт'
            },
            {
                id:2,
                value:'Вид на жительство'
            },
        ]
    },
    serialOfPassport: {
        key: "serialOfPassport",
        value: "Серия",
        type: 'text'
    },
    numberOfPassport: {
        key: "numberOfPassport",
        value: "Номер",
        type: 'text'
    },
    docDateIssue: {
        key: "docDateIssue",
        value: "Дата выд.",
        type: 'text'
    },
    docDepartment: {
        key: "docDepartment",
        value: "Кем выдан",
        type: 'text'
    },
    persNum: {
        key: "persNum",
        value: "Идентификационный номер",
        type: 'text'
    },
}