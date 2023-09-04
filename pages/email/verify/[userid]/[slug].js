import ThankRegister from '@components/ThankU/ThankRegister';
import {useRouter} from 'next/router';
const Email = () => {
	const router = useRouter();
	const pathdata = router.query;
	const sessionid = pathdata.slug.split('?')[0];
	return (
		<p>
			<ThankRegister data={{pathdata, sessionid}} />
		</p>
	);
};

export default Email;
