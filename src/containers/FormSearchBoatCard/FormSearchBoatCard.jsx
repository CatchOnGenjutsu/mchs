import React,{useState} from 'react';
import { useSelector } from "react-redux";
import SearchBlock from '../../components/SearchBlock/SearchBlock'
import SearchTable from '../../components/SearchTable/SearchTable'
import ToolBlock from '../../components/AdministrativeProcedures/ToolBlock/ToolBlock'
import {inputsFindBoatToChange} from '../../components/SearchBlock/inputsHeaders'
import {COLUMNS_FORM_SEARCH_BOAT_CARDS} from '../../components/SearchTable/TablesColumns'

function FormSearchBoatCard() {
    const [boatCardId,setBoatCardId]= useState(null)
    const handleBoatCardId = (value) => {
        setBoatCardId(value)
    };

    const dataBoatCards = useSelector((state)=>{
        const {registrationInformationChangesReducer}=state
        return registrationInformationChangesReducer.dataBoatCards
    })
    return (
        <>
           <SearchBlock
               inputsHeaders = {Object.values(inputsFindBoatToChange)}
           />
           <ToolBlock
               id={boatCardId}
               data={dataBoatCards}
           />
           <SearchTable
               setId={handleBoatCardId}
               dataFromState={dataBoatCards}
               headerColumns={COLUMNS_FORM_SEARCH_BOAT_CARDS}
           />
        </>
    );
}

export default FormSearchBoatCard;