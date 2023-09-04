/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-console */
/* eslint-disable babel/camelcase */
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import {api} from '@utils/api';

const PaymentConfirm = () => {
	const [paymentStatus, setPaymentStatus] = useState({
		status: false,
		loading: false,
		message: '',
	});

	const router = useRouter();

	const getStripeData = async () => {
		// console.log('id', id);
		var plan_id = sessionStorage.getItem('plan_id');
		if (!plan_id) return;
		setPaymentStatus(prev => ({
			...prev,
			loading: true,
		}));
		try {
			const response = await api({
				url: '/vendor/profile-detail',
				method: 'POST',
				data: {
					payment_links_id: plan_id,
				},
			});
			if (response.data) {
				console.log('id', response.data);
				setPaymentStatus(prev => ({
					...prev,
					status: true,
					loading: false,
					message: response.message,
				}));
				setTimeout(() => {
					router.push('/vendor/dashboard');
				}, 2000);
			} else {
				setPaymentStatus(prev => ({
					...prev,
					status: false,
					loading: true,
					message: response.message,
				}));
				// setTimeout(() => {
				// 	router.push('/vendor/subscription');
				// }, 2000);
			}
		} catch (error) {
			console.log('error', error);
		} finally {
			sessionStorage.removeItem('plan_id');
		}
	};

	useEffect(() => {
		getStripeData();
	}, []);

	return (
		<div className='page-main'>
			<div className='text-center thank-block'>
				<div className='container'>
					<br />
					<br />
					<img src='/assets/images/thankYou.png' alt='thank-you' />
					<h1>{paymentStatus.message}</h1>
				</div>
			</div>
		</div>
	);
};

export default PaymentConfirm;
