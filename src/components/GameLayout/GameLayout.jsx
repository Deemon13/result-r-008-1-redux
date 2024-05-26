import PropTypes from 'prop-types';

import { store } from '../../store';

import { Field, Information, Signature } from '../../components';

import styles from './gameLayout.module.css';

// export const GameLayout = ({ status, player, field, handleClick, resetGame }) => {
export const GameLayout = ({ status, player, field, handleClick }) => {
	return (
		<div className={styles.gameLayout}>
			<Information status={status} player={player} />
			{/* <Information player={player} /> */}
			<Field field={field} handleClick={handleClick} />
			{field.some(el => el !== '') && (
				<button
					type="button"
					// onClick={() => resetGame()}
					onClick={() => store.dispatch({ type: 'NEW_GAME' })}
					className={styles.gameBtnReset}
				>
					Начать заново
				</button>
			)}
			<Signature />
		</div>
	);
};

GameLayout.propTypes = {
	status: PropTypes.string,
	field: PropTypes.array,
	player: PropTypes.string,
	handleClick: PropTypes.func,
	// resetGame: PropTypes.func,
};
