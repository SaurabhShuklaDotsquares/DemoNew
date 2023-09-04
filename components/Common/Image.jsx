// import Image from 'next/image';
// import {useState} from 'react';

function NextImage({src, alt, ...rest}) {
	// console.log({src, rest});
	// const [imageError, setImageError] = useState(false);
	return (
		<img
			// src={imageError ? '/assets/images/missingImage.png' : src}
			src={src || '/assets/images/missingImage.png'}
			alt={alt?.toString() || 'demo'}
			// priority
			// onError={() => setImageError(true)}
			onError={({currentTarget}) => {
				currentTarget.onerror = null; // prevents looping
				currentTarget.src = '/assets/images/missingImage.png';
			}}
			// style={{width: '100%', height: '100%'}}
			{...rest}
		/>
	);
}

export default NextImage;
