import React, {useState, useEffect} from 'react';
import Router from 'next/router';
import {toast} from 'react-toastify';

import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';
import AccountSidebar from '@components/Common/Account/AccountSidebar';
import UserService from '@utils/services';
import {useGlobalContext} from '@context/ContextApi';
import Loading from '@components/Common/Loading';

const Account = () => {
	const {state, dispatch} = useGlobalContext();

	const [inputs, setInputs] = useState({});
	const [loading, setLoading] = useState(false);
	const [validateError, setValidateError] = useState({});
	const [disable, setDisable] = useState(true);
	const [submitDisable, setSubmitDisable] = useState(false);
	const router = Router;

	// const [profileDetails, setprofileDetails] = useState([]);
	const handleChange = event => {
		const name = event.target.name;
		const value = event.target.value.replace(/^\s/, '');
		setInputs(values => ({...values, [name]: value}));
	};

	const handleBlur = () => {
		setValidateError(validate(inputs));
	};

	const handleChangeMobileNo = event => {
		const name = event.target.name;
		const value = event.target.value.replace(/[^0-9]/gi, '');
		setInputs(values => ({...values, [name]: value}));
	};

	const validate = values => {
		const errors = {};
		// const regexp = /^\S*$/;
		if (!values.firstname) {
			errors.firstname = 'First name field is required';
		} else if (values.firstname.length > 20) {
			errors.firstname = 'First name field is Too Long';
		}
		if (!values.lastname) {
			errors.lastname = 'Last name field is required';
		} else if (values.lastname.length > 20) {
			errors.lastname = 'Last name field is Too Long';
		}
		// if (!values.email) {
		// 	errors.email = 'Email field is required !';
		// } else if (!/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/.test(values.email)) {
		// 	errors.email = 'Enter valid email address.';
		// }
		if (!values?.mobile) {
			errors.mobile = 'Mobile Number is required!';
		} else if (values.mobile.length < 8) {
			errors.mobile = 'Mobile must be between 8 and 16 digits!';
		} else if (values.mobile.length > 16) {
			errors.mobile = 'Mobile not more than 16 digits!';
		}
		return errors;
	};

	const handleSubmit = async event => {
		setSubmitDisable(true);
		setLoading(true);
		event.preventDefault();
		const result = validate(inputs);
		if (Object.keys(result).length) {
			// eslint-disable-next-line no-undef
			setValidateError(result);
			setSubmitDisable(false);
			setLoading(false);
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
				const response = await UserService.updateProfileDetail(
					formData,
				);
				if (response.status) {
					setLoading(true);
					toast.success(response.message);
					dispatch({
						type: 'SET_DATA',
						data: {
							...state,
							userAuth: response.data,
						},
					});
					setSubmitDisable(false);
					setLoading(false);
					router.push('/dashboard');
				} else if (response.code === 400) {
					toast.warning(response.message);
				}
			} catch (e) {
				setSubmitDisable(false);
				setLoading(false);
				console.log({e});
			}
		}
	};
	useEffect(() => {
		setInputs({
			firstname: state?.userAuth?.data?.firstname,
			lastname: state?.userAuth?.data?.lastname,
			email: state?.userAuth?.data?.email,
			mobile: state?.userAuth?.data?.mobile,
		});
	}, [state?.userAuth]);

	return (
		<>
			<SpinnerLoader loading={loading} />
			<div className='cms-page innerblock-padd'>
				<div className='container'>
					<div className='dashborad-panel'>
						<div className='col-md-3'>
							<AccountSidebar />
						</div>
						<div className='dashborad-rightsider col-md-9 dashright-bx'>
							<h1 className='dash-head'>My account</h1>
							{!state.userAuth ? (
								<Loading />
							) : (
								<form
									className='common-form'
									onSubmit={handleSubmit}
								>
									<div className='row'>
										<div className='col-lg-6 form-group'>
											<label>First Name</label>{' '}
											<span className='required'>*</span>
											<input
												type='text'
												className='form-control'
												placeholder='Alex'
												name='firstname'
												value={inputs.firstname}
												onChange={handleChange}
												onBlur={handleBlur}
												disabled={disable}
											/>
											<span className='text-danger'>
												{validateError.firstname}
											</span>
										</div>
										<div className='col-lg-6 form-group'>
											<label>Last Name</label>{' '}
											<span className='required'>*</span>
											<input
												type='text'
												className='form-control'
												placeholder='Philip'
												name='lastname'
												value={inputs.lastname}
												onChange={handleChange}
												onBlur={handleBlur}
												disabled={disable}
											/>
											<span className='text-danger'>
												{validateError.lastname}
											</span>
										</div>
										<div className='col-lg-6 form-group'>
											<label>Email</label>
											<input
												type='text'
												className='form-control'
												placeholder='Example@email.com.'
												name='email'
												value={inputs.email}
												onChange={handleChange}
												onBlur={handleBlur}
												disabled={true}
											/>
											<span className='text-danger'>
												{validateError.email}
											</span>
										</div>
										<div className='col-lg-6 form-group'>
											<label>Mobile Number</label>
											<span className='required'>*</span>
											<input
												maxLength='16'
												type='text'
												className='form-control'
												placeholder='91-1234567890'
												name='mobile'
												value={inputs.mobile}
												onChange={handleChangeMobileNo}
												onBlur={handleBlur}
												disabled={disable}
											/>
											<span className='text-danger'>
												{validateError.mobile}
											</span>
										</div>

										<div className='col-md-12 text-center'>
											<div className=' button-group'>
												{disable ? (
													''
												) : (
													<button
														type='submit'
														disabled={submitDisable}
														className='custom-btn'
													>
														Submit
													</button>
												)}

												{disable ? (
													<button
														type='submit'
														className='custom-btn'
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
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Account;
