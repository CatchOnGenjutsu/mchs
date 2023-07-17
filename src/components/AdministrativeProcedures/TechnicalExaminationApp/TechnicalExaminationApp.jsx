import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import InformationAboutIndividual from "../commonComponents/InformationAboutIndividual/InformationAboutIndividual";
import InformationAboutEntity from "../commonComponents/InformationAboutEntity/InformationAboutEntity";
import InfoRepresentPerson from "../commonComponents/InfoRepresentPerson/InfoRepresentPerson";
import InfoAboutBoatDuplicate from "../commonComponents/InfoAboutBoatDuplicate/InfoAboutBoatDuplicate";
import AppFooter from "../commonComponents/AppFooter/AppFooter";
import TableAppBoatReg from "../commonComponents/TablesAppBoatReg/TableAppBoatReg";
import { ProgressBar } from "react-loader-spinner";

import { getBoatCardInfoForTechExam } from "../../../redux/TechnicalExaminationReducer/actionsTechnicalExamination";

import { boatTo, setOptionsForInputsUsers } from "./TableOptions";

import styles from "./TechnicalExaminationApp.module.css";

export default function TechnicalExaminationApp() {
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [newApp, setNewApp] = useState({
    appDate: new Date().toLocaleDateString().split(".").reverse().join("-"),
    inspector: 1,
    appSheetCnt: 2,
  });

  const dispatch = useDispatch();
  const location = useLocation();
  const { mode } = location.state;

  const newAppTechExam = useSelector((state) => {
    const { TechnicalExaminationReducer } = state;
    return TechnicalExaminationReducer.newAppTechExam;
  });
  const personType = useSelector((state) => {
    const { TechnicalExaminationReducer } = state;
    return TechnicalExaminationReducer.personType;
  });

  const updateNewData = (key, value) => {
    newApp[key] = value;
  };
  const handleFile = (value) => {
    setFile(value);
  };

  useEffect(() => {
    const pathArray = window.location.pathname.split("/");
    const id = pathArray[pathArray.length - 1];
    if (mode === "add") {
      dispatch(getBoatCardInfoForTechExam(id));
    }
    setIsLoading(false);
  }, []);

  const usersLib = useSelector((state) => {
    const { dictionaryReducer } = state;
    return dictionaryReducer.usersLibrary;
  });

  const usersLibValid = [];

  usersLib.forEach((item) => {
    usersLibValid.push({
      value: item.userid,
      label: item.name,
      key: "toUserid",
    });
  });
  setOptionsForInputsUsers(usersLibValid);

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
          <div className={styles.caption}>
            <h2 className={styles.main_text}>Заявление</h2>
            <p className={styles.secondary_text}>
              о техничеком освидетельствовании маломерных судов, за исключением гребных лодок, байдарок и
              надувных судов грузоподъемностью менее 225 килограммов{" "}
            </p>
          </div>
          {Object.values(newAppTechExam).length > 0 && (
            <div className={styles.header_container}>
              <div className={styles.header_content}>
                <p>Регистрационный номер маломерного судна</p>
                <p>Субъект хозяйствования</p>
              </div>
              <div className={styles.header_content}>
                <p>{newAppTechExam.regNum || "—"}</p>
                <p>
                  {(!!newAppTechExam.personType && newAppTechExam.personType === 1
                    ? "Физическое лицо"
                    : "Юридическое лицо") || "—"}
                </p>
              </div>
            </div>
          )}
          {personType === 1 && (
            <InformationAboutIndividual
              // updateNewData={updateNewData}
              // saveKey={saveKey}
              // handleErrors={handleErrors}
              // errors={errors}
              mode={"view"}
            />
          )}
          {personType === 2 && (
            <InformationAboutEntity
              // updateNewData={updateNewData}
              // saveKey={saveKey}
              // handleErrors={handleErrors}
              // errors={errors}
              mode={"view"}
            />
          )}
          <InfoRepresentPerson
            mode={mode}
            updateNewData={updateNewData}
          />
          <InfoAboutBoatDuplicate />
          <TableAppBoatReg
            typeTable={"boatCardAppEngList"}
            tableOptions={boatTo}
            mode={mode}
            // data={boatCardAppEngList}
          />
          <AppFooter
            mode={mode}
            inputData={mode === "add" ? newApp : null}
            handleFile={handleFile}
            updateNewData={updateNewData}
          />
        </>
      )}
    </>
  );
}
