import React, {useState, useEffect} from 'react';
import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';
import {api} from '@utils/api';

const OrderInvoice = props => {
	const [showList, setShowList] = useState('');
	const [showProduct, setShowProduct] = useState('');
	const [loading, setLoading] = useState(false);

	const getShowList = async () => {
		setLoading(true);
		try {
			const response = await api({
				url: `/vendor/order/show/${props.data.slug}`,
				method: 'GET',
			});
			if (response.data) {
				console.log('setshow', response.data);
				setShowList(response.data.order);
				setShowProduct(response.data.order.orderitems);
				setLoading(false);
			}
		} catch (error) {
			setLoading(true);
			console.log(error);
		}
	};

	useEffect(() => {
		getShowList();
	}, []);

	return (
		<>
			<SpinnerLoader loading={loading} />
			<div className='cms-page pl-3 pr-3'>
				<div className='table-responsive'>
					<table
						width='720'
						border='0'
						align='center'
						cellPadding='0'
						cellSpacing='0'
						className='invoice-tbl'
					>
						<tr>
							<td className='p-0 pl-0 pb-4'>
								<img src='/assets/images/logo.png' alt='' />
							</td>
						</tr>

						<tr>
							<td
								style={{
									backgroundColor: 'rgb(234, 58, 60)',
									color: 'white',
								}}
								className='table-td p-0'
							>
								<table
									width='100%'
									border='0'
									cellSpacing='0'
									cellPadding='0'
								>
									<tr>
										<td className='pb-1'>
											Order # {showList?.order_id}
										</td>
									</tr>

									<tr>
										<td>
											{' '}
											Order Date :{' '}
											{showList?.created_at?.slice(0, 10)}
										</td>
									</tr>
								</table>
							</td>
						</tr>

						<tr>
							<td className='border p-0'>
								<table
									width='100%'
									border='0'
									cellSpacing='0'
									cellPadding='0'
								>
									<tr className='background-color'>
										<td
											width='49%'
											height='30'
											className='sold'
										>
											<strong>Billing address : </strong>
										</td>
										<td width='31%' className='ship'>
											<strong>Shipping Address : </strong>
										</td>
										{/* <td width='20%' align='right' className='billing-address'>
											<p>Billing address</p>
										</td> */}
									</tr>
									<tr>
										<td className='tabledata'>
											{showList?.billing_address
												?.address1 +
												', ' +
												showList?.billing_address
													?.address2 +
												', ' +
												showList?.billing_address
													?.city +
												', ' +
												showList?.billing_address
													?.postal_code +
												', ' +
												showList?.billing_address
													?.state +
												', ' +
												showList?.billing_address
													?.country}
										</td>
										<td colSpan='2' className='tabledata'>
											{showList?.shipping_address
												?.address1 +
												', ' +
												showList?.shipping_address
													?.address2 +
												', ' +
												showList?.shipping_address
													?.city +
												', ' +
												showList?.shipping_address
													?.postal_code +
												', ' +
												showList?.shipping_address
													?.state +
												', ' +
												showList?.shipping_address
													?.country}
										</td>
									</tr>
								</table>
							</td>
						</tr>
						<tr>
							<td className='py-0'>&nbsp;</td>
						</tr>
						<tr>
							<td className='border p-0 '>
								<table
									width='100%'
									border='0'
									cellSpacing='0'
									cellPadding='0'
								>
									<tr className='background-color'>
										<td
											width='49%'
											height='30'
											className='sold'
										>
											<strong>Payment Method : </strong>
										</td>
										<td width='31%' className='ship'>
											<strong>Shipping Charges : </strong>
										</td>
										{/* <td width='20%' align='right' className='billing-address'>
											<p>Shipping address</p>
										</td> */}
									</tr>
									<tr>
										<td
											valign='top'
											className='tabledata p-0'
										>
											<table
												width='100%'
												border='0'
												cellSpacing='0'
												cellPadding='0'
											>
												<tr>
													<td>
														Payment Type :{' '}
														{showList?.payment_method
															? showList?.payment_method
															: 'online'}
													</td>
												</tr>
											</table>
										</td>
										<td
											colSpan='2'
											valign='top'
											className='tabledata p-0'
										>
											<table
												width='100%'
												border='0'
												cellSpacing='0'
												cellPadding='0'
											>
												<tr>
													<td>
														(Total Shipping Charges{' '}
														{
															showList?.display_shipping_amount
														}
														)
													</td>
												</tr>

												<tr>
													<td className='py-1'>
														&nbsp;
													</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
						<tr>
							<td className='py-0'>&nbsp;</td>
						</tr>
						{/* <tr> */}
						<tr>
							<td className='border p-0'>
								<table
									width='100%'
									border='0'
									cellSpacing='0'
									cellPadding='0'
								>
									<tr className='background-color'>
										<td
											width='49%'
											height='30'
											className='sold'
										>
											<strong>Products</strong>
										</td>
										<td className='ship'>
											<strong>SKU</strong>
										</td>
										<td className='ship'>
											<strong>Price</strong>
										</td>
										<td className='ship'>
											<strong>Qty</strong>
										</td>

										<td align='right' className='ship'>
											<strong>Subtotal</strong>
										</td>
									</tr>

									{showProduct &&
										showProduct.map((item, index) => (
											<tr key={index}>
												<td>{item?.product?.title}</td>
												<td>{item?.product?.sku}</td>
												<td>{item?.display_price}</td>
												<td>{item?.quantity}</td>
												<td>
													{item?.display_total_price}
												</td>
											</tr>
										))}

									<tr>
										<td colSpan='6' valign='top'>
											&nbsp;
										</td>
									</tr>
									<tr>
										<td
											colSpan='5'
											align='right'
											valign='top'
											className='tabledata'
										>
											<strong>Subtotal : </strong>
										</td>
										<td
											align='right'
											valign='top'
											className='tabledata'
										>
											<strong>
												{showList?.display_total}
											</strong>
										</td>
									</tr>
									<tr>
										<td
											colSpan='5'
											align='right'
											valign='top'
											className='tabledata'
										>
											<strong>
												Shipping &amp; Handling :
											</strong>
										</td>
										<td
											align='right'
											valign='top'
											className='tabledata'
										>
											<strong>
												{
													showList?.display_shipping_amount
												}
											</strong>
										</td>
									</tr>
									<tr>
										<td
											colSpan='5'
											align='right'
											valign='top'
											className='tabledata'
										>
											<strong>Grand Total : </strong>
										</td>
										<td
											align='right'
											valign='top'
											className='tabledata'
										>
											<strong>
												{showList?.display_amount}
											</strong>
										</td>
									</tr>
								</table>
							</td>
						</tr>
						<tr></tr>
						{/* </tr> */}
					</table>
				</div>
			</div>
		</>
	);
};

export default OrderInvoice;
