import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { ProgressBar } from "react-loader-spinner";
import styles from "./IndividualStatement.module.css";
import InformationAboutIndividual from "../../commonComponents/InformationAboutIndividual/InformationAboutIndividual";
import InfoRepresentPerson from "../../commonComponents/InfoRepresentPerson/InfoRepresentPerson";
import TableAppBoatReg from "../../commonComponents/TablesAppBoatReg/TableAppBoatReg";
import InformationAboutBoat from "../../commonComponents/InformationAboutBoat/InformationAboutBoat";
import AppFooter from "../../commonComponents/AppFooter/AppFooter";
import OtherInformation from "../../commonComponents/OtherInformation/OtherInformation";
import {
  optionSelectChangeType,
  boatCardAppEngDtoList,
  boatCardAppSmDtoList,
  boatCardAppDealsDtoList,
  readStatusForInputField,
} from "./optionsForIndividualStatement";
import {
  fieldAddressOptions,
  fieldPassportOptions,
} from "../../commonComponents/InformationAboutIndividual/optionsForInformationAboutIndividual";
import { fieldBoatOptions } from "../../commonComponents/InformationAboutBoat/optionsForInformationAboutBoat";
import { setDataForTable } from "../../../../redux/statementReducer/actionsStatement";
import { MAIN_URL, PORT, API_GET_BOAT_CARD_FOR_MODIF } from "../../../../constants/constants";

function IndividualStatement() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { idBoadCard } = location.state || {};
  const [idTypeStatement, setIdTypeStatement] = useState("1");
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [newData, setNewData] = useState({});
  const [errors, setErrors] = useState({});
  const [saveKey, setSaveKey] = useState(false);

  const errorsFields = [];
  Object.entries(fieldAddressOptions).map((item) => (item[1].required ? errorsFields.push(item[0]) : null));
  Object.entries(fieldPassportOptions).map((item) => (item[1].required ? errorsFields.push(item[0]) : null));
  Object.entries(fieldBoatOptions).map((item) => (item[1].required ? errorsFields.push(item[0]) : null));

  const handleErrors = () => {
    let newErrors = {};
    errorsFields.forEach((elem) => {
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

  const updateNewData = (key, value) => {
    newData[key] = value;
  };
  console.log(idTypeStatement)
  useEffect(() => {
    async function fetchData() {
      const responseBoatCard = await fetch(MAIN_URL + PORT + API_GET_BOAT_CARD_FOR_MODIF + String(idBoadCard));
      const dataBoatCard = await responseBoatCard.json();
      console.log(dataBoatCard)
      // const responseSpecialMarks = await fetch(MAIN_URL + PORT+API_GET_BOAT_INFO_SPEC_MARKS+ String(idBoadCard))
      // const dataSpecialMarks =await responseSpecialMarks.json()
      // const editedDataBoadCard ={}
      // editedDataBoadCard.regNum = dataBoatCard.regNum
      // editedDataBoadCard.ptName = dataBoatCard.ownerType.ptName
      // editedDataBoadCard.tiketNum = dataBoatCard.tiketNum
      // editedDataBoadCard.cardDate = dataBoatCard.cardDate
      // editedDataBoadCard.enginesList = dataBoatCard.enginesList
      // editedDataBoadCard.boatVin = dataBoatCard.boatVin
      // editedDataBoadCard.parkingPlace = dataBoatCard.parkingPlace
      // editedDataBoadCard.boatType = dataBoatCard.boatType.btname
      //
      // editedDataBoadCard.specMarks = dataSpecialMarks.map(el=>{
      //   return{
      //     asmDate:el.bsmDate,
      //     asmLock:el.bsmLock,
      //     asmNote:el.bsmNote,
      //   }
      // })
      setIsLoading(false);
      dispatch(setDataForTable({ key: boatCardAppSmDtoList.keyTable, data: dataBoatCard.boatCardSpecmarksList }));
      dispatch(setDataForTable({ key: boatCardAppEngDtoList.keyTable, data: dataBoatCard.enginesList }));
      setData(dataBoatCard);


    }
    fetchData();
  }, []);


  if (isLoading) {
    return (
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
    );
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
          <Form.Group className={styles["header"]}>
            <Form.Label>Какие изменения вносятся:</Form.Label>
            <Form.Select onChange={(e) => setIdTypeStatement(e.currentTarget.value)}>
              {optionSelectChangeType.map((el) => (
                <option value={el.id}>{el.value}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className={styles["header"]}>
            <Form.Label>Регистрационный номер маломерного судна:</Form.Label>
            <Form.Control
              value={data.regNum}
              type="text"
              readOnly={true}
              disabled={true}
            />
          </Form.Group>
          <Form.Group className={styles["header"]}>
            <Form.Label>Субъект хозяйствования:</Form.Label>
            <Form.Control
              value={data.personType}
              type="text"
              readOnly={true}
              disabled={true}
            />
          </Form.Group>

          <Form.Group className={styles["header"]}>
            <Form.Label>Номер судового билета:</Form.Label>
            <Form.Control
              value={data.tiketNum}
              type="text"
              readOnly={true}
              disabled={true}
            />
          </Form.Group>
          <Form.Group className={styles["header"]}>
            <Form.Label>Дата выдачи судового билета:</Form.Label>
            <Form.Control
              value={data.cardDate}
              type="text"
              readOnly={true}
              disabled={true}
            />
          </Form.Group>
          <InformationAboutIndividual
            data={data}
            updateNewData={updateNewData}
            saveKey={saveKey}
            handleErrors={handleErrors}
            errors={errors}
          />
          <InfoRepresentPerson />
          {(idTypeStatement !== "1" && idTypeStatement !== "4") ? (
            <InformationAboutBoat
              dataBoat = {data}
              fieldStatus={readStatusForInputField}
              updateNewData={updateNewData}
              saveKey={saveKey}
              handleErrors={handleErrors}
              errors={errors}
            />
          ) : (
            ""
          )}
          {idTypeStatement === "4" ? <OtherInformation /> : ""}

          <Form.Group>
            <Form.Label>
              <h3>Основание для внесения изменений</h3>
            </Form.Label>
            <Form.Control
              id="appReason"
              type="text"
            />
          </Form.Group>
          {idTypeStatement === "2" || idTypeStatement === "3" ? (
            <TableAppBoatReg
              tableOptions={boatCardAppEngDtoList}
              dataForTable={data.enginesList}
              typeTable='boatCardAppEngList'
            />
          ) : (
            ""
          )}

          {idTypeStatement === "1" ? (
            <TableAppBoatReg
              tableOptions={boatCardAppDealsDtoList}
              typeTable='boatCardAppDealsList'
              dataForTable={[]}
            />
          ) : (
            ""
          )}
          <TableAppBoatReg
            tableOptions={boatCardAppSmDtoList}
            dataForTable={data.boatCardSpecmarksList}
            typeTable='boatCardAppSpecMarkList'
          />
          <AppFooter />
        </Form>
      </div>
      <div className={styles.buttons_container}>
        <Button
            variant="primary"
            className=""
            // onClick={(e) => handleSave(e)}
        >
          Зарегистрировать
        </Button>
        <Button variant="danger">Отказать</Button>
      </div>
    </div>
  );
}

export default IndividualStatement;
