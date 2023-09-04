/* eslint-disable no-console */
import axios from 'axios';
import {header} from './AuthHeader';
import {API_BASE_URL} from '@utils/api';

const getHomeDetail = () => {
	return axios.get(API_BASE_URL + '/home', {
		headers: header,
	});
};

const getannerDetail = () => {
	return axios.get(API_BASE_URL + '/get_banners', {
		headers: header,
	});
};

const UserService = {
	getHomeDetail,
	getannerDetail,
};

export default UserService;
