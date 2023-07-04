import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SearchBlock from "../../../components/GeneralComponents/SearchBlock/SearchBlock";
import ToolBlock from "../../../components/AdministrativeProcedures/commonComponents/ToolBlock/ToolBlock";
import { MemoSearchTable } from "../../../components/GeneralComponents/SearchTable/SearchTable";

import { inputsHeadersShipsTicket } from "../../../components/GeneralComponents/SearchBlock/inputsHeaders";
import { SHIPS_TICKET_COLUMNS } from "../../../components/GeneralComponents/SearchTable/TablesColumns";

import { setOptionsForInputsATE } from "../../../components/StatisticsAnalytics/TransportAccidentForm/TransportAccidentFormSettings";

export default function ShipsTicket() {
  const [show, setShow] = useState(false);
  const [appId, setAppId] = useState(null);
  const [appStatusId, setAppStatusId] = useState(null);
  const [tableKey, setTableKey] = useState(null);

  const dispatch = useDispatch();

  const handleAppId = (value) => {
    // appId === value ? setAppId(null) : setAppId(value);
    setAppId(value);
  };
  const handleAppStatusId = (value) => {
    setAppStatusId(value);
  };
  const handleSearchButton = () => {
    // appId === value ? setAppId(null) : setAppId(value);
    setAppId(null);
  };

  const handleTableKey = (value) => {
    setTableKey(value);
  };

  const dataOptionsForSelectATE = useSelector((state) => {
    const { dictionaryReducer } = state;
    return dictionaryReducer.ateLibrary;
  });

  const searchParamsFromStateShipsTicket = useSelector((state) => {
    const { ShipsTicketReducer } = state;
    return ShipsTicketReducer.searchParams;
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

  const dataFromStateShipsTicket = useSelector((state) => {
    const { ShipsTicketReducer } = state;
    return ShipsTicketReducer.data;
  });

  return (
    <>
      <h2>Выдача судового билета</h2>
      <SearchBlock
        inputsHeaders={Object.values(inputsHeadersShipsTicket)}
        handleSearchButton={handleSearchButton}
      />
      <ToolBlock
        id={appId}
        appStatusId={appStatusId}
        tableKey={tableKey}
      />
      <MemoSearchTable
        setId={handleAppId}
        setStatusId={handleAppStatusId}
        setTableKey={handleTableKey}
        headerColumns={SHIPS_TICKET_COLUMNS}
        dataFromState={dataFromStateShipsTicket}
      />
    </>
  );
}
