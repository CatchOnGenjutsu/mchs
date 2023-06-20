import React from 'react';
import { useState, useRef, useEffect } from "react";
import styles from "./SearchBlock.module.css";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import {useSelector} from "react-redux";
import Button from "react-bootstrap/Button";
import { MAIN_URL, PORT_FOR_REPORT} from "../../../../../constants/constants";


function SearchBlock({fields,setOptionsForField,urlForReport,setExcelFile,setPDFFile,getOptionsForField}) {
    const [data,setData]=useState({})
    const [options,setOptions]=useState(Object.values(fields))
    const [errors, setErrors] = useState({});
    const [dataRangeError, setDataRangeError] = useState("");

    const errorsFields = Object.values(fields).filter(el=>el.required).map(el=>el.key)
    const [saveKey, setSaveKey] = useState(false);
    const date1Ref = useRef();
    const date2Ref = useRef();
    const sectionRef = useRef();
    const oblastRef = useRef();

    let optionsSection = useSelector(state => state.dictionaryReducer.gimsSections)
    optionsSection = optionsSection.map((el)=>{
        const {id,value}=el
        const copyEl = {
            value:id,
            label:value,
            key:"section"
        }
        return copyEl
    })

    function setRef(field) {

        switch (field.key) {
            case "date1":
                return date1Ref;
            case "date2":
                return date2Ref;
            case "section":
                return sectionRef
            case  "oblast":
                return oblastRef
            default:
                return null;
        }
    }
    const handleErrors = () => {
        let newErrors = {};
        errorsFields.forEach((elem) => {
            if (!data[elem] || data[elem] === "") {
                newErrors[elem] = "Заполните поле";
            }
        });
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return true;
        } else {
            setErrors({});
            return false;
        }
    };

    const handleGetReport = ()=> {
        if (!handleErrors()){
            const queryString = Object.keys(data).map(key => key + '=' + encodeURIComponent(data[key])).join('&');

            const getFile = async ()=>{
                const response = await fetch(`${MAIN_URL + PORT_FOR_REPORT+urlForReport}?${queryString}`)
                if(response.ok){
                    debugger
                    const formData = await response.formData();
                    debugger
                    const filePdf = formData.get('pdf');
                    const fileExcel = formData.get('excel');
                    setPDFFile(filePdf)
                    setExcelFile(fileExcel)
                }else {console.error('Ошибка загрузки файла:');}
            }
            getFile()
        }
        else {
            setSaveKey(true);
        }
    }

    const compareDate = (event)=>{

        if(event.target.id==="date1"&&!event.target.value){
            setOptionsForField(true,"date2")
            data.date1=""
            data.date2=""
            setOptions(Object.values(getOptionsForField()))
            return false
        }
        if(event.target.id==="date2"&&!event.target.value){
            data.date2=""
            date2Ref.current.value = "";
            setOptionsForField(false,"date2")
            setOptions(Object.values(getOptionsForField()))
            return false
        }
        if(event.target.id==="date1" && !data.date2){
            setOptionsForField(false,"date2")
            setOptions(Object.values(getOptionsForField()))
            return true
        }
        if(event.target.id==="date1" && data.date2){
            let date2 = new Date(data.date2)
            if(event.target.valueAsNumber<date2){
                setDataRangeError("")
                return true
            }else{
                date1Ref.current.value="";
                setDataRangeError(
                    'Дата, установленная в "Период отчета c" не может быть больше даты, установленной в "Период отчета по".',
                );
                return false
            }
        }
        if(event.target.id==="date2" && data.date1){
            let date1 = new Date(data.date1)
            if(event.target.valueAsNumber>date1){
                setDataRangeError("")
                return true
            }
            else{
                date2Ref.current.value="";
                setDataRangeError(
                    'Дата, установленная в "Период отчета по" не может быть меньше даты, установленной в "Период отчета с".',
                );
                return false
            }
        }
    }
    const handleChangeData = (e)=>{
        if(e){
            switch (true) {
                case Object.keys(e).includes("target"):{
                    if(compareDate(e)){
                        data[`${e.target.id}`] = e.target.value
                        const newData = {...data}
                        setData(newData)
                    }else{
                        if(e.target.id==="date2" && !data.date2){
                            data[`${e.target.id}`]=""
                            date2Ref.current.value="";
                        }
                        setData(data)
                    }
                    break
                }
                case Object.keys(e).includes("key"):{
                    debugger
                    data[`${e.key}`]= e.value
                    const newData = {...data}
                    if(e.key==="section"){
                        setOptionsForField(true,"oblast")
                    }
                    if(e.key==="oblast"){
                        setOptionsForField(true,"section")
                    }
                    setData(newData)
                    break
                }
                default:break;

            }
            if (saveKey) handleErrors();
        }

    }

    const handleClearData = () => {
        debugger
         date1Ref.current.value = "";
         date2Ref.current.value = "";
         sectionRef.current.clearValue();
         oblastRef.current.clearValue();
        setOptionsForField(true,"date2")
        setOptionsForField(false,"oblast")
        setOptionsForField(false,"section")
        setOptions(Object.values(getOptionsForField()))
        setPDFFile("")
        setExcelFile("")
        setErrors({});
        setDataRangeError("");
        setSaveKey(false);
        setData({})

    }
    console.log(data)

    useEffect(()=>{
        setOptionsForField(optionsSection,"optionsForSection")
        handleClearData()
        setOptions(Object.values(getOptionsForField()))

    },[])
    return (
        <>
            <Form className={styles.form_inputs}>
                {!!dataRangeError && <div className={styles.range_block}>{dataRangeError}</div>}
                <div className={`d-flex`}>
                    {options.map((field)=>{
                        if(field.type==="date")
                            return (
                                <Form.Group className={styles.input_element}>
                                    <Form.Label className={styles.label_text}>
                                        {field.label}
                                        {field.required && <span className={styles.red_dot}>*</span>}
                                    </Form.Label>
                                    <Form.Control
                                        id={field.key}
                                        ref={setRef(field)}
                                        disabled={field.disabled}
                                        value={data[`${field.key}`]}
                                        onChange={(e)=>{handleChangeData(e)}}
                                        type={field.type}
                                        className={`mb-2`}
                                        isInvalid={!!errors[`${field.key}`]}
                                    />
                                    <Form.Control.Feedback
                                        className={styles.feedback}
                                        type={"invalid"}>
                                        {errors[`${field.key}`]}
                                    </Form.Control.Feedback>
                                </Form.Group>

                            )
                        if (field.type==="selectSearch")
                            return (
                                <Form.Group className={styles.input_element}>
                                    <Form.Label className={styles.label_text}>
                                        {field.label}
                                    </Form.Label>
                                    <Select
                                        ref={setRef(field)}
                                        onChange ={(e)=>{handleChangeData(e)}}
                                        isSearchable = {field.search}
                                        isDisabled = {field.disabled}
                                        placeholder="Выберите"
                                        options={field.options}
                                    />
                                    <Form.Control.Feedback type={"invalid"}>{errors[`${field.key}`]}</Form.Control.Feedback>
                                </Form.Group>
                            )
                    })}
                </div>
                <div className={styles.buttons_block}>
                    <Button
                        onClick={(e) => handleGetReport(e)}
                        className={styles.button_element}
                        variant="primary">
                        Создать
                    </Button>
                    <Button
                        onClick={() => handleClearData()}
                        className={styles.button_element}
                        variant="outline-primary">
                        Очистить
                    </Button>
                </div>
            </Form>
        </>
    );
}

export default SearchBlock;