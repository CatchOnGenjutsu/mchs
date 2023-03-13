import React from "react";
import SearchBlock from "../../components/SearchBlock/SearchBlock";
import Certificate from "../../components/Certificate/Certificate";
import { inputsHeadersCertificates } from "../../components/SearchBlock/inputsHeaders";
import { getLicenseById } from "../../redux/actions";

import styles from "./Certificates.module.css";
import {useDispatch, useSelector} from "react-redux";
import {SERTIFICATES_COLUMNS} from "../../components/SearchTable/TablesColumns";
import SearchTable from "../../components/SearchTable/SearchTable";

export default function Certificates() {
	const dataFromStateCer = useSelector((state) => {
		const {certificateReducer } = state;
		return certificateReducer.data.map(el=>{
			if(Boolean(el.licenseId)){
				el.id=el.licenseId
				delete el.licenseId
			}
			console.log(el)
			return el
		});
	});
	return (
		<>
				<div >
					<h2>Удостоверения</h2>
					<SearchBlock inputsHeaders={Object.values(inputsHeadersCertificates)} />
					<SearchTable
						// setId={handleLicenseId}
						columns={SERTIFICATES_COLUMNS}
						dataFromState={dataFromStateCer}
					/>
				</div>
		</>
	);
}
