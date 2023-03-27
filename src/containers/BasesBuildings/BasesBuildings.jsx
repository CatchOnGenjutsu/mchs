import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import SearchBlock from "../../components/SearchBlock/SearchBlock";
import {BUILDING_COLUMNS} from "../../components/SearchTable/TablesColumns";
import SearchTable from "../../components/SearchTable/SearchTable";
import ToolBlock from "../../components/basesBuildings/ToolBlock/ToolBlock";

import ModalWindow from "../../components/basesBuildings/ModalWindow/ModalWindow";
import {inputsHeadersBasesBuildings, setOptionsForInputs} from "../../components/SearchBlock/inputsHeaders";




export default function BasesBuildings() {

  const checkMeaning = (property)=>property?property:''
  const [buildingId,setBuildingId]= useState(null)
  const dataFromStateBases = useSelector(state => {
  const {basesBuildingReducer} = state
  return   basesBuildingReducer.data
  })
  const  dataOptionsForSelect = useSelector(state => {
  const {dictionaryReducer} = state
  return dictionaryReducer.nsiCheckStatus
  })
  setOptionsForInputs(dataOptionsForSelect)
  const data = dataFromStateBases.map(base=>{
  const dataBase= {
    ownerLeName:``,
    ownerContact:``,
    baseContact:``,
    responData:``,
    checkDate:``,
    statusName:``,
    sectionName:``,
    note:``,
    id:base.parkId
  }
  dataBase.ownerLeName = base.ownerLeName
  dataBase.ownerContact = checkMeaning(base.ownerAddress)+ ' тел: '+ checkMeaning(base.ownerPhone)
  dataBase.baseContact = checkMeaning(base.location)+' тел1: '+checkMeaning(base.phone1)+' тел2: '+checkMeaning(base.phone2)
  dataBase.responData = checkMeaning(base.responPosition)+' '+checkMeaning(base.responFio)+' приказ № '+checkMeaning(base.responDocnum)+' от '+checkMeaning(base.responDocdate)
  dataBase.checkDate = checkMeaning(base.checkDate)
  dataBase.statusName = checkMeaning(base.statusName)
  dataBase.sectionName = checkMeaning(base.sectionName)
  dataBase.note = checkMeaning(base.note)
  return dataBase})

  const handleBuildingId = (value) => {
    setBuildingId(value)
  };
  const [show, setShow] = useState(false);
  const [buttonType,setButtonType] = useState(null)

  const handleShow = (event) => {
  event.stopPropagation()
  setButtonType(event.currentTarget.dataset.type)
  setShow(true);
  }

  return (
  <>
    <div>
    <h2>Базы и сооружения</h2>
    <SearchBlock inputsHeaders={Object.values(inputsHeadersBasesBuildings)} />
    <ToolBlock
      data = {dataFromStateBases}
      buildingId={buildingId}
      showForm = {handleShow}
      setButtonType={setButtonType}
    />
    <SearchTable
      setBuildingId = {handleBuildingId}
      columns={BUILDING_COLUMNS}
      dataFromState={data}
    />
    {show&&(<ModalWindow
      setShow={setShow}
      show={show}
      type={buttonType}
      buildingId={buildingId}
    />)}
    </div>
  </>
  );
}
