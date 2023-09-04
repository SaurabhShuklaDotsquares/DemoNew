/* eslint-disable no-console */
import React from 'react';

import Productdetail from '@components/ProductDetail/ProductDetail';
import UserService from '@utils/ProductDetailServices';
import {api} from '@utils/api';

const meta = {
	title: '',
	description: '',
};
const index = props => {
	meta.title = 'productDetail';
	return (
		<div>
			<Productdetail productDetail={props.data.data || {}} />
		</div>
	);
};

index.meta = meta;

export async function getServerSideProps(context) {
	const {query} = context;
	const slug = query.slug[query.slug.length -1];
	try {
		if (context.req?.cookies?.userAuth) {
			const getResult = await api({
				url: `/product/product_detail/${slug}`,
				headers: {
					Authkey: JSON.parse(context.req?.cookies?.userAuth)
						?.api_token,
					Authentication: `Bearer ${context.req?.cookies?.token}`,
					Currency: context.req?.cookies?.currencyValue
						? context.req?.cookies?.currencyValue
						: 1,
				},
			});
			return {
				props: {data: getResult},
			};
		} else {
			const getResult = await UserService.getProductDetail(slug);
			return {
				props: {data: getResult.data},
			};
		}
	} catch (error) {
		console.log('klg-26', error.message);
		// console.log({e});
		return {
			props: {data: []},
		};
	}
}

export default index;
