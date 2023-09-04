/* eslint-disable no-console */
import axios from 'axios';
import {header} from './AuthHeader';
import {API_BASE_URL} from '@utils/api';

const getRegister = () => {
	return axios.post(API_BASE_URL + `/users/register`, {
		headers: header,
	});
};

const UserService = {
	getRegister,
};

export default UserService;
