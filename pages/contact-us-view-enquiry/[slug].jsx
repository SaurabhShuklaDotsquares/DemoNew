import {useRouter} from 'next/router';

import ContactUsViewDetailEnquiry from '@components/ContactUsEnquiry/ContactUsViewDetailEnquiry';

const ContactUsViewEnquiry = () => {
	const router = useRouter();
	const pathdata = router.query;
	return <ContactUsViewDetailEnquiry data={pathdata} />;
};

export default ContactUsViewEnquiry;
