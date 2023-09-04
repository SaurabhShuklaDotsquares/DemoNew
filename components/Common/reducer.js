import {useReducer} from 'react';
const initialValue = {
	resultCategorylist: [],
	searchCategories: [],
	selectedCategory: '',
	search: '',
};

const reducer = (state = initialValue, action) => {
	switch (action.type) {
		case 'SET_DATA':
			return {...state, ...action.data};
		default:
			return state;
	}
};

export const useCommonState = () => {
	const [state, dispatch] = useReducer(reducer, initialValue);
	return {state, dispatch};
};
