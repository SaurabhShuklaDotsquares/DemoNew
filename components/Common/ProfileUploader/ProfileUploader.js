/* eslint-disable no-console */
/* eslint-disable babel/camelcase */
/* eslint-disable @next/next/no-img-element */
import React, {memo, useCallback} from 'react';
import {toast} from 'react-toastify';
import cookie from 'js-cookie';

import {api} from '@utils/api';
import {useGlobalContext} from '@context/ContextApi';
// import UserService from '@utils/services';

const ProfileUploader = () => {
	const {isAuthenticated, state, dispatch} = useGlobalContext();

	const getUserCookie = () => {
		if (cookie && cookie.get('userAuth')) {
			return JSON.parse(cookie.get('userAuth'));
		} else return {};
	};
	getUserCookie('userAuth');

	// console.log('profile', cookiedata);

	const updateProfileDetail = useCallback(async (giveData, optionHeader) => {
		if (!isAuthenticated) return;
		const response = await api({
			url: '/users/profile-update',
			method: 'POST',
			headers: optionHeader,
			data: giveData,
		});
		return response;
	}, []);

	const onUploadImage = async e => {
		const file = e.target.files[0];
		if (!file) return;
		var fileSize = Math.round(file?.size / 1024);

		if (fileSize >= 1024) {
			toast.warning('File too Big, please select a file less than 1mb');
			return;
		}

		const formData = new FormData();
		formData.append('name', file.name);
		formData.append('profile_pic', file);
		try {
			const optionHeader = {'Content-Type': 'multipart/form-data'};
			const response = await updateProfileDetail(formData, optionHeader);
			if (response.status) {
				// console.log("Response ", response);
				toast.success(response.message);
				dispatch({
					type: 'SET_DATA',
					data: {
						...state,
						userAuth: {
							...state.userAuth,
							data: {
								...state?.userAuth?.data,
								...response.data,
							},
						},
					},
				});
				location.reload();
			} else {
				toast.warning(
					'Please select vaild file format(.png .jpg .jpeg)',
				);
				e.target.value = null;
			}
		} catch (e) {
			// eslint-disable-next-line no-console
			console.log({e});
		}
	};

	const image_url =
		state?.userAuth?.data?.profile_pic ??
		state?.userAuth?.profile_pic ??
		'/assets/images/placeholder.png';

	return (
		<>
			<div className='edit-profile-set'>
				<div className='profile-change-section text-center'>
					<figure>
						<img
							src={image_url}
							alt='profile'
							className='user-img'
						/>

						<div className='upload-image'>
							<img
								src='/assets/images/camera.png'
								alt='upload-icon'
							/>
							<form>
								<input
									type='file'
									accept={'image/*'}
									onChange={onUploadImage}
									className='file-btn'
								/>
							</form>
						</div>
					</figure>
					<span className='profile-user-name'>
						{state?.userAuth?.firstname
							? `${state?.userAuth?.firstname} ${state?.userAuth?.lastname}`
							: 'User'}
					</span>
				</div>
			</div>
		</>
	);
};

export default memo(ProfileUploader);
