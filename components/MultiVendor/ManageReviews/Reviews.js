import React, {useState, useEffect} from 'react';
import RatingStar from '@components/Common/RatingStar/RatingStar';
import AccountSidebar from '@components/Common/Account/AccountSidebar';
import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';
import {api} from '@utils/api';
import Link from 'next/link';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';

const Reviews = () => {
	const [reviewList, setReviewList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(null);
	const [pageLink, setPageLink] = useState();
	const [currentPage, setCurrentPage] = useState(1);

	const router = useRouter();

	const setRouterPage = async page => {
		router.replace({
			query: {...router.query, page: page},
		});
	};

	const getReviewList = async () => {
		try {
			setLoading(true);
			const response = await api({
				url: `/vendor/get-all-review?page=` + page,
				method: 'POST',
			});
			if (response?.data) {
				setLoading(false);
				setReviewList(response?.data);
				setCurrentPage(response?.data?.current_page);
				setPageLink(response?.data?.links);
			}
		} catch (error) {
			setLoading(false);
			// eslint-disable-next-line no-console
			console.log(error);
		}
	};

	const handleChange = async (id, status) => {
		let formData = new FormData();
		formData.append('id', id);
		formData.append('status', status === 'Pending' ? 2 : 1);

		try {
			const response = await api({
				url: '/vendor/review-status',
				method: 'POST',
				data: formData,
			});
			if (response?.data) {
				toast.success(response.message);
				getReviewList();
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(error);
		}
	};

	useEffect(() => {
		if (page) {
			getReviewList(page);
			setRouterPage(page);
		}
	}, [page]);

	useEffect(() => {
		setPage(router?.query?.page ?? 1);
	}, [router?.query?.page]);

	return (
		<>
			<SpinnerLoader loading={loading} />
			<section className='cms-page'>
				<div className='container'>
					<div className='dashborad-panel'>
						<AccountSidebar />

						<div className='dashborad-rightsider'>
							<div>
								<div className='row'>
									<div className='col-md-12'>
										<h3>Manage Review</h3>
									</div>
								</div>
							</div>
							<div className='row'>
								<div className='col-md-12'>
									<div className='table-responsive'>
										<table
											id='demo-foo-addrow'
											className='table m-t-30 no-wrap table-hover contact-list manage-product-tbl'
											data-page-size='10'
										>
											<thead>
												<tr>
													<th>S.NO</th>
													<th scope='col'>User</th>
													<th
														className='pro-name-col'
														scope='col'
													>
														Product
													</th>
													<th scope='col'>Rating</th>
													<th scope='col'>
														Posted On
													</th>
													<th scope='col'>Status</th>
													<th
														scope='col'
														className='actions'
														width='15%'
													>
														<span className='ml-3'>
															Action
														</span>
													</th>
												</tr>
											</thead>
											<tbody>
												{reviewList?.data?.length >
												0 ? (
													reviewList?.data
														?.sort()
														.reverse()
														.map((list, index) => (
															<tr key={index}>
																<th scope='row'>
																	{index +
																		1 +
																		10 *
																			(currentPage -
																				1)}
																</th>
																<td>
																	{list?.user
																		?.firstname +
																		' ' +
																		list
																			?.user
																			?.lastname}
																</td>
																<td>
																	{
																		list
																			?.product
																			?.title
																	}
																</td>
																<td className='text-nowrap'>
																	<RatingStar
																		stars={
																			list?.rating
																		}
																	/>
																</td>
																<td className='text-nowrap'>
																	{
																		list.created_at
																	}
																</td>
																<td>
																	{
																		list?.status
																	}
																</td>

																<td className='text-nowrap'>
																	{list?.status ===
																	'Pending' ? (
																		<button
																			className='btn btn'
																			style={{
																				background:
																					'#ea3a3c',
																				color: '#fff',
																				border: 'none',
																				fontSize:
																					'1rem',
																			}}
																			onClick={() =>
																				handleChange(
																					list.id,
																					list?.status,
																				)
																			}
																		>
																			<span>
																				Approve
																			</span>
																		</button>
																	) : (
																		<button
																			className='btn btn'
																			style={{
																				background:
																					'#28A745',
																				color: '#fff',
																				border: 'none',
																				fontSize:
																					'0.9rem',
																			}}
																			disabled
																		>
																			<span>
																				Approved
																			</span>
																		</button>
																	)}
																	<Link
																		href={`/vendor/review/${list.id}`}
																	>
																		<button className='btn btn-warning ml-2'>
																			<i className='fa fa-fw fa-eye'></i>
																		</button>
																	</Link>
																</td>
															</tr>
														))
												) : (
													<tr>
														<td
															colSpan='7'
															align='center'
														>
															<strong>
																Review Not
																Available.
															</strong>
														</td>
													</tr>
												)}
											</tbody>
										</table>
										<ul className='pagination justify-content-center'>
											{reviewList?.data?.length >= 10
												? pageLink?.map(
														(item, index) => (
															<li
																key={index}
																className={
																	'page-item' +
																	(item.url
																		? ''
																		: ' disabled') +
																	(item.active
																		? ' active'
																		: '')
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
														),
												  )
												: ''}
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Reviews;
