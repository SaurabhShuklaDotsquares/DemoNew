import React from 'react';
import {useEffect} from 'react';
import {toast} from 'react-toastify';
import {api} from '@utils/api';

const ThankRegister = props => {
	console.log('Props :', props);
	const handleReturn = async () => {
		// const confirm = await confirmDialog('Are you want to return this order?');
		const response = await api({
			url: `/email/verify/${props?.data?.pathdata?.userid}/${props?.data?.pathdata?.slug}`,
			method: 'get',
		});
		if (response.status) {
			// fetchOrders();
			toast.success(response.message);
		} else {
			toast.warning(response.message);
		}
	};

	useEffect(() => {
		handleReturn();
	}, []);
	return (
		<div className='page-main'>
			<div className='text-center thank-block'>
				<div className='container'>
					<br />
					<br />
					<img src='/assets/images/thankYou.png' alt='thank-you' />
					<h1>Thank you for registration.</h1>
					<p>Your account has been successfully verified.</p>
				</div>
			</div>
		</div>
	);
};

export default ThankRegister;
