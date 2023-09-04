import cookie from 'js-cookie';

const header = {
	Accept: 'application/json',
	Authkey: cookie.get('userAuth')
		? JSON.parse(cookie.get('userAuth'))?.auth_key
		: '',
	Authentication: `Bearer ${cookie.get('token') || ''}`,
	'Access-Token': 'DOTSQUARES123',
	'Content-Type': 'multipart/form-data',
};

const currencyValue = cookie.get('currencyValue');
if (currencyValue) {
	header.Currency = currencyValue;
}

export {header};
