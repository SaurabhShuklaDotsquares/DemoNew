import Home from '@components/Home/Home';

import styles from '../styles/Home.module.css';

const Index = () => {
	return (
		<div className={styles.container}>
			<Home />
		</div>
	);
};

Index.meta = {
	title: 'E-Commerce Solution',
	description: 'An another solution',
};
export default Index;
