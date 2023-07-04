import React, { useState } from "react";
import { useSelector } from "react-redux";

import SearchBlock from "../../../components/GeneralComponents/SearchBlock/SearchBlock";
import SearchTable from "../../../components/GeneralComponents/SearchTable/SearchTable";
import ToolBlock from "../../../components/AdministrativeProcedures/commonComponents/ToolBlock/ToolBlock";

import { inputsTechnicalExamination } from "../../../components/GeneralComponents/SearchBlock/inputsHeaders";
import { setOptionsForInputsATE } from "../../../components/GeneralComponents/SearchBlock/inputsHeaders";
import { TECHNICAL_EXAMINATON_COLUMNS } from "../../../components/GeneralComponents/SearchTable/TablesColumns";

export default function TechnicalExaminationContainer() {
  const [statementId, setStatementId] = useState(null);
  const [appStatusId, setAppStatusId] = useState(null);

  const handleStatementId = (value) => {
    setStatementId(value);
  };
  const handleAppStatusId = (value) => {
    setAppStatusId(value);
  };

  const dataOptionsForSelectATE = useSelector((state) => {
    const { dictionaryReducer } = state;
    return dictionaryReducer.ateLibrary;
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

  const dataStateTechExam = useSelector((state) => {
    const { TechnicalExaminationReducer } = state;
    return TechnicalExaminationReducer.data;
  });

  return (
    <>
      <h2>Техническое освидетельствование</h2>
      <SearchBlock inputsHeaders={Object.values(inputsTechnicalExamination)} />
      <ToolBlock
        id={statementId}
        appStatusId={appStatusId}
      />
      <SearchTable
        setId={handleStatementId}
        setStatusId={handleAppStatusId}
        headerColumns={TECHNICAL_EXAMINATON_COLUMNS}
        dataFromState={dataStateTechExam}
      />
    </>
  );
}
