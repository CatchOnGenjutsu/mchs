import React from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import SearchBlock from "../../components/SearchBlock/SearchBlock";
import styles from "./Certificates.module.css";

export default function Certificates() {
	const inputsHeaders = [
		{
			key: "firstname",
			value: "Имя",
		},
		{
			key: "secondname",
			value: "Фамилия",
		},
		{
			key: "lastname",
			value: "Отчество",
		},
		{
			key: "dateOfBirth",
			value: "Дата рождения",
			description: "В формате: 11/11/1111",
		},
		{
			key: "placeOfBirth",
			value: "Место рождения",
			description: "В формате: Республика Беларусь",
		},
	];

	return (
		<>
			<Header showButton={true} />
			<div className={styles["page-block"]}>
				<Sidebar />
				<div className={styles["content-block"]}>
					<h2>Удостоверения</h2>
					<SearchBlock inputsHeaders={inputsHeaders} />
					{/* {dataFromState ? ( */}
					{/* <SmallBoatsTable dataFromState={dataFromState} /> */}
					{/* ) : null} */}
				</div>
			</div>
		</>
	);
}
