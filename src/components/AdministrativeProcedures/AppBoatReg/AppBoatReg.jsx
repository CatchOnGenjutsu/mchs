import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import InfoRepresentPerson from "../commonComponents/InfoRepresentPerson/InfoRepresentPerson";
import InformationAboutIndividual from "../commonComponents/InformationAboutIndividual/InformationAboutIndividual";
import InformationAboutBoat from "../commonComponents/InformationAboutBoat/InformationAboutBoat";
import OtherInformation from "../commonComponents/OtherInformation/OtherInformation";
import InformationAboutEntity from "../commonComponents/InformationAboutEntity/InformationAboutEntity";
import TableAppBoatReg from "../commonComponents/TablesAppBoatReg/TableAppBoatReg";
import AppFooter from "../commonComponents/AppFooter/AppFooter";
import { ProgressBar } from "react-loader-spinner";

import {
  addNewStatementData,
  addNewStatement,
  clearNewStatement,
  getBoatRegInfo,
} from "../../../redux/statementReducer/actionsStatement";
import { boatCardAppEngDtoList, boatCardAppSmDtoList, boatCardAppDealsDtoList } from "./tableOptions";

import {
  fieldAddressOptions,
  fieldPassportOptions,
} from "../commonComponents/InformationAboutIndividual/optionsForInformationAboutIndividual";
import { fieldBoatOptions } from "../commonComponents/InformationAboutBoat/optionsForInformationAboutBoat";
import {
  fieldLEInformOptions,
  fieldAddressOptions as fieldLEAddressOptions,
} from "../commonComponents/InformationAboutEntity/optionsInformationAboutEntity";

import styles from "./AppBoatReg.module.css";
import { API_ADD_NEW_STATEMENT, MAIN_URL, PORT } from "../../../constants/constants";
import ResultModalWindow from "../commonComponents/ResultModalWindow/ResultModalWindow";
import { getDataBoatsRegBySearchParams } from "../../../redux/actions";

