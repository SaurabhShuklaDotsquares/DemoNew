import {useRouter} from 'next/router';

// import EditProduct from '@components/MultiVendor/ManageProducts/EditProduct';
import AddProduct from '@components/MultiVendor/ManageProducts/AddProduct';

const EditProducts = () => {
	const router = useRouter();
	const pathdata = router.query;
	return <AddProduct data={pathdata} edit='edit' />;
};

export default EditProducts;
