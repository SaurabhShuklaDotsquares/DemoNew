import React, {useState} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';

import {api} from '@utils/api';

const ResetPassword = () => {
	const [inputs, setInputs] = useState({});
	const [validateError, setValidateError] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [eye1, seteye1] = useState(true);
	const [eye2, seteye2] = useState(true);
	const [password1, setpassword1] = useState('password');
	const [password2, setpassword2] = useState('password');

	const router = useRouter();

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
		// eslint-disable-next-line babel/camelcase
		inputs.device_id = 'wqr333443r34';
		// eslint-disable-next-line babel/camelcase
		inputs.device_type = 'android';
		inputs.email = router.query.email;
		const result = validate(inputs);

		if (Object.keys(result).length) {
			// eslint-disable-next-line no-undef
			setValidateError(result);
			return;
		} else {
			setValidateError({});
			setIsSubmit(true);
			try {
				const response = await api({
					url: '/users/reset-password',
					method: 'POST',
					data: inputs,
				});

				if (!response.error) {
					router.push('/login');
					toast.success(response.message);
				} else {
					toast.error(response.message);
				}
				setIsSubmit(false);
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
		if (!values.password) {
			errors.password = 'Password is required!';
		} else if (!passReg.test(values.password)) {
			errors.password =
				'Password must be minimum 8 character should have at least one lower case, one upper case, one numeric and one special character';
		}
		if (!values.confirmPassword) {
			errors.confirmPassword = 'Confirm password is required!';
		} else {
			if (!(values.password === values.confirmPassword)) {
				errors.confirmPassword = 'Password is not matched!';
			}
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
										<h2>Reset your Account Password</h2>
									</div>

									<form onSubmit={handleSubmit}>
										<div className='form_filds_block'>
											<div className='form-group'>
												<input
													type='text'
													placeholder='Enter your email'
													className='form-control'
													name='email'
													value={router.query.email}
													readOnly
													onBlur={handleBlur}
												/>
												<span className='text-danger'>
													{validateError.email}
												</span>
											</div>
											<div className='form-group'>
												<input
													type={password1}
													placeholder='New password'
													className='form-control'
													name='password'
													onChange={handleChange}
													onBlur={handleBlur}
												/>
												<span className='p-viewer2'>
													<i
														name='passwordEye'
														onClick={Eye}
														className={`fa ${
															eye1
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
												<input
													type={password2}
													placeholder='Confirm password'
													className='form-control'
													name='confirmPassword'
													onChange={handleChange}
													onBlur={handleBlur}
												/>
												<span className='p-viewer2'>
													<i
														name='confirmpasswordEye'
														onClick={Eye}
														className={`fa ${
															eye2
																? 'fa-eye-slash'
																: 'fa-eye'
														}`}
													></i>
												</span>
												<span className='text-danger'>
													{
														validateError.confirmPassword
													}
												</span>
											</div>

											<div className='form-group'>
												<button
													className='custom-btn'
													type='submit'
													disabled={
														isSubmit
															? 'disabled'
															: ''
													}
												>
													{!isSubmit
														? 'Reset Password'
														: 'Please wait...'}
												</button>
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

export default ResetPassword;
