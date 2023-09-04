import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import moment from 'moment';
import AccountSidebar from '@components/Common/Account/AccountSidebar';
import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';
import {api} from '@utils/api';
import {useRouter} from 'next/router';

const ManageReturns = () => {
	const [returnOrders, setReturnOrders] = useState({
		list: [],
		loading: false,
	});
	const [page, setPage] = useState(null);
	const [pageLink, setPageLink] = useState();
	const [currentPage, setCurrentPage] = useState(1);

	const router = useRouter();

	const setRouterPage = async page => {
		router.replace({
			query: {...router.query, page: page},
		});
	};

	const getReturnOrderList = async page => {
		try {
			setReturnOrders(prev => ({...prev, loading: true}));
			const response = await api({
				url: `/vendor/return-order/list?page=` + page,
				method: 'GET',
			});
			if (response.data) {
				console.log('return', response.data);
				setReturnOrders(() => ({
					list: response.data.returnRequests.data,
					loading: false,
				}));
				setPageLink(response.data.returnRequests.links);
				setCurrentPage(response.data.returnRequests.current_page);
			}
		} catch (error) {
			setReturnOrders(prev => ({...prev, loading: false}));
			// eslint-disable-next-line no-console
			console.log(error);
		}
	};

	useEffect(() => {
		if (page) {
			getReturnOrderList(page);
			setRouterPage(page);
		}
	}, [page]);

	useEffect(() => {
		setPage(router?.query?.page ?? 1);
	}, [router?.query?.page]);

	return (
		<>
			<SpinnerLoader loading={returnOrders.loading} />
			<section className='cms-page'>
				<div className='container'>
					<div className='dashborad-panel'>
						<AccountSidebar />

						<div className='dashborad-rightsider'>
							<h3>Return Request Manager</h3>
							<div className='row'>
								<div className='col-md-12'>
									<div className='table-responsive'>
										<table className='table table-custom'>
											<thead>
												<tr>
													<th scope='col'>S.NO</th>
													<th scope='col'>
														Order Date
													</th>
													<th scope='col'>
														Order Id
													</th>
													<th scope='col'>User</th>
													<th scope='col'>
														Return Status
													</th>
													<th scope='col'>
														Pay Method
													</th>
													<th scope='col'>
														Created At
													</th>
													<th scope='col'>
														Updated At
													</th>
													<th scope='col'>Action</th>
												</tr>
											</thead>

											<tbody>
												{returnOrders.list.length >
												0 ? (
													returnOrders.list &&
													returnOrders.list.map(
														(value, index) => (
															<tr key={index}>
																<th scope='row'>
																	{/* {index + 1} */}
																	{index +
																		1 +
																		10 *
																			(currentPage -
																				1)}
																</th>
																<td className='text-nowrap'>
																	{moment(
																		value.created_at,
																	).format(
																		'DD-MM-YYYY',
																	)}
																</td>
																<td>
																	{
																		value
																			?.order
																			?.order_id
																	}
																</td>
																<td>{`${value.order.firstname} ${value.order.lastname}`}</td>
																<td>
																	{
																		value
																			.return_items[0]
																			.return_status
																	}
																</td>
																<td>
																	<span className='badge badge-info'>
																		{
																			value
																				?.order
																				?.payment_method
																		}
																	</span>
																</td>
																<td className='text-nowrap'>
																	{moment(
																		value.created_at,
																	).format(
																		'DD-MM-YYYY,h:mm a',
																	)}
																</td>
																<td className='text-nowrap'>
																	{moment(
																		value.updated_at,
																	).format(
																		'DD-MM-YYYY,h:mm a',
																	)}
																</td>
																<td className='text-nowrap'>
																	<Link
																		href={`/vendor/editreturnorder/${value.id}`}
																	>
																		<button className='btn btn-warning'>
																			<i className='fa fa-fw fa-eye'></i>
																		</button>
																	</Link>
																</td>
															</tr>
														),
													)
												) : (
													<tr>
														<td
															colSpan='7'
															align='center'
														>
															<strong>
																Returns Not
																Available.
															</strong>
														</td>
													</tr>
												)}
											</tbody>
										</table>
										<ul className='pagination justify-content-center'>
											{returnOrders.list.length >= 10
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

export default ManageReturns;
