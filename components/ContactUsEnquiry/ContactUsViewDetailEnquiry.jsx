/* eslint-disable @next/next/link-passhref */
import React, {useState, useEffect} from 'react';
import AccountSidebar from '@components/Common/Account/AccountSidebar';
import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';
import {api} from '@utils/api';
import {toast} from 'react-toastify';

const ContactUsViewDetailEnquiry = props => {
	const id = props.data.slug;
	const [contactUsViewList, setContactUsViewList] = useState('');
	const [loading, setLoading] = useState(false);
	const [productName, setProductName] = useState('');
	const [message, setMessage] = useState('');
	const [validateError, setValidateError] = useState('');

	const getContactUsEnquiryList = async () => {
		try {
			setLoading(true);
			const data = {id: id};
			const response = await api({
				url: '/contact-us-view',
				method: 'POST',
				data,
			});

			if (response.data) {
				setLoading(false);
				setContactUsViewList(response.data);
				setProductName(response.data.product.title);
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	useEffect(() => {
		getContactUsEnquiryList();
	}, []);

	const handleSubmit = async event => {
		event.preventDefault();
		if (!message) {
			setValidateError('Message is required field!');
		} else if (message.length < 5) {
			setValidateError('Minimum 5 characters is required.');
		} else if (message.length > 100) {
			setValidateError('Maximum 100 characters is required.');
		} else {
			setValidateError('');
			setLoading(true);
			const data = {
				email: contactUsViewList.email,
				subject: contactUsViewList.message,
				message: message,
			};
			try {
				const response = await api({
					url: '/send-feedback',
					method: 'POST',
					data: data,
				});
				if (response.error) {
					toast.error(response.message);
					setLoading(false);
				} else {
					toast.success(response.message);
					setLoading(false);
					setMessage('');
				}
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		}
	};

	return (
		<>
			<SpinnerLoader loading={loading} />
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
							<div className='container mt-4'>
								<div className='row'>
									<div className='col-md-12'>
										<h3 style={{fontWeight: '700'}}>
											User Detail
										</h3>
									</div>
								</div>
								<table className='table table-hover table-striped'>
									<tbody>
										<tr>
											<th scope='row'>Product Name</th>
											<td>{productName}</td>
										</tr>
										<tr>
											<th scope='row'>Name</th>
											<td>
												{contactUsViewList?.firstname +
													' ' +
													contactUsViewList?.lastname}
											</td>
										</tr>
										<tr>
											<th scope='row'>Email</th>
											<td>{contactUsViewList?.email}</td>
										</tr>
										<tr>
											<th scope='row'>Mobile</th>
											<td>{contactUsViewList?.phone}</td>
										</tr>
										<tr>
											<th scope='row'>Query</th>
											<td>
												{contactUsViewList?.message}
											</td>
										</tr>
										<tr>
											<th scope='row'>Created</th>
											<td>
												{contactUsViewList &&
													contactUsViewList?.created_at
														.slice(0, 10)
														.split('-')
														.reverse()
														.join('-')}
											</td>
										</tr>
										<tr>
											<th scope='row'>Message</th>
											<td>
												<textarea
													className='form-control'
													type='text'
													name='message'
													id='message'
													placeholder='Message'
													onChange={event =>
														setMessage(
															event.target.value,
														)
													}
													value={message || ''}
												/>
												<span className='text-danger'>
													{validateError}
												</span>
											</td>
										</tr>
										<tr>
											<th scope='row'></th>
											<td>
												<button
													type='button'
													className='btn btn-primary orange-btn mr-2'
													onClick={handleSubmit}
												>
													Reply
												</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ContactUsViewDetailEnquiry;
