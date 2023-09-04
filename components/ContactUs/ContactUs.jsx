import React, {useState} from 'react';
import {toast} from 'react-toastify';

import {api} from '@utils/api';

const ContactUs = () => {
	const [inputs, setInputs] = useState({});
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);

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
				const response = await api({
					url: '/contact',
					method: 'POST',
					data: inputs,
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

		if (!values.firstname) {
			errors.firstname = 'First name is required';
		} else if (values.firstname.length > 12) {
			errors.firstname = 'Do not enter more than 12 characters';
		}

		if (!values.lastname) {
			errors.lastname = 'Last name is required';
		} else if (values.lastname.length > 12) {
			errors.lastname = 'Do not enter more than 12 characters';
		}

		if (!values.email) {
			errors.email = 'Email field is required';
		} else if (!emailRegex.test(values.email)) {
			errors.email = 'Enter valid email address!';
		}
		if (!parseInt(values.phone)) {
			errors.phone = 'Mobile number is required';
		} else if (parseInt(values.phone.length) < 8) {
			errors.phone = 'The mobile must be between 8 and 16 digits.';
		} else if (parseInt(values.phone.length) > 16) {
			errors.phone = 'The mobile not more than 16 digits.';
		}
		if (!values.message) {
			errors.message = 'Comment message is required';
		} else if (values.message.length < 5) {
			errors.message = 'Minimum 5 characters is required';
		} else if (values.message.length > 100) {
			errors.message = 'Maximum 100 characters is required.';
		}

		return errors;
	};
	return (
		<>
			<div className='contact-page'>
				<div className='container'>
					<div className='white-shad'>
						<div className='row'>
							<div className='col-lg-5'>
								<div className='contact-info-box'>
									<h2>Get In Touch</h2>
									<ul>
										<li>
											<i className='fas fa-map-marker-alt' />
											<span>
												<strong>Our Location</strong>
												J3, Jhalana Institutional Area,
												Jhalana Dungri, Jaipur,
												Rajasthan 302004
											</span>
										</li>
										<li>
											<i className='fas fa-mobile-alt' />
											<span>
												<strong>
													Contact us Anytime
												</strong>
												<a href='tel:+91-9898989999'>
													{' '}
													+91-9898989999
												</a>
											</span>
										</li>
										<li>
											<i className='fas fa-envelope' />
											<span>
												<strong>Email us</strong>
												<a href='mailto:support@ecommerceportal.24livehost.com'>
													support@ecommerceportal.24livehost.com
												</a>
											</span>
										</li>
									</ul>
								</div>
							</div>
							<div className='col-lg-7'>
								<div className='contact-form'>
									<div className='form-heading'>
										<h2>Leave a Message</h2>
										<p>
											Please complete the form below and
											we will get back you as soon as
											possible.
										</p>
									</div>
									<div className='form-filds-block'>
										<div className='row'>
											<form
												onSubmit={handleSubmit}
												autoComplete='off'
											>
												<div className='row'>
													<div className='col-md-6'>
														<div className='form-group'>
															<input
																type='text'
																placeholder='First Name'
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
																placeholder='Last Name'
																className='form-control'
																name='lastname'
																value={
																	inputs.lastname ||
																	''
																}
																onChange={
																	handleChange
																}
																onKeyUp={
																	handleKeyUp
																}
																onBlur={
																	handleBlur
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
																placeholder='Email Address'
																className='form-control'
																name='email'
																value={
																	inputs.email ||
																	''
																}
																onChange={
																	handleChange
																}
																onKeyUp={
																	handleKeyUp
																}
																onBlur={
																	handleBlur
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
																type='text'
																placeholder='Mobile'
																className='form-control'
																name='phone'
																value={
																	inputs.phone ||
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
															/>
															<span className='text-danger'>
																{
																	formErrors.phone
																}
															</span>
														</div>
													</div>
													<div className='col-md-12'>
														<div className='form-group'>
															<textarea
																type='text'
																name='message'
																value={
																	inputs.message ||
																	''
																}
																onChange={
																	handleChange
																}
																onKeyUp={
																	handleKeyUp
																}
																onBlur={
																	handleBlur
																}
																placeholder='Comment/ Request'
																className='form-control'
															></textarea>

															<span className='text-danger'>
																{
																	formErrors.message
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
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ContactUs;
