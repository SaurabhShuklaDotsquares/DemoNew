import {useRouter} from 'next/router';
import ErrorPage from 'next/error';

import Cms from '@components/cms/Cms';
import Loading from '@components/Loading';
import {api} from '@utils/api';

const Page = props => {
	const {cmsdata} = props;
	console.log("params.slug",params.slug);
	const router = useRouter();
	if (!router.isFallback && !cmsdata) {
		return <ErrorPage statusCode={404} />;
	}

	return router.isFallback ? (
		<Loading />
	) : (
		<>
			<Cms cmsdata={cmsdata}></Cms>
			<div id='dynamicstyle'></div>
		</>
	);
};

export async function getStaticProps({params}) {
	try {
		const slug = params && params.slug ? params.slug.join('/') : '/';
		const props = await getCmsPageProps(slug);

		let meta = {};
		if (props && props.result && props.result.data) {
			const page = props.result.data;
			meta = {
				title: page.meta_title,
				description: page.meta_description,
				keywords: page.meta_keyword,
			};
		}
		return {
			props: {
				cmsdata: props?.result?.data?.description || null,
				meta,
			},
			revalidate: 60 * 15,
		};
	} catch (error) {
		console.log(error.message);
	}
	
}

export async function getStaticPaths() {
	const pages = await api({
		// url: '/users/page-all',
		url: '/page-all',
	});

	const paths =
		pages.data &&
		pages.data.filter(item => {
			item.slug !== 'term-policy' ||
				item.slug !== 'about-us' ||
				item.slug !== 'contact-us';
		});

	return {
		paths:
			(paths &&
				paths.map(node =>
					node.slug === '/' ? `${node.slug}` : `/${node.slug}`,
				)) ||
			[],
		fallback: true,
	};
}

async function getCmsPageProps(path) {
	try {
		let result = await api({
			// url: `/users/page-all?slug=${path}`,
			url: `/page-all?slug=${path}`,
			method: 'get',
		});

		return {
			result,
		};
	} catch (e) {
		return [];
	}
}

Page.Layout = true;
export default Page;
