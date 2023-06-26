import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import SearchBlock from "../../components/SearchBlock/SearchBlock";
import SearchTable from "../../components/SearchTable/SearchTable";
import ToolBlock from "../../components/AdministrativeProcedures/commonComponents/ToolBlock/ToolBlock";
import ModalWindow from "../../components/AdministrativeProcedures/commonComponents/ModalWindow/ModalWindow";
import { inputsFindBoatToChange } from "../../components/SearchBlock/inputsHeaders";
import { COLUMNS_FORM_SEARCH_BOAT_CARDS } from "../../components/SearchTable/TablesColumns";
import {getDataRegInfChangeBoatCardsBySearchParams} from "../../redux/RegistrationInformationChangesReducer/actionRegInfChanges";
import {Button} from "react-bootstrap";
import {clearNewStatement} from "../../redux/statementReducer/actionsStatement";
import {useNavigate} from "react-router-dom";

function FormSearchBoatCard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [boatCardId, setBoatCardId] = useState(null);
  const [addBtnDis, setAddBtnDis] = useState(true);
  const handleBoatCardId = (value) => {
    console.log(value);
    setBoatCardId(value);
  };

  const dataBoatCards = useSelector((state) => {
    const { registrationInformationChangesReducer } = state;
    return registrationInformationChangesReducer.dataBoatCards;
  });
    const stateRegInfChanges = useSelector((state) => {
        const { registrationInformationChangesReducer } = state;
        return registrationInformationChangesReducer;
    });
    const handleCloseApp = () => {
        // dispatch(clearNewStatement());
        navigate(-1);
    };

  useEffect(()=>{dispatch(getDataRegInfChangeBoatCardsBySearchParams(stateRegInfChanges.searchParamsBoatCards));},[])
  return (
    <>
      <h2>Поиск маломерного судна для подачи заявления</h2>
        <Button
            variant="danger"
            onClick={handleCloseApp}>
            Вернуться к заявлениям
        </Button>
      <SearchBlock inputsHeaders={Object.values(inputsFindBoatToChange)} />
      <ToolBlock
        id={boatCardId}
        data={dataBoatCards}
        setShow={setShow}
        addBtnDisIn={!Boolean(boatCardId)}
      />
      <SearchTable
        setId={handleBoatCardId}
        dataFromState={dataBoatCards}
        headerColumns={COLUMNS_FORM_SEARCH_BOAT_CARDS}
      />
      {show && (
        <ModalWindow
          show={show}
          setShow={setShow}
          idBoadCard={boatCardId}
        />
      )}
    </>
  );
}

export default FormSearchBoatCard;
