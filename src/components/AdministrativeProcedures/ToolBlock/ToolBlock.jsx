import React from 'react';
import {styles} from './ToolBlock.module.css'
import edit_icon from '../../../resourсes/edit-icon.svg'
import add_icon from '../../../resourсes/add-icon.svg'
import open_icon from '../../../resourсes/open-icon.svg'
import { useNavigate } from 'react-router-dom';
function ToolBlock({data,id}) {
    const url = new URL(document.location.href)
    const pathName = url.pathname.slice(1)
    console.log(`${url.origin}/smallboats/boatId/${id}`)
    const navigate = useNavigate()

    const handleButtonAdd = (event)=>{
        switch (true) {
            case  (pathName.includes('reginformationchanges/searchboatcard')&& event.currentTarget.id === 'open'):{
               navigate(`/smallboats/boatId/${id}`)
                break;
            }
            case pathName.includes('reginformationchanges'):{
                navigate('searchboatcard')
                break;
            }
        }
    }
console.log(pathName)
    return (
        <>
            <div className={`d-flex mb-2`} >
                {pathName==='reginformationchanges'?(
                    <button id={`edit`}  disabled={ Boolean(!id) }
                            className={`btn btn-danger btn-sm ms-2`}
                    ><img src={edit_icon} alt="редактировать"/></button>
                ):''}

                <button id={`add`}
                        className={`btn btn-danger btn-sm ms-2`}
                        onClick={handleButtonAdd}
                ><img src={add_icon} alt="добавить"/></button>
                {pathName!=='reginformationchanges'?(
                    <button id={`open`}
                    disabled={ Boolean(!id)}
                    className={`btn btn-danger btn-sm ms-2`}
                    onClick={handleButtonAdd}
                    ><img src={open_icon} alt="открыть"/></button>
                    ):''}
            </div>
        </>
    );
}

export default ToolBlock;