import React, {useState} from 'react';
import {toast} from 'react-toastify';

import AccountSidebar from '@components/Common/Account/AccountSidebar';
import {api} from '@utils/api';

const ChangePassword = () => {
	const [inputs, setInputs] = useState({});
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [eye1, seteye1] = useState(true);
	const [eye2, seteye2] = useState(true);
	const [eye3, seteye3] = useState(true);
	const [password1, setpassword1] = useState('password');
	const [password2, setpassword2] = useState('password');
	const [password3, setpassword3] = useState('password');

	const handleChange = event => {
		const name = event.target.name;
		const value = event.target.value.replace(/^\s/, '');
		console.log(name, value);
		setInputs(values => ({...values, [name]: value}));
	};

	const handleBlur = () => {
		setFormErrors(validate(inputs));
	};

	const validate = values => {
		const errors = {};

		// eslint-disable-next-line prettier/prettier
		const passReg =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*.,#?&])[A-Za-z\d@$!%*.,#?&]{8,50}$/;

		if (!values.current_password) {
			errors.current_password = 'Old Password is required!';
		}

		if (!values.new_password) {
			errors.new_password = 'New Password is required!';
		} else if (!passReg.test(values.new_password)) {
			errors.new_password =
				'Password must be minimum 8 character should have at least one lower case, one upper case, one numeric and one special character!';
		}
		if (!values.new_password_confirmation) {
			errors.new_password_confirmation = ' Confirm Password is required!';
		} else {
			if (!(values.new_password === values.new_password_confirmation)) {
				errors.new_password_confirmation =
					'Confirm Password is not matched!';
			}
		}

		return errors;
	};

	const handleSubmit = async event => {
		console.log('submit');
		event.preventDefault();
		setFormErrors({});
		const result = validate(inputs);
		if (Object.keys(result).length) {
			setFormErrors(result);
			return;
		} else {
			setIsSubmit(true);

			try {
				const response = await api({
					url: '/vendor/change-password',
					method: 'POST',
					data: {
						old_password: inputs.current_password,
						new_password: inputs.new_password,
					},
				});

				if (response.error) {
					toast.error(response.message);
				} else {
					toast.success(response.message);
					setInputs({});
				}
				setIsSubmit(false);
			} catch (error) {
				// eslint-disable-next-line no-console
				console.log(error);
			}
		}
	};

	const Eye = e => {
		let nameEye = e.target.attributes.name.nodeValue;
		if (nameEye === 'oldPasswordEye') {
			password1 === 'password'
				? (setpassword1('text'), seteye1(false))
				: (setpassword1('password'), seteye1(true));
		} else if (nameEye === 'newPasswordEye') {
			password2 === 'password'
				? (setpassword2('text'), seteye2(false))
				: (setpassword2('password'), seteye2(true));
		} else if (nameEye === 'confirmPasswordEye') {
			password3 === 'password'
				? (setpassword3('text'), seteye3(false))
				: (setpassword3('password'), seteye3(true));
		}
	};

	return (
		<>
			<section>
				<div className='container'>
					<div className='row'>
						<div className='col-md-3'>
							<AccountSidebar />
						</div>
						<div
							className='col-md-9'
							style={{
								boxShadow:
									'1px 1px 42px 1px rgb(189 189 189 / 20%)',
							}}
						>
							<div className='container'>
								<div className='row mt-4'>
									<div className='col-md-12'>
										<span>
											<h3>CHANGE PASSWORD</h3>
										</span>
									</div>
								</div>
								<form className='mt-4' onSubmit={handleSubmit}>
									<div className='row'>
										<div className='col-lg-4 form-group'>
											<label>
												Old Password
												<span className='text-danger'>
													*
												</span>
											</label>
											<div className='position-relative'>
												<input
													type={password1}
													className='form-control  '
													placeholder='Old Password'
													name='current_password'
													required=''
													value={
														inputs.current_password ||
														''
													}
													onChange={handleChange}
													onBlur={handleBlur}
												/>
												<span className='p-viewer1'>
													<i
														name='oldPasswordEye'
														onClick={Eye}
														className={`fa ${
															eye1
																? 'fa-eye-slash'
																: 'fa-eye'
														}`}
													></i>
												</span>
											</div>
											<span className='text-danger'>
												{formErrors.current_password}
											</span>
										</div>
										<div className='col-lg-4 form-group'>
											<label>
												New Password
												<span className='text-danger'>
													*
												</span>
											</label>
											<div className='position-relative'>
												<input
													type={password2}
													className='form-control  '
													placeholder='New Password'
													name='new_password'
													required=''
													value={
														inputs.new_password ||
														''
													}
													onChange={handleChange}
													onBlur={handleBlur}
												/>
												<span className='p-viewer1'>
													<i
														name='newPasswordEye'
														onClick={Eye}
														className={`fa ${
															eye2
																? 'fa-eye-slash'
																: 'fa-eye'
														}`}
													></i>
												</span>
											</div>
											<span className='text-danger'>
												{formErrors.new_password}
											</span>
										</div>
										<div className='col-lg-4 form-group'>
											<label>
												Confirm Password
												<span className='text-danger'>
													*
												</span>
											</label>
											<div className='position-relative'>
												<input
													type={password3}
													className='form-control  '
													placeholder='Confirm Password'
													name='new_password_confirmation'
													required=''
													value={
														inputs.new_password_confirmation ||
														''
													}
													onChange={handleChange}
													onBlur={handleBlur}
												/>
												<span className='p-viewer1'>
													<i
														name='confirmPasswordEye'
														onClick={Eye}
														className={`fa ${
															eye3
																? 'fa-eye-slash'
																: 'fa-eye'
														}`}
													></i>
												</span>
											</div>
											<span className='text-danger'>
												{
													formErrors.new_password_confirmation
												}
											</span>
										</div>
										<div className='col-md-12 text-center'>
											<div className=' button-group'>
												<button
													type='submit'
													className='custom-btn'
													disabled={isSubmit}
												>
													{!isSubmit
														? 'Submit'
														: 'Please wait...'}
												</button>
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

export default ChangePassword;
