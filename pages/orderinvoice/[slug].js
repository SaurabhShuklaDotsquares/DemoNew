import {useRouter} from 'next/router';

import OrderInvoice from '@components/OrderInvoice/OrderInvoice';

OrderInvoice.meta = {
	title: 'DS Newsletter',
};

const OrderInvoices = () => {
	const router = useRouter();
	const pathdata = router.query;
	return (
		<>
			<p>
				<OrderInvoice data={pathdata} />
			</p>
		</>
	);
};

export default OrderInvoices;
