export const optionInfoRepresentPerson = {
  agentSurname:{
    key: "agentSurname",
    value: "Фамилия",
    type:'text'
  },
  agentName:{
    key: "agentName",
    value: "Имя",
    type:'text'
  },
  agentMidname: {
    key: "agentMidname",
    value: "Отчество",
    type:'text'
  },
  agentDocType:{
    key: "agentDocType",
    value: "Документ",
    type:'select',
    selectOption: [{id:1, value:'Паспорт'}, {id:2, value:'Вид на жительство'}]
  },
  agentSerialOfPassport:{
    key: "agentSerialOfPassport",
    value: "Серия",
    type:'text'
  },
  agentNumberOfPassport:{
    key: "agentNumberOfPassport",
    value: "Номер",
    type:'text'
  },
  agentDocDate:{
    key: "agentDocDate",
    value: "Дата выд.",
    type:'date'
  },
  // rayonId: {
  //   key: "rayonId",
  //   value: "Дата выд.",
  //   type:'selectRayon',
  //   selectOption:[{value:0, label:'Все'}]
  // },
  // status: {
  //   key: "status",
  //   value: "Статус",
  //   type:'select',
  //   selectOption:[{id:0,value:'Все'},{id:2,value:'Зарегистрировано'},{id:1,value:'Черновик'}]
  // }
}