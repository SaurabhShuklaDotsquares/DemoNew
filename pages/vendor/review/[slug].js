import {useRouter} from 'next/router';

import Review from '@components/MultiVendor/ManageReviews/ViewReview';

const ViewReview = () => {
	const router = useRouter();
	const pathdata = router.query;
	return (
		<>
			<p>
				<Review data={pathdata} />
			</p>
		</>
	);
};

export default ViewReview;
