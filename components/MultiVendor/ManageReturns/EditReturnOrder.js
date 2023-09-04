/* eslint-disable no-console */
import React, {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';
import AccountSidebar from '@components/Common/Account/AccountSidebar';
import {api} from '@utils/api';
import Router from 'next/router';

const EditReturnOrder = props => {
	const [returnState, setReturnState] = useState({});
	const [updateStatus, setUpdateStatus] = useState('');
	const [reason, setReason] = useState('');
	const [loading, setLoading] = useState(false);
	const router = Router;

	// console.log('returnState', returnState);

	const getReturnRequest = async () => {
		try {
			setLoading(true);
			const response = await api({
				url: `/vendor/return-order/show/${props.data.slug}`,
				method: 'GET',
			});
			if (response.data) {
				setReturnState(response.data);
				setUpdateStatus(
					response.data?.returnRequest?.return_items[0]
						?.return_status,
				);
				setLoading(false);
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(error);
			setLoading(false);
		}
	};

	const handleStatusUpdate = async () => {
		const formData = new FormData();
		formData.append('id', props.data.slug);
		formData.append('status', updateStatus);
		formData.append('message', reason);
		try {
			const response = await api({
				url: '/vendor/return-order/status-update',
				method: 'POST',
				data: formData,
			});
			if (response.data) {
				if (updateStatus !== 'accepted') {
					toast.success(response.message);
				}
				router.push('/vendor/managereturns');
				getReturnRequest();
			} else {
				if (updateStatus !== 'accepted') {
					toast.error(response.message);
				}
			}
		} catch (error) {
			console.log('error', error);
		}
	};

	const handleRefund = async amount => {
		const formData = new FormData();
		formData.append('id', props.data.slug);
		formData.append('amount', amount);
		try {
			const response = await api({
				url: '/vendor/return-order/refund',
				method: 'POST',
				data: formData,
			});
			if (response.data) {
				toast.success(response.message);

				handleStatusUpdate();
			} else {
				toast.error(response.message);
			}
		} catch (error) {
			console.log('error', error);
		}
	};

	useEffect(() => {
		getReturnRequest();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	console.log('sahhd', returnState?.returnRequest?.return_items);

	return (
		<>
			<SpinnerLoader loading={loading} />
			<section className='cms-page'>
				<div className='container'>
					<div className='dashborad-panel'>
						<AccountSidebar />

						<div className='dashborad-rightsider'>
							<h3>Return Request Manager</h3>
							<h3>Order and Account Information</h3>
							<div className='row'>
								<div className='col-md-6'>
									<h5>
										<b>
											Order :{' '}
											{
												returnState?.returnRequest
													?.order?.order_id
											}{' '}
										</b>
									</h5>
									<table className='table table-hover table-striped'>
										<tbody>
											<tr>
												<th scope='row'>
													Request Date
												</th>
												<td>
													{returnState?.returnRequest?.order?.created_at
														.slice(0, 10)
														.split('-')
														.reverse()
														.join('-')}
												</td>
											</tr>
											<tr>
												<th scope='row'>
													Request Status
												</th>

												<td>
													{returnState?.returnRequest
														?.return_items[0]
														?.return_status ?? ''}
												</td>
											</tr>
											<tr>
												<th scope='row'>Refund Id</th>

												<td>
													{returnState?.returnRequest
														?.refund_id ?? ''}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div className='col-md-6 '>
									<h5>
										<b>Account Information</b>
									</h5>
									<table className='table table-hover table-striped'>
										<tbody>
											<tr>
												<th scope='row'>
													Customer Name
												</th>
												<td>
													{returnState?.returnRequest
														?.order?.firstname ??
														''}
												</td>
											</tr>
											<tr>
												<th scope='row'>Email</th>
												<td>
													{returnState?.returnRequest
														?.order?.email ?? ''}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>

							{/* Item Orderd */}
							<hr />
							<h3>Items request for return</h3>
							<div className='table-responsive'>
								<table className='table table-hover table-striped  table-custom edit-return'>
									<tbody>
										<tr>
											<th>Product</th>
											<th>Price</th>
											<th className='text-center'>
												Return Quantity
											</th>
											<th>Total</th>
										</tr>
										{returnState?.returnRequest
											?.return_items &&
											returnState?.returnRequest.return_items.map(
												(item, index) => (
													<tr key={index}>
														<td>
															{item?.order_item
																?.product
																?.title ?? ''}
														</td>
														<td className='text-nowrap'>
															${' '}
															{item?.order_item
																?.price ?? ''}
														</td>
														<td className='text-center'>
															{item?.return_quantity ??
																''}
														</td>
														<td className='text-nowrap'>
															${' '}
															{item?.order_item
																?.quantity *
																item?.order_item
																	?.price ??
																''}
														</td>
													</tr>
												),
											)}
									</tbody>
								</table>
							</div>

							{/* Order Total */}
							<hr />
							<h3>Order Total</h3>
							<div className='table-responsive'>
								<table className='table minwidth-400-tbl'>
									<tbody>
										<tr>
											<th scope='row'>
												Order Return Status
											</th>
											<td>
												<select
													disabled={
														returnState
															?.returnRequest
															?.return_items[0]
															?.return_status ===
														'accepted'
															? true
															: false
													}
													className='form-control updateOrder'
													autoComplete='off'
													data-order-id='6'
													onChange={event =>
														setUpdateStatus(
															event.target.value,
														)
													}
												>
													{returnState?.returnStatus &&
														Object.entries(
															returnState.returnStatus,
														)?.map(
															(item, index) => (
																<option
																	key={index}
																	value={
																		item[0]
																	}
																	selected={
																		item[0] ===
																		updateStatus
																			? true
																			: false
																	}
																>
																	{item[1]}
																</option>
															),
														)}
												</select>
											</td>
											{updateStatus === 'declined' ? (
												<td>
													<input
														type='text'
														className='form-control'
														name='reason'
														placeholder='Reason*'
														onChange={event =>
															setReason(
																event.target
																	.value,
															)
														}
														value={reason}
													/>
												</td>
											) : (
												''
											)}
											<td>
												<button
													type='submit'
													id='StatusUpdate'
													data-order-id='6'
													className='btn btn-primary orange-btn mt-2'
													onClick={
														updateStatus ===
														'accepted'
															? () =>
																	handleRefund(
																		returnState
																			?.returnRequest
																			?.amount,
																	)
															: handleStatusUpdate
													}
													disabled={
														returnState
															?.returnRequest
															?.return_items[0]
															?.return_status ===
														'accepted'
															? true
															: false
													}
												>
													Submit
												</button>
											</td>
										</tr>
										<tr>
											<th scope='row'>
												Total amount to be refunded
												(Amount paid by customer after
												applying coupon){' '}
											</th>
											<td>
												<input
													type='text'
													className='form-control'
													name='price'
													value={
														returnState
															?.returnRequest
															?.return_items[0]
															?.order_item?.price
													}
													disabled={true}
												/>
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

export default EditReturnOrder;
