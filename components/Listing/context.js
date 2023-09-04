import React, {useContext, useCallback, useEffect} from 'react';
import {useRouter} from 'next/router';

import {api} from '@utils/api';

import {useListingState} from './reducer';
import {useGlobalContext} from '@context/ContextApi';

const AppContext = React.createContext();

const AppProvider = ({children}) => {
	const router = useRouter();
	const {state, dispatch} = useListingState();

	const {currencyValue} = useGlobalContext();

	const fetchProductList = useCallback(async () => {
		const category = router?.query?.category || router?.query?.slugs?.[(router?.query?.slugs.length-1)] || '';
		const payload = {
			// eslint-disable babel/camelcase
			category_slug: category,
		};
		if (router?.query?.search) {
			payload['search'] = router?.query?.search;
		}

		if (router?.query?.page) {
			payload['page'] = parseInt(router?.query?.page);
		}

		if (state.sliderChange) {
			payload['min_price'] = state.sliderChange[0];
			payload['max_price'] = state.sliderChange[1];
		}

		if (state.search) {
			payload['search'] = state.search;
		}

		dispatch({
			type: 'SET_DATA',
			data: {
				...state,
				productLoading: true,
			},
		});

		const url = '/product/product-list';
		const response = await api({
			url: url,
			method: 'POST',
			data: payload,
		});
		if (response.status) {
			console.log(response);
			let sliderValueMin = [];
			sliderValueMin.push(
				parseInt(response?.data?.rang?.min),
				parseInt(response?.data?.rang?.max),
			);
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					productList: response.data.data ? response.data.data : [],
					breadcrumbs: response.data.breadcrumbs,
					productLoading: false,
					totalProduct: response.data.total,
					TotalPage: response.data.last_page,
					// sliderValue: sliderValueMin,
					sliderValues: sliderValueMin,
					totalPages: response.totalpage,
					currectPage: response.currentpage,
					totalPageSize: response.pagesize,
				},
			});
		} else
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					productList: [],
					productLoading: false,
					totalProduct: 0,
					TotalPage: 0,
				},
			});
	}, [
		state.sliderValChange,
		state.loadPage,
		router?.query,
		state.search,
		currencyValue,
	]);
	useEffect(() => {
		const timer = setTimeout(() => {
			fetchProductList();
		}, 1000);
		return () => clearTimeout(timer);
	}, [fetchProductList]);
	return (
		<AppContext.Provider value={{state, dispatch}}>
			{children}
		</AppContext.Provider>
	);
};
const useListingContext = () => {
	return useContext(AppContext);
};
export {AppProvider, useListingContext};
