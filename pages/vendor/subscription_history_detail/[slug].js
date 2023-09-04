/* eslint-disable react-hooks/rules-of-hooks */
import {useRouter} from 'next/router';

import History_Detail from '@components/MultiVendor/SubscriptionHistory/History_Detail';

const history_Details = () => {
	const router = useRouter();
	const pathdata = router.query;
	return <History_Detail data={pathdata} />;
};

export default history_Details;
