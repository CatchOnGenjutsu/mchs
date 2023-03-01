import React, {useEffect, useState} from 'react';
import styles from './ModalWindow.module.css'
import {Form,Button,Modal} from "react-bootstrap";
import {optionsForModalWindow} from "./constansForModalWindow";
import {useSelector} from "react-redux";
function ModalWindow({setShow,show,type,buildingId}) {
    const dataFromStateBases = useSelector(state => {
        const {basesBuildingReducer} = state
        return 	basesBuildingReducer.data
    })
    console.log(dataFromStateBases)
    const [building,setBuilding]=useState(()=>{
        if(dataFromStateBases.length){
            return structuredClone(dataFromStateBases.find(el=>el.parkId==buildingId))
        }
        else {return null}
    })
    console.log(building)

   // let building =
    const options = {
        add: 'Добавить новую базу',
        edit: 'Редактировать запись',
        delete:'Удалить запись'
    }
    const handleClose = () => setShow(false);
    const [selectValue,setSelectValue]= useState(null)
    const [optionsInput,setOptionsInput]=useState([])
    useEffect(()=>{
        const element = document.querySelector('#typeOwnership');
        (element && setSelectValue(element.value))
        selectValue==optionsForModalWindow.optionsForSelect[0].id?setOptionsInput(optionsForModalWindow.optionsForInputIndividual):setOptionsInput(optionsForModalWindow.optionsForInputLegalEntity)
    })

    const handleValue = (event)=>{
        setSelectValue(event.target.value)
        selectValue==optionsForModalWindow.optionsForSelect[0].id?setOptionsInput(optionsForModalWindow.optionsForInputIndividual):setOptionsInput(optionsForModalWindow.optionsForInputLegalEntity)
    }

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{options[type]}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className={`d-flex flex-wrap justify-content-between`}>
                    <Form.Group className=' mr-auto ' >
                        <Form.Label>Форма собственности</Form.Label>
                        <Form.Select
                            onChange={(e) => handleValue(e)}
                            id={`typeOwnership`}
                            value={(type==='edit'&&building)?building['ownerType']:1}
                        >
                            {optionsForModalWindow.optionsForSelect.map(el=><option value={el.id}>{el.value}</option>)}
                        </Form.Select>
                    </Form.Group>
                    {optionsInput.map(el=>
                        (
                                <Form.Group className="mb-3" >
                                    <Form.Label>{el.label}</Form.Label>
                                    <Form.Control
                                        data-id={el.key}
                                        type="text"
                                        value={(type==='edit'&&building)?building[el.key]:''}
                                        onChange={(e)=>{
                                        // data[e.currentTarget.dataset.id]=e.currentTarget.value
                                        //     setBuilding(structuredClone(data))
                                        }
                                        }

                                    />
                                </Form.Group>
                            )
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalWindow;