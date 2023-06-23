import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {ProgressBar} from "react-loader-spinner";
import SearchBlock from "../../components/StatisticsAnalytics/Reports/commonComponents/SearchBlock/SearchBlock";
import {fieldsForSearchQuarterly, getOptionsForField, setOptionsForField} from "./settingsQuarterlyReport";
import {API_GET_QUARTERLY_REPORT} from "../../constants/constants";
import DocumentPreview
    from "../../components/StatisticsAnalytics/Reports/commonComponents/DocumentPreview/DocumentPreview";

function QuarterlyReport() {
    const isLoading = useSelector(state => state.dictionaryReducer.isLoading);
    const [loader,setLoader]=useState(false)
    const [DocsFile,setDocsFile]=useState("")
    const [ExcelFile,setExcelFile]=useState("")
    const [PDFFile,setPDFFile]=useState("")
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
            <h2>Квартальный отчет</h2>
            <SearchBlock
                fields = {fieldsForSearchQuarterly}
                setOptionsForField={setOptionsForField}
                urlForReport = {API_GET_QUARTERLY_REPORT }
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

export default QuarterlyReport;