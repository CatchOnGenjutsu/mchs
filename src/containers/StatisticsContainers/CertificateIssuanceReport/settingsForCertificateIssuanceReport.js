export const fieldsForSearchCertificate = {
    date1: {
        key: "date1",
        label: "Период отчета с",
        type: "date",
        disabled: false,
        required: true,
        hidden:false,
    },
    date2: {
        key: "date2",
        label: "Период отчета по",
        type: "date",
        disabled: false,
        required: true,
        hidden:false,
    },
    section: {
        key: "section",
        label: "Участок",
        type: "selectSearch",
        disabled: false,
        required: false,
        search:true,
        options:[],
        hidden:false,
        placeholder:"Все",
    },
    oblast: {
        key: "oblast",
        label: "Область",
        type: "selectSearch",
        disabled: false,
        search:false,
        required: false,
        placeholder:"Все",
        options: [
            {value: 1, label: "Брестская", key: "oblast"},
            {value: 2, label: "Витебская", key: "oblast"},
            {value: 3, label: "Гомельская", key: "oblast"},
            {value: 4, label: "Гродненская", key: "oblast"},
            {value: 6, label: "Минская", key: "oblast"},
            {value: 7, label: "Могилевская", key: "oblast"},
        ],
        hidden:false,
    },
}

export const setOptionsForField = (prop,field)=>{

    switch (field) {
        case "optionsForSection":{
            fieldsForSearchCertificate.section.options =prop
            break;
        }
        case "section":{
            fieldsForSearchCertificate.section.disabled =prop
            break;
        }
        case "oblast":{
            fieldsForSearchCertificate.oblast.disabled =prop
            break;
        }
        default:break;


    }
}

export const getOptionsForField = ()=>fieldsForSearchCertificate