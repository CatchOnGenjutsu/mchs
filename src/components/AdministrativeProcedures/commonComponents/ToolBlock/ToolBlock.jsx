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
  const buttonsNames = {
    openBtnText: "Просмотр РК",
    addBtnText: "Добавить заявление",
    viewBtnText: "Просмотр",
    editBtnText: "Взять в работу",
  };

  const handleButtonOpen = async (event) => {
    switch (true) {
      case pathName.includes("reginformationchanges/searchboatcard"): {
        navigate(`/smallboats/boatId/${id}`);
        break;
      }
      case pathName.includes("dupshipsticket/searchboatcard"): {
        navigate(`/smallboats/boatId/${id}`);
        break;
      }
    }
  };

  const handleButtonAdd = async (event) => {
    switch (true) {
      case pathName.includes("reginformationchanges/searchboatcard"): {
        const board = data.find(el=>String(el.id)===id)
        if(board.ownerType===1){
          navigate("/reginformationchanges/individual/add", { state: { idBoadCard:id,idTypeStatement:board.ownerType} });
        }
        if(board.ownerType===2){
          navigate("/reginformationchanges/entity/add", { state: { idBoadCard:id , idTypeStatement:board.ownerType} });
        }
        break;
      }
      case pathName.includes("reginformationchanges"): {
        navigate("searchboatcard");
        break;
      }
      case pathName.includes("dupshipsticket/searchboatcard"): {
        navigate(`/dupshipsticket/${id}`);
        break;
      }
      case pathName.includes("dupshipsticket"): {
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
      case pathName.includes("reginformationchanges"): {
        navigate(`./statement/${id}`, {
          state: { modeView: "view",idStatement:id,idTypeStatement:data.find(el=>String(el.id)===String(id)).personType },
        });
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

  const handleButtonEdit = async (event) => {
    switch (true) {
      // case pathName.includes("reginformationchanges/searchboatcard"): {
      //   switch (event.currentTarget.id) {
      //     case "open": {
      //       navigate(`/smallboats/boatId/${id}`);
      //       break;
      //     }
      //     case "add": {
      //       setShow(true);
      //       break;
      //     }
      //   }
      //   break;
      // }
      // case pathName.includes("reginformationchanges"): {
      //   navigate("searchboatcard");
      //   break;
      // }
      case pathName.includes("smallboatsreg"): {
        navigate(`./decisioncard/${id}`, {
          state: { mode: "view" },
        });
        break;
      }
    }
  };

  return (
    <>
      <div className={`d-flex mb-2`}>
        {pathName.includes("searchboatcard") ? (
          <>
            <button
              id={`open`}
              title={buttonsNames.openBtnText}
              disabled={Boolean(!id)}
              className={`btn btn-danger btn-sm ms-2`}
              onClick={handleButtonOpen}>
              <img
                src={open_icon}
                alt="Открыть"
              />
            </button>
            <p className={styles.buttons_text}>{buttonsNames.openBtnText}</p>
          </>
        ) : null}
        <button
          id={`add`}
          title={buttonsNames.addBtnText}
          disabled={addBtnDisIn}
          className={`btn btn-danger btn-sm ms-2`}
          onClick={handleButtonAdd}>
          <img
            src={add_icon}
            alt="Добавить"
          />
        </button>
        <p className={styles.buttons_text}>{buttonsNames.addBtnText}</p>
        {!pathName.includes("searchboatcard") ? (
          <>
            <button
              id={"view"}
              title={buttonsNames.viewBtnText}
              disabled={Boolean(!id)}
              // disabled={viewBtnDisIn}
              className={`btn btn-danger btn-sm ms-2`}
              onClick={handleButtonView}>
              <img
                src={view_icon}
                alt="Просмотр"
              />
            </button>
            <p className={styles.buttons_text}>{buttonsNames.viewBtnText}</p>
          </>
        ) : null}
        {!pathName.includes("searchboatcard") ? (
          <>
            <button
              id={`edit`}
              title={buttonsNames.editBtnText}
              disabled={Boolean(!id) || Number(appStatusId) !== 1}
              className={`btn btn-danger btn-sm ms-2`}
              onClick={handleButtonEdit}>
              <img
                src={edit_icon}
                alt="Редактировать"
              />
            </button>
            <p className={styles.buttons_text}>{buttonsNames.editBtnText}</p>
          </>
        ) : null}
      </div>
    </>
  );
}

export default ToolBlock;
