import React from "react";
import styles from "./Certificate.module.css";

export default function Certificate(props) {
	return <div className={!props.hidden ? styles.hidden : styles.show}>Я ТУТ!</div>;
}
