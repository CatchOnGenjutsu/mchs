import React from "react";
import { useState } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import SearchBlock from "../../components/SearchBlock/SearchBlock";
import Certificate from "../../components/Certificate/Certificate";
import { inputsHeadersCertificates } from "../../components/SearchBlock/inputsHeaders";
import { getLicenseById } from "../../redux/actions";

import styles from "./Certificates.module.css";
import { useDispatch } from "react-redux";

export default function Certificates() {
	const [hiddenCert, setHiddenCert] = useState(false);

	const dispatch = useDispatch();

	const handleHiddenCert = () => {
		dispatch(getLicenseById());
		setHiddenCert(!hiddenCert);
	};
	return (
		<>
			<Header showButton={true} />
			<Sidebar />
			<div className={styles["content-block"]}>
				<div className={hiddenCert ? styles.hidden : ""}>
					<h2>Удостоверения</h2>
					<SearchBlock inputsHeaders={inputsHeadersCertificates} />
				</div>
				<button
					className={`${styles["button-back"]} btn btn-primary`}
					type="button"
					onClick={handleHiddenCert}>
					Показать
				</button>
				<Certificate hidden={hiddenCert} />
			</div>
		</>
	);
}
