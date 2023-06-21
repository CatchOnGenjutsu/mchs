import React, { useState } from "react";
import { useSelector } from "react-redux";

import SearchBlock from "../../components/SearchBlock/SearchBlock";
import ToolBlock from "../../components/AdministrativeProcedures/commonComponents/ToolBlock/ToolBlock";

import {
  inputsHeadersTransportAccidentsReport,
  setOptionsForInputsATE,
} from "../../components/SearchBlock/inputsHeaders";

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
        // viewBtnDisIn={!Boolean(appId)}
      />
      {/* <MemoSearchTable
        setId={handleAppId}
        setStatusId={handleAppStatusId}
        headerColumns={SMALLBOATS_ADMIN_COLUMNS}
        dataFromState={dataFromStateBoatsReg}
      /> */}
      {/* {show && (
        <ModalWindow
          show={show}
          setShow={setShow}
        />
      )} */}
    </div>
  );
}
