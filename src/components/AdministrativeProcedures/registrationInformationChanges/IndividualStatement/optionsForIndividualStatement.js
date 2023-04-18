export const optionSelectChangeType = [
    {
        id:0,
        value:'Снятие с учета'
    },
    {
        id:1,
        value:'Иные изменения'
    },
]
export const boatCardAppEngDtoList = {
    keyTable: 'boatCardAppEngDtoList',
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