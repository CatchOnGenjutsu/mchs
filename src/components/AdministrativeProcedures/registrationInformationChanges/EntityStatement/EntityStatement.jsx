import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Form } from "react-bootstrap";
import { ProgressBar } from  'react-loader-spinner'
import styles from "./EntityStatement.module.css";
import InformationAboutEntity from "../../commonComponents/InformationAboutEntity/InformationAboutEntity"
import InfoRepresentPerson from "../../commonComponents/InfoRepresentPerson/InfoRepresentPerson";
import TableAppBoatReg from "../../commonComponents/TablesAppBoatReg/TableAppBoatReg";
import InformationAboutBoat from "../../commonComponents/InformationAboutBoat/InformationAboutBoat";
import AppFooter from "../../commonComponents/AppFooter/AppFooter";
import OtherInformation from "../../commonComponents/OtherInformation/OtherInformation"
import {
    optionSelectChangeType,
    boatCardAppEngDtoList,
    boatCardAppSmDtoList,
    boatCardAppDealsDtoList,
    readStatusForInputField
} from "./optionsForEntityStatement";
import {
    MAIN_URL,
    PORT,
    API_GET_BOAT_INFO_CARD,
} from "../../../../constants/constants";

function EntityStatement() {
    const location = useLocation();
    const { idBoadCard } = location.state || {};
    const [idTypeStatement,setIdTypeStatement] = useState('1')
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(MAIN_URL + PORT + API_GET_BOAT_INFO_CARD + String(idBoadCard));
            const data = await response.json();
            setData(data);
            setIsLoading(false);
        }
        fetchData();
    }, []);
    console.log(data)
    if(isLoading){
        return (
            <div className={`d-flex flex-column align-items-center `}>
                <ProgressBar
                    height="80"
                    width="80"
                    ariaLabel="progress-bar-loading"
                    wrapperStyle={{}}
                    wrapperClass="progress-bar-wrapper"
                    borderColor = '#F4442E'
                    barColor = '#51E5FF'
                />
            </div>
        )
    }
    return (
        <div className="d-flex flex-column align-items-center">
            <h2>Заявление для юр.лиц</h2>
            <p>
                о государственной регистрации изменений сведений, подлежащих внесению в
                судовую книгу для маломерного судна, за исключением гребных лодок,
                байдарок и надувных судов грузоподъемностью менее 225 килограммов
            </p>
            <div className={styles["form-container"]}>
                <Form>
                    <Form.Group className={styles["header"]}>
                        <Form.Label>Какие изменения вносятся:</Form.Label>
                        <Form.Select>
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
                            value={data.ownerType.ptName}
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
                    <InformationAboutEntity data={data} />
                    <InfoRepresentPerson />
                    {!(idTypeStatement==='1')?(
                        <InformationAboutBoat
                            fieldStatus={readStatusForInputField}
                        />
                    ):''}
                    {idTypeStatement==='4'?<OtherInformation/>:''}
                    <Form.Group >
                        <Form.Label><h3>Основание для внесения изменений</h3></Form.Label>
                        <Form.Control
                            id="appReason"
                            type="text"
                        />
                    </Form.Group>
                    {(idTypeStatement==='2'||idTypeStatement==='3')?(
                        <TableAppBoatReg
                            tableOptions={boatCardAppEngDtoList}
                            dataEngines={data.enginesList}
                        />
                    ):''}
                    {idTypeStatement==='1'?(
                        <TableAppBoatReg
                            tableOptions={boatCardAppDealsDtoList}
                            // data={boatCardAppEngList}
                        />
                    ):''}
                    <TableAppBoatReg
                        tableOptions={boatCardAppDealsDtoList}
                        // data={boatCardAppEngList}
                    />
                    <AppFooter />
                </Form>
            </div>
        </div>
    );
}

export default EntityStatement;