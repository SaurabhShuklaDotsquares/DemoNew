/* eslint-disable @next/next/link-passhref */
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import moment from 'moment';

import AccountSidebar from '@components/Common/Account/AccountSidebar';
import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';
import {api} from '@utils/api';

const SubscriptionHistory = () => {
	const [historyList, setHistoryList] = useState([]);
	const [loading, setLoading] = useState(false);

	const getSubscriptionHistory = async () => {
		try {
			setLoading(true);
			const response = await api({
				url: '/plan/history',
				method: 'GET',
			});
			if (response?.data) {
				setLoading(false);
				// console.log('data', response.data);
				setHistoryList(response?.data);
			}
		} catch (error) {
			setLoading(false);
			// eslint-disable-next-line no-console
			console.log(error);
		}
	};

	useEffect(() => {
		getSubscriptionHistory();
	}, []);

	return (
		<>
			<SpinnerLoader loading={loading} />
			<section>
				<div className='container'>
					<div className='row'>
						<div className='col-md-3'>
							<AccountSidebar />
						</div>
						<div
							className='col-md-9'
							style={{
								boxShadow:
									'1px 1px 42px 1px rgb(189 189 189 / 20%)',
							}}
						>
							<div className='container mt-4'>
								<div className='row'>
									<div className='col-md-12'>
										<span>Subscription History</span>
									</div>
								</div>
							</div>
							<div className='row mt-4'>
								<div className='col-md-12'>
									<table className='table'>
										<thead>
											<tr>
												<th scope='col'>S.NO</th>
												<th scope='col'>
													<span className='text-primary'>
														Subscription Id
														<i className='fa fa-sort text-dark ml-1'></i>
													</span>
												</th>
												<th scope='col'>
													<span className='text-primary'>
														Subscription Plan
														<i className='fa fa-sort text-dark ml-1'></i>
													</span>
												</th>
												<th scope='col'>
													<span className='text-primary'>
														Start Date
														<i className='fa fa-sort text-dark ml-1'></i>
													</span>
												</th>
												<th scope='col'>
													<span className='text-primary'>
														End Date
														<i className='fa fa-sort text-dark ml-1'></i>
													</span>
												</th>
												<th scope='col'>Action</th>
											</tr>
										</thead>

										<tbody>
											{historyList &&
												historyList.map(
													(value, index) => (
														<tr key={index}>
															<th scope='row'>
																{index + 1}
															</th>
															<td>
																{
																	value.subscription_id
																}
															</td>
															<td>
																{
																	value.plan
																		.title
																}
															</td>
															<td>
																{moment(
																	value.start_date,
																).format('L')}
															</td>
															<td>
																{moment(
																	value.end_date,
																).format('L')}
															</td>
															<td>
																<Link
																	href={`/vendor/subscription_history_detail/${value.id}`}
																>
																	<button className='btn btn-warning'>
																		<i className='fa fa-fw fa-eye'></i>
																	</button>
																</Link>
															</td>
														</tr>
													),
												)}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default SubscriptionHistory;
