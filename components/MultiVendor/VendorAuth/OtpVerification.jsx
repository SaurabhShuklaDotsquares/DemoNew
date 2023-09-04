import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/router';
// eslint-disable-next-line import/order
import {toast} from 'react-toastify';

import 'react-phone-number-input/style.css';

import {api} from '@utils/api';

import SpinnerLoader from '../SpinnerLoader';

const OtpVerification = ({Allinputs, setAllInputs, handleSubmit}) => {
	const [inputs, setInputs] = useState(Allinputs);
	const [showResendBtn, setShowResendBtn] = useState(false);
	const [disable, setDisable] = useState(false);
	const [loading, setLoading] = useState(true);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const router = useRouter();
	// console.log('hi inputs', Allinputs);

	const handleChange = event => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}));
	};

	useEffect(() => {
		const interval = setInterval(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1);
			}

			if (seconds === 0) {
				if (minutes === 0) {
					clearInterval(interval);
				} else {
					setSeconds(59);
					setMinutes(minutes - 1);
				}
			}
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

	const handleSendOtp = async e => {
		e.preventDefault();
		setDisable(!disable);
		try {
			const formData = new FormData();
			formData.append('mobile_no', inputs.mobile);
			formData.append('action', 'send_otp');
			// setLoading(true);
			setMinutes(2);
			setSeconds(59);
			const response = await api({
				url: '/Otp/send',
				method: 'POST',
				data: formData,
			});
			if (response.status === true) {
				console.log('response', response);
				toast.success(response.message);
			} else if (response.error) {
				toast.error(response.message);
			}
			setShowResendBtn(true);
			setDisable(false);
			setSeconds(0);
			setMinutes(0);
		} catch (error) {
			console.log(error);
		}
	};

	const handleVerifyOtp = async (e, type) => {
		e.preventDefault();
		setLoading(false);
		try {
			const formData1 = new FormData();
			formData1.append('action', type);
			formData1.append('otp', inputs.otp);
			const response = await api({
				url: '/Otp/send',
				method: 'POST',
				data: formData1,
			});
			if (response.status === true) {
				console.log('child ', inputs);
				// handleOtpChange(inputs.mobile, true);
				setAllInputs(inputs);

				toast.success(response.message);
				setTimeout(() => {
					handleSubmit(inputs);
				}, 2000);
				setLoading(true);
				router.push('/vendor/login');
			} else if (response.error) {
				toast.error(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleMobileChange = e => {
		const mobile = 'mobile';
		setInputs(values => ({...values, [mobile]: e}));
	};

	return (
		<>
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
															Email Verification
														</h2>
													</div>

													<div className='form_filds_block'>
														<form autoComplete='off'>
															<div className='row'>
																<div className='col-md-9'>
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
																				handleMobileChange
																			}
																			// onKeyUp={handleKeyUp}
																		/>
																		{/* <span className='text-danger'>
																			{error.mobile}
																		</span> */}
																	</div>
																</div>
																<div className='col-md-3'>
																	<div className='form-group'>
																		<button
																			disabled={
																				disable
																			}
																			className='btn'
																			style={{
																				background:
																					'#ea3a3c',
																				color: '#fff',
																				height: '40px',
																				width: '100%',
																				border: '1px solid transparent',
																				padding:
																					'0.375rem 0.75rem',
																				fontSize:
																					'1rem',
																				lineHeight:
																					'1.5',
																				borderRadius:
																					'0.25rem',
																			}}
																			onClick={e =>
																				handleSendOtp(
																					e,
																					'send_otp',
																				)
																			}
																		>
																			{seconds >
																				0 ||
																			minutes >
																				0 ? (
																				<>
																					{minutes <
																					10
																						? `0${minutes}`
																						: minutes}

																					:
																					{seconds <
																					10
																						? `0${seconds}`
																						: seconds}
																				</>
																			) : (
																				<>
																					{showResendBtn
																						? 'Reset OTP'
																						: ' Send OTP'}
																				</>
																			)}
																		</button>
																	</div>
																</div>

																<div className='col-md-9'>
																	<div className='form-group'>
																		<input
																			type='text'
																			placeholder='Verify Number'
																			className='form-control'
																			name='otp'
																			value={
																				inputs.otp ||
																				''
																			}
																			onChange={
																				handleChange
																			}
																		/>

																		{/* <span className='text-danger'>
																			{formErrors.otp}
																		</span> */}
																	</div>
																</div>
																<div className='col-md-3'>
																	<div className='form-group'>
																		<button
																			className='btn'
																			style={{
																				background:
																					'#ea3a3c',
																				width: '100%',
																				height: '40px',
																				padding:
																					'0.375rem 0.75rem',
																				fontSize:
																					'1rem',
																				lineHeight:
																					'1.5',
																				borderRadius:
																					'0.25rem',
																				color: '#fff',
																			}}
																			onClick={e =>
																				handleVerifyOtp(
																					e,
																					'verify_otp',
																				)
																			}
																		>
																			{loading ? (
																				<>
																					Verify
																					OTP
																				</>
																			) : (
																				<>
																					<SpinnerLoader />
																				</>
																			)}
																		</button>
																	</div>
																</div>
															</div>
														</form>
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

export default OtpVerification;
