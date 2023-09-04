/* eslint-disable @next/next/link-passhref */
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import AccountSidebar from '@components/Common/Account/AccountSidebar';
import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';
import {api} from '@utils/api';

const ManageContactUsEnquiry = () => {
	const [contactUsList, setContactUsList] = useState([]);
	const [loading, setLoading] = useState(false);

	const getContactUsEnquiryList = async () => {
		try {
			setLoading(true);
			const response = await api({
				url: '/contact-us-enquiry-list',
				method: 'GET',
			});

			if (response.data) {
				setLoading(false);
				setContactUsList(response.data.length > 0 ? response.data : []);
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	useEffect(() => {
		getContactUsEnquiryList();
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
									<div className='col-md-9'>
										<span style={{fontSize: '1.5rem'}}>
											CONTACT US
										</span>
									</div>
								</div>
								<div className='row mt-4'>
									<div className='col-md-12'>
										<div className='table-responsive'>
											<table className='table manage-product-tbl'>
												<thead>
													<tr>
														<th scope='col'>
															S.NO
														</th>
														<th scope='col'>
															Name
														</th>
														<th scope='col'>
															Email
														</th>
														<th scope='col'>
															Mobile
														</th>
														<th scope='col'>
															Created
														</th>
														<th scope='col'>
															Action
														</th>
													</tr>
												</thead>

												<tbody>
													{contactUsList.length >
													0 ? (
														contactUsList.length >
															0 &&
														contactUsList.map(
															(list, index) => (
																console.log(
																	'Contact Us :',
																	list.status,
																),
																(
																	<tr
																		key={
																			index
																		}
																	>
																		<th scope='row'>
																			{index +
																				1}
																		</th>
																		<td>
																			{list?.firstname +
																				' ' +
																				list?.lastname}
																		</td>
																		<td>
																			{
																				list?.email
																			}
																		</td>
																		<td>
																			{
																				list?.phone
																			}
																		</td>
																		<td className='text-nowrap'>
																			{list?.created_at
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

																		<td>
																			<Link
																				href={`/contact-us-view-enquiry/${list.id}`}
																			>
																				<button className='btn btn-warning'>
																					<i className='fa fa-fw fa-eye'></i>
																				</button>
																			</Link>
																		</td>
																	</tr>
																)
															),
														)
													) : (
														<tr>
															<td
																colSpan='7'
																align='center'
															>
																<strong>
																	Records Not
																	Available.
																</strong>
															</td>
														</tr>
													)}
												</tbody>
											</table>
										</div>
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

export default ManageContactUsEnquiry;
