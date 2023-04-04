import React from 'react';
import SearchBlock from '../../components/SearchBlock/SearchBlock';
import SearchTable from '../../components/SearchTable/SearchTable';
import { inputsRegInformChange, setOptionsForInputsATE } from '../../components/SearchBlock/inputsHeaders';
import { useSelector } from 'react-redux';
function RegistrationInformationChanges() {
    const dataOptionsForSelectATE = useSelector(state => {
        const {dictionaryReducer} = state
        return dictionaryReducer.ateLibrary
    })
    const dataOptionsForSelectATEValidated = [];
    dataOptionsForSelectATE.forEach(item => {
        dataOptionsForSelectATEValidated.push({value: item.uiddistrict, label: item.namedistrictRu})
    })
    setOptionsForInputsATE(dataOptionsForSelectATEValidated,document.location.pathname.slice(1));
    return (
        <>
            <h2>Регистрация изменений сведений / заявления</h2>
            <SearchBlock inputsHeaders={Object.values(inputsRegInformChange)} />
        </>
    );
}

export default RegistrationInformationChanges;