import React, {useState, useEffect, useMemo} from 'react';
import Link from 'next/link';
import AccountSidebar from '@components/Common/Account/AccountSidebar';
import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';
import {api} from '@utils/api';
import {confirmDialog} from '@utils/helper';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';

const ManageProducts = () => {
	const [productList, setProductList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [pageLink, setPageLink] = useState();
	const [page, setPage] = useState(null);

	const router = useRouter();

	const setRouterPage = async page => {
		router.replace({
			query: {...router.query, page: page},
		});
	};

	const getProductList = async page => {
		try {
			setLoading(true);
			const response = await api({
				url: '/vendor/product/list?page=' + page,
				method: 'GET',
			});
			if (response.data) {
				// console.log('respList', response.data.data);
				setLoading(false);
				setCurrentPage(response?.data?.current_page);
				setPageLink(response?.data?.links);
				setProductList(
					response.data.data.length > 0 ? response.data.data : [],
				);
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	const handleDelete = async id => {
		const confirm = await confirmDialog(
			'Are you really want to delete this product',
		);
		if (confirm) {
			const data = {id: id};
			const response = await api({
				url: '/vendor/product/delete',
				method: 'POST',
				data,
			});

			if (response.status) {
				toast.success(response.message);
				getProductList();
			}
		}
	};

	const handleStatus = async (id, approval_status) => {
		const confirm = await confirmDialog(
			'Are you really want to change approval status of this product',
		);
		if (confirm) {
			const data = {
				id: id,
				approval_status: approval_status === '1' ? '0' : '1',
			};
			const response = await api({
				url: '/vendor/product/status-update',
				method: 'POST',
				data,
			});
			if (response.status) {
				toast.success(response.message);
				getProductList();
			}
		}
	};

	const handleSearch = e => {
		setSearchTerm(e.target.value);
	};

	const filteredProductList = useMemo(() => {
		return productList.filter(item => {
			if (searchTerm === '') {
				return item;
			} else if (
				item.title.toLowerCase().includes(searchTerm.toLowerCase())
			) {
				return item;
			} else if (
				item.category_data.title
					.toLowerCase()
					.includes(searchTerm.toLowerCase())
			) {
				return item;
			}
		});
	}, [productList, searchTerm]);

	const handleKeyDown = event => {
		if (event.key === 'Enter') {
			setSearchTerm('');
		}
	};

	useEffect(() => {
		if (page) {
			getProductList(page);
			setRouterPage(page);
		}
	}, [page]);

	useEffect(() => {
		setPage(router?.query?.page ?? 1);
	}, [router?.query?.page]);

	console.log('filteredProductList', filteredProductList);
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
									<div className='col-lg-4 col-md-5'>
										<h3>MY PRODUCTS</h3>
									</div>
									<div className='col-lg-4 col-md-4 search-field'>
										<div className='input-group'>
											<input
												type='text'
												className='form-control'
												placeholder='Search Product...'
												onChange={handleSearch}
												value={searchTerm}
												onKeyDown={handleKeyDown}
											/>
										</div>
									</div>
									<div className='col-lg-3 col-md-7 text-md-right'>
										<Link
											href='/vendor/addproduct'
											className='btn'
											style={{
												background: '#ea3a3c',
												color: '#fff',
												border: 'none',
												fontSize: '1.25rem',
											}}
										>
											ADD PRODUCT
										</Link>
									</div>
								</div>
							</div>

							<div className='row mt-4'>
								<div className='col-md-12'>
									<div className='table-responsive'>
										<table className='table user-product-table manage-product-tbl'>
											<thead>
												<tr>
													<th scope='col'>S.NO</th>
													<th scope='col'>Title</th>
													<th scope='col'>
														Category
													</th>
													<th scope='col'>
														Sub Category
													</th>
													<th scope='col'>Price</th>
													<th scope='col'>Status</th>
													<th scope='col'>Created</th>
													<th scope='col'>Action</th>
												</tr>
											</thead>
											{/* {orderList.length > 0 ? (
													orderList.length > 0 &&
													orderList.map((value, index) => */}
											<tbody>
												{productList.length > 0 ? (
													productList.length > 0 &&
													productList.map(
														(list, index) => (
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
																		list?.title
																	}
																</td>
																<td>
																	{list
																		?.category_data
																		?.parent_category
																		?.title
																		? list
																				?.category_data
																				?.parent_category
																				?.title
																		: list
																				?.category_data
																				?.title}
																</td>
																<td>
																	{list
																		?.category_data
																		?.parent_category
																		?.title
																		? list
																				?.category_data
																				?.title
																		: 'n/a'}
																</td>
																<td>
																	{' '}
																	{list?.display_discounted_price ===
																		'0.00' ||
																	list?.display_discounted_price ===
																		'0'
																		? list?.display_price
																		: list?.display_discounted_price}
																</td>
																<td
																	role='button'
																	onClick={() =>
																		handleStatus(
																			list.id,
																			list.approval_status,
																		)
																	}
																>
																	{list.status ===
																	'1'
																		? 'Active'
																		: 'In - Active'}
																</td>
																<td className='text-nowrap'>
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
																	<i
																		className='fas fa-trash btn'
																		onClick={() =>
																			handleDelete(
																				list.id,
																			)
																		}
																	></i>
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
																Product Not
																Available.
															</strong>
														</td>
													</tr>
												)}
											</tbody>
										</table>
										<ul className='pagination justify-content-center'>
											{productList.length > 0
												? pageLink?.map(
														(item, index) => (
															// console.log(
															// 	'item',
															// 	item,
															// ),
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

export default ManageProducts;
