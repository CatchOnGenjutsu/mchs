export const fieldBoatOptions= {
    boatVin: {
        key: "boatVin",
        value: "Заводской\n" +
            "(идентификационный) номер",
        type: 'text',
        defaultValue:null,
        readOnly:false
    },
    parkingPlace: {
        key: "parkingPlace",
        value: "Место стоянки",
        type: 'text',
        defaultValue:null,
        readOnly:false,
    },
    boatType: {
        key: "boatType",
        value: "Тип",
        type: 'selectSearch',
        defaultValue:null,
        readOnly:false,
        options:[]
    },
    boatVid: {
        key: "boatVid",
        value: "Вид",
        type: 'selectSearch',
        defaultValue:null,
        readOnly:false,
        options:[]
    },
    bodyMaterial: {
        key: "bodyMaterial",
        value: "Материал корпуса",
        type: 'selectSearch',
        defaultValue:null,
        readOnly:false,
        options:[]
    },
    boatPayload: {
        key: "boatPayload",
        value: "Грузоподъемность (кг)",
        type: 'text',
        defaultValue:null,
        readOnly:false
    },
    engpwr: {
        key: "engpwr",
        value: "Предельная мощность двигателей, л.с.",
        type: 'text',
        defaultValue:null,
        readOnly:false,
    },
    boatYear: {
        key: "boatYear",
        value: "Год постройки",
        type: 'text',
        defaultValue:null,
        readOnly:false,
    },
    engineNum: {
        key: "engineNum",
        value: "Количество двигателей",
        type: 'text',
        defaultValue:null,
        readOnly:false
    },
    boatName: {
        key: "boatName",
        value: "Название (при наличии)",
        type: 'text',
        defaultValue:null,
        readOnly:false
    },
    boatLength: {
        key: "boatLength",
        value: "Длина (м)",
        type: 'text',
        defaultValue:null,
        readOnly:false
    },
    boatWidth: {
        key: "boatWidth",
        value: "Ширина(м)",
        type: 'text',
        defaultValue:null,
        readOnly:false
    },
    boatHeight: {
        key: "boatHeight",
        value: "Высота (м)",
        type: 'text',
        defaultValue:null,
        readOnly:false
    },
    passengersNum: {
        key: "passengersNum",
        value: "Пассажировместимость (чел.)",
        type: 'text',
        defaultValue:null,
        readOnly:false
    },
    saCategory: {
        key: "saCategory",
        value: "Категория сложности района плавания",
        type: 'text',
        defaultValue:null,
        readOnly:false
    },

}

export function setOptionsForBoat(types,kinds,materials) {
    fieldBoatOptions.boatType.options = types
    fieldBoatOptions.boatVid.options = kinds
    fieldBoatOptions.bodyMaterial.options = materials
    return fieldBoatOptions
}