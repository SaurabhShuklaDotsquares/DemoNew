import React from 'react';
import classnames from 'classnames';
import {usePagination, DOTS} from './usePagination';
import style from '../../styles/pagination.module.scss';

const Pagination = props => {
	const {
		onPageChange,
		totalCount,
		siblingCount = 1,
		currentPage,
		pageSize,
		className,
	} = props;

	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	});

	if (currentPage === 0 || paginationRange.length < 2) {
		return null;
	}

	const onNext = () => {
		onPageChange(currentPage + 1);
	};

	const onPrevious = () => {
		onPageChange(currentPage - 1);
	};

	let lastPage = paginationRange[paginationRange.length - 1];
	return (
		<ul
			className={classnames(style.paginationContainer, {
				[className]: className,
			})}
		>
			<li
				className={`${currentPage === 1 ? style.disabled : ''} ${
					style.paginationItem
				}`}
				onClick={onPrevious}
			>
				<div>&laquo; Previous</div>
			</li>
			{paginationRange.map((pageNumber, i) => {
				if (pageNumber === DOTS) {
					return (
						<li
							key={i}
							className={`${style.paginationItem} ${style.dots}`}
						>
							&#8230;
						</li>
					);
				}

				return (
					<li
						key={i}
						className={`${
							pageNumber === currentPage ? style.selected : ''
						} ${style.paginationItem}`}
						onClick={() => onPageChange(pageNumber)}
					>
						{pageNumber}
					</li>
				);
			})}
			<li
				className={`${currentPage === lastPage ? style.disabled : ''} ${
					style.paginationItem
				}`}
				onClick={onNext}
			>
				<div>Next &raquo;</div>
			</li>
		</ul>
	);
};

export default Pagination;
