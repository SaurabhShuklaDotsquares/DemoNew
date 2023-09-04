import signup from '@components/Auth/Signup';

signup.meta = {
	title: 'Register | E-Commerce Solution',
};

export async function getServerSideProps(ctx) {
	const token = ctx.req.cookies.token;
	if (token) {
		return {
			redirect: {
				permanent: false,
				destination: '/dashboard',
			},
		};
	} else {
		return {props: {}};
	}
}

export default signup;
