import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../components/Header/Header.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import SearchBlock from "../../components/SearchBlock/SearchBlock.jsx";
import SmallBoatsTable from "../../components/SearchTable/SearchTable.jsx";
import { getBoatsCardsList } from "../../redux/actions";

import styles from "./SmallBoats.module.css";

export default function SmallBoats() {
	const dispatch = useDispatch();

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

	useEffect(() => {
		dispatch(getBoatsCardsList());
	}, []);

	const dataFromState = useSelector((state) => {
		const { smallBoatsReducer } = state;
		return smallBoatsReducer.data;
	});
	console.log("dataFromState", dataFromState);

	return (
		<>
			<Header showButton={true} />
			<Sidebar />
			<div className={styles["content-block"]}>
				<h2>База данных маломерных судов</h2>
				<SearchBlock inputsHeaders={inputsHeaders} />
				<SmallBoatsTable dataFromState={dataFromState} />
			</div>
		</>
	);
}
