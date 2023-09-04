import {useRouter} from 'next/router';

import {EditReturnOrder} from '@components/MultiVendor/ManageReturns';

const EditReturnOrders = () => {
	const router = useRouter();
	const pathdata = router.query;
	return (
		<>
			<p>
				<EditReturnOrder data={pathdata} />
			</p>
		</>
	);
};

export default EditReturnOrders;
