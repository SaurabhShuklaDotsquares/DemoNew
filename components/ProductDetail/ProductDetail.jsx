import React, {useState, useEffect} from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Zoom from 'react-medium-image-zoom';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {toast} from 'react-toastify';

import {api} from '@utils/api';
import {useGlobalContext} from '@context/ContextApi';
import {useContextState} from '@context/reducer';
import styles from '@styles/ProductDetail.module.css';
import NextImage from '@components/Common/Image';
import ECarousel from '@components/Common/Carousel';
import RatingWidget from '@components/Common/Rating';
import Loading from '@components/Common/Loading';
import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';

const ProductDetail = ({productDetail}) => {
	
	const [details, setDetails] = useState('');
	const getProDetails = async () => {
		const response = await api({
			url: `/product/product_detail/${productDetail.slug}`,
			method: 'GET',
		});
		if (response.status) {
			setDetails(response.data);
		}
	};

	useEffect(() => {
		getProDetails();
	}, []);
	useEffect(() => {
		if (details) {
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					inWishlist: details.isLiked,
				},
			});
		}
	}, [details]);

	const router = useRouter();

	const [Slug,setSlug] = useState("");
	useEffect(()=>{
		if(router.query?.slug.length > 0){
			setSlug(router.query?.slug[router.query?.slug.length - 1]);
		}
	},[router.query?.slug])
	const {
		isAuthenticated,
		getCartCount,
		state: globalState,
		getWishlistCount,
		isGuestAuthenticated,
	} = useGlobalContext();

	const [productImage, setProductImage] = useState([]);
	const [variant, setVariant] = useState(null);
	const [variantError, setVariantError] = useState(null);
	const [selectedVariant, setSelectedVariant] = useState([]);
	const [loading, setLoading] = useState(false);

	const {state, dispatch} = useContextState({
		quantity: 1,
		inWishlist: productDetail?.isLiked,
	});

	useEffect(() => {
		let attr = [];
		productDetail?.product_attribute?.forEach(i => {
			attr.push(i?.option?.option_values?.[0]?.title);
		});
		if (attr.length) {
			handleAttribute(null, attr);
		}
	}, []);

	const handleDragStart = e => e.preventDefault();
	const getProductDetail = async () => {
		setLoading(true);
		try {
			if (variant?.attribute_image.length > 0) {
				let images = [];
				if (variant?.attribute_image) {
					variant?.attribute_image.map((img, index) => {
						images.push(
							<Zoom key={index}>
								<NextImage
									onDragStart={handleDragStart}
									className={'galleryImageOnHover'}
									key={index}
									width='100%'
									height='100%'
									src={img.image_link}
									alt={img.image_name || ''}
								/>
							</Zoom>,
						);
					});
				}
				if (images.length) setLoading(false);
				setProductImage(images);
			} else {
				if (productDetail?.product_image) {
					let images = [];
					if (productDetail?.product_image) {
						productDetail?.product_image.map((img, index) => {
							images.push(
								<Zoom key={index}>
									<NextImage
										onDragStart={handleDragStart}
										className={'galleryImageOnHover'}
										key={index}
										width='100%'
										height='100%'
										src={img.image_link}
										alt={img.image_name || ''}
									/>
								</Zoom>,
							);
						});
					}
					if (images.length) setLoading(false);
					setProductImage(images);
				}
			}
		} catch (e) {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (typeof window !== 'undefined') {
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					BaseURL: window.location.href,
				},
			});
		}
		getProductDetail();
		if (!productDetail?.title) {
			setLoading(true);
			router.push('/');
		}
	}, [variant]);

	const handleIncrement = () => {
		if (state.quantity === undefined) state.quantity = 0;
		if (state?.quantity < 10) {
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					quantity: state.quantity + 1,
				},
			});
		}
	};

	const handleDecrement = () => {
		if (state?.quantity > 1) {
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					quantity: state.quantity - 1,
				},
			});
		}
	};

	const submitAddToCart = async e => {
		e.preventDefault();

		if (!isAuthenticated && !isGuestAuthenticated)
			return router.push('/login');
		const data = {
			// eslint-disable-next-line babel/camelcase
			product_id: productDetail?.id,
			quantity: state.quantity,
		};

		if (productDetail?.product_attribute?.length && variant === null) {
			toast.warning('Please select attribute.');
			return false;
		}

		if (variant) {
			data['variant_id'] = variant.id;
			data['variant_slug'] = variant.attribute_slug;
		}
		setLoading(true);
		const response = await api({
			url: '/cart/add',
			method: 'POST',
			data,
		});
		if (response.status) {
			getCartCount();
			toast.success('Item Added to Cart !');
			setLoading(false);
		} else {
			getCartCount();
			toast.warning(response.message);
			setLoading(false);
		}
	};

	const handleAttribute = async (k, selected) => {
		let sVariant = new Array(...selectedVariant);

		if (k !== null) {
			sVariant[k] = selected;
		} else {
			sVariant = selected;
		}

		setSelectedVariant(sVariant);

		if (
			sVariant.filter(e => e).length !==
			productDetail?.product_attribute?.length
		) {
			return;
		}

		const formData = new FormData();
		formData.append('product_id', productDetail?.id);

		sVariant.forEach(key => {
			formData.append(`attribute[]`, key);
		});

		const response = await api({
			url: '/product/product-price',
			method: 'POST',
			data: formData,
		});

		if (response.status) {
			setVariant(response.data);
			setVariantError(null);
		} else {
			setVariantError(response.message);
		}
		setLoading(false);
	};

	const addRemoveToWishlist = async (event, product) => {
		try {
			event.preventDefault();
			if (!isAuthenticated)
				return toast.info('Please login to add Wishlist');
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					removeFromCartLoading: true,
				},
			});
			setLoading(true);
			const response = await api({
				url: '/wishlist/add-remove-list',
				method: 'POST',
				data: {
					product_id: product.id,
					user_id: globalState.userAuth.id,
					status_type: state.inWishlist ? 0 : 1,
				},
			});
			if (response.status) {
				setLoading(false);
				dispatch({
					type: 'SET_DATA',
					data: {
						...state,
						removeFromCartLoading: false,
						inWishlist: !state.inWishlist,
					},
				});
				if (response.message) setLoading(false);
				toast.success(response.message);
				getWishlistCount();
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

	if (!productDetail?.title) return <Loading />;
	return (
		<>
			<SpinnerLoader loading={loading} />
			<nav aria-label='breadcrumb' className='breadcrumb-sec'>
				<div className='container'>
					<ol className='breadcrumb'>
						<li className='breadcrumb-item'>
							<Link href='/'>Home</Link>
						</li>
						{productDetail?.breadcrumbs?.map((br, i) => {
							return (
								<li className={`breadcrumb-item`} key={i}>
									{br.slug === Slug ? (
										<span
											className={`${
												br.slug === Slug
													? 'text-danger'
													: ''
											}`}
										>
											{' '}
											{br.title}
										</span>
									) : (
										<Link
											className={`${
												br.slug === Slug
													? 'text-danger'
													: ''
											}`}
											href={
												br.slug === Slug
													? `/product/${br.slug}`
													: `/products/${br.slug}`
											}
										>
											{br.title}
										</Link>
									)}
								</li>
							);
						})}
					</ol>
				</div>
			</nav>
			<div className='section pad-btm-sec'>
				<div className='container'>
					<div className='product-detail-sec'>
						<div className='product-detail-top'>
							<div className='row'>
								<div className='col-lg-1 d-none d-sm-none d-md-none d-lg-block'></div>

								<div className='col-12 col-sm-12  col-md-12 col-lg-10'>
									<div className='row'>
										<div className='col-lg-6'>
											<div className='product-main-slider'>
												<ECarousel
													responsive={{
														desktop: {
															breakpoint: {
																max: 3000,
																min: 1024,
															},
															items: 1,
														},
														mobile: {
															breakpoint: {
																max: 464,
																min: 0,
															},
															items: 1,
														},
														tablet: {
															breakpoint: {
																max: 1024,
																min: 464,
															},
															items: 1,
														},
													}}
												>
													{productImage}
												</ECarousel>
											</div>
										</div>
										<div className='col-lg-6'>
											<div className='product-info-col product_data product-detail-block'>
												<span className='brand-heading'>
													{productDetail?.brand_data
														?.title || ''}
												</span>
												<h1>{productDetail?.title}</h1>
												<div className='product-price'>
													{variant ? (
														<h2
															style={{
																color: 'black',
															}}
														>
															{' '}
															{variant?.price
																? `${variant?.display_price}`
																: `${variant?.display_regular_price}`}
															&nbsp;
															{variant?.price ? (
																<s
																	style={{
																		color: 'red',
																	}}
																>{`${variant?.display_regular_price}`}</s>
															) : null}
														</h2>
													) : (
														<h2
															style={{
																color: 'black',
															}}
														>
															{' '}
															{productDetail.discounted_price
																? `${productDetail.display_discounted_price}`
																: `${productDetail.display_price}`}
															&nbsp;
															{productDetail.display_discounted_price ? (
																<s
																	style={{
																		color: 'red',
																	}}
																>{`${productDetail.display_price}`}</s>
															) : null}
														</h2>
													)}
												</div>
												<div className='overview-blk detail-des'>
													<h2> Description</h2>
													<span
														dangerouslySetInnerHTML={{
															__html: productDetail?.long_description,
														}}
													></span>
												</div>
												<div className='availibily-blk detail-des'>
													<h2> Availability</h2>
													<div className='availibily-col d-flex align-items-center'>
														<div className='sort-by mb-3'>
															{productDetail
																?.product_attribute
																?.length
																? productDetail?.product_attribute?.map(
																		(
																			pr,
																			i,
																		) => {
																			if (
																				pr.option.title.includes(
																					'Color',
																				)
																			) {
																				return (
																					<React.Fragment
																						key={
																							i +
																							'Color'
																						}
																					>
																						<h6 className='pb-2 d-block'>
																							{
																								pr
																									.option
																									.title
																							}
																						</h6>
																						<div className='d-flex'>
																							{pr.option.option_values.map(
																								(
																									prd,
																									k,
																								) => {
																									return (
																										<div
																											key={
																												i +
																												k +
																												'color'
																											}
																											style={{
																												background:
																													selectedVariant[
																														i
																													] ===
																													prd.title
																														? 'lightgray'
																														: 'none !important',
																											}}
																										>
																											<div
																												onClick={() =>
																													handleAttribute(
																														i,
																														prd.title,
																													)
																												}
																												title={
																													prd.title
																												}
																												role='button'
																												className={
																													styles.colorMode
																												}
																												style={{
																													backgroundColor: `${
																														prd.hexcode ||
																														prd.title
																													}`,
																												}}
																											></div>
																										</div>
																									);
																								},
																							)}
																						</div>
																					</React.Fragment>
																				);
																			} else {
																				return (
																					<React.Fragment
																						key={
																							i +
																							pr
																								.option
																								.title
																						}
																					>
																						<span>
																							{
																								pr
																									.option
																									.title
																							}
																						</span>
																						<div className='sizeBox proBoxSize'>
																							{pr.option.option_values.map(
																								(
																									prd,
																									k,
																								) => {
																									return (
																										<div
																											key={
																												i +
																												k +
																												pr
																													.option
																													.title
																											}
																											onClick={() =>
																												handleAttribute(
																													i,
																													prd.title,
																												)
																											}
																											title={
																												prd.title
																											}
																											style={{
																												background:
																													selectedVariant?.[
																														i
																													] ===
																													prd.title
																														? 'lightgrey'
																														: 'none',
																											}}
																											role='button'
																											className={
																												styles.sizeMode
																											}
																										>
																											{
																												prd.title
																											}
																										</div>
																									);
																								},
																							)}
																						</div>
																					</React.Fragment>
																				);
																			}
																			// if (pr.option.title.includes('Size')) {

																			// }
																		},
																  )
																: null}
														</div>
													</div>
													<div className='row'>
														<div className='col-md-12'>
															<span
																id='quantity_block'
																className='mb-4 d-block '
															>
																<h5 className='quantity pb-3'>
																	Quantity
																</h5>
																<div className='input-group text-center quantity-wrapper'>
																	<button
																		onClick={
																			handleDecrement
																		}
																		className='input-group-text decrement-btn '
																	>
																		<i
																			className='fa fa-minus'
																			aria-hidden='true'
																		></i>
																	</button>
																	<input
																		defaultValue={
																			1
																		}
																		value={
																			state?.quantity
																		}
																		type='text'
																		name='quantity '
																		className='form-control text-center qty-input'
																	/>

																	<button
																		onClick={
																			handleIncrement
																		}
																		disabled={
																			state?.quantity ===
																			productDetail?.stock
																		}
																		className='input-group-text increment-btn'
																	>
																		<i
																			className='fa fa-plus'
																			aria-hidden='true'
																		></i>
																	</button>
																</div>
															</span>
														</div>
													</div>
													<div className='row'>
														<div className='col-6'>
															<div className='add-cart-btn addtocartBtn'>
																{productDetail
																	?.product_attribute
																	?.length ===
																0 ? (
																	productDetail?.stock &&
																	state?.quantity <=
																		productDetail?.stock ? (
																		<button
																			className='custom-btn btn'
																			onClick={
																				submitAddToCart
																			}
																		>
																			Add
																			to
																			Cart
																		</button>
																	) : (
																		<button
																			className='custom-btn btn'
																			disabled
																		>
																			Out
																			of
																			stock
																		</button>
																	)
																) : variantError ? (
																	<button
																		className='custom-btn btn'
																		disabled
																	>
																		Unavailable
																	</button>
																) : variant?.stock &&
																  state?.quantity <=
																		variant?.stock ? (
																	<button
																		className='custom-btn btn'
																		onClick={
																			submitAddToCart
																		}
																	>
																		Add to
																		Cart
																	</button>
																) : (
																	<button
																		className='custom-btn btn'
																		disabled
																	>
																		Out of
																		stock
																	</button>
																)}
															</div>
														</div>
														<div className='col-6'>
															<div className='wishlist-btn float-right pl-4 pr-4'>
																<span
																	className='addWish like'
																	data-product='3'
																>
																	{state.removeFromCartLoading ? (
																		<div
																			className='spinner-border wishlistLoader'
																			role='status'
																			style={{
																				float: 'right',
																			}}
																		>
																			<span className='sr-only'>
																				Loading...
																			</span>
																		</div>
																	) : (
																		<span
																			className='addWish like'
																			onClick={event =>
																				addRemoveToWishlist(
																					event,
																					productDetail,
																				)
																			}
																		>
																			<NextImage
																				src={`/assets/images/${
																					state.inWishlist
																						? 'heartfull'
																						: 'heart'
																				}.png`}
																				alt={
																					'heart'
																				}
																			/>{' '}
																			Wishlist
																			{/* <i className='fa fa-heart' style={{color: 'red'}} id='wishlist' /> */}
																		</span>
																	)}
																</span>
															</div>
														</div>
													</div>
												</div>

												<div className='overview-blk detail-des'>
													<h2 className='sharelink'>
														Share this
													</h2>
													<div className='social-media'>
														<i>
															<a
																href={
																	'http://www.facebook.com/sharer.php?u=' +
																	state.BaseURL
																}
																target='_blank'
																rel='noreferrer'
															>
																<NextImage
																	width={50}
																	height={50}
																	src='/assets/images/fb.jpg'
																	alt
																/>
															</a>
														</i>
														<i>
															<a
																href={
																	'https://twitter.com/share?url=' +
																	state.BaseURL +
																	'&amp;text=Simple%20Share%20Buttons&amp;hashtags=simplesharebuttons'
																}
																target='_blank'
																rel='noreferrer'
															>
																<NextImage
																	width={50}
																	height={50}
																	src='/assets/images/tw.jpg'
																	alt
																/>
															</a>
														</i>
														<i>
															<a
																href={
																	'http://pinterest.com/pin/create/link/?url=' +
																	state.BaseURL
																}
																target='_blank'
																rel='noreferrer'
															>
																<NextImage
																	width={50}
																	height={50}
																	src='/assets/images/pin.jpg'
																	alt
																/>
															</a>
														</i>
													</div>
												</div>
											</div>
										</div>
										<div className='col-lg-12'>
											<div className='product-full-detail'>
												<Tabs
													defaultActiveKey='reviews'
													id='justify-tab-example'
													className='mb-3 custom-tabs custom-tabs-review'
													justify
												>
													<Tab
														eventKey='reviews'
														title={`Reviews (${
															productDetail
																?.reviews
																?.length || 0
														})`}
													>
														<ul className='list-unstyled'>
															{/* productDetail.reviews */}
															{productDetail
																?.reviews
																?.length
																? productDetail.reviews.map(
																		(
																			item,
																			index,
																		) => (
																			<li
																				className='media border-bottom p-3 mb-3'
																				key={
																					index
																				}
																			>
																				<NextImage
																					width={
																						50
																					}
																					height={
																						50
																					}
																					src='/assets/images/review.png'
																					className='mr-3'
																					alt='review-icon'
																				/>
																				<div className='media-body'>
																					<h5 className='mt-0 pb-0 '>
																						{
																							item
																								?.user
																								?.firstname
																						}
																					</h5>
																					<div className='mb-2'>
																						<div className='row col-md-12 ratingWidget'>
																							<RatingWidget
																								defaultValue={
																									0
																								}
																								value={
																									item?.rating
																								}
																								view={
																									true
																								}
																							/>
																						</div>
																						{/* <NextImage
																						width={50}
																						height={50}
																						src='/assets/images/star.png'
																						alt='star icon'
																					/> */}
																					</div>
																					<p>
																						{
																							item?.comment
																						}
																					</p>
																				</div>
																			</li>
																		),
																  )
																: null}
														</ul>
													</Tab>
												</Tabs>
											</div>
										</div>
									</div>
									<div className='section'>
										<div className='mid-heading'>
											<h2>Related Products</h2>
										</div>
										<ECarousel>
											{productDetail['productsLike'].map(
												item => (
													<div
														className='item'
														key={item}
													>
														<div className='product-box'>
															<figure>
																<a
																	href={
																		'/product/' +
																		item.slug
																	}
																>
																	<NextImage
																		width={
																			400
																		}
																		height={
																			400
																		}
																		src={
																			item
																				.product_image[0]
																				?.image_link
																		}
																		alt
																	/>
																</a>
															</figure>
															<h4>
																{item.title}
															</h4>
															{item.short_description &&
																item.short_description !==
																	'' && (
																	<p
																		dangerouslySetInnerHTML={{
																			__html: item.short_description,
																		}}
																	></p>
																)}
															<span className='price'>
																$
																{item.discounted_price ??
																	item.price}
															</span>
														</div>
													</div>
												),
											)}
										</ECarousel>
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

export default ProductDetail;
