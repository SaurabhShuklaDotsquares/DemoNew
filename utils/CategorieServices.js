/* eslint-disable no-undef */
import {header} from './AuthHeader';
import {API_BASE_URL} from '@utils/api';

const getCategorie = () => {
	return axios.get(API_BASE_URL + '/category-list', {
		headers: header,
	});
};

const CategorieService = {
	getCategorie,
};

export default CategorieService;
