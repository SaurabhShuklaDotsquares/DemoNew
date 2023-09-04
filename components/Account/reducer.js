import {useReducer} from 'react';
const initialValue = {
	profileDetails: [],
};

const reducer = (state = initialValue, action) => {
	switch (action.type) {
		case 'SET_DATA':
			return {...state, ...action.data};

		default:
			return state;
	}
};

export const useAccountState = () => {
	const [state, dispatch] = useReducer(reducer, initialValue);
	return {state, dispatch};
};
