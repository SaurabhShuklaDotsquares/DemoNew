/* eslint-disable no-console */
import React, {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import AccountSidebar from '@components/Common/Account/AccountSidebar';
import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';
import {API_BASE_URL} from '@utils/api';
import {api} from '@utils/api';
import Link from 'next/link';
import Router from 'next/router';

const EditOrder = props => {
	const [showList, setShowList] = useState('');
	const [area, setArea] = useState('');
	const [updateStatus, setUpdateStatus] = useState('');
	const [updatedStatus, setUpdatedStatus] = useState('');
	const [disable, setDisable] = useState(true);
	const [loading, setLoading] = useState(false);

	const router = Router;
	console.log('showList', showList);
	const getShowList = async () => {
		try {
			setLoading(true);
			const response = await api({
				url: `/vendor/order/show/${props.data.slug}`,
				method: 'GET',
			});
			if (response.data) {
				setLoading(false);
				setShowList(response.data);
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	const handleSubmit = async () => {
		const formData = new FormData();
		formData.append('id', props.data.slug);
		formData.append('status', updateStatus);
		formData.append('comment', area);
		setDisable(false);
		setLoading(true);
		try {
			const response = await api({
				url: '/vendor/order/status-update',
				method: 'POST',
				data: formData,
			});
			if (response.data) {
				setUpdatedStatus(updateStatus);
				toast.success(response.message);
				router.push('/vendor/manageorders');
			} else {
				toast.error(response.message);
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log('error', error);
		}
	};

	useEffect(() => {
		getShowList();
	}, []);

	useEffect(() => {
		const word = showList?.order?.status;
		const firstLetter = word?.charAt(0) + word?.slice(1);
		setUpdatedStatus(firstLetter);
		setUpdateStatus(firstLetter);
	}, [showList]);

	return (
		<div>
			<SpinnerLoader loading={loading} />
			<section className='cms-page'>
				<div className='container'>
					<div className='dashborad-panel'>
						<AccountSidebar />

						<div className='dashborad-rightsider'>
							<h3>MANAGE ORDER</h3>
							<h3>Order and Account Information</h3>
							<div className='row'>
								<div className='col-lg-6'>
									<h5>
										<b>
											Order : {showList?.order?.order_id}{' '}
										</b>
									</h5>
									<table className='table table-hover table-striped'>
										<tbody>
											<tr>
												<th scope='row'>Order Date</th>
												<td>
													{showList?.order?.created_at.slice(
														0,
														10,
													)}
												</td>
											</tr>
											<tr>
												<th scope='row'>
													Order Status
												</th>

												<td>{updatedStatus}</td>
											</tr>
											<tr>
												<th scope='row'>
													Transaction Fee By Admin
												</th>

												<td className='font-weight-bold'>
													$
													{
														showList?.order
															?.admin_commission
													}
												</td>
											</tr>

											<tr>
												<th scope='row'>
													Transaction Status
												</th>

												<td className='font-weight-bold'>
													{
														showList?.order
															?.transaction_response
													}{' '}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div className='col-lg-6 '>
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
													{(showList?.order
														?.firstname ?? '') +
														' ' +
														(showList?.order
															?.lastname ?? '')}
												</td>
											</tr>
											<tr>
												<th scope='row'>Email</th>
												<td>
													{showList?.order?.email}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<hr />

								<div className='col-lg-12'>
									<h3>Address Information</h3>
								</div>
								<div className='col-lg-6'>
									<h5>
										<b>Billing Address</b>
									</h5>

									<table className='table table-hover table-striped'>
										<tbody>
											<tr>
												<th
													className='w-50'
													scope='row'
												>
													<p>Address</p>
													<p>City</p>
													<p>
														State/Postal
														Code/Country
													</p>
													<p>Phone</p>
												</th>
												<td>
													<p>
														{
															showList?.order
																?.billing_address
																?.address1
														}
													</p>

													<p>
														{
															showList?.order
																?.billing_address
																?.city
														}
													</p>
													<p>
														{
															showList?.order
																?.billing_address
																?.state
														}
														{' / '}
														{
															showList?.order
																?.billing_address
																?.postal_code
														}
													</p>
													<p>
														T:{' '}
														{
															showList?.order
																?.mobile
														}
													</p>
												</td>
											</tr>
										</tbody>
									</table>
								</div>

								<div className='col-lg-6 '>
									<h5>
										<b>Shipping Address</b>
									</h5>
									<table className='table table-hover table-striped'>
										<tbody>
											<tr>
												<th
													className='w-50'
													scope='row'
												>
													<p>Address</p>
													<p>City</p>
													<p>
														State/Postal
														Code/Country
													</p>
													<p>Phone</p>
												</th>

												<td>
													<p>
														{
															showList?.order
																?.shipping_address
																?.address1
														}
													</p>
													<p>
														{
															showList?.order
																?.shipping_address
																?.city
														}
													</p>
													<p>
														{
															showList?.order
																?.shipping_address
																?.state
														}
														{' / '}
														{
															showList?.order
																?.shipping_address
																?.postal_code
														}
													</p>
													<p>
														T:{' '}
														{
															showList?.order
																?.mobile
														}
													</p>
												</td>
											</tr>
											<tr></tr>
										</tbody>
									</table>
								</div>

								<hr />
								<div className='col-lg-12'>
									<h3>Item Ordered</h3>
								</div>
								<div className='col-lg-12'>
									<table className='table table-hover table-striped'>
										<tbody>
											<tr>
												<th>Product</th>
												<th>Price</th>
												<th>Quantity</th>
												<th>Total</th>
											</tr>
											{showList?.order?.orderitems &&
												showList.order.orderitems.map(
													(item, index) => (
														<tr key={index}>
															<td>
																{
																	item
																		?.product
																		?.title
																}
															</td>
															<td>
																$ {item?.price}
															</td>
															<td>
																{item?.quantity}
															</td>
															<td>
																{
																	item?.display_total_price
																}
															</td>
														</tr>
													),
												)}
										</tbody>
									</table>
								</div>

								<hr />

								<div className='col-lg-12'>
									<h3>Order Total</h3>
								</div>
								<div className='col-lg-6'>
									<h5>
										<b>Note for this Order</b>
									</h5>
									<br />
									<table className='table'>
										<tbody>
											<tr>
												<th scope='row'>
													Order Status
												</th>
												<td>
													<select
														disabled={disable}
														className='form-control updateOrder'
														autoComplete='off'
														data-order-id='6'
														value={updateStatus}
														onChange={event =>
															setUpdateStatus(
																event.target
																	.value,
															)
														}
													>
														{showList?.orderStatuses &&
															Object.entries(
																showList?.orderStatuses,
															)?.map(
																(
																	item,
																	index,
																) => {
																	console.log(
																		'updateStatus',
																		updateStatus,
																	);

																	return (
																		<option
																			key={
																				index
																			}
																			value={
																				item[
																					updateStatus
																				]
																			}
																		>
																			{
																				item[0]
																			}
																		</option>
																	);
																},
															)}
														{/* <option>one</option>
															<option>two</option> */}
													</select>
												</td>
											</tr>
											<tr>
												<th scope='row' colSpan='2'>
													Comment
												</th>
											</tr>
											<tr>
												<td
													colSpan='2'
													className='border-0'
												>
													<textarea
														name='message'
														id='message'
														cols='20'
														rows=''
														className='form-control'
														onChange={event =>
															setArea(
																event.target
																	.value,
															)
														}
														disabled={disable}
													></textarea>
												</td>
											</tr>
											<tr>
												<th scope='row'></th>
												<td>
													{disable ? (
														''
													) : (
														<button
															type='submit'
															id='StatusUpdate'
															data-order-id='6'
															className='btn btn-primary orange-btn mr-2'
															onClick={
																handleSubmit
															}
														>
															Submit
														</button>
													)}
													{disable ? (
														<button
															type='submit'
															className='custom-btn'
															onClick={() =>
																setDisable(
																	!disable,
																)
															}
															disabled={
																showList?.order
																	?.status ===
																'cancelled'
																	? true
																	: false
															}
														>
															Edit Order
														</button>
													) : (
														''
													)}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div className='col-lg-6 '>
									<h5>
										<b>
											Shipping &amp; Handling Information
										</b>
									</h5>
									<br />
									<table className='table'>
										<tbody>
											<tr scope='row'>
												<th>Discount Amount</th>
												<td>
													{
														showList?.order
															?.display_discount_amount
													}
												</td>
											</tr>
											<tr scope='row'>
												<th>Shipping Amount</th>
												<td>
													{
														showList?.order
															?.display_shipping_amount
													}
												</td>
											</tr>

											<tr scope='row'>
												<th>Grand Total</th>
												<td>
													{
														showList?.order
															?.display_amount
													}
												</td>
											</tr>
										</tbody>
									</table>

									<div className='row'>
										<div className='col-md-12'>
											<h3>
												<b>Invoice</b>
											</h3>
										</div>
									</div>
									<div className='row'>
										<div className='col-md-6'>
											<Link
												href={`${API_BASE_URL}/download_invoice_by_url/${props.data.slug}`}
												className='btn ml-md-3 mb-3 mb-md-0'
												style={{
													background: '#ea3a3c',
													color: '#fff',
													border: 'none',
													fontSize: '1.25rem',
												}}
											>
												<i
													role='button'
													className='fa fa-download'
												></i>
											</Link>
										</div>
										<div className='col-md-6 text-md-right'>
											<Link
												href={`/orderinvoice/${props.data.slug}`}
												className='btn '
												style={{
													background: '#ea3a3c',
													color: '#fff',
													border: 'none',
													fontSize: '1.25rem',
												}}
											>
												VIEW
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default EditOrder;
