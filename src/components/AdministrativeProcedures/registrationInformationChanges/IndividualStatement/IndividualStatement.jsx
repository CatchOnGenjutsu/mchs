import React from 'react';
import {Form} from 'react-bootstrap';
import styles from './IndividualStatement.module.css'

function IndividualStatement(props) {

    return (
        <div className='d-flex flex-column align-items-center'>
            <h2>Заявление для физ.лиц</h2>
            <p>о государственной регистрации изменений сведений, подлежащих внесению в судовую книгу для маломерного судна, за исключением гребных лодок, байдарок и надувных судов грузоподъемностью менее 225 килограммов</p>
            <div className={styles['form-container']}>
                <Form>
                    <Form.Group controlId="regNum" className={styles['reg-number']}>
                        <Form.Label>Регистрационный номер маломерного судна:</Form.Label>
                        <Form.Control type="text" readOnly={true} disabled={true} />
                    </Form.Group>
                        <Form.Group controlId="regNum" className={styles['reg-number']}>
                            <Form.Label>Субъект хозяйствования:</Form.Label>
                            <Form.Control type="text" readOnly={true} disabled={true} />
                        </Form.Group>
                    {/*<Form.Select*/}
                    {/*    className={`mb-2`}*/}
                    {/*    data-id={item.key}*/}
                    {/*    onChange={(e) => handleValue(e)}>*/}
                    {/*    {item.selectOption.map((el) => (*/}
                    {/*        <option value={el.id}>{el.value}</option>*/}
                    {/*    ))}*/}
                    {/*</Form.Select>*/}
                    <Form.Group controlId="regNum" className={styles['reg-number']}>
                        <Form.Label>Номер судового билета:</Form.Label>
                        <Form.Control type="text" readOnly={true} disabled={true} />
                    </Form.Group>
                    <Form.Group controlId="regNum" className={styles['reg-number']}>
                        <Form.Label>Дата выдачи судового билета:</Form.Label>
                        <Form.Control type="text" readOnly={true} disabled={true} />
                    </Form.Group>
                </Form>
            </div>

        </div>
    );
}

export default IndividualStatement;
