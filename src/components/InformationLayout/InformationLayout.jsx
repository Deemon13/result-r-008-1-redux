import PropTypes from 'prop-types';

import styles from './informationLayout.module.css';
import { store } from '../../store';

// let status;
// if (store.getState().isDraw) {
// 	status = 'Ничья';
// } else if (!store.getState().isDraw && store.getState().isGameEnded) {
// 	status = `Победа: ${store.getState().currentPlayer}`;
// } else if (!store.getState().isDraw && !store.getState().isGameEnded) {
// 	status = `Ходит: ${store.getState().currentPlayer}`;
// }

export const InformationLayout = ({ status, player }) => {
	// export const InformationLayout = ({ player }) => {
	let colorStatus;
	colorStatus =
		player === 'X' && status !== 'Ничья'
			? 'green'
			: player === '0' && status !== 'Ничья'
			? 'red'
			: 'white';
	return (
		<div className={styles.container}>
			<p
				className={`${styles.status} ${
					colorStatus === 'green'
						? styles['status-green']
						: colorStatus === 'red'
						? styles['status-red']
						: styles['status-white']
				}`}
			>
				{status}
			</p>
		</div>
	);
};

InformationLayout.propTypes = {
	status: PropTypes.string,
	player: PropTypes.string,
};
