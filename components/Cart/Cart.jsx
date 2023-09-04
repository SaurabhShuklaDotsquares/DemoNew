import React, {Fragment, useEffect} from 'react';
import {toast} from 'react-toastify';
import Link from 'next/link';

import {api} from '@utils/api';
import {useGlobalContext} from '@context/ContextApi';
import NoDataFound from '@components/Common/NoDataFound';
import NextImage from '@components/Common/Image';
import {confirmDialog} from '@utils/helper';
import Router from 'next/router';
import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';

import {useCartListState} from './reducer';
// import { useGlobalContext } from '@context/ContextApi';

const Cart = () => {
	const {getCartCount} = useGlobalContext();
	const {state, dispatch} = useCartListState();
	const {state: globalState, isAuthenticated} = useGlobalContext();
	const [loading, setLoading] = React.useState(false);

	const getResults = async () => {
		try {
			setLoading(true);
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					cartLoading: true,
				},
			});

			const result = await api({
				url: '/list_cart',
				method: 'GET',
			});

			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					list: result.data.data,
					quantity: result.data.quantity,
					tax: result.data.tax,
					// eslint-disable-next-line babel/camelcase
					tax_price: result.data.display_tax_price,
					sub_total: result.data.display_sub_total,
					total_price: result.data.total_display_price,
					cartLoading: false,
				},
			});
			setLoading(false);
		} catch (e) {
			// eslint-disable-next-line no-console
			console.log({e});
			setLoading(false);
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					cartLoading: false,
				},
			});
		}
	};

	useEffect(() => {
		getResults();
	}, []);

	const handleIncrement = async (index, item) => {
		if (item?.product?.stock < parseInt(item?.quantity) + 1) {
			setLoading(false);

			toast.warning('Actual quantity is less than Desired quantity.');

			return;
		}

		const lists = state.list;
		lists[index]['quantity'] = Number(lists[index].quantity) + 1;
		dispatch({
			type: 'SET_DATA',
			data: {
				...state,
				list: lists,
			},
		});
		const result = await api({
			url: '/cart/update',
			method: 'POST',
			data: {
				// eslint-disable-next-line babel/camelcase
				cart_id: lists[index]['id'],
				quantity: lists[index]['quantity'],
				// eslint-disable-next-line babel/camelcase
				product_id: lists[index]['product']['id'],
			},
		});
		if (result.status) {
			toast.success(result.message);
			getResults();
		}
	};
	const handleDecrement = async index => {
		const lists = state.list;
		lists[index]['quantity'] = Number(lists[index].quantity) - 1;
		dispatch({
			type: 'SET_DATA',
			data: {
				...state,
				list: lists,
			},
		});

		const result = await api({
			url: '/cart/update',
			method: 'POST',
			data: {
				// eslint-disable-next-line babel/camelcase
				cart_id: lists[index]['id'],
				quantity: lists[index]['quantity'],
				// eslint-disable-next-line babel/camelcase
				product_id: lists[index]['product']['id'],
			},
		});
		if (result.status) {
			toast.success(result.message);
			getResults();
		}
	};
	const handleRemove = async index => {
		const confirm = await confirmDialog('Are you sure to remove from Cart');
		if (!confirm) return;
		const lists = state.list;

		const result = await api({
			url: '/cart/remove',
			method: 'POST',
			// eslint-disable-next-line babel/camelcase
			data: {cart_id: lists[index]['id']},
		});
		if (result.status) {
			toast.success(result.message);
			getResults();
		}

		getCartCount();
	};

	const changePage = e => {
		e.preventDefault();
		if (isAuthenticated && globalState?.userAuth) {
			Router.push('/checkout');
		} else {
			Router.push('/login');
		}
	};

	return (
		<>
			<SpinnerLoader loading={loading} />
			<div className='section pad-btm-sec'>
				<div className='container'>
					<h1 className='cms-pages-head'>Shopping Cart</h1>

					{state?.list.length > 0 ? (
						<>
							<div className='cart-container d-flex flex-wrap'>
								<div className='cart-list'>
									<div className='table-responsive'>
										<table className='cart-table text-center'>
											<thead>
												<tr>
													<th>Image</th>
													<th>Items</th>
													<th>Price</th>
													<th>Qty</th>
													<th>Total</th>
													<th>Action</th>
												</tr>
											</thead>
											<tbody>
												{state?.list.map(
													(item, index) => (
														<Fragment key={index}>
															<tr className='item-info'>
																<td className='item text-center'>
																	<div className='d-flex'>
																		<span className='product-item-photo'>
																			<NextImage
																				width={
																					200
																				}
																				height={
																					200
																				}
																				src={
																					item
																						.product_image?.[0]
																						?.image_link
																				}
																				alt={
																					item
																						.product_image?.[0]
																						?.image_name
																				}
																			/>
																		</span>
																	</div>
																</td>
																<td className='item text-center'>
																	<strong className='product-item-name'>
																		{
																			item
																				.product
																				.title
																		}
																	</strong>
																</td>
																<td>{`${item?.display_final_price}`}</td>
																<td>
																	<span id='quantity_block'>
																		<div
																			className='input-group quantity-input-box justify-content-center text-center mb-3'
																			style={{
																				width: '100%',
																			}}
																		>
																			<button
																				onClick={() => {
																					{
																						handleDecrement(
																							index,
																						);
																						setLoading(
																							true,
																						);
																					}
																				}}
																				className='input-group-text decrement-btn '
																				disabled={
																					+item.quantity ===
																					1
																						? true
																						: false ||
																						  loading
																				}
																			>
																				-
																			</button>
																			<input
																				readOnly
																				value={
																					item.quantity
																				}
																				name={
																					item
																						.product
																						.slug
																				}
																				type='text'
																				className='form-control text-center qty-input'
																			/>
																			<button
																				onClick={() => {
																					{
																						setLoading(
																							true,
																						);
																						handleIncrement(
																							index,
																							item,
																						);
																					}
																				}}
																				className='input-group-text increment-btn'
																				disabled={
																					loading
																				}
																			>
																				+
																			</button>
																		</div>
																	</span>
																</td>
																<td>{`${item?.display_final}`}</td>
																<td>
																	<table>
																		<tbody>
																			<tr className='item-actions'>
																				<td
																					colSpan={
																						4
																					}
																				>
																					<div className='cart-action'>
																						<div
																							style={{
																								width: '25px',
																							}}
																						></div>
																						{/* <button
																						className='btn btn-link btn-light'
																						onClick={() => handleUpdate(index)}
																					>
																						<img
																							title='Update product'
																							src='/assets/images/update.png'
																							alt='edit-btn'
																							width='25px'
																						/>
																					</button> */}

																						<button
																							className='btn btn-link btn-light'
																							onClick={() =>
																								handleRemove(
																									index,
																								)
																							}
																						>
																							<img
																								title='Remove Product'
																								src='/assets/images/delete-icon.png'
																								alt='delete-btn'
																							/>
																						</button>
																					</div>
																				</td>
																			</tr>
																		</tbody>
																	</table>
																</td>
															</tr>
														</Fragment>
													),
												)}
											</tbody>
										</table>
									</div>
									<div className='cart-button'>
										<Link
											href='/'
											className='custom-btn btn'
										>
											Continue Shopping
										</Link>
									</div>
								</div>
								<div className='cart-summary'>
									<span className='summary-title'>
										Summary
									</span>
									<div className='cart-total'>
										<table>
											<tbody>
												{/* <tr>
													<th>Subtotal</th>
													<td>{`${state?.sub_total}`}</td>
												</tr> */}
												{/* <tr>
													<th>{state.tax ? state.tax.title : 'Inc. Tax'}</th>
													<td>{`${state?.tax_price}`}</td>
												</tr> */}
												<tr className='grand-total'>
													<th>Total Price</th>
													<td>{`${state?.sub_total}`}</td>
												</tr>
											</tbody>
										</table>
									</div>

									<div className='proceed-btn'>
										<button
											className='custom-btn'
											onClick={e => changePage(e)}
										>
											Proceed to checkout
										</button>
									</div>
								</div>
							</div>
						</>
					) : (
						<NoDataFound loading={state.cartLoading} />
					)}
				</div>
			</div>
		</>
	);
};

export default Cart;
