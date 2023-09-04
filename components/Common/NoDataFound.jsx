import Link from 'next/link';
import React from 'react';
import Loading from './Loading';

function NoDataFound(props) {
	return (
		<div>
			<div
				className='cart-container d-flex flex-wrap'
				style={{justifyContent: 'center'}}
			>
				<div className='row' style={{width: '50%'}}>
					<div className='col-md-12 text-center'>
						{props.loading || props.loading === undefined ? (
							<Loading />
						) : (
							<div
								role='alert'
								className='fade text-danger p-5 alert alert-danger show'
							>
								<img
									src='/assets/images/bag-empty.svg'
									alt='empty-bag-img'
								/>
								<div className='text-muted alert-heading h4'>
									{props.message || 'Your bag is empty'}
								</div>
								<div className='cart-button'>
									<Link href='/' className='custom-btn btn'>
										Continue Shopping
									</Link>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default NoDataFound;
