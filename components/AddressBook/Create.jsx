import React, {useState} from 'react';
import Router from 'next/router';
import {toast} from 'react-toastify';

import AccountSidebar from '@components/Common/Account/AccountSidebar';
import {api} from '@utils/api';
import {useGlobalContext} from '@context/ContextApi';
import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';

const Create = () => {
	const router = Router;

	const [inputs, setInputs] = useState({});

	const [validateError, setValidateError] = useState({});
	const [loading, setLoading] = useState(false);
	const [isSubmit, setIsSubmit] = useState(false);
	const {state} = useGlobalContext();

	const handleChange = event => {
		const name = event.target.name;
		const value = event.target.value.replace(/^\s/, '');
		setInputs(values => ({...values, [name]: value}));
	};

	const handleBlur = () => {
		setValidateError(validate(inputs));
	};

	const handleSubmit = async event => {
		event.preventDefault();
		const result = validate(inputs);
		if (Object.keys(result).length) {
			// eslint-disable-next-line no-undef
			setValidateError(result);
			return;
		} else {
			setValidateError({});

			try {
				setLoading(true);
				setIsSubmit(true);
				const response = await api({
					url: '/user-address/add',
					method: 'POST',
					data: inputs,
				});

				if (response.status === true) {
					toast.success('Address added successfully');
					router.push('/address-book');
					setLoading(false);
					setInputs({});
				} else {
					toast.warning(response.data.message);
				}
			} catch (error) {
				// eslint-disable-next-line no-console
				console.log(error);
				setLoading(false);
			}
		}
		setIsSubmit(false);
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
		// else if (values.postal_code) {
		// 	errors.postal_code = 'Please Enter a valid postal code';
		// }
		// eslint-disable-next-line babel/camelcase
		if (!values.country_id) errors.country_id = 'Country field is required';
		return errors;
	};

	return (
		<>
			<SpinnerLoader loading={loading} />
			<div className='cms-page innerblock-padd'>
				<div className='container'>
					<div className='dashborad-panel'>
						<div className='col-md-3'>
							<AccountSidebar />
						</div>
						<div className='dashborad-rightsider  col-md-9 dashright-bx'>
							<h1 className='dash-head'>Add Address</h1>

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
											value={inputs.address1 || ''}
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
											value={inputs.address2 || ''}
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
											value={inputs.city || ''}
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
											value={inputs.postal_code || ''}
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
											className='form-control  '
											placeholder='State'
											name='state'
											onChange={handleChange}
											onBlur={handleBlur}
											value={inputs.state || ''}
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
											value={inputs.country_id || ''}
										>
											<option value=''>
												--Select Country--
											</option>
											{state?.countries?.map(item => (
												<option
													value={item.id}
													key={item.id}
												>
													{item.name}
												</option>
											))}
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
												disabled={
													isSubmit ? true : false
												}
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

export default Create;
