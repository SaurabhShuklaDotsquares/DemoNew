import React, {
	useCallback,
	useEffect,
	Fragment,
	useMemo,
	memo,
	useRef,
	useState,
} from 'react';
import Link from 'next/link';
import Router from 'next/router';
import cookie from 'js-cookie';
import {toast} from 'react-toastify';
import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';
import Image from '@components/Common/Image';
import {useGlobalContext} from '@context/ContextApi';
import {useCommonState} from '../reducer';
import NavbarItem from './NavbarItem';
import Form from 'react-bootstrap/Form';

const Header = props => {
	const {state, dispatch} = useCommonState();
	const {
		state: globalState,
		isAuthenticated,
		configData,
	} = useGlobalContext();
	const [currencyValue, setCurrencyValue] = React.useState(1);
	const [headerHeight, setHeaderHeight] = React.useState(0);
	const [loading, setLoading] = useState(false);

	const headerRef = useRef();

	const [isShowSearch, setIsShowSearch] = useState(false);

	const clickOnSearchButton = () => {
		if (isShowSearch) {
			setIsShowSearch(false);
		} else {
			setIsShowSearch(true);
		}
	};

	const onResize = useCallback(() => {
		if (headerRef.current) setHeaderHeight(headerRef.current.clientHeight);
	}, []);

	useEffect(() => {
		window.addEventListener('resize', onResize);
		onResize();
		return () => {
			window.removeEventListener('resize', onResize);
		};
	});

	// const getUserCookie = () => {
	// 	if (cookie && cookie.get('userAuth')) {
	// 		return JSON.parse(cookie.get('userAuth'));
	// 	} else return {};
	// };

	// let cookiedata = getUserCookie('userAuth');
	// eslint-disable-next-line no-unused-vars
	const getResults = useCallback(async () => {
		try {
			const resultCategorylist = props.categories;

			// setCategories(resultCategorylist.data.data);
			const items = [];

			for (let i = 0; i < resultCategorylist.length; i++) {
				const item = resultCategorylist[i];

				items.push(
					<option value={item.slug} className='my-select'>
						{item.title}
					</option>,
				);
				if (item.children.length) {
					for (let j = 0; j < item.children.length; j++) {
						const item1 = item.children[j];
						items.push(
							<option value={item1.slug} style={{paddingLeft: 3}}>
								{item1.title}
							</option>,
						);
					}
				}
			}

			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					resultCategorylist: resultCategorylist,
					searchCategories: items,
					currencyData: currencyValue,
				},
			});
		} catch (e) {
			console.log({e});
		}
	}, [currencyValue]);

	useEffect(() => {
		getResults();
	}, [getResults]);

	// const handleSelect = event => {
	// 	var index = event.nativeEvent.target.selectedIndex;

	// 	dispatch({
	// 		type: 'SET_DATA',
	// 		data: {
	// 			...state,
	// 			selectedCategory: event.target.value,
	// 			selectedCatName: event.nativeEvent.target[index].text,
	// 		},
	// 	});
	// };
	const handleSearch = event => {
		dispatch({
			type: 'SET_DATA',
			data: {
				...state,
				search: event.target.value,
			},
		});
	};

	const handleSubmit = async () => {
		const {pathname} = Router;
		if (pathname) {
			const url = `/products/search?category=${
				state.selectedCategory
			}&search=${state.search}&name=${state.selectedCatName ?? ''}`;
			state.search = '';
			Router.push(url);
		}
	};

	const handleKeyDown = event => {
		if (event.key === 'Enter') {
			handleSubmit();
		}
	};
	const handleEmpty = () => {
		// Router.push('/vendor/dashboard');
		dispatch({
			type: 'SET_DATA',
			data: {
				...state,
				selectedCategory: '',
			},
		});
	};

	useMemo(() => {
		if (isAuthenticated && cookie.get('userAuth')) {
			return JSON.parse(cookie.get('userAuth'));
		}
	}, [isAuthenticated, cookie.get('userAuth')]);

	const selectedCurrency = () => cookie.get('currencyValue') ?? 1;

	function SelectBasicExample() {
		return (
			<Form.Select
				value={selectedCurrency()}
				className={'form-control mr-2'}
				aria-label='Default select example'
				style={{height: '50%', marginRight: 20, outline: 'none'}}
				onChange={({target}) => {
					{
						setLoading(true);
						setCurrencyValue(target.value);
						cookie.set('currencyValue', target.value);
						Router.reload();
					}
				}}
			>
				{configData?.currency?.map((item, index) => {
					return (
						<option key={index} value={item?.id}>
							{item?.currency?.iso} (
							{item?.currency?.symbol_native})
						</option>
					);
				})}
			</Form.Select>
		);
	}

	return (
		<>
			<SpinnerLoader loading={loading} />
			<div
				className='header-gap'
				style={{height: parseInt(headerHeight) + 0 + 'px'}}
			></div>
			<header className='header' ref={headerRef}>
				{globalState?.userAuth?.role === 2 ? (
					''
				) : (
					<>
						<div className='top-header'>
							<div className='container'>
								<div className='row align-items-center'>
									<div className='col-lg-7'>
										<div className='top-welcome'>
											Welcome to ecommerce, let's
											subscribe our newsletter to GET
											special promotion 50% OFF all items
										</div>
									</div>
									<div className='col-lg-5'>
										<div className='top-head-col'>
											<div className='hotline'>
												<i className='fas fa-phone-alt' />
												<p>Helpline (+123)4 567 890</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
				<div className='container relative'>
					<div className='d-flex flex-wrap'>
						<div className='d-flex flex-wrap mr-auto align-items-center'>
							<>
								{globalState?.userAuth?.role === 2 ? (
									<Link
										href='/vendor/dashboard'
										className='logo d-flex align-items-center'
										onClick={handleEmpty}
									>
										<>
											<Image
												src='/assets/images/logo.png'
												alt='av'
											/>
											{globalState?.userAuth?.role ===
											2 ? (
												<span className='text'>
													DS E-Commerce
												</span>
											) : (
												''
											)}
										</>
									</Link>
								) : (
									<Link
										href='/'
										className='logo d-flex align-items-center'
										onClick={handleEmpty}
									>
										<>
											<Image
												src='/assets/images/logo.png'
												alt='av'
											/>
											{/* {globalState?.userAuth?.role === 2 ? (
										<span className='text'>DS E-Commerce</span>
									) : (
										''
									)} */}
										</>
									</Link>
								)}
							</>
							{globalState?.userAuth?.role === 2 ? (
								''
							) : (
								<>
									<>
										<div
											className='search-btn-mobile d-lg-none'
											onClick={event =>
												clickOnSearchButton(event)
											}
										>
											<i className='fas fa-search' />
										</div>

										<div
											// className='search-field'
											className={
												isShowSearch
													? 'search-field active'
													: 'search-field'
											}
										>
											<div className='input-group'>
												<input
													type='text'
													className='form-control'
													placeholder='Search '
													value={state?.search}
													onChange={handleSearch}
													onKeyDown={handleKeyDown}
												/>
												<div className='input-group-append'>
													<button
														className='btn search-btn '
														type='button'
														onClick={handleSubmit}
													>
														<i className='fas fa-search' />
													</button>
												</div>
											</div>
										</div>
										<div className='currency-box'>
											{SelectBasicExample()}
										</div>
									</>
								</>
							)}
						</div>
						<div className='header-top-right d-flex flex-wrap ml-auto'>
							<ul className='d-flex'>
								{globalState?.userAuth?.role === 2 ? (
									''
								) : (
									<>
										<li className='d-flex align-items-center  '>
											<Link
												className='heart-icon'
												href='/cart'
											>
												<i className='fas fa-shopping-bag' />
												<span className='badge badge-danger count-wishlist'>
													{globalState?.cartCount ||
														0}
												</span>
											</Link>
										</li>
										<li className='d-flex align-items-center  '>
											{!isAuthenticated ? (
												<a
													className='heart-icon'
													onClick={() =>
														toast.info(
															'Please login to View Wishlist',
														)
													}
												>
													<i className='fa fa-heart'></i>
													<span className='badge badge-danger count-wishlist'>
														{globalState?.wishlistCount ||
															0}
													</span>
												</a>
											) : (
												<Link
													className='heart-icon'
													href='/wishlist'
												>
													<i className='fa fa-heart'></i>
													<span className='badge badge-danger count-wishlist'>
														{globalState?.wishlistCount ||
															0}
													</span>
												</Link>
											)}
										</li>
									</>
								)}
								{isAuthenticated ? (
									<li className='d-flex align-items-center'>
										{globalState?.userAuth?.role === 2 ? (
											<Link href='/vendor/dashboard'>
												<>
													<Image
														src={`${globalState?.userAuth?.profile_pic}`}
														width={50}
														height={50}
														alt='profile'
														className='user-img mr-3 profile-img'
													/>
													{globalState?.userAuth
														?.firstname
														? `${globalState?.userAuth?.firstname} ${globalState?.userAuth?.lastname}`
														: 'User'}
												</>
											</Link>
										) : (
											<Link
												className='pl-0'
												href='/dashboard'
											>
												<>
													<Image
														src={`${globalState?.userAuth?.profile_pic}`}
														width={50}
														height={50}
														alt='profile'
														className='user-img mr-3 profile-img'
													/>

													{`${
														globalState?.userAuth
															?.firstname ===
														undefined
															? ' '
															: globalState
																	?.userAuth
																	?.firstname
													} ${
														globalState?.userAuth
															?.lastname ===
														undefined
															? ' '
															: globalState
																	?.userAuth
																	?.lastname
													}`}
												</>
											</Link>
										)}
									</li>
								) : (
									<li className='d-flex align-items-center'>
										<Link href='/login'>
											<i className='fas fa-user' />
										</Link>
									</li>
								)}
							</ul>
						</div>
					</div>
				</div>

				<nav className='navbar navbar-expand-lg'>
					<div className='container'>
						<button
							className='navbar-toggler'
							type='button'
							data-bs-toggle='collapse'
							data-bs-target='#main_nav'
							aria-expanded='false'
							aria-label='Toggle navigation'
						>
							<i className='fa fa-bars' />
						</button>
						<NavbarItem state={state} />
					</div>
				</nav>
			</header>
		</>
	);
};

export default memo(Header);
