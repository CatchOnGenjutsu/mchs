import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ProgressBar } from "react-loader-spinner";
import { Form } from "react-bootstrap";

import TableAppBoatReg from "../TablesAppBoatReg/TableAppBoatReg";
import ResultModalWindow from "../ResultModalWindow/ResultModalWindow";

import { clearDecisionData, getDecisionCardInfo } from "../../../../redux/statementReducer/actionsStatement";
import { getDuplicateDecisionCardInfo } from "../../../../redux/DuplicateShipsTicketReducer/actionsDuplicateShipsTicket";
import { ownerTableColumns, boatTableColumns } from "./tablesSettings";

import {
  boatCardAppEngDtoList,
  boatCardAppDealsDtoList,
  boatCardAppSmDtoList,
} from "../../AppBoatReg/tableOptions";

import {
  MAIN_URL,
  PORT,
  API_ACCEPT_BOAT_REGISTRATION,
  API_DECLINE_BOAT_REGISTRATION,
  API_ACCEPT_DUPLICATE,
  API_DECLINE_DUPLICATE,
} from "../../../../constants/constants";

import styles from "./DecisionCard.module.css";

export default function DecisionCard() {
  const [isLoading, setIsLoading] = useState(true);
  const [showResultModal, setShowResultModal] = useState(false);
  const [registrationResult, setRegistrationResult] = useState("");
  const [boatRegNum, setBoatRegNum] = useState(null);
  const [newData, setNewData] = useState({});

  const acceptBtnText = window.location.pathname.includes("smallboatsreg")
    ? "Зарегистрировать судно"
    : "Выдать";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const appRegistrationDecisionData = useSelector((state) => {
    const { statementReducer } = state;
    return statementReducer.appDecisionData;
  });
  const appDuplicateDecisionData = useSelector((state) => {
    const { DuplicateShipsTicketReducer } = state;
    return DuplicateShipsTicketReducer.appDecisionData;
  });

  const data = window.location.pathname.includes("smallboatsreg")
    ? { ...appRegistrationDecisionData }
    : { ...appDuplicateDecisionData };

  const handleButtonClick = async (e) => {
    if (e) {
      switch (e.target.id) {
        case "close":
          navigate(-1);
          break;

        case "accept": {
          let request;
          switch (true) {
            case window.location.pathname.includes("smallboatsreg"):
              request = await fetch(
                MAIN_URL + PORT + API_ACCEPT_BOAT_REGISTRATION + data.appId + "/" + data.inspector,
                { method: "POST" },
              );
              break;
            case window.location.pathname.includes("dupshipsticket"):
              request = await fetch(
                MAIN_URL + PORT + API_ACCEPT_DUPLICATE + data.appId + "/" + data.inspector,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(newData),
                },
              );
              break;

            default:
              break;
          }
          if (request.status !== 200) {
            setShowResultModal(!showResultModal);
            setRegistrationResult("error");
          } else {
            const response = await request.text();
            switch (true) {
              case window.location.pathname.includes("smallboatsreg"):
                setBoatRegNum(response);
                break;
              case window.location.pathname.includes("dupshipsticket"):
                setBoatRegNum(newData.tiketNumNew);
                break;
              default:
                break;
            }
            setShowResultModal(!showResultModal);
            setRegistrationResult("success");
          }
          break;
        }

        case "decline": {
          let request;
          switch (true) {
            case window.location.pathname.includes("smallboatsreg"):
              request = await fetch(MAIN_URL + PORT + API_DECLINE_BOAT_REGISTRATION + data.appId, {
                method: "POST",
              });
              break;
            case window.location.pathname.includes("dupshipsticket"):
              request = await fetch(MAIN_URL + PORT + API_DECLINE_DUPLICATE + data.appId, {
                method: "POST",
              });
              break;

            default:
              break;
          }
          if (request.status !== 200) {
            setShowResultModal(!showResultModal);
            setRegistrationResult("error");
          } else {
            const response = await request.text();
            setBoatRegNum(response);
            setShowResultModal(!showResultModal);
            setRegistrationResult("success");
          }
        }
        default:
          break;
      }
    }
  };
  const handleCloseCard = () => {
    dispatch(clearDecisionData());
    navigate(-1);
  };

  const handleValue = (e) => {
    newData[e.target.id] = e.target.value;
  };

  useEffect(() => {
    const pathArray = window.location.pathname.split("/");
    const id = pathArray[pathArray.length - 1];
    // dispatch(getDecisionCardInfo(id));
    console.log(pathArray);
    switch (true) {
      case pathArray.includes("smallboatsreg"):
        dispatch(getDecisionCardInfo(id));
        break;
      case pathArray.includes("dupshipsticket"):
        dispatch(getDuplicateDecisionCardInfo(id));
        break;
      default:
        break;
    }
  }, []);

  return (
    <>
      {window.location.pathname.includes("smallboatsreg") ? (
        <>
          <div>
            Регистрационный номер заявления <span>{data.appNum || "—"}</span>
          </div>
          <div>
            Дата подачи заявления <span>{data.appDate}</span>
          </div>
        </>
      ) : (
        <div>
          Регистрационный номер маломерного судна <span>{data.regNum || "—"}</span>
        </div>
      )}

      <div className="mb-3">
        <table className={styles.primary_table}>
          <caption className={styles.primary_caption}>{ownerTableColumns.caption}</caption>
          <tbody>
            {data !== undefined
              ? ownerTableColumns.nameColumn.map((item) => {
                  return (
                    <tr>
                      <td className={styles.line_name}>{item.value}</td>
                      {(() => {
                        switch (item.id) {
                          case "fio":
                            return <td className={styles.line_value}>{data.fio || data.nameLe}</td>;
                          default:
                            return <td className={styles.line_value}>{data[`${item.id}`] || "—"}</td>;
                        }
                      })()}
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
        <table className={styles.primary_table}>
          <caption className={styles.primary_caption}>{boatTableColumns.caption}</caption>
          <tbody>
            {data !== undefined
              ? boatTableColumns.nameColumn.map((item) => {
                  return (
                    <tr>
                      <td className={styles.line_name}>{item.value}</td>
                      <td className={styles.line_value}>{data[`${item.id}`] || "—"}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
      <TableAppBoatReg
        typeTable={"boatCardAppEngList"}
        tableOptions={boatCardAppEngDtoList}
        mode={"view"}
      />
      {window.location.pathname.includes("dupshipsticket") && (
        <div className={styles.marks_block}>Особые отметки и дополнительные сведения</div>
      )}
      <TableAppBoatReg
        typeTable={"boatCardAppDealsList"}
        tableOptions={boatCardAppDealsDtoList}
        mode={"view"}
      />
      <TableAppBoatReg
        typeTable={"boatCardAppSpecMarkList"}
        tableOptions={boatCardAppSmDtoList}
        mode={"view"}
      />
      {window.location.pathname.includes("smallboatsreg") ? (
        <div>
          Должностное лицо <span className="ms-5">{data.inspector}</span>
        </div>
      ) : (
        <>
          <Form.Group className={styles.form_group_flex}>
            <Form.Label
            // className={`${styles.form_label} ${
            //   !halfControls.includes(item.key) ? styles.half_label : styles.wide_label
            // }`}
            >
              Номер дубликата судового билета
            </Form.Label>
            <Form.Control
              id={"tiketNumNew"}
              // isInvalid={!!errors[el.key]}
              type="text"
              value={newData.tiketNumNew}
              onChange={(e) => handleValue(e)}
            />
          </Form.Group>
          <Form.Group className={styles.form_group_flex}>
            <Form.Label
            // className={`${styles.form_label} ${
            //   !halfControls.includes(item.key) ? styles.half_label : styles.wide_label
            // }`}
            >
              Дата выдачи дубликата судового билета
            </Form.Label>
            <Form.Control
              id={"ticketDateNew"}
              // isInvalid={!!errors[el.key]}
              type="date"
              value={newData.ticketDateNew}
              onChange={(e) => handleValue(e)}
            />
          </Form.Group>
        </>
      )}

      <div className={styles.buttons_container}>
        <div
          className={styles.reg_button}
          id={"accept"}
          onClick={(e) => handleButtonClick(e)}>
          {acceptBtnText}
        </div>
        <div
          className={styles.decline_button}
          id={"decline"}
          onClick={(e) => handleButtonClick(e)}>
          Отказать
        </div>
        <div
          className={styles.close_button}
          id={"close"}
          onClick={(e) => handleButtonClick(e)}>
          Закрыть
        </div>
      </div>
      {showResultModal && (
        <ResultModalWindow
          appId={boatRegNum}
          show={showResultModal}
          setShow={setShowResultModal}
          result={registrationResult}
          handleCloseApp={handleCloseCard}
        />
      )}
    </>
  );
}
