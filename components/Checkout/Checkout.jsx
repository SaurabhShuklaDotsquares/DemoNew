import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import CreditCardInput from 'react-credit-card-input';
import {toast} from 'react-toastify';
import {Form} from 'react-bootstrap';

// import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';
import {useContextState} from '@context/reducer';
import {api} from '@utils/api';
import {useGlobalContext} from '@context/ContextApi';

const Checkout = () => {
	const router = useRouter();
	const [isSubmitVal, setIsSubmitVal] = useState(false);
	// const [loading, setLoading] = useState(false);

	const {state, dispatch} = useContextState({
		shipping: {
			charge: 0,
			id: null,
			type: '',
		},
	});
	const [formErrors, setFormErrors] = useState({});
	const [billingDiv, setBillingDiv] = useState(true);
	const [paymentError, setPaymentError] = useState(false);
	const [loadingCoupon, setLoadingCoupon] = useState(false);
	const [coupon, setCoupon] = useState(null);
	const [selectedValue, setSelectedValue] = useState('online');

	const {state: globalState, getCartCount} = useGlobalContext();
	const handleChange = event => {
		dispatch({
			type: 'SET_DATA',
			data: {
				...state,
				[event.target.name]: event.target.value,
			},
		});
	};

	const handleBlur = inputs => {
		setFormErrors(validate(inputs));
	};

	const customerAddresses = async () => {
		// setLoading(true);
		const response = await api({
			url: '/user-address',
			method: 'GET',
		});
		if (response.status) {
			// setLoading(false);
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					addresses: response.data.data,
				},
			});
		}
	};

	const handleAddressChange = event => {
		const value = event.target.value;
		const address = state.addresses.find(i => i.id + 'l' === value + 'l');

		if (address) {
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					shipping_address1: address.address1,
					shipping_address2: address.address2,
					shipping_city: address.city,
					shipping_postal_code: address.postal_code,
					shipping_state: address.state,
					shipping_country: address.country_id,
				},
			});
		}
	};

	const fetchShippingOptions = async () => {
		const response = await api({
			url: '/shipping-address',
			method: 'GET',
		});

		if (response.status) {
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					shippingOptions: response.data,
				},
			});
		}
	};

	const fetchCartDetails = useCallback(async pincode => {
		const response = await api({
			url: `/list_cart?zip_code=${pincode}`,
			method: 'GET',
		});
		if (response.status) {
			if (!response.data?.data?.length) return router.push('/cart');
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					cartDetails: response.data,
				},
			});
			setCoupon(null);
		}
	}, []);

	const applyCouponCode = useCallback(
		async event => {
			event.preventDefault();
			setLoadingCoupon(true);
			const {couponCode} = event.target;

			const response = await api({
				url: '/coupon/apply-code',
				method: 'POST',
				data: {
					coupon_code: couponCode.value,
					zip_code: state?.shipping_postal_code,
				},
			});
			if (response.error) {
				setLoadingCoupon(false);
				return toast.error(response.message);
			} else {
				setCoupon(response.data);
				console.log('Coupon Code Apply :', response.data);
				setLoadingCoupon(false);
				couponCode.value = '';
				return toast.success(response.message);
			}
		},
		[state?.shipping_postal_code],
	);

	const removeCouponCode = event => {
		event.preventDefault();
		setCoupon(null);
		const {couponCode} = event.target;
		couponCode.value = '';
		return toast.success('Coupon Removed Successfully');
	};

	useEffect(() => {
		fetchCartDetails();
		fetchShippingOptions();
		customerAddresses();
	}, []);

	useEffect(() => {
		if (globalState.userAuth) {
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					firstname: globalState?.userAuth?.firstname,
					lastname: globalState?.userAuth?.lastname,
					phone: globalState?.userAuth?.mobile,
				},
			});
		}
	}, [globalState]);

	const cartListCall = () => {
		handleBlur();
		setCoupon(null);
		fetchCartDetails(state.shipping_postal_code);
	};
	const errors = {};
	const validate = values => {
		if (!state?.firstname) {
			errors.firstname = 'First name is required!';
		} else if (state.firstname.length > 15) {
			errors.firstname = 'Maximum 15 characters is required!';
		}
		if (!state?.lastname) {
			errors.lastname = 'Last name is required!';
		} else if (state.lastname.length > 15) {
			errors.lastname = 'Maximum 15 characters is required!';
		}
		if (!state?.phone) {
			errors.phone = 'Phone is required!';
		} else if (values?.phone?.length < 8) {
			errors.phone = 'Phone must be between 8 and 16 digits!';
		} else if (state?.phone?.length > 16) {
			errors.phone = 'Phone not more than 16 digits!';
		}
		if (!state?.shipping_address1) {
			errors.address1 = 'Address is required!';
		} else if (state?.shipping_address1.length > 100) {
			errors.address1 = 'Maximum 100 characters is required!';
		}
		if (!state?.shipping_address2) {
			errors.address2 = 'Apartment, Suit field is required!';
		} else if (state?.shipping_address2.length > 100) {
			errors.address2 = 'Maximum 100 characters is required!';
		}
		if (!state?.shipping_city) {
			errors.addressCity = 'City is required!';
		} else if (state?.shipping_city.length > 30) {
			errors.addressCity = 'Maximum 30 characters is required!';
		}
		if (!state?.shipping_postal_code) {
			errors.postal_code = 'Postal code is required!';
		} else if (state?.shipping_postal_code.length > 7) {
			errors.postal_code = 'Postal Code Should have 6 Digits!';
		}
		if (!state?.shipping_state) {
			errors.addressState = 'State is required!';
		} else if (state?.shipping_state.length > 30) {
			errors.addressState = 'Maximum 30 characters is required!';
		}
		if (!state?.shipping_country) {
			errors.country = 'Country is required!';
		}
		if (!(state?.['card-expiry'] && state?.['card-number'] && state?.cvc)) {
			console.log('payment Details :', state?.cardNumber);
			errors.payment = 'The payment method field is required.';
		}

		if (state?.billingAddress === false) {
			if (!state?.billing_address1) {
				errors.billing_address1 = 'Billing Address is required!';
			} else if (state?.billing_address1.length > 100) {
				errors.billing_address1 = 'Maximum 100 characters is required!';
			}
			if (!state?.billing_address2) {
				errors.billing_address2 =
					'Billing Apartment, Suit field is required!';
			} else if (state?.billing_address2.length > 100) {
				errors.billing_address2 = 'Maximum 100 characters is required!';
			}
			if (!state?.billing_city) {
				errors.billing_city = 'Billing City is required!';
			} else if (state?.billing_city.length > 30) {
				errors.billing_city = 'Maximum 30 characters is required!';
			}
			if (!state?.billing_postal_code) {
				errors.billing_postal_code = 'Billing Postal code is required!';
			} else if (state?.billing_postal_code.length > 6) {
				errors.billing_postal_code = 'Maximum 6 digit is required!';
			}
			if (!state?.billing_state) {
				errors.billing_state = 'Billing State is required!';
			} else if (state?.billing_state.length > 30) {
				errors.billing_state = 'Maximum 30 characters is required!';
			}
			if (!state?.billing_country) {
				errors.billing_country = 'Billing Country is required!';
			}
		}
		return errors;
	};

	const handleSubmit = async event => {
		dispatch({
			type: 'SET_DATA',
			data: {
				...state,
				placeOrderLoading: true,
			},
		});
		event.preventDefault();
		setFormErrors({});
		const result = validate(state);
		setIsSubmitVal(true);
		if (Object.keys(result).length) {
			setFormErrors(result);
			setIsSubmitVal(false);
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					placeOrderLoading: false,
				},
			});
			return;
		} else {
			try {
				// setLoading(true);
				var cardFormData = new FormData();

				cardFormData.append(
					'card_number',
					+state?.['card-number']?.replace(/ /g, ''),
				);
				cardFormData.append(
					'exp_month',
					state?.['card-expiry']?.split('/')?.[0],
				);
				cardFormData.append(
					'exp_year',
					state?.['card-expiry']?.split('/')?.[1],
				);
				cardFormData.append('cvc', state.cvc);

				const stripeToken = await api({
					url: '/stripe-token',
					method: 'POST',
					data: cardFormData,
				});

				if (!stripeToken.status && selectedValue === 'online') {
					setPaymentError(true);
					// setLoading(false);
					dispatch({
						type: 'SET_DATA',
						data: {
							...state,
							placeOrderLoading: false,
						},
					});
					return toast.error(stripeToken.message);
				}

				const data = {
					firstname: state.firstname,
					lastname: state?.lastname,
					mobile: state?.phone,
					token:
						selectedValue === 'online'
							? stripeToken?.data?.id
							: null,
					payment_method: selectedValue,
					shipping_type: '',
					shipping_amount: state?.shipping?.charge,
					price: totalPrice,
					shipping_address: {
						address: state.shipping_address1,
						address2: state.shipping_address2,
						city: state.shipping_city,
						postal_code: Number(state.shipping_postal_code),
						state: state.shipping_state,
						country: Number(state.shipping_country),
					},
				};

				if (coupon) {
					data['promocode'] = coupon.code;
				}

				if (state?.billingAddress === false) {
					const billAddr = {
						address: state.billing_address1,
						address2: state.billing_address2,
						city: state.billing_city,
						postal_code: Number(state.billing_postal_code),
						state: state.billing_state,
						country: Number(state.billing_country),
					};

					data['billing_address'] = billAddr;
				} else {
					const billAddr = {
						address: state.shipping_address1,
						address2: state.shipping_address2,
						city: state.shipping_city,
						postal_code: Number(state.shipping_postal_code),
						state: state.shipping_state,
						country: Number(state.shipping_country),
					};

					data['billing_address'] = billAddr;
				}
				console.log("=============== data ====================",data);
				const response = await api({
					url: '/order/place-order',
					method: 'POST',
					data: data,
				});
				dispatch({
					type: 'SET_DATA',
					data: {
						...state,
						placeOrderLoading: false,
					},
				});
				if (response.code === 400) {
					// setLoading(false);
					toast.error(
						response.message === null
							? 'Select CheckBox is Missing !'
							: response.message,
					);
					setIsSubmitVal(false);
					// setLoading(true);
					dispatch({
						type: 'SET_DATA',
						data: {
							...state,
							placeOrderLoading: false,
						},
					});
				}
				if (response.status) {
					getCartCount();
					router.push('/thank-you/' + response?.data[0].order_id);
					toast.success('Order Placed Successfully');
					setIsSubmitVal(false);
					// setLoading(false);
					dispatch({
						type: 'SET_DATA',
						data: {
							...state,
							placeOrderLoading: false,
						},
					});
				}
			} catch (error) {
				setIsSubmitVal(false);
				// setLoading(true);
				dispatch({
					type: 'SET_DATA',
					data: {
						...state,
						placeOrderLoading: false,
					},
				});
			}
		}
	};

	const handleBillingAddress = e => {
		if (e.target.checked === true) {
			setBillingDiv(false);
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					billingAddress: false,
				},
			});
		} else {
			setBillingDiv(true);
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					billingAddress: true,
				},
			});
		}
	};

	const handleChangeBilling = event => {
		dispatch({
			type: 'SET_DATA',
			data: {
				...state,
				[event.target.name]: event.target.value,
			},
		});
	};

	const handleCardValueChange = event => {
		setFormErrors({});
		setPaymentError(false);
		handleChange({
			target: {name: event.target.id, value: event.target.value},
		});
	};

	const totalPrice = useMemo(
		() =>
			(state?.cartDetails?.data?.reduce(
				(total, val) => (total += +val.final_value),
				0,
			) || 0) - (+state?.cartDetails?.tax_price || 0),
		[state?.cartDetails],
	);

	const options = [
		{
			label: (
				<CreditCardInput
					cardNumberInputProps={{
						value: state?.cardNumber,
						onChange: handleCardValueChange,
					}}
					cardExpiryInputProps={{
						value: state?.expiry,
						onChange: handleCardValueChange,
					}}
					cardCVCInputProps={{
						value: state?.cvc,
						onChange: handleCardValueChange,
					}}
					fieldClassName='input'
					disabled={isSubmitVal}
				/>
			),
			value: 'online',
		},
	];

	return (
		<>
			{/* <SpinnerLoader
				loading={loading || (globalState?.loadingProfile ?? true)}
			/> */}
			<div className='section pad-btm-sec checkout-sec'>
				<div className='container'>
					<div className='cart-container d-flex flex-wrap'>
						<h1 className='cms-pages-head'>Checkout</h1>
						<div className='row'>
							<div className='col-lg-8'>
								<div className='shipping-block'>
									<div className='row'>
										<div className='col-md-7'>
											<h5 className='sub-head'>
												Shipping Address{' '}
												<span className='text-danger'>
													*
												</span>
											</h5>
											<div className='form-bx'>
												<div className='col-md-6 form-group'>
													<label htmlFor='firstName'>
														First name
														<span className='text-danger'>
															*
														</span>
													</label>
													<input
														type='text'
														className='form-control'
														placeholder='First Name'
														name='firstname'
														onChange={e =>
															handleChange(e)
														}
														onBlur={handleBlur}
														onKeyDown={event => {
															if (
																event.keyCode ===
																	32 &&
																event.target
																	.selectionStart ===
																	0
															) {
																event.preventDefault();
															}
														}}
														value={
															state?.firstname ??
															''
														}
														disabled={isSubmitVal}
													/>
													<span className='text-danger text-center'>
														{formErrors.firstname}
													</span>
												</div>

												<div className='col-md-6 form-group'>
													<label htmlFor='firstName'>
														Last name{' '}
														<span className='text-danger'>
															*
														</span>
													</label>
													<input
														type='text'
														className='form-control'
														placeholder='Last Name'
														name='lastname'
														onChange={e =>
															handleChange(e)
														}
														onBlur={handleBlur}
														onKeyDown={event => {
															if (
																event.keyCode ===
																	32 &&
																event.target
																	.selectionStart ===
																	0
															) {
																event.preventDefault();
															}
														}}
														value={
															state?.lastname ??
															''
														}
														disabled={isSubmitVal}
													/>
													<span className='text-danger text-center'>
														{formErrors.lastname}
													</span>
												</div>
												<div className='col-md-6 form-group'>
													<label htmlFor='firstName'>
														Phone number{' '}
														<span className='text-danger'>
															*
														</span>
													</label>
													<input
														type='text'
														className='form-control'
														placeholder='Phone Number'
														name='phone'
														onChange={event => {
															{
																const re =
																	/^[0-9\b]+$/; // regex to match only numbers
																if (
																	event.target
																		.value ===
																		'' ||
																	re.test(
																		event
																			.target
																			.value,
																	)
																) {
																	handleChange(
																		event,
																	);
																}
															}
														}}
														onBlur={handleBlur}
														onKeyDown={event => {
															if (
																event.keyCode ===
																	32 &&
																event.target
																	.selectionStart ===
																	0
															) {
																event.preventDefault();
															}
														}}
														value={
															state?.phone ?? ''
														}
														disabled={isSubmitVal}
													/>
													<span className='text-danger text-center'>
														{formErrors.phone}
													</span>
												</div>
											</div>
										</div>
										<div className='col-md-5'>
											<div className='payment-block'>
												<h5 className='sub-head'>
													Payment
													<span className='text-danger'>
														*
													</span>
												</h5>
												<div
													style={
														paymentError
															? {
																	border: '1px solid red',
															  }
															: {}
													}
												>
													<Form>
														{options.map(
															(option, index) => (
																<Form.Check
																	key={index}
																	label={
																		option.label
																	}
																	value={
																		option.value
																	}
																	checked={
																		true
																	}
																	onChange={e => {
																		console.log(
																			e
																				.target
																				.value,
																		);
																		setSelectedValue(
																			e
																				.target
																				.value,
																		);
																	}}
																	disabled={
																		isSubmitVal
																	}
																	onBlur={
																		handleBlur
																	}
																/>
															),
														)}
													</Form>
												</div>
												<span className='text-danger text-center'>
													{formErrors.payment}
												</span>
											</div>
										</div>
									</div>
									<div className='row'>
										<div className='col-sm-12'>
											<div className='shipping-blockaddress'>
												<h5 className='sub-head'>
													Shipping Address{' '}
													<span className='text-danger'>
														*
													</span>
												</h5>
												<div className='row address-bx'>
													<div className='col-md-6 form-group'>
														<select
															className='custom-select custom-select-lg mb-3'
															name='addressId'
															onChange={
																handleAddressChange
															}
															onBlur={handleBlur}
															disabled={
																isSubmitVal
															}
														>
															<option>
																Select Address
															</option>
															{state?.addresses &&
																state?.addresses?.map(
																	(
																		item,
																		index,
																	) => (
																		<option
																			value={
																				item.id
																			}
																			key={
																				index
																			}
																		>
																			{
																				item.address1
																			}
																		</option>
																	),
																)}
														</select>
													</div>
													<span
														style={{
															position:
																'relative',
															top: '10px',
														}}
													>
														Or
													</span>
													<div className='col-md-6 form-group'>
														<Link
															href='/address-book/create'
															passHref
														>
															<button
																className='btn btn-danger btn-lg'
																disabled={
																	isSubmitVal
																}
															>
																Add Address
															</button>
														</Link>
													</div>
												</div>
												<div className='row'>
													<div className='col-md-6 form-group'>
														<label htmlFor='firstName'>
															Address{' '}
															<span className='text-danger'>
																*
															</span>
														</label>
														<input
															type='text'
															className='form-control'
															placeholder='Address'
															name='shipping_address1'
															onChange={
																handleChange
															}
															onBlur={handleBlur}
															onKeyDown={event => {
																if (
																	event.keyCode ===
																		32 &&
																	event.target
																		.selectionStart ===
																		0
																) {
																	event.preventDefault();
																}
															}}
															value={
																state?.shipping_address1
															}
															disabled={
																isSubmitVal
															}
														/>
														<span className='text-danger text-center'>
															{
																formErrors.address1
															}
														</span>
													</div>
													<div className='col-md-6 form-group'>
														<label htmlFor='firstName'>
															Apartment etc.
															<span className='text-danger'>
																*
															</span>
														</label>
														<input
															type='text'
															className='form-control'
															placeholder='Apartment etc.'
															name='shipping_address2'
															onChange={
																handleChange
															}
															onBlur={handleBlur}
															onKeyDown={event => {
																if (
																	event.keyCode ===
																		32 &&
																	event.target
																		.selectionStart ===
																		0
																) {
																	event.preventDefault();
																}
															}}
															value={
																state?.shipping_address2
															}
															disabled={
																isSubmitVal
															}
														/>
														<span className='text-danger text-center'>
															{
																formErrors.address2
															}
														</span>
													</div>
													<div className='col-md-6 form-group'>
														<label htmlFor='firstName'>
															City{' '}
															<span className='text-danger'>
																*
															</span>
														</label>
														<input
															type='text'
															className='form-control'
															placeholder='Enter Your City Name'
															name='shipping_city'
															onChange={
																handleChange
															}
															onBlur={handleBlur}
															onKeyDown={event => {
																if (
																	event.keyCode ===
																		32 &&
																	event.target
																		.selectionStart ===
																		0
																) {
																	event.preventDefault();
																}
															}}
															value={
																state?.shipping_city
															}
															disabled={
																isSubmitVal
															}
														/>
														<span className='text-danger text-center'>
															{
																formErrors.addressCity
															}
														</span>
													</div>
													<div className='col-md-6 form-group'>
														<label htmlFor='firstName'>
															Postal Code{' '}
															<span className='text-danger'>
																*
															</span>
														</label>
														<input
															type='text'
															className='form-control'
															placeholder='Postal Code'
															name='shipping_postal_code'
															onChange={
																handleChange
															}
															// onBlur={handleBlur}
															onBlur={() => {
																{
																	state
																		?.shipping_postal_code
																		.length >
																	6
																		? (errors.postal_code =
																				'Postal Code Should have 6 Digits!')
																		: state
																				?.shipping_postal_code
																				.length <
																		  6
																		? (errors.postal_code =
																				'Postal Code not more than 6 Digits!')
																		: null;

																	cartListCall;
																}
															}}
															onKeyDown={event => {
																if (
																	event.keyCode ===
																	32
																) {
																	event.preventDefault();
																}
															}}
															value={
																state?.shipping_postal_code
															}
															disabled={
																isSubmitVal
															}
														/>
														<span className='text-danger text-center'>
															{
																formErrors.postal_code
															}
														</span>

														<span className='text-danger text-center'>
															{!!state?.shipping_postal_code &&
															state.cartDetails
																?.shipping
																?.message ===
																'Shipping not available at this zone.'
																? state
																		.cartDetails
																		?.shipping
																		?.message
																: ''}
														</span>
													</div>
													<div className='col-md-6 form-group'>
														<label htmlFor='firstName'>
															State{' '}
															<span className='text-danger'>
																*
															</span>
														</label>
														<input
															type='text'
															className='form-control'
															placeholder='Enter Your State Name'
															name='shipping_state'
															onChange={
																handleChange
															}
															onBlur={handleBlur}
															onKeyDown={event => {
																if (
																	event.keyCode ===
																		32 &&
																	event.target
																		.selectionStart ===
																		0
																) {
																	event.preventDefault();
																}
															}}
															value={
																state?.shipping_state
															}
															disabled={
																isSubmitVal
															}
														/>
														<span className='text-danger text-center'>
															{
																formErrors.addressState
															}
														</span>
													</div>

													<div className='col-md-6 form-group'>
														<label htmlFor='firstName'>
															Country{' '}
															<span className='text-danger'>
																*
															</span>
														</label>
														<select
															className='form-control'
															name='shipping_country'
															onChange={
																handleChange
															}
															onBlur={handleBlur}
															value={
																state?.shipping_country ||
																''
															}
															disabled={
																isSubmitVal
															}
														>
															<option value=''>
																Select Country
															</option>
															{globalState?.countries?.map(
																item => (
																	<option
																		value={
																			item.id
																		}
																		key={
																			item.id
																		}
																	>
																		{
																			item.name
																		}
																	</option>
																),
															)}
														</select>
														<span className='text-danger text-center'>
															{formErrors.country}
														</span>
													</div>
												</div>
											</div>
											<div className='shipping-blockbilladress'>
												<div className='col-md-12'>
													<div className='row'>
														<div
															className='col-md-12  rounded'
															style={{
																padding:
																	'10px 5px 5px 5px',
															}}
														>
															<input
																type='checkbox'
																value='no'
																className='shipping'
																name='sameBillingAddress'
																onClick={
																	handleBillingAddress
																}
																disabled={
																	isSubmitVal
																}
															/>
															<span className='ml-2'>
																Click Here if
																billing address
																is different
															</span>
														</div>
													</div>
												</div>
											</div>
											{billingDiv === false ? (
												<div className='shipping-block1'>
													<h5 className='sub-head'>
														Billing Address{' '}
														<span className='text-danger'>
															*
														</span>
													</h5>
													<div className='row'>
														<div className='col-md-6 form-group'>
															<label htmlFor='firstName'>
																Address{' '}
																<span className='text-danger'>
																	*
																</span>
															</label>
															<input
																type='text'
																className='form-control'
																placeholder='Address'
																name='billing_address1'
																onChange={
																	handleChangeBilling
																}
																onBlur={
																	handleBlur
																}
																onKeyDown={event => {
																	if (
																		event.keyCode ===
																			32 &&
																		event
																			.target
																			.selectionStart ===
																			0
																	) {
																		event.preventDefault();
																	}
																}}
																value={
																	state?.billing_address1
																}
																disabled={
																	isSubmitVal
																}
															/>
															<span className='text-danger text-center'>
																{
																	formErrors.billing_address1
																}
															</span>
														</div>
														<div className='col-md-6 form-group'>
															<label htmlFor='firstName'>
																Apartment, Suit
																etc.{' '}
																<span className='text-danger'>
																	*
																</span>
															</label>
															<input
																type='text'
																className='form-control'
																placeholder='Apartment, Suit etc.'
																name='billing_address2'
																onChange={
																	handleChangeBilling
																}
																onBlur={
																	handleBlur
																}
																onKeyDown={event => {
																	if (
																		event.keyCode ===
																			32 &&
																		event
																			.target
																			.selectionStart ===
																			0
																	) {
																		event.preventDefault();
																	}
																}}
																value={
																	state?.billing_address2
																}
																disabled={
																	isSubmitVal
																}
															/>
															<span className='text-danger text-center'>
																{
																	formErrors.billing_address2
																}
															</span>
														</div>
														<div className='col-md-6 form-group'>
															<label htmlFor='firstName'>
																City{' '}
																<span className='text-danger'>
																	*
																</span>
															</label>
															<input
																type='text'
																className='form-control'
																placeholder='Enter Your City Name'
																name='billing_city'
																onChange={
																	handleChangeBilling
																}
																onBlur={
																	handleBlur
																}
																onKeyDown={event => {
																	if (
																		event.keyCode ===
																			32 &&
																		event
																			.target
																			.selectionStart ===
																			0
																	) {
																		event.preventDefault();
																	}
																}}
																value={
																	state?.billing_city
																}
																disabled={
																	isSubmitVal
																}
															/>
															<span className='text-danger text-center'>
																{
																	formErrors.billing_city
																}
															</span>
														</div>
														<div className='col-md-6 form-group'>
															<label htmlFor='firstName'>
																Postal Code{' '}
																<span className='text-danger'>
																	*
																</span>
															</label>
															<input
																type='text'
																className='form-control'
																placeholder='Postal Code'
																name='billing_postal_code'
																onChange={
																	handleChangeBilling
																}
																onBlur={
																	handleBlur
																}
																onKeyDown={event => {
																	if (
																		event.keyCode ===
																			32 &&
																		event
																			.target
																			.selectionStart ===
																			0
																	) {
																		event.preventDefault();
																	}
																}}
																value={
																	state?.billing_postal_code
																}
																disabled={
																	isSubmitVal
																}
															/>
															<span className='text-danger text-center'>
																{
																	formErrors.billing_postal_code
																}
															</span>
														</div>
														<div className='col-md-6 form-group'>
															<label htmlFor='firstName'>
																State{' '}
																<span className='text-danger'>
																	*
																</span>
															</label>
															<input
																type='text'
																className='form-control'
																placeholder='Enter Your State Name'
																name='billing_state'
																onChange={
																	handleChangeBilling
																}
																onBlur={
																	handleBlur
																}
																onKeyDown={event => {
																	if (
																		event.keyCode ===
																			32 &&
																		event
																			.target
																			.selectionStart ===
																			0
																	) {
																		event.preventDefault();
																	}
																}}
																value={
																	state?.billing_state
																}
																disabled={
																	isSubmitVal
																}
															/>
															<span className='text-danger text-center'>
																{
																	formErrors.billing_state
																}
															</span>
														</div>

														<div className='col-md-6 form-group'>
															<label htmlFor='firstName'>
																Country{' '}
																<span className='text-danger'>
																	*
																</span>
															</label>
															<select
																className='form-control'
																name='billing_country'
																onChange={
																	handleChangeBilling
																}
																onBlur={
																	handleBlur
																}
																value={
																	state?.billing_country ||
																	''
																}
																disabled={
																	isSubmitVal
																}
															>
																<option value=''>
																	Select
																	Country
																</option>
																{globalState?.countries?.map(
																	item => (
																		<option
																			value={
																				item.id
																			}
																			key={
																				item.id
																			}
																		>
																			{
																				item.name
																			}
																		</option>
																	),
																)}
															</select>
															<span className='text-danger text-center'>
																{
																	formErrors.billing_country
																}
															</span>
														</div>
													</div>
												</div>
											) : null}
										</div>
									</div>
								</div>
							</div>

							{/* {billingDiv === false ? (
									<div className='shipping-block1'>
										<h5 className='sub-head'>
											Billing Address{' '}
											<span className='text-danger'>
												*
											</span>
										</h5>
										<div className='row'>
											<div className='col-md-12 form-group'>
												<input
													type='text'
													className='form-control'
													placeholder='Address'
													name='billing_address1'
													onChange={
														handleChangeBilling
													}
													onBlur={handleBlur}
													onKeyDown={event => {
														if (
															event.keyCode ===
																32 &&
															event.target
																.selectionStart ===
																0
														) {
															event.preventDefault();
														}
													}}
													value={
														state?.billing_address1
													}
													disabled={isSubmitVal}
												/>
												<span className='text-danger text-center'>
													{
														formErrors.billing_address1
													}
												</span>
											</div>
											<div className='col-md-12 form-group'>
												<label htmlFor='firstName'>
													Apartment, Suit etc.{' '}
													<span className='text-danger'>
														*
													</span>
												</label>
												<input
													type='text'
													className='form-control'
													placeholder='Apartment, Suit etc.'
													name='billing_address2'
													onChange={
														handleChangeBilling
													}
													onBlur={handleBlur}
													onKeyDown={event => {
														if (
															event.keyCode ===
																32 &&
															event.target
																.selectionStart ===
																0
														) {
															event.preventDefault();
														}
													}}
													value={
														state?.billing_address2
													}
													disabled={isSubmitVal}
												/>
												<span className='text-danger text-center'>
													{
														formErrors.billing_address2
													}
												</span>
											</div>
											<div className='col-md-12 form-group'>
												<label htmlFor='firstName'>
													City{' '}
													<span className='text-danger'>
														*
													</span>
												</label>
												<input
													type='text'
													className='form-control'
													placeholder='Enter Your City Name'
													name='billing_city'
													onChange={
														handleChangeBilling
													}
													onBlur={handleBlur}
													onKeyDown={event => {
														if (
															event.keyCode ===
																32 &&
															event.target
																.selectionStart ===
																0
														) {
															event.preventDefault();
														}
													}}
													value={state?.billing_city}
													disabled={isSubmitVal}
												/>
												<span className='text-danger text-center'>
													{formErrors.billing_city}
												</span>
											</div>
											<div className='col-xl-6 form-group'>
												<input
													type='text'
													className='form-control'
													placeholder='Postal Code'
													name='billing_postal_code'
													onChange={
														handleChangeBilling
													}
													onBlur={handleBlur}
													onKeyDown={event => {
														if (
															event.keyCode ===
																32 &&
															event.target
																.selectionStart ===
																0
														) {
															event.preventDefault();
														}
													}}
													value={
														state?.billing_postal_code
													}
													disabled={isSubmitVal}
												/>
												<span className='text-danger text-center'>
													{
														formErrors.billing_postal_code
													}
												</span>
											</div>
											<div className='col-md-6 form-group'>
												<input
													type='text'
													className='form-control'
													placeholder='Enter Your State Name'
													name='billing_state'
													onChange={
														handleChangeBilling
													}
													onBlur={handleBlur}
													onKeyDown={event => {
														if (
															event.keyCode ===
																32 &&
															event.target
																.selectionStart ===
																0
														) {
															event.preventDefault();
														}
													}}
													value={state?.billing_state}
													disabled={isSubmitVal}
												/>
												<span className='text-danger text-center'>
													{formErrors.billing_state}
												</span>
											</div>

											<div className='col-md-6 form-group'>
												<select
													className='form-control'
													name='billing_country'
													onChange={
														handleChangeBilling
													}
													onBlur={handleBlur}
													value={
														state?.billing_country ||
														''
													}
													disabled={isSubmitVal}
												>
													<option value=''>
														Select Country
													</option>
													{globalState?.countries?.map(
														item => (
															<option
																value={item.id}
																key={item.id}
															>
																{item.name}
															</option>
														),
													)}
												</select>
												<span className='text-danger text-center'>
													{formErrors.billing_country}
												</span>
											</div>
										</div>
									</div>
								) : null}
							</div> */}

							<div className='col-lg-4'>
								<div className='summary-bx'>
									<h4>Summary</h4>

									{state.cartDetails?.data.map(
										(item, index) => {
											return (
												<ul
													className='list-group mb-3'
													key={index}
												>
													<li className='list-group-item d-flex justify-content-between lh-condensed'>
														<div>
															<h6 className='my-0'>
																{
																	item.product
																		.title
																}
															</h6>
														</div>
													</li>
													<li className='list-group-item d-flex justify-content-between'>
														<strong>
															Total Product Price
															-{' '}
														</strong>
														<strong>
															{
																item.display_final_price
															}
															<i
																className='fa fa-times'
																aria-hidden='true'
															></i>
															{item.quantity}
														</strong>
														<strong>
															{item.display_final}
														</strong>
													</li>
												</ul>
											);
										},
									)}
									<hr />

									<ul className='list-group mb-3'>
										<li className='list-group-item d-flex justify-content-between'>
											<strong>
												<span>
													Shipping{' '}
													{state?.shipping?.type
														? `(${state.shipping.type})`
														: ''}
												</span>
											</strong>
											<strong>
												{state?.cartDetails
													?.display_shipping_charges !==
												null
													? state?.cartDetails
															?.display_shipping_charges
													: 0}
											</strong>
										</li>
										<li className='list-group-item d-flex justify-content-between'>
											<strong>
												<span>Total Amount</span>
											</strong>
											<strong id='total_charge'>
												{
													state.cartDetails
														?.display_total_price
												}
											</strong>
										</li>
									</ul>

									{coupon && (
										<React.Fragment>
											<hr />
											<ul className='list-group mb-3'>
												<li className='list-group-item d-flex justify-content-between'>
													<strong>
														<span>Coupon Code</span>
													</strong>
													<strong>
														{coupon?.code}
													</strong>
												</li>

												<li className='list-group-item d-flex justify-content-between'>
													<strong>
														<span>Discount</span>
													</strong>
													<strong>
														{
															coupon?.display_discount
														}
													</strong>
												</li>

												<li className='list-group-item d-flex justify-content-between'>
													<strong>
														<span>
															Total Amount
														</span>
													</strong>
													<strong id='total_charge'>
														{coupon?.dispay_total}
													</strong>
												</li>
											</ul>
										</React.Fragment>
									)}

									<ul className='list-group mb-3'>
										<li className='list-group-item d-flex justify-content-between'>
											<span>Have a Code?</span>
										</li>
										<li className='list-group-item d-flex justify-content-between'>
											<form
												className='coupon code'
												onSubmit={
													coupon &&
													Object.keys(coupon).length >
														0
														? removeCouponCode
														: applyCouponCode
												}
											>
												<div className='coupon-box'>
													<input
														type='text'
														name='couponCode'
														id='coupon_code'
														placeholder='Add code here'
														value={
															coupon &&
															Object.keys(coupon)
																.length > 0
																? coupon.code
																: null
														}
														disabled={
															(coupon &&
																Object.keys(
																	coupon,
																).length > 0) ||
															isSubmitVal
																? true
																: false
														}
													/>
													<button
														type='submit'
														className='button button-plain'
													>
														{loadingCoupon
															? 'Applying...'
															: `${
																	coupon &&
																	Object.keys(
																		coupon,
																	).length > 0
																		? 'Remove Coupon'
																		: 'Apply Code'
															  }`}
													</button>
												</div>
												<span className='coupon_code'></span>
											</form>
										</li>
									</ul>

									<button
										className='custom-btn checkoutBtn'
										type='button'
										onClick={handleSubmit}
										disabled={
											state?.placeOrderLoading
												? 'disabled'
												: ''
										}
									>
										{state?.placeOrderLoading
											? 'Processing order...'
											: 'Place Order'}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Checkout;
