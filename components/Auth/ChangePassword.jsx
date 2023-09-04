import React, {useState} from 'react';
import {toast} from 'react-toastify';
import AccountSidebar from '@components/Common/Account/AccountSidebar';
import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';
import {api} from '@utils/api';

const ChangePassword = () => {
	const [inputs, setInputs] = useState({});
	const [eye1, seteye1] = useState(true);
	const [eye2, seteye2] = useState(true);
	const [eye3, seteye3] = useState(true);
	const [password1, setpassword1] = useState('password');
	const [password2, setpassword2] = useState('password');
	const [password3, setpassword3] = useState('password');
	const [formErrors, setFormErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const handleChange = event => {
		const name = event.target.name;
		const value = event.target.value.replace(/^\s/, '');
		setInputs(values => ({...values, [name]: value}));
	};

	const handleBlur = () => {
		setFormErrors(validate(inputs));
	};

	// useEffect(() => {
	// 	setFormErrors(validate(inputs));
	// }, [inputs]);

	const handleSubmit = async event => {
		event.preventDefault();
		const result = validate(inputs);
		if (Object.keys(result).length) {
			setFormErrors(result);
			return;
		} else {
			try {
				setLoading(true);
				const response = await api({
					url: '/users/change-password',
					method: 'POST',
					data: {
						old_password: inputs.current_password,
						new_password: inputs.new_password,
					},
				});
				if (response.error) {
					toast.error(response.message);
					setLoading(false);
				} else {
					toast.success(response.message);
					setInputs({});
					setFormErrors({});
					setLoading(false);
				}
			} catch (e) {
				console.log(e);
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

	const validate = values => {
		const errors = {};
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
			errors.new_password_confirmation = 'Confirm Password is required!';
		} else {
			if (!(values.new_password === values.new_password_confirmation)) {
				errors.new_password_confirmation =
					'Confirm Password is not matched!';
			}
		}
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
							<h1 className='dash-head'>Change Password</h1>
							<div className=''>
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
												className='form-control'
												placeholder='Old Password'
												name='current_password'
												onChange={handleChange}
												onBlur={handleBlur}
												//value={state?.['current-password'] || ''}
												value={
													inputs?.current_password ||
													''
												}
												required
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
												className='form-control'
												placeholder='New Password'
												name='new_password'
												onChange={handleChange}
												onBlur={handleBlur}
												// value={state?.['new-password'] || ''}
												value={
													inputs?.new_password || ''
												}
												required
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
												className='form-control'
												placeholder='Confirm Password'
												name='new_password_confirmation'
												onChange={handleChange}
												onBlur={handleBlur}
												// value={state?.['new-password_confirmation'] || ''}
												value={
													inputs?.new_password_confirmation ||
													''
												}
												required
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

										{/* {state?.['new-password_confirmation'] !==
											state?.['new-password'] && (
												<small className='text-danger text-mutedd'>
													Password doesn't match confirm Password
												</small>
											)} */}
									</div>
									<div className='col-md-12 text-center'>
										<div className='button-group'>
											<button
												onClick={handleSubmit}
												type='button'
												className='custom-btn'
												// disabled={
												// 	state?.['new-password_confirmation'] !==
												// 	state?.['new-password']
												// }
											>
												Submit
											</button>
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

export default ChangePassword;
