import {useRouter} from 'next/router';

import ContactUsEnquiry from '@components/ContactUsEnquiry/ContactUsEnquiry';

const AddContactUsEnquiry = () => {
	const router = useRouter();
	const pathdata = router.query;
	return <ContactUsEnquiry data={pathdata} />;
};

export default AddContactUsEnquiry;
