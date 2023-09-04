import React from 'react';
import {Watch} from 'react-loader-spinner';

const SpinnerLoader = () => {
	return (
		<div>
			<Watch
				height='25'
				width='80'
				radius='48'
				color='#fff'
				ariaLabel='watch-loading'
				wrapperStyle={{}}
				wrapperClassName=''
				visible={true}
			/>
		</div>
	);
};

export default SpinnerLoader;
