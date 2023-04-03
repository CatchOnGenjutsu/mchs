import React, { useEffect, useState } from 'react';
import styles from './Certificate.module.css';
import photoImg from './testImgAfterDelete/USA.jpg';
import { v4 as uuidv4 } from 'uuid';
import {
  boatDrivingLicenseSpecmarksList,
  tableLossOfControl,
  tableCertificateWithdrawal,
} from './tableOptions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CertificateModalWindow from './ModalWindow/CertificateModalWindow';
import { getDataCertificatesBySearchParams } from '../../redux/actions';
import { getLicenseById } from '../../redux/certificateReducer/actionsCertificate';

export default function Certificate(props) {
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalWindowInputs, setModalWindowInputs] = useState(null);
  const [dataForEdit, setDataForEdit] = useState(null);
  const [type, setType] = useState(null);


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const licenseInfoFromState = useSelector((state) => {
    const { certificateReducer } = state;
    return certificateReducer.licenseInfo;
  });

  const specMarkFromState = useSelector((state) => {
    const { certificateReducer } = state;
    return certificateReducer.licenseSpecmarksList;
  });

  const licenseConfFromState = useSelector((state) => {
    const { certificateReducer } = state;
    return certificateReducer.licenseConfList;
  });

  const handleEditMode = () => {
  setEditMode(!editMode);
  };

  const handleCloseButton = () => {
  if (editMode) {
    setEditMode(!editMode);
  } else {
    navigate(-1);
  }
  };

  const handleAddNotes = (e) => {
  switch (e.target.id) {
    case 'lossControl':
    setModalWindowInputs(tableLossOfControl);
    break;
    case 'certificateWithdrawal':
    setModalWindowInputs(tableCertificateWithdrawal);
    break;
    case 'boatDrivingLicenseSpecmarksList':
    setModalWindowInputs(boatDrivingLicenseSpecmarksList);
    break;
    default:
    break;
  }
  setType("save");
  setShowModal(true);
  };

  const handleEditNotes = (e) => {
    const data = specMarkFromState.find((item) => item.id == e.target.id);
    setType("edit");
    setModalWindowInputs(boatDrivingLicenseSpecmarksList);
    setDataForEdit(data);
    setShowModal(true);
  };

  useEffect(() => {
  const pathArray = window.location.pathname.split('/');
  const id = pathArray[pathArray.length - 1];
  if (
    window.performance
    .getEntriesByType('navigation')
    .map((nav) => nav.type)
    .includes('reload')
  ) {
    dispatch(
    getDataCertificatesBySearchParams(
      JSON.parse(sessionStorage.getItem('searchParams'))
    )
    );
    dispatch(getLicenseById(id));
  }
  }, []);

  return (
  <div className={styles.wrapper}>
    <h2>Удостоверение №{licenseInfoFromState.licenseNum}</h2>
    <div className={`${styles.main__data__container}`}>
    <div className={styles.photo__container}>
      <img
      src={photoImg}
      className="img-fluid"
      alt="main Photo"
      />
    </div>
    <div className={styles.fio__info}>
      <h3>Основные данные</h3>
      <div className={styles.block__data__container}>
      <div className={styles.data}>
        <p>Фамилия</p>
        <span>{licenseInfoFromState.surname || '-'}</span>
      </div>
      <div className={styles.data}>
        <p>Имя</p>
        <span>{licenseInfoFromState.name || '-'}</span>
      </div>
      <div className={styles.data}>
        <p>Отчество</p>
        <span>{licenseInfoFromState.midname || '-'}</span>
      </div>
      <div className={`${styles.data} flex-wrap`}>
        <div className={styles.data}>
        <p>Дата рождения</p>
        <span>{new Date(licenseInfoFromState.birthDate).toLocaleDateString() || '-'}</span>
        </div>

        <div className={styles.data}>
        <p>Место рождения</p>
        <span>{licenseInfoFromState.birthPlace || '-'}</span>
        </div>
      </div>
      <div className={styles.data}>
        <p>Гражданство</p>
        <span>{licenseInfoFromState.residence || '-'}</span>
      </div>
      </div>
    </div>
    </div>
    <div className={`${styles.passport__address__container}`}>
    <div className={`${styles.address__container}`}>
      <h3>Адрес места регистрации</h3>
      <div className={styles.block__data__container}>
      <div className={`${styles.data} flex-wrap`}>
        <div className={`d-flex`}>
        <p>Страна</p>
        <span>Республика Беларусь</span>
        </div>
        <div className={`d-flex`}>
        <p>Район</p>
        <span>{licenseInfoFromState.rayonId || '-'}</span>
        </div>
      </div>
      <div className={`${styles.data} flex-wrap`}>
        <div className={`d-flex`}>
        <p>Область</p>
        <span>{licenseInfoFromState.oblId || '-'}</span>
        </div>
        <div className={`d-flex`}>
        <p>Город</p>
        <span>{licenseInfoFromState.gorodId || '-'}</span>
        </div>
      </div>
      <div className={styles.data}>
        <p>Улица</p>
        <span>{licenseInfoFromState.ulica || '-'}</span>
      </div>
      <div className={`${styles.data} flex-wrap`}>
        <div className={`d-flex`}>
        <p>Дом</p>
        <span>{licenseInfoFromState.dom || '-'}</span>
        </div>
        <div className={`${styles.data} flex-wrap`}>
        <div className={`d-flex`}>
          <p>Корпус</p>
          <span>{licenseInfoFromState.korpus || '-'}</span>
        </div>
        <div className={`d-flex`}>
          <p>Квартира</p>
          <span>{licenseInfoFromState.kv || '-'}</span>
        </div>
        </div>
      </div>
      </div>
    </div>
    <div className={`${styles.passport__container}`}>
      <h3>Паспортные данные</h3>
      <div className={styles.block__data__container}>
      <div className={`${styles.data} flex-wrap`}>
        <div className={styles.data__property}>
        <p>Документ</p>
        <span>{licenseInfoFromState.docType || '-'}</span>
        </div>
        <div className={styles.data__property}>
        <p>Серия</p>
        <span>{licenseInfoFromState.docSeries || '-'}</span>
        </div>
      </div>
      <div className={`${styles.data} flex-wrap`}>
        <div className={styles.data__property}>
          <p>Номер</p>
          <span>{licenseInfoFromState.docNum || '-'}</span>
        </div>
        <div className={styles.data__property}>
        <p>Дата выд.</p>
        <span>{new Date(licenseInfoFromState.docDateIssue).toLocaleDateString() || '-'}</span>
        </div>
      </div>
      <div className={`${styles.data}  flex-wrap`}>
        <p>Кем выдан</p>
        <span>{licenseInfoFromState.docDepartment || '-'}</span>
      </div>
      <div className={`${styles.data}  flex-wrap`}>
        <p style={{ minWidth: '13em' }}>Идентификационный номер</p>
        <span>{licenseInfoFromState.persNum || '-'}</span>
      </div>
      </div>
    </div>
    </div>
    <div className={`${styles.certificate__container}`}>
    <h3>Удостоверение</h3>
    <div className={styles.block__data__container}>
      <div className={`${styles.data} flex-wrap`}>
      <p>Номер удостоверения</p>
      <span>{licenseInfoFromState.licenseNum || '-'}</span>
      </div>
      <div className={`${styles.data} flex-wrap`}>
      <div className={styles.data__property}>
        <p>Тип удостоверения</p>
        <span>{licenseInfoFromState.licenseType || '-'}</span>
      </div>
      <div className={styles.data__property}>
        <p>Дата выдачи</p>
        <span>{new Date(licenseInfoFromState.licenseDate.slice(0, 10)).toLocaleDateString() || '-'}</span>
      </div>
      </div>
      <div className={`${styles.data} flex-wrap`}>
      <div className={styles.data__property}>
        <p>Действительно для</p>
        <span>{licenseInfoFromState.validFor || '-'}</span>
      </div>
      <div className={styles.data__property}>
        <p>Действительно до</p>
        <span>{new Date(licenseInfoFromState.licenseDateEnd.slice(0, 10)).toLocaleDateString() || '-'}</span>
      </div>
      </div>
      <div className={`${styles.data}  flex-wrap`}>
      <p>Выдано</p>
      <span>ГИМС</span>
      </div>
    </div>
    </div>
    <div className={styles.guide__marks__container}>
      <h3>Отметки</h3>
      <div className={styles.block__data__container}>
        <div key={tableLossOfControl.keyTable}>
          <h6 className="text-secondary">{tableLossOfControl.caption}</h6>
          <table className = {`table table-bordered border-secondary bg-white`}>
            <thead>
              <tr>
                {tableLossOfControl.nameColumn.map((item) => {
                  return (
                    <th
                      className = {
                        'confOrg confDocNum userPositions name mark'.includes(item.key)
                          ? 'col-4 text-center'
                          : 'col-2 text-center'
                        }
                      id = {item.key}>
                      {item.value}
                    </th>
                  );
                }
                )}
              </tr>
            </thead>
            <tbody>
            {licenseConfFromState.map((elem) => {
              if (elem.confiscation['code'] === 1) {
                return (
                  <tr>
                    {tableLossOfControl.nameColumn.map((item) => {
                      if (item.key !== 'confDate' && item.key !== 'confDateEnd') {
                        return <td>{elem[`${item.key}`]}</td>;
                      } else {
                        return (
                          <td>
                            {new Date(elem[`${item.key}`]).toLocaleDateString()}
                          </td>
                        );
                      }
                    })}
                  </tr>
                );
              }
            })}
            </tbody>
          </table>
          <button
            className={`${styles.add__buttons} btn btn-primary ${
            editMode ? '' : styles.edit__mode
            }`}
            id={tableLossOfControl.keyTable}
            onClick={(e) => handleAddNotes(e)}>
            +
          </button>
        </div>
        <div key={tableCertificateWithdrawal.keyTable}>
          <h6 className="text-secondary">{tableCertificateWithdrawal.caption}</h6>
          <table className = {`table table-bordered border-secondary bg-white`}>
            <thead>
              <tr>
                {tableCertificateWithdrawal.nameColumn.map((item) => {
                  return (
                    <th
                      className = {
                        'confOrg confDocNum userPositions name mark'.includes(item.key)
                          ? 'col-4 text-center'
                          : 'col-2 text-center'
                        }
                      id = {item.key}>
                      {item.value}
                    </th>
                  );
                }
                )}
              </tr>
            </thead>
            <tbody>
            {licenseConfFromState.map((elem) => {
              if (elem.confiscation['code'] === 2) {
                return (
                  <tr>
                    {tableCertificateWithdrawal.nameColumn.map((item) => {
                      switch (item.key) {
                        case 'userPositions':
                          return (
                          <td key={uuidv4()}>
                            {elem.userid[`${item.key}`]['posName']}
                          </td>
                          );
                        case 'name':
                          return <td key={uuidv4()}>{elem.userid['name']}</td>;
                        case 'confDate':
                          return (
                          <td key={uuidv4()}>
                            {new Date(elem[`${item.key}`]).toLocaleDateString()}
                          </td>
                          );
                        default:
                          return <td key={uuidv4()}>{elem[`${item.key}`]}</td>;
                      }
                    })}
                  </tr>
                );
              }
            })}
            </tbody>
          </table>
          <button
            className={`${styles.add__buttons} btn btn-primary ${
            editMode ? '' : styles.edit__mode
            }`}
            id={tableCertificateWithdrawal.keyTable}
            onClick={(e) => handleAddNotes(e)}>
            +
          </button>
        </div>
        <div key={boatDrivingLicenseSpecmarksList.keyTable}>
          <h6 className="text-secondary">{boatDrivingLicenseSpecmarksList.caption}</h6>
          <table className = {`table table-bordered border-secondary bg-white`}>
            <thead>
              <tr>
                {boatDrivingLicenseSpecmarksList.nameColumn.map((item) => {
                  return (
                    <th
                      className = {
                        'confOrg confDocNum userPositions name mark'.includes(item.key)
                          ? 'col-4 text-center'
                          : 'col-2 text-center'
                        }
                      id = {item.key}>
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
            {specMarkFromState.map((elem) => {
              return (
                <tr>
                  {boatDrivingLicenseSpecmarksList.nameColumn.map((item) => {
                    if (item.key !== 'markDate') {
                      return <td>{elem[`${item.key}`]}</td>;
                    } else {
                      return (
                        <td>
                          {new Date(elem[`${item.key}`]).toLocaleDateString()}
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
                        id={elem.id}
                        onClick={(e) => handleEditNotes(e)}>
                        &#9998;
                      </button>
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>

          <button
            className={`${styles.add__buttons} btn btn-primary ${
            editMode ? '' : styles.edit__mode
            }`}
            id={boatDrivingLicenseSpecmarksList.keyTable}
            onClick={(e) => handleAddNotes(e)}>
            +
          </button>
        </div>
      </div>
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
    {showModal && (
    <CertificateModalWindow
      licenseIdModal={licenseInfoFromState.licenseId}
      setShowModal={setShowModal}
      showModal={showModal}
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
