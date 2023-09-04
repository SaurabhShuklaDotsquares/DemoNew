import React from 'react';

// if (typeof window !== 'undefined') {
// 	// Client-side-only code
// 	window.$ = window.jQuery = require('jquery');
// }
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import dynamic from 'next/dynamic';

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
	ssr: false,
});

const ServiceListingDetail = () => {
	return (
		<>
			<div>
				{/*Banner Start*/}
				<div className='store-main-banner'>
					<div className='storename'>
						<h2>ATM Homoeo Store </h2>
						<div className='store-address'>
							<p>
								Hyderguda
								<br />
								Hyderabad - 500029
							</p>
							<p>
								<i className='fas fa-phone-alt' />{' '}
								<span>+91 9985358778</span>
							</p>
						</div>
					</div>
					<OwlCarousel
						className='listing-slider services-banner owl-carousel owl-theme'
						items='1'
						autoplay
						nav
						dots
						loop
					>
						<div className='item'>
							<figure className='slider-img'>
								<img
									src='/assets/images/service-banner1.jpg'
									alt
								/>
							</figure>
						</div>
						<div className='item'>
							<figure className='slider-img'>
								<img
									src='/assets/images/service-banner2.jpg'
									alt
								/>
							</figure>
						</div>
						<div className='item'>
							<figure className='slider-img'>
								<img
									src='/assets/images/service-banner3.jpg'
									alt
								/>
							</figure>
						</div>
					</OwlCarousel>
				</div>
				{/*Banner End*/}
				{/*Store Main Start*/}
				<div className='store-main'>
					{/*Store Infomation Detail Start*/}
					<div className='section'>
						<div className='container'>
							<div className='store-logo-strip'>
								<div className='row'>
									<div className='col-md-6'>
										<div className='store-logo'>
											<img
												src='/assets/images/store-logo.png'
												alt
											/>
										</div>
									</div>
									<div className='col-md-6'>
										<div className='store-social-media'>
											<div className='social-lbl'>
												Connect with us
											</div>
											<div className='social-icons'>
												<a href='javascript:void(0)'>
													<i className='fab fa-facebook-f' />
												</a>
												<a href='javascript:void(0)'>
													<i className='fab  fa-twitter' />
												</a>
												<a href='javascript:void(0)'>
													<i className='fab fa-google-plus-g' />
												</a>
												<a href='javascript:void(0)'>
													<i className='fab fa-linkedin-in' />
												</a>
												<a href='javascript:void(0)'>
													<i className='fab fa-pinterest-p' />
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='store-info'>
								<h1>Welcome to our shop</h1>
								<p>
									Lorem ipsum dolor sit amet, consectetur
									adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua.
									Quis ipsum suspendisse ultrices gravida.
									Risus commodo viverra maecenas accumsan
									lacus vel facilisis.{' '}
								</p>
								<p>
									Lorem ipsum dolor sit amet, consectetur
									adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua.
									Quis ipsum suspendisse ultrices gravida.
									Risus commodo viverra maecenas accumsan
									lacus vel facilisis. Lorem ipsum dolor sit
									amet, consectetur adipiscing elit, sed do
									eiusmod tempor incididunt ut labore et
									dolore magna aliqua. Quis ipsum suspendisse
									ultrices gravida. Risus commodo viverra
									maecenas accumsan lacus vel facilisis. Lorem
									ipsum dolor sit amet, consectetur adipiscing
									elit, sed do eiusmod tempor incididunt ut
									labore et dolore magna aliqua. Quis ipsum
									suspendisse ultrices gravida. Risus commodo
									viverra maecenas accumsan lacus vel
									facilisis. Lorem ipsum dolor sit amet,
									consectetur adipiscing elit, sed do eiusmod
									tempor incididunt ut labore et dolore magna
									aliqua. Quis ipsum suspendisse ultrices
									gravida. Risus commodo viverra maecenas
									accumsan lacus vel facilisis.{' '}
								</p>
							</div>
							<div className='store-common-detail'>
								<div className='row'>
									<div className='col-md-4 col-sm-6'>
										<div className='address-store store-card'>
											<h2>Address</h2>
											<div className='address-shop'>
												Shop No 2,
												<br />
												Sai Tirumala Towers,
												<br />
												Hyderguda,
												<br />
												Hyderabad - 500029
												<br />
												Telangana.
												<br />
												<br />
												<strong>Telephone:</strong>{' '}
												8886763778 40 66338778
											</div>
										</div>
									</div>
									<div className='col-md-4 col-sm-6'>
										<div className='store-timiing store-card'>
											<h2>Business timings</h2>
											<div className='time-sec'>
												<div className='row'>
													<div className='col-4'>
														Sunday
													</div>
													<div className='col-4'>
														Holiday
													</div>
													<div className='col-4 store-closed'>
														Closed
													</div>
												</div>
												<div className='row'>
													<div className='col-4'>
														Monday
													</div>
													<div className='col-4'>
														Holiday
													</div>
													<div className='col-4 store-open'>
														Open
													</div>
												</div>
												<div className='row'>
													<div className='col-4'>
														Monday
													</div>
													<div className='col-4'>
														Holiday
													</div>
													<div className='col-4 store-open'>
														Open
													</div>
												</div>
												<div className='row'>
													<div className='col-4'>
														Monday
													</div>
													<div className='col-4'>
														Holiday
													</div>
													<div className='col-4 store-open'>
														Open
													</div>
												</div>
												<div className='row'>
													<div className='col-4'>
														Monday
													</div>
													<div className='col-4'>
														Holiday
													</div>
													<div className='col-4 store-open'>
														Open
													</div>
												</div>
												<div className='row'>
													<div className='col-4'>
														Monday
													</div>
													<div className='col-4'>
														Holiday
													</div>
													<div className='col-4 store-open'>
														Open
													</div>
												</div>
												<div className='row'>
													<div className='col-4'>
														Monday
													</div>
													<div className='col-4'>
														Holiday
													</div>
													<div className='col-4 store-open'>
														Open
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className='col-md-4 col-sm-6'>
										<div className='store-services store-card'>
											<h2>Our services</h2>
											<ul className='catgory-list'>
												<li>Homoeo Stores</li>
											</ul>
										</div>
									</div>
									<div className='col-md-4 col-sm-6'>
										<div className='store-payment store-card'>
											<h2>Payment methods</h2>
											<div className='store-payment-methods'>
												Cash, Credit Card, Debit card
											</div>
										</div>
									</div>
									<div className='col-md-4 col-sm-6'>
										<div className='store-payment store-card'>
											<h2>Listed In</h2>
											<ul className='catgory-list'>
												<li>Health</li>
												<li>Pharmacies</li>
												<li>Homeopathy Medicines</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*Store Infomation Detail End*/}
					{/*Store enquiry  form Start*/}
					<div className='store-enquiry'>
						<div className='container'>
							<div className='contact-form'>
								<div className='form-heading'>
									<h2>Leave a Message</h2>
									<p>
										Please complete the form below and we
										will get back you as soon as possible.
									</p>
								</div>
								<div className='form-filds-block'>
									<div className='row'>
										<div className='col-md-6'>
											<div className='form-group'>
												<select className='form-control'>
													<option>
														Select Subject
													</option>
												</select>
											</div>
										</div>
										<div className='col-md-6'>
											<div className='form-group field_error'>
												<input
													type='text'
													placeholder='First Name'
													className='form-control'
												/>
												<div className='field_error_message'>
													Enter First Name
												</div>
											</div>
										</div>
										<div className='col-md-6'>
											<div className='form-group'>
												<input
													type='text'
													placeholder='Last Name'
													className='form-control'
												/>
											</div>
										</div>
										<div className='col-md-6'>
											<div className='form-group'>
												<input
													type='text'
													placeholder='Email'
													className='form-control'
												/>
											</div>
										</div>
										<div className='col-md-12'>
											<div className='form-group'>
												<input
													type='text'
													placeholder='Phone'
													className='form-control'
												/>
											</div>
										</div>
										<div className='col-md-12'>
											<div className='form-group'>
												<textarea
													placeholder='Comment/ Request'
													className='form-control'
													defaultValue={''}
												/>
											</div>
										</div>
										<div className='col-md-12 text-center'>
											<button className='custom-btn '>
												Submit
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*Store enquiry  form End*/}
				</div>
				{/*Store Main End*/}
			</div>
		</>
	);
};

export default ServiceListingDetail;
