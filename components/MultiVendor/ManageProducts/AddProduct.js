import React, {useState, useRef, useEffect} from 'react';
import AccountSidebar from '@components/Common/Account/AccountSidebar';
import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';
import StepNavigation from './Stepper/stepNavigation';
import {api} from '@utils/api';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';
import dynamic from 'next/dynamic';
import Select from 'react-select';
import {confirmDialog} from '@utils/helper';

const importJodit = () => import('jodit-react');

const JoditEditor = dynamic(importJodit, {ssr: false});

const AddProduct = props => {
	var selectInputRef = useRef(null);

	const editor = useRef(null);
	const router = useRouter();
	const [inputs, setInputs] = useState({status: 1});
	const [currentStep, updateCurrentStep] = useState(1);
	const [loading, setLoading] = useState(false);
	const [validateError, setValidateError] = useState({});
	const [isEditable, setIsEditable] = useState(false);
	const [categoryOptions, setCategoryOptions] = useState([]);
	const [countryOfManufactureOptions, setCountryOfManufactureOptions] =
		useState({});
	const [brandOptions, setBrandOptions] = useState({});
	const [attributeOptions, setAttributeOptions] = useState();
	const [showMerge, setShowMerge] = useState(true);
	const [attributeValueOptions, setAttributeValueOptions] = useState({});
	const [valueAttribute, setValueAttribute] = useState([]);
	const [productImage, setProductImage] = useState(null);
	const [selectedFile, setSelectedFile] = useState();
	const [preview, setPreview] = useState();
	const [subValueAttribute, setSubValueAttribute] = useState({});
	const [varientImage, setVarientImage] = useState([]);
	const [inputValues, setInputValues] = useState([]);
	const [subatVal, setSubatVal] = useState(0);
	const [editProductId, setEditProductId] = useState([]);
	const [discountPriceStatus, setDiscountedPriceStatus] = useState(false);
	const [valueDel, setValueDel] = useState(false);

	let combinationValue = [];
	let combinationValueId = [];
	const [combinationValueDel, setCombinationValueDel] = useState([]);
	const [productAttriDetail, setProductAttriDetail] = useState([]);

	useEffect(() => {
		const newSubValueAttribute = {};

		for (const item of valueAttribute) {
			const key = item.label;
			if (subValueAttribute[key]) {
				newSubValueAttribute[key] = subValueAttribute[key];
			}
		}
	}, [valueAttribute]);

	function handleChangeInputVal(index, event) {
		const {name, value} = event.target;
		setInputValues(prevData => {
			const newData = [...prevData];
			newData[index] = {
				...newData[index],
				[name]: value,
			};
			return newData;
		});
		setSubatVal(subatVal + 1);
	}
	useEffect(() => {
		setSubValueAttribute(subValueAttribute);
	}, [subatVal]);

	const labelArray = [
		'Product Basic information',
		'Product attributes',
		'Product Images',
		'Product stocks',
	];
	const checkArrays = () => {
		for (const key in subValueAttribute) {
			if (
				Array.isArray(subValueAttribute[key]) &&
				subValueAttribute[key].length === 0
			) {
				return key;
			}
		}
		return false;
	};

	const updateStep = step => {
		const result = validate(inputs);
		if (step === 2) {
			if (Object.keys(result).length) {
				setValidateError(result);
			} else {
				setValidateError({});
				updateCurrentStep(step);
			}
			return;
		}
		if (currentStep === 3) {
			if (selectedFile === undefined && productImage === null) {
				setValidateError({
					...validateError,
					imageValidate: 'Please Upload Product Image.!',
				});
				toast.warn('Please Upload Product Image.!');
				return;
			}
			if (checkArrays()) {
				toast.error(
					'Please select at least one option for each attribute',
				);
				return;
			}
		}
		if (currentStep === 2) {
			const emptyArrayName = checkArrays();
			if (emptyArrayName) {
				toast.error(
					`Please select at least one option for ${emptyArrayName}.!`,
				);
				return;
			}
		}
		if (Object.keys(result).length) {
			setValidateError(result);
		} else {
			setValidateError({});
			updateCurrentStep(step);
		}
		window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
	};

	const handleChange = event => {
		const name = event.target.name;
		const value = event.target.value.replace(/^\s/, '');
		setInputs(values => ({
			...values,
			[name]: value,
		}));
		let nameofError = event.target.name;
		setValidateError({
			...validateError,
			[nameofError]: '',
		});
	};

	const handleChangeCheckbox = event => {
		const name = event.target.name;
		const checked = event.target.checked ? 1 : 0;
		setInputs({
			...inputs,
			[name]: checked,
		});
	};

	useEffect(() => {
		if (!selectedFile) {
			setPreview(undefined);
			return;
		}
		const objectUrl = URL.createObjectURL(selectedFile);
		setPreview(objectUrl);
		return () => URL.revokeObjectURL(objectUrl);
	}, [selectedFile]);

	const handleChangeMultiSelect = data => {
		let objArr = {};

		for (let i = 0; i < data.length; i++) {
			objArr[data[i].label] = [];
		}
		setShowMerge(true);
		setValueAttribute(data);
		for (const key in subValueAttribute) {
			for (const value of subValueAttribute[key]) {
				objArr[key]?.push(value);
			}
		}
		setSubValueAttribute(objArr);
	};

	const handleChangeMultiAttributeSelect = (event, itemName, itemValue) => {
		setValueDel(true);
		for (let i = 0; i < event.length; i++) {
			event[i].attributeId = itemValue;
		}
		setSubValueAttribute(prevState => ({
			...prevState,
			[itemName]: prevState[itemName] ? event : event,
		}));
	};

	const onClear = () => {
		// e.preventDefault();
		setShowMerge(true);
		setValueAttribute('');
		setSubValueAttribute([]);
		setVarientImage([]);
		setEditProductId([]);
		setInputValues([]);
		setCombinationValueDel([]);
	};
	const handleChangeImageVarient = e => {
		let file = e.target.files[0];
		if (file && file.type.startsWith('image/')) {
			setVarientImage([...varientImage, file]);
		} else {
			setSelectedFile(undefined);
			toast.warn(`Please select proper image file format (jpeg,jpg,png)`);
		}
	};

	const handleChangeImage = e => {
		let file = e.target.files[0];
		if (file && file.type.startsWith('image/')) {
			setSelectedFile(file);
		} else {
			setSelectedFile(undefined);
			toast.warn(`Please select proper image file format (jpeg,jpg,png)`);
		}
	};
	function removeDuplicates(editProductId) {
		return editProductId.filter(
			(item, index) => editProductId.indexOf(item) === index,
		);
	}
	const handleSubmit = async event => {
		event.preventDefault();
		setLoading(true);

		const result = validate(inputs);
		if (Object.keys(result).length) {
			setValidateError(result);
		} else {
			setValidateError({});
			let optionData = [];

			if (discountPriceStatus) {
				setLoading(false);

				return;
			}
			let uniqueVal = removeDuplicates(editProductId);

			Object.keys(subValueAttribute).forEach(attribute => {
				subValueAttribute[attribute].forEach(value => {
					optionData.push(value);
				});
			});

			const groupedAttributes = optionData.reduce((acc, cur) => {
				if (!acc[cur.attributeId]) {
					acc[cur.attributeId] = [];
				}
				acc[cur.attributeId].push(cur.value);
				return acc;
			}, {});
			const isFieldsValid = inputValues.every(
				field => field.regular_price && field.available_stock,
			);
			if (isFieldsValid) {
				console.log(inputValues);
			} else {
				toast.warn('Please fill all Regular Price and stock fields !.');
				setLoading(false);

				return;
			}

			let formData = new FormData();

			for (let i = 0; i < inputValues.length; i++) {
				Object.keys(inputValues[i]).forEach(attribute => {
					if (attribute === 'regular_price') {
						formData.append(
							`attribute[${i}][regular_price]`,
							parseInt(inputValues[i][attribute]),
						);
					}
					if (attribute === 'discount_price') {
						if (inputValues[i][attribute]) {
							formData.append(
								`attribute[${i}][price]`,
								parseInt(inputValues[i][attribute]),
							);
						}
					}
					if (attribute === 'available_stock') {
						formData.append(
							`attribute[${i}][stock]`,
							parseInt(inputValues[i][attribute]),
						);
					}
				});
			}
			for (let i = 0; i < varientImage.length; i++) {
				formData.append(`attribute[${i}][images][]`, varientImage[i]);
			}

			for (let i = 0; i < combinationValueDel.length; i++) {
				formData.append(
					`attribute[${i}][id]`,
					Object.keys(combinationValueId[i])
						.map(key => `${combinationValueId[i][key]}`)
						.join(','),
				);
			}
			for (let i = 0; i < combinationValueDel.length; i++) {
				formData.append(
					`attribute[${i}][attribute]`,
					Object.keys(combinationValueDel[i])
						.map(
							key =>
								`${key.toLowerCase()}:${
									combinationValueDel[i][key]
								}`,
						)
						.join(', '),
				);
			}

			if (isEditable) {
				for (let i = 0; i < combinationValueDel.length; i++) {
					formData.append(
						`attribute[${i}][product_attribute_id]`,
						uniqueVal[i],
					);
				}
			}

			for (const attributeId in groupedAttributes) {
				if (
					Object.hasOwnProperty.call(groupedAttributes, attributeId)
				) {
					const key = `attribute_options[${attributeId}][]`;
					const values = groupedAttributes[attributeId];
					formData.append(key, values);
				}
			}
			formData.append('category_id', inputs.category_id);
			formData.append('brand_name', inputs.brand_name);
			formData.append('title', inputs.title);
			formData.append(
				'status',
				inputs.status === undefined ? 1 : inputs.status,
			);
			formData.append('stock', inputs.stock ? inputs.stock : 100);
			// Object.keys(subValueAttribute).length > 0
			// ? ''
			// : formData.append('stock', inputs.stock);

			formData.append('sku', inputs.sku);
			formData.append(
				'country_of_manufacture',
				inputs.country_of_manufacture,
			);
			formData.append('price', inputs.price);
			formData.append(
				'discounted_price',
				inputs.discounted_price === undefined
					? 0
					: inputs.discounted_price,
			);
			formData.append('long_description', inputs.long_description);
			formData.append(
				'is_featured',
				inputs.is_featured === undefined ? 1 : inputs.is_featured,
			);
			formData.append(
				'show_notes',
				inputs.show_notes === undefined ? 1 : inputs.show_notes,
			);
			formData.append(
				'status',
				inputs.status === undefined ? 1 : inputs.status,
			);
			formData.append('images[]', selectedFile ? selectedFile : []);

			if (isEditable === true) {
				try {
					const response = await api({
						url: `/vendor/product/update/${props.data.slug}`,
						method: 'POST',
						data: formData,
					});
					if (response.error) {
						toast.error(response.message);
						setLoading(false);
					} else {
						toast.success('Product saved successfully..!!');

						// setLoading(false);
						setInputs({});
						router.push('/vendor/manageproducts');
					}
				} catch (error) {
					setLoading(false);
				}
			}
			if (isEditable === false) {
				try {
					const response = await api({
						url: '/vendor/product/store',
						method: 'POST',
						data: formData,
					});
					if (response.error) {
						setLoading(false);
						toast.error(response.message);
					} else {
						router.push('/vendor/manageproducts');
						setLoading(false);

						toast.success('Product added successfully..!!');
						setInputs({});
					}
				} catch (error) {
					setLoading(false);
				}
			}
		}
	};

	const validate = values => {
		const errors = {};
		if (!values.category_id) {
			errors.category_id = 'Please Select Product Category';
		}
		if (!values.brand_name) {
			errors.brand_name = 'The brand name field is required.';
		}
		if (!values.title) {
			errors.title = 'Please Enter Product Name';
		}
		if (!values.sku) {
			errors.sku = 'The sku field is required.';
		}
		if (!values.country_of_manufacture) {
			errors.country_of_manufacture =
				'The country of manufacture field is required.';
		}
		if (!values.price) {
			errors.price = 'The price field is required.';
		} else if (!Number(values.price)) {
			errors.price = 'The price field should be numeric';
		}
		if (!values.long_description) {
			errors.long_description = 'Please Enter Min 50 Words Description';
		} else if (!(values.long_description.length >= 50)) {
			errors.long_description =
				'The long description must be at least 50 characters.';
		}
		return errors;
	};

	const handleGetProductById = async () => {
		const {edit} = props;
		if (edit === 'edit') {
			setIsEditable(true);
			try {
				setLoading(true);
				const response = await api({
					url: `/vendor/product/view/${props.data.slug}`,
					method: 'GET',
				});
				if (response) {
					setLoading(false);

					setInputs(response.data.product);
					setProductAttriDetail(
						response?.data?.product.product_attribute_detail,
					);

					let valueAttributeDatas = [];
					let valueAttObj = {};

					const dataSubAttribute = {};
					setEditProductId([]);
					let productAttriId = [];
					response?.data?.product?.product_attribute.forEach(
						element => {
							valueAttObj.value = element.attribute_detail.id;
							valueAttObj.label = element.attribute_detail.title;
							valueAttributeDatas.push({
								...valueAttObj,
							});

							element.attribute_values_detail.forEach(
								subAttribute => {
									const {
										title: attributeTitle,
										id: attributeId,
									} = element.attribute_detail;

									if (!dataSubAttribute[attributeTitle]) {
										dataSubAttribute[attributeTitle] = [];
									}

									dataSubAttribute[attributeTitle].push({
										value: subAttribute.id,
										label: subAttribute.title,
										attributeId: attributeId,
									});
								},
							);
						},
					);

					setSubValueAttribute(dataSubAttribute);

					response?.data?.product?.product_attribute_detail?.map(
						variant => {
							productAttriId.push(variant.id);
						},
					);
					setEditProductId(productAttriId);
					const inputValues =
						response?.data?.product?.product_attribute_detail?.map(
							variant => {
								const {regular_price, price, stock} = variant;

								return {
									regular_price,
									discount_price: price,
									available_stock: stock,
								};
							},
						);

					// Object.keys(dataSubAttribute).forEach(key => {
					// const arrayLength = inputValues.length;
					// if (arrayLength <= dataSubAttribute[key].length) {
					// const valuesToAdd = inputValues
					// .map(obj => obj[key])
					// .slice(dataSubAttribute[key].length * -1);
					// const filteredValues = valuesToAdd.filter(
					// value => value !== undefined,
					// );
					// dataSubAttribute[key].splice(
					// 0,
					// dataSubAttribute[key].length - arrayLength,
					// ...filteredValues,
					// );
					// }
					// });

					// Object.keys(inputValues[0]).forEach(key => {
					// // eslint-disable-next-line no-prototype-builtins
					// if (dataSubAttribute.hasOwnProperty(key)) {
					// const valuesToAdd = inputValues
					// .map(obj => obj[key])
					// .slice(dataSubAttribute[key].length * -1);
					// dataSubAttribute[key].push(...valuesToAdd);
					// }
					// });
					setInputValues(inputValues);
					setValueAttribute(valueAttributeDatas);

					response.data.product.product_image &&
						response.data.product.product_image.map(image => {
							setProductImage(image);
						});
				}
			} catch (error) {
				setLoading(false);
			}
		} else {
			setIsEditable(false);
		}
	};

	const getSelectedProducts = async () => {
		var DataValue = [];

		try {
			const response = await api({
				url: `/vendor/product/create`,
				method: 'GET',
			});
			if (response) {
				setCategoryOptions(response.data.category);
				setBrandOptions(response.data.brand);
				setCountryOfManufactureOptions(response.data.countries);

				response.data.attributes.map(res => {
					DataValue.push({value: res.id, label: res.title});
					var DataOptionsValue = [];
					res.option_values_show.map(attributeOption => {
						DataOptionsValue.push({
							value: attributeOption.id,
							label: attributeOption.title,
						});
					});
					setAttributeValueOptions(prev => ({
						...prev,
						[res.id]: DataOptionsValue,
					}));
				});

				setAttributeOptions(DataValue);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const showCategory = () => {
		return categoryOptions.map((category, i) => {
			return (
				<>
					<option value={category.id} key={i}>
						{category.title}{' '}
					</option>
					{category.children.map((subcategory, i) => {
						return (
							<option value={subcategory.id} key={i}>
								{' - '}
								{subcategory.title}{' '}
							</option>
						);
					})}{' '}
				</>
			);
		});
	};

	const showCountryOfManufacture = () => {
		return Object.keys(countryOfManufactureOptions).map((key, i) => {
			return (
				<option value={key} key={i}>
					{countryOfManufactureOptions[key]}{' '}
				</option>
			);
		});
	};
	const showBrand = () => {
		return Object.keys(brandOptions).map((key, i) => {
			return (
				<option value={key} key={i}>
					{brandOptions[key]}{' '}
				</option>
			);
		});
	};

	useEffect(() => {
		handleGetProductById();
	}, [props.edit]);

	useEffect(() => {
		getSelectedProducts();
	}, []);

	useEffect(() => {
		if (isEditable === false) {
			setCombinationValueDel(combinationValue);
		}
	}, [currentStep === 3 && valueDel === true]);
	useEffect(() => {
		if (isEditable === false) {
			setValueDel(false);
		}
	}, [currentStep === 4]);
	useEffect(() => {
		if (isEditable === false) {
			if (inputValues.length < 0) {
				const inputValues = combinationValue.map(() => ({
					regular_price: '',
					discount_price: '',
					available_stock: '',
				}));
				setInputValues(inputValues);
			}
		}
	}, [currentStep === 4]);

	useEffect(() => {
		if (isEditable === false && inputValues.length === 0) {
			let inputValue = [];
			for (let i = 0; i < combinationValue.length; i++) {
				inputValue.push({
					regular_price: '',
					discount_price: '',
					available_stock: '',
				});
			}
			setInputValues(inputValue);
		}
	}, [currentStep === 3]);

	// useEffect(() => {
	// if (isEditable === true) {
	// const numAdditionalItems =
	// combinationValue.length - inputValues.length;
	// const newItems = [];
	// for (let i = 0; i < numAdditionalItems; i++) {
	// newItems.push({
	// regular_price: '',
	// discount_price: '',
	// available_stock: '',
	// });
	// }
	// setInputValues([...inputValues, ...newItems]);
	// }
	// }, [valueDel === true])

	let valueObject =
		Object.keys(subValueAttribute).length > 0
			? {
					name: 'mahaveer',
			  }
			: {};

	const deleteAttributehandle = async index => {
		const confirm = await confirmDialog(
			'Are you really want to delete this product',
		);
		if (confirm) {
			const newArray = [...combinationValueDel];
			newArray.splice(index, 1);
			setCombinationValueDel(newArray);
			const newArrayInput = [...inputValues];
			newArrayInput.splice(index, 1);
			setInputValues(newArrayInput);
			toast.success('Varient Deleted Successfully!!');
		}
	};

	useEffect(() => {
		if (isEditable === true && valueDel === false) {
			const output = combinationValue.slice(0, inputValues.length);

			setCombinationValueDel(output);
		}
		// setValueDel(false)
	}, [currentStep === 3]);

	useEffect(() => {
		if (isEditable === false) {
			setCombinationValueDel(combinationValue);
		}

		// setValueDel(false)
	}, [valueDel === true]);
	useEffect(() => {
		if (isEditable === true) {
			setCombinationValueDel(combinationValue);
			const numAdditionalItems =
				combinationValue.length - inputValues.length;
			const newItems = [];
			for (let i = 0; i < numAdditionalItems; i++) {
				newItems.push({
					regular_price: '',
					discount_price: '',
					available_stock: '',
				});
			}
			setInputValues([...inputValues, ...newItems]);
		}
		// setValueDel(false)
	}, [valueDel === true && currentStep === 3]);

	useEffect(() => {
		onClear();
	}, [combinationValueDel.length === 0 && currentStep === 4]);

	useEffect(() => {
		if (isEditable === true) {
			if (combinationValueDel && combinationValueDel.length > 0) {
				const attributeKeys = Object.keys(combinationValueDel[0]);

				const combinationValueDelNew = [];
				for (const detail of productAttriDetail) {
					const attributes = detail.variant_text.split(', ');
					const variant = {};
					for (const attribute of attributes) {
						const [key, value] = attribute.split(':');
						variant[key] = value;
					}
					const match = combinationValueDel.find(item => {
						return attributeKeys.every(key => {
							return item[key] === variant[key];
						});
					});
					if (match) {
						combinationValueDelNew.push(match);
					} else {
						combinationValueDelNew.push(variant);
					}
				}

				setCombinationValueDel(combinationValueDelNew);
			}
		}

		// const combinationValueDel = [
		// 	{Size: '7', Color: 'Red', Fabric: 'Cotton'},
		// 	{Size: '7', Color: 'Red', Fabric: 'Silk'},
		// 	{Size: '7', Color: 'Green', Fabric: 'Cotton'}
		//   ];
		//   const productAttriDetail = [
		// 	{ variant_text: 'size:7, color:Red, fabric:Cotton'},
		// 	{variant_text: 'size:7, color:Green, fabric:Cotton'},
		// 	{variant_text: 'size:7, color:Pink, fabric:Cotton'}
		//   ];

		//   const attributeKeys = ['Size', 'Color', 'Fabric'];
	}, [currentStep === 3 && valueDel === false]);

	return (
		<>
			<SpinnerLoader loading={loading} />
			<section>
				<div className='container'>
					<div className='row'>
						<div className='col-md-3'>
							<AccountSidebar />
						</div>
						<div
							className='col-md-9'
							style={{
								boxShadow:
									'1px 1px 42px 1px rgb(189 189 189 / 20%)',
							}}
						>
							<div className='container mt-4'>
								<div className='row'>
									<div className='col-md-12'>
										<span style={{fontSize: '1.5rem'}}>
											{isEditable === true
												? 'EDIT PRODUCT'
												: 'ADD PRODUCT'}{' '}
										</span>
									</div>
								</div>
							</div>
							<section>
								<form
									method='POST'
									acceptCharset='UTF-8'
									encType='multipart/form-data'
								>
									<input
										name='_token'
										type='hidden'
										value='MrrOidSJPLGUkaB0klbDYNmIzf5IfHJXaBnSG3dh'
									/>
									<div>
										<StepNavigation
											labelArray={labelArray}
											currentStep={currentStep}
											updateStep={updateStep}
										></StepNavigation>
										{currentStep === 1 ? (
											<section
												id='step-1'
												className='form-step'
											>
												<div className='container mt-3'>
													<div className='row'>
														<div className='col-md-6'>
															<label htmlFor='category_id'>
																Selected
																Category:{' '}
																<span className='required'>
																	*
																</span>
															</label>
															<select
																value={
																	inputs.category_id ||
																	''
																}
																onChange={
																	handleChange
																}
																className='form-control'
																name='category_id'
															>
																<option
																	value=''
																	selected='selected'
																>
																	Select
																	Category
																</option>
																{showCategory()}{' '}
															</select>
															<span className='text-danger'>
																{
																	validateError.category_id
																}{' '}
															</span>
														</div>

														<div className='col-md-6'>
															<label htmlFor='brand_name'>
																Brand Name{' '}
																<span className='required'>
																	*
																</span>
															</label>
															<select
																value={
																	inputs.brand_name ||
																	''
																}
																onChange={
																	handleChange
																}
																className='form-control'
																name='brand_name'
															>
																<option
																	value=''
																	selected='selected'
																>
																	Select Brand
																</option>
																{showBrand()}{' '}
															</select>
															<span className='text-danger'>
																{
																	validateError.brand_name
																}{' '}
															</span>
														</div>
													</div>
													<div className='row mt-3'>
														<div className='col-md-6'>
															<label htmlFor='title'>
																Product Name{' '}
																<span className='required'>
																	*
																</span>
															</label>
															<input
																className='form-control'
																type='text'
																name='title'
																id='title'
																placeholder='Product Name'
																value={
																	inputs.title ||
																	''
																}
																maxLength={50}
																onChange={
																	handleChange
																}
															/>
															<span className='text-danger'>
																{
																	validateError.title
																}{' '}
															</span>
														</div>
														<div className='col-md-6'>
															<label htmlFor='sku'>
																SKU{' '}
																<span className='required'>
																	*
																</span>
															</label>
															<input
																className='form-control'
																type='text'
																name='sku'
																id='sku'
																placeholder='SKU'
																value={
																	inputs.sku ||
																	''
																}
																onChange={
																	handleChange
																}
																maxLength={50}
															/>
															<span className='text-danger'>
																{
																	validateError.sku
																}{' '}
															</span>
														</div>
													</div>
													<div className='row mt-3'>
														<div className='col-md-6'>
															<label htmlFor='country_of_manufacture'>
																Country of
																Manufacture{' '}
																<span className='required'>
																	*
																</span>
															</label>
															<select
																value={
																	inputs.country_of_manufacture ||
																	''
																}
																onChange={
																	handleChange
																}
																className='form-control'
																name='country_of_manufacture'
															>
																<option value=''>
																	Country of
																	Manufacture
																</option>
																{showCountryOfManufacture()}{' '}
															</select>
															<span className='text-danger'>
																{
																	validateError.country_of_manufacture
																}{' '}
															</span>
														</div>
													</div>
													<div className='row mt-3'>
														<div className='col-md-6'>
															<label htmlFor='price'>
																Regular Price{' '}
																<span className='required'>
																	*
																</span>
															</label>
															<input
																className='form-control'
																type='text'
																name='price'
																id='price'
																placeholder='$ 25000.00'
																value={
																	parseInt(
																		inputs.price,
																	) || ''
																}
																onChange={e => {
																	{
																		const input =
																			e
																				.target
																				.value;
																		const regex =
																			/^[0-9\b]{0,8}$/; // Only allow digits, maximum length of 8
																		if (
																			input ===
																				'' ||
																			regex.test(
																				input,
																			)
																		) {
																			handleChange(
																				e,
																			);
																		}
																	}
																}}
															/>
															<span className='text-danger'>
																{
																	validateError.price
																}{' '}
															</span>
														</div>
														<div className='col-md-6'>
															<label htmlFor='discountted_price'>
																Discounted Price
															</label>
															<input
																className='form-control'
																type='text'
																name='discounted_price'
																id='discounted_price'
																placeholder='$ 20000.00'
																value={
																	parseInt(
																		inputs.discounted_price,
																	) || ''
																}
																onChange={e => {
																	{
																		const input =
																			e
																				.target
																				.value;
																		const regex =
																			/^[0-9\b]{0,8}$/; // Only allow digits, maximum length of 8

																		if (
																			input ===
																				'' ||
																			regex.test(
																				input,
																			)
																		) {
																			handleChange(
																				e,
																			);
																		}
																	}
																}}
															/>
														</div>
													</div>

													<div className='row mt-3'>
														<div className='col-md-12'>
															<span>
																Product
																Description{' '}
																<span className='required'>
																	*
																</span>
															</span>
															<JoditEditor
																className='mt-3'
																config={{
																	readonly: false,
																	toolbar: true,
																	showXPathInStatusbar: false,
																	askBeforePasteHTML: false,
																	askBeforePasteFromWord: false,
																	askBeforePasteText: false,
																}}
																ref={editor}
																name='long_description'
																value={
																	inputs.long_description ||
																	''
																}
																onBlur={long_description => {
																	{
																		setInputs(
																			{
																				...inputs,
																				long_description,
																			},
																		);
																		setValidateError(
																			{
																				...validateError,
																				long_description:
																					'',
																			},
																		);
																	}
																}}
															/>

															<span className='text-danger'>
																{
																	validateError.long_description
																}{' '}
															</span>
														</div>
													</div>

													<div className='row mt-3'>
														<div className='col-md-12'>
															<label className='chk-container'>
																Is Active{' '}
																<input
																	name='status'
																	id='status'
																	type='checkbox'
																	checked={
																		inputs.status ===
																		1
																			? true
																			: false
																	}
																	value={
																		inputs &&
																		inputs.status
																	}
																	onChange={
																		handleChangeCheckbox
																	}
																/>
															</label>
														</div>
													</div>
												</div>
											</section>
										) : currentStep === 2 ? (
											<section
												id='step-1'
												className='form-step'
											>
												<div className='container mt-3'>
													<div className='row'>
														<div className='col-md-6'>
															<label htmlFor='valueAttribute'>
																Attributes
															</label>
															<Select
																name='valueAttribute'
																options={
																	attributeOptions
																}
																isMulti
																className='basic-multi-select'
																classNamePrefix='select'
																onChange={event => {
																	{
																		handleChangeMultiSelect(
																			event,
																		);
																	}
																}}
																value={
																	valueAttribute
																}
																ref={
																	selectInputRef
																}
															/>
														</div>
													</div>
													{showMerge
														? valueAttribute &&
														  valueAttribute.map(
																(item, i) => {
																	let valName =
																		Object.keys(
																			subValueAttribute,
																		)[i];

																	let coloroption =
																		subValueAttribute[
																			valName
																		];
																	return (
																		<div
																			key={
																				i
																			}
																		>
																			<label
																				htmlFor='color'
																				className='mt-3'
																			>
																				{
																					item.label
																				}{' '}
																				-{' '}
																			</label>
																			<div
																				className='row '
																				key={
																					i
																				}
																			>
																				<div className='col-md-6'>
																					<Select
																						name='color'
																						options={
																							attributeValueOptions[
																								item
																									.value
																							]
																						}
																						isMulti
																						className='basic-multi-select'
																						classNamePrefix='select'
																						onChange={event => {
																							{
																								handleChangeMultiAttributeSelect(
																									event,
																									item.label,
																									item.value,
																								);
																							}
																						}}
																						value={
																							coloroption
																						}
																						required
																					/>
																				</div>
																			</div>
																		</div>
																	);
																},
														  )
														: ''}
													<div className='row mt-3'>
														<div className='col-md-3 col-lg-3 attribute_options'></div>
														{showMerge ? (
															<div className='col-md-3 col-lg-3 attribute_options'>
																<div className='form-group'>
																	<button
																		className='btn btn-danger variant_button'
																		onClick={e => {
																			{
																				e.preventDefault();
																				onClear();
																			}
																		}}
																	>
																		Clear
																	</button>
																</div>
															</div>
														) : (
															''
														)}{' '}
													</div>
												</div>
											</section>
										) : currentStep === 3 ? (
											<div className='row mt-3'>
												<div className='col-md-12'>
													<label htmlFor='product_image'>
														Upload Product Images
													</label>
													<span className='required'>
														*
													</span>
													<input
														className='form-control'
														type='file'
														id='product_image'
														placeholder=''
														name='images[]'
														onChange={event => {
															{
																handleChangeImage(
																	event,
																);
																setValidateError(
																	{},
																);
															}
														}}
													/>

													<span className='text-danger'>
														{
															validateError.imageValidate
														}{' '}
													</span>
													<div className='row form-group'>
														<div className='img-wrap col-md-2'>
															<img
																src={
																	selectedFile
																		? preview
																		: productImage?.image_link
																}
																alt={
																	productImage?.image_name
																}
																className='m-2'
															/>
														</div>
													</div>
												</div>
												<div className='col-md-12'>
													<label htmlFor='product_image'>
														Upload Variant Images
													</label>
													<table className='table'>
														<thead>
															<tr>
																<th scope='col'>
																	#
																</th>
																<th scope='col'>
																	Name
																</th>
																<th scope='col'>
																	Upload
																</th>
															</tr>
														</thead>
														{Object.keys(
															valueObject,
														).map(index => {
															function generateCombinations(
																subValueAttribute,
																current,
																keys,
															) {
																if (
																	keys.length ===
																	0
																) {
																	combinationValue.push(
																		current,
																	);
																	return;
																}
																const key =
																	keys[0];
																const values =
																	subValueAttribute[
																		key
																	];
																for (
																	let i = 0;
																	i <
																	values.length;
																	i++
																) {
																	const value =
																		values[
																			i
																		].label;
																	if (
																		current[
																			key
																		] ===
																		value
																	) {
																		generateCombinations(
																			subValueAttribute,
																			current,
																			keys.slice(
																				1,
																			),
																		);
																	} else {
																		generateCombinations(
																			subValueAttribute,
																			{
																				...current,
																				[key]: value,
																			},
																			keys.slice(
																				1,
																			),
																		);
																	}
																}
															}
															const keys =
																Object.keys(
																	subValueAttribute,
																);
															generateCombinations(
																subValueAttribute,
																{},
																keys,
															);
															return (
																<tbody
																	key={index}
																>
																	{combinationValueDel.map(
																		(
																			item,
																			index,
																		) => {
																			return (
																				<>
																					<tr>
																						<th scope='row'>
																							{index +
																								1}{' '}
																						</th>
																						<td>
																							{' '}
																							{Object.keys(
																								item,
																							)
																								.map(
																									key =>
																										`${key.toLowerCase()}:${
																											item[
																												key
																											]
																										}`,
																								)
																								.join(
																									', ',
																								)}{' '}
																						</td>
																						<td>
																							<input
																								className='form-control col-md-12'
																								type='file'
																								id='variant_image'
																								placeholder=''
																								name='images[]'
																								onChange={
																									handleChangeImageVarient
																								}
																							/>
																						</td>
																					</tr>
																				</>
																			);
																		},
																	)}{' '}
																</tbody>
															);
														})}{' '}
													</table>
												</div>
											</div>
										) : (
											<>
												{' '}
												{combinationValueDel.length ===
												0 ? (
													<div className='row mt-3'>
														<div className='col-md-6'>
															<label htmlFor='stock'>
																Available Stock{' '}
																<span className='required'>
																	*
																</span>
															</label>
															<input
																className='form-control'
																type='text'
																name='stock'
																id='stock'
																placeholder='0'
																min='0'
																value={
																	inputs.stock ||
																	''
																}
																onChange={event => {
																	{
																		const enteredValue =
																			event
																				.target
																				.value;

																		if (
																			enteredValue >=
																				0 &&
																			/^\d*$/.test(
																				enteredValue,
																			)
																		) {
																			handleChange(
																				event,
																			);
																		}
																	}
																}}
															/>
															<span className='text-danger'>
																{
																	validateError.stock
																}{' '}
															</span>
														</div>
													</div>
												) : (
													<div className='row mt-5'>
														<div className='col-md-12'>
															<label htmlFor='product_image'>
																Available
																Quantity for
																Varient
															</label>
															<table className='table'>
																<thead>
																	<tr>
																		<th scope='col'>
																			#
																		</th>
																		<th scope='col'>
																			Name
																		</th>
																		<th scope='col'>
																			Regular
																			Price
																		</th>
																		<th scope='col'>
																			Discounted
																			Price
																		</th>
																		<th scope='col'>
																			Opening
																			Stock
																		</th>
																		<th scope='col'>
																			Action
																		</th>
																	</tr>
																</thead>
																{Object.keys(
																	valueObject,
																).map(index => {
																	function generateCombinations(
																		subValueAttribute,
																		current,
																		keys,
																	) {
																		if (
																			keys.length ===
																			0
																		) {
																			combinationValue.push(
																				current,
																			);
																			return;
																		}
																		const key =
																			keys[0];
																		const values =
																			subValueAttribute[
																				key
																			];
																		for (
																			let i = 0;
																			i <
																			values.length;
																			i++
																		) {
																			const value =
																				values[
																					i
																				]
																					.label;
																			if (
																				current[
																					key
																				] ===
																				value
																			) {
																				generateCombinations(
																					subValueAttribute,
																					current,
																					keys.slice(
																						1,
																					),
																				);
																			} else {
																				generateCombinations(
																					subValueAttribute,
																					{
																						...current,
																						[key]: value,
																					},
																					keys.slice(
																						1,
																					),
																				);
																			}
																		}
																	}
																	function generateCombinationsForId(
																		subValueAttribute,
																		current,
																		keys,
																	) {
																		if (
																			keys.length ===
																			0
																		) {
																			combinationValueId.push(
																				current,
																			);
																			return;
																		}
																		const key =
																			keys[0];
																		const values =
																			subValueAttribute[
																				key
																			];
																		for (
																			let i = 0;
																			i <
																			values.length;
																			i++
																		) {
																			const value =
																				values[
																					i
																				]
																					.attributeId;
																			if (
																				current[
																					key
																				] ===
																				value
																			) {
																				generateCombinationsForId(
																					subValueAttribute,
																					current,
																					keys.slice(
																						1,
																					),
																				);
																			} else {
																				generateCombinationsForId(
																					subValueAttribute,
																					{
																						...current,
																						[key]: value,
																					},
																					keys.slice(
																						1,
																					),
																				);
																			}
																		}
																	}
																	const keys =
																		Object.keys(
																			subValueAttribute,
																		);
																	generateCombinations(
																		subValueAttribute,
																		{},
																		keys,
																	);
																	generateCombinationsForId(
																		subValueAttribute,
																		{},
																		keys,
																	);

																	const newSize =
																		combinationValue.length;
																	inputValues.splice(
																		newSize,
																		inputValues.length -
																			newSize,
																	);

																	return (
																		<tbody
																			key={
																				index
																			}
																		>
																			{combinationValueDel?.map(
																				(
																					item,
																					index,
																				) => {
																					return (
																						<tr
																							key={
																								index
																							}
																						>
																							<th scope='row'>
																								{index +
																									1}{' '}
																							</th>
																							<td>
																								{' '}
																								{Object.keys(
																									item,
																								)
																									.map(
																										key =>
																											`${key.toLowerCase()}:${
																												item[
																													key
																												]
																											}`,
																									)
																									.join(
																										', ',
																									)}

																								:{' '}
																							</td>
																							<td>
																								<input
																									className='form-control col-md-9'
																									type='text'
																									name='regular_price'
																									id='regular_price'
																									placeholder='Regular Price'
																									min='0'
																									key={
																										index
																									}
																									onBlur={() => {
																										{
																											if (
																												parseInt(
																													inputValues[
																														index
																													]
																														?.regular_price,
																												) <
																												parseInt(
																													inputValues[
																														index
																													]
																														?.discount_price,
																												)
																											) {
																												setInputValues(
																													prevData => {
																														const newData =
																															[
																																...prevData,
																															];
																														newData[
																															index
																														] =
																															{
																																...newData[
																																	index
																																],
																																['discount_price']:
																																	'',
																															};
																														return newData;
																													},
																												);
																												setDiscountedPriceStatus(
																													true,
																												);
																												toast.warn(
																													'Discounted price should be less than regular price!',
																												);
																											} else {
																												setDiscountedPriceStatus(
																													false,
																												);
																											}
																										}
																									}}
																									value={
																										inputValues[
																											index
																										]
																											?.regular_price
																									}
																									onKeyDown={event => {
																										{
																											if (
																												event.key ===
																												'-'
																											) {
																												event.preventDefault();
																											}
																										}
																									}}
																									onChange={event => {
																										{
																											const regex =
																												/^[0-9\b]+$/; // regular expression to only allow numbers
																											const input =
																												event
																													.target
																													.value;
																											if (
																												input !==
																													'' &&
																												(input <
																													0 ||
																													!regex.test(
																														input,
																													))
																											) {
																												return;
																											}

																											handleChangeInputVal(
																												index,
																												event,
																											);
																										}
																									}}
																									required
																								/>
																								<span className='text-danger'>
																									{
																										validateError.regular_price
																									}{' '}
																								</span>
																							</td>
																							<td>
																								<input
																									className='form-control col-md-9'
																									type='text'
																									name='discount_price'
																									id='discount_price'
																									placeholder='Discounted Price'
																									min='0'
																									value={
																										inputValues[
																											index
																										]
																											?.discount_price
																									}
																									onKeyDown={event => {
																										{
																											if (
																												event.key ===
																												'-'
																											) {
																												event.preventDefault();
																											}
																										}
																									}}
																									onBlur={() => {
																										{
																											if (
																												parseInt(
																													inputValues[
																														index
																													]
																														?.regular_price,
																												) <
																												parseInt(
																													inputValues[
																														index
																													]
																														?.discount_price,
																												)
																											) {
																												setInputValues(
																													prevData => {
																														const newData =
																															[
																																...prevData,
																															];
																														newData[
																															index
																														] =
																															{
																																...newData[
																																	index
																																],
																																['discount_price']:
																																	'',
																															};
																														return newData;
																													},
																												);
																												setDiscountedPriceStatus(
																													true,
																												);
																												toast.warn(
																													'Discounted price should be less than regular price!',
																												);
																											} else {
																												setDiscountedPriceStatus(
																													false,
																												);
																											}
																										}
																									}}
																									onChange={event => {
																										{
																											const input =
																												event
																													.target
																													.value;
																											const regex =
																												/^[0-9\b]{0,8}$/; // Only allow digits, maximum length of 8

																											if (
																												input ===
																													'' ||
																												regex.test(
																													input,
																												)
																											) {
																												handleChangeInputVal(
																													index,
																													event,
																												);
																											}
																										}
																									}}
																								/>
																								<span className='text-danger'>
																									{
																										validateError.discount_price
																									}{' '}
																								</span>
																							</td>

																							<td>
																								<input
																									className='form-control col-md-9'
																									type='text'
																									name='available_stock'
																									id='available_stock'
																									placeholder='Available Stock'
																									min='0'
																									value={
																										inputValues[
																											index
																										]
																											?.available_stock
																									}
																									onKeyDown={event => {
																										{
																											if (
																												event.key ===
																												'-'
																											) {
																												event.preventDefault();
																											}
																										}
																									}}
																									onChange={event => {
																										{
																											const input =
																												event
																													.target
																													.value;
																											const regex =
																												/^[0-9\b]{0,8}$/; // Only allow digits, maximum length of 8

																											if (
																												input ===
																													'' ||
																												regex.test(
																													input,
																												)
																											) {
																												handleChangeInputVal(
																													index,
																													event,
																												);
																											}
																										}
																									}}
																								/>
																								<span className='text-danger'>
																									{
																										validateError.available_stock
																									}{' '}
																								</span>
																							</td>
																							<td>
																								<i
																									onClick={() =>
																										deleteAttributehandle(
																											index,
																											item,
																										)
																									}
																									className='fas fa-trash btn'
																								></i>
																							</td>
																						</tr>
																					);
																				},
																			)}{' '}
																		</tbody>
																	);
																})}{' '}
															</table>
														</div>
													</div>
												)}{' '}
											</>
										)}
										<div className='mt-4'>
											{currentStep === 1 ? (
												''
											) : (
												<button
													type='button'
													className='btn btn-warning'
													onClick={() =>
														updateStep(
															currentStep - 1,
														)
													}
												>
													<i className='fas fa-arrow-left'></i>{' '}
													Prev
												</button>
											)}
											{currentStep === 4 ? (
												<button
													type='button'
													className='btn btn-success float-right'
													onClick={e => {
														{
															handleSubmit(e);
														}
													}}
													disabled={loading}
												>
													<i className='fa fa-fw fa-save'></i>{' '}
													Submit
												</button>
											) : (
												<button
													type='button'
													className='btn btn-success float-right'
													onClick={() =>
														parseInt(
															inputs.discounted_price,
														) >
														parseInt(inputs.price)
															? toast.warn(
																	'Discounted Value Must be less than regular value!',
															  )
															: updateStep(
																	currentStep +
																		1,
															  )
													}
												>
													Next{' '}
													<i className='fas fa-arrow-right'></i>
												</button>
											)}{' '}
										</div>
									</div>
								</form>
							</section>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default AddProduct;
