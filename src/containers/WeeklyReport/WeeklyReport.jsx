import React from 'react';
import SearchBlock from "../../components/StatisticsAnalytics/Reports/commonComponents/SearchBlock/SearchBlock";
import DocumentPreview
    from "../../components/StatisticsAnalytics/Reports/commonComponents/DocumentPreview/DocumentPreview";
import {fieldsForSearch} from "./settingsForWeeklyReport";

function WeeklyReport() {
    return (
        <>
            <SearchBlock
              fields = {fieldsForSearch}
            />
            <DocumentPreview/>
        </>
    );
}

export default WeeklyReport;