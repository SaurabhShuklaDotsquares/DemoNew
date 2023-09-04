import React, {useState, useEffect} from 'react';
import AccountSidebar from '@components/Common/Account/AccountSidebar';
import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';
import {api} from '@utils/api';
import {useRouter} from 'next/router';

const ManageCommission = () => {
	const [commissionList, setCommissionList] = useState([]);
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

	const getCommissionList = async () => {
		try {
			setLoading(true);
			const response = await api({
				url: `/category-list/commission?page=` + page,
				method: 'GET',
			});
			if (response.data) {
				console.log('commission', response?.data);
				setLoading(false);
				setCommissionList(response.data);
				setCurrentPage(response.data.current_page);
				setPageLink(response.data.links);
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	useEffect(() => {
		if (page) {
			getCommissionList(page);
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
											MANAGE COMMISSION
										</h2>
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
													<th scope='col'>Title</th>
													<th scope='col'>
														Commission
													</th>
													<th scope='col'>Status</th>
													<th scope='col'>Created</th>
												</tr>
											</thead>
											<tbody>
												{commissionList?.data?.length >
												0 ? (
													commissionList?.data
														?.length > 0 &&
													commissionList?.data?.map(
														(value, index) => {
															console.log(
																'value',
																value,
															);
															return (
																<tr key={index}>
																	<th scope='row'>
																		{index +
																			1 +
																			10 *
																				(currentPage -
																					1)}
																	</th>
																	<td>
																		{
																			value.title
																		}
																	</td>
																	<td>
																		{
																			value.admin_commission
																		}
																	</td>
																	<td>
																		{value.status ===
																		1
																			? 'Active'
																			: 'In-Active'}
																	</td>
																	<td>
																		{value.created_at
																			.slice(
																				0,
																				10,
																			)
																			.split(
																				'-',
																			)
																			.reverse()
																			.join(
																				'-',
																			)}
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
																Commission Not
																Available.
															</strong>
														</td>
													</tr>
												)}
											</tbody>
										</table>
										<ul className='pagination justify-content-center'>
											{commissionList?.data?.length > 0
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

export default ManageCommission;
