import React from "react";
import { useSelector } from "react-redux";

import SearchBlock from "../../../components/GeneralComponents/SearchBlock/SearchBlock";
import SearchTable from "../../../components/GeneralComponents/SearchTable/SearchTable";

import { CERTIFICATES_COLUMNS } from "../../../components/GeneralComponents/SearchTable/TablesColumns";
import { inputsHeadersCertificates } from "../../../components/GeneralComponents/SearchBlock/inputsHeaders";

export default function Certificates() {
  const dataFromStateCer = useSelector((state) => {
    const { certificateReducer } = state;
    return certificateReducer.data.map((el) => {
      if (Boolean(el.licenseId)) {
        el.id = el.licenseId;
        delete el.licenseId;
      }
      return el;
    });
  });
  return (
    <div>
      <h2>Удостоверения</h2>
      <SearchBlock inputsHeaders={Object.values(inputsHeadersCertificates)} />
      <SearchTable
        // setId={handleLicenseId}
        headerColumns={CERTIFICATES_COLUMNS}
        dataFromState={dataFromStateCer}
      />
    </div>
  );
}
