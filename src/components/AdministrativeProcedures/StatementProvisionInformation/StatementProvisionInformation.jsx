import styles from './statementProvisionInformation.module.css'
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import InformationAboutIndividual from "../commonComponents/InformationAboutIndividual/InformationAboutIndividual";
import InformationAboutEntity from "../commonComponents/InformationAboutEntity/InformationAboutEntity"
import InfoRepresentPerson from "../commonComponents/InfoRepresentPerson/InfoRepresentPerson";
import AppFooter from "../commonComponents/AppFooter/AppFooter";
import ResultModalWindow from "../commonComponents/ResultModalWindow/ResultModalWindow";


import { useLocation, useNavigate } from "react-router-dom";
import {
  fieldAddressOptions,
  fieldPassportOptions,
} from "../commonComponents/InformationAboutIndividual/optionsForInformationAboutIndividual";
import {fieldLEInformOptions}from"../commonComponents/InformationAboutEntity/optionsInformationAboutEntity"
import {
    API_ADD_STATEMENT_PROVISION_INFORMATION,
    API_GET_STATEMENT_PROVISION_INFORMATION,
    MAIN_URL,
    PORT
} from "../../../constants/constants";
import {clearNewStatement} from "../../../redux/statementReducer/actionsStatement";
import {useDispatch} from "react-redux";
import {ProgressBar} from "react-loader-spinner";
function StatementProvisionInformation() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {idTypeStatement,modeView,idStatement}=location.state

    const [file, setFile] = useState();
    const [errors, setErrors] = useState({});
    const [showResultModal, setShowResultModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [registrationResult, setRegistrationResult] = useState("");
    const [appId, setAppId] = useState(null);
    const [saveKey, setSaveKey] = useState(false);
    const [newData, setNewData] = useState({
       personType: idTypeStatement
    });
    const mainInfo = idTypeStatement===1?fieldPassportOptions:fieldLEInformOptions

    const [errorsFields,setErrorsFields]=useState(Object.entries({...mainInfo,...fieldAddressOptions}).filter(item => item[1].required).map(el=>el[0]))


    const updateNewData = (key, value) => {
        console.log(key,value)
        newData[key] = value;
        setNewData({...newData})
    };
    const handleFile = (value) => {
      setFile(value);
    };
    const handleCloseApp = () => {
        dispatch(clearNewStatement());
        navigate(-1);
    };
    const handleErrors = () => {
      let newErrors = {};
      errorsFields.forEach((elem) => {
        console.log(newData[elem])
        if (!newData[elem] || newData[elem] === "") {
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
    const handleSave = async (e) => {
        if (!handleErrors()) {

            const formData = new FormData();
            if (file !== undefined) {
                formData.append(`file`, file);
            }
            formData.append('data',JSON.stringify(newData))
            const request = await fetch(MAIN_URL + PORT + API_ADD_STATEMENT_PROVISION_INFORMATION, {
                method: "POST",
                body: formData,
            });
            if (request.status !== 200) {
                setShowResultModal(!showResultModal);
                setRegistrationResult("error");
            } else {
                const response = await request.text();
                setAppId(response);
                setShowResultModal(!showResultModal);
                setRegistrationResult("success");
            }
        }else {
            setSaveKey(true);
        }
    }

    useEffect(()=>{
        async function fetchData() {
            if(window.location.pathname.includes('/provisioninformation/statement')){
                const responseStatement = await fetch(MAIN_URL+PORT+API_GET_STATEMENT_PROVISION_INFORMATION+String(idStatement))
                const dataStatement =await responseStatement.json()
                setNewData(dataStatement)
            }
            setIsLoading(false);
        }
        fetchData()
    },[])

    if(isLoading){
        return (
            <div className={'d-flex flex-column align-items-center'}>
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
        )
    }
    return (
        <>
        <div className={styles.caption}>
            <h2 className={styles.main_text}>Заявление</h2>
            <p className={styles.secondary_text}>о предоставлении информации о судне</p>
        </div>
        <div className={styles["form-container"]}>
        <Form>
        <Form.Group className={styles["header"]}>
            <Form.Label>Субъект хозяйствования:</Form.Label>
            <Form.Control
              value={newData.personType===1?"Физическое лицо":"Юридическое лицо"}
              type="text"
              readOnly={true}
              disabled={true}
            />
          </Form.Group>
          {idTypeStatement===1?(
              <InformationAboutIndividual
                  inputData={newData}
                  updateNewData={updateNewData}
                  saveKey={saveKey}
                  handleErrors={handleErrors}
                  errors={errors}
                 mode={modeView}
              />
          ):(
              <InformationAboutEntity
                  inputData={newData}
                  updateNewData={updateNewData}
                  saveKey={saveKey}
                  handleErrors={handleErrors}
                  errors={errors}
                  mode={modeView}

              />
          )
          }
           <InfoRepresentPerson
              inputData={newData}
              updateNewData={updateNewData}
              mode={modeView}
              />
              <AppFooter
              inputData={newData}
              updateNewData={updateNewData}
              handleFile={handleFile}
              mode={modeView}
          />
          </Form>
          </div>
          <div className={styles.buttons_container}>
        <Button
            variant="primary"
            onClick={(e) => handleSave(e)}
        >
          Зарегистрировать
        </Button>
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
    );
}

export default StatementProvisionInformation;