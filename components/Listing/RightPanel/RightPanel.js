import React, { useState } from 'react';
import Pagination from 'react-responsive-pagination';
import {useRouter} from 'next/router';
import Loading from '@components/Common/Loading';
import {useListingContext} from '../context';
import ProductItem from './ProductItem';
import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';
import { useEffect } from 'react';

const RightPanel = () => {
	const {state, dispatch} = useListingContext();
	const router = useRouter();

	const [newUrl , setNewUrl]  = useState("");
	useEffect(()=>{
		if(router?.query?.slugs?.length > 0){
			var slugs = router.query.slugs;
			var newUrlData = "";
			slugs.map((item)=>{
				newUrlData = (newUrlData) ? newUrlData+"/"+item : item;
			});
			setNewUrl(newUrlData)
		}
	},[router.query.slugs])



	const handlePageChange = page => {
		dispatch({
			type: 'SET_DATA',
			data: {
				...state,
				currentPage: page,
			},
		});
		router.replace({
			query: {...router.query, page: page},
		});
		// router.push()
	};

	return (
		<>
			<SpinnerLoader loading={state?.productLoading} />
			{state?.productList?.length ? (
				<div className='right-panel' id='product_listing'>
					<h1>
						{router.pathname === '/products/search'
							? router.query?.search?.length
								? `Here are your results for: ${
										router.query?.search
								  } ${
										router.query?.name &&
										'in ' + router.query?.name
								  }`
								: `Here are your results for: All Products ${
										router.query?.name !== undefined
											? router.query?.name &&
											  'in ' + router.query?.name
											: ''
								  }`
							: null}
					</h1>
					<div className='row'>
						{state?.productList?.length &&
							state?.productList?.map((items, index) => (
								<div
									className='col-lg-4 col-md-6  col-sm-6'
									key={index}
								>
									<a href={`/product/${newUrl}/${items.slug}`}>
										<ProductItem
											key={items.slug}
											item={items}
										/>
									</a>
								</div>
							))}
					</div>

					<br />
					{state?.productList?.length ? (
						<Pagination
							maxWidth={30}
							current={parseInt(router?.query?.page ?? 1)}
							//current={parseInt(state?.currectPage)}
							//total={state?.TotalPage}
							total={state?.totalPages}
							onPageChange={handlePageChange}
						/>
					) : (
						''
					)}
				</div>
			) : (
				<div className='right-panel' id='product_listing'>
					<h1>
						{router.pathname === '/products/search'
							? router.query?.search?.length
								? `Here are your results for: ${
										router.query?.search
								  } ${
										router.query?.name &&
										'in ' + router.query?.name
								  }`
								: `Here are your results for: All Products ${
										router.query?.name &&
										'in ' + router.query?.name
								  }`
							: null}
					</h1>
					<div
						className='row'
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							marginRight: '-15px',
							marginLeft: '-15px',
						}}
					>
						<div className='col-md-12 text-center'>
							{state?.productLoading ? (
								<Loading />
							) : (
								<div
									role='alert'
									className='fade text-danger p-5 alert alert-danger show'
								>
									<div className='text-danger alert-heading h4'>
										Sorry, No Products found
									</div>
									Please select another category or search
									again
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default RightPanel;
