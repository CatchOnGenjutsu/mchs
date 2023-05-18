import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import TableAppBoatReg from "../TablesAppBoatReg/TableAppBoatReg";
import ResultModalWindow from "../ResultModalWindow/ResultModalWindow";
import { ProgressBar } from "react-loader-spinner";

import { clearDecisionData, getDecisionCardInfo } from "../../../../redux/statementReducer/actionsStatement";
import { ownerTableColumns, boatTableColumns } from "./tablesSettings";

import styles from "./DecisionCard.module.css";
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
} from "../../../../constants/constants";

export default function DecisionCard() {
  const [isLoading, setIsLoading] = useState(true);
  const [showResultModal, setShowResultModal] = useState(false);
  const [registrationResult, setRegistrationResult] = useState("");
  const [boatRegNum, setBoatRegNum] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const appDecisionData = useSelector((state) => {
    const { statementReducer } = state;
    return statementReducer.appDecisionData;
  });

  const handleButtonClick = async (e) => {
    if (e) {
      switch (e.target.id) {
        case "close":
          navigate(-1);
          break;

        case "accept": {
          const request = await fetch(
            MAIN_URL +
              PORT +
              API_ACCEPT_BOAT_REGISTRATION +
              appDecisionData.appId +
              "/" +
              appDecisionData.inspector,
            { method: "POST" },
          );
          if (request.status !== 200) {
            setShowResultModal(!showResultModal);
            setRegistrationResult("error");
          } else {
            const response = await request.text();
            console.log("response", response);
            setBoatRegNum(response);
            setShowResultModal(!showResultModal);
            setRegistrationResult("success");
          }
          break;
        }

        case "decline": {
          const request = await fetch(
            MAIN_URL + PORT + API_DECLINE_BOAT_REGISTRATION + appDecisionData.appId,
            { method: "POST" },
          );
          if (request.status !== 200) {
            setShowResultModal(!showResultModal);
            setRegistrationResult("error");
          } else {
            const response = await request.text();
            console.log("response", response);
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

  useEffect(() => {
    const pathArray = window.location.pathname.split("/");
    const id = pathArray[pathArray.length - 1];
    dispatch(getDecisionCardInfo(id));
    // if
  }, []);

  return (
    <>
      <div>
        Регистрационный номер заявления <span>{appDecisionData.appNum}</span>
      </div>
      <div>
        Дата подачи заявления <span>{appDecisionData.appDate}</span>
      </div>
      <div className="mb-3">
        <table className={styles.primary_table}>
          <caption className={styles.primary_caption}>{ownerTableColumns.caption}</caption>
          <tbody>
            {appDecisionData !== undefined
              ? ownerTableColumns.nameColumn.map((item) => {
                  return (
                    <tr>
                      <td className={styles.line_name}>{item.value}</td>
                      {(() => {
                        switch (item.id) {
                          case "fio":
                            return (
                              <td className={styles.line_value}>
                                {appDecisionData.fio || appDecisionData.nameLe}
                              </td>
                            );
                          default:
                            return (
                              <td className={styles.line_value}>{appDecisionData[`${item.id}`] || "—"}</td>
                            );
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
            {appDecisionData !== undefined
              ? boatTableColumns.nameColumn.map((item) => {
                  return (
                    <tr>
                      <td className={styles.line_name}>{item.value}</td>
                      <td className={styles.line_value}>{appDecisionData[`${item.id}`] || "—"}</td>
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
      <div>
        Должностное лицо <span className="ms-5">{appDecisionData.inspector}</span>
      </div>
      <div className={styles.buttons_container}>
        <div
          className={styles.reg_button}
          id={"accept"}
          onClick={(e) => handleButtonClick(e)}>
          Зарегистрировать судно
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
