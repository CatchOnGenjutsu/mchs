import { useState, useEffect } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { useLocation,useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { ProgressBar } from "react-loader-spinner";
import styles from "./IndividualStatement.module.css";
import InformationAboutIndividual from "../../commonComponents/InformationAboutIndividual/InformationAboutIndividual";
import InformationAboutEntity from "../../commonComponents/InformationAboutEntity/InformationAboutEntity"
import InfoRepresentPerson from "../../commonComponents/InfoRepresentPerson/InfoRepresentPerson";
import TableAppBoatReg from "../../commonComponents/TablesAppBoatReg/TableAppBoatReg";
import InformationAboutBoat from "../../commonComponents/InformationAboutBoat/InformationAboutBoat";
import AppFooter from "../../commonComponents/AppFooter/AppFooter";
import OtherInformation from "../../commonComponents/OtherInformation/OtherInformation";
import { fieldBoatOptions } from "../../commonComponents/InformationAboutBoat/optionsForInformationAboutBoat";
import { addNewStatementData } from "../../../../redux/statementReducer/actionsStatement";
import ResultModalWindow from "../../commonComponents/ResultModalWindow/ResultModalWindow";

import { MAIN_URL, PORT, API_GET_BOAT_CARD_FOR_MODIF ,API_ADD_CHANGE_INFORMATION_CARD,API_GET_STATEMENT_MODIF_INFO} from "../../../../constants/constants";
import { v4 as uuidv4 } from "uuid";
import {
  optionSelectChangeType,
  enginesList,
  boatCardSpecmarksList,
  boatCardModifDealsDtoList,
  readStatusForInputField,
} from "./optionsForIndividualStatement";
import {
  clearNewStatement,
} from "../../../../redux/statementReducer/actionsStatement";
import {
  fieldAddressOptions,
  fieldPassportOptions,
} from "../../commonComponents/InformationAboutIndividual/optionsForInformationAboutIndividual";
import {fieldLEInformOptions}from"../../commonComponents/InformationAboutEntity/optionsInformationAboutEntity"


function IndividualStatement() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idBoadCard,idTypeStatement,modeView,idStatement } = location.state || {};
  const [idTypeChangeStatement, setIdTypeChangeStatement] = useState("1");

  const [isLoading, setIsLoading] = useState(true);
  const [showResultModal, setShowResultModal] = useState(false);
  const [newData, setNewData] = useState({});
  const [errors, setErrors] = useState({});
  const [registrationResult, setRegistrationResult] = useState("");
  const [appId, setAppId] = useState(null);
  const [saveKey, setSaveKey] = useState(false);
  const [file, setFile] = useState();
  const mainInfo = idTypeStatement===1?fieldPassportOptions:fieldLEInformOptions
  const [errorsFields,setErrorsFields]=useState(Object.entries({...mainInfo,...fieldAddressOptions}).filter(item => item[1].required).map(el=>el[0]))


  const reduxData = useSelector((state) => {
    const { statementReducer } = state;
    return statementReducer.newStatement;
  });
  const handleSave = async (e) => {
    if (!handleErrors()) {

      const formData = new FormData();
      if (file !== undefined) {
        formData.append(`file`, file);
      }
      formData.append('data',JSON.stringify(newData))
      const request = await fetch(MAIN_URL + PORT + API_ADD_CHANGE_INFORMATION_CARD+String(idBoadCard), {
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

  const handleErrors = () => {
    let newErrors = {};
    console.log(newData,errorsFields)
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
  const handleFile = (value) => {
    setFile(value);
  };
  const updateNewData = (key, value,updateType) => {
    if(updateType==='delete'){
      const index = newData[key].findIndex(el => el.innerId === value);
      if (index !== -1) {
        newData[key].splice(index, 1);
        setNewData({...newData})
        return
      }
    }
    if(updateType==='removeEngine'){

      const engine = newData[key].find(el => String(el.engid) === value);
      const currentDate = new Date();
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      engine.dateRegEnd=currentDate.toLocaleDateString('ru', options).replace(/\//g, '.').split('.').reverse().join('.');
      setNewData({...newData})
    }
    if (Array.isArray(newData[key])&&updateType!=='delete'){
      value.innerId= uuidv4()
      newData[key].push(value)
      setNewData({...newData})
    }else{
      newData[key] = value;
      setNewData({...newData})
    }

  };
  const handleCloseApp = (e) => {
    console.log(e)
    if(e){
      navigate(-2)
    }else {
      navigate(-1);
    }
    dispatch(clearNewStatement());

  };
  const handleTypeChangeStatement = (e)=>{
    setIdTypeChangeStatement(e.currentTarget.value)
    let initialData = {}
      switch (e.currentTarget.value) {
        case '1':
          initialData={
            changeType: e.currentTarget.value,
            regNum:reduxData.regNum,
            personType:reduxData.personType,
            tiketNum:reduxData.tiketNum,
            ticketDate:reduxData.ticketDate,
            boatCardSpecmarksList:reduxData.boatCardSpecmarksList,
            boatCardModifDealsList:reduxData.boatCardModifDealsList,
            appDate:new Date(),
            agentDocDate:'',
            agentDocDepartment:'',
            agentDocType:null,
            agentDom:'',
            agentDoverennost:'',
            agentGorodId:null,
            agentKorpus:'',
            agentKv:'',
            agentMidname:'',
            agentName:'',
            agentNumberOfPassport:'',
            agentOblId:null,
            agentPersNum:'',
            agentPhone:'',
            agentRayonId:null,
            agentSerialOfPassport:'',
            agentSurname:'',
            agentUlica:'',
            boatVin:'',
            boatYear:'',
            engineNum:'',
            parkingPlace:'',
            boatPayload:'',
            engpwrmax:'',
            boatLength:reduxData.boatLength,
            boatWidth:reduxData.boatWidth,
            boatHeight:reduxData.boatHeight,
            passengersNum:'',
            saCategory:null,
            boatName:'',
            boatType:null,
            boatVid:null,
            bodyMaterial:null,
            surname:'',
            name:'',
            midname:'',
            unp:reduxData.unp,
            docDepartmentLe:reduxData.docDepartmentLe,
            nameLe:reduxData.nameLe,
            egrNum:reduxData.egrNum,
            docType:null,
            serialOfPassport:'',
            numberOfPassport:'',
            persNum:'',
            docDepartment:'',
            docDateIssue:'',
            oblId:null,
            rayonId:null,
            gorodId:null,
            ulica:'',
            korpus:'',
            dom:'',
            kv:'',
            phone:'',
            enginesList:[],
            appReason:'',
            note:'',
            note2:'',
            section:1
          }
          break
        case '2':
        case '3':
          initialData={
            changeType: e.currentTarget.value,
            regNum:reduxData.regNum,
            personType:reduxData.personType,
            tiketNum:reduxData.tiketNum,
            ticketDate:reduxData.ticketDate,
            boatCardModifDealsList:reduxData.boatCardModifDealsList,
            boatCardSpecmarksList:reduxData.boatCardSpecmarksList,
            boatVin:reduxData.boatVin,
            boatYear:reduxData.boatYear,
            engineNum:reduxData.engineNum,
            parkingPlace:reduxData.parkingPlace,
            boatPayload:reduxData.boatPayload,
            engpwrmax:reduxData.engpwrmax,
            boatLength:reduxData.boatLength,
            boatWidth:reduxData.boatWidth,
            boatHeight:reduxData.boatHeight,
            passengersNum:reduxData.passengersNum,
            saCategory:reduxData.saCategory,
            boatName:reduxData.boatName,
            boatType:reduxData.boatType,
            boatVid:reduxData.boatVid,
            bodyMaterial:reduxData.bodyMaterial,
            surname:reduxData.surname,
            name:reduxData.name,
            midname:reduxData.midname,
            unp:reduxData.unp,
            docDepartmentLe:reduxData.docDepartmentLe,
            nameLe:reduxData.nameLe,
            egrNum:reduxData.egrNum,
            docType:reduxData.docType,
            serialOfPassport:reduxData.serialOfPassport,
            numberOfPassport:reduxData.numberOfPassport,
            persNum:reduxData.persNum,
            docDepartment:reduxData.docDepartment,
            docDateIssue:reduxData.docDateIssue,
            oblId:reduxData.oblId,
            rayonId:reduxData.rayonId,
            gorodId:reduxData.gorodId,
            ulica:reduxData.ulica,
            korpus:reduxData.korpus,
            dom:reduxData.dom,
            kv:reduxData.kv,
            phone:reduxData.phone,
            enginesList:reduxData.enginesList,
            appReason:'',
            note:'',
            note2:'',
            agentDocDate:'',
            agentDocDepartment:'',
            agentDocType:null,
            agentDom:'',
            agentDoverennost:'',
            agentGorodId:null,
            agentKorpus:'',
            agentKv:'',
            agentMidname:'',
            agentName:'',
            agentNumberOfPassport:'',
            agentOblId:null,
            agentPersNum:'',
            agentPhone:'',
            agentRayonId:null,
            agentSerialOfPassport:'',
            agentSurname:'',
            agentUlica:'',
            section:1,
            appDate:new Date(),
          }
          break
        case '4':
          initialData={
            changeType: e.currentTarget.value,
            regNum:reduxData.regNum,
            personType:reduxData.personType,
            tiketNum:reduxData.tiketNum,
            ticketDate:reduxData.ticketDate,
            boatCardModifDealsList:reduxData.boatCardModifDealsList,
            boatCardSpecmarksList:reduxData.boatCardSpecmarksList,
            boatVin:reduxData.boatVin,
            boatYear:reduxData.boatYear,
            engineNum:reduxData.engineNum,
            parkingPlace:reduxData.parkingPlace,
            boatPayload:reduxData.boatPayload,
            engpwrmax:reduxData.engpwrmax,
            boatLength:reduxData.boatLength,
            boatWidth:reduxData.boatWidth,
            boatHeight:reduxData.boatHeight,
            passengersNum:reduxData.passengersNum,
            saCategory:reduxData.saCategory,
            boatName:reduxData.boatName,
            boatType:reduxData.boatType,
            boatVid:reduxData.boatVid,
            bodyMaterial:reduxData.bodyMaterial,
            surname:reduxData.surname,
            name:reduxData.name,
            midname:reduxData.midname,
            docType:reduxData.docType,
            serialOfPassport:reduxData.serialOfPassport,
            numberOfPassport:reduxData.numberOfPassport,
            persNum:reduxData.persNum,
            docDepartment:reduxData.docDepartment,
            docDateIssue:reduxData.docDateIssue,
            oblId:reduxData.oblId,
            rayonId:reduxData.rayonId,
            gorodId:reduxData.gorodId,
            ulica:reduxData.ulica,
            korpus:reduxData.korpus,
            dom:reduxData.dom,
            kv:reduxData.kv,
            phone:reduxData.phone,
            unp:reduxData.unp,
            docDepartmentLe:reduxData.docDepartmentLe,
            nameLe:reduxData.nameLe,
            egrNum:reduxData.egrNum,
            enginesList:[],
            appReason:'',
            note:'',
            note2:'',
            agentDocDate:'',
            agentDocDepartment:'',
            agentDocType:null,
            agentDom:'',
            agentDoverennost:'',
            agentGorodId:null,
            agentKorpus:'',
            agentKv:'',
            agentMidname:'',
            agentName:'',
            agentNumberOfPassport:'',
            agentOblId:null,
            agentPersNum:'',
            agentPhone:'',
            agentRayonId:null,
            agentSerialOfPassport:'',
            agentSurname:'',
            agentUlica:'',
            section:1,
            appDate:new Date(),
          }
          break
        default:
            initialData={}
            break
      }
    setNewData(initialData)
  }
  useEffect(()=>{
    async function fetchData() {
      if(window.location.pathname.includes('/reginformationchanges/statement')){
        const responseStatement = await fetch(MAIN_URL+PORT+API_GET_STATEMENT_MODIF_INFO+String(idStatement))
        const dataStatement =await responseStatement.json()
        setNewData(dataStatement)
        setIdTypeChangeStatement(String(dataStatement.changeType))
      }else {
        const responseBoatCard = await fetch(MAIN_URL + PORT + API_GET_BOAT_CARD_FOR_MODIF + String(idBoadCard));
        const dataBoatCard = await responseBoatCard.json();
        dispatch(addNewStatementData(dataBoatCard))
        setNewData({
          changeType:1,
          regNum:dataBoatCard.regNum,
          personType:dataBoatCard.personType,
          tiketNum:dataBoatCard.tiketNum,
          ticketDate:dataBoatCard.ticketDate,
          boatCardSpecmarksList:dataBoatCard.boatCardSpecmarksList,
          boatLength:dataBoatCard.boatLength,
          boatWidth:dataBoatCard.boatWidth,
          boatHeight:dataBoatCard.boatHeight,
          appReason:'',
          boatCardModifDealsList:dataBoatCard.boatCardModifDealsList,
          unp:'',
          docDepartmentLe:'',
          nameLe:'',
          egrNum:'',
          section:1,
          appDate:new Date()
        })
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
    <div className={`d-flex flex-column align-items-center justify-content-center`}>
      <h2>Заявление для физ.лиц</h2>
      <p>
        о государственной регистрации изменений сведений, подлежащих внесению в судовую книгу для маломерного
        судна, за исключением гребных лодок, байдарок и надувных судов грузоподъемностью менее 225 килограммов
      </p>
      <div className={styles["form-container"]}>
        <Form>
          {newData.boatCardSpecmarksList.find(el=>el.msmLock===true) && idTypeChangeStatement==='2' && (<p className={'text-danger'}>Есть ограничения на снятие с учета!!!</p>)}
          <Form.Group className={styles["header"]}>
            <Form.Label>Какие изменения вносятся:</Form.Label>
            <Form.Select
                disabled={modeView}
                value={parseInt(idTypeChangeStatement)}
                onChange={(e) => handleTypeChangeStatement(e)}>
              {optionSelectChangeType.map((el) => (
                <option value={el.id}>{el.value}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className={styles["header"]}>
            <Form.Label>Регистрационный номер маломерного судна:</Form.Label>
            <Form.Control
              value={newData.regNum}
              type="text"
              readOnly={true}
              disabled={true}
            />
          </Form.Group>
          <Form.Group className={styles["header"]}>
            <Form.Label>Субъект хозяйствования:</Form.Label>
            <Form.Control
              value={newData.personType}
              type="text"
              readOnly={true}
              disabled={true}
            />
          </Form.Group>

          <Form.Group className={styles["header"]}>
            <Form.Label>Номер судового билета:</Form.Label>
            <Form.Control
              value={newData.tiketNum}
              type="text"
              readOnly={true}
              disabled={true}
            />
          </Form.Group>
          <Form.Group className={styles["header"]}>
            <Form.Label>Дата выдачи судового билета:</Form.Label>
            <Form.Control
              value={newData.ticketDate}
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
                  mode={modeView?modeView:((idTypeChangeStatement==='2'||idTypeChangeStatement==='3')?'view':'')}
              />
          ):(
              <InformationAboutEntity
                  inputData={newData}
                  updateNewData={updateNewData}
                  saveKey={saveKey}
                  handleErrors={handleErrors}
                  errors={errors}
                  mode={modeView?modeView:((idTypeChangeStatement==='2'||idTypeChangeStatement==='3')?'view':'')}

              />
          )
          }

          <InfoRepresentPerson
              inputData={newData}
              updateNewData={updateNewData}
              mode={modeView}/>
          {(idTypeChangeStatement !== "1" && idTypeChangeStatement !== "4") ? (
            <InformationAboutBoat
              dataBoat = {newData}
              // fieldStatus={readStatusForInputField}
              updateNewData={updateNewData}
              saveKey={saveKey}
              handleErrors={handleErrors}
              errors={errors}
              mode={modeView?modeView:'view'}
            />
          ) : (
            ""
          )}
          {idTypeChangeStatement === "4" ? <OtherInformation
              inputData={newData}
              updateNewData={updateNewData}
              mode={modeView}
          /> : ""}

          <Form.Group>
            <Form.Label>
              <h3>Основание для внесения изменений</h3>
            </Form.Label>
            <Form.Control
              id="appReason"
              type="text"
              value={newData.appReason}
              onChange={(e) => updateNewData(e.target.id, e.currentTarget.value)}
              disabled={modeView ? true : false}
            />
          </Form.Group>
          {idTypeChangeStatement === "2" || idTypeChangeStatement === "3" ? (
            <TableAppBoatReg
              tableOptions={enginesList}
              mainData={newData}
              dataForTable={newData.enginesList}
              typeTable='boatCardAppEngList'
              updateData={updateNewData}
              mode={modeView?modeView:((idTypeChangeStatement==='2')?'view':'')}
            />
          ) : (
            ""
          )}

          {(idTypeChangeStatement === "1" || idTypeChangeStatement ==="2") ? (
            <TableAppBoatReg
              tableOptions={boatCardModifDealsDtoList}
              typeTable='boatCardAppDealsList'
              dataForTable={newData.boatCardModifDealsList}
              updateData={updateNewData}
              mode={modeView?modeView:((idTypeChangeStatement==='2')?'view':'')}
            />
          ) : (
            ""
          )}
          <TableAppBoatReg
            tableOptions={boatCardSpecmarksList}
            dataForTable={newData.boatCardSpecmarksList}
            typeTable='boatCardAppSpecMarkList'
            updateData={updateNewData}
            mode={modeView?modeView:((idTypeChangeStatement==='2')?'view':'')}
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
        {!modeView && (<Button
            variant="primary"
            onClick={(e) => handleSave(e)}
            disabled={newData.boatCardSpecmarksList.find(el=>el.msmLock===true) && idTypeChangeStatement==='2'}
        >
          Зарегистрировать
        </Button>)}
        <Button
            variant="danger"
            onClick={()=>{handleCloseApp()}}>
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
    </div>
  );
}

export default IndividualStatement;
