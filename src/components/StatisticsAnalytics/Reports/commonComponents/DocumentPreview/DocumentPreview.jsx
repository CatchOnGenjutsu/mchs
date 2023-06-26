import React from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import styles from "./DocumentPreview.module.css";
import Button from "react-bootstrap/Button";

const DocumentPreview = ({pdf,excel,docs}) => {
    const handleExportButton =(event)=>{
        event.preventDefault()
        const link = document.createElement('a');
        if(excel){
            link.href = URL.createObjectURL(excel);
            link.download = excel.name;
        }
        if(docs)  {
            link.href = URL.createObjectURL(docs);
            link.download = docs.name;
        }

        link.click();
    }

    return (
        <> {excel || docs && (
            <Button
                onClick={(e) => handleExportButton(e)}
                className={styles.button_element}
                variant="primary">
                Экспорт в документ
            </Button>
        )}
            {pdf && (
                <DocViewer
                    documents={[{ uri: URL.createObjectURL(pdf),fileName: pdf.name.replace(/\.[^/.]+$/, '') }]}
                    pluginRenderers={DocViewerRenderers}
                />
            )}

        </>
    );
};

export default DocumentPreview;