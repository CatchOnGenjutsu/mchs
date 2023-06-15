import React, {useEffect, useRef, useState} from 'react';
import styles from './ModalWindow.module.css'
import {Form,Button,Modal} from "react-bootstrap";
// import  {optionsForModalWindow} from "./constansForModalWindow"
import {getOptionsForModalWindow,setOptionsForModalWindow,optionsButton} from "./constansForModalWindow";
import {useDispatch, useSelector} from "react-redux";
import {addDataBasesBuildings,  editDataBasesBuildings} from "../../../redux/baseBuildingReducer/actionsBaseBuilding";
import Select from "react-select";



function ModalWindow({setShow,show,type,buildingId}) {
    const dispatch = useDispatch();
    const selectSectionRef = useRef();
    const selectRayonRef = useRef();
    const selectOblRef = useRef();
    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: '1px solid #dc3545',
        }),
    };
    // const [saveKey, setSaveKey] = useState(false)

    const dataFromStateBases = useSelector(state => {
        const {basesBuildingReducer} = state
        return   basesBuildingReducer.data
    })
    const optionsOwnerType= useSelector((state => {
        const {dictionaryReducer} = state
        return dictionaryReducer.ownerType.filter(el=>el.id==2||el.id==3)
    }))
    const [dataForm,setDataForm]=useState({ownerType:2})
    const [errors,setErrors]= useState({})

    const [optionsInput,setOptionsInput]=useState([])

    function setRef(option) {

        switch (option.key) {
            case "ownerOblast":
                return selectOblRef;
            case "ownerRayon":
                return selectRayonRef;
            case "section":
                return selectSectionRef;
            default:
                return null;
        }
    }

    const handleValue = (event)=>{
        if(event.target.id=='ownerType'){
            dataForm[event.target.id]=event.target.value
            setDataForm({...dataForm})
        }
    }


    const handleClose = (event) => {
        let buttonType
        if(event){
            buttonType = event.target.dataset.type
        }
       if(!editErrors(buttonType)) {
       if(buttonType ==='save'&& (type ==='add'|| type ==='edit')){
           dispatch(addDataBasesBuildings(dataForm))
       }
           setShow(false)
       }
    };
    const editErrors = (buttonType)=>{
        if(buttonType==='save'){
            const {ownerLeName,ownerAddress,ownerPhone,location,responPosition,responFio,ownerOblast,ownerRayon,section}=dataForm
            console.log(ownerOblast,!ownerRayon,!section)
            const newErrors={}
            if(!ownerOblast || ownerOblast==='') newErrors.ownerOblast = 'Заполните область местонахождения базы'
            if(!ownerRayon || ownerRayon==='') newErrors.ownerRayon = 'Заполните район местонахождения базы'
            if(!section || section==='') newErrors.section = 'Заполните участок местонахождения базы'
            if(!ownerLeName || ownerLeName==='') newErrors.ownerLeName = 'Заполните наименование'
            if(!ownerAddress || ownerAddress==='') newErrors.ownerAddress = 'Заполните адрес эксплуатанта'
            if(!ownerPhone || ownerPhone==='') newErrors.ownerPhone = 'Заполните телефон эксплуатанта'
            if(!location || location==='') newErrors.location = 'Заполните местонахождение базы'
            if(!responPosition || responPosition==='') newErrors.responPosition = 'Заполните должность ответственного'
            if(!responFio || responFio==='') newErrors.responFio = 'Заполните ФИО ответственного'
            console.log(newErrors)
            if(Object.keys(newErrors).length>0){
                setErrors(newErrors)
                return true
            } else {
                return false
            }
        } else return false
    }

    async function handleChangeSelectSearch(event) {
        if (event){
            switch (event.key) {
                case "ownerOblast":{
                    dataForm[event.key]=event.value
                    setDataForm({...dataForm})
                    selectRayonRef.current.clearValue();
                    selectSectionRef.current.clearValue();
                    break;
                }
                case "ownerRayon":{
                    dataForm[event.key]=event.value
                    setDataForm({...dataForm})
                    selectSectionRef.current.clearValue();
                    break;
                }
                case "section":{
                    dataForm[event.key]=event.value
                    setDataForm({...dataForm})
                    break;
                }
                default:break;

            }
        }
    }

    useEffect(()=>{
        setOptionsForModalWindow(optionsOwnerType,"ownerType")
        setOptionsForModalWindow(undefined, "ownerOblast");
        setOptionsForModalWindow(undefined, "ownerRayon");

        if(dataFromStateBases.length&&(type==='edit')){
            const data =dataFromStateBases.find(el=>el.parkId==buildingId)
            setDataForm(data)
        }
        (async function setOptionsForAdress() {
            if(dataForm["ownerOblast"]){
                await setOptionsForModalWindow(dataForm["ownerOblast"], "ownerOblast");
            }
            if(dataForm["ownerRayon"]){
                await setOptionsForModalWindow(dataForm["ownerRayon"], "ownerRayon");
            }
            setOptionsInput(Object.values(getOptionsForModalWindow()));
        })()
    },[dataForm])

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
                                        value={dataForm[el.key]}
                                    >
                                        {el.options.map(el=><option value={el.id}>{el.value}</option>)}
                                    </Form.Select>
                                </Form.Group>
                            )
                        }else if(el.type==="selectSearch"){
                            return (
                                <Form.Group className={styles[`box-${el.key}`]}  >
                                    <Form.Label>{el.label}</Form.Label>
                                    <Select
                                        value={el.options.find((item) => item.value === dataForm[el.key])}
                                        classNamePrefix="custom-select"
                                        styles={!!errors[el.key]?customStyles:""}
                                        ref={setRef(el)}
                                        onChange = {(e)=> handleChangeSelectSearch(e)}
                                        placeholder="Выберите"
                                        id={el.key}
                                        isSearchable={el.isSearchable}
                                        isDisabled = {el.isDisabled}
                                        name={el.key}
                                        options={el.options}
                                    />
                                    {!!errors[el.key] && (<Form.Label className={styles.error}>{errors[el.key]}</Form.Label>)}
                                </Form.Group>
                            )

                        }else {
                            return (
                                <Form.Group className={styles[`box-${el.key}`]}>
                                    <Form.Label>{el.label}</Form.Label>
                                    <Form.Control
                                        id={el.key}
                                        isInvalid={!!errors[el.key]}
                                        type={el.type}
                                        value={(dataForm)&&dataForm[el.key]||''}
                                        onChange={(e)=>{
                                            dataForm[e.currentTarget.id]=e.currentTarget.value
                                            setDataForm(structuredClone(dataForm))
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
                <Button variant="primary" data-type={`save`} onClick={handleClose}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalWindow;
