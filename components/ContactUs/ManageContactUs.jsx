/* eslint-disable @next/next/link-passhref */
import React, {useState} from 'react';
import Link from 'next/link';
import AccountSidebar from '@components/Common/Account/AccountSidebar';
import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';

const ManageContactUs = () => {
	const [productList] = useState([]);
	const [loading] = useState(false);

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
									<div className='col-md-9'>
										<span style={{fontSize: '1.5rem'}}>
											CONTACTS US
										</span>
									</div>
									<div className='col-md-3'>
										<Link
											href='/contact-us'
											className='btn'
											style={{
												background: '#ea3a3c',
												color: '#fff',
												border: 'none',
												fontSize: '1.25rem',
											}}
										>
											ADD CONTACTS
										</Link>
									</div>
								</div>
								<div className='row mt-4'>
									<div className='col-md-12'>
										<table className='table'>
											<thead>
												<tr>
													<th scope='col'>S.NO</th>
													<th scope='col'>Title</th>
													<th scope='col'>
														Category
													</th>
													<th scope='col'>Price</th>
													<th scope='col'>Status</th>
													<th scope='col'>Created</th>
													<th scope='col'>Action</th>
												</tr>
											</thead>
											<tbody>
												{productList.length > 0 &&
													productList.map(
														(list, index) => (
															console.log(
																'Contact :',
																list,
															),
															(
																<tr key={index}>
																	<th scope='row'>
																		{index +
																			1}
																	</th>
																	<td>
																		{
																			list.title
																		}
																	</td>
																	<td>
																		{
																			list
																				.category_data
																				.title
																		}
																	</td>
																	<td>
																		${' '}
																		{
																			list.price
																		}
																	</td>
																	<td>
																		{list.status ===
																		'1'
																			? 'Active'
																			: 'In - Active'}
																	</td>
																	<td>
																		{
																			list.created_at
																		}
																	</td>
																	<td>
																		<Link
																			href={`/vendor/editproduct/${list.id}`}
																		>
																			<button className='btn btn-primary'>
																				<i className='fa fa-edit'></i>
																			</button>
																		</Link>
																	</td>
																</tr>
															)
														),
													)}
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

export default ManageContactUs;
