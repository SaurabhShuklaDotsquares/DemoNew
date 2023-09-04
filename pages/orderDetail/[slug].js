/* eslint-disable no-console */
import React from 'react';

import OrderDetail from '@components/Order/OrderDetail';
// import UserService from '@utils/ProductDetailServices';
// import { api } from '@utils/api';

const meta = {
	title: '',
	description: '',
};

const index = () => {
	meta.title = 'orderDetail';
	return (
		<div>
			{/* <OrderDetail data={data || {}} /> */}
			<OrderDetail />
		</div>
	);
};

index.meta = meta;

// export async function getServerSideProps(context) {
// 	console.log("Slug From Server ", context?.query);
// 	//const router = useRouter();
// 	const { query } = context;
// 	//	console.log("SLUG ", context?.query);
// 	try {
// 		if (context.req?.cookies?.userAuth) {
// 			// return {
// 			// 	props: {},
// 			// };
// 			const getResult = await api({
// 				url: `/order/${query.slug}`,
// 				headers: {
// 					Authkey: JSON.parse(context.req?.cookies?.userAuth)?.api_token,
// 					Authentication: `Bearer ${context.req?.cookies?.token}`,
// 				},
// 			});
// 			console.log("PROPS ", getResult);
// 			return {
// 				props: { data: getResult },
// 			};
// 		}
// 		else {
// 			const getResult = await UserService.getOrderDetail(query?.slug);
// 			return {
// 				props: { data: getResult },
// 			};
// 		}
// 	}
// 	catch (error) {
// 		return {
// 			props: { data: [] },
// 		};
// 	}
// }

export default index;
