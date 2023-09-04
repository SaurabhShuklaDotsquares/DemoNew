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

const Store = () => {
	return (
		<>
			<div>
				{/*Banner Start*/}
				<div className='store-banner'>
					<img
						src='/assets/images/store-banner_1920x678.jpg'
						alt='a'
					/>
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
												src='/assets/images/storelogo.png'
												alt='a'
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
									lacus vel facilisis.
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
									accumsan lacus vel facilisis.
								</p>
							</div>
						</div>
					</div>
					{/*Store Infomation Detail End*/}
					{/*Popular Start*/}
					<div className='section'>
						<div className='container'>
							<div className='mid-heading'>
								<h2>Our Products</h2>
							</div>
							<OwlCarousel
								className='product-slider owl-carousel owl-theme'
								items='6'
								autoplay
								nav
								dots
								loop
							>
								<div className='item'>
									<div className='product-box'>
										<figure>
											<a href='#'>
												<img
													src='/assets/images/img1.png'
													alt='a'
												/>
											</a>
										</figure>
										<h4>Product Name</h4>
										<p>Lorem ipsum dolor sit amet</p>
										<span className='price'>$100.00</span>
									</div>
								</div>
								<div className='item'>
									<div className='product-box'>
										<figure>
											<a href='#'>
												<img
													src='/assets/images/img2.png'
													alt='a'
												/>
											</a>
										</figure>
										<h4>Product Name</h4>
										<p>Lorem ipsum dolor sit amet</p>
										<span className='price'>$100.00</span>
									</div>
								</div>
								<div className='item'>
									<div className='product-box'>
										<figure>
											<a href='#'>
												<img
													src='/assets/images/img3.png'
													alt='a'
												/>
											</a>
										</figure>
										<h4>Product Name</h4>
										<p>Lorem ipsum dolor sit amet</p>
										<span className='price'>$100.00</span>
									</div>
								</div>
								<div className='item'>
									<div className='product-box'>
										<figure>
											<a href='#'>
												<img
													src='/assets/images/img4.png'
													alt='a'
												/>
											</a>
										</figure>
										<h4>Product Name</h4>
										<p>Lorem ipsum dolor sit amet</p>
										<span className='price'>$100.00</span>
									</div>
								</div>
								<div className='item'>
									<div className='product-box'>
										<figure>
											<a href='#'>
												<img
													src='/assets/images/img5.png'
													alt='a'
												/>
											</a>
										</figure>
										<h4>Product Name</h4>
										<p>Lorem ipsum dolor sit amet</p>
										<span className='price'>$100.00</span>
									</div>
								</div>
								<div className='item'>
									<div className='product-box'>
										<figure>
											<a href='#'>
												<img
													src='/assets/images/img6.png'
													alt='a'
												/>
											</a>
										</figure>
										<h4>Product Name</h4>
										<p>Lorem ipsum dolor sit amet</p>
										<span className='price'>$100.00</span>
									</div>
								</div>
							</OwlCarousel>
						</div>
					</div>
					{/*Popular End*/}
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

export default Store;
