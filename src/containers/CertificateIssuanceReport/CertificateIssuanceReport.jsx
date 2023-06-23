import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {ProgressBar} from "react-loader-spinner";
import SearchBlock from "../../components/StatisticsAnalytics/Reports/commonComponents/SearchBlock/SearchBlock";
import {
    fieldsForSearchCertificate, getOptionsForField,
    setOptionsForField
} from "./settingsForCertificateIssuanceReport";
import {API_GET_CERTIFICATE_REPORT} from "../../constants/constants";
import DocumentPreview
    from "../../components/StatisticsAnalytics/Reports/commonComponents/DocumentPreview/DocumentPreview";

function CertificateIssuanceReport() {
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
            <h2>Отчет по выдаче удостоверений</h2>
            <SearchBlock
                fields = {fieldsForSearchCertificate}
                setOptionsForField={setOptionsForField}
                getOptionsForField={getOptionsForField}
                urlForReport = {API_GET_CERTIFICATE_REPORT}
                setDocsFile = {setDocsFile}
                setExcelFile = {setExcelFile}
                setPDFFile={setPDFFile}
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

export default CertificateIssuanceReport;