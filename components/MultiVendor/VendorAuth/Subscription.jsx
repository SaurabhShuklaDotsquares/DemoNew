/* eslint-disable babel/camelcase */
/* eslint-disable no-console */
/* eslint-disable react/jsx-key */
import {useState, useEffect} from 'react';
import {useCallback} from 'react';

import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';
import {api} from '@utils/api';

const Subscription = () => {
	// const [detail, setDetail] = useState('');
	const [paymentData] = useState('');
	//const [finalData, setFinalData] = useState('');
	const [loading] = useState(false);

	useEffect(() => {
		getProfile();
	}, []);

	const getProfile = useCallback(async () => {
		const response = await api({
			url: '/vendor/profile-detail',
			method: 'GET',
		});
		console.log(response);
	}, []);

	const getDetail = async () => {
		try {
			const response = await api({
				url: '/plan/all',
				method: 'GET',
			});
			if (response.data) {
				// setDetail(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	// const getStripeData = async id => {
	// 	// console.log('id', id);
	// 	try {
	// 		const response = await api({
	// 			url: '/vendor/stripe/get-stripe-data',
	// 			method: 'POST',
	// 			data: {
	// 				payment_links_id: id,
	// 			},
	// 		});
	// 		if (response.data) {
	// 			console.log('id', response.data);
	// 			setFinalData(response.data);
	// 		}
	// 	} catch (error) {
	// 		console.log('error', error);
	// 	}
	// };

	// const handleSubscribe = async planId => {
	// 	try {
	// 		setLoading(true);
	// 		const response = await api({
	// 			url: '/vendor/stripe/create-payment-link',
	// 			method: 'POST',
	// 			data: {
	// 				plan_id: planId,
	// 				redirect_url: `http://localhost:3000/vendor/paymentconfirm`,
	// 			},
	// 		});
	// 		if (response.data) {
	// 			// console.log('id', response.data);
	// 			setLoading(false);
	// 			setPaymentData(response.data);
	// 			let url = response.data.url;
	// 			sessionStorage.setItem('plan_id', response.data.id);
	// 			router.push(url);
	// 			// setInterval(getStripeData(response.data.id), 3000);
	// 			//getStripeData(response.data.id);
	// 		}
	// 	} catch (error) {
	// 		console.log('error', error);
	// 		setLoading(false);
	// 	}
	// };

	console.log(paymentData);

	useEffect(() => {
		getDetail();
	}, []);

	return (
		<>
			<>
				{/* {loading && <SpinnerLoader />} */}
				<SpinnerLoader loading={loading} />
				{/* <section>
					<div className='container'>
						<div className='row'>
							<div className='col-md-12'>
								<span>
									<h1 className='mt-0 pb-1 pt-3'>Subscription Plan</h1>
									<hr></hr>
								</span>
							</div>
						</div>
					</div>
				</section>
				<section>
					<div className='container  mt-5'>
						<div className='row justify-content-center'>
							{detail &&
								detail.map(item => (
									<div className='col-md-3' key={item.id}>
										<div
											className='card text-white  mb-3'
											style={{height: '25rem', background: 'white'}}
										>
											<div
												className='card-header'
												style={{background: 'rgb(234, 58, 60)'}}
											>
												<span>
													<h2
														className='text-white'
														style={{paddingBottom: '0px'}}
													>
														{item ? item.title : ''} Plan
													</h2>
												</span>
											</div>
											<div className='card-body'>
												<div className='row mt-3'>
													<div className='col-md-6'>
														<h5 className='card-title text-dark'>Duration</h5>
													</div>
													<div className='col-md-6'>
														<h5 className='card-title text-dark'>
															{item ? item.duration : ''}
														</h5>
													</div>
												</div>

												<div className='row mt-3'>
													<div className='col-md-6'>
														<h5 className='card-title text-dark'>Amount</h5>
													</div>
													<div className='col-md-6'>
														<h5 className='text-dark'>
															$ {item ? item.amount : ''}
														</h5>
													</div>
												</div>
												<div className='row'>
													<div className='col-md-5'>
														<h5 className='text-dark'>Description</h5>
													</div>
													<div className='col-md-7'>
														<p className='text-dark'>
															{item ? item.description : ''}
														</p>
													</div>
												</div>
											</div>
											<button
												className='btn btn-light'
												style={{
													background: 'rgb(234, 58, 60)',
													textDecoration: 'none',
													color: 'white',
													fontSize: '20px',
												}}
												onClick={() => handleSubscribe(item.stripe_plan_id)}
											>
												Subscribe Now
											</button>
										</div>
									</div>
								))}
						</div>
					</div>
				</section> */}
			</>
		</>
	);
};

export default Subscription;
