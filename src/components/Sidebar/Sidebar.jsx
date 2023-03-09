import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showHiddenMenu, colorMenuItem } from '../../redux/actions';
import styles from './Sidebar.module.css';
import { Link } from 'react-router-dom';
import ArrowIcon from '../icons/ArrowIcon';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Sidebar() {
	const dispatch = useDispatch();

	const sidebarListArray = useSelector((state) => {
		const { sidebarReducer } = state;
		return sidebarReducer.sidebarListArray;
	});

	const showDropdownMenu = (e) => {
		console.log(e.currentTarget.dataset.title);
		dispatch(showHiddenMenu(e.currentTarget.dataset.title));
	};

	const handleSubmenuColorChange = (e) => {
		if (e.target.className === 'sidebar-list-item-modal') {
			dispatch(colorMenuItem(e.target.dataset.id));
		} else {
			dispatch(colorMenuItem(e.target.dataset.id));
		}
	};
	return (
		<div className={styles['sidebar-container']}>
			<ul className={styles['sidebar-list']}>
				{sidebarListArray.map((item) => (
					<>
						<li
							onClick={showDropdownMenu}
							className={styles['sidebar-list-item']}
							data-title={item[1]}
							key={item[1]}>
							{item[0]}
							{item[2].listModal.length !== 0 ? (
								<img
									alt="arrow icon"
									className={!item[2].isHidden ? styles['rotated-image'] : ''}
									src="/assets/icon-down-arrow.png"></img>
							) : null}
						</li>
						{item[2] !== undefined ? (
							<ul
								className={styles['sidebar-list-modal']}
								onClick={handleSubmenuColorChange}
								hidden={item[2].isHidden}>
								{item[2] !== undefined
									? item[2].listModal.map((elem) => (
											<Link
												className={styles['react-link']}
												to={`/${elem.id}`}>
												<li
													className={
														elem.colored
															? `${styles['sidebar-list-item-modal']} ${styles['colored']}`
															: styles['sidebar-list-item-modal']
													}
													key={elem.id}
													data-id={elem.id}>
													{elem.title}
												</li>
											</Link>
									  ))
									: null}
							</ul>
						) : null}
					</>
				))}
			</ul>
		</div>
	);
}
