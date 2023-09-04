import dynamic from 'next/dynamic';

const Header = dynamic(() => import('./Common/Header/Header'), {ssr: false});
const Footer = dynamic(() => import('./Common/Footer/Footer'), {ssr: false});

function Layout({children, ...rest}) {
	return (
		<>
			<Header categories={rest.categories} />
			{children}
			<Footer pages={rest.pages} />
		</>
	);
}

export default Layout;
