// / eslint-disable no-console /
import React, {useState, useEffect, useCallback} from 'react';
import Link from 'next/link';
import {toast} from 'react-toastify';
import 'react-phone-input-2/lib/style.css';
import {Spinner} from 'react-bootstrap';
import 'intl-tel-input/build/css/intlTelInput.css';
// import intlTelInputUtils from 'intl-tel-input/build/js/utils';
// import intlTelInput from 'intl-tel-input';
import {useRouter} from 'next/router';

import AccountSidebar from '@components/Common/Account/AccountSidebar';
import UserService from '@utils/services';
import {useGlobalContext} from '@context/ContextApi';
import {api} from '@utils/api';
import Cookies from 'js-cookie';

('use client');

const Account = () => {
	const [countryList, setcountryList] = useState();
	//const itiRef = useRef(null);
	const {state, dispatch} = useGlobalContext();

	const [inputs, setInputs] = useState({});
	const [validateError, setValidateError] = useState({});
	const [disable, setDisable] = useState(true);
	const router = useRouter();
	const [file, setFile] = useState([]);
	const [isLoading, setLoading] = useState(false);

	const getCountryList = async () => {
		try {
			const response = await api({
				// url: '/users/country-list',
				url: '/country-list',
				method: 'GET',
			});
			if (response?.data) {
				setcountryList(response?.data);
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(error);
		}
	};

	const handleChange = event => {
		const name = event.target.name;

		const value = event.target.value.replace(/^\s/, '');
		setInputs(values => ({...values, [name]: value}));
	};

	const handleBlur = () => {
		setValidateError(validate(inputs));
	};

	const handleChangeImage = e => {
		let allowedExtension = ['jpg', 'jpeg', 'txt', 'png', 'pdf', 'doc'];
		let extension = e.target.files[0].name
			.replace(/.*\./, '')
			.toLowerCase();
		if (allowedExtension.indexOf(extension) < 0) {
			const errors = {};
			errors.fileError =
				'Please upload valid file of file format like doc, pdf, png, jpg, jpeg.';
			toast.error(
				'Please upload valid file of file format like doc, pdf, png, jpg, jpeg.',
			);
			setValidateError(errors);
			return;
		} else {
			setFile(e.target.files[0]);
		}
	};

	const handlePhoneChange = event => {
		const name = event.target.name;
		const value = event.target.value.replace(/[^0-9]/gi, '');
		setInputs(values => ({...values, [name]: value}));
	};

	const validate = values => {
		const errors = {};
		const emailRegex =
			// eslint-disable-next-line no-useless-escape
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

		if (!values.firstname) {
			errors.firstname = 'First name field is required';
		} else if (values.firstname.length > 12) {
			errors.firstname = 'First name field is Too Long';
		}
		if (!values.lastname) {
			errors.lastname = 'Last name field is required';
		} else if (values.lastname.length > 12) {
			errors.lastname = 'Last name field is Too Long';
		}

		if (!values.business_name) {
			errors.business_name = 'Business name field is required';
		} else if (values.business_name.length > 70) {
			errors.business_name = 'Business name field is Too Long';
		}

		if (!values.vat_no) {
			errors.vat_no = 'Vat No. field is required';
		} else if (values.vat_no.length > 20) {
			errors.vat_no = 'Vat No. field is Too Long';
		}

		if (!values.email) {
			errors.email = 'Email field is required !';
		} else if (!emailRegex.test(values.email)) {
			errors.email = 'Enter valid email address!';
		}

		if (!values?.mobile) {
			errors.mobile = 'Mobile is required!';
		} else if (values.mobile.length < 9) {
			errors.mobile = 'Mobile must be between 9 and 16 digits!';
		} else if (values.mobile.length > 16) {
			errors.mobile = 'Mobile not more than 16 digits!';
		}
		return errors;
	};

	const handleSubmit = async event => {
		event.preventDefault();
		const result = validate(inputs);
		if (Object.keys(result).length) {
			// eslint-disable-next-line no-undef
			setValidateError(result);
			return;
		} else {
			setDisable(false);
			setValidateError({});
			try {
				let formData = new FormData();
				formData.append('firstname', inputs.firstname);
				formData.append('lastname', inputs.lastname);
				formData.append('mobile', inputs.mobile);
				formData.append('email', inputs.email);
				formData.append('business_name', inputs.business_name);
				formData.append('vat_no', inputs.vat_no);
				formData.append('country', inputs.country);
				formData.append('images[]', file);
				const response = await UserService.updateVendorProfileDetail(
					inputs,
				);
				if (response.status) {
					toast.success(response.data.message);
					dispatch({
						type: 'SET_DATA',
						data: {
							...state,
							userAuth: response.data.data,
						},
					});
					router.push('/vendor/dashboard');
				}
			} catch (e) {
				console.log({e});
			}
		}
	};

	useEffect(() => {
		getCountryList();
	}, []);

	const connectStripe = useCallback(async () => {
		const url = window.location.origin + '/stripe/connect';

		setLoading(true);
		setDisable(true);
		const response = await api({
			url: `/vendor/stripe/create-stripe-account`,
			method: 'POST',
			data: {redirect_url: url},
		});
		// consol.log("Response Stripe :", response);

		setLoading(false);

		if (response.error) {
			toast.error(response.message);
			router.push('/vendor/account');
			return;
		}

		const res = response.data.url.split('/');
		const acc = res[res.length - 2];
		Cookies.set('connect_account', acc);
		console.log('response.data.url', response.data.url);
		router.push(response.data.url);
	}, []);

	useEffect(() => {
		if (!inputs.length) {
			setInputs({
				firstname: state?.userAuth?.firstname,
				lastname: state?.userAuth?.lastname,
				email: state?.userAuth?.email,
				mobile: state?.userAuth?.mobile,
				business_name: state?.userAuth?.business_name,
				vat_no: state?.userAuth?.vat_no,
				country: state?.userAuth?.country,
			});
		}
		state?.userAuth?.business_document?.map(image => {
			setFile(image.image_link);
		});
	}, [state]);

	console.log(
		'state?.userAuth?.stripe_account',
		state?.userAuth?.stripe_account,
	);
	return (
		<>
			<section className='cms-page '>
				<div className='container'>
					<div className='dashborad-panel'>
						<AccountSidebar />
						<div className='dashborad-rightsider'>
							<div className=''>
								<div className='row mb-4'>
									<div className='col-lg-3'>
										<span>
											<h3 style={{fontWeight: '700'}}>
												MY ACCOUNT
											</h3>
										</span>
									</div>
									<div className='col-lg-9 d-flex align-items-start justify-content-lg-end flex-wrap'>
										{isLoading ? (
											<button className='custom-btn mb-4 mr-2 loader-btn'>
												<Spinner
													animation='border'
													color='#FFF'
													size='sm'
												/>
											</button>
										) : state?.userAuth?.stripe_account ? (
											<button
												disabled={disable}
												className='custom-btn mr-3 mb-4 pl-4 pr-4'
												onClick={connectStripe}
											>
												Stripe is Already Verified
											</button>
										) : (
											<button
												className='custom-btn mr-3 mb-4 pl-4 pr-4'
												onClick={connectStripe}
											>
												Connect Stripe For Payouts
											</button>
										)}

										<Link
											className='btn custom-btn mb-4 pl-4 pr-4'
											href={`/vendor/changepassword`}
										>
											Change Password
										</Link>
									</div>
								</div>

								<form onSubmit={handleSubmit}>
									<div className='row'>
										<div className='col-md-6 form-group'>
											<label htmlFor='firstname'>
												First Name{' '}
												<span className='text-danger'>
													*
												</span>
											</label>
											<input
												className='form-control'
												type='text'
												name='firstname'
												value={inputs?.firstname || ''}
												placeholder='First Name'
												onChange={handleChange}
												onBlur={handleBlur}
												disabled={disable}
											/>
											<span className='text-danger'>
												{validateError.firstname}
											</span>
										</div>
										<div className='col-md-6 form-group'>
											<label htmlFor='last'>
												Last Name{' '}
												<span className='text-danger'>
													*
												</span>
											</label>
											<input
												className='form-control'
												type='text'
												name='lastname'
												value={inputs?.lastname || ''}
												placeholder='Last Name'
												onChange={handleChange}
												onBlur={handleBlur}
												disabled={disable}
											/>
											<span className='text-danger'>
												{validateError.lastname}
											</span>
										</div>
										<div className='col-md-6 form-group'>
											<label htmlFor='email'>Email</label>
											<input
												type='text'
												className='form-control  '
												placeholder='example@email.com.'
												name='email'
												value={inputs?.email || ''}
												disabled={true}
												//onChange={handleChange}
											/>
											<span className='text-danger'>
												{validateError.email}
											</span>
										</div>
										<div className='col-md-6 form-group'>
											<label htmlFor='Mobile'>
												Mobile Number{' '}
												<span className='text-danger'>
													*
												</span>
											</label>
											<div className=''>
												<input
													//ref={phoneRef}
													type='tel'
													className='form-control'
													//onBlur={handlePhoneBlur}
													name='mobile'
													value={inputs?.mobile || ''}
													placeholder='Enter Phone Number'
													onChange={handlePhoneChange}
													onBlur={handleBlur}
													disabled={disable}
												/>
											</div>
											<span className='text-danger'>
												{validateError.mobile}
											</span>
											<br />
										</div>
										<div className='col-md-6 form-group'>
											<label htmlFor='business'>
												Business Name{' '}
												<span className='text-danger'>
													*
												</span>
											</label>
											<input
												type='text'
												className='form-control  '
												placeholder='example@email.com.'
												name='business_name'
												value={
													inputs?.business_name || ''
												}
												onChange={handleChange}
												onBlur={handleBlur}
												disabled={disable}
											/>
											<span className='text-danger'>
												{validateError.business_name}
											</span>
										</div>
										<div className='col-md-6 form-group'>
											<label htmlFor='email'>
												Country
											</label>
											<select
												value={inputs?.country || ''}
												className='form-control'
												name='country'
												onChange={handleChange}
												onBlur={handleBlur}
												disabled={disable}
											>
												<option value=''>
													Select Country
												</option>
												{countryList?.map(
													(item, index) => (
														<option
															key={index}
															value={item.id}
															selected={
																inputs.country ===
																item.id
																	? 'selected'
																	: false
															}
														>
															{item.name}
														</option>
													),
												)}
											</select>
											{/* <span className='text-danger'>
												{validateError.country}
											</span> */}
										</div>
										<div className='col-md-6 form-group'>
											<label htmlFor='vat-number'>
												Business Registration Number(Vat
												No){' '}
												<span className='text-danger'>
													*
												</span>
											</label>
											<input
												type='text'
												className='form-control  '
												value={inputs?.vat_no || ''}
												placeholder='Vat Number'
												name='vat_no'
												required=''
												onChange={handleChange}
												disabled={true}
											/>
											<span className='text-danger'>
												{validateError.vat_no}
											</span>
										</div>
										<div className='col-md-6 form-group'>
											<label htmlFor='business_document'>
												Business Documents
											</label>
											<span className='text-danger'>
												*
											</span>
											<input
												className='form-control'
												type='file'
												id='business_document'
												placeholder=''
												name='business_document'
												accept='image/png, image/jpeg, image/jpg, application/pdf'
												onChange={handleChangeImage}
												disabled={disable}
												required={true}
											/>
										</div>
										<div className='col-md-12 text-center mb-3'>
											<div className=' button-group'>
												{disable ? (
													''
												) : (
													<button
														type='submit'
														className='custom-btn'
														id='my_acocunt_submit'
													>
														Submit
													</button>
												)}
												{disable ? (
													<button
														type='submit'
														className='custom-btn'
														id='my_acocunt_submit'
														onClick={() =>
															setDisable(!disable)
														}
													>
														Edit Profile
													</button>
												) : (
													''
												)}
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Account;
