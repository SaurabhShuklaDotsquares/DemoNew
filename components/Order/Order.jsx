import React, {useCallback, useState, useEffect} from 'react';
import Link from 'next/link';
import {toast} from 'react-toastify';
import AccountSidebar from '@components/Common/Account/AccountSidebar';
import {api} from '@utils/api';
import {useContextState} from '@context/reducer';
import Loading from '@components/Common/Loading';
import {confirmDialog} from '@utils/helper';
import Pagination from 'react-responsive-pagination';
import {useRouter} from 'next/router';

const Order = () => {
	const {state, dispatch} = useContextState({
		orderLoading: true,
		orderList: [],
	});
	const [page] = useState(1);
	const router = useRouter();
	const handlePageChange = page => {
		dispatch({
			type: 'SET_DATA',
			data: {
				...state,
				currentPage: page,
			},
		});
		router.replace({
			query: {...router.query, page: page},
		});
		fetchOrders(page);
		// router.push()
	};

	console.log('state', state);

	const fetchOrders = useCallback(async page => {
		dispatch({
			type: 'SET_DATA',
			data: {
				...state,
				orderLoading: true,
			},
		});

		const orders = await api({url: `/order?page=` + page});
		// const orders = await api({url: `/order`});

		dispatch({
			type: 'SET_DATA',
			data: {
				...state,
				orderList: orders?.status ? orders.data.data : [],
				total_page: orders?.data?.total_page,
				orderLoading: false,
				//links: orders.data.links,
			},
		});
	}, []);

	useEffect(() => {
		fetchOrders(page);
	}, [fetchOrders, page]);

	const handleCancel = async id => {
		const confirm = await confirmDialog(
			'Are you want to cancel this order?',
		);
		if (confirm) {
			const data = {
				// eslint-disable-next-line babel/camelcase
				order_id: id,
			};

			const response = await api({
				url: '/order/cancel-order',
				method: 'POST',
				data,
			});

			if (response.status) {
				fetchOrders(page);
				toast.success(response.message);
			} else {
				toast.warning(response.message);
			}
		}
	};

	return (
		<>
			<div className='cms-page innerblock-padd'>
				<div className='container'>
					<div className='dashborad-panel'>
						<div className='col-md-3'>
							<AccountSidebar />
						</div>
						<div className='dashborad-rightsider  col-md-9 dashright-bx'>
							<h1 className='dash-head'>My Order</h1>
							{state?.orderList?.length ? (
								<div className='table-responsive notif-table'>
									<table
										className='table m-t-30 no-wrap table-hover contact-list'
										data-page-size='10'
									>
										<tbody>
											{state?.orderList?.map(
												(order, key) => {
													return (
														<tr
															className='item-info'
															key={key}
														>
															<td>
																<ul className='item-options item-order-options p-3'>
																	<li>
																		<span>
																			Order
																			ID#{' '}
																		</span>
																		{
																			order.order_id
																		}
																	</li>
																	<li>
																		<span>
																			Order
																			date:
																		</span>
																		{new Date(
																			order.created_at,
																		).toDateString()}
																	</li>
																	<li>
																		<span>
																			Shipping{' '}
																		</span>
																		{
																			order.display_shipping_amount
																		}
																	</li>
																	<li>
																		<span>
																			Total
																			amount{' '}
																		</span>
																		{
																			order.display_amount
																		}
																	</li>
																</ul>
															</td>
															<td>
																<div className='cart-action'>
																	<Link
																		href={`/orderDetail/${order.order_id}`}
																		className='btn btn-primary mb-1'
																	>
																		Order
																		Detail
																	</Link>
																	<br />
																	{order.status ===
																	'Cancelled' ? (
																		<Link
																			href='javascript:void(0);'
																			className='btn btn-secondary mb-1'
																			style={{
																				cursor: 'not-allowed',
																			}}
																		>
																			Cancelled
																		</Link>
																	) : order.status ===
																	  'completed' ? (
																		<button
																			// onClick={() => handleReturn(order.order_id)}
																			type='button'
																			className='btn btn-warning mb-1 ml-3'
																			disabled
																		>
																			{order
																				?.orderitems
																				.length >
																			0
																				? order
																						?.orderitems[0]
																						.returnrequest
																						?.return_status ===
																				  'refunded'
																					? 'Refunded'
																					: order
																							?.orderitems[0]
																							.returnrequest
																							?.return_status ===
																					  'declined'
																					? 'Return Canceled'
																					: order
																							?.orderitems[0]
																							.returnrequest
																							?.return_status ===
																					  'accepted'
																					? 'Return Accepted'
																					: order
																							?.orderitems[0]
																							.returnrequest
																							?.return_status ===
																					  'new'
																					? 'Return Requested'
																					: 'Completed'
																				: ''}
																		</button>
																	) : order.status ===
																	  'Refunded' ? (
																		<Link
																			href='javascript:void(0);'
																			className='btn btn-secondary mb-1'
																			style={{
																				cursor: 'not-allowed',
																			}}
																		>
																			Refunded
																		</Link>
																	) : order.status ===
																	  'Returned' ? (
																		<Link
																			href='javascript:void(0);'
																			className='btn btn-secondary mb-1'
																			style={{
																				cursor: 'not-allowed',
																			}}
																		>
																			Returned
																		</Link>
																	) : order.status ===
																	  'Failed' ? (
																		<Link
																			href='javascript:void(0);'
																			className='btn btn-secondary mb-1'
																			style={{
																				cursor: 'not-allowed',
																			}}
																		>
																			Failed
																		</Link>
																	) : order.status ===
																	  'Pending_for_payment' ? (
																		<Link
																			href='javascript:void(0);'
																			className='btn btn-secondary mb-1'
																			style={{
																				cursor: 'not-allowed',
																			}}
																		>
																			Pending
																			for
																			payment
																		</Link>
																	) : order.status ===
																	  'Cancelled' ? (
																		<button
																			disabled
																			onClick={() =>
																				handleCancel(
																					order.order_id,
																				)
																			}
																			type='button'
																			className='btn btn-danger mb-1 ml-3'
																		>
																			Cancel
																			order
																		</button>
																	) : (
																		<button
																			onClick={() =>
																				handleCancel(
																					order.order_id,
																				)
																			}
																			type='button'
																			className='btn btn-danger mb-1 ml-3'
																		>
																			Cancel
																			order
																		</button>
																	)}
																</div>
															</td>
														</tr>
													);
												},
											)}
										</tbody>
									</table>
								</div>
							) : state.orderLoading ? (
								<Loading />
							) : (
								<div
									className='cart-container d-flex flex-wrap'
									style={{justifyContent: 'center'}}
								>
									<div className='row' style={{width: '50%'}}>
										<div className='col-md-12 text-center'>
											<div
												role='alert'
												className='fade text-danger p-5 alert alert-danger show'
											>
												<img
													src='/assets/images/bag-empty.svg'
													alt='empty-bag-img'
												/>
												<div className='text-muted alert-heading h4'>
													No Orders Found
												</div>
											</div>
										</div>
									</div>
								</div>
							)}
							<br />
							{/* {state?.total_page?.length ? ( */}
							<Pagination
								maxWidth={30}
								current={parseInt(router?.query?.page ?? 1)}
								total={state.total_page}
								onPageChange={handlePageChange}
							/>
							{/* ) : (
								''
							)} */}

							{/* <ul className='pagination justify-content-center mt-2'>
								{state?.links?.map((item, index) => (
									<li
										key={index}
										className={
											'page-item' +
											(item.url ? '' : ' disabled') +
											(item.active ? ' active' : '')
										}
									>
										<a
											className='page-link'
											onClick={() => {
												setPage(
													item?.url?.split(
														'page=',
													)?.[1],
												);
											}}
										>
											<span
												aria-hidden='true'
												dangerouslySetInnerHTML={{
													__html: item.label,
												}}
											/>
										</a>
									</li>
								))}
							</ul> */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Order;
