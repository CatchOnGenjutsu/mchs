import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BoatInfoModalWindow from './ModalWindow/BoatInfoModalWindow';
import { getBoatCardInfo, clearBoatCardInfo } from '../../redux/actions';
import { v4 as uuidv4 } from 'uuid';

import {
  primaryTableLines,
  sizeTableColumns,
  toTableColumns,
  userTableColumns,
  engineTableColumns,
  ownersHistoryTableColumns,
  dealsHistoryTableColumns,
  boatArrestsTableColumns,
  removeBoatArrestsTableColumns,
  noteShipBookTableColumns,
  enterNoteShipBookTableColumns,
  specialMarksTableColumns,
  documentsTableColumns,
} from './infoTablesColumns';

import styles from './BoatInfo.module.css';

export default function BoatInfo(props) {
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalWindowInputs, setModalWindowInputs] = useState({});
  const [dataForEdit, setDataForEdit] = useState({});
  const [type, setType] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const boatInfoFromState = useSelector((state) => {
  const { smallBoatsReducer } = state;
  return smallBoatsReducer.boatInfo;
  });

  const handleEditMode = () => {
  setEditMode(!editMode);
  };

  const handleCloseButton = () => {
  if (editMode) {
    setEditMode(!editMode);
  } else {
    dispatch(clearBoatCardInfo());
    navigate(-1);
  }
  };

  const handleAddNewData = (e) => {
    switch (e.target.id) {
      case 'dealsHistoryTableColumns':
        setModalWindowInputs(dealsHistoryTableColumns);
        break;
      case 'specialMarksTableColumns':
        setModalWindowInputs(specialMarksTableColumns);
        break;
      case 'documentsTableColumns':
        setModalWindowInputs(documentsTableColumns);
        break;
      case 'boatArrestsTableColumns':
        setModalWindowInputs(boatArrestsTableColumns);
        const fields = [
          ...boatArrestsTableColumns.nameColumn.map(item => Object.values(item)).map(elem => elem[2]), 
          ...removeBoatArrestsTableColumns.nameColumn.map(item => Object.values(item)).map(elem => elem[2])
        ]
        let data = {}
        fields.forEach(item => data[item] = null)
        data.isActiv = null
        setDataForEdit(data);
        break;
      default:
        break;
    }
    setType('save');
    setShowModal(true);
  };

  const handleEditNotes = (e) => {
  let data = null;
  switch (e.target.dataset.tabletype) {
    case 'dealsHistoryTableColumns':
      data = boatInfoFromState.boatDeals.find((item) => item.dealId == e.target.id);
      data.docDate = new Date(data.docDate).toISOString().split('T')[0];
      setType('edit');
      setModalWindowInputs(dealsHistoryTableColumns);
      break;
    case 'specialMarksTableColumns':
      data = boatInfoFromState.specMarks.find((item) => item.bsmId == e.target.id);
      setType('edit');
      setModalWindowInputs(specialMarksTableColumns);
      break;
    case 'documentsTableColumns':
      data = boatInfoFromState.documentsDtos.find((item) => item.docid === e.target.id);
      setModalWindowInputs(documentsTableColumns);
      setType('edit');
    case "boatArrestsTableColumns":
      data = boatInfoFromState.boatArrests.find((item) => item.arrId === Number(e.target.id));
      setModalWindowInputs(removeBoatArrestsTableColumns);
      setType('edit');
    default:
    break;
  }
  setDataForEdit(data);
  setShowModal(true);
  };

  useEffect(() => {
  console.log("boatInfoFromState >!>!", boatInfoFromState)
  const pathArray = window.location.pathname.split('/');
  const id = pathArray[pathArray.length - 1];
  if (
    window.performance
    .getEntriesByType('navigation')
    .map((nav) => nav.type)
    .includes('reload')
  ) {
    // dispatch(
    //   getDataCerticatesBySearchParams(
    //   JSON.parse(sessionStorage.getItem('searchParams'))
    //   )
    // );
    dispatch(getBoatCardInfo(id));
  }
  }, []);
  // const tableInfo = [sizeTableColumnsObj]

  return (
  <div className={styles.info__container}>
    <table className={styles['primary-table']}>
    <caption className={styles['primary-caption']}>Информация об объекте:</caption>
    <tbody>
      {primaryTableLines.map((item) => {
      return (
        <tr>
        <td className={styles['line-name']}>{item.value}</td>
        <td className={styles['line-value']}>
          {Object.keys(boatInfoFromState).length !== 0
          ? boatInfoFromState[`${item.id}`] !== undefined &&
            boatInfoFromState[`${item.id}`] !== null
            ? item.key === ''
            ? boatInfoFromState[`${item.id}`]
            : boatInfoFromState[`${item.id}`][`${item.key}`]
            : '—'
          : null}
        </td>
        </tr>
      );
      })}
    </tbody>
    </table>
    <table className={styles['secondary-table']}>
    <caption className={styles['secondary-caption']}>Размерения судна:</caption>
    <thead>
      <tr>
      {sizeTableColumns.map((item) => {
        return (
        <th
          className={styles['proportions-table-th']}
          id={item.id}>
          {item.value}
        </th>
        );
      })}
      </tr>
    </thead>
    <tbody>
      <tr>
      {sizeTableColumns.map((item) => {
        return (
        <td>
          {Object.keys(boatInfoFromState).length !== 0
          ? boatInfoFromState[`${item.id}`] !== undefined &&
            boatInfoFromState[`${item.id}`] !== null
            ? item.key === ''
            ? boatInfoFromState[`${item.id}`]
            : boatInfoFromState[`${item.id}`][`${item.key}`]
            : '—'
          : null}
        </td>
        );
      })}
      </tr>
    </tbody>
    </table>
    <table className={styles['secondary-table']}>
    <caption className={styles['secondary-caption']}>
      Информация о прохождении технического освидетельствования:
    </caption>
    <thead>
      <tr>
      {toTableColumns.map((item) => {
        return (
        <th
          className={`${styles['to-th']} ${styles['to-info-table-th']}`}
          id={item.id}>
          {item.value}
        </th>
        );
      })}
      </tr>
    </thead>
    <tbody>
      {boatInfoFromState.boatToDtoList !== undefined
      ? boatInfoFromState.boatToDtoList.map((elem) => {
        return (
          <tr>
          {toTableColumns.map((item) => {
            return typeof elem[`${item.id}`] === 'boolean' ? (
            elem[`${item.id}`] === true ? (
              <td className={styles['to-th']}>Годное</td>
            ) : (
              <td className={styles['to-th']}>Негодное</td>
            )
            ) : (
            <td className={styles['to-th']}>{elem[`${item.id}`]}</td>
            );
          })}
          </tr>
        );
        })
      : null}
    </tbody>
    </table>
    <table className={`${styles['secondary-table']}`}>
    <caption className={styles['secondary-caption']}>
      Сведения о собственнике:
    </caption>
    <thead>
      <tr>
      {userTableColumns.map((item) => {
        return (
        <th
          className={styles['owner-table-th']}
          id={item.key}>
          {item.value}
        </th>
        );
      })}
      </tr>
    </thead>
    <tbody>
      <tr>
      {userTableColumns.map((item) => {
        return (
        <td>
          {Object.keys(boatInfoFromState).length !== 0
          ? boatInfoFromState[`${item.id}`] !== undefined &&
            boatInfoFromState[`${item.id}`] !== null
            ? item.key === 'fio'
            ? `${boatInfoFromState[`${item.id}`]['personSurname']} ${
              boatInfoFromState[`${item.id}`]['personName']
              } ${boatInfoFromState[`${item.id}`]['personMidname']}`
            : boatInfoFromState[`${item.id}`][`${item.key}`]
            : '—'
          : null}
        </td>
        );
      })}
      </tr>
    </tbody>
    </table>
    <table className={`${styles['secondary-table']}`}>
    <caption className={styles['secondary-caption']}>Двигатели:</caption>
    <thead>
      <tr>
      {engineTableColumns.map((item) => {
        return (
        <th
          className={styles['engine-table-th']}
          id={item.key}>
          {item.value}
        </th>
        );
      })}
      </tr>
    </thead>
    <tbody>
      {boatInfoFromState.enginesList !== undefined
      ? boatInfoFromState.enginesList.map((elem) => {
        return (
          <tr>
          {engineTableColumns.map((item) => {
            return (
            <td className={styles['engine-table-th']}>
              {elem[`${item.key}`]}
            </td>
            );
          })}
          </tr>
        );
        })
      : null}
    </tbody>
    </table>
    <table className={`${styles['secondary-table']}`}>
    <caption className={styles['secondary-caption']}>
      Хронология владельцев судна:
    </caption>
    <thead>
      <tr>
      {ownersHistoryTableColumns.map((item) => {
        return (
        <th
          className={styles['owners-history-table-th']}
          id={item.key}>
          {item.value}
        </th>
        );
      })}
      </tr>
    </thead>
    <tbody>
      <tr>
      {ownersHistoryTableColumns.map((item) => {
        return (
        <td>
          {Object.keys(boatInfoFromState).length !== 0
          ? boatInfoFromState[`${item.id}`] !== undefined &&
            boatInfoFromState[`${item.id}`] !== null
            ? item.key === 'fio'
            ? `${boatInfoFromState[`${item.id}`]['personSurname']} ${
              boatInfoFromState[`${item.id}`]['personName']
              } ${boatInfoFromState[`${item.id}`]['personMidname']}`
            : boatInfoFromState[`${item.id}`][`${item.key}`]
            : '—'
          : null}
        </td>
        );
      })}
      </tr>
    </tbody>
    </table>
    <div>
    <table className={`${styles['secondary-table']}`}>
      <caption className={styles['secondary-caption']}>
      {dealsHistoryTableColumns.caption}
      </caption>
      <thead>
      <tr>
        {dealsHistoryTableColumns.nameColumn.map((item) => {
        if (item.key !== 'docNum' && item.key !== 'docDate')
          if (item.key !== 'docName') {
          return (
            <th
            className={styles.deals_history_table_th}
            id={item.key}>
            {item.value}
            </th>
          );
          } else {
          return (
            <th
            className={styles.deals_history_table_th}
            id={item.key}>
            Наименование, номер и дата документа
            </th>
          );
          }
        })}
        <th
        key={uuidv4()}
        className={`${editMode ? '' : styles.edit__mode} ${
          styles.edit__column
        }`}></th>
      </tr>
      </thead>
      <tbody>
      {boatInfoFromState.boatDeals !== undefined
        ? boatInfoFromState.boatDeals.map((elem) => {
          return (
          <tr>
            {dealsHistoryTableColumns.nameColumn.map((item) => {
            if (item.key !== 'docNum' && item.key !== 'docDate')
              if (item.key !== 'docName') {
              return <td>{elem[`${item.key}`]}</td>;
              } else {
              return (
                <td>
                {elem[`${item.key}`]}, {elem[`docNum`]} от{' '}
                {new Date(elem[`docDate`]).toLocaleDateString()}
                </td>
              );
              }
            })}
            <td
            className={`${editMode ? '' : styles.edit__mode} ${
              styles.edit__column
            }`}
            key={uuidv4()}>
            <button
              className={`${styles.edit__buttons} btn btn-primary ${
              editMode ? '' : styles.edit__mode
              }`}
              data-tabletype={dealsHistoryTableColumns.keyTable}
              id={elem.dealId}
              onClick={(e) => handleEditNotes(e)}>
              &#9998;
            </button>
            </td>
          </tr>
          );
        })
        : null}
      </tbody>
    </table>

    <button
      className={`${styles.add__buttons} btn btn-primary ${
      editMode ? '' : styles.edit__mode
      }`}
      id={dealsHistoryTableColumns.keyTable}
      onClick={(e) => handleAddNewData(e)}>
      +
    </button>
    </div>

    <div>
    <table className={`${styles['secondary-table']}`}>
      <caption className={styles['secondary-caption']}>
      {boatArrestsTableColumns.caption}
      </caption>
      <thead>
      <tr>
        {boatArrestsTableColumns.nameColumn.map((item) => {
        switch (item.key) {
          case 'onDocName':
          return (
            <th
            className={styles.deals_history_table_th}
            id={item.key}>
            Наименование, номер и дата документа
            </th>
          );
          case 'onDocDate':
          break;

          default:
          return (
            <th
            className={styles.deals_history_table_th}
            id={item.key}>
            {item.value}
            </th>
          );
        }
        })}
        <th
        key={uuidv4()}
        className={`${editMode ? '' : styles.edit__mode} ${
          styles.edit__column
        }`}></th>
      </tr>
      </thead>
      <tbody>
      {boatInfoFromState.boatArrests !== undefined
        ?
        boatInfoFromState.boatArrests.map((elem) => {
          return (
            <>
              {!elem.isActiv ? 
              ( 
                <>
                  <tr>
                    {removeBoatArrestsTableColumns.nameColumn.map((item) => {
                      switch (item.key) {
                        case 'offDocName':
                          return (
                            <td>{elem[`offDocName`]} от {new Date(elem[`offDocDate`]).toLocaleDateString()}</td>
                          );
                        case 'offDocDate':
                          break;
                        case 'isActiv':
                          if (elem[`isActiv`]) {
                            return <td>Наложен</td>;
                          } else {
                            return <td>Снят</td>;
                          }

                        default:
                          return <td>{elem[`${item.key}`]}</td>;
                      }
                    })}
                    <td className={`${editMode ? '' : styles.edit__mode} ${styles.edit__column}`} key={uuidv4()}></td>
                  </tr>
                  <tr>
                    {boatArrestsTableColumns.nameColumn.map((item) => {
                      switch (item.key) {
                        case 'onDocName':
                          return (<td>{elem[`${item.key}`]} от {new Date(elem[`onDocDate`]).toLocaleDateString()}</td>);
                        case 'onDocDate':
                          break;
                        case 'isActiv':
                          if (elem[`offDate`] !== null) {
                            return <td>Наложен</td>;
                          } else {
                            return <td>Снят</td>;
                          }
                        default:
                          return <td>{elem[`${item.key}`]}</td>;
                      }
                      })}
                      <td className={`${editMode ? '' : styles.edit__mode} ${styles.edit__column}`} key={uuidv4()}></td>
                  </tr>
                </>
              ) : (
            <tr className={styles.red_text}>
              {boatArrestsTableColumns.nameColumn.map((item) => {
                switch (item.key) {
                case 'onDocName':
                  return (
                  <td>
                    {elem[`${item.key}`]} от {new Date(elem[`onDocDate`]).toLocaleDateString()}
                  </td>
                  );
                case 'onDocDate':
                  break;
                case 'isActiv':
                  return <td>Наложен</td>;
                default:
                  return <td>{elem[`${item.key}`]}</td>;
                }
              })}
              <td
                className={`${editMode ? '' : styles.edit__mode} ${
                styles.edit__column
                }`}
                key={uuidv4()}>
                <button
                  className={`${styles.edit__buttons} btn btn-primary ${
                    editMode ? '' : styles.edit__mode
                  }`}
                  data-tabletype={boatArrestsTableColumns.keyTable}
                  id={elem.arrId}
                  onClick={(e) => handleEditNotes(e)}>
                  &#9998;
                </button>
              </td>
            </tr>
            )}
          </>
          );
        })
        : null}
      </tbody>
    </table>

    <button
      className={`${styles.add__buttons} btn btn-primary ${
      editMode ? '' : styles.edit__mode
      }`}
      id={boatArrestsTableColumns.keyTable}
      onClick={(e) => handleAddNewData(e)}>
      +
    </button>
    </div>
    <table className={`${styles['secondary-table']}`}>
    <caption className={styles['secondary-caption']}>
      Отметки о внесении изменений в судовую книгу:
    </caption>
    <thead>
      <tr>
      {noteShipBookTableColumns.map((item) => {
        return (
        <th
          className={styles['owners-history-table-th']}
          id={item.key}>
          {item.value}
        </th>
        );
      })}
      </tr>
    </thead>
    <tbody>
      <tr>
      {noteShipBookTableColumns.map((item) => {
        return (
        <td>
          {Object.keys(boatInfoFromState).length !== 0
          ? boatInfoFromState[`${item.id}`] !== undefined &&
            boatInfoFromState[`${item.id}`] !== null
            ? boatInfoFromState[`${item.id}`][`${item.key}`]
            : '—'
          : null}
        </td>
        );
      })}
      </tr>
    </tbody>
    </table>
    <table className={`${styles['secondary-table']}`}>
    <caption className={styles['secondary-caption']}>
      Отметки о внесении в судовую книгу / исключении из судовой книги судна:
    </caption>
    <thead>
      <tr>
      {enterNoteShipBookTableColumns.map((item) => {
        return (
        <th
          className={styles['owners-history-table-th']}
          id={item.key}>
          {item.value}
        </th>
        );
      })}
      </tr>
    </thead>
    <tbody>
      <tr>
      {enterNoteShipBookTableColumns.map((item) => {
        return (
        <td>
          {Object.keys(boatInfoFromState).length !== 0
          ? boatInfoFromState[`${item.id}`] !== undefined &&
            boatInfoFromState[`${item.id}`] !== null
            ? boatInfoFromState[`${item.id}`][`${item.key}`]
            : '—'
          : null}
        </td>
        );
      })}
      </tr>
    </tbody>
    </table>
    <div>
    <table className={`${styles['secondary-table']}`}>
      <caption className={styles['secondary-caption']}>
      {specialMarksTableColumns.caption}
      </caption>
      <thead>
      <tr>
        {specialMarksTableColumns.nameColumn.map((item) => {
        return (
          <th
          className={styles.deals_history_table_th}
          id={item.key}>
          {item.value}
          </th>
        );
        })}
        <th
        key={uuidv4()}
        className={`${editMode ? '' : styles.edit__mode} ${
          styles.edit__column
        }`}></th>
      </tr>
      </thead>
      <tbody>
      {boatInfoFromState.specMarks !== undefined
        ? boatInfoFromState.specMarks.map((elem) => {
          return (
          <tr>
            {specialMarksTableColumns.nameColumn.map((item) => {
            switch (item.type) {
              case 'checkbox':
              return (
                <td>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  id={elem.bsmId}
                  checked={elem.bsmLock}
                  disabled
                />
                </td>
              );
              default:
              if (elem.bsmLock) {
                return (
                <td className={styles.red_text}>{elem[`${item.key}`]}</td>
                );
              } else {
                return <td>{elem[`${item.key}`]}</td>;
              }
            }
            })}
            <td
            className={`${editMode ? '' : styles.edit__mode} ${
              styles.edit__column
            }`}
            key={uuidv4()}>
            <button
              className={`${styles.edit__buttons} btn btn-primary ${
              editMode ? '' : styles.edit__mode
              }`}
              data-tabletype={specialMarksTableColumns.keyTable}
              id={elem.bsmId}
              onClick={(e) => handleEditNotes(e)}>
              &#9998;
            </button>
            </td>
          </tr>
          );
        })
        : null}
      </tbody>
    </table>

    <button
      className={`${styles.add__buttons} btn btn-primary ${
      editMode ? '' : styles.edit__mode
      }`}
      id={specialMarksTableColumns.keyTable}
      onClick={(e) => handleAddNewData(e)}>
      +
    </button>
    </div>
    <div>
    <table className={`${styles['secondary-table']}`}>
      <caption className={styles['secondary-caption']}>
      {documentsTableColumns.caption}
      </caption>
      <thead>
      <tr>
        {documentsTableColumns.nameColumn.map((item) => {
        if (item.key !== 'docfile') {
          return (
          <th
            className={styles.deals_history_table_th}
            id={item.key}>
            {item.value}
          </th>
          );
        }
        })}
        <th
        key={uuidv4()}
        className={`${editMode ? '' : styles.edit__mode} ${
          styles.edit__column
        }`}></th>
      </tr>
      </thead>
      <tbody>
      {boatInfoFromState.documentsDtos !== undefined
        ? boatInfoFromState.documentsDtos.map((elem) => {
          return (
          <tr>
            {documentsTableColumns.nameColumn.map((item) => {
            if (item.key !== 'docfile') {
              if (item.type !== 'date') {
              return (
                <td>
                <a
                  href={`http://file:${elem.filePath}`}
                  target="_blank">
                  {elem[`${item.key}`]}
                </a>
                </td>
              );
              } else {
              return (
                <td>
                {new Date(elem[`${item.key}`]).toLocaleDateString()}
                </td>
              );
              }
            }
            })}
            <td
            className={`${editMode ? '' : styles.edit__mode} ${
              styles.edit__column
            }`}
            key={uuidv4()}>
            <button
              className={`${styles.edit__buttons} btn btn-primary ${
              editMode ? '' : styles.edit__mode
              }`}
              data-tabletype={documentsTableColumns.keyTable}
              id={elem.docid}
              onClick={(e) => handleEditNotes(e)}>
              &#9998;
            </button>
            </td>
          </tr>
          );
        })
        : null}
      </tbody>
    </table>

    <button
      className={`${styles.add__buttons} btn btn-primary ${
      editMode ? '' : styles.edit__mode
      }`}
      id={documentsTableColumns.keyTable}
      onClick={(e) => handleAddNewData(e)}>
      +
    </button>
    </div>
    <div className="d-flex justify-content-around mt-5">
    <button
      className={`btn btn-primary ${editMode ? styles.edit__mode : ''}`}
      onClick={() => handleEditMode()}>
      Редактировать
    </button>
    <button
      className="btn btn-danger"
      onClick={() => handleCloseButton()}>
      Закрыть
    </button>
    </div>
    {/*{tableInfo.map((el)=> createTable(el))}*/}
    {showModal && (
    <BoatInfoModalWindow
      boatIdModal={boatInfoFromState.cardid}
      showModal={showModal}
      setShowModal={setShowModal}
      modalWindowInputs={modalWindowInputs}
      dataForEdit={dataForEdit}
      setDataForEdit={setDataForEdit}
      type={type}
      setType={setType}
    />
    )}
  </div>
  );
}
