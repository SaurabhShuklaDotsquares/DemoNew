import React, {useContext} from 'react';

import {useCommonState} from './reducer';

const AppContext = React.createContext();
const AppProvider = ({children}) => {
	const {state, dispatch} = useCommonState();

	return (
		<AppContext.Provider value={{state, dispatch}}>
			{children}
		</AppContext.Provider>
	);
};
const useCommonContext = () => {
	return useContext(AppContext);
};
export {AppProvider, useCommonContext};
