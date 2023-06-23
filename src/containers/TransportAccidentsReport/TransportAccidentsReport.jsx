import React, { useState } from "react";
import { useSelector } from "react-redux";

import SearchBlock from "../../components/SearchBlock/SearchBlock";
import ToolBlock from "../../components/AdministrativeProcedures/commonComponents/ToolBlock/ToolBlock";
import ModalWindow from "../../components/AdministrativeProcedures/commonComponents/ModalWindow/ModalWindow";
import { MemoSearchTable } from "../../components/SearchTable/SearchTable";

import {
  inputsHeadersTransportAccidentsReport,
  setOptionsForInputsATE,
} from "../../components/SearchBlock/inputsHeaders";
import { TRANSPORT_ACCIDENT_COLUMNS } from "../../components/SearchTable/TablesColumns";

export default function TransportAccidentsReport() {
  const [show, setShow] = useState(false);
  const [accidentsId, setAccidentsId] = useState(null);

  const handleSearchButton = () => {
    setAccidentsId(null);
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

  const dataFromStateTransportAccidents = useSelector((state) => {
    const { TransportAccidentsReportReducer } = state;
    return TransportAccidentsReportReducer.data;
  });

  return (
    <div>
      <h2>Учет транспортных аварийных случаев с участием маломерных судов</h2>
      <SearchBlock
        inputsHeaders={Object.values(inputsHeadersTransportAccidentsReport)}
        handleSearchButton={handleSearchButton}
      />
      <ToolBlock
        id={accidentsId}
        // appStatusId={appStatusId}
        show={show}
        setShow={setShow}
      />
      <MemoSearchTable
        // setId={handleAppId}
        // setStatusId={handleAppStatusId}
        headerColumns={TRANSPORT_ACCIDENT_COLUMNS}
        dataFromState={dataFromStateTransportAccidents}
      />
      {show && (
        <ModalWindow
          show={show}
          setShow={setShow}
        />
      )}
    </div>
  );
}
