import React, {useEffect, useCallback} from 'react';
import Pagination from 'react-responsive-pagination';
import {useRouter} from 'next/router';

import AccountSidebar from '@components/Common/Account/AccountSidebar';
import Loading from '@components/Common/Loading';
import {api} from '@utils/api';
import {useContextState} from '@context/reducer';
// import { toast } from 'react-toastify';

const MyReviews = () => {
	const {state, dispatch} = useContextState({
		reviewLoading: true,
		reviewList: [],
	});

	const router = useRouter();

	const fetchReviews = useCallback(async () => {
		const payload = {};
		if (router?.query?.page) {
			payload['page'] = parseInt(router?.query?.page);
		}

		dispatch({
			type: 'SET_DATA',
			data: {
				...state,
				reviewLoading: true,
			},
		});

		const response = await api({
			url: '/review',
			method: 'POST',
			data: payload,
		});

		if (response.status) {
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					reviewList: response.data.data,
					reviewLoading: false,
					totalProduct: response.data.total,
					TotalPage: response.data.last_page,
				},
			});
		} else if (response.code === 400) {
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					reviewLoading: false,
				},
			});
			//toast.warning(response.message);
		}
	}, []);

	useEffect(() => {
		fetchReviews();
	}, [fetchReviews]);

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
		// router.push()
	};

	if (state?.reviewLoading) return <Loading />;
	return (
		<>
			<div className='cms-page innerblock-padd'>
				<div className='container'>
					<div className='dashborad-panel'>
						<div className='col-md-3'>
							<AccountSidebar />
						</div>
						<div className='dashborad-rightsider  col-md-9 dashright-bx'>
							<h1 className='dash-head'>My Reviews Lists</h1>
							<div className='row'>
								{state?.reviewList?.length > 0 ? (
									<>
										<div className='col-md-12' key='65'>
											<div className='row p-2'>
												<div className='col-md-3'>
													<strong>Order ID</strong>
												</div>
												<div className='col-md-3'>
													<strong>
														Product Name
													</strong>
												</div>
												<div className='col-md-6'>
													<strong>Comment</strong>
												</div>
											</div>
										</div>
										{state.reviewList.map(
											(items, index) => (
												<div
													className='col-md-12'
													key={index}
												>
													<div className='row p-2'>
														<div className='col-md-3'>
															{
																items?.order
																	?.order_id
															}
														</div>
														<div className='col-md-3'>
															{items?.product
																? items?.product
																		.title
																: 'N/A'}
														</div>
														<div className='col-md-6'>
															{items?.comment
																? items?.comment
																: 'N/A'}
														</div>
													</div>
												</div>
											),
										)}
									</>
								) : (
									<div
										className='right-panel review-list'
										id='product_listing'
									>
										<div
											className='row'
											style={{
												display: 'flex',
												flexWrap: 'wrap',
												marginRight: '-15px',
												marginLeft: '-15px',
											}}
										>
											<div className='col-md-12 text-center'>
												<div
													role='alert'
													className='fade text-danger p-5 alert alert-danger show'
												>
													<div className='text-danger alert-heading h4'>
														Sorry, No Reviews found
													</div>
												</div>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<br />
			{state?.reviewList?.length > 0 ? (
				<Pagination
					maxWidth={30}
					current={state?.currentPage || 1}
					total={state.TotalPage}
					onPageChange={handlePageChange}
				/>
			) : null}
		</>
	);
};

export default MyReviews;
