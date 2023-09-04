/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, {useState, useEffect, useCallback} from 'react';
import Link from 'next/link';
import cookie from 'js-cookie';
import AccountSidebar from '@components/Common/Account/AccountSidebar';
import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';
import {api} from '@utils/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import UserService from '@utils/services';

const Dashboard = () => {
	const [dashboardData, setDashboardData] = useState('');
	const [FromDate, setFromDate] = useState('');
	const [ToDate, setToDate] = useState('');
	const [validateError, setValidateError] = useState({});
	const [isActive] = useState(false);
	const [defaultDate, setDefaultDate] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [flag, setFlag] = useState(false);

	const getUserCookie = () => {
		if (cookie && cookie.get('userAuth')) {
			return JSON.parse(cookie.get('userAuth'));
		} else return {};
	};
	let cookiedata = getUserCookie('userAuth');

	const handleChangeFromDate = event => {
		setFromDate(moment(event).format('YYYY-MM-DD'));
	};

	const handleChangeToDate = event => {
		setToDate(moment(event).format('YYYY-MM-DD'));
	};

	useEffect(() => {
		setValidateError(validate(FromDate, ToDate));
	}, [FromDate, ToDate]);

	const handleSubmit = async () => {
		setIsLoading(true);
		const result = validate(FromDate, ToDate);
		if (Object.keys(result).length) {
			setValidateError(result);
			setIsLoading(false);
		} else {
			setValidateError({});
			try {
				setIsLoading(true);
				const response = await api({
					url: `/vendor/dashboard?from_date=${moment(FromDate).format(
						'DD-MM-YYYY',
					)}&to_date=${moment(ToDate).format('DD-MM-YYYY')}`,
					method: 'GET',
				});
				if (response.data) {
					setDashboardData(response.data);
					setIsLoading(false);
				}
			} catch (error) {
				console.log(error);
				setIsLoading(false);
			}
		}
	};

	const validate = (FromDate, ToDate) => {
		const errors = {};
		if (!FromDate) {
			errors.FromDate = 'From date is required!';
		}
		if (!ToDate) {
			errors.ToDate = 'To date is required!';
		}
		if (FromDate > ToDate) {
			errors.FromDate = "From date can't be greater than To date!";
		}
		return errors;
	};

	useEffect(() => {
		if (flag) {
			handleSubmit();
			setFlag(false);
		}
	}, [FromDate, ToDate]);

	const getResults = useCallback(async () => {
		setIsLoading(true);
		try {
			setFlag(true);
			const result = await UserService.getVendorProfileDetail();
			setDefaultDate(moment(result.data.created_at).format('YYYY-MM-DD'));
			setFromDate(moment(result.data.created_at).format('YYYY-MM-DD'));
			setToDate(moment(new Date()).format('YYYY-MM-DD'));
		} catch (e) {
			console.log({e});
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		getResults();
	}, [getResults]);

	const handleReset = e => {
		e.preventDefault();
		setFromDate(defaultDate);
		setToDate(moment(new Date()).format('YYYY-MM-DD'));
		setFlag(true);
	};

	return (
		<>
			<SpinnerLoader loading={isLoading} />
			<div className='cms-page'>
				<div className='container'>
					<div className='dashborad-panel'>
						<AccountSidebar />
						<div className='dashborad-rightsider'>
							<div className='row'>
								<div className='col-xl-3'>
									<h1 className='dash-head pb-4'>
										Dashboard
									</h1>
								</div>
								<div className='col-xl-3 col-md-4 col-sm-6 mb-4'>
									<DatePicker
										className='form-control'
										name='FromDate'
										dateFormat='dd-MM-yyyy'
										todayButton='TODAY'
										onChange={handleChangeFromDate}
										value={FromDate}
										minDate={new Date(defaultDate)}
										placeholderText='From Date:'
									/>

									<span className='text-danger'>
										{isLoading
											? ' '
											: validateError.FromDate}
									</span>
								</div>
								<div className='col-xl-3 col-md-4 col-sm-6 mb-4'>
									<DatePicker
										className='form-control'
										name='ToDate'
										dateFormat='dd-MM-yyyy'
										todayButton='TODAY'
										onChange={handleChangeToDate}
										value={ToDate}
										minDate={new Date(defaultDate)}
										placeholderText='To Date:'
									/>
									<span className='text-danger'>
										{isLoading ? ' ' : validateError.ToDate}
									</span>
								</div>
								<div className='col-xl-3 col-md-4 form-group mb-4 pl-md-2 pr-md-2 mt-2'>
									<button
										className='btn btn-success mr-2'
										title='Filter'
										type='submit'
										onClick={e => handleSubmit(e)}
									>
										<i className='fa fa-filter'></i> Filter
									</button>
									<button
										onClick={e => handleReset(e)}
										className='btn btn-warning'
										title='Reset'
										type='submit'
									>
										<i className='fa fa-refresh'></i> Reset
									</button>
								</div>
							</div>
							<div className='row'>
								<div className='col-lg-4 col-sm-6'>
									{cookiedata.userType === 'vendor' ? (
										<Link
											href='/vendor/manageorders'
											legacyBehavior
										>
											<a className='dash-link'>
												<span className='dash-icon'>
													<img
														src='/assets/images/dash-icon1.png'
														alt='dash-icon'
													/>
												</span>
												<span className='dash-name'>
													Total Orders
													{
														<span>
															(
															{dashboardData.order
																? dashboardData.order
																: 0}
															)
														</span>
													}
												</span>
											</a>
										</Link>
									) : (
										<Link href='/orders' legacyBehavior>
											<a className='dash-link'>
												<span className='dash-icon'>
													<img
														src='/assets/images/dash-icon1.png'
														alt='dash-icon'
													/>
												</span>
												<span className='dash-name'>
													Total Orders
												</span>
											</a>
										</Link>
									)}
								</div>
								<div className='col-lg-4 col-sm-6'>
									<Link
										href='/vendor/manageproducts'
										className='dash-link'
									>
										<span className='dash-icon'>
											<img
												src='/assets/images/dash-icon4.png'
												alt='dash-icon'
											/>
										</span>
										<span className='dash-name'>
											Total Products
											{
												<span>
													(
													{dashboardData.total_products
														? dashboardData.total_products
														: 0}
													)
												</span>
											}
										</span>
									</Link>
								</div>
								<div className='col-lg-4 col-sm-6'>
									<Link
										href={isActive ? '/vendor/sales' : ''}
										className='dash-link'
									>
										<span className='dash-icon'>
											<img
												src='/assets/images/dash-icon5.png'
												alt='dash-icon'
											/>
										</span>
										<span className='dash-name'>
											Total Sales
											{
												<span>
													(
													{dashboardData.total_sale
														? dashboardData.total_sale
														: 0}
													)
												</span>
											}
										</span>
									</Link>
								</div>
								<div className='col-lg-4 col-sm-6'>
									<Link
										href='/vendor/reviews'
										className='dash-link'
									>
										<span
											className='dash-icon'
											style={{
												color: '#ea3a3c',
												fontSize: '30px',
											}}
										>
											<i className='fa fa-fw fa-eye'></i>
										</span>
										<span className='dash-name'>
											Total Reviews
											{
												<span>
													(
													{dashboardData.reviews
														? dashboardData.reviews
														: 0}
													)
												</span>
											}
										</span>
									</Link>
								</div>
								<div className='col-lg-4 col-sm-6'>
									<Link
										href='/managecontactenquiry'
										className='dash-link'
									>
										<span
											className='dash-icon'
											style={{
												color: '#ea3a3c',
												fontSize: '30px',
											}}
										>
											<i className='fa fa-fw fa-eye'></i>
										</span>
										<span className='dash-name'>
											Total Contact-Us Enquiry
											{
												<span>
													(
													{dashboardData.contact_query
														? dashboardData.contact_query
														: 0}
													)
												</span>
											}
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
