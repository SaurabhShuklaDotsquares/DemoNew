import React, {useState} from 'react';
import Link from 'next/link';
import {useGlobalContext} from '@context/ContextApi';

import LayoutServices from '@utils/layoutService/layoutService';
import NextImage from '../Image';

const Footer = props => {
	const {pages} = props;
	const [email, setEmail] = useState('');
	const [validateError, setValidateError] = useState({});
	const [resStatus, setStatus] = useState({});
	const {configData} = useGlobalContext();

	const handleSubmit = async () => {
		const resultValid = validate(email);
		if (!resultValid.email) {
			try {
				const getResult = await LayoutServices.newsletter(email);
				setEmail('');
				setStatus({
					message: getResult.data.message,
					status: getResult.data.status,
				});
			} catch (e) {
				setStatus({
					message: e.response.data['message'],
					status: e.response.data['status'],
				});
			}
		}
		setTimeout(() => {
			setStatus({});
		}, 4000);
	};
	const handleChange = e => {
		setEmail(e.target.value);
		setValidateError({});
		setStatus({});
	};

	const validate = values => {
		const errors = {};
		// eslint-disable-next-line no-useless-escape
		var regExp = /^([\w\.\+]{1,})([^\W])(@)([\w]{1,})(\.[\w]{1,})+$/;

		if (!values) {
			errors.email = 'Email field is required!';
		} else if (!regExp.test(values)) {
			errors.email = 'Enter valid Email address!';
		}
		setValidateError(errors);
		console.log('debugging...');
		return errors;
	};

	return (
		<>
			<div>
				<div className='newsletter-box pt-5 home'>
					<div className='container d-flex align-items-center justify-content-between'>
						<div className='newsletterinner'>
							<div className='news-lt'>
								<ul>
									<li>
										<i>
											<NextImage
												alt='freedelivery'
												src='/assets/images/ecommerce-icon1.png'
											/>
										</i>
										<div className='ecom-text'>
											FREE SHIPPING ON ALL ORDER
										</div>
									</li>
									<li>
										<i>
											<NextImage
												alt='freedelivery'
												src='/assets/images/ecommerce-icon2.png'
											/>
										</i>
										<div className='ecom-text'>
											MONEY BACK GUARANTEE
										</div>
									</li>
									<li>
										<i>
											<NextImage
												alt='freedelivery'
												src='/assets/images/ecommerce-icon3.png'
											/>
										</i>
										<div className='ecom-text'>
											SAFE SHOPPING GUARANTEE
										</div>
									</li>
									<li>
										<i>
											<NextImage
												alt='freedelivery'
												src='/assets/images/ecommerce-icon4.png'
											/>
										</i>
										<div className='ecom-text'>
											ONLINE SUPPORT 24H ON DAY
										</div>
									</li>
								</ul>
							</div>
							<div className='news-rt'>
								<div className='main-heading'>
									<h2>subscribe to newsletter</h2>
									<p>
										Subscribe to the Homess mailing list to
										receive updates on new arrivals, special
										offers and other discount information.
									</p>
								</div>
								<div className='news-letter-form'>
									<div className='form-group'>
										<input
											type='text'
											className='form-control'
											placeholder='Enter your email address'
											name='email'
											value={email}
											onChange={handleChange}
										/>
										<button
											className='btn newsletter-btn '
											type='button'
											onClick={handleSubmit}
										></button>
									</div>

									{validateError.email ? (
										<span style={{color: 'red'}}>
											{validateError.email}
										</span>
									) : (
										''
									)}
									{resStatus.status ? (
										<span style={{color: 'green'}}>
											{resStatus.message}
										</span>
									) : (
										<span style={{color: 'red'}}>
											{resStatus.message}
										</span>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
				<footer className='footer'>
					<div className='footer-top relative'>
						<div className='container'>
							<div className='row'>
								<div className='col-sm-6 col-lg-4'>
									<h4>KNOW YOUR STORE</h4>
									<ul>
										{pages && pages.length
											? pages.map((item, index) => {
													return (
														<li key={index}>
															<Link
																href={`/${item.slug}`}
															>
																{item.title}
															</Link>
														</li>
													);
											  })
											: ''}
									</ul>
								</div>
								<div className='col-sm-6 col-lg-4'>
									<h4>TOP CATEGORIES</h4>
									<ul>
										<li>
											<Link href='/products/Women-2'>
												Women
											</Link>
										</li>
										{/* <li>
											<Link href='/products/men'>
												Men
											</Link>
										</li> */}
										<li>
											<Link href='/products/kids-2'>
												Kids
											</Link>
										</li>
										<li>
											<Link href='/products/Electronics-2'>
												Electronics
											</Link>
										</li>
									</ul>
								</div>
								<div className='col-sm-6 col-lg-4'>
									<h4>Get In Touch</h4>
									<div className='icon-content'>
										<i>
											<img
												src='/assets/images/email.png'
												alt='email'
											/>
										</i>
										<span className='ft-title'>Email</span>
										<a href='mailto:support@ecommerceportal.24livehost.com'>
											{configData?.general?.SUPPORT_EMAIL}
										</a>
									</div>
									<div className='icon-content'>
										<i>
											<img
												src='/assets/images/phone.png'
												alt='phone'
											/>
										</i>
										<span className='ft-title'>Phone</span>
										<a href='callto:+91-9898989999'>
											{configData?.general?.HOTLINE}
										</a>
									</div>
								</div>
							</div>
							<div className='social text-center'>
								<a
									href={configData?.social?.facebook}
									target='_blank'
									rel='noreferrer'
								>
									<i className='fab fa-facebook-f' />
								</a>
								<a
									href={configData?.social?.twitter}
									target='_blank'
									rel='noreferrer'
								>
									<i className='fab fa-twitter' />
								</a>
								<a
									href={configData?.social?.google_plus}
									target='_blank'
									rel='noreferrer'
								>
									<i className='fab fa-google-plus-g' />
								</a>
								<a
									href={configData?.social?.linkedin}
									target='_blank'
									rel='noreferrer'
								>
									<i className='fab fa-linkedin-in' />
								</a>
								<a
									href={configData?.social?.youtube}
									target='_blank'
									rel='noreferrer'
								>
									<i className='fab fa-youtube' />
								</a>
							</div>
						</div>
					</div>
					<div className='footer-btm'>
						<div className='container'>
							<div className='d-flex justify-content-center align-items-center flex-wrap flex-md-nowrap justify-content-md-between'>
								<div className='ft-left'>
									{configData?.general?.FOOTER_TEXT}
								</div>
							</div>
						</div>
					</div>
				</footer>
			</div>
		</>
	);
};

export default Footer;
