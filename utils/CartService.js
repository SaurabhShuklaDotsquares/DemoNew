/* eslint-disable no-console */
import axios from 'axios';
import {API_BASE_URL, api} from '@utils/api';

import {header} from './AuthHeader';

const getCart = () => {
	return axios.get(API_BASE_URL + '/list_cart', {
		headers: header,
	});
};
const removeCart = getData => {
	return api({
		// url: '/cart/remove',
		url: '/Carts/Deletecart',
		method: 'POST',
		data: getData,
	});
};
const updateCart = getData => {
	return axios.post(API_BASE_URL + '/cart/update', getData, {
		headers: header,
	});
};
const CartService = {
	getCart,
	removeCart,
	updateCart,
};

export default CartService;
