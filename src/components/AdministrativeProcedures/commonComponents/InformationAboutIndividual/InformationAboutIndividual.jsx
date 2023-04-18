import React , { useState,useRef }from 'react';
import {Form} from 'react-bootstrap';
import styles from './InformationAboutIndividual.module.css'
import {fieldPassportOptions,fieldAddressOptions,setOptions} from './optionsForInformationAboutIndividual'
import Select from 'react-select';

function InformationAboutIndividual(props) {
    const selectGorodRef = useRef()
    const selectRayonRef = useRef()
    const [options,setoptions]=useState({passport:fieldPassportOptions,address:fieldAddressOptions})

    async function handleChangeSelectSearch(event) {
        setoptions({passport:fieldPassportOptions,address: await setOptions(event.value,event.key)})

        switch (event.key) {
            case "rayon":  {
                selectGorodRef.current.clearValue()
                break;
            }
            case "obl":{
                selectRayonRef.current.clearValue()
                selectGorodRef.current.clearValue()
                break;
            }
            default:;
        }
    }
    function setRef(option) {
        switch (option.key) {
            case "gorod_id":return selectGorodRef
            case "rayonId": return selectRayonRef
            default : return null
        }

    }

    return (
        <>
            <h3>Сведения о заинтересованном лице</h3>
            <div className={styles['container-information']} >
                <div className={styles['passport-information']}>
                    {Object.values(options.passport).map(option=>{
                        if(option.type==='text'||option.type==='date'){
                            return(
                                <Form.Group controlId={`${option.key}`} className={`${styles['common']} ${styles[`box-${option.key}`]}`}>
                                    <Form.Label>{option.value}</Form.Label>
                                    <Form.Control type={option.type}
                                                  defaultValue={option.defaultValue}
                                                  readOnly={option.readOnly}
                                    />
                                </Form.Group>
                            )
                        }else if(option.type==='selectSearch'){
                            return(
                                <Form.Group  className={`${styles['common']} box-${option.key}`}>
                                    <Form.Label>{option.value}</Form.Label>
                                    <Select
                                        defaultValue={option.defaultValue}
                                        className={`${styles['selectSearch']}`}
                                        classNamePrefix="select"
                                        placeholder ="Выберите"
                                        id={option.key}
                                        isSearchable={false}
                                        name={option.key}
                                        options={option.options}
                                    />
                                </Form.Group>
                            )
                        }
                    })}
                </div>
                <div className={styles['address-information']}>
                {Object.values(options.address).map(option=>{
                        if(option.type==='text'){
                            return(
                                <Form.Group controlId={`${option.key}`} className={`${styles['common']} ${styles[`box-${option.key}`]}`}>
                                    <Form.Label>{option.value}</Form.Label>
                                    <Form.Control type={option.type}
                                                  defaultValue={option.defaultValue}
                                                  readOnly={option.readOnly}/>
                                </Form.Group>
                            )
                        }else if(option.type==='selectSearch'){
                            return(
                               <div className={`d-flex ${styles['common']}`}>
                                <Form.Label>{option.value}</Form.Label>
                                <Select
                                    ref={setRef(option)}
                                    className={`${styles['selectSearch']}`}
                                    isDisabled={option.disabled}
                                    onChange={(e)=>handleChangeSelectSearch(e)}
                                    classNamePrefix="select"
                                    id={option.key}
                                    defaultValue={option.defaultValue}
                                    placeholder ="Выберите"
                                    isSearchable={true}
                                    name={option.key}
                                    options={option.options}
                                />
                               </div>
                            )
                        }else if(option.type==='select'){
                            return(
                                <Form.Group  className={`${styles['common']} box-${option.key}`}>
                                    <Form.Label>{option.value}</Form.Label>
                                    <Form.Select>
                                        {option.options.map((el) => (
                                            <option value={el.id}>{el.value}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            )
                        }
                    })}
                </div>
            </div>
        </>
    );
}

export default InformationAboutIndividual;