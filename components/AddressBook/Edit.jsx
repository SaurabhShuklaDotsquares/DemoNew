import React, {useEffect, useState} from 'react';
import Router from 'next/router';
import {toast} from 'react-toastify';

import AccountSidebar from '@components/Common/Account/AccountSidebar';
import {api} from '@utils/api';
import {useGlobalContext} from '@context/ContextApi';
import {useContextState} from '@context/reducer';

const Edit = () => {
	const router = Router;

	const [validateError, setValidateError] = useState({});
	const {state: globalState} = useGlobalContext();
	const {state, dispatch} = useContextState();

	const getAddress = async () => {
		const response = await api({
			url: `/user-address/detail/${+router.query.slug}`,
			method: 'GET',
		});

		if (response.status) {
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					address: {
						// eslint-disable-next-line babel/camelcase
						user_address_id: response.data.id,
						...response.data,
					},
				},
			});
		}
	};

	const handleChange = event => {
		const name = event.target.name;
		const value = event.target.value.replace(/^\s/, '');
		dispatch({
			type: 'SET_DATA',
			data: {
				...state,
				address: {
					...state.address,
					[name]: value,
				},
			},
		});
	};

	const handleBlur = () => {
		setValidateError(validate(state.address));
	};

	const handleSubmit = async event => {
		event.preventDefault();
		const result = validate(state.address);

		if (Object.keys(result).length) {
			// eslint-disable-next-line no-undef
			setValidateError(result);
			return;
		} else {
			setValidateError({});
			try {
				const data = {
					user_address_id: state?.address?.user_address_id,
					id: state?.address?.id,
					address1: state?.address?.address1,
					address2: state?.address?.address2,
					city: state?.address?.city,
					postal_code: parseInt(state?.address?.postal_code),
					state: state?.address?.state,
					country_id: parseInt(state?.address?.country_id),
					name: state?.address?.name,
					address_type: state?.address?.address_type,
				};
				const response = await api({
					url: '/user-address/update',
					method: 'POST',
					data,
				});

				if (response.status) {
					toast.success('Address updated successfully');
					router.push('/address-book');
				}
			} catch (error) {
				// eslint-disable-next-line no-console
				console.log(error);
			}
		}
	};

	const validate = values => {
		const errors = {};
		if (!values.address1) {
			errors.address1 = 'Address field is required';
		} else if (values.address1.length > 150) {
			errors.address1 = 'Address field is Too Long';
		}
		if (!values.address2) {
			errors.address2 = 'Address line field is required';
		} else if (values.address2.length > 150) {
			errors.address2 = 'Address line field is Too Long';
		}
		if (!values.city) {
			errors.city = 'City field is required';
		} else if (values.city.length > 150) {
			errors.city = 'City field is Too Long';
		}
		if (!values.state) errors.state = 'State field is required';
		if (!values.postal_code) {
			errors.postal_code = 'Postal code field is required';
		}
		// else if (isNaN(values.postal_code)) {
		// 	errors.postal_code = 'Please Enter a valid postal code';
		// }

		// eslint-disable-next-line babel/camelcase
		if (!values.country_id) errors.country_id = 'Country field is required';
		return errors;
	};

	useEffect(() => {
		getAddress();
	}, []);

	return (
		<>
			<div className='cms-page innerblock-padd'>
				<div className='container'>
					<div className='dashborad-panel'>
						<div className='col-md-3'>
							<AccountSidebar />
						</div>
						<div className='dashborad-rightsider  col-md-9 dashright-bx'>
							<h1 className='dash-head'>Update Address</h1>

							<form
								className='common-form'
								onSubmit={handleSubmit}
							>
								<div className='row'>
									<div className='col-lg-6 form-group'>
										<label>
											Address{' '}
											<span className='text-danger'>
												*
											</span>
										</label>
										<input
											type='text'
											className='form-control'
											placeholder='Address'
											name='address1'
											onChange={handleChange}
											onBlur={handleBlur}
											value={state?.address?.address1}
										/>
										<span className='text-danger'>
											{validateError.address1}
										</span>
									</div>
									<div className='col-lg-6 form-group'>
										<label>
											Address Line{' '}
											<span className='text-danger'>
												*
											</span>
										</label>
										<input
											type='text'
											className='form-control'
											placeholder='Address Line'
											name='address2'
											onChange={handleChange}
											onBlur={handleBlur}
											value={state?.address?.address2}
										/>
										<span className='text-danger'>
											{validateError.address2}
										</span>
									</div>

									<div className='col-lg-6 form-group'>
										<label>
											City
											<span className='text-danger'>
												*
											</span>
										</label>
										<input
											type='text'
											className='form-control'
											placeholder='City'
											name='city'
											onChange={handleChange}
											onBlur={handleBlur}
											value={state?.address?.city}
										/>
										<span className='text-danger'>
											{validateError.city}
										</span>
									</div>
									<div className='col-lg-6 form-group'>
										<label>
											Postal Code
											<span className='text-danger'>
												*
											</span>
										</label>
										<input
											type='text'
											maxLength='6'
											className='form-control'
											placeholder='Postal Code'
											name='postal_code'
											onChange={handleChange}
											onBlur={handleBlur}
											value={state?.address?.postal_code}
										/>
										<span className='text-danger'>
											{validateError.postal_code}
										</span>
									</div>

									<div className='col-lg-6 form-group'>
										<label>
											State
											<span className='text-danger'>
												*
											</span>
										</label>
										<input
											type='text'
											className='form-control'
											placeholder='State'
											name='state'
											onChange={handleChange}
											onBlur={handleBlur}
											value={state?.address?.state}
										/>
										<span className='text-danger'>
											{validateError.state}
										</span>
									</div>
									<div className='col-lg-6 form-group'>
										<label>
											Country
											<span className='text-danger'>
												*
											</span>
										</label>
										<select
											className='form-control select2"'
											name='country_id'
											onChange={handleChange}
											onBlur={handleBlur}
										>
											<option value=''>
												--Select Country--
											</option>
											{globalState?.countries?.map(
												item => (
													<option
														value={item.id}
														key={item.id}
														selected={
															parseInt(
																state?.address
																	?.country_id,
															) === item.id
																? 'selected'
																: ''
														}
													>
														{item.name}
													</option>
												),
											)}
										</select>
										<span className='text-danger'>
											{validateError.country_id}
										</span>
									</div>

									<div className='col-md-12 text-center'>
										<div className=' button-group'>
											<button
												type='submit'
												id='addres_submit'
												className='custom-btn'
											>
												Submit
											</button>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Edit;
