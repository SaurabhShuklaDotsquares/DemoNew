import React, {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {toast} from 'react-toastify';
import Router from 'next/router';
import SpinnerLoader from '@components/MultiVendor/SpinnerLoader';
import {api} from '@utils/api';

const Signup = () => {
	const [inputs, setInputs] = useState({});
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [eye1, seteye1] = useState(true);
	const [eye2, seteye2] = useState(true);
	const [password1, setpassword1] = useState('password');
	const [password2, setpassword2] = useState('password');
	const [loading, setLoading] = useState(false);
	const router = Router;

	const handleChange = event => {
		const name = event.target.name;
		const value = event.target.value.replace(/^\s/, '');
		setInputs(values => ({...values, [name]: value}));
	};

	const handleBlur = () => {
		setFormErrors(validate(inputs));
	};

	const handleChangeMobileNo = event => {
		const name = event.target.name;
		const value = event.target.value.replace(/[^0-9]/gi, '');
		setInputs(values => ({...values, [name]: value}));
	};

	const handleSubmit = async event => {
		event.preventDefault();
		setFormErrors({});
		const result = validate(inputs);
		if (Object.keys(result).length) {
			setFormErrors(result);
			return;
		} else {
			setIsSubmit(true);

			try {
				// let formData = new FormData();
				// formData.append('firstname', inputs.firstname);
				// formData.append('lastname', inputs.lastname);
				// formData.append('mobile', inputs.mobile);
				// formData.append('email', inputs.email);
				// formData.append('password', inputs.password);
				setLoading(true);
				const response = await api({
					url: '/users/register',
					method: 'POST',
					// data: formData,
					data: inputs,
				});

				if (response.error) {
					setLoading(false);
					setIsSubmit(false);
					toast.error(response.message);
				} else if (response.error === false) {
					setIsSubmit(false);
					setLoading(false);
					toast.success(response.message);
					router.push('/login');
				} else {
					setIsSubmit(false);
					setLoading(false);
					toast.warning(response);
				}
			} catch (error) {
				// eslint-disable-next-line no-console
				setLoading(false);
				console.log(error);
			}
		}
	};

	const handleKeyUp = e => {
		const name = e.target.name;
		const value = e.target.value.trimStart();
		setInputs(values => ({...values, [name]: value}));
	};

	const validate = values => {
		const errors = {};
		const emailRegex =
			// eslint-disable-next-line no-useless-escape
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

		// eslint-disable-next-line prettier/prettier
		const passReg =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*.,#?&])[A-Za-z\d@$!%*.,#?&]{8,50}$/;

		if (!values.firstname) {
			errors.firstname = 'First name is required!';
		} else if (values.firstname.length > 20) {
			errors.firstname = 'Do not enter more than 20 characters!';
		}

		if (!values.lastname) {
			errors.lastname = 'Last name is required!';
		} else if (values.lastname.length > 20) {
			errors.lastname = 'Do not enter more than 20 characters!';
		}

		if (!values.email) {
			errors.email = 'Email field is required!';
		} else if (!emailRegex.test(values.email)) {
			errors.email = 'Enter valid email address!';
		}
		if (!values.password) {
			errors.password = 'Password is required!';
		} else if (!passReg.test(values.password)) {
			errors.password =
				'Password must be minimum 8 character should have at least one lower case, one upper case, one numeric and one special character!';
		}
		if (!values.confirmpassword) {
			errors.confirmpassword = 'Confirm password is required!';
		} else {
			if (!(values.password.length === values.confirmpassword.length)) {
				errors.confirmpassword = 'Password is not matched!';
			}
		}

		if (!parseInt(values.mobile)) {
			errors.mobile = 'Enter mobile number!';
		} else if (parseInt(values.mobile.length) < 8) {
			errors.mobile = 'The mobile number must be between 8 and 16 digits';
		} else if (parseInt(values.mobile.length) > 16) {
			errors.mobile = 'The mobile number not more than 16 digits';
		}
		return errors;
	};
	const Eye = e => {
		let nameEye = e.target.attributes.name.nodeValue;
		if (nameEye === 'passwordEye') {
			password1 === 'password'
				? (setpassword1('text'), seteye1(false))
				: (setpassword1('password'), seteye1(true));
		} else if (nameEye === 'confirmpasswordEye') {
			password2 === 'password'
				? (setpassword2('text'), seteye2(false))
				: (setpassword2('password'), seteye2(true));
		}
	};

	return (
		<>
			<SpinnerLoader loading={loading} />
			<div className='login_page_block'>
				<div className='container'>
					<div className='login_form_block signup-sec-block'>
						<div className='row align-items-center'>
							<div className='col-lg-6'>
								<div className='login_img'>
									<Image
										src='/assets/images/login-img.png'
										alt='login-img'
										width={560}
										height={354}
									/>
								</div>
							</div>
							<div className='col-lg-6'>
								<div className='login_form_right '>
									<div className='signup-sec'>
										<div className='tab-content'>
											<div
												className='tab-pane  active'
												id='buyer'
											>
												<div className='form-tab'>
													<div className='form_heading'>
														<h2>
															Create an Account
														</h2>
													</div>

													<div className='form_filds_block'>
														<form
															onSubmit={
																handleSubmit
															}
															autoComplete='off'
														>
															<div className='row'>
																<div className='col-md-6'>
																	<div className='form-group'>
																		<input
																			type='text'
																			placeholder='First Name*'
																			className='form-control'
																			name='firstname'
																			value={
																				inputs.firstname ||
																				''
																			}
																			onKeyUp={
																				handleKeyUp
																			}
																			onChange={
																				handleChange
																			}
																			onBlur={
																				handleBlur
																			}
																			disabled={
																				isSubmit
																			}
																		/>
																		<span className='text-danger'>
																			{
																				formErrors.firstname
																			}
																		</span>
																	</div>
																</div>
																<div className='col-md-6'>
																	<div className='form-group'>
																		<input
																			type='text'
																			placeholder='Last Name*'
																			className='form-control'
																			name='lastname'
																			value={
																				inputs.lastname ||
																				''
																			}
																			onChange={
																				handleChange
																			}
																			onBlur={
																				handleBlur
																			}
																			onKeyUp={
																				handleKeyUp
																			}
																			disabled={
																				isSubmit
																			}
																		/>
																		<span className='text-danger'>
																			{
																				formErrors.lastname
																			}
																		</span>
																	</div>
																</div>
																<div className='col-md-12'>
																	<div className='form-group'>
																		<input
																			type='text'
																			placeholder='Email Address*'
																			className='form-control'
																			name='email'
																			value={
																				inputs.email ||
																				''
																			}
																			onChange={
																				handleChange
																			}
																			onBlur={
																				handleBlur
																			}
																			onKeyUp={
																				handleKeyUp
																			}
																			disabled={
																				isSubmit
																			}
																		/>
																		<span className='text-danger'>
																			{
																				formErrors.email
																			}
																		</span>
																	</div>
																</div>
																<div className='col-md-12'>
																	<div className='form-group'>
																		<input
																			maxLength='16'
																			type='text'
																			placeholder='Mobile*'
																			className='form-control'
																			name='mobile'
																			value={
																				inputs.mobile ||
																				''
																			}
																			onChange={
																				handleChangeMobileNo
																			}
																			onKeyUp={
																				handleKeyUp
																			}
																			onBlur={
																				handleBlur
																			}
																			disabled={
																				isSubmit
																			}
																		/>
																		<span className='text-danger'>
																			{
																				formErrors.mobile
																			}
																		</span>
																	</div>
																</div>
																<div className='col-md-6'>
																	<div className='form-group'>
																		<input
																			type={
																				password1
																			}
																			placeholder='Password*'
																			className='form-control'
																			name='password'
																			value={
																				inputs.password ||
																				''
																			}
																			onChange={
																				handleChange
																			}
																			onBlur={
																				handleBlur
																			}
																			disabled={
																				isSubmit
																			}
																		/>
																		<span className='p-viewer'>
																			<i
																				name='passwordEye'
																				onClick={
																					Eye
																				}
																				className={`fa ${
																					eye1
																						? 'fa-eye-slash'
																						: 'fa-eye'
																				}`}
																			></i>
																		</span>
																		<span className='text-danger'>
																			{
																				formErrors.password
																			}
																		</span>
																	</div>
																</div>
																<div className='col-md-6'>
																	<div className='form-group'>
																		<input
																			type={
																				password2
																			}
																			placeholder='Confirm Password*'
																			className='form-control'
																			name='confirmpassword'
																			value={
																				inputs.confirmpassword ||
																				''
																			}
																			onChange={
																				handleChange
																			}
																			onBlur={
																				handleBlur
																			}
																			disabled={
																				isSubmit
																			}
																		/>
																		<span className='p-viewer'>
																			<i
																				name='confirmpasswordEye'
																				onClick={
																					Eye
																				}
																				className={`fa ${
																					eye2
																						? 'fa-eye-slash'
																						: 'fa-eye'
																				}`}
																			></i>
																		</span>

																		<span className='text-danger'>
																			{
																				formErrors.confirmpassword
																			}
																		</span>
																	</div>
																</div>
																<div className='col-md-12'>
																	<div className='form-group'>
																		<button
																			type='submit'
																			className='custom-btn'
																			disabled={
																				isSubmit
																			}
																		>
																			{!isSubmit
																				? 'Register'
																				: 'Please wait...'}
																		</button>
																	</div>
																</div>
															</div>
														</form>
														<div className='dont_account_block'>
															<span className='dont_text'>
																Already Have an
																Account?{` `}
																<Link href='/login'>
																	Login
																</Link>
															</span>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Signup;
