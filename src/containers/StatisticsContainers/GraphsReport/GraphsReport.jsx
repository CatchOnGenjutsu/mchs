import React, { useState } from "react";
import SearchBlock from "../../../components/StatisticsAnalytics/Reports/commonComponents/SearchBlock/SearchBlock";
import { fieldsForSearchGraphs, getOptionsForField, setOptionsForField } from "./settingsForGraphsReport";
import { API_GET_FIVEYEARS_GRAPH_REPORT, API_GET_MONTH_GRAPH_REPORT } from "../../../constants/constants";
import DocumentPreview from "../../../components/StatisticsAnalytics/Reports/commonComponents/DocumentPreview/DocumentPreview";
import { useSelector } from "react-redux";
import { ProgressBar } from "react-loader-spinner";

function GraphsReport() {
  const isLoading = useSelector((state) => state.dictionaryReducer.isLoading);
  const [loader, setLoader] = useState(false);
  const [DocsFile, setDocsFile] = useState("");
  const [ExcelFile, setExcelFile] = useState("");
  const [PDFFile, setPDFFile] = useState("");
  if (isLoading) {
    return (
      <div className={"d-flex flex-column align-items-center"}>
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
    );
  }
  return (
    <>
      <h2>Графики</h2>
      <SearchBlock
        fields={fieldsForSearchGraphs}
        setOptionsForField={setOptionsForField}
        urlForReport={[API_GET_FIVEYEARS_GRAPH_REPORT, API_GET_MONTH_GRAPH_REPORT]}
        setDocsFile={setDocsFile}
        setExcelFile={setExcelFile}
        setPDFFile={setPDFFile}
        getOptionsForField={getOptionsForField}
        setLoader={setLoader}
      />
      <DocumentPreview
        pdf={PDFFile}
        docs={DocsFile}
      />
      {loader && (
        <div className={"d-flex flex-column align-items-center"}>
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

export default GraphsReport;
