import {setRayon,setGorod} from '../utilities'
export const fieldPassportOptions= {
    surname: {
        key: "surname",
        value: "Фамилия",
        type: 'text',
        defaultValue:null,
        readOnly:false
    },
    name: {
        key: "name",
        value: "Имя",
        type: 'text',
        defaultValue:null,
        readOnly:false
    },
    midname: {
        key: "midname",
        value: "Отчество",
        type: 'text',
        defaultValue:null,
        readOnly:false
    },
    docType: {
        key: "docType",
        value: "Документ",
        type: 'selectSearch',
        defaultValue:null,
        readOnly:false,
        options:[
            {
                value:1,
                label:'Паспорт'
            },
            {
                value:2,
                label:'Вид на жительство'
            },
        ]
    },
    serialOfPassport: {
        key: "serialOfPassport",
        value: "Серия",
        type: 'text',
        defaultValue:null,
        readOnly:false
    },
    numberOfPassport: {
        key: "numberOfPassport",
        value: "Номер",
        type: 'text',
        defaultValue:null,
        readOnly:false
    },
    docDateIssue: {
        key: "docDateIssue",
        value: "Дата выдачи",
        type: 'date',
        defaultValue:null,
        readOnly:false
    },
    docDepartment: {
        key: "docDepartment",
        value: "Кем выдан",
        type: 'text',
        defaultValue:null,
        readOnly:false
    },
    persNum: {
        key: "persNum",
        value: "Идентификационный номер",
        type: 'text',
        defaultValue:null,
        readOnly:false
    },
}

export const fieldAddressOptions = {
    stranId: {
        key: "stranId",
        value: "Страна",
        type: 'text',
        defaultValue:"Республика Беларусь",
        readOnly:true
    },
    oblId: {
        key: "oblId",
        value: "Область",
        type: 'selectSearch',
        defaultValue:null,
        disabled: false,
        readOnly:false,
        options: [
            {value:1,label:"Брестская",key:'obl'},
            {value:2,label:"Витебская" ,key:'obl'},
            {value:3,label:"Гомельская",key:'obl'},
            {value:4,label:"Гродненская",key:'obl'},
            {value:6,label:"Минская",key:'obl'},
            {value:7,label:"Могилевская",key:'obl'}
        ]
    },
    rayonId: {
        key: "rayonId",
        value: "Район",
        type: 'selectSearch',
        defaultValue:null,
        disabled: true,
        readOnly:false,
        options:[]
    },
    gorod_id: {
        key: "gorod_id",
        value: "Город",
        type: 'selectSearch',
        defaultValue:null,
        disabled: true,
        readOnly:false,
        options:[]
    },
    ulica: {
        key: "ulica",
        value: "Улица",
        type: 'text',
        defaultValue:null,
        readOnly:false
    },
    korpus: {
        key: "korpus",
        value: "Корпус",
        type: 'text',
        defaultValue:null,
        readOnly:false
    },
    dom: {
        key: "dom",
        value: "Дом",
        type: 'text',
        defaultValue:null,
        readOnly:false
    },
    kv: {
        key: "kv",
        value: "Квартира",
        type: 'text',
        defaultValue:null,
        readOnly:false
    },
    phone: {
        key: "phone",
        value: "Телефон",
        type: 'text',
        defaultValue:null,
        readOnly:false
    },
}

export async function setOptions(id,key) {
    switch (key) {
        case "obl":{
            fieldAddressOptions.rayonId.options = await setRayon(id)
            fieldAddressOptions.rayonId.disabled=false
            fieldAddressOptions.gorod_id.options = []
            fieldAddressOptions.gorod_id.disabled = true
            return fieldAddressOptions
        }
        case "rayon":{
            fieldAddressOptions.gorod_id.options = await  setGorod(id)
            fieldAddressOptions.gorod_id.disabled = false
            return fieldAddressOptions
        }
        default: return fieldAddressOptions

    }

}
