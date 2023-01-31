import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../components/Header/Header.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import SearchBlock from "../../components/SearchBlock/SearchBlock.jsx";
import SmallBoatsTable from "../../components/SearchTable/SearchTable.jsx";
import BoatInfo from "../../components/BoatInfo/BoatInfo.jsx";
import { getBoatsCardsList, clearBoatCardInfo } from "../../redux/actions";
import { SMALLBOATS_COLUMNS } from "../../components/SearchTable/TablesColumns";
import { inputsHeadersSmallBoats } from "../../components/SearchBlock/inputsHeaders.js";

import styles from "./SmallBoats.module.css";

export default function SmallBoats() {
	const dispatch = useDispatch();

	const [boatId, setBoatId] = useState("");

	useEffect(() => {
		dispatch(getBoatsCardsList());
	}, []);

	const handleBoatId = (value) => {
		setBoatId(value);
	};

	const handleClearBoatInfo = () => {
		dispatch(clearBoatCardInfo());
	};

	const dataFromState = useSelector((state) => {
		const { smallBoatsReducer } = state;
		return smallBoatsReducer.data;
	});

	// console.log("dataFromState >>>", dataFromState);

	return (
		<>
			<Header showButton={true} />
			<Sidebar />
			<div className={styles["content-block"]}>
				<button
					onClick={() => {
						setBoatId("");
						handleClearBoatInfo();
					}}
					type="button"
					className={
						boatId !== ""
							? `${styles["button-back"]} btn btn-primary`
							: `${styles["button-back"]} btn btn-primary ${styles.hidden}`
					}>
					НАЗАД
				</button>
				<div className={boatId !== "" ? styles.hidden : ""}>
					<h2>База данных маломерных судов</h2>
					<SearchBlock inputsHeaders={inputsHeadersSmallBoats} />
					<SmallBoatsTable
						setBoatId={handleBoatId}
						columns={SMALLBOATS_COLUMNS}
						dataFromState={dataFromState}
					/>
				</div>
				<BoatInfo hidden={boatId} />
			</div>
		</>
	);
}
