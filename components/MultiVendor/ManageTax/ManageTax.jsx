import React, {useState, useEffect} from 'react';
import AccountSidebar from '@components/Common/Account/AccountSidebar';
import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';
import {api} from '@utils/api';

const ManageTax = () => {
	const [taxList, setTaxList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [pageLink, setPageLink] = useState();
	const [page, setPage] = useState(1);

	const getTaxList = async page => {
		try {
			setLoading(true);
			const response = await api({
				url: `/tax?page=` + page,
				method: 'GET',
			});
			if (response.data) {
				setLoading(false);
				setTaxList(response.data.data);
				setPageLink(response.data.links);
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	useEffect(() => {
		getTaxList(page);
	}, [page]);

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
											MANAGE TAX
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
														Category
													</th>
													<th scope='col'>
														Value in %
													</th>
													<th scope='col'>Status</th>
													<th scope='col'>Created</th>
												</tr>
											</thead>
											<tbody>
												{taxList.length > 0 ? (
													taxList.length > 0 &&
													taxList.map(
														(value, index) => {
															return (
																<tr key={index}>
																	<th scope='row'>
																		{index +
																			1}
																	</th>
																	<td>
																		{
																			value.title
																		}
																	</td>
																	<td>
																		{
																			value.category
																		}
																	</td>
																	<td>
																		{
																			value.value
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
																Tax Not
																Available.
															</strong>
														</td>
													</tr>
												)}
											</tbody>
										</table>
										<ul className='pagination justify-content-center mt-2'>
											{pageLink &&
												pageLink.map((item, index) => (
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
												))}
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

export default ManageTax;
