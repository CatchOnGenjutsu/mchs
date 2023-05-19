import React, { useState } from "react";
import SearchBlock from "../../../components/SearchBlock/SearchBlock";
import SearchTable from "../../../components/SearchTable/SearchTable";
import ToolBlock from "../../../components/AdministrativeProcedures/commonComponents/ToolBlock/ToolBlock";
import { SMALLBOATS_ADMIN_COLUMNS } from "../../../components/SearchTable/TablesColumns";
import { inputsRegInformChange, setOptionsForInputsATE } from "../../../components/SearchBlock/inputsHeaders";
import { useSelector } from "react-redux";

function RegistrationInformationChanges() {
  const [statementId, setStatementId] = useState(null);
  const dataOptionsForSelectATE = useSelector((state) => {
    const { dictionaryReducer } = state;
    return dictionaryReducer.ateLibrary;
  });

  const dataStateRegInfChanges = useSelector((state) => {
    const { registrationInformationChangesReducer } = state;
    return registrationInformationChangesReducer.data;
  });
  const dataOptionsForSelectATEValidated = [];
  dataOptionsForSelectATE.forEach((item) => {
    dataOptionsForSelectATEValidated.push({
      value: item.sctId,
      label: item.sctName,
      key: "section",
    });
  });

  setOptionsForInputsATE(dataOptionsForSelectATEValidated, document.location.pathname.slice(1));

  const handleStatementId = (value) => {
    setStatementId(value);
  };

  return (
    <>
      <h2>Регистрация изменений сведений / заявления</h2>
      <SearchBlock inputsHeaders={Object.values(inputsRegInformChange)} />
      <ToolBlock
        addBtnDis={true}
        id={statementId}
      />
      <SearchTable
        setId={handleStatementId}
        headerColumns={SMALLBOATS_ADMIN_COLUMNS}
        dataFromState={dataStateRegInfChanges}
      />
    </>
  );
}

export default RegistrationInformationChanges;
