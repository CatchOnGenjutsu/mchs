import React, { useState, useEffect } from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import {MAIN_URL, PORT,API_GET_WEEKLY_REPORT} from "../../../../../constants/constants";

const DocumentPreview = () => {
    const [selectedDocs, setSelectedDocs] = useState(null);



    useEffect(() => {
        const getFile = async ()=>{
            const response = await fetch(`${MAIN_URL + ":8082/"+API_GET_WEEKLY_REPORT}`)
            if(response.ok){
                const formData = await response.formData();
                const filePdf = formData.get('pdf');
                const fileExcel = formData.get('excel');
                const fileUrl = URL.createObjectURL(filePdf);
                setSelectedDocs(fileUrl);
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(fileExcel);
                link.download = fileExcel.name;
                link.click();
            }else {console.error('Ошибка загрузки файла:');}
        }
        getFile()
    }, []);
    console.log(selectedDocs)
    return (
        <>
            {selectedDocs && (
                <DocViewer
                    documents={[{ uri: selectedDocs,fileName: selectedDocs.name }]}
                    pluginRenderers={DocViewerRenderers}
                />
            )}
        </>
    );
};

export default DocumentPreview;