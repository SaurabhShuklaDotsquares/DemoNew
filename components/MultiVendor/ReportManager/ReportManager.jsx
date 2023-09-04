import React, {useState, useCallback, useEffect} from 'react';
import AccountSidebar from '@components/Common/Account/AccountSidebar';
import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';
import {api} from '@utils/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Link from 'next/link';
import UserService from '@utils/services';

// let flag = false;

const ReportManager = () => {
	const [FromDate, setFromDate] = useState('');
	const [ToDate, setToDate] = useState('');
	const [validateError, setValidateError] = useState({});
	const [reportData, setReportData] = useState('');
	const [totalEarning, setTotalEarning] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [defaultDate, setDefaultDate] = useState('');
	const [flag, setFlag] = useState(false);

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
					url: `/vendor/report?from_date=${moment(FromDate).format(
						'DD-MM-YYYY',
					)}&to_date=${moment(ToDate).format('DD-MM-YYYY')}`,
					method: 'GET',
				});
				if (response.data) {
					setReportData(response.data);
					getTotalEarning();
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
			errors.FromDate = "From date can't be greater than To date";
		}
		return errors;
	};

	const getTotalEarning = async () => {
		setIsLoading(true);
		try {
			const response = await api({
				url: `/vendor/report-earnings?from_date=${moment(
					FromDate,
				).format('DD-MM-YYYY')}&to_date=${moment(ToDate).format(
					'DD-MM-YYYY',
				)}`,
				method: 'GET',
			});
			if (response) {
				setTotalEarning(response.data);
				setIsLoading(false);
			}
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
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
			console.log(e);
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		getResults();
	}, [getResults]);

	const handleReset = e => {
		e.preventDefault();
		setFlag(true);
		setFromDate(defaultDate);
		setToDate(moment(new Date()).format('YYYY-MM-DD'));
	};

	return (
		<>
			<SpinnerLoader loading={isLoading} />
			<section className='cms-page'>
				<div className='container'>
					<div className='dashborad-panel'>
						<AccountSidebar />

						<div className='dashborad-rightsider'>
							<h3>MANAGE REPORT</h3>

							<div className='row'>
								<div className='col-12'>
									<div className='card'>
										<div className='card-body'>
											<div className='card-body'>
												<div className='filter-outer box box-info'>
													<div className='box-header'>
														<h3 className='box-title'>
															<span className='caption-subject font-green bold uppercase'>
																Filter
															</span>
														</h3>
													</div>
													<div className='box-body'>
														<form>
															<div className='row'>
																<div className='col-md-3 pr-md-3 mb-3 mb-md-0 '>
																	<DatePicker
																		minDate={
																			new Date(
																				defaultDate,
																			)
																		}
																		className='form-control'
																		name='FromDate'
																		dateFormat='dd-MM-yyyy'
																		todayButton='TODAY'
																		onChange={
																			handleChangeFromDate
																		}
																		value={
																			FromDate
																		}
																		placeholderText='From Date:'
																	/>
																	<span className='text-danger'>
																		{isLoading
																			? ' '
																			: validateError.FromDate}
																	</span>
																</div>
																<div className='col-md-3 pl-md-3 mb-3 mb-md-0'>
																	<DatePicker
																		className='form-control'
																		name='ToDate'
																		dateFormat='dd-MM-yyyy'
																		minDate={
																			new Date(
																				defaultDate,
																			)
																		}
																		todayButton='TODAY'
																		onChange={
																			handleChangeToDate
																		}
																		value={
																			ToDate
																		}
																		placeholderText='To Date:'
																	/>
																	<span className='text-danger'>
																		{isLoading
																			? ' '
																			: validateError.ToDate}
																	</span>
																</div>
																<div className='col-md-6 mt-2'>
																	<button
																		className='btn btn-success mr-3'
																		title='Filter'
																		type='button'
																		onClick={e =>
																			handleSubmit(
																				e,
																			)
																		}
																	>
																		<i className='fa fa-filter'></i>{' '}
																		Filter
																	</button>
																	<button
																		onClick={e =>
																			handleReset(
																				e,
																			)
																		}
																		className='btn btn-warning mr-3'
																		title='Reset'
																	>
																		<i className='fa  fa-refresh'></i>{' '}
																		Reset
																	</button>
																	{/* {disabled ? ( */}
																	<Link
																		href={`${totalEarning}`}
																	>
																		<i
																			className='fa fa-download'
																			aria-hidden='true'
																			role='button'
																		></i>
																	</Link>
																</div>
															</div>
														</form>
													</div>
												</div>
											</div>
											<div className=' row'>
												<div className='col-md-6 mt-4'>
													<div className='card p-3'>
														<div className='d-flex mb-2'>
															<div>
																<i className='fa fa-user'></i>
																<p className='font-16 mt-2 m-b-5'>
																	Total Return
																	Order
																</p>
															</div>
															<div className='ml-auto'>
																<h1 className='font-light text-right pb-0'>
																	{
																		reportData?.total_returned_orders
																	}
																</h1>
															</div>
														</div>
														{/* <div>
															<Link href={`${totalOrder}`}>
																<i
																	onClick={getTotalOrder}
																	className='fa fa-download'
																	aria-hidden='true'
																	role='button'
																></i>
															</Link>
														</div> */}
													</div>
												</div>
												<div className=' col-md-6 mt-4'>
													<div className='card p-3'>
														<div className='d-flex mb-2'>
															<div>
																<i className='fa fa-ban'></i>
																<p className='font-16 mt-2 m-b-5'>
																	Total
																	Earning
																</p>
															</div>
															<div className='ml-auto'>
																<h1 className='font-light text-right pb-0'>
																	{
																		reportData?.earnings
																	}
																</h1>
															</div>
														</div>
													</div>
												</div>
												<div className=' col-md-6 mt-4'>
													<div className='card p-3'>
														<div className='d-flex mb-2'>
															<div>
																<i className='fa fa-spinner'></i>
																<p className='font-16 mt-2 m-b-5'>
																	Total
																	Processing
																	Order
																</p>
															</div>
															<div className='ml-auto'>
																<h1 className='font-light text-right pb-0'>
																	{
																		reportData?.total_processing_orders
																	}
																</h1>
															</div>
														</div>
													</div>
												</div>
												<div className=' col-md-6 mt-4'>
													<div className='card p-3'>
														<div className='d-flex mb-2'>
															<div>
																<i className='fa fa-user'></i>
																<p className='font-16 mt-2 m-b-5'>
																	Total
																	Completed
																	Order
																</p>
															</div>
															<div className='ml-auto'>
																<h1 className='font-light text-right pb-0'>
																	{
																		reportData?.total_completed_orders
																	}
																</h1>
															</div>
														</div>
													</div>
												</div>
											</div>
											<br />
											<div className='box-footer clearfix'></div>
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

export default ReportManager;
