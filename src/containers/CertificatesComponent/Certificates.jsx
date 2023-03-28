import React from 'react';
import SearchBlock from '../../components/SearchBlock/SearchBlock';
import { inputsHeadersCertificates } from '../../components/SearchBlock/inputsHeaders';
import { useDispatch, useSelector } from 'react-redux';
import { SERTIFICATES_COLUMNS } from '../../components/SearchTable/TablesColumns';
import SearchTable from '../../components/SearchTable/SearchTable';

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
        columns={SERTIFICATES_COLUMNS}
        dataFromState={dataFromStateCer}
      />
    </div>

  );
}
