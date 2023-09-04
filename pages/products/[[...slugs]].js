// import Listing from '@components/Listing/Listing';
// import LayoutServices from '@utils/layoutService/layoutService';
import React from 'react';
// import {useRouter} from 'next/router';

import Listing from '@components/Listing/Listing';
// import LayoutServices from '@utils/layoutService/layoutService';

export default function Products() {
	return <Listing />;
}

// export async function getServerSideProps(context) {
// 	const {query} = context;
// 	// console.log('c..........c....', query);

// 	try {
// 		const getResult = await LayoutServices.getProductlist({
// 			category_slug: query.slugs[0],
// 		});
// 		console.log(' getResult.data', getResult.data);
// 		return {
// 			props: {...getResult.data, category_slug: query.slugs[0]},
// 		};
// 	} catch (e) {
// 		// eslint-disable-next-line no-console
// 		console.log({e});
// 	}
// }
