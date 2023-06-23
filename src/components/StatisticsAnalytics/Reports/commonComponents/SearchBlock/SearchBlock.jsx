import React from 'react';
import { useState, useRef, useEffect } from "react";
import styles from "./SearchBlock.module.css";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import {useSelector} from "react-redux";
import Button from "react-bootstrap/Button";
import { MAIN_URL, PORT_FOR_REPORT} from "../../../../../constants/constants";


function SearchBlock({fields,setOptionsForField,urlForReport,setExcelFile,setPDFFile,getOptionsForField,setLoader}) {
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
    const quarterRef =useRef();
    const yearRef = useRef();
    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: '1px solid #dc3545',
        }),
    };

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
            case "year":
                return yearRef
            case "quarter":
                return quarterRef
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
    console.log(errors,errorsFields)
    const handleGetReport = ()=> {
        if (!handleErrors()&& compareDate()){
            const queryString = Object.keys(data).map(key => key + '=' + encodeURIComponent(data[key])).join('&');
            setLoader(true)
            const getFile = async ()=>{
                const response = await fetch(`${MAIN_URL + PORT_FOR_REPORT+urlForReport}?${queryString}`)
                if(response.ok){
                    setLoader(false)
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

    const compareDate = ()=>{

        switch (true) {
            case (new Date(data.date1)>new Date(data.date2)):
                setDataRangeError(
                    'Дата, установленная в "Период отчета c" не может быть больше даты, установленной в "Период отчета по".',
                );
                return false
            default:setDataRangeError("")
                return true
        }
    }
    const handleChangeData = (e)=>{
        if(e){
            switch (true) {
                case Object.keys(e).includes("target"):{
                    data[`${e.target.id}`]=e.target.value
                    const newData = {...data}
                    setData(newData)
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
                    if(e.key==="periodGraph"){
                        setOptionsForField(true,"periodGraph")
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
        if(window.location.href.includes("reports/graphs")){

            return
        }
        if(!window.location.href.includes("reports/quarterlyreport")){
            date1Ref.current.value = "";
            date2Ref.current.value = "";
        }else {
            yearRef.current.value = "";
            quarterRef.current.clearValue();
        }

         sectionRef.current.clearValue();
         oblastRef.current.clearValue();
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
        if(!window.location.href.includes("reports/graphs")){
            setOptionsForField(optionsSection,"optionsForSection")
        }
        handleClearData()
        setOptions(Object.values(getOptionsForField()))

    },[])
    return (
        <>
            <Form className={styles.form_inputs}>
                {!!dataRangeError && <div className={styles.range_block}>{dataRangeError}</div>}
                <div className={`d-flex`}>
                    {options.map((field)=>{
                        if(field.type==="number")
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
                                        min={1900} // Минимальное значение года
                                        max={2200} // Максимальное значение года
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
                                        {field.required && <span className={styles.red_dot}>*</span>}

                                    </Form.Label>
                                    <Select
                                        ref={setRef(field)}
                                        isMulti = {field.multi}
                                        onChange ={(e)=>{handleChangeData(e)}}
                                        isSearchable = {field.search}
                                        isDisabled = {field.disabled}
                                        placeholder="Выберите"
                                        options={field.options}
                                        className={styles.max_width_select}
                                        styles={!!errors[field.key]?customStyles:""}
                                    />
                                    {!!errors[field.key] && (<Form.Label className={styles.error}>{errors[field.key]}</Form.Label>)}
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