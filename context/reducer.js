import {useReducer} from 'react';
const initialValue = {};

const reducer = (state = initialValue, action) => {
	switch (action.type) {
		case 'SET_DATA':
			return {...state, ...action.data};
		default:
			return state;
	}
};

export const useContextState = initial => {
	const [state, dispatch] = useReducer(reducer, initial || initialValue);
	return {state, dispatch};
};
