/* eslint-disable no-console */
import React from 'react';
import ThankU from '@components/ThankU/ThankU';
const index = props => {
	return (
		<div>
			<ThankU props={props || {}} />
		</div>
	);
};

index.auth = true;
export default index;

export async function getServerSideProps(context) {
	const {query} = context;
	try {
		return {
			props: query,
		};
	} catch (error) {
		console.log('klg-26', error);
		// console.log({e});
	}
}
