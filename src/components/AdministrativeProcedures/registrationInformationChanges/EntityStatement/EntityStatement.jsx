import React from "react";
import { useLocation } from "react-router-dom";
import { Form } from "react-bootstrap";
import styles from "./EntityStatement.module.css";
import InformationAboutEntity from "../../commonComponents/InformationAboutEntity/InformationAboutEntity"
import InfoRepresentPerson from "../../commonComponents/InfoRepresentPerson/InfoRepresentPerson";
import TableAppBoatReg from "../../commonComponents/TablesAppBoatReg/TableAppBoatReg";
import InformationAboutBoat from "../../commonComponents/InformationAboutBoat/InformationAboutBoat";
import AppFooter from "../../commonComponents/AppFooter/AppFooter";
import {
    optionSelectChangeType,
    boatCardAppEngDtoList,
    boatCardAppSmDtoList,
    boatCardAppDealsDtoList,
} from "./optionsForEntityStatement";

function EntityStatement() {
    const location = useLocation();
    const { data } = location.state || {};
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
                    <InformationAboutBoat />
                    <TableAppBoatReg
                        tableOptions={boatCardAppEngDtoList}
                        dataEngines={data.enginesList}
                    />
                    <TableAppBoatReg
                        tableOptions={boatCardAppSmDtoList}
                        // data={boatCardAppEngList}
                    />
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