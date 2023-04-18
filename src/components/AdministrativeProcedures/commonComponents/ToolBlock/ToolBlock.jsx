import React, { useState } from "react";
import { styles } from "./ToolBlock.module.css";
import edit_icon from "../../../../resourсes/edit-icon.svg";
import add_icon from "../../../../resourсes/add-icon.svg";
import open_icon from "../../../../resourсes/open-icon.svg";
import { useNavigate } from "react-router-dom";
import {
  MAIN_URL,
  PORT,
  API_GET_BOAT_INFO_CARD,
} from "../../../../constants/constants";

function ToolBlock({ data, id, setShow, addBtnDisIn }) {
  const url = new URL(document.location.href);
  const pathName = url.pathname.slice(1);
  const navigate = useNavigate();
  // const [boatCard,setBoatCard]=useState(null)

  const handleButtonAdd = async (event) => {
    switch (true) {
      case pathName.includes("reginformationchanges/searchboatcard"): {
        switch (event.currentTarget.id) {
          case "open": {
            navigate(`/smallboats/boatId/${id}`);
            break;
          }
          case "add": {
            const response = await fetch(MAIN_URL + PORT + API_GET_BOAT_INFO_CARD + String(id));
            let boatCardData = await response.json();
            if(boatCardData.ownerType.ptcode === 1){
              navigate("/reginformationchanges/individual/add",{state:{data:boatCardData}});
            }else{
              navigate("/reginformationchanges/entity/add");
            }

            // setBoatCard(boatCardData)
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
        // navigate(`/smallboatsreg/app/${id}`);
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
              alt="редактировать"
            />
          </button>
        ) : (
          ""
        )}

        <button
          id={`add`}
          disabled={
            addBtnDisIn
            // (Boolean(!id) && pathName !== 'reginformationchanges')
          }
          className={`btn btn-danger btn-sm ms-2`}
          onClick={handleButtonAdd}>
          <img
            src={add_icon}
            alt="добавить"
          />
        </button>
        {pathName !== "reginformationchanges" ? (
          <button
            id={`open`}
            disabled={Boolean(!id)}
            className={`btn btn-danger btn-sm ms-2`}
            onClick={handleButtonAdd}>
            <img
              src={open_icon}
              alt="открыть"
            />
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default ToolBlock;
