const initialState = {
	currentPlayer: 'X',
	isGameEnded: false,
	isDraw: false,
	field: ['', '', '', '', '', '', '', '', ''],
	freCells: [0, 1, 2, 3, 4, 5, 6, 7, 8],
};

export const reducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'NEW_GAME':
			return initialState;

		case 'SET_PLAYER':
			return { ...state, currentPlayer: payload };

		case 'SET_DRAW':
			return { ...state, isDraw: payload };

		default:
			return state;
	}
};
