import Unsubscribe from '@components/ThankU/Unsubscribe';
import {useRouter} from 'next/router';
const Email = () => {
	const router = useRouter();
	const pathdata = router.query;
	// const sessionid = pathdata.slug.split('?')[0];
	return (
		<p>
			<Unsubscribe data={{pathdata}} />
		</p>
	);
};

export default Email;
