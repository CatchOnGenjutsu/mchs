import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SearchBlock from "../../../components/GeneralComponents/SearchBlock/SearchBlock";
import SearchTable from "../../../components/GeneralComponents/SearchTable/SearchTable";
import ToolBlock from "../../../components/AdministrativeProcedures/commonComponents/ToolBlock/ToolBlock";

import { SMALLBOATS_ADMIN_COLUMNS } from "../../../components/GeneralComponents/SearchTable/TablesColumns";
import {
  inputsRegInformChange,
  setOptionsForInputsATE,
} from "../../../components/GeneralComponents/SearchBlock/inputsHeaders";
import { getDataRegInfChangeBySearchParams } from "../../../redux/RegistrationInformationChangesReducer/actionRegInfChanges";

function RegistrationInformationChanges() {
  const dispatch = useDispatch();
  const [statementId, setStatementId] = useState(null);
  const dataOptionsForSelectATE = useSelector((state) => {
    const { dictionaryReducer } = state;
    return dictionaryReducer.ateLibrary;
  });

  const dataStateRegInfChanges = useSelector((state) => {
    const { registrationInformationChangesReducer } = state;
    return registrationInformationChangesReducer.data;
  });
  const stateRegInfChanges = useSelector((state) => {
    const { registrationInformationChangesReducer } = state;
    return registrationInformationChangesReducer;
  });
  const dataOptionsForSelectATEValidated = [];
  dataOptionsForSelectATE.forEach((item) => {
    dataOptionsForSelectATEValidated.push({
      value: item.sctId,
      label: item.sctName,
      key: "section",
    });
  });
  useEffect(() => {
    dispatch(getDataRegInfChangeBySearchParams(stateRegInfChanges.searchParams));
  }, []);
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
        data={dataStateRegInfChanges}
        appStatusId={
          statementId
            ? dataStateRegInfChanges.find((el) => el.id.toString() === statementId).statusId
            : undefined
        }
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
