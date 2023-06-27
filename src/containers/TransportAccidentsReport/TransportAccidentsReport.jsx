import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SearchBlock from "../../components/SearchBlock/SearchBlock";
import ToolBlock from "../../components/AdministrativeProcedures/commonComponents/ToolBlock/ToolBlock";
import ModalWindow from "../../components/AdministrativeProcedures/commonComponents/ModalWindow/ModalWindow";
import { MemoSearchTable } from "../../components/SearchTable/SearchTable";

import {
  inputsHeadersTransportAccidentsReport,
  setOptionsForInputsATE,
} from "../../components/SearchBlock/inputsHeaders";
import { TRANSPORT_ACCIDENT_COLUMNS } from "../../components/SearchTable/TablesColumns";

import { getDataTransportAccidentBySearchParams } from "../../redux/actions";

export default function TransportAccidentsReport() {
  const [show, setShow] = useState(false);
  const [accidentId, setAccidentId] = useState(null);
  const [accidentStatus, setAccidentsStatus] = useState(null);
  const dispatch = useDispatch();

  const handleAccidentId = (value) => {
    // appId === value ? setAppId(null) : setAppId(value);
    setAccidentId(value);
  };
  const handleAccidentsStatus = (value) => {
    setAccidentsStatus(value);
  };

  const handleSearchButton = () => {
    setAccidentId(null);
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
  const searchParamsTransportAccidents = useSelector((state) => {
    const { TransportAccidentsReportReducer } = state;
    return TransportAccidentsReportReducer.searchParams;
  });
  useEffect(() => {
    dispatch(getDataTransportAccidentBySearchParams(searchParamsTransportAccidents));
  }, []);

  return (
    <div>
      <h2>Учет транспортных аварийных случаев с участием маломерных судов</h2>
      <SearchBlock
        inputsHeaders={Object.values(inputsHeadersTransportAccidentsReport)}
        handleSearchButton={handleSearchButton}
      />
      <ToolBlock
        id={accidentId}
        appStatusId={accidentStatus}
        show={show}
        setShow={setShow}
      />
      <MemoSearchTable
        setId={handleAccidentId}
        setStatusId={handleAccidentsStatus}
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
