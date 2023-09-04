/* eslint-disable react-hooks/exhaustive-deps */
import React, {
	useContext,
	useState,
	useMemo,
	useCallback,
	useEffect,
} from 'react';
import cookie from 'js-cookie';

import {api} from '@utils/api';

import {getCountriesList} from '@utils/helper';

import {useContextState} from './reducer';

const AppContext = React.createContext();

const AppProvider = ({children}) => {
	const [productList, setProductList] = useState([]);
	const {state, dispatch} = useContextState();
	const [configData, setConfigData] = useState();

	const isAuthenticated = useMemo(
		() => (cookie.get('token') ? true : false),
		[cookie.get('token')],
	);

	const currencyValue = useMemo(
		() => cookie.get('currencyValue'),
		[cookie.get('currencyValue')],
	);

	const handleConfigFile = async () => {
		// const confirm = await confirmDialog('Are you want to return this order?');
		const response = await api({
			url: `/users/user-config`,
			method: 'get',
		});

		if (response.message === 'Settings fetch successfully.') {
			setConfigData(response.data);
		}
	};

	const isGuestAuthenticated = useMemo(
		() => (cookie.get('tokenguest') ? true : false),
		[cookie.get('tokenguest')],
	);

	const getCartCount = useCallback(async () => {
		// if (!isAuthenticated) return;
		// getUserCookie();
		const count = await api({
			url: '/cart/count',
			method: 'POST',
		});
		if (count.status)
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					cartCount: count.data,
				},
			});
	}, []);

	const getWishlistCount = useCallback(async () => {
		if (!isAuthenticated) return;
		const count = await api({
			url: '/wishlist/count',
			method: 'POST',
		});
		if (count.status)
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					wishlistCount: count.data,
				},
			});
	}, [isAuthenticated]);

	const getCountries = useCallback(async () => {
		const data = await getCountriesList();
		if (data?.length)
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					countries: data,
				},
			});
	}, []);

	const getUserCookie = () => {
		if (cookie && cookie.get('userAuth')) {
			return JSON.parse(cookie.get('userAuth'));
		} else return {};
	};
	const getUserProfileDetail = useCallback(async () => {
		dispatch({
			type: 'SET_DATA',
			data: {
				...state,
				loadingProfile: true,
			},
		});

		if (!isAuthenticated) return;

		let cookiedata = getUserCookie('userAuth');

		const response = await api({
			url: '/' + (cookiedata.userType ?? 'users') + '/profile-detail',
			// url: '/' + (cookiedata.userType ?? 'Users') + '/GetUserProfile',
		});
		if (response.status)
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					userAuth: response.data,
				},
			});

		dispatch({
			type: 'SET_DATA',
			data: {
				...state,
				loadingProfile: false,
			},
		});
	}, [isAuthenticated]);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (isAuthenticated) {
				getWishlistCount();
				getUserProfileDetail();
				getCountries();
				handleConfigFile();
				getCartCount();
			}
		}, 2000);
		return () => clearTimeout(timer);
	}, [
		getCartCount,
		getUserProfileDetail,
		getWishlistCount,
		getCountries,
		isAuthenticated,
	]);

	useEffect(() => {
		handleConfigFile();
	}, []);

	return (
		<AppContext.Provider
			value={{
				state,
				dispatch,
				productList,
				setProductList,
				isAuthenticated,
				currencyValue,
				getCartCount,
				getWishlistCount,
				getUserCookie,
				isGuestAuthenticated,
				configData,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
const useGlobalContext = () => {
	return useContext(AppContext);
};

export {AppContext, AppProvider, useGlobalContext};
