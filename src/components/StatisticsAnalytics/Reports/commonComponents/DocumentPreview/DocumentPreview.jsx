import React from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import styles from "./DocumentPreview.module.css";
import Button from "react-bootstrap/Button";

const DocumentPreview = ({pdf,excel}) => {
    const handleExportButton =(event)=>{
        event.preventDefault()
        const link = document.createElement('a');
        link.href = URL.createObjectURL(excel);
        link.download = excel.name;
        link.click();
    }

    return (
        <> {excel && (
            <Button
                onClick={(e) => handleExportButton(e)}
                className={styles.button_element}
                variant="primary">
                Экспорт в EXCEL
            </Button>
        )}
            {pdf && (
                <DocViewer
                    documents={[{ uri: URL.createObjectURL(pdf),fileName: pdf.name }]}
                    pluginRenderers={DocViewerRenderers}
                />
            )}

        </>
    );
};

export default DocumentPreview;