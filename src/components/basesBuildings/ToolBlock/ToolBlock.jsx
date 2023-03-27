import React, {useState} from 'react';
import {styles} from './ToolBlock.module.css'
import edit_icon from '../../../resourсes/edit-icon.svg'
import add_icon from '../../../resourсes/add-icon.svg'
import delete_icon from '../../../resourсes/delete_icon.svg'

function ToolBlock({data,buildingId,showForm}) {
    return (
        <>
        <div className={`d-flex mb-2`}>
            <button data-type={`edit`} onClick={showForm} disabled={!data.length||!buildingId} className={`btn btn-danger btn-sm ms-2`}><img src={edit_icon} alt="редактировать"/></button>
            <button data-type={`add`} onClick={showForm} disabled={!data.length} className={`btn btn-danger btn-sm ms-2`}><img src={add_icon} alt="добавить"/></button>
        </div>

        </>
    );
}

export default ToolBlock;