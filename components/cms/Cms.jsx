/** @format */
import React, {useCallback} from 'react';
import {useRouter} from 'next/router';

function Cms(props) {
	const {cmsdata} = props;
	const router = useRouter();

	const html = cmsdata;

	const handleAnchorClick = useCallback(
		e => {
			e.preventDefault();

			const targetLink = e.target.closest('a');
			if (!targetLink) return;
			const pathname = targetLink.href;

			router.push(pathname);
		},
		[router],
	);

	return (
		<>
			<div
				className='foral-editor container'
				id='content-area'
				onClick={handleAnchorClick}
				onKeyPress={handleAnchorClick}
				dangerouslySetInnerHTML={{
					__html: html,
				}}
			></div>
		</>
	);
}

export default Cms;
