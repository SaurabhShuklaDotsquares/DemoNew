/* eslint-disable no-console */
import React, {useState, useEffect} from 'react';
import AccountSidebar from '@components/Common/Account/AccountSidebar';
import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';
import RatingStar from '@components/Common/RatingStar/RatingStar';
import {api} from '@utils/api';

const ViewReview = props => {
	const [showList, setShowList] = useState('');
	const [loading, setLoading] = useState(false);

	const getReviewList = async () => {
		try {
			setLoading(true);
			const response = await api({
				url: `/vendor/get-single-review?id=${props.data.slug}`,
				method: 'POST',
			});
			if (response.data) {
				setLoading(false);
				setShowList(response.data[0]);
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	useEffect(() => {
		getReviewList();
	}, []);

	return (
		<>
			<SpinnerLoader loading={loading} />
			<section className='cms-page'>
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
											Review Detail
										</h3>
									</div>
								</div>
								<table className='table table-hover table-striped'>
									<tbody>
										<tr>
											<th scope='row'>User</th>
											<td>
												{showList?.user?.firstname +
													' ' +
													showList?.user?.lastname}
											</td>
										</tr>
										<tr>
											<th scope='row'>Product</th>
											<td>{showList?.product?.title}</td>
										</tr>
										<tr>
											<th scope='row'>Rating</th>
											<td>
												<RatingStar
													stars={showList?.rating}
												/>
											</td>
										</tr>
										<tr>
											<th scope='row'>Comment</th>
											<td>{showList?.comment}</td>
										</tr>
										<tr>
											<th scope='row'>Posted On</th>
											<td>{showList?.created_at}</td>
										</tr>
										<tr>
											<th scope='row'>Status</th>
											<td>{showList?.status}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ViewReview;
