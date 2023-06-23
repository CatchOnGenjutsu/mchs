import React, {useState} from 'react';
import SearchBlock from "../../components/StatisticsAnalytics/Reports/commonComponents/SearchBlock/SearchBlock";
import DocumentPreview
    from "../../components/StatisticsAnalytics/Reports/commonComponents/DocumentPreview/DocumentPreview";
import {fieldsForSearch,getOptionsForField,setOptionsForField} from "./settingsForWeeklyReport";
import { ProgressBar } from "react-loader-spinner";
import {useSelector} from "react-redux";
import {API_GET_WEEKLY_REPORT} from "../../constants/constants";


function WeeklyReport() {
    const isLoading = useSelector(state => state.dictionaryReducer.isLoading);
    const [DocsFile,setDocsFile]=useState("")
    const [ExcelFile,setExcelFile]=useState("")
    const [PDFFile,setPDFFile]=useState("")
    const [loader,setLoader]=useState(false)

    if(isLoading){
        return (
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
        )
    }
    return (
        <>
            <h2>Еженедельный отчет</h2>
            <SearchBlock
              fields = {fieldsForSearch}
              setOptionsForField={setOptionsForField}
              urlForReport = {API_GET_WEEKLY_REPORT}
              setDocsFile = {setDocsFile}
              setExcelFile = {setExcelFile}
              setPDFFile={setPDFFile}
              getOptionsForField={getOptionsForField}
              setLoader = {setLoader}
            />
            <DocumentPreview
            pdf={PDFFile}
            excel={ExcelFile}
            />
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

export default WeeklyReport;