import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ProgressBar } from "react-loader-spinner";
import { Form } from "react-bootstrap";

import {
  getBoatCardInfoForDuplicate,
  getAppInfoDuplicate,
} from "../../../redux/DuplicateShipsTicketReducer/actionsDuplicateShipsTicket";

import InformationAboutIndividual from "../commonComponents/InformationAboutIndividual/InformationAboutIndividual";
import InformationAboutEntity from "../commonComponents/InformationAboutEntity/InformationAboutEntity";
import InfoRepresentPerson from "../commonComponents/InfoRepresentPerson/InfoRepresentPerson";
import InfoAboutBoatDuplicate from "../commonComponents/InfoAboutBoatDuplicate/InfoAboutBoatDuplicate";
import ResultModalWindow from "../commonComponents/ResultModalWindow/ResultModalWindow";
import AppFooter from "../commonComponents/AppFooter/AppFooter";

import { MAIN_URL, PORT, API_ADD_NEW_APP_DUPL } from "../../../constants/constants";

import styles from "./DuplShipsTicket.module.css";

export default function DuplShipsTicket() {
  const [isLoading, setIsLoading] = useState(true);
  const [showResultModal, setShowResultModal] = useState(false);
  const [registrationResult, setRegistrationResult] = useState("");
  const [appId, setAppId] = useState(null);
  const [newApp, setNewApp] = useState({
    appDate: new Date().toLocaleDateString().split(".").reverse().join("-"),
    inspector: 1,
    appSheetCnt: 2,
  });
  const [file, setFile] = useState(null);
  const location = useLocation();
  const { mode } = location.state;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newAppDupl = useSelector((state) => {
    const { DuplicateShipsTicketReducer } = state;
    return DuplicateShipsTicketReducer.newAppDupl;
  });

  const personType = useSelector((state) => {
    const { DuplicateShipsTicketReducer } = state;
    return DuplicateShipsTicketReducer.personType;
  });

  const handleValue = (e) => {
    newApp[e.target.id] = e.target.value;
  };
  const handleFile = (value) => {
    setFile(value);
  };
  const updateNewData = (key, value) => {
    newApp[key] = value;
  };

  const handleCloseApp = () => {
    setNewApp({
      appDate: new Date().toLocaleDateString().split(".").reverse().join("-"),
      inspector: 1,
      appSheetCnt: 2,
    });
    navigate(-1);
  };

  const handleButtonClick = async (e) => {
    switch (e.target.id) {
      case "add":
        const pathArray = window.location.pathname.split("/");
        const id = pathArray[pathArray.length - 1];
        const formData = new FormData();
        formData.append("data", JSON.stringify(newApp));
        if (file !== undefined) {
          formData.append(`file`, file);
        }
        const request = await fetch(MAIN_URL + PORT + API_ADD_NEW_APP_DUPL + id, {
          method: "POST",
          body: formData,
        });
        if (request.status !== 200) {
          setShowResultModal(!showResultModal);
          setRegistrationResult("error");
          console.log("error");
        } else {
          const response = await request.text();
          setAppId(response);
          setShowResultModal(!showResultModal);
          setRegistrationResult("success");
        }
        break;
      case "close":
        handleCloseApp();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const pathArray = window.location.pathname.split("/");
    const id = pathArray[pathArray.length - 1];

    if (mode === "add") {
      dispatch(getBoatCardInfoForDuplicate(id));
    } else {
      dispatch(getAppInfoDuplicate(id));
    }

    setIsLoading(false);
  }, []);
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
            <p className={styles.secondary_text}>о выдаче дубликата судового билета</p>
          </div>
          {Object.values(newAppDupl).length > 0 && (
            <div className={styles.header_container}>
              <div className={styles.header_content}>
                <p>Регистрационный номер маломерного судна</p>
                <p>Номер судового билета</p>
                <p>Дата выдачи судового билета</p>
                <p>
                  Причина запроса дубликата судового билета
                  {mode === "add" ? <span className={styles.red_dot}>*</span> : null}
                </p>
              </div>
              <div className={styles.header_content}>
                <p>{newAppDupl.regNum || "—"}</p>
                <p>{newAppDupl.tiketNum}</p>
                <p>{newAppDupl.operDate.split("-").reverse().join(".")}</p>
                <Form.Control
                  type={"text"}
                  readOnly={mode === "add" ? false : true}
                  disabled={mode === "add" ? false : true}
                  id="appReason"
                  value={mode === "add" ? newApp.appReason : newAppDupl.appReason}
                  onChange={(e) => handleValue(e)}
                />
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
          <AppFooter
            mode={mode}
            inputData={mode === "add" ? newApp : null}
            handleFile={handleFile}
            updateNewData={updateNewData}
          />
          <div className={styles.buttons_container}>
            {mode === "add" && (
              <div
                className={styles.add_button}
                id={"add"}
                onClick={(e) => handleButtonClick(e)}>
                Зарегистрировать
              </div>
            )}
            <div
              className={styles.close_button}
              id={"close"}
              onClick={(e) => handleButtonClick(e)}>
              Закрыть
            </div>
          </div>
          {showResultModal && (
            <ResultModalWindow
              appId={appId}
              show={showResultModal}
              setShow={setShowResultModal}
              result={registrationResult}
              handleCloseApp={handleCloseApp}
            />
          )}
        </>
      )}
    </>
  );
}
