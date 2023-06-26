import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { ProgressBar } from "react-loader-spinner";

import TableAppBoatReg from "../../AdministrativeProcedures/commonComponents/TablesAppBoatReg/TableAppBoatReg";

import {
  causersListOptions,
  victimsListOptions,
  TransportAccidentFormSettingsFooter,
  setOptionsForInputsATE,
  setOptionsForInputsUsers,
  setOptionsForBoat,
} from "./TransportAccidentFormSettings";

import {
  setOptionsTypesBoat,
  setOptionsVidBoat,
  setOptionsBodyBoat,
  setReadOptionForInputs,
  setOptionsSaCategory,
} from "../../AdministrativeProcedures/commonComponents/utilities";

import {
  addNewAccidentData,
  findBoatInfoByRegNum,
  clearAccidentData,
  getAccidentInfoById,
  saveTransportAccident,
} from "../../../redux/TransportAccidentsReportReducer/actionsTransportAccidentsReport";

import { getDataTransportAccidentBySearchParams } from "../../../redux/actions";

import styles from "./TransportAccidentForm.module.css";

export default function TransportAccidentForm() {
  const location = useLocation();
  const { mode } = location.state;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [transportAccidentFormSettings, setTransportAccidentFormSettings] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const dataOptionsForSelectATE = useSelector((state) => {
    const { dictionaryReducer } = state;
    return dictionaryReducer.ateLibrary;
  });

  const dataOptionsForSelectATEValidated = [];
  dataOptionsForSelectATE.forEach((item) => {
    dataOptionsForSelectATEValidated.push({
      value: item.sctId,
      label: item.sctName,
      key: "sectionId",
    });
  });

  const usersLib = useSelector((state) => {
    const { dictionaryReducer } = state;
    return dictionaryReducer.usersLibrary;
  });

  const newAccidentData = useSelector((state) => {
    const { TransportAccidentsReportReducer } = state;
    return TransportAccidentsReportReducer.newAccidentData;
  });
  const causersList = useSelector((state) => {
    const { TransportAccidentsReportReducer } = state;
    return TransportAccidentsReportReducer.causersList;
  });
  const victimsList = useSelector((state) => {
    const { TransportAccidentsReportReducer } = state;
    return TransportAccidentsReportReducer.victimsList;
  });

  const personType = useSelector((state) => {
    const { TransportAccidentsReportReducer } = state;
    return TransportAccidentsReportReducer.personType;
  });

  const searchParamsTransportAccidents = useSelector((state) => {
    const { TransportAccidentsReportReducer } = state;
    return TransportAccidentsReportReducer.searchParams;
  });

  const handleValue = (e) => {
    if (e) {
      switch (true) {
        case Object.keys(e).includes("target"):
          // updateNewData(e.target.id, e.currentTarget.value);
          dispatch(addNewAccidentData({ [`${e.target.id}`]: e.target.value }));
          break;
        case Object.keys(e).includes("key"):
          // updateNewData(e.key, e.value);
          dispatch(addNewAccidentData({ [`${e.key}`]: e.value }));
          break;
        default:
          break;
      }
      // if (saveKey) handleErrors();
    }
  };

  const handleButtonClick = (e) => {
    if (e) {
      switch (e.target.id) {
        case "search":
          if (newAccidentData.boatRegNum !== "") {
            dispatch(findBoatInfoByRegNum(newAccidentData.boatRegNum));
          }
          break;
        case "save":
          if (mode === "add") {
            dispatch(saveTransportAccident(newAccidentData, causersList, victimsList));
          } else if (mode === "edit") {
            const pathArray = window.location.pathname.split("/");
            const id = pathArray[pathArray.length - 1];
            dispatch(saveTransportAccident(newAccidentData, causersList, victimsList, id));
          }
          dispatch(clearAccidentData());
          navigate("/transportaccidents");
          dispatch(getDataTransportAccidentBySearchParams(searchParamsTransportAccidents));
          break;
        case "form":
          const formKey = "form";
          if (mode === "add") {
            dispatch(saveTransportAccident(newAccidentData, causersList, victimsList, formKey));
          } else if (mode === "edit") {
            const pathArray = window.location.pathname.split("/");
            const id = pathArray[pathArray.length - 1];
            dispatch(saveTransportAccident(newAccidentData, causersList, victimsList, id, formKey));
          }
          dispatch(clearAccidentData());
          navigate("/transportaccidents");
          dispatch(getDataTransportAccidentBySearchParams(searchParamsTransportAccidents));
          break;
        case "close":
          dispatch(clearAccidentData());
          navigate("/transportaccidents");
          dispatch(getDataTransportAccidentBySearchParams(searchParamsTransportAccidents));
        default:
          break;
      }
    }
  };

  useEffect(() => {
    (async () => {
      const typesBoat = await setOptionsTypesBoat();
      const kindsBoat = await setOptionsVidBoat();
      setTransportAccidentFormSettings(setOptionsForBoat(typesBoat, kindsBoat, window.location.pathname));
      if (mode === "view" || mode === "edit") {
        const pathArray = window.location.pathname.split("/");
        const id = pathArray[pathArray.length - 1];
        dispatch(getAccidentInfoById(id));
      } else {
        setTransportAccidentFormSettings(
          setOptionsForInputsATE(dataOptionsForSelectATEValidated, window.location.pathname),
        );
        setTransportAccidentFormSettings(setOptionsForInputsUsers(usersLib, window.location.pathname));
        setIsLoading(false);
      }
    })();
  }, []);
  useEffect(() => {
    if (mode === "view" || mode === "edit") {
      setTransportAccidentFormSettings(setOptionsForInputsATE(dataOptionsForSelectATEValidated, personType));
      setTransportAccidentFormSettings(setOptionsForInputsUsers(usersLib, personType));
    }
    if (personType !== "") {
      setIsLoading(false);
    }
  }, [personType]);
  return (
    <>
      {isLoading ? (
        <div className={`d-flex flex-column align-items-center `}>
          <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="#F4442E"
            barColor="#51E5FF"
          />
        </div>
      ) : (
        <>
          <h2>Добавить РК аварийного случая</h2>
          <div
            className={
              window.location.pathname.includes("individual") || personType === "individual"
                ? styles.grid_container_individual
                : styles.grid_container_entity
            }>
            {Object.values(transportAccidentFormSettings).map((item) => {
              switch (item.type) {
                case "select":
                  return (
                    <Form.Group
                      className={`${styles[`box-${item.key}`]} ${
                        styles[`form_group_flex_${item.flexDirection}`]
                      }`}>
                      <Form.Label className={styles.form_label}>{item.value}</Form.Label>
                      <Select
                        // ref={setRef(item)}
                        className={styles.input_element}
                        onChange={(e) => handleValue(e)}
                        classNamePrefix="select"
                        placeholder="Выберите"
                        id={item.key}
                        value={item.options.find((item) => {
                          return item.value === newAccidentData[item.key];
                        })}
                        isDisabled={item.disabled || mode === "view" ? true : false}
                        isSearchable={item.isSearchable}
                        name={item.key}
                        options={item.options}
                        defaultValue={item.defaultValue}
                      />
                    </Form.Group>
                  );
                default:
                  if (item.key === "boatRegNum") {
                    return (
                      <Form.Group
                        className={`${styles[`box-${item.key}`]} ${styles.form_group_flex_reg_num}`}>
                        <div className={`${styles[`box-${item.key}`]} ${styles.form_group_flex}`}>
                          <Form.Label className={`${styles.form_label}`}>{item.value}</Form.Label>
                          <Form.Control
                            id={item.key}
                            defaultValue={item.defaultValue}
                            readOnly={item.readOnly || mode === "view"}
                            disabled={mode === "view" ? true : false}
                            type={item.type}
                            value={newAccidentData[item.key]}
                            onChange={(e) => handleValue(e)}
                          />
                        </div>
                        {mode !== "view" && (
                          <div
                            className={styles.search_button}
                            id={"search"}
                            onClick={(e) => handleButtonClick(e)}>
                            Найти
                          </div>
                        )}
                      </Form.Group>
                    );
                  } else {
                    return (
                      <Form.Group className={`${styles[`box-${item.key}`]} ${styles.form_group_flex}`}>
                        <Form.Label className={`${styles.form_label}`}>{item.value}</Form.Label>
                        <Form.Control
                          id={item.key}
                          defaultValue={item.defaultValue}
                          readOnly={item.readOnly || mode === "view"}
                          disabled={mode === "view" ? true : false}
                          type={item.type}
                          value={newAccidentData[item.key]}
                          onChange={(e) => handleValue(e)}
                        />
                      </Form.Group>
                    );
                  }
              }
            })}
          </div>
          <TableAppBoatReg
            typeTable={"causersList"}
            tableOptions={causersListOptions}
            mode={mode}
          />
          <TableAppBoatReg
            typeTable={"victimsList"}
            tableOptions={victimsListOptions}
            mode={mode}
          />
          <div className={styles.grid_container_footer}>
            {Object.values(TransportAccidentFormSettingsFooter).map((item) => {
              switch (item.type) {
                case "select":
                  return (
                    <Form.Group
                      className={`${styles[`box-${item.key}`]} ${
                        styles[`form_group_flex_${item.flexDirection}`]
                      }`}>
                      <Form.Label className={styles.form_label}>{item.value}</Form.Label>
                      <Select
                        // ref={setRef(item)}
                        className={styles.input_element}
                        onChange={(e) => handleValue(e)}
                        classNamePrefix="select"
                        placeholder="Выберите"
                        id={item.key}
                        value={item.options.find((item) => item.value === newAccidentData[item.key])}
                        isDisabled={item.disabled || mode === "view" ? true : false}
                        isSearchable={item.isSearchable}
                        name={item.key}
                        options={item.options}
                        defaultValue={item.defaultValue}
                      />
                    </Form.Group>
                  );
                default:
                  return (
                    <Form.Group className={`${styles[`box-${item.key}`]} ${styles.form_group_flex}`}>
                      <Form.Label className={`${styles.form_label}`}>{item.value}</Form.Label>
                      <Form.Control
                        id={item.key}
                        defaultValue={item.defaultValue}
                        readOnly={item.readOnly || mode === "view"}
                        disabled={mode === "view" ? true : false}
                        type={item.type}
                        value={newAccidentData[item.key]}
                        onChange={(e) => handleValue(e)}
                      />
                    </Form.Group>
                  );
              }
            })}
          </div>
          <div className={styles.buttons_container}>
            {mode !== "view" && (
              <>
                <div
                  className={styles.add_button}
                  id={"save"}
                  onClick={(e) => handleButtonClick(e)}>
                  Сохранить
                </div>
                <div
                  className={styles.save_button}
                  id={"form"}
                  onClick={(e) => handleButtonClick(e)}>
                  Сформировать дело
                </div>
              </>
            )}
            <div
              className={styles.close_button}
              id={"close"}
              onClick={(e) => handleButtonClick(e)}>
              Закрыть
            </div>
          </div>
        </>
      )}
    </>
  );
}
