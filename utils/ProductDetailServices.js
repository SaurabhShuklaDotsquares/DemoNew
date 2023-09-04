/* eslint-disable no-console */
import axios from 'axios';
import {header} from './AuthHeader';
import {API_BASE_URL} from '@utils/api';

const getProductDetail = (slug, isPublic = true) => {
	return axios.get(API_BASE_URL + `/product/product_detail/${slug}`, {
		headers: isPublic ? {} : header,
	});
};

const getOrderDetail = (slug, isPublic = true) => {
	return axios.get(API_BASE_URL + `/order/${slug}`, {
		headers: isPublic ? {} : header,
	});
};

const UserService = {
	getProductDetail,
	getOrderDetail,
};

export default UserService;
