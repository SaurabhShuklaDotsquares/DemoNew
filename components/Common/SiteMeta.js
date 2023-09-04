import {NextSeo} from 'next-seo';

const SiteMeta = ({children, meta}) => {
	const DEFAULT_SEO = {
		title: meta?.title || 'E-Commerce Solution',
		description:
			meta?.description || 'An another shopping solution from Dotsquares',
		keywords: 'marketplace',
	};

	return (
		<>
			<NextSeo {...DEFAULT_SEO} />
			<>{children}</>
		</>
	);
};

export default SiteMeta;
