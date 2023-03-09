import React from 'react';
import styles from '../Header/Header.module.css';

export default function MainLogo() {
	return (
		<img
			alt="main-logo"
			className={styles.main_logo}
			src="../assets/main_logo.png"></img>
	);
}
