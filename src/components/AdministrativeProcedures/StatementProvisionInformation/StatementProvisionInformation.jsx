import styles from './statementProvisionInformation.module.css'
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import InformationAboutIndividual from "../commonComponents/InformationAboutIndividual/InformationAboutIndividual";
import InformationAboutEntity from "../commonComponents/InformationAboutEntity/InformationAboutEntity"
import InfoRepresentPerson from "../commonComponents/InfoRepresentPerson/InfoRepresentPerson";
import AppFooter from "../commonComponents/AppFooter/AppFooter";


import { useLocation, useNavigate } from "react-router-dom";
import {
  fieldAddressOptions,
  fieldPassportOptions,
} from "../commonComponents/InformationAboutIndividual/optionsForInformationAboutIndividual";
import {fieldLEInformOptions}from"../commonComponents/InformationAboutEntity/optionsInformationAboutEntity"
function StatementProvisionInformation() {
    const location = useLocation();
    const {idTypeStatement}=location.state

    const [file, setFile] = useState();
    const [errors, setErrors] = useState({});
    const [saveKey, setSaveKey] = useState(false);
    const [newData, setNewData] = useState({
       personType: idTypeStatement
    });
    const mainInfo = idTypeStatement===1?fieldPassportOptions:fieldLEInformOptions

    const [errorsFields,setErrorsFields]=useState(Object.entries({...mainInfo,...fieldAddressOptions}).filter(item => item[1].required).map(el=>el[0]))


    const updateNewData = (key, value) => {
        newData[key] = value;
        setNewData({...newData})
    };
    const handleFile = (value) => {
      setFile(value);
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
                //   mode={modeView?modeView:((idTypeChangeStatement==='2'||idTypeChangeStatement==='3')?'view':'')}
              />
          ):(
              <InformationAboutEntity
                  inputData={newData}
                  updateNewData={updateNewData}
                  saveKey={saveKey}
                  handleErrors={handleErrors}
                  errors={errors}
                //   mode={modeView?modeView:((idTypeChangeStatement==='2'||idTypeChangeStatement==='3')?'view':'')}

              />
          )
          }
           <InfoRepresentPerson
              inputData={newData}
              updateNewData={updateNewData}
              // mode={modeView}
              />
              <AppFooter
              inputData={newData}
              updateNewData={updateNewData}
              handleFile={handleFile}
              // mode={modeView}
          />
          </Form>
          </div>
          <div className={styles.buttons_container}>
        {!modeView && (<Button
            variant="primary"
            onClick={(e) => handleSave(e)}
            disabled={newData.boatCardSpecmarksList.find(el=>el.msmLock===true) && idTypeChangeStatement==='2'}
        >
          Зарегистрировать
        </Button>)}
        <Button
            variant="danger"
            onClick={handleCloseApp}>
          Закрыть
        </Button>
      </div>
      {showResultModal && (
          <ResultModalWindow
              // appId={appId}
              // show={showResultModal}
              // setShow={setShowResultModal}
              // result={registrationResult}
              // handleCloseApp={handleCloseApp}
          />
      )}
        </>
    );
}

export default StatementProvisionInformation;