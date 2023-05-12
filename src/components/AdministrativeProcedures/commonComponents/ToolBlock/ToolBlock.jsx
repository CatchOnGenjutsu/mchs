import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { MAIN_URL, PORT, API_GET_BOAT_INFO_CARD } from "../../../../constants/constants";

import styles from "./ToolBlock.module.css";
import edit_icon from "../../../../resourсes/edit-icon.svg";
import add_icon from "../../../../resourсes/add-icon.svg";
import open_icon from "../../../../resourсes/open-icon.svg";
import view_icon from "../../../../resourсes/view_icon.svg";

function ToolBlock({ data, id, appStatusId, setShow, addBtnDisIn, viewBtnDisIn }) {
  const url = new URL(document.location.href);
  const pathName = url.pathname.slice(1);
  const navigate = useNavigate();

  const [addBtnText, setAddBtnText] = useState(() => {
    switch (true) {
      case pathName.includes("smallboatsreg"):
        return "Добавить заявление";
      default:
        break;
    }
  });
  const [viewBtnText, setViewBtnText] = useState(() => {
    switch (true) {
      case pathName.includes("smallboatsreg"):
        return "Просмотр";
      default:
        break;
    }
  });
  const [openBtnText, setOpenBtnText] = useState(() => {
    switch (true) {
      case pathName.includes("smallboatsreg"):
        return "Взять в работу";
      default:
        break;
    }
  });

  const handleButtonAdd = async (event) => {
    switch (true) {
      case pathName.includes("reginformationchanges/searchboatcard"): {
        switch (event.currentTarget.id) {
          case "open": {
            navigate(`/smallboats/boatId/${id}`);
            break;
          }
          case "add": {
            setShow(true);
            break;
          }
        }
        break;
      }
      case pathName.includes("reginformationchanges"): {
        navigate("searchboatcard");
        break;
      }
      case pathName.includes("smallboatsreg"): {
        setShow(true);
        break;
      }
    }
  };
  const handleButtonView = async (event) => {
    switch (true) {
      case pathName.includes("reginformationchanges/searchboatcard"): {
        switch (event.currentTarget.id) {
          case "open": {
            navigate(`/smallboats/boatId/${id}`);
            break;
          }
          case "add": {
            setShow(true);
            break;
          }
        }
        break;
      }
      case pathName.includes("reginformationchanges"): {
        navigate("searchboatcard");
        break;
      }
      case pathName.includes("smallboatsreg"): {
        navigate(`./app/${id}`, {
          state: { mode: "view" },
        });
        break;
      }
    }
  };
  return (
    <>
      <div className={`d-flex mb-2`}>
        {pathName === "reginformationchanges" ? (
          <button
            id={`edit`}
            disabled={Boolean(!id)}
            className={`btn btn-danger btn-sm ms-2`}>
            <img
              src={edit_icon}
              alt="Редактировать"
            />
          </button>
        ) : (
          ""
        )}

        <button
          id={`add`}
          title={addBtnText}
          disabled={addBtnDisIn}
          className={`btn btn-danger btn-sm ms-2`}
          onClick={handleButtonAdd}>
          <img
            src={add_icon}
            alt="Добавить"
          />
        </button>
        <p className={styles.buttons_text}>{addBtnText}</p>
        <button
          id={"view"}
          title={viewBtnText}
          disabled={Boolean(!id)}
          // disabled={viewBtnDisIn}
          className={`btn btn-danger btn-sm ms-2`}
          onClick={handleButtonView}>
          <img
            src={view_icon}
            alt="Просмотр"
          />
        </button>
        <p className={styles.buttons_text}>{viewBtnText}</p>
        {pathName !== "reginformationchanges" ? (
          <>
            <button
              id={`open`}
              title={openBtnText}
              disabled={Boolean(!id) || Number(appStatusId) !== 1}
              className={`btn btn-danger btn-sm ms-2`}
              onClick={handleButtonAdd}>
              <img
                src={open_icon}
                alt="Открыть"
              />
            </button>
            <p className={styles.buttons_text}>{openBtnText}</p>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default ToolBlock;
