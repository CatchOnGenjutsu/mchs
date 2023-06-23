export const fieldsForSearchGraphs = {
    periodGraph: {
        key: "periodGraph",
        label: "Динамика",
        type: "selectSearch",
        disabled: false,
        search:false,
        required: true,
        visible: true,
        options: [
            {value: 1, label: "Пятилетняя годовая", key: "periodGraph"},
            {value: 2, label: "Месячная с нарастающим итогом", key: "periodGraph"},
        ],
    },
    graphMounth: {
        key: "graph",
        label: "Тип графика",
        type: "selectSearch",
        disabled: false,
        search:false,
        required: true,
        visible: true,
        multi: true,
        options: [
            {value: 1, label: "Количество зарегистрированных маломерных судов", key: "graph"},
            {value: 2, label: "Количество снятых с учета маломерных судов", key: "graph"},
            {value: 3, label: "Всего на учете маломерных судов", key: "graph"},
            {value: 4, label: "Количество проведенных технических освидетельствований ", key: "graph"},
            {value: 5, label: "Количество подготовленных судоводителей", key: "graph"},
            {value: 6, label: "Количество транспортных аварийных случаев", key: "graph"},
            {value: 7, label: "Количество выданных удостоверений", key: "graph"},
            {value: 8, label: "Количество спасенных граждан с маломерных судов", key: "graph"},
            {value: 9, label: "Количество погибших граждан с маломерных судов", key: "graph"},


        ],
    },
}

export const setOptionsForField = (prop,field)=>{

    switch (field) {


        default:break;


    }
}

export const getOptionsForField = ()=>fieldsForSearchGraphs