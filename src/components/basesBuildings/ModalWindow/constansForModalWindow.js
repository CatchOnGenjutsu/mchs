

export const optionsForModalWindow = {
    optionsForInputIndividual:{
        ownerType:{
            key:"ownerType",
            label:"Форма собственности",
            type:'select',
            options:[]
        },
        ownerMidname:{
            key:"ownerMidname",
            label:"Фамилия",
            type:'text'
        },
        ownerName:{
            key:"ownerName",
            label:"Имя",
            type:'text'
        },
        ownerSurname:{
            key:"ownerSurname",
            label:"Отчество",
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
        ownerSection:{
            key: "section",
            label: "Участок",
            type:'select',
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
            type:'text'
        },
    },
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
        ownerSection:{
            key: "section",
            label: "Участок",
            type:'select',
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
            type:'text'
        },
    },
}

export const setOptionsForModalWindow = (ownerOptions,sectionOptions)=>{
    optionsForModalWindow.optionsForInputLegalEntity.ownerType.options = ownerOptions
    optionsForModalWindow.optionsForInputLegalEntity.ownerSection.options = sectionOptions
    optionsForModalWindow.optionsForInputIndividual.ownerType.options = ownerOptions
    optionsForModalWindow.optionsForInputIndividual.ownerSection.options = sectionOptions
}