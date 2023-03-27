import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SearchBlock from '../../components/SearchBlock/SearchBlock.jsx';
import SearchTable from '../../components/SearchTable/SearchTable.jsx';
import BoatInfo from '../../components/BoatInfo/BoatInfo.jsx';
import {  clearBoatCardInfo } from '../../redux/smallBoatsReducer/actionsSmallBoats';
import { SMALLBOATS_COLUMNS } from '../../components/SearchTable/TablesColumns';
import { inputsHeadersSmallBoats } from '../../components/SearchBlock/inputsHeaders.js';


import styles from './SmallBoats.module.css';

export default function SmallBoats() {
  const dispatch = useDispatch();
  

  const [boatId, setBoatId] = useState('');


  const handleClearBoatInfo = () => {
    dispatch(clearBoatCardInfo());
  };

  const dataFromState = useSelector((state) => {
    const { smallBoatsReducer } = state;
    return smallBoatsReducer.data.map((el) => {
      if (el.cardid) {
      el.id = el.cardid;
      delete el.cardid;
      }
      return el;
    });
  });

  return (
  <>
    <div>
      <div className={boatId !== '' ? styles.hidden : ''}>
        <h2>База данных маломерных судов</h2>
        <SearchBlock inputsHeaders={Object.values(inputsHeadersSmallBoats)} />
        <SearchTable
        // setId={handleBoatId}
        columns={SMALLBOATS_COLUMNS}
        dataFromState={dataFromState}
        />
      </div>
    </div>
  </>
  );
}
