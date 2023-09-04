const Loading = props => {
	const length = props.length || 1;
	return (
		<div className='row'>
			{[...new Array(length)].map((i, key) => (
				<div
					className='col-6 col-md-4 col-lg-3'
					style={{paddingTop: '20px'}}
					key={key}
				>
					<svg
						viewBox='0 0 300 400'
						preserveAspectRatio='xMidYMid meet'
						// eslint-disable-next-line react/no-unknown-property
						primary='#f2f2f2'
						// eslint-disable-next-line react/no-unknown-property
						secondary='#dadada'
						data-v-bec55d12
					>
						<rect
							clipPath='url(#clipPath-42)'
							x='0'
							y='0'
							width='300'
							height='400'
							style={{fill: `url("#gradient-42")`}}
						></rect>
						<defs>
							<clipPath id='clipPath-42'>
								<rect
									x='0'
									y='0'
									rx='3'
									ry='3'
									width='300'
									height='380'
								></rect>
							</clipPath>
							<linearGradient id='gradient-42'>
								<stop offset='50%' stopColor='#f2f2f2'>
									<animate
										attributeName='offset'
										values='-1.5; 1.5'
										dur='2s'
										repeatCount='indefinite'
									></animate>
								</stop>
							</linearGradient>
						</defs>
					</svg>
				</div>
			))}
		</div>
	);
};

export default Loading;
