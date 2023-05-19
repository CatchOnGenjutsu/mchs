export const optionSelectChangeType = [
    {
        id:1,
        value:'Смена данных о судовладельце'
    },
    {
        id:2,
        value:'Снятие с учета'
    },
    {
        id:3,
        value:'Смена данных о судне'
    },
    {
        id:4,
        value:'Аренда, лизинг'
    }
]
export const enginesList = {
    keyTable: 'enginesList',
    caption: "Сведения о двигателе маломерного судна (при его наличии)",
    nameColumn: [
        {
            value: "Название",
            key: "engname",
            type: "text",
            neededInModal:true
        },
        {
            value: "Заводской (идентификационный) номер",
            key: "engvin",
            type: "text",
            neededInModal:true
        },
        {
            value: "Тип двигателя",
            key: "engtype",
            type: "select",
            selectOptions: [
                {value: 1, label: "Бензиновый", key: "engtype"},
                {value: 2, label: "Электрический", key: "engtype"}
            ],
            neededInModal:true
        },
        {
            value: "Мощность",
            key: "engpwr",
            type: "text",
            neededInModal:true
        },
        {
            value: "Год выпуска",
            key: "engProdYear",
            type: "text",
            neededInModal:true
        },
        {
            value: "Дата постановки на учет",
            key: "dateReg",
            type: "text",
            neededInModal:false
        },
        {
            value: "Дата снятия с учета",
            key: "dateRegEnd",
            type: "text",
            neededInModal:false
        },
    ]
}
export const boatCardSpecmarksList = {
    keyTable: "boatCardSpecmarksList",
    caption: "Особые отметки",
    nameColumn: [
        {
            value: "Ограничение на рег. действия",
            key: "msmLock",
            type: "checkbox",
            neededInModal: true,
        },
        {
            value: "Дата",
            key: "msmDate",
            type: "date",
            neededInModal: true,
        },
        {
            value: "Отметка",
            key: "msmNote",
            type: "text",
            neededInModal: true,
        },
    ],
};
export const boatCardModifDealsDtoList = {
    keyTable: "boatCardModifDealsList",
    caption: "Сведения о правах собственности",
    nameColumn: [
        {
            value: "Наименование документа",
            key: "docName",
            type: "text",
            neededInModal: true,
        },
        {
            value: "Дата документа",
            key: "docDate",
            type: "date",
            neededInModal: true,
        },
        {
            value: "Номер документа",
            key: "docNum",
            type: "text",
            neededInModal: true,
        },
        {
            value: "Примечание",
            key: "note",
            type: "text",
            neededInModal: true,
        }
    ],
};

export const readStatusForInputField = ["boatVin","boatYear","boatType","boatVid","bodyMaterial"]