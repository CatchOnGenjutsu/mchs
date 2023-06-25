import {optionsMounthGraph,optionsFiveYearsGraph,month1,month2} from "./optionsForTypeGraph"
export const fieldsForSearchGraphs = {
    periodGraph: {
        key: "periodGraph",
        label: "Динамика",
        type: "selectSearch",
        disabled: false,
        search:false,
        required: true,
        hidden:false,
        options: [
            {value: 1, label: "Пятилетняя годовая", key: "periodGraph"},
            {value: 2, label: "Месячная с нарастающим итогом", key: "periodGraph"},
        ],
    },
    graph: {
        key: "graph",
        label: "Тип графика",
        type: "selectSearch",
        disabled: true,
        search:false,
        required: true,
        hidden:false,
        multi: true,
        options: [],
    },
    month1:{
        key: "month1",
        label: "Месяц с",
        type: "selectSearch",
        disabled: false,
        search:true,
        required: false,
        hidden:true,
        options: month1,
        
        
    },
    month2:{
        key: "month2",
        label: "Месяц по",
        type: "selectSearch",
        disabled: false,
        search:true,
        required: false,
        hidden:true,
        options: month2,
    },
    
}

export const setOptionsForField = (prop,field)=>{
    switch (field) {
       case "periodGraph":{
        if(prop===0){
            fieldsForSearchGraphs.graph.options = []
            fieldsForSearchGraphs.graph.disabled = true
            fieldsForSearchGraphs.month1.hidden = true
            fieldsForSearchGraphs.month2.hidden = true
            fieldsForSearchGraphs.month1.required = false
            fieldsForSearchGraphs.month2.required = false
        }
        if(prop===1){
            fieldsForSearchGraphs.graph.options = optionsFiveYearsGraph
            fieldsForSearchGraphs.graph.disabled = false
            fieldsForSearchGraphs.month1.hidden = true
            fieldsForSearchGraphs.month2.hidden = true
            fieldsForSearchGraphs.month1.required = false
            fieldsForSearchGraphs.month2.required = false
        }
        if(prop===2){
            fieldsForSearchGraphs.graph.options = optionsMounthGraph
            fieldsForSearchGraphs.graph.disabled = false
            fieldsForSearchGraphs.month1.hidden = false
            fieldsForSearchGraphs.month2.hidden = false
            fieldsForSearchGraphs.month1.required = true
            fieldsForSearchGraphs.month2.required = true
        }
         break;   
        }

        default:break;


    }
}

export const getOptionsForField = ()=>fieldsForSearchGraphs