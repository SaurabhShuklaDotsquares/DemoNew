import React from 'react';
import {useEffect} from 'react';
// import { toast } from 'react-toastify';
// import { api } from '@utils/api';

const Unsubscribe = props => {
	console.log('props are', props);
	const handleReturn = async () => {
		// const confirm = await confirmDialog('Are you want to return this order?');
		// const response = await api({
		//     url: `https://testing-admin-php-ecom-single.projectstatus.co.uk/unsubscribe/${props?.data?.pathdata?.slug}`,
		//     method: 'get',
		// });
		await fetch(
			`https://testing-admin-php-ecom-single.projectstatus.co.uk/unsubscribe/${props?.data?.pathdata?.slug}`,
		)
			.then(response => response.json())
			.then(data => console.log('responseisdata', data));

		// if (response.status) {
		//     // fetchOrders();
		//     toast.success(response.message);
		// } else {
		//     toast.warning(response.message);
		// }
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
					<h1>Unsubscribe Successfully.</h1>
					<p>Your email unsubscribe successfuly.</p>
				</div>
			</div>
		</div>
	);
};

export default Unsubscribe;
