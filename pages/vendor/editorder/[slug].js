import {useRouter} from 'next/router';

import EditOrder from '@components/MultiVendor/ManageOrders/EditOrder';

const EditOrders = () => {
	const router = useRouter();
	const pathdata = router.query;
	return (
		<>
			<p>
				<EditOrder data={pathdata} />
			</p>
		</>
	);
};

export default EditOrders;
