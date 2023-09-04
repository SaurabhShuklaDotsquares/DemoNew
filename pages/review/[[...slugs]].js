/* eslint-disable no-console */
import React from 'react';

import Review from '@components/Reviews/Review';
import {api} from '@utils/api';

const index = data => {
	return (
		<div>
			<Review data={data || {}} />
		</div>
	);
};

index.auth = true;
export default index;

export async function getServerSideProps(context) {
	const {query} = context;
	try {
		if (!context.req?.cookies?.userAuth)
			return {
				props: {},
			};

		const getResult = await api({
			url: `/order/${query.slugs[0]}/${query.slugs[1]}`,
			headers: {
				Authkey: JSON.parse(context.req?.cookies?.userAuth)?.auth_key,
				Authentication: `Bearer ${context.req?.cookies?.token}`,
			},
		});

		var values = {order_id: query.slugs[0], product_id: query.slugs[1]};
		if (getResult?.data) {
			return {
				props: {...getResult.data, ...values},
			};
		} else {
			return {
				props: {values},
			};
		}
	} catch (error) {
		return {
			props: {},
		};
	}
}
