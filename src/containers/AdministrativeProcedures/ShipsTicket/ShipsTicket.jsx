import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import SearchBlock from "../../../components/SearchBlock/SearchBlock";
import ToolBlock from "../../../components/AdministrativeProcedures/commonComponents/ToolBlock/ToolBlock";

import { inputsHeadersShipsTicket } from "../../../components/SearchBlock/inputsHeaders";

export default function ShipsTicket() {
  const [show, setShow] = useState(false);
  const [appId, setAppId] = useState(null);
  const [appStatusId, setAppStatusId] = useState(null);

  const dispatch = useDispatch();

  const handleAppId = (value) => {
    // appId === value ? setAppId(null) : setAppId(value);
    setAppId(value);
  };
  const handleAppStatusId = (value) => {
    setAppStatusId(value);
  };

  return (
    <>
      <h2>Выдача судового билета</h2>
      <SearchBlock inputsHeaders={Object.values(inputsHeadersShipsTicket)} />
      <ToolBlock />
    </>
  );
}
