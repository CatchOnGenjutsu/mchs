import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import SearchBlock from "./SearchBlock.jsx";
import styles from "../styles/SmallBoats.module.css";
import SmallBoatsTable from "./tableColumns/SmallBoatsTable.jsx";
import { getBoatsCardsList } from "../redux/actions";

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
			<div className={styles["page-block"]}>
				<Sidebar />
				<div className={styles["content-block"]}>
					<h2>База данных маломерных судов</h2>
					<SearchBlock inputsHeaders={inputsHeaders} />
					{/* {dataFromState ? ( */}
					<SmallBoatsTable dataFromState={dataFromState} />
					{/* ) : null} */}
				</div>
			</div>
		</>
	);
}
