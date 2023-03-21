import React, {useEffect, useState} from 'react';
import styles from './ModalWindow.module.css'
import {Form,Button,Modal} from "react-bootstrap";
import {optionsForModalWindow, setOptionsForModalWindow,optionsButton} from "./constansForModalWindow";
import {useDispatch, useSelector} from "react-redux";
import {addDataBasesBuildings, deleteDataBasesBuildings, editDataBasesBuildings} from "../../../redux/baseBuildingReducer/actionsBaseBuilding";
function ModalWindow({setShow,show,type,buildingId}) {
    const dispatch = useDispatch();
    const dataFromStateBases = useSelector(state => {
        const {basesBuildingReducer} = state
        return   basesBuildingReducer.data
    })
    const options= useSelector((state => {
        const {dictionaryReducer} = state
        return {
            sectionOptions:dictionaryReducer.gimsSections,
            ownerOptions:dictionaryReducer.ownerType
        }
    }))
    setOptionsForModalWindow(options.ownerOptions,options.sectionOptions)
    const [form,setForm]=useState(()=>{
        if(dataFromStateBases.length&&(type==='edit'||type==='delete')){
            return structuredClone(dataFromStateBases.find(el=>el.parkId==buildingId))
        }
        else {return {ownerType:options.ownerOptions[0].id,section:options.sectionOptions[0].id}}
    })
    const [errors,setErrors]= useState({})

    const [optionsInput,setOptionsInput]=useState(()=>{
      return   form.ownerType==options.ownerOptions[0].id?Object.values(optionsForModalWindow.optionsForInputIndividual):Object.values(optionsForModalWindow.optionsForInputLegalEntity)
    })

    const handleValue = (event)=>{
        if(event.target.id=='ownerType'){
            form[event.target.id]=event.target.value
            setForm({...form})
            event.target.value==options.ownerOptions[0].id?setOptionsInput(Object.values(optionsForModalWindow.optionsForInputIndividual)):setOptionsInput(Object.values(optionsForModalWindow.optionsForInputLegalEntity))
        }
        if(event.target.id=='section'){
            form[event.target.id]=Number(event.target.value)
            setForm({...form})
        }


    }
    const handleClose = (event) => {
        let buttonType
        if(event){
            buttonType = event.target.dataset.type
        }
       if(!editErrors(buttonType)) {
           switch (true) {
               case (buttonType ==='save'&& type ==='add'):{
                   form.sectionName = options.sectionOptions.find(el=>el.id===form.section).value
                   dispatch(addDataBasesBuildings(form))
                   break;
               }
               case (buttonType ==='save'&& type ==='edit'):{
                   form.sectionName = options.sectionOptions.find(el=>el.id===form.section).value
                   dispatch(editDataBasesBuildings(form))
                   break;
               }
               case (buttonType ==='delete'&& type ==='delete'):{
                   dispatch(deleteDataBasesBuildings(form))
                   break;
               }
           }
           setShow(false)
       }




    };
    const editErrors = (buttonType)=>{
        if(buttonType==='save'){
            const {ownerName,ownerMidname,ownerLeName,ownerAddress,ownerPhone,location,responPosition,responFio}=form
            const newErrors={}
            if(form.ownerType==options.ownerOptions[0].id){
                if(!ownerName || ownerName==='') newErrors.ownerName = 'Заполните имя'
                if(!ownerMidname || ownerMidname==='') newErrors.ownerMidname = 'Заполните фамилию'
            }else {
                if(!ownerLeName || ownerLeName==='') newErrors.ownerLeName = 'Заполните наименование'
            }

            if(!ownerAddress || ownerAddress==='') newErrors.ownerAddress = 'Заполните адрес эксплуатанта'
            if(!ownerPhone || ownerPhone==='') newErrors.ownerPhone = 'Заполните телефон эксплуатанта'
            if(!location || location==='') newErrors.location = 'Заполните местонахождение базы'
            if(!responPosition || responPosition==='') newErrors.responPosition = 'Заполните должность ответственного'
            if(!responFio || responFio==='') newErrors.responFio = 'Заполните ФИО ответственного'
            console.log(newErrors)
            if(Object.keys(newErrors).length>0){
                setErrors(newErrors)
                return true
            }else return false
        }else return false
    }
    return (
        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton >
                <Modal.Title>{optionsButton[type]}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className={styles.container}>
                    {optionsInput.map(el=>{
                        if(el.type==='select'){
                            return (
                                <Form.Group className={styles[`box-${el.key}`]}  >
                                    <Form.Label>{el.label}</Form.Label>
                                    <Form.Select
                                        onChange={(e) => handleValue(e)}
                                        id={el.key}
                                        value={form[el.key]}
                                        disabled={type==='delete'}
                                    >
                                        {el.options.map(el=><option value={el.id}>{el.value}</option>)}
                                    </Form.Select>
                                </Form.Group>
                            )
                        }else {
                            return (
                                <Form.Group className={styles[`box-${el.key}`]}>
                                    <Form.Label>{el.label}</Form.Label>
                                    <Form.Control
                                        id={el.key}
                                        disabled={type==='delete'}
                                        isInvalid={!!errors[el.key]}
                                        type={el.type}
                                        value={(form)&&form[el.key]||''}
                                        onChange={(e)=>{
                                            form[e.currentTarget.id]=e.currentTarget.value
                                            setForm(structuredClone(form))
                                        }}
                                    />
                                    <Form.Control.Feedback type={'invalid'}>{errors[el.key]}</Form.Control.Feedback>
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
