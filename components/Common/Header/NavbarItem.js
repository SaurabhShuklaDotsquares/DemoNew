import React, {Fragment} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useRouter} from 'next/router';
import cookie from 'js-cookie';
import Link from 'next/link';

import {useGlobalContext} from '@context/ContextApi';

const NavbarItem = props => {
	const [show, setShow] = React.useState(false);
	const [indexValue, setIndexValue] = React.useState(0);
	const {state: globalState} = useGlobalContext();
	const routers = useRouter();

	const handleLogout = () => {
		sessionStorage.removeItem('userAuth');
		cookie.remove('userAuth');
		cookie.remove('token');
		let guesttoken = cookie.get('tokenguest');
		cookie.set('tokenguest', guesttoken);
		// router.push('/vendor/login');
		if (typeof window !== 'undefined') {
			window.location.replace('/vendor/login');
		}
	};

	const onClickOfManu = index => {
		setIndexValue(index);
		setShow(true);
	};

	const renderNavbaarData = (items, index) => {
		if (indexValue === index) {
			return (
				<>
					<NavDropdown.Item
						as={Link}
						href={`/products/${items.slug}`}
					>
						All {items.title}
					</NavDropdown.Item>
					{items.children.map((subItems, index) => (
						<Fragment key={index}>
							<NavDropdown.Divider />
							<NavDropdown.Item
								as={Link}
								href={`/products/${items.slug}/${subItems.slug}`}
								key={subItems.id}
							>
								{subItems.title}
							</NavDropdown.Item>
						</Fragment>
					))}
				</>
			);
		}
	};

	return (
		<Navbar
			variant='red'
			bg='red'
			expand='lg'
			style={{fontSize: `120%`, color: `#f8f9fa`}}
		>
			<Navbar.Toggle aria-controls='navbar-red-example' />
			<Navbar.Collapse id='navbar-red-example'>
				{globalState?.userAuth?.role === 2 ? (
					<>
						<Nav>
							<Link
								href='/vendor/dashboard'
								className={`${
									routers.asPath.split('?')[0] ===
									'/vendor/dashboard'
										? 'active'
										: ''
								} ${'vendor-menu'}`}
							>
								Dashboard
							</Link>
							<Link
								href='/vendor/account'
								className={`${
									routers.asPath.split('?')[0] ===
									'/vendor/account'
										? 'active'
										: ''
								} ${'vendor-menu'}`}
							>
								My Account
							</Link>
							<Link
								href='/vendor/manageproducts'
								className={`${
									routers.asPath.split('?')[0] ===
									'/vendor/manageproducts'
										? 'active'
										: ''
								} ${'vendor-menu'}`}
							>
								Manage Product
							</Link>
							<Link
								href='/vendor/manageorders'
								className={`${
									routers.asPath.split('?')[0] ===
									'/vendor/manageorders'
										? 'active'
										: ''
								} ${'vendor-menu'}`}
							>
								Manage Order
							</Link>
							<Link
								href='/vendor/reviews'
								className={`${
									routers.asPath.split('?')[0] ===
									'/vendor/reviews'
										? 'active'
										: ''
								} ${'vendor-menu'}`}
							>
								Manage Review
							</Link>
							<Link
								href='/vendor/managereturns'
								className={`${
									routers.asPath.split('?')[0] ===
									'/vendor/managereturns'
										? 'active'
										: ''
								} ${'vendor-menu'}`}
							>
								Manage Return
							</Link>

							<span
								onClick={handleLogout}
								className={'vendor-menu'}
							>
								Logout
							</span>
						</Nav>
					</>
				) : (
					<>
						<Nav>
							{props?.state?.resultCategorylist?.map(
								(items, index) => (
									<NavDropdown
										id='nav-dropdown-red-example'
										title={items.title}
										menuVariant='red'
										key={index}
										className='navs'
										renderMenuOnMount={true}
										show={show}
										onMouseEnter={() => {
											{
												setShow(true);
												setIndexValue(index);
											}
										}}
										onMouseLeave={() => setShow(false)}
										onClick={() => onClickOfManu(index)}
									>
										{renderNavbaarData(items, index)}
									</NavDropdown>
								),
							)}
						</Nav>
					</>
				)}
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavbarItem;
