import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Link from 'next/link';
import cookie from 'js-cookie';
import {useRouter} from 'next/router';

import UserService from '@utils/services';
import ProfileUploader from '@components/Common/ProfileUploader/ProfileUploader';
import {useContextState} from '@context/reducer';
import {useGlobalContext} from '@context/ContextApi';
//import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';

const SideBar = () => {
	const {state, dispatch} = useContextState();
	const {state: globalState} = useGlobalContext();
	const [cookieData, setCookieData] = useState('');
	// const [isLoading, setIsLoading] = useState(false);
	const routers = useRouter();

	const getUserCookie = () => {
		if (cookie && cookie.get('userAuth')) {
			const cookies = JSON.parse(cookie.get('userAuth'));
			setCookieData(cookies ? cookies : {});
			// return JSON.parse(cookie.get('userAuth'));
		}
		// else return {};
	};

	useEffect(() => {
		getUserCookie();
	}, []);

	//let cookiedata = getUserCookie('userAuth');

	const getResults = useCallback(async () => {
		try {
			let result = null;
			if (cookieData.role === 2) {
				result = await UserService.getVendorProfileDetail();
			} else {
				result = await UserService.getProfileDetail();
			}

			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					profileDetails: result.data.data,
				},
			});
		} catch (e) {
			console.log({e});
		}
	}, []);

	useEffect(() => {
		getResults();
	}, [getResults]);

	const handleLogout = () => {
		sessionStorage.removeItem('userAuth');
		cookie.remove('userAuth');
		cookie.remove('token');
		let guesttoken = cookie.get('tokenguest');
		cookie.set('tokenguest', guesttoken);
		if (cookieData.userType === 'vendor' && typeof window !== 'undefined') {
			window.location.replace('/vendor/login');
		} else {
			window.location.replace('/login');
		}
		// router.reload();
	};

	const image_url = useMemo(
		() =>
			globalState?.userAuth?.data?.profile_pic ??
			globalState?.userAuth?.profile_pic ??
			'/assets/images/placeholder.png',
		[globalState?.userAuth],
	);

	// console.log(image_url);

	return (
		<>
			{/* <SpinnerLoader loading={isLoading} /> */}
			{cookieData.userType === 'vendor' ? (
				<>
					<div className='dashborad-leftsider'>
						<ProfileUploader
							profileDetails={state.profileDetails}
							image_url={image_url}
						/>

						<ul>
							<li>
								<Link
									href='/vendor/dashboard'
									className={
										routers.asPath.split('?')[0] ===
										'/vendor/dashboard'
											? 'active'
											: null
									}
								>
									Dashboard
								</Link>
							</li>
							<li>
								<Link
									href='/vendor/account'
									className={
										routers.asPath.split('?')[0] ===
										'/vendor/account'
											? 'active'
											: null
									}
								>
									My Account
								</Link>
							</li>
							<li>
								<Link
									href='/vendor/manageproducts'
									className={
										routers.asPath.split('?')[0] ===
										'/vendor/manageproducts'
											? 'active'
											: null
									}
								>
									Manage Product
								</Link>
							</li>
							<li>
								<Link
									href='/vendor/manageorders'
									className={
										routers.asPath.split('?')[0] ===
										'/vendor/manageorders'
											? 'active'
											: null
									}
								>
									Manage Order
								</Link>
							</li>
							<li>
								<Link
									href='/vendor/reviews'
									className={
										routers.asPath.split('?')[0] ===
										'/vendor/reviews'
											? 'active'
											: null
									}
								>
									Manage Review
								</Link>
							</li>

							<li>
								<Link
									href='/vendor/managereturns'
									className={
										routers.asPath.split('?')[0] ===
										'/vendor/managereturns'
											? 'active'
											: null
									}
								>
									Manage Return
								</Link>
							</li>
							<li>
								<Link
									href='/vendor/reportmanager'
									className={
										routers.asPath.split('?')[0] ===
										'/vendor/reportmanager'
											? 'active'
											: null
									}
								>
									Manage Report
								</Link>
							</li>
							<li>
								<Link
									href='/vendor/managecommission'
									className={
										routers.asPath.split('?')[0] ===
										'/vendor/managecommission'
											? 'active'
											: null
									}
								>
									Manage Commission
								</Link>
							</li>
							{/* <li>
								<Link
									href='/vendor/managetax'
									className={
										routers.asPath.split('?')[0] === '/vendor/managetax'
											? 'active'
											: null
									}
								>
									Manage Tax
								</Link>
							</li> */}
							{/* <li>
								<Link
									href='/my_reviews'
									className={
										routers.asPath.split('?')[0] === '/my_reviews'
											? 'active'
											: null
									}
								>
									My Review
								</Link>
							</li> */}

							<li>
								<span onClick={handleLogout}>Logout</span>
							</li>
						</ul>
					</div>
				</>
			) : (
				<>
					<div className='dashborad-leftsider'>
						<ProfileUploader
							profileDetails={state.profileDetails}
							image_url={image_url}
						/>
						<ul>
							<li>
								<Link
									href='/dashboard'
									className={
										routers.asPath.split('?')[0] ===
										'/dashboard'
											? 'active'
											: null
									}
								>
									Dashboard
								</Link>
							</li>
							<li>
								<Link
									href='/account'
									className={
										routers.asPath.split('?')[0] ===
										'/account'
											? 'active'
											: null
									}
								>
									My Account
								</Link>
							</li>
							<li>
								<Link
									href='/address-book'
									className={
										routers.asPath.split('?')[0] ===
										'/address-book'
											? 'active'
											: null
									}
								>
									Address Book
								</Link>
							</li>
							<li>
								<Link
									href='/orders'
									className={
										routers.asPath.split('?')[0] ===
										'/orders'
											? 'active'
											: null
									}
								>
									My order
								</Link>
							</li>
							<li>
								<Link
									href='/changePassword'
									className={
										routers.asPath.split('?')[0] ===
										'/changePassword'
											? 'active'
											: null
									}
								>
									Change Password
								</Link>
							</li>
							<li>
								<Link
									href='/my-reviews'
									className={
										routers.asPath.split('?')[0] ===
										'/my-reviews'
											? 'active'
											: null
									}
								>
									My Review
								</Link>
							</li>
							{/* <li>
						{cookiedata.userType === 'vendor' ? (
							<Link
								href='/vendor/subscription'
								className={
									routers.asPath.split('?')[0] === '/subscription'
										? 'active'
										: null
								}
							>
								Subscription
							</Link>
						) : (
							''
						)}
					</li> */}
							<li>
								<span onClick={handleLogout}>Logout</span>
							</li>
						</ul>
					</div>
				</>
			)}
		</>
	);
};

export default SideBar;
