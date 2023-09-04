import React, {useEffect, useState} from 'react';
import Link from 'next/link';

import AccountSidebar from '@components/Common/Account/AccountSidebar';
import Image from '@components/Common/Image';
import {confirmDialog} from '@utils/helper';
import {api} from '@utils/api';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';
import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';

// const Order = ({ data }) => {
const Order = () => {
	const [loading, setLoading] = useState(false);
	// const [isButtonDisabled, setIsButtonDisabled] = useState(false);

	const router = useRouter();
	const {slug} = router.query;
	const [data, setData] = useState('');
	const fetchOrderDetails = async () => {
		const result = await api({url: `/order/${slug}`});
		setData(result.data);
	};
	useEffect(() => {
		if (data) {
			setLoading(false);
		}
	}, [data]);

	useEffect(() => {
		setLoading(true);
		fetchOrderDetails();
		// setIsButtonDisabled(true);
	}, []);

	console.log('orderData', data);

	if (!data) return <SpinnerLoader loading={loading} />;
	const handleReturn = async (order_id, item_id, quantity, cancel) => {
		//console.log(status);
		const confirm = await confirmDialog(
			'Are you want to return this order?',
		);
		if (confirm) {
			const data = {
				// eslint-disable-next-line babel/camelcase
				order_id: parseInt(order_id),
				item: [parseInt(item_id)],
				return_quantity: parseInt(quantity),
				status: cancel,
			};

			// if (status) {
			// 	data.status = 'cancel';
			// }

			const response = await api({
				url: '/order/return',
				method: 'POST',
				data,
			});
			//console.log("Retrun Order :", response);

			if (response.status) {
				// fetchOrders();
				setLoading(false);
				fetchOrderDetails();
				toast.success(response.message);
				// setIsButtonDisabled(true);
				//  Router.reload();
			} else {
				toast.warning(response.message);
				fetchOrderDetails();
				setLoading(false);
				// setDisabled(false);
			}
		}
	};

	// console.log('data?.order', data?.order);
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
							<h1 className='dash-head'>Order summary</h1>

							<div className='invoice'>
								<div className='row invoice-info'>
									<div className='col-sm-4 invoice-col'>
										<address>
											<strong> Full Name: </strong>
											{data?.order?.firstname +
												' ' +
												data?.order?.lastname}
											<br />
											<strong> Phone: </strong>
											{data?.order?.mobile}
											<br />
											<strong> Email: </strong>
											{data?.order?.email
												? data?.order?.email
												: 'N/A'}{' '}
											<br />
											<strong> Address :</strong>
											{
												data?.order?.shipping_address
													?.address
											}
											<br />
											<strong> City:</strong>
											{
												data?.order?.shipping_address
													?.city
											}
											,
											{
												data?.order?.shipping_address
													?.postal_code
											}
											<br />
											<strong> State:</strong>
											{
												data?.order?.shipping_address
													?.state
											}
											<br />
											<strong> Country:</strong>
											{
												data?.order?.shipping_address
													?.countryName
											}
											<br />
										</address>
									</div>

									<div className='col-sm-4 invoice-col'>
										<b>Order ID #: </b>
										{data?.order?.order_id}
										<br />
										<b>Order date: </b>
										{new Date(
											data?.order?.created_at,
										).toDateString()}
										<br />
										<b>Order status: </b>
										<span className='badge badge-info'>
											{data?.order?.display_status}
										</span>
										<br />
									</div>
								</div>
								<div className='row'>
									<div className='col-md-12 table-responsive invoice-table'>
										<table className='table table-bordered'>
											<thead>
												<tr>
													<th>Product</th>
													<th>Image</th>
													<th>Quantity</th>
													<th>Subtotal</th>
													<th>Action</th>
												</tr>
											</thead>
											<tbody>
												{data?.order?.orderitems?.map(
													(item, key) => {
														// const selectOptions =
														// 	Array.from(
														// 		{
														// 			length: item?.quantity,
														// 		},
														// 		(_, i) => i + 1,
														// 	);
														// console.log(
														// 	'item',
														// 	item.returnrequest
														// 		.return_status,
														// );
														return (
															<tr key={key}>
																<td>
																	{
																		item
																			.product
																			?.title
																	}
																	{/* <small>Color:{item.variant_slug}</small> */}
																</td>
																<td>
																	<Image
																		src={
																			item
																				?.product
																				?.product_image?.[0]
																				?.image_link
																		}
																		alt={
																			item
																				?.product
																				?.product_image?.[0]
																				?.image_name
																		}
																		width={
																			100
																		}
																		height={
																			100
																		}
																	/>
																</td>
																<td>
																	{
																		item?.quantity
																	}
																</td>
																<td>
																	{item?.price *
																		item?.quantity}
																</td>

																<td>
																	<Link
																		href={`/product/${item?.product?.slug}`}
																		className='btn btn-success mr-1'
																		style={{
																			minWidth:
																				'100',
																			marginTop: 10,
																		}}
																	>
																		Re-order
																	</Link>

																	{data?.order
																		?.status ===
																	'completed' ? (
																		<Link
																			href={`/review/${data?.order?.id}/${item?.product?.id}`}
																			className='btn btn-primary'
																			style={{
																				minWidth:
																					'100',
																				marginTop: 10,
																			}}
																		>
																			Add
																			Product
																			Review
																		</Link>
																	) : null}

																	{data?.order
																		?.status ===
																		'completed' &&
																	item
																		?.returnrequest ===
																		null ? (
																		<button
																			onClick={() =>
																				handleReturn(
																					item?.order_id,
																					item?.id,
																					// true,
																					item?.quantity,
																				)
																			}
																			type='button'
																			className='btn btn-warning mb-1 ml-1'
																			style={{
																				marginTop: 10,
																			}}
																		>
																			Return
																			order
																		</button>
																	) : data
																			?.order
																			?.status ===
																			'completed' &&
																	  item
																			?.returnrequest
																			?.return_status ===
																			'new' ? (
																		<button
																			// disabled={
																			// 	isButtonDisabled
																			// }
																			onClick={() =>
																				handleReturn(
																					item?.order_id,
																					item?.id,
																					//true,
																					item?.quantity,
																					'cancel',
																				)
																			}
																			type='button'
																			style={{
																				marginTop: 12,
																			}}
																			className='btn btn-warning mb-1 ml-1'
																		>
																			Cancel
																			Return
																		</button>
																	) : data
																			?.order
																			?.status ===
																	  'completed' ? (
																		<button
																			type='button'
																			style={{
																				marginTop: 12,
																			}}
																			className='btn btn-success mb-1 ml-1'
																			disabled
																		>
																			{data
																				?.order
																				?.returnrequest
																				?.return_status !==
																				null &&
																			item
																				?.returnrequest
																				?.return_status ===
																				'declined'
																				? 'Return Canceled'
																				: data
																						?.order
																						?.returnrequest
																						?.return_status !==
																						null &&
																				  item
																						?.returnrequest
																						?.return_status ===
																						'refunded'
																				? 'Refunded'
																				: data
																						?.order
																						?.returnrequest
																						?.return_status !==
																						null &&
																				  item
																						?.returnrequest
																						?.return_status ===
																						'accepted'
																				? 'Return Accepted'
																				: data
																						?.order
																						?.status}
																		</button>
																	) : (
																		''
																	)}
																</td>
															</tr>
														);
													},
												)}
											</tbody>
										</table>
									</div>
								</div>
								<div className='row'>
									<div className='col-md-7'></div>

									<div className='col-md-5'>
										<div className='table-responsive'>
											<table className='table'>
												<tbody>
													<tr>
														<th>
															Shipping
															{
																data?.order
																	?.shipping_type
															}
														</th>
														<td>
															{data?.order
																?.shipping_amount >
															0
																? '' +
																  data?.order
																		?.display_shipping_amount
																: 'Free'}
														</td>
													</tr>

													<tr>
														<th>Total</th>
														<td>
															{
																data?.order
																	?.display_amount
															}
														</td>
													</tr>
												</tbody>
											</table>
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

export default Order;
