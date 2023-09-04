/* eslint-disable no-console */
import axios from 'axios';
import {header} from './AuthHeader';
import {API_BASE_URL} from '@utils/api';

const getSignUpDetail = () => {
	return axios.post(API_BASE_URL + `/users/register`, {
		headers: header,
	});
};

const UserService = {
	getSignUpDetail,
};

export default UserService;
