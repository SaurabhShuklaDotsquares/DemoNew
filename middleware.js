/* eslint-disable no-console */
/* eslint-disable babel/camelcase */
import {NextResponse} from 'next/server';
// eslint-disable-next-line import/no-unresolved

// This function can be marked `async` if using `await` inside
export function middleware(request) {
	console.log('middleware');
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: [
		'/vendor/dashboard',
		'/vendor/account',
		'/vendor/manageproducts',
		'/vendor/manageorders',
		'/vendor/reviews',
	],
};
