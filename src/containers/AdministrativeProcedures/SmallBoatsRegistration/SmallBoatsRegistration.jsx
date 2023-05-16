import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBlock from "../../../components/SearchBlock/SearchBlock";
import { MemoSearchTable } from "../../../components/SearchTable/SearchTable";
import { SMALLBOATS_ADMIN_COLUMNS } from "../../../components/SearchTable/TablesColumns";
import ModalWindow from "../../../components/AdministrativeProcedures/commonComponents/ModalWindow/ModalWindow";
import {
  inputsHeadersSmallBoatsRegistration,
  setOptionsForInputsATE,
} from "../../../components/SearchBlock/inputsHeaders";
import ToolBlock from "../../../components/AdministrativeProcedures/commonComponents/ToolBlock/ToolBlock";
import { getDataBoatsRegBySearchParams } from "../../../redux/actions";

export default function SmallBoatsRegistration() {
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
  const handleSearchButton = () => {
    // appId === value ? setAppId(null) : setAppId(value);
    setAppId(null);
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
    });
  });
  setOptionsForInputsATE(dataOptionsForSelectATEValidated, document.location.pathname.slice(1));

  const dataFromStateBoatsReg = useSelector((state) => {
    const { smallBoatsRegReducer } = state;
    return smallBoatsRegReducer.data;
  });
  // useState(() => {
  //   if (
  //     window.performance
  //       .getEntriesByType("navigation")
  //       .map((nav) => nav.type)
  //       .includes("reload")
  //   ) {
  //     dispatch(getDataBoatsRegBySearchParams(JSON.parse(sessionStorage.getItem("searchParams"))));
  //   }
  // }, []);

  return (
    <div>
      <h2>Регистрация маломерных судов</h2>
      <SearchBlock
        inputsHeaders={Object.values(inputsHeadersSmallBoatsRegistration)}
        handleSearchButton={handleSearchButton}
      />
      <ToolBlock
        id={appId}
        appStatusId={appStatusId}
        show={show}
        setShow={setShow}
        // viewBtnDisIn={!Boolean(appId)}
      />
      <MemoSearchTable
        setId={handleAppId}
        setStatusId={handleAppStatusId}
        headerColumns={SMALLBOATS_ADMIN_COLUMNS}
        dataFromState={dataFromStateBoatsReg}
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
