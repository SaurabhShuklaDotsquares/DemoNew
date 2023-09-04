import React from 'react';
import Link from 'next/link';

import AccountSidebar from '@components/Common/Account/AccountSidebar';

const Dashboard = () => {
	return (
		<>
			<div className='cms-page innerblock-padd'>
				<div className='container'>
					<div className='dashborad-panel'>
						<div className='col-md-3'>
							<AccountSidebar />
						</div>
						<div className='dashborad-rightsider col-md-9 dashright-bx'>
							<h1 className='dash-head'>Dashboard</h1>
							<div className='row'>
								<div className='col-lg-4 col-sm-6'>
									<Link href='/orders' legacyBehavior>
										<a className='dash-link'>
											<span className='dash-icon'>
												<img
													src='/assets/images/dash-icon1.png'
													alt='dash-icon'
												/>
											</span>
											<span className='dash-name'>
												My Order
											</span>
										</a>
									</Link>
								</div>
								<div className='col-lg-4 col-sm-6'>
									<Link
										href='/address-book'
										className='dash-link'
									>
										<span className='dash-icon'>
											<img
												src='/assets/images/dash-icon4.png'
												alt='dash-icon'
											/>
										</span>
										<span className='dash-name'>
											Address Book
										</span>
									</Link>
								</div>
								<div className='col-lg-4 col-sm-6'>
									<Link
										href='/changePassword'
										className='dash-link'
									>
										<span className='dash-icon'>
											<img
												src='/assets/images/dash-icon5.png'
												alt='dash-icon'
											/>
										</span>
										<span className='dash-name'>
											Change Password
										</span>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
