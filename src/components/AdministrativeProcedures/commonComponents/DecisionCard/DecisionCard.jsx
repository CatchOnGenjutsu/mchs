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
  enginesList,
  boatCardSpecmarksList,
  boatCardModifDealsDtoList,
} from "../../registrationInformationChanges/IndividualStatement/optionsForIndividualStatement";
import {
  MAIN_URL,
  PORT,
  API_ACCEPT_BOAT_REGISTRATION,
  API_DECLINE_BOAT_REGISTRATION,
  API_ACCEPT_DUPLICATE,
  API_DECLINE_DUPLICATE,
  API_GET_STATEMENT_MODIF_INFO,
  API_ACCEPT_BOAT_MODIF,
  API_DECLINE_BOAT_MODIF,
} from "../../../../constants/constants";

import styles from "./DecisionCard.module.css";

export default function DecisionCard() {
  const [isLoading, setIsLoading] = useState(true);
  const [showResultModal, setShowResultModal] = useState(false);
  const [registrationResult, setRegistrationResult] = useState("");
  const [boatRegNum, setBoatRegNum] = useState(null);
  const [newData, setNewData] = useState({});
  const [changeInfData, setChangeInfData] = useState(null);
  const [acceptBtnText, setAcceptBtnText] = useState("");

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

  let data = null;
  switch (true) {
    case window.location.pathname.includes("smallboatsreg"):
      data = { ...appRegistrationDecisionData };
      break;
    case window.location.pathname.includes("dupshipsticket"):
      data = { ...appDuplicateDecisionData };
      break;
    case window.location.pathname.includes("reginformationchanges"):
      data = changeInfData;
      break;
    default:
      break;
  }
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
            case window.location.pathname.includes("reginformationchanges"):
              const pathArray = window.location.pathname.split("/");
              const id = pathArray[pathArray.length - 1];
              request = await fetch(MAIN_URL + PORT + API_ACCEPT_BOAT_MODIF + id + "/" + data.inspector, {
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
            switch (true) {
              case window.location.pathname.includes("smallboatsreg"):
                setBoatRegNum(response);
                break;
              case window.location.pathname.includes("reginformationchanges"):
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
            case window.location.pathname.includes("reginformationchanges"):
              const pathArray = window.location.pathname.split("/");
              const id = pathArray[pathArray.length - 1];
              request = await fetch(MAIN_URL + PORT + API_DECLINE_BOAT_MODIF + id, { method: "POST" });
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
    console.log(pathArray);
    switch (true) {
      case pathArray.includes("smallboatsreg"):
        dispatch(getDecisionCardInfo(id));
        setIsLoading(false);
        setAcceptBtnText("Зарегистрировать судно");
        break;
      case pathArray.includes("dupshipsticket"):
        dispatch(getDuplicateDecisionCardInfo(id));
        setIsLoading(false);
        setAcceptBtnText("Выдать");

        break;
      case pathArray.includes("reginformationchanges"):
        async function fetchData() {
          const response = await fetch(MAIN_URL + PORT + API_GET_STATEMENT_MODIF_INFO + String(id));
          const responseData = await response.json();
          responseData.bodyMaterial = responseData.bodyMaterialValue;
          responseData.saCategory = responseData.saCategoryValue;
          setChangeInfData(responseData);
          setIsLoading(false);
          setAcceptBtnText("Принять");
        }
        fetchData();
        break;
      default:
        break;
    }
  }, []);
  if (isLoading) {
    return (
      <div className={"d-flex flex-column align-items-center"}>
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
        tableOptions={changeInfData ? enginesList : boatCardAppEngDtoList}
        mode={"view"}
        dataForTable={changeInfData ? changeInfData.enginesList : undefined}
      />
      {window.location.pathname.includes("dupshipsticket") && (
        <div className={styles.marks_block}>Особые отметки и дополнительные сведения</div>
      )}
      <TableAppBoatReg
        typeTable={"boatCardAppDealsList"}
        tableOptions={changeInfData ? boatCardModifDealsDtoList : boatCardAppDealsDtoList}
        mode={"view"}
        dataForTable={changeInfData ? changeInfData.boatCardModifDealsList : undefined}
      />
      <TableAppBoatReg
        typeTable={"boatCardAppSpecMarkList"}
        tableOptions={changeInfData ? boatCardSpecmarksList : boatCardAppSmDtoList}
        mode={"view"}
        dataForTable={changeInfData ? changeInfData.boatCardSpecmarksList : undefined}
      />
      {window.location.pathname.includes("smallboatsreg") && (
        <div>
          Должностное лицо <span className="ms-5">{data.inspector}</span>
        </div>
      )}
      {window.location.pathname.includes("dupshipsticket") && (
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
