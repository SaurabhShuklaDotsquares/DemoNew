import React from 'react';

const ThankU = () => {
	return (
		<div className='page-main'>
			<div className='text-center thank-block'>
				<div className='container'>
					<br />
					<br />
					<img src='/assets/images/thankYou.png' alt='thank-you' />
					<h1>We've received your order.</h1>

					<p>
						A copy of your receipt has been sent to the email
						address.
					</p>
				</div>
			</div>
		</div>
	);
};

export default ThankU;
