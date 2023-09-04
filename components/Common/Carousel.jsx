import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export function DealECarousel({children, ...rest}) {
	const max = rest?.max ?? false;

	const responsive1 = {
		superLargeDesktop: {
			// the naming can be any, depends on you.
			breakpoint: {max: 4000, min: 3000},
			items: max ? 6 : 6,
		},
		desktop: {
			breakpoint: {max: 3000, min: 1024},
			items: max ? 6 : 6,
		},
		tablet: {
			breakpoint: {max: 1024, min: 464},
			items: max ? 4 : 3,
		},
		mobile: {
			breakpoint: {max: 464, min: 0},
			items: 2,
		},
	};

	return (
		<Carousel
			responsive={responsive1}
			swipeable
			draggable
			showDots={false}
			ssr={true} // means to render carousel on server-side.
			infinite={true}
			autoPlay={true}
			autoPlaySpeed={2000}
			keyBoardControl={true}
			// pauseOnHover
			arrows={false}
			// customTransition='all .5'
			transitionDuration={500}
			containerClass='container'
			removeArrowOnDeviceType={['tablet', 'mobile']}
			// deviceType={this.props.deviceType}
			dotListClass='custom-dot-list-style'
			itemClass='carousel-item-padding-10-px'
			{...rest}
		>
			{children}
		</Carousel>
	);
}

function ECarousel({children, ...rest}) {
	const max = rest?.max ?? false;

	const responsive1 = {
		superLargeDesktop: {
			// the naming can be any, depends on you.
			breakpoint: {max: 4000, min: 3000},
			items: max ? 4 : 4,
		},
		desktop: {
			breakpoint: {max: 3000, min: 1024},
			items: max ? 4 : 4,
		},
		tablet: {
			breakpoint: {max: 1024, min: 464},
			items: max ? 2 : 2,
		},
		mobile: {
			breakpoint: {max: 464, min: 0},
			items: 1,
		},
	};

	return (
		<Carousel
			responsive={responsive1}
			swipeable
			draggable
			showDots={false}
			ssr={true} // means to render carousel on server-side.
			infinite={true}
			autoPlay={true}
			autoPlaySpeed={2000}
			keyBoardControl={true}
			// pauseOnHover
			arrows={false}
			// customTransition='all .5'
			transitionDuration={500}
			containerClass='container'
			removeArrowOnDeviceType={['tablet', 'mobile']}
			// deviceType={this.props.deviceType}
			dotListClass='custom-dot-list-style'
			itemClass='carousel-item-padding-10-px'
			{...rest}
		>
			{children}
		</Carousel>
	);
}

export default ECarousel;
