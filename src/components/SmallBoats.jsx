import React from "react";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import SearchBlock from "./SearchBlock.jsx";
import styles from "../styles/SmallBoats.module.css";
import { SmallBoatsTable } from "./tableColumns/SmallBoatsTable.jsx";

export default function SmallBoats() {
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
			key: "govnumber",
			value: "Гос. номер",
			description: "В формате 1111 XX-1",
		},
	];
	return (
		<>
			<Header showButton={true} />
			<div className={styles["page-block"]}>
				<Sidebar />
				<div className={styles["content-block"]}>
					<h2>База данных маломерных судов</h2>
					<SearchBlock inputsHeaders={inputsHeaders} />
					<SmallBoatsTable />
				</div>
			</div>
		</>
	);
}
