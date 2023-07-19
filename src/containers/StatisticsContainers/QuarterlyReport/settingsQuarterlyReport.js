export const fieldsForSearchQuarterly = {
    quarter: {
        key: "quarter",
        label: "Квартал",
        type: "selectSearch",
        disabled: false,
        search:false,
        required: true,
        hidden:false,
        options: [
            {value: 1, label: "1", key: "quarter"},
            {value: 2, label: "2", key: "quarter"},
            {value: 3, label: "3", key: "quarter"},
            {value: 4, label: "4", key: "quarter"},
            {value: 5, label: "Год", key: "quarter"},
        ],
    },
    year: {
        key: "year",
        label: "Год",
        type: "number",
        defaultValue: new Date().getFullYear().toString(),
        disabled: false,
        hidden:false,
        required: true
    },
    section: {
        key: "section",
        label: "Участок",
        type: "selectSearch",
        disabled: false,
        required: false,
        hidden:false,
        search:true,
        placeholder:"Все",
        options:[]
    },
    oblast: {
        key: "oblast",
        label: "Область",
        type: "selectSearch",
        disabled: false,
        search:false,
        required: false,
        hidden:false,
        placeholder:"Все",
        options: [
            {value: 1, label: "Брестская", key: "oblast"},
            {value: 2, label: "Витебская", key: "oblast"},
            {value: 3, label: "Гомельская", key: "oblast"},
            {value: 4, label: "Гродненская", key: "oblast"},
            {value: 6, label: "Минская", key: "oblast"},
            {value: 7, label: "Могилевская", key: "oblast"},
        ],
    },
}

export const setOptionsForField = (prop,field)=>{

    switch (field) {
        case "optionsForSection":{
            fieldsForSearchQuarterly.section.options =prop
            break;
        }
        case "section":{
            fieldsForSearchQuarterly.section.disabled =prop
            break;
        }
        case "oblast":{
            fieldsForSearchQuarterly.oblast.disabled =prop
            break;
        }

        default:break;


    }
}

export const getOptionsForField = ()=>fieldsForSearchQuarterly