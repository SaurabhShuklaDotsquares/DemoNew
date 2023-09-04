import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import AccountSidebar from '@components/Common/Account/AccountSidebar';
import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';
import {api} from '@utils/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {useRouter} from 'next/router';

const ManageOrders = () => {
	const [orderList, setOrderList] = useState([]);
	const [orderData, setOrderData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [searchDate, setSearchDate] = useState('');
	const [page, setPage] = useState(null);
	const [pageLink, setPageLink] = useState();
	const [currentPage, setCurrentPage] = useState(1);

	const handleReset = e => {
		e.preventDefault();
		setSearchDate('');
		setOrderList(orderData);
	};

	const router = useRouter();

	const setRouterPage = async page => {
		router.replace({
			query: {...router.query, page: page},
		});
	};

	const getOrderList = async page => {
		try {
			setLoading(true);
			const response = await api({
				url: `/vendor/order/list?page=` + page,
				method: 'GET',
			});
			if (response.data) {
				console.log('page', response.data);
				setLoading(false);
				setCurrentPage(response.data.orderitems.current_page);
				setOrderList(response.data.orderitems.data);
				setOrderData(response.data.orderitems.data);
				setPageLink(response.data.orderitems.links);
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await api({
				url: `/vendor/order/list?created_at=${searchDate}`,
				method: 'GET',
			});
			if (response.data) {
				setLoading(false);
				setOrderList(response.data.orderitems.data);
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	const handleChange = event => {
		setSearchDate(moment(event).format('YYYY-MM-DD'));
	};

	useEffect(() => {
		if (page) {
			getOrderList(page);
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
									<div className='col-md-4'>
										<h2 className='pb-3 mt-lg-3'>
											MANAGE ORDERS
										</h2>
									</div>
									<div className='col-md-4'>
										<DatePicker
											className='form-control'
											name='searchDate'
											dateFormat='dd-MM-yyyy'
											todayButton='TODAY'
											onChange={handleChange}
											value={searchDate}
											placeholderText='Search Order By Date:'
										/>
									</div>
									<div className=' col-md-4 mt-md-2 mt-3 form-group d-flex justify-content-md-end'>
										<button
											className='btn btn-success mr-3'
											title='Filter'
											type='submit'
											onClick={e => handleSubmit(e)}
										>
											<i className='fa fa-filter'></i>{' '}
											Filter
										</button>
										<button
											className='btn btn-warning ml-2'
											title='Reset'
											type='submit'
											onClick={e => handleReset(e)}
										>
											<i className='fa  fa-refresh'></i>{' '}
											Reset
										</button>
									</div>
								</div>
							</div>
							<div className='row mt-4'>
								<div className='col-md-12'>
									<div className='table-responsive'>
										<table className='table manage-product-tbl'>
											<thead>
												<tr>
													<th scope='col'>S.NO</th>
													<th scope='col'>
														Order Date
													</th>
													<th scope='col'>
														Order Id
													</th>
													<th scope='col'>
														Total Price
													</th>
													<th scope='col'>
														Order Status
													</th>
													<th scope='col'>Action</th>
												</tr>
											</thead>
											<tbody>
												{orderList?.length > 0 ? (
													orderList?.length > 0 &&
													orderList?.map(
														(value, index) => {
															return (
																<tr key={index}>
																	<th scope='row'>
																		{index +
																			1 +
																			10 *
																				(currentPage -
																					1)}
																	</th>
																	<td className='text-nowrap'>
																		{value.created_at.slice(
																			0,
																			10,
																		)}
																	</td>
																	<td>
																		{
																			value.order_id
																		}
																	</td>
																	<td className='text-nowrap'>
																		{
																			value.display_amount
																		}
																	</td>
																	<td>
																		{
																			value.display_status
																		}
																	</td>
																	<td>
																		<Link
																			href={`/vendor/editorder/${value.id}`}
																		>
																			<button className='btn btn-warning'>
																				<i className='fa fa-fw fa-eye'></i>
																			</button>
																		</Link>
																	</td>
																</tr>
															);
														},
													)
												) : (
													<tr>
														<td
															colSpan='7'
															align='center'
														>
															<strong>
																Orders Not
																Available.
															</strong>
														</td>
													</tr>
												)}
											</tbody>
										</table>
										<ul className='pagination justify-content-center'>
											{orderList?.length > 0
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

export default ManageOrders;
