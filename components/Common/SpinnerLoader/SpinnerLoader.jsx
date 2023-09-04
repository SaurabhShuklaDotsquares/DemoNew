import React from 'react';

import styles from '@styles/loader.module.css';

const SpinnerLoader = ({loading}) => {
	return (
		<>
			<div
				className={
					loading
						? styles.loadingoverlayactive
						: styles.loadingoverlay
				}
			>
				<span className={styles.spinner}></span>
			</div>
		</>
	);
};

export default SpinnerLoader;
