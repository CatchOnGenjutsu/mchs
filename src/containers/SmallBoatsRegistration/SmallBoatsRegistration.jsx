import React from 'react';
import SearchBlock from '../../components/SearchBlock/SearchBlock';
import SearchTable from '../../components/SearchTable/SearchTable';
import { SMALLBOATS_REG_COLUMNS } from '../../components/SearchTable/TablesColumns';
import { inputsHeadersSmallBoatsRegistration, setOptionsForInputsATE } from '../../components/SearchBlock/inputsHeaders';
import { useSelector } from 'react-redux';


export default function SmallBoatsRegistration() {
  const dataOptionsForSelectATE = useSelector(state => {
    const {dictionaryReducer} = state
    return dictionaryReducer.ateLibrary
  })
  const dataOptionsForSelectATEValidated = [];
  dataOptionsForSelectATE.forEach(item => {
    dataOptionsForSelectATEValidated.push({value: item.uiddistrict, label: item.namedistrictRu})
  })
  setOptionsForInputsATE(dataOptionsForSelectATEValidated,document.location.pathname.slice(1));

  const dataFromStateBoatsReg = useSelector((state) => {
    const { smallBoatsRegReducer } = state;
    return smallBoatsRegReducer.data;
  });

  return (
    <div>
      <h2>Регистрация маломерных судов</h2>
      <SearchBlock inputsHeaders={Object.values(inputsHeadersSmallBoatsRegistration)} />
      <SearchTable
        headerColumns={SMALLBOATS_REG_COLUMNS}
        dataFromState={dataFromStateBoatsReg}
      />
    </div>
  )
}