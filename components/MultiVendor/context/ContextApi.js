import React, {useContext, useEffect} from 'react';

const AppContext = React.createContext();

const AppProvider = ({children}) => {
	useEffect(() => {});
	return (
		<>
			<AppContext.Provider value='Hello'>{children}</AppContext.Provider>
		</>
	);
};

const useGlobalContext = () => {
	return useContext(AppContext);
};
export {AppContext, AppProvider, useGlobalContext};
