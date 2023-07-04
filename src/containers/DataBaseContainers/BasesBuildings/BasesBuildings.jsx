import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SearchBlock from "../../../components/SearchBlock/SearchBlock";
import ToolBlock from "../../../components/AdministrativeProcedures/commonComponents/ToolBlock/ToolBlock";
import ModalWindow from "../../../components/DataBaseComponents/basesBuildings/ModalWindow/ModalWindow";

import { BUILDING_COLUMNS } from "../../../components/SearchTable/TablesColumns";
import { MemoSearchTable } from "../../../components/SearchTable/SearchTable";
import {
  inputsHeadersBasesBuildings,
  setOptionsForInputs,
} from "../../../components/SearchBlock/inputsHeaders";

export default function BasesBuildings() {
  const checkMeaning = (property) => (property ? property : "");
  const [buildingId, setBuildingId] = useState(null);
  const dataFromStateBases = useSelector((state) => {
    const { basesBuildingReducer } = state;
    return basesBuildingReducer.data;
  });
  const dataOptionsForSelect = useSelector((state) => {
    const { dictionaryReducer } = state;
    return dictionaryReducer.nsiCheckStatus;
  });
  setOptionsForInputs(dataOptionsForSelect);
  const data = dataFromStateBases.map((base) => {
    const dataBase = {
      ownerLeName: ``,
      ownerContact: ``,
      unp: "",
      baseContact: ``,
      responData: ``,
      checkDate: ``,
      statusName: ``,
      sectionName: ``,
      note: ``,
      id: base.parkId,
    };
    dataBase.ownerLeName = base.ownerLeName;
    dataBase.ownerContact = checkMeaning(base.ownerAddress) + " тел: " + checkMeaning(base.ownerPhone);
    dataBase.unp = checkMeaning(base.ownerUnp);
    dataBase.baseContact =
      checkMeaning(base.location) +
      " тел1: " +
      checkMeaning(base.phone1) +
      " тел2: " +
      checkMeaning(base.phone2);
    dataBase.responData =
      checkMeaning(base.responPosition) +
      " " +
      checkMeaning(base.responFio) +
      " приказ № " +
      checkMeaning(base.responDocnum) +
      " от " +
      checkMeaning(!!base.responDocdate ? new Date(base.responDocdate).toLocaleDateString() : "");
    dataBase.checkDate = checkMeaning(!!base.checkDate ? new Date(base.checkDate).toLocaleDateString() : "");
    dataBase.statusName = checkMeaning(base.statusName);
    dataBase.sectionName = checkMeaning(base.sectionName);
    dataBase.note = checkMeaning(base.note);
    return dataBase;
  });

  const handleBuildingId = (value) => {
    setBuildingId(value);
  };
  const [show, setShow] = useState(false);
  const [buttonType, setButtonType] = useState(null);

  const handleShow = (event) => {
    event.stopPropagation();
    setButtonType(event.currentTarget.dataset.type);
    setShow(true);
  };

  return (
    <>
      <div>
        <h2>Базы и сооружения</h2>
        <SearchBlock inputsHeaders={Object.values(inputsHeadersBasesBuildings)} />
        <ToolBlock
          data={dataFromStateBases}
          buildingId={buildingId}
          showForm={handleShow}
          setButtonType={setButtonType}
        />
        <MemoSearchTable
          setId={handleBuildingId}
          headerColumns={BUILDING_COLUMNS}
          dataFromState={data}
        />
        {show && (
          <ModalWindow
            setShow={setShow}
            show={show}
            type={buttonType}
            buildingId={buildingId}
          />
        )}
      </div>
    </>
  );
}
