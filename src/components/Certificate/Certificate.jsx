import React from "react";
import styles from "./Certificate.module.css";
import photoImg from "./testImgAfterDelete/USA.jpg"
import {arrayOptionsTables} from "./tableOptions";
import {useSelector} from "react-redux";

export default function Certificate(props) {
    const licenseInfoFromState = useSelector((state) => {
        const {certificateReducer} = state;
        return certificateReducer.licenseInfo;
    });
    console.log(licenseInfoFromState)
    return (
        <div className={styles.wrapper}>
            <h2>Удостоверение №{licenseInfoFromState.boatDrivingLicense.licenseNum}</h2>
            <div className={`${styles.main__data__container}`}>
                <div className={styles.photo__container}>
                    <img src={photoImg} className="img-fluid" alt="main Photo"/>
                </div>
                <div className={styles.fio__info}>
                    <h3>Основные данные</h3>
                    <div className={styles.block__data__container}>
                        <div className={styles.data}>
                            <p>Фамилия</p>
                            <span>{licenseInfoFromState.surname}</span>
                        </div>
                        <div className={styles.data}>
                            <p>Имя</p>
                            <span>{licenseInfoFromState.name}</span>
                        </div>
                        <div className={styles.data}>
                            <p>Отчество</p>
                            <span>{licenseInfoFromState.midname}</span>
                        </div>
                        <div className={`${styles.data} flex-wrap`}>
                            <div className={styles.data}>
                                <p>Дата рождения</p>
                                <span>тут будут данные</span>
                            </div>

                            <div className={styles.data}>
                                <p>Место рождения</p>
                                <span>тут будут данные</span>
                            </div>
                        </div>
                        <div className={styles.data}>
                            <p>Гражданство</p>
                            <span>тут будут данные</span>
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
                                <span>тут будут данные</span>
                            </div>
                            <div className={`d-flex`}>
                                <p>Район</p>
                                <span>тут будут данные</span>
                            </div>
                        </div>
                        <div className={`${styles.data} flex-wrap`}>
                            <div className={`d-flex`}>
                                <p>Область</p>
                                <span>тут будут данные</span>
                            </div>
                            <div className={`d-flex`}>
                                <p>Город</p>
                                <span>тут будут данные</span>
                            </div>
                        </div>
                        <div className={styles.data}>
                            <p>Улица</p>
                            <span>тут будут данные</span>
                        </div>
                        <div className={`${styles.data} flex-wrap`}>
                            <div className={`d-flex`}>
                                <p>Дом</p>
                                <span>125</span>
                            </div>
                            <div className={`${styles.data} flex-wrap`}>
                                <div className={`d-flex`}>
                                    <p>Корпус</p>
                                    <span>5</span>
                                </div>
                                <div className={`d-flex`}>
                                    <p>Квартира</p>
                                    <span>115</span>
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
                                <span>тут будут данные</span>
                            </div>
                            <div className={styles.data__property}>
                                <p>Серия</p>
                                <span>тут будут данные</span>
                            </div>
                        </div>
                        <div className={`${styles.data} flex-wrap`}>
                            <div className={styles.data__property}>
                                <p>Номер</p>
                                <span>тут будут данные</span>
                            </div>
                            <div className={styles.data__property}>
                                <p>Дата выд.</p>
                                <span>тут будут данные</span>
                            </div>
                        </div>
                        <div className={`${styles.data}  flex-wrap`}>
                            <p>Кем выдан</p>
                            <span>тут будут данные</span>
                        </div>
                        <div className={`${styles.data}  flex-wrap`}>
                            <p style={{minWidth: '13em'}}>Идентификационный номер</p>
                            <span>тут будут данные</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.certificate__container}`}>
                <h3>Удостоверение</h3>
                <div className={styles.block__data__container}>
                    <div className={`${styles.data} flex-wrap`}>
                        <p>Номер удостоверения</p>
                        <span>тут будут данные</span>
                    </div>
                    <div className={`${styles.data} flex-wrap`}>
                        <div className={styles.data__property}>
                            <p>Тип удостоверения</p>
                            <span>тут будут данные</span>
                        </div>
                        <div className={styles.data__property}>
                            <p>Дата выдачи</p>
                            <span>тут будут данные</span>
                        </div>
                    </div>
                    <div className={`${styles.data} flex-wrap`}>
                        <div className={styles.data__property}>
                            <p>Действительно для</p>
                            <span>тут будут данные</span>
                        </div>
                        <div className={styles.data__property}>
                            <p>Действительно до</p>
                            <span>тут будут данные</span>
                        </div>
                    </div>
                    <div className={`${styles.data}  flex-wrap`}>
                        <p>Выдано</p>
                        <span>тут будут данные</span>
                    </div>
                </div>
            </div>
            <div className={styles.guide__marks__container}>
                <h3>Отметки</h3>
                <div className={styles.block__data__container}>
                    {
                        arrayOptionsTables.map(el => {
                            return (
                                <div key={el.keyTable}>
                                    <h6 className='text-secondary'>{el.caption}</h6>
                                    <table className="table table-bordered border-secondary bg-white">
                                        <thead>
                                        <tr>
                                            {Object.entries(el.nameColoumn)
                                                .map((column) => (<th key={column[0]} scope='col'
                                                                      className={'organ number position fio note'.includes(column[0]) ? 'col-4 text-center' : 'col-2 text-center'}>{column[1]}</th>))}
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            {Object.keys(el.nameColoumn)
                                                .map(column => (<td key={column}>тут будут данные</td>))}
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='d-flex justify-content-around mt-5'>
                <button className='btn btn-secondary'>Экспорт в файл</button>
                <button className='btn btn-danger'>Закрыть</button>
            </div>
        </div>
    );
}
