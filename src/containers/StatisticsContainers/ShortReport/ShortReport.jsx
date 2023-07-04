import React, {useState} from 'react';
import SearchBlock from "../../components/StatisticsAnalytics/Reports/commonComponents/SearchBlock/SearchBlock";
import {fieldsForSearchShortReport, getOptionsForField, setOptionsForField} from "./settingsShortReport";
import {API_GET_SHORT_REPORT} from "../../constants/constants";
import {useSelector} from "react-redux";
import {ProgressBar} from "react-loader-spinner";

function ShortReport() {
    const [DocsFile,setDocsFile]=useState("")
    const [ExcelFile,setExcelFile]=useState("")
    const [PDFFile,setPDFFile]=useState("")
    const [loader,setLoader]=useState(false)
    const [data,setData]=useState([])
   function convertDate(propsDate) {
       const date = new Date(propsDate);
       const day = String(date.getDate()).padStart(2, '0');
       const month = String(date.getMonth() + 1).padStart(2, '0');
       const year = date.getFullYear();
        return `${day}.${month}.${year}`
   }
    return (
        <>
            <h2>Краткий отчет</h2>
            <SearchBlock
                fields = {fieldsForSearchShortReport}
                setOptionsForField={setOptionsForField}
                urlForReport = {API_GET_SHORT_REPORT}
                setDocsFile = {setDocsFile}
                setExcelFile = {setExcelFile}
                setPDFFile={setPDFFile}
                getOptionsForField={getOptionsForField}
                setLoader = {setLoader}
                setDataFotShortReport={setData}
            />
            {data.length !== 0 && (
                <table>
                    <caption>Краткий отчет за период с {convertDate(data.date1)} по {convertDate(data.date2)}</caption>
                    <thead>
                    <tr>
                        <th>Параметр</th>
                        <th>Значение</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.data.map((item) => {
                        return (
                            <tr>
                                <td>{item.parameter}</td>
                                <td>{item.value !== null ? item.value : "—"}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            )}
            {loader &&(
                <div className={'d-flex flex-column align-items-center'}>
                    <ProgressBar
                        height="80"
                        width="80"
                        ariaLabel="progress-bar-loading"
                        wrapperStyle={{}}
                        wrapperClass="progress-bar-wrapper"
                        borderColor="#F4442E"
                        barColor="#51E5FF"
                    />
                </div>
            )}
        </>
    );
}

export default ShortReport;