import React from 'react';
import {FaStar, FaStarHalfAlt} from 'react-icons/fa';
import {AiOutlineStar} from 'react-icons/ai';

const RatingStar = ({stars}) => {
	const ratingStar = Array.from({length: 5}, (item, index) => {
		let number = index + 0.5;

		return (
			<span className='star-rating' key={index}>
				{stars >= index + 1 ? (
					<FaStar className='icon' />
				) : stars >= number ? (
					<FaStarHalfAlt className='icon' />
				) : (
					<AiOutlineStar className='icon' />
				)}
			</span>
		);
	});

	return (
		<div>
			<span style={{color: '#FDCC0D', width: '25px', height: '25px'}}>
				{ratingStar}
			</span>
		</div>
	);
};

export default RatingStar;
