import React from 'react';
import {Spinner} from 'react-bootstrap';

function Loading() {
	return (
		<div
			className='right-panel d-flex justify-content-center'
			style={{paddingLeft: '25%'}}
		>
			{' '}
			<Spinner animation='border' variant='primary'></Spinner>
			<span
				style={{marginLeft: '-3rem', marginTop: '2rem'}}
				className='visually-hidden'
			>
				Fetching...
			</span>
		</div>
	);
}

export default Loading;
