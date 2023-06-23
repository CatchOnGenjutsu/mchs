import React, {useState} from 'react';
import SearchBlock from "../../components/StatisticsAnalytics/Reports/commonComponents/SearchBlock/SearchBlock";
import {
    fieldsForSearchGraphs,
    getOptionsForField,
    setOptionsForField
} from "./settingsForGraphsReport";
import {API_GET_QUARTERLY_REPORT} from "../../constants/constants";
import DocumentPreview
    from "../../components/StatisticsAnalytics/Reports/commonComponents/DocumentPreview/DocumentPreview";
import {useSelector} from "react-redux";
import {ProgressBar} from "react-loader-spinner";

function GraphsReport() {
    const isLoading = useSelector(state => state.dictionaryReducer.isLoading);
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
            <h2>Графики</h2>
            <SearchBlock
                fields = {fieldsForSearchGraphs}
                setOptionsForField={setOptionsForField}
                urlForReport = {API_GET_QUARTERLY_REPORT }
                setExcelFile = {setExcelFile}
                setPDFFile={setPDFFile}
                getOptionsForField={getOptionsForField}
            />
            <DocumentPreview
                pdf={PDFFile}
                excel={ExcelFile}
            />
        </>

    );
}

export default GraphsReport;