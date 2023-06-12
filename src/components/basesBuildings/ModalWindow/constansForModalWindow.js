export const optionsForModalWindow = {

    optionsForInputLegalEntity:{
        ownerType:{
            key:"ownerType",
            label:"Форма собственности",
            type:'select',
            options:[]
        },
        ownerLeName:{
            key:"ownerLeName",
            label:"Наименование ЮЛ",
            type:'text'
        },
        ownerAdress:{
            key:"ownerAddress",
            label:"Адрес эксплуатанта базы",
            type:'text'
        },
        ownerPhone:{
            key:"ownerPhone",
            label:"Телефон эксплуатанта базы",
            type:'text'
        },
        ownerOblast:{
            key: "ownerOblast",
            label: "Область",
            type: "selectSearch",
            isDisabled: false,
            isSearchable: false,
            options: [
                { value: 1, label: "Брестская", key: "ownerOblId" },
                { value: 2, label: "Витебская", key: "ownerOblId" },
                { value: 3, label: "Гомельская", key: "ownerOblId" },
                { value: 4, label: "Гродненская", key: "ownerOblId" },
                { value: 6, label: "Минская", key: "ownerOblId" },
                { value: 7, label: "Могилевская", key: "ownerOblId" },
            ],
        },
        ownerRayon:{
            key: "ownerRayon",
            label: "Район",
            type: "selectSearch",
            isDisabled: true,
            isSearchable: true,
            options: [],
        },

        ownerSection:{
            key: "section",
            label: "Участок",
            type:'selectSearch',
            isDisabled: true,
            isSearchable: false,
            options:[]
        },
        location:{
            key:"location",
            label:"Местонахождение базы",
            type:'text'
        },
        phone1:{
            key:"phone1",
            label:"Основной телефон",
            type:'text'
        },
        phone2:{
            key:"phone2",
            label:"Дополнительный телефон",
            type:'text'
        },
        responPosition: {
            key:"responPosition",
            label:"Должность ответственного за эксплуатацию базы",
            type:'text'
        },
        responFio: {
            key:"responFio",
            label:"ФИО ответственного за эксплуатацию базы",
            type:'text'
        },
        responDocnum:{
            key:"responDocnum",
            label:"Номер приказа о назначении ответственного за эксплуатацию базы",
            type:'text'
        },
        responDocdate:{
            key:"responDocdate",
            label:"Дата приказа о назначении ответственного за эксплуатацию базы",
            type:'date'
        },
        note:{
            key:"note",
            label:"Примечание",
            type:'text'
        }
    },
}
export const optionsButton = {
    add: 'Добавить новую базу',
    edit: 'Редактировать запись',
    delete:'Удалить запись'
}

export const setOptionsForModalWindow = (ownerOptions,sectionOptions)=>{
    optionsForModalWindow.optionsForInputLegalEntity.ownerType.options = ownerOptions
    optionsForModalWindow.optionsForInputLegalEntity.ownerSection.options = sectionOptions
}