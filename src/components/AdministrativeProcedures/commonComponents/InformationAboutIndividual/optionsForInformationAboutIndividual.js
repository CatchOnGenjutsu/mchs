export const fieldPassportOptions= {
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
        value: "Дата выдачи",
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

export const fieldAddressOptions = {
    stranId: {
        key: "stranId",
        value: "Страна",
        type: 'text'
    },
    oblId: {
        key: "oblId",
        value: "Область",
        type: 'selectSearch'
    },
    rayonId: {
        key: "rayonId",
        value: "Район",
        type: 'selectSearch'
    },
    gorod_id: {
        key: "gorod_id",
        value: "Город",
        type: 'selectSearch'
    },
    ulica: {
        key: "ulica",
        value: "Город",
        type: 'text'
    },
    korpus: {
        key: "korpus",
        value: "Корпус",
        type: 'text'
    },
    dom: {
        key: "dom",
        value: "Дом",
        type: 'text'
    },
    kv: {
        key: "kv",
        value: "Квартира",
        type: 'text'
    },
    phone: {
        key: "phone",
        value: "Телефон",
        type: 'text'
    },

}