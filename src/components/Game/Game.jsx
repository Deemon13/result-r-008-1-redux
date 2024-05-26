import { useEffect, useState } from 'react';

import { store } from '../../store';

import { GameLayout } from '../../components';

// import { field as fieldArr } from '../../data/field';
import { WIN_PATTERNS } from '../../data/win-patterns';

export const Game = () => {
	console.log(store.getState());
	// const [currentPlayer, setCurrentPlayer] = useState('X');
	// const [isGameEnded, setIsGameEnded] = useState(false);
	// const [isDraw, setIsDraw] = useState(false);
	// const [field, setField] = useState(fieldArr);

	// const [freeCells, setFreeCells] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
	const [currentPlayer, setCurrentPlayer] = useState(store.getState().currentPlayer);
	const [isGameEnded, setIsGameEnded] = useState(store.getState().isGameEnded);
	const [isDraw, setIsDraw] = useState(store.getState().isDraw);
	const [field, setField] = useState(store.getState().field);

	const [freeCells, setFreeCells] = useState(store.getState().freCells);

	useEffect(() => {
		store.subscribe(() => {
			const state = store.getState();
			setCurrentPlayer(state.currentPlayer);
			setIsGameEnded(state.isGameEnded);
			setIsDraw(state.isDraw);
			setField(state.field);
			setFreeCells(state.freCells);
		});
	}, [currentPlayer, isGameEnded, isDraw, field, freeCells]);

	const newFields = field.slice();

	function handleClickOnFieldCell(id) {
		if (isGameEnded) {
			return null;
		}

		if (field[id] === '' && !isGameEnded) {
			newFields[id] = currentPlayer;
			setField(newFields);
			const newFreeCells = getFreeCells(freeCells, id);
			setFreeCells(newFreeCells);
		} else {
			return null;
		}

		if (setWinner(newFields, currentPlayer)) {
			setIsGameEnded(true);
			return null;
		}

		setCurrentPlayer(prevState => (prevState === 'X' ? '0' : 'X'));
	}

	function setWinner(fieldCells, player) {
		return WIN_PATTERNS.some(el => el.every(item => fieldCells[item] === player));
	}

	function getFreeCells(arr, idx) {
		const newArr = arr.filter(item => item !== idx);
		return newArr;
	}

	function getRandomNumber(min, max) {
		return Math.round(Math.random() * (max - min) + min);
	}

	function pcPlay() {
		if (isGameEnded) {
			return null;
		}

		const freeCell = freeCells[getRandomNumber(0, freeCells.length - 1)];
		newFields[freeCell] = currentPlayer;
		setField(newFields);
		const newFreeCells = getFreeCells(freeCells, freeCell);
		setFreeCells(newFreeCells);

		if (setWinner(newFields, currentPlayer)) {
			setIsGameEnded(true);
			return null;
		}
		setCurrentPlayer(prevState => (prevState === 'X' ? '0' : 'X'));
	}

	if (currentPlayer === '0') {
		pcPlay();
	}

	if (field.every(cell => cell !== '') && !isDraw && !isGameEnded) {
		setIsDraw(true);
	}

	let status;
	if (isDraw) {
		status = 'Ничья';
	} else if (!isDraw && isGameEnded) {
		status = `Победа: ${currentPlayer}`;
	} else if (!isDraw && !isGameEnded) {
		status = `Ходит: ${currentPlayer}`;
	}

	function handleResetGame() {
		// setCurrentPlayer('X');
		// setIsDraw(false);
		// setIsGameEnded(false);
		// setField([...fieldArr]);
		// setFreeCells([0, 1, 2, 3, 4, 5, 6, 7, 8]);
		console.log(store.getState());
		store.dispatch({ type: 'NEW_GAME' });
		console.log(store.getState());
	}

	return (
		<GameLayout
			status={status}
			player={currentPlayer}
			field={field}
			handleClick={handleClickOnFieldCell}
			resetGame={handleResetGame}
		/>
	);
};