export default function AppBoatReg() {
  const [isLoading, setIsLoading] = useState(true);
  const [showResultModal, setShowResultModal] = useState(false);
  const [registrationResult, setRegistrationResult] = useState("");
  const [appId, setAppId] = useState(null);
  const [type, setType] = useState(null);

  const searchParamsFromStateBoatsReg = useSelector((state) => {
    const { smallBoatsRegReducer } = state;
    return smallBoatsRegReducer.searchParams;
  });

  const location = useLocation();
  const { mode } = location.state;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const type = mode !== "view" && window.location.pathname.includes("individual") ? 1 : 2;

  const boatCardAppEngList = useSelector((state) => {
    const { statementReducer } = state;
    return statementReducer.boatCardAppEngList;
  });
  const boatCardAppSpecMarkList = useSelector((state) => {
    const { statementReducer } = state;
    return statementReducer.boatCardAppSpecMarkList;
  });
  const boatCardAppDealsList = useSelector((state) => {
    const { statementReducer } = state;
    return statementReducer.boatCardAppDealsList;
  });
  const newStatement = useSelector((state) => {
    const { statementReducer } = state;
    return statementReducer.newStatement;
  });
  const personType = useSelector((state) => {
    const { statementReducer } = state;
    return statementReducer.personType;
  });

  const [newData, setNewData] = useState({});
  const [errors, setErrors] = useState({});
  const [saveKey, setSaveKey] = useState(false);
  const [file, setFile] = useState();

  const errorsFields = [];
  if (type === 1) {
    Object.entries(fieldAddressOptions).map((item) => (item[1].required ? errorsFields.push(item[0]) : null));
    Object.entries(fieldPassportOptions).map((item) =>
      item[1].required ? errorsFields.push(item[0]) : null,
    );
  } else {
    Object.entries(fieldLEInformOptions).map((item) =>
      item[1].required ? errorsFields.push(item[0]) : null,
    );
    Object.entries(fieldLEAddressOptions).map((item) =>
      item[1].required ? errorsFields.push(item[0]) : null,
    );
  }
  Object.entries(fieldBoatOptions).map((item) => (item[1].required ? errorsFields.push(item[0]) : null));
  if (window.location.pathname.includes("smallboatsreg") && mode === "add") {
    errorsFields.push("engpwrmaxkwt");
  }

  const handleFile = (value) => {
    setFile(value);
  };

  const handleErrors = () => {
    let newErrors = {};
    errorsFields.forEach((elem) => {
      if (elem !== "saCategory") {
        if (!newData[elem] || newData[elem] === "") {
          newErrors[elem] = "Заполните поле";
        }
      } else {
        if (!newData.hasOwnProperty(elem)) {
          newErrors[elem] = "Заполните поле";
        }
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

  const updateNewData = (key, value) => {
    newData[key] = value;
  };

  const handleSave = async (e) => {
    if (!handleErrors()) {
      const formData = new FormData();
      boatCardAppDealsList.map((item, index) => {
        delete item.innerId;
        Object.entries(item).map((elem) => {
          formData.append(`boatCardAppDealsDtoList[${index}].${elem[0]}`, elem[1]);
        });
        return item;
      });
      boatCardAppEngList.map((item, index) => {
        delete item.innerId;
        Object.entries(item).map((elem) => {
          formData.append(`boatCardAppEngDtoList[${index}].${elem[0]}`, elem[1]);
        });
        return item;
      });
      boatCardAppSpecMarkList.map((item, index) => {
        delete item.innerId;
        Object.entries(item).map((elem) => {
          if (elem[0] === "asmLock") {
            formData.append(`boatCardAppSmDtoList[${index}].${elem[0]}`, Boolean(elem[1]));
          } else {
            formData.append(`boatCardAppSmDtoList[${index}].${elem[0]}`, elem[1]);
          }
        });
        return item;
      });

      Object.entries(newStatement).forEach((item) => {
        formData.append(`${item[0]}`, `${item[1]}`);
      });
      if (file !== undefined) {
        formData.append(`file`, file);
      }
      const request = await fetch(MAIN_URL + PORT + API_ADD_NEW_STATEMENT, {
        method: "POST",
        body: formData,
      });
      if (request.status !== 200) {
        setShowResultModal(!showResultModal);
        setRegistrationResult("error");
      } else {
        const response = await request.text();
        console.log("response", response);
        setAppId(response);
        setShowResultModal(!showResultModal);
        setRegistrationResult("success");
      }
      // dispatch(addNewStatement(formData));
      // navigate(-1);
    } else {
      setSaveKey(true);
    }
  };
  const handleCloseApp = () => {
    dispatch(clearNewStatement());
    navigate("/smallboatsreg");
    dispatch(getDataBoatsRegBySearchParams(searchParamsFromStateBoatsReg));
    // switch (true) {
    //   case window.location.pathname.includes("smallboatsreg"):
    //     navigate("/smallboatsreg");
    //     break;
    //   case window.location.pathname.includes("dupshipsticket"):
    //     navigate("/dupshipsticket");
    //     break;
    //   default:
    //     break;
    // }
  };
  useEffect(() => {
    if (mode === "view") {
      const pathArray = window.location.pathname.split("/");
      const id = pathArray[pathArray.length - 1];
      dispatch(getBoatRegInfo(id));
    } else {
      setType(window.location.pathname.includes("individual") ? 1 : 2);
      dispatch(
        addNewStatementData({ [`personType`]: window.location.pathname.includes("individual") ? 1 : 2 }),
      );
    }

    // ЗАГЛУШКИ
    dispatch(addNewStatementData({ [`inspector`]: 1 }));
    dispatch(addNewStatementData({ [`section`]: 1 }));
    // dispatch(addNewStatementData({ [`tiketNum`]: 10000 }));
    // dispatch(addNewStatementData({ [`personType`]: type }));
    dispatch(
      addNewStatementData({ [`appDate`]: new Date().toLocaleDateString().split(".").reverse().join("-") }),
    );
    dispatch(addNewStatementData({ [`appSheetCnt`]: 2 }));
    // ЗАГЛУШКИ
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
          <h2>Заявление</h2>
          <p className={styles.sub_text}>
            о государственной регистрации и классификации маломерных судов, за исключением гребных лодок,
            байдарок и надувных судов грузоподъемностью менее 225 килограммов
          </p>
          <div className={styles.content}>
            {(type === 1 || personType === 1) && (
              <InformationAboutIndividual
                updateNewData={updateNewData}
                saveKey={saveKey}
                handleErrors={handleErrors}
                errors={errors}
                mode={mode}
              />
            )}
            {(type === 2 || personType === 2) && (
              <InformationAboutEntity
                updateNewData={updateNewData}
                saveKey={saveKey}
                handleErrors={handleErrors}
                errors={errors}
                mode={mode}
              />
            )}
            <InfoRepresentPerson
              mode={mode}
              updateNewData={updateNewData}
            />
            <InformationAboutBoat
              fieldStatus={[]}
              updateNewData={updateNewData}
              saveKey={saveKey}
              handleErrors={handleErrors}
              errors={errors}
              mode={mode}
            />
            <OtherInformation mode={mode} />
            <TableAppBoatReg
              typeTable={"boatCardAppEngList"}
              tableOptions={boatCardAppEngDtoList}
              mode={mode}
              // data={boatCardAppEngList}
            />
            <TableAppBoatReg
              typeTable={"boatCardAppDealsList"}
              tableOptions={boatCardAppDealsDtoList}
              mode={mode}
              // data={boatCardAppEngList}
            />
            <TableAppBoatReg
              typeTable={"boatCardAppSpecMarkList"}
              tableOptions={boatCardAppSmDtoList}
              mode={mode}
              // data={boatCardAppEngList}
            />
            <AppFooter
              mode={mode}
              handleFile={handleFile}
            />
          </div>
          <div className={styles.buttons_container}>
            {mode !== "view" && (
              <Button
                variant="primary"
                className=""
                onClick={(e) => handleSave(e)}>
                Зарегистрировать
              </Button>
            )}
            <Button
              variant="danger"
              onClick={handleCloseApp}>
              Закрыть
            </Button>
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
