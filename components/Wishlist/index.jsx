import Link from 'next/link';
import React, {useCallback, useEffect} from 'react';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';

import NextImage from '@components/Common/Image';
import {useGlobalContext} from '@context/ContextApi';
import {useContextState} from '@context/reducer';
import {api} from '@utils/api';
import NoDataFound from '@components/Common/NoDataFound';
import {confirmDialog} from '@utils/helper';

const Wishlist = () => {
	const router = useRouter();

	const {
		state: globalState,
		getWishlistCount,
		isAuthenticated,
		getCartCount,
		isGuestAuthenticated,
	} = useGlobalContext();
	const {state, dispatch} = useContextState({wishlistReload: false});
	const fetchWishlistItems = useCallback(async () => {
		try {
			// if (!globalState.userAuth?.id) return;
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					wishlistLoading: true,
				},
			});
			const response = await api({
				url: '/wishlist/list',
				method: 'POST',
				data: {
					user_id: globalState.userAuth.id,
				},
			});
			if (response.status)
				dispatch({
					type: 'SET_DATA',
					data: {
						...state,
						wishlistLoading: false,
						wishlistList: response.data,
						wishlistReload: false,
					},
				});
		} catch (error) {
			console.log('error', error);
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					wishlistLoading: false,
				},
			});
		}
	}, [globalState.userAuth?.id, state?.wishlistReload]);

	useEffect(() => {
		fetchWishlistItems();
	}, [fetchWishlistItems]);

	const removeFromCart = async wish => {
		try {
			const confirm = await confirmDialog(
				'Are you sure to remove from wishlist',
			);
			if (!confirm) return;
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					removeFromCartLoading: true,
					wishlistReload: false,
				},
			});

			const response = await api({
				url: '/wishlist/add-remove-list',
				method: 'POST',
				data: {
					product_id: wish.product_id,
					user_id: globalState.userAuth.id,
					status_type: 0,
				},
			});
			if (response.status) {
				dispatch({
					type: 'SET_DATA',
					data: {
						...state,
						removeFromCartLoading: false,
						wishlistReload: true,
					},
				});
				getWishlistCount();
			} else if (response.code === 400) {
				dispatch({
					type: 'SET_DATA',
					data: {
						...state,
						removeFromCartLoading: false,
						// inWishlist: !state.inWishlist,
					},
				});
				toast.warning(response.message);
			}
		} catch (error) {
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					removeFromCartLoading: false,
				},
			});
		}
	};

	const removeFromWishlist = async wish => {
		try {
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					removeFromCartLoading: true,
					wishlistReload: false,
				},
			});

			const response = await api({
				url: '/wishlist/add-remove-list',
				method: 'POST',
				data: {
					product_id: wish.product_id,
					user_id: globalState.userAuth.id,
					status_type: 0,
				},
			});
			if (response.status) {
				dispatch({
					type: 'SET_DATA',
					data: {
						...state,
						removeFromCartLoading: false,
						wishlistReload: true,
					},
				});
				getWishlistCount();
			} else if (response.code === 400) {
				dispatch({
					type: 'SET_DATA',
					data: {
						...state,
						removeFromCartLoading: false,
						// wishlistReload: true,
					},
				});
				toast.warning(response.message);
			}
		} catch (error) {
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					removeFromCartLoading: false,
				},
			});
		}
	};

	const submitAddToCart = async (e, wish) => {
		e.preventDefault();

		if (!isAuthenticated && !isGuestAuthenticated)
			return router.push('/login');
		const data = {
			// eslint-disable-next-line babel/camelcase
			product_id: wish?.product_id,
			quantity: 1,
		};

		const response = await api({
			url: '/cart/add',
			method: 'POST',
			data,
		});
		if (response.status) {
			getCartCount();
			toast.success('Item Added to Cart !');
			window.location.replace('/cart');
			// router.push(`/cart`);
			removeFromWishlist(wish);
		} else {
			getCartCount();
			toast.warning(response.message);
		}
	};

	return (
		<div className='section pad-btm-sec'>
			<div className='container'>
				<h1 className='cms-pages-head'>Wishlist </h1>

				{state?.wishlistList?.length ? (
					<div className='cart-container d-flex flex-wrap'>
						<div className='table-responsive '>
							<table className='cart-table user-product-table'>
								<thead>
									<tr>
										<th>Product Image</th>
										<th>Product Name</th>
										<th>Price</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{state?.wishlistList?.map((wish, index) => {
										// console.log(
										// 	'wish?.product?',
										// 	wish?.product,
										// );
										return (
											<tr
												key={index}
												className='item-info product_data'
											>
												<td className='item'>
													<Link
														href={`/product/${wish?.product.slug}`}
														className='product-item-photo'
													>
														<NextImage
															src={
																wish?.product
																	?.product_image?.[0]
																	?.image_link
															}
															alt={
																wish?.product
																	?.product_image?.[0]
																	?.image_name
															}
															width={100}
															height={100}
														/>
													</Link>
												</td>
												<td className='item'>
													{wish?.product?.title}
												</td>
												<td className='item text-nowrap'>
													$ {wish?.product?.price}
												</td>
												<td>
													<div className='cart-action'>
														<Link
															onClick={e =>
																wish?.product
																	?.stock > 0
																	? submitAddToCart(
																			e,
																			wish,
																	  )
																	: toast.warn(
																			'Item is out of stock!',
																	  )
															}
															href=''
															// href={decodeURI(
															// 	`https://testing-admin-react-ecom-single.projectstatus.co.uk/product/${wish?.product?.slug}`,
															// )}
															id='add_to_cart'
															className='custom-btn btn'
														>
															Add to Cart{' '}
														</Link>
														<button
															className='delete-cart-item btn btn-link'
															onClick={() =>
																removeFromCart(
																	wish,
																)
															}
														>
															<img
																src='https://ecommerceportal.24livehost.com/frontend/images/delete-icon.png'
																alt='delete-btn'
															/>
														</button>
													</div>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				) : (
					<NoDataFound
						message={'Your Wishlist is empty'}
						loading={state.wishlistLoading}
					/>
				)}
			</div>
		</div>
	);
};

export default Wishlist;
