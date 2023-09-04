/* eslint-disable import/order */
/* eslint-disable import/namespace */
import React, {useEffect, useCallback, useState} from 'react';
import dynamic from 'next/dynamic';
import {ToastContainer} from 'react-toastify';
import cookie from 'js-cookie';

import Layout from '@components/Layout';
import {withRouter, useRouter} from 'next/router';
import {AppProvider} from '@context/ContextApi';

import SiteMeta from '@components/Common/SiteMeta';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import '@styles/all.min.css';
import '@styles/style.css';
import '@styles/responsive.css';
import '@styles/developer.css';
import 'react-medium-image-zoom/dist/styles.css';
import 'react-alice-carousel/lib/alice-carousel.css';
import Loading from '@components/Common/Loading';
import {api} from '@utils/api';

const NextNProgress = dynamic(() => import('nextjs-progressbar'), {
	ssr: false,
});
let categoryCache;

setInterval(() => {
	categoryCache = null;
}, 30000);

const App = props => {
	const {Component, pageProps, categoryProps, cmsPages} = props;
	const router = useRouter();
	const [hydrate, setHydrate] = useState();
	const resetWindowScrollPosition = useCallback(
		() =>
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			}),
		[],
	);

	useEffect(() => {
		window.onbeforeunload = function () {
			resetWindowScrollPosition();
		};
		if (!cookie.get('token') && Component.auth) {
			router.push('/login');
		}
		return () => (window.onbeforeunload = null);
	}, [resetWindowScrollPosition]);

	useEffect(() => {
		setHydrate(true);
	}, []);

	if (!hydrate) return null;
	return (
		<>
			<SiteMeta meta={Component.meta}>
				<AppProvider>
					<NextNProgress
						color='#A9A9A9'
						startPosition={0.3}
						stopDelayMs={200}
						height={3}
						showOnShallow={true}
					/>

					{!cookie.get('token') && Component.auth ? (
						<Loading />
					) : (
						<Layout categories={categoryProps} pages={cmsPages}>
							<Component {...pageProps} />
						</Layout>
					)}
					<ToastContainer autoClose={2000} />
				</AppProvider>
			</SiteMeta>
		</>
	);
};

App.getInitialProps = async () => {
	let cmsPages = [];
	try {
		const pages = await api({
			// url: '/users/page-all',
			url: '/page-all',
		});

		cmsPages = pages.data;
	} catch (error) {
		console.log(error, 'error');
	}

	if (categoryCache) {
		return {categoryProps: categoryCache, cmsPages};
	}
	const categories = await api({
		url: '/category-list',
	});

	const categoryProps = categories.data;
	categoryCache = categoryProps;

	return {categoryProps, cmsPages};
};

export default withRouter(App);
