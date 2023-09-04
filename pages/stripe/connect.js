import Connect from '@components/ThankU/Connect';
import {useRouter} from 'next/router';
const Email = () => {
	const router = useRouter();
	const pathdata = router.query;

	return (
		<p>
			<Connect pathdata={pathdata} />
		</p>
	);
};

export default Email;
