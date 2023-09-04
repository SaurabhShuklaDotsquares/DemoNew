import Document, {Html, Head, Main, NextScript} from 'next/document';

export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const originalRenderPage = ctx.renderPage;

		// Run the React rendering logic synchronously
		ctx.renderPage = () =>
			originalRenderPage({
				// Useful for wrapping the whole react tree
				enhanceApp: App => App,
				// Useful for wrapping in a per-page basis
				enhanceComponent: Component => Component,
			});

		// Run the parent `getInitialProps`, it now includes the custom `renderPage`
		const initialProps = await Document.getInitialProps(ctx);
		initialProps.cat = [{name: 'abc'}];
		return initialProps;
	}
	render() {
		return (
			<Html lang='en'>
				<Head>
					<div>
						<meta
							name='viewport'
							content='width=device-width, initial-scale=1, maximum-scale=1'
						/>
						<link
							rel='preconnect'
							href='https://fonts.gstatic.com'
						/>
						<link
							href='https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap'
							rel='stylesheet'
						/>
						<link
							rel='icon'
							type='image/png'
							sizes='16x16'
							href='/favicon.ico'
						></link>
						<link
							rel='stylesheet'
							href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css'
							integrity='sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg=='
							crossOrigin='anonymous'
							referrerPolicy='no-referrer'
						/>
					</div>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
