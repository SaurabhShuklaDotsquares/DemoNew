import axios from 'axios';
import {API_BASE_URL} from '@utils/api';

const header = {
	Authentication:
		'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Rlc3RpbmctYWRtaW4tcGhwLWVjb20tc2luZ2xlLnByb2plY3RzdGF0dXMuY28udWsvYXBpL3YxL3VzZXJzL2xvZ2luIiwiaWF0IjoxNjY3Mzc4NDc4LCJleHAiOjE2OTg5MzYwNzgsIm5iZiI6MTY2NzM3ODQ3OCwianRpIjoiQ3NDTkM2VVhOUmRMdzFkTiIsInN1YiI6IjE1MiIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.FgH1g4Lb07OUOLnb6J08kJFSjG2hlMiRVHNgjxPpqas',
	Authkey: 'SnHbbXzb',
	'Access-Token': 'DOTSQUARES123',
};

const getCategorylist = () => {
	return axios.get(API_BASE_URL + '/category-list', {
		headers: header,
	});
};

const newsletter = getdata => {
	return axios.post(
		API_BASE_URL + '/newsletter/add',
		{email: getdata},
		{
			headers: header,
		},
	);
};
const getProductlist = getdata => {
	return axios.post(API_BASE_URL + '/product/product-list', getdata, {
		headers: header,
	});
};

const LayoutServices = {
	getCategorylist,
	newsletter,
	getProductlist,
};

export default LayoutServices;
