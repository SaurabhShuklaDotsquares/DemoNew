import React, {useMemo, useEffect} from 'react';
import {useRouter} from 'next/router';
import CommonBreadcrumbs from '@components/Common/Header/Breadcrumb/CommonBreadcrumbs';

import LeftPanel from './LeftPanel/LeftPanel';
import RightPanel from './RightPanel/RightPanel';
import {AppProvider, useListingContext} from './context';
import {useListingState} from './reducer';

const Listing = () => {
	const router = useRouter();
	const {state} = useListingContext();

	const {states, dispatch} = useListingState();

	useEffect(() => {
		dispatch({
			type: 'SET_DATA',
			data: {
				...states,
				sliderChange: [],
				sliderValChange: false,
			},
		});
		console.log(router?.query?.slugs);
	}, [router?.query?.slugs]);

	const breadcrumbs = useMemo(
		() =>
			state.breadcrumbs?.length
				? [
						...state.breadcrumbs.map(br => ({
							name: br.title,
							href:
								br.slug === router.query?.slugs?.[0]
									? ''
									: br.slug,
							active: br.slug === router.query?.slugs?.[0],
						})),
				  ]
				: [],
		[state.breadcrumbs],
	);

	return (
		<>
			<CommonBreadcrumbs breadcrumbs={breadcrumbs}></CommonBreadcrumbs>
			<div className='section pad-btm-sec'>
				<div className='container'>
					<div className='row no-gutters justify-content-between'>
						<LeftPanel />

						<RightPanel />
					</div>
				</div>
			</div>
		</>
	);
};

const Index = () => {
	return (
		<AppProvider>
			<Listing />
		</AppProvider>
	);
};
export default Index;
