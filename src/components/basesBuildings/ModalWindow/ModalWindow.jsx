import React, {useEffect, useState} from 'react';
import styles from './ModalWindow.module.css'
import {Form,Button,Modal} from "react-bootstrap";
import {optionsForModalWindow, setOptionsForModalWindow} from "./constansForModalWindow";
import {useDispatch, useSelector} from "react-redux";
import {addDataBasesBuildings, deleteDataBasesBuildings, editDataBasesBuildings} from "../../../redux/actions";
function ModalWindow({setShow,show,type,buildingId}) {
    const optionsButton = {
        add: 'Добавить новую базу',
        edit: 'Редактировать запись',
        delete:'Удалить запись'
    }
    const dispatch = useDispatch();
    const dataFromStateBases = useSelector(state => {
        const {basesBuildingReducer} = state
        return 	basesBuildingReducer.data
    })
    const options= useSelector((state => {
        const {dictionaryReducer} = state
        return {
            sectionOptions:dictionaryReducer.gimsSections,
            ownerOptions:dictionaryReducer.ownerType
        }
    }))
    setOptionsForModalWindow(options.ownerOptions,options.sectionOptions)
    const [building,setBuilding]=useState(()=>{
        if(dataFromStateBases.length&&(type==='edit'||type==='delete')){
            return structuredClone(dataFromStateBases.find(el=>el.parkId==buildingId))
        }
        else {return {ownerType:options.ownerOptions[0].id,section:options.sectionOptions[0].id}}
    })

    const [optionsInput,setOptionsInput]=useState(()=>{
      return   building.ownerType==options.ownerOptions[0].id?Object.values(optionsForModalWindow.optionsForInputIndividual):Object.values(optionsForModalWindow.optionsForInputLegalEntity)
    })

    const handleValue = (event)=>{
        if(event.target.id=='ownerType'){
            building[event.target.id]=event.target.value
            setBuilding(building)
            event.target.value==options.ownerOptions[0].id?setOptionsInput(Object.values(optionsForModalWindow.optionsForInputIndividual)):setOptionsInput(Object.values(optionsForModalWindow.optionsForInputLegalEntity))
        }
        if(event.target.id=='section'){
            console.log(event.target.id)
            building[event.target.id]=Number(event.target.value)
            setBuilding({...building})
           console.log(building)
        }


    }
    const handleClose = (event) => {
        console.log(building)
        let buttonType
        if(event){
            buttonType = event.target.dataset.type
        }
        switch (true) {
            case (buttonType ==='save'&& type ==='add'):{
                dispatch(addDataBasesBuildings(building))
                break;
            }
            case (buttonType ==='save'&& type ==='edit'):{
                dispatch(editDataBasesBuildings(building))
                break;
            }
            case (buttonType ==='delete'&& type ==='delete'):{
                dispatch(deleteDataBasesBuildings(building))
                break;
            }
        }
        setShow(false)
    };
    console.log(optionsInput)
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton >
                <Modal.Title>{optionsButton[type]}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className={`d-flex flex-wrap justify-content-between`}>

                    {optionsInput.map(el=>{
                        if(el.type=='select'){
                            return (
                                <Form.Group className=' mr-auto ' >
                                    <Form.Label>{el.label}</Form.Label>
                                    <Form.Select
                                        onChange={(e) => handleValue(e)}
                                        id={el.key}
                                        value={building[el.key]}
                                        disabled={type=='delete'}
                                    >
                                        {el.options.map(el=><option value={el.id}>{el.value}</option>)}
                                    </Form.Select>
                                </Form.Group>
                            )
                        }else {
                            return (
                                <Form.Group className="mb-3" >
                                    <Form.Label>{el.label}</Form.Label>
                                    <Form.Control
                                        data-id={el.key}
                                        disabled={type=='delete'}
                                        type="text"
                                        value={(building)&&building[el.key]||''}
                                        onChange={(e)=>{
                                            building[e.currentTarget.dataset.id]=e.currentTarget.value
                                            setBuilding(structuredClone(building))
                                        }}
                                    />
                                </Form.Group>
                            )
                        }
                        })}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" data-type={`close`} onClick={handleClose}>
                    Закрыть
                </Button>
                <Button variant="primary" data-type={type==='delete'?'delete':`save`} onClick={handleClose}>
                    {type==='delete'?'Удалить':`Сохранить`}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalWindow;
