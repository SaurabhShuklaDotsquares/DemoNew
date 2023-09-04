/* eslint-disable no-console */
import React, {useState} from 'react';
import Router from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import cookie from 'js-cookie';

import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';
import {api} from '@utils/api';
import {useGlobalContext} from '@context/ContextApi';

const Login = () => {
	const [inputs, setInputs] = useState({});
	const [validateError, setValidateError] = useState({});
	const [error, setError] = useState();
	const {state, dispatch} = useGlobalContext();
	const [eye, seteye] = useState(true);
	const [password, setpassword] = useState('password');
	const [loading, setLoading] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);

	const router = Router;

	const handleChange = event => {
		const name = event.target.name;
		const value = event.target.value.replace(/^\s/, '');
		setInputs(values => ({...values, [name]: value}));
	};

	const handleBlur = () => {
		setValidateError(validate(inputs));
	};

	React.useEffect(() => {
		const storedEmail = localStorage.getItem('authEmailVendor');
		const storedPassword = localStorage.getItem('authPasswordVendor');
		const storedRememberMe = localStorage.getItem('authRememberMeVendor');
		if (storedEmail && storedPassword && storedRememberMe) {
			setInputs({email: storedEmail, password: storedPassword});
			setRememberMe(true);
		}
	}, []);

	function handleRememberMeChange(event) {
		setRememberMe(event.target.checked);
	}

	const handleSubmit = async event => {
		event.preventDefault();
		// eslint-disable-next-line babel/camelcase
		inputs.device_id = 'wqr333443r34';
		// eslint-disable-next-line babel/camelcase
		inputs.device_type = 'android';

		const result = validate(inputs);

		if (Object.keys(result).length) {
			// eslint-disable-next-line no-undef
			setValidateError(result);
			return;
		} else {
			setValidateError({});
			try {
				setLoading(true);
				const response = await api({
					url: '/vendor/login',
					method: 'POST',
					data: inputs,
				});

				if (!response.error && response.data.token) {
					response.data['AccessToken'] = 'DOTSQUARES123';
					response.data['userType'] = 'vendor';
					cookie.set('userAuth', JSON.stringify(response.data));
					cookie.set('token', response.data.api_token);
					const token = response.data.api_token;
					if (rememberMe) {
						localStorage.setItem('authTokenVendor', token);
						localStorage.setItem('authEmailVendor', inputs.email);
						localStorage.setItem(
							'authPasswordVendor',
							inputs.password,
						);
						localStorage.setItem('authRememberMeVendor', true);
					} else {
						sessionStorage.setItem('authTokenVendor', token);
						localStorage.removeItem('authEmailVendor');
						localStorage.removeItem('authPasswordVendor');
						localStorage.removeItem('authRememberMeVendor');
					}
					setLoading(false);
					dispatch({
						type: 'SET_DATA',
						data: {
							...state,
							userAuth: response.data,
						},
					});
					{
						// eslint-disable-next-line babel/no-unused-expressions
						router.push('/vendor/dashboard');
					}
				} else {
					setError(response.message);
					setLoading(false);
				}
			} catch (error) {
				// eslint-disable-next-line no-console
				console.log(error);
			}
		}
	};

	const validate = values => {
		const passReg =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*.,#?&])[A-Za-z\d@$!%*.,#?&]{8,50}$/;
		const errors = {};
		if (!values.email) {
			errors.email = 'Email field is required !';
		} else if (!/^[a-zA-Z0-9]+.+[a-zA-Z0-9]+@+[A-z]/.test(values.email)) {
			errors.email = 'Enter valid email address.';
		}
		if (!values.password) {
			errors.password = 'Password is required.';
		} else if (!passReg.test(values.password)) {
			errors.password =
				'Password must be minimum 8 character should have at least one lower case, one upper case, one numeric and one special character';
		}
		return errors;
	};
	const Eye = () => {
		if (password === 'password') {
			setpassword('text');
			seteye(false);
		} else {
			setpassword('password');
			seteye(true);
		}
	};

	return (
		<>
			<SpinnerLoader loading={loading} />
			<div className='login_page_block'>
				<div className='container'>
					<div className='login_form_block'>
						<div className='row align-items-center'>
							<div className='col-md-6'>
								<div className='login_img'>
									<Image
										src='/assets/images/login-img.png'
										alt='login-img'
										width={560}
										height={354}
									/>
								</div>
							</div>
							<div className='col-md-6'>
								<div className='login_form_right'>
									<div className='form_heading'>
										<h2>Login to your Account</h2>
									</div>
									{error && (
										<div className='alert-danger mb-3 p-2'>
											{error}
										</div>
									)}
									<form onSubmit={handleSubmit}>
										<div className='form_filds_block'>
											<div className='form-group'>
												<input
													type='text'
													placeholder='Email Address'
													className='form-control'
													name='email'
													value={inputs.email || ''}
													onChange={handleChange}
													onBlur={handleBlur}
												/>
												<span className='text-danger'>
													{validateError.email}
												</span>
											</div>
											<div className='form-group'>
												<input
													type={password}
													placeholder='Password'
													className='form-control'
													name='password'
													value={
														inputs.password || ''
													}
													onChange={handleChange}
													onBlur={handleBlur}
												/>
												<span className='p-viewer2'>
													<i
														onClick={Eye}
														className={`fa ${
															eye
																? 'fa-eye-slash'
																: 'fa-eye'
														}`}
													></i>
												</span>
												<span className='text-danger'>
													{validateError.password}
												</span>
											</div>
											<div className='form-group'>
												<button
													className='custom-btn'
													type='submit'
												>
													Login
												</button>
											</div>
											<div className='remember_box_outer d-flex align-items-center justify-content-between'>
												<div className='remember_box'>
													<label className='custom_checkbox'>
														Remember me
														<input
															type='checkbox'
															checked={rememberMe}
															onChange={
																handleRememberMeChange
															}
														/>
														<span className='checkmark' />
													</label>
												</div>
												<Link
													class='forgot_password_link'
													href='/vendor/forgot-password'
												>
													Forgot Password
												</Link>
											</div>

											<div className='dont_account_block'>
												<span className='dont_text'>
													Don’t have an account?
													<Link href='/vendor/signup'>
														Register Now
													</Link>
												</span>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
