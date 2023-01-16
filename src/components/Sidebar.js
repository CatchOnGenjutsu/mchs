import React, { useDebugValue } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showHiddenMenu } from "../redux/actions";
import { v4 as uuidv4 } from 'uuid';

export default function Sidebar() {
  const dispatch = useDispatch()

  const sidebarListArray = useSelector((state) => {
    const { sidebarReducer } = state;
    return sidebarReducer.sidebarListArray;
  });

  console.log(sidebarListArray[0][2].isHidden)

  const showDropdownMenu = (e) => {
    console.log(e.currentTarget.dataset.title);
    dispatch(showHiddenMenu(e.currentTarget.dataset.title));
  }
  return (
    <div className="sidebar-container">
      <ul className="sidebar-list">
        {sidebarListArray.map((item) => (
          <>
            <li onClick={showDropdownMenu} className="sidebar-list-item" data-title={item[1]} key={item[1]}>
              {item[0]}
              {
                item[2].listModal.length !== 0 ? (
                  <img className={!item[2].isHidden ? "rotated-image" : null} src="../assets/icon-down-arrow.png"></img>
                ) : null
              }

            </li>
            {item[2] !== undefined ?
              <ul className="sidebar-list-modal" hidden={item[2].isHidden}>
                {
                  item[2] !== undefined ? item[2].listModal.map((elem) => (
                    <li className="sidebar-list-item-modal" key={elem.length * item[2].listModal.indexOf(elem)}>
                      {elem}
                    </li>
                  )) : null
                }
              </ul> : null}

          </>
        ))}
      </ul>
    </div >
  )
}