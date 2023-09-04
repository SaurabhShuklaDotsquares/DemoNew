import axios from 'axios';

import {API_BASE_URL, api} from '@utils/api';
import {headerValue} from '@utils/api';

const getProfileDetail = () => {
	return axios.get(API_BASE_URL + '/users/profile-detail', {
		headers: headerValue(),
	});
};

const getVendorProfileDetail = () => {
	return api({
		url: '/vendor/profile-detail',
		method: 'GET',
	});
};

const updateVendorProfileDetail = giveData => {
	// return axios.post(API_BASE_URL + '/vendor/profile-update', giveData, {
	// 	headers: {...header},
	// });
	var form_data = new FormData();

	for (var key in giveData) {
		form_data.append(key, giveData[key]);
	}
	// for (const key of giveData.keys()) {
	// 	form_data.append(key, giveData[key]);
	// 	console.log(giveData[key]);
	//   }

	return axios({
		method: 'post',
		url: API_BASE_URL + '/vendor/profile-update',
		data: giveData,
		headers: headerValue(),
	});
};

const updateProfileDetail = (giveData, optionHeader) => {
	return axios.post(API_BASE_URL + '/users/profile-update', giveData, {
		headers: {...headerValue(), ...optionHeader},
	});
};

// const getAdminBoard = () => {
// 	return axios.get(config.API_BASE_URL + 'admin');
// };

const UserService = {
	getProfileDetail,
	updateProfileDetail,
	getVendorProfileDetail,
	updateVendorProfileDetail,
};

export default UserService;
