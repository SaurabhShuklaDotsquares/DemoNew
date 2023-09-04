import React, {useState, useEffect} from 'react';
import moment from 'moment';

import AccountSidebar from '@components/Common/Account/AccountSidebar';
import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';
import {api} from '@utils/api';

const History_Detail = props => {
	const [history_detail, setHistory_Detail] = useState();
	const [loading, setLoading] = useState(false);

	// console.log('history_detail', history_detail);

	const getSubscription_Detail = async () => {
		try {
			setLoading(true);
			const response = await api({
				url: `/plan/history/${props.data.slug}`,
				method: 'GET',
			});
			if (response?.data) {
				setLoading(false);
				// console.log('data', response.data);
				setHistory_Detail(response?.data[0]);
			}
		} catch (error) {
			setLoading(false);
			// eslint-disable-next-line no-console
			console.log(error);
		}
	};

	useEffect(() => {
		getSubscription_Detail();
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
										<h3 style={{fontWeight: '700'}}>
											SUBSCRIPTION DETAIL
										</h3>
									</div>
								</div>

								<div className='row mt-3'>
									<div className='col-md-12'>
										<h3 style={{fontWeight: '700'}}>
											History and Subscription Information
										</h3>
									</div>
									<div className='col-md-6'>
										<h5>
											<b>
												Title :{' '}
												{history_detail?.plan?.title}{' '}
												Subscription{' '}
											</b>
										</h5>
										<table className='table table-hover table-striped'>
											<tbody>
												<tr>
													<th scope='row'>
														Start Date
													</th>
													<td>
														{moment(
															history_detail?.start_date,
														).format('L')}
													</td>
												</tr>
												<tr>
													<th scope='row'>
														End Date
													</th>
													<td>
														{moment(
															history_detail?.end_date,
														).format('L')}
													</td>
												</tr>
												<tr>
													<th scope='row'>
														Subscription Status
													</th>

													<td>
														{history_detail?.status ===
														1
															? 'Active'
															: 'In - Active'}
													</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div className='col-lg-6 '>
										<h5>
											<b>Account Information</b>
										</h5>
										<table className='table table-hover table-striped'>
											<tbody>
												<tr>
													<th scope='row'>
														Subscription Id
													</th>
													<td>
														{
															history_detail?.subscription_id
														}
													</td>
												</tr>
												<tr>
													<th scope='row'>
														Transaction Id
													</th>
													<td>
														{
															history_detail?.transaction_id
														}
													</td>
												</tr>
											</tbody>
										</table>
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

export default History_Detail;
