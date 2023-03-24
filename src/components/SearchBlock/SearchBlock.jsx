import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setSearchParams,
  getDataBoatsBySearchParams,
  getDataCertificatesBySearchParams,
  getDataBasesBuildingBySearchParams,
} from '../../redux/actions';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './SearchBlock.module.css';

export default function SearchBlock(props) {
  const dispatch = useDispatch();

  const searchParamsFromStateBoat = useSelector((state) => {
    const { smallBoatsReducer } = state;
    return smallBoatsReducer.searchParams;
  });

  const searchParamsFromStateCertificate = useSelector((state) => {
    const { certificateReducer } = state;
    return certificateReducer.searchParams;
  });

  const searchParamsFromStateBasesBuilding = useSelector(state => {
    const { basesBuildingReducer } = state;
    return basesBuildingReducer.searchParams
    })
    const optionsNsiCheckStatus = useSelector((state => {
    const { dictionaryReducer } = state
    return dictionaryReducer.nsiCheckStatus
  }))


  const handleSearchData = (e) => {
  e.preventDefault();
  switch (true) {
    case e.target.baseURI.includes('certificates'): {
    sessionStorage.setItem(
      'searchParams',
      JSON.stringify(searchParamsFromStateCertificate)
    );
    dispatch(getDataCertificatesBySearchParams(searchParamsFromStateCertificate));
    break;
    }
    case e.target.baseURI.includes('smallboats'): {
    dispatch(getDataBoatsBySearchParams(searchParamsFromStateBoat));
    break;
    }
    case e.target.baseURI.includes('basesbuilding'): {
    dispatch(getDataBasesBuildingBySearchParams(searchParamsFromStateBasesBuilding));
    break;
    }
    default:
  }
  };

  const handleValue = (e) => {
    dispatch(setSearchParams(e.target.dataset.id, e.target.value, e.target.baseURI));
  };
  
  useEffect(() => {
    const paramsFromStorage = JSON.parse(sessionStorage.getItem('searchParams'));
  });
  return (
  <>
    <Form className={styles['form-inputs']}>
    <div className={styles['area-inputs']}>
      {props.inputsHeaders.map((item) => {
      return (
        <Form.Group
        key={item.key}
        className={styles['input-element']}
        controlId="formBasicEmail">
        <Form.Label className={styles['label-text']}>{item.value}</Form.Label>
        {item.type === 'select' && (
          <Form.Select
          className={`mb-2`}
          data-id={item.key}
          onChange={(e) => handleValue(e)}>
          {item.selectOption.map((el) => (
            <option value={el.id}>{el.value}</option>
          ))}
          </Form.Select>
        )}
        {item.type !== 'select' && (
          <Form.Control
          data-id={item.key}
          onChange={(e) => handleValue(e)}
          className={styles['entry-field']}
          type={item.type}
          // value={
          //   window.location.pathname.includes('certificates')
          //   ? searchParamsFromStateCertificate[`${item.key}`] ||
          //     JSON.parse(sessionStorage.getItem('searchParams'))[
          //     `${item.key}`
          //     ] ||
          //     ''
          //   : ''
          // }
          />
          //   {/* {}
          // </Form.Control> */}
        )}
        {item.description !== undefined ? (
          <Form.Text className={styles['description-text']}>
          {item.description}
          </Form.Text>
        ) : null}
        </Form.Group>
      );
      })}
    </div>
    <div className={styles['buttons-block']}>
      <Button
      onClick={(e) => handleSearchData(e)}
      className={styles['button-element']}
      variant="primary">
      Найти &#128269;
      </Button>
      <Button
      className={styles['button-element']}
      variant="primary"
      type="submit">
      Очистить
      </Button>
    </div>
    </Form>
  </>
  );
}
