import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
function Error() {
	return (
		<div className='container text-center'>
			<Image
				src='/assets/images/notFound.png'
				alt='not Found'
				width={500}
				height={500}
			/>
			<div className='error-home-block'>
				<Link href='/' className='custom-btn error-home-button'>
					Go to Home
				</Link>
			</div>
		</div>
	);
}

Error.getInitialProps = ({res, err}) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return {statusCode};
};

export default Error;
