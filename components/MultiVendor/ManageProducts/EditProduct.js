/* eslint-disable react/no-unknown-property */
import React from 'react';
// import {useRouter} from 'next/router';
// import Link from 'next/link';
// import JoditEditor from 'jodit-react';

import AccountSidebar from '@components/Common/Account/AccountSidebar';
import StyleSheet from '@styles/products.module.css';

const EditProduct = () => {
	return (
		<>
			<section className='cms-page'>
				<div className='container'>
					<div className='dashborad-panel'>
						<AccountSidebar />

						<div className='dashborad-rightsider'>
							<h3>Edit Product</h3>

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
									<div className='multi-step-form-container'>
										<ul
											className={
												StyleSheet.formStepperHorizontal
											}
										>
											{/* <!-- Step 1 --> */}
											<li
												className={
													StyleSheet.formStepperHorizontalli
												}
												step='1'
											>
												<a
													className={
														StyleSheet.formStepper
													}
													step_number='1'
												>
													<span className='form-stepper-circle'>
														<span>1</span>
													</span>
													<div className='label'>
														Product Basic
														information
													</div>
												</a>
											</li>
											{/* <!-- Step 2 --> */}
											<li
												className=' form-stepper-unfinished  text-center form-stepper-list'
												step='2'
											>
												<a
													className='mx-2 btn-navigate-form-step'
													step_number='2'
												>
													<span className='form-stepper-circle text-muted'>
														<span>2</span>
													</span>
													<div className='label text-muted'>
														Product attributes
													</div>
												</a>
											</li>
											{/* <!-- Step 3 --> */}
											<li
												className='form-stepper-unfinished text-center form-stepper-list'
												step='3'
											>
												<a
													className='mx-2 btn-navigate-form-step'
													step_number='3'
												>
													<span className='form-stepper-circle text-muted'>
														<span>3</span>
													</span>
													<div className='label text-muted'>
														Product Images
													</div>
												</a>
											</li>
											{/* <!-- Step 4 --> */}
											<li
												className='form-stepper-unfinished text-center form-stepper-list'
												step='4'
											>
												<a
													className='mx-2 btn-navigate-form-step'
													step_number='4'
												>
													<span className='form-stepper-circle text-muted'>
														<span>4</span>
													</span>
													<div className='label text-muted'>
														Product stocks
													</div>
												</a>
											</li>
										</ul>
										{/* step-1 content */}
										<section
											id='step-1'
											className='form-step'
										>
											<div className='container mt-3'>
												<div className='row'>
													<div className='col-md-6'>
														<label htmlFor='category_id'>
															Selected Category:*
														</label>
														<select
															className='form-control'
															name='category_id'
														>
															<option
																value=''
																selected='selected'
															>
																Select Category
															</option>
															<option value='40'>
																{' '}
																Women
															</option>
															<option value='46'>
																{' '}
																- Clothing
															</option>
															<option value='49'>
																{' '}
																- Sports
																Footwear
															</option>
															<option value='50'>
																{' '}
																- Footwear
															</option>
															<option value='51'>
																{' '}
																- Jewellery
															</option>
															<option value='52'>
																{' '}
																- Accessories
															</option>
															<option value='53'>
																{' '}
																- Maternity
															</option>
															<option value='41'>
																{' '}
																Men
															</option>
															<option value='54'>
																{' '}
																- Bags &amp;
																Wallets
															</option>
															<option value='55'>
																{' '}
																- Accessories
															</option>
															<option value='56'>
																{' '}
																- Clothing
															</option>
															<option value='57'>
																{' '}
																- Footwear
															</option>
															<option value='96'>
																{' '}
																- Tshirts
															</option>
															<option value='42'>
																{' '}
																Kids
															</option>
															<option value='58'>
																{' '}
																- Baby
															</option>
															<option value='59'>
																{' '}
																- Juniors
															</option>
															<option value='60'>
																{' '}
																- Teens
															</option>
															<option value='61'>
																{' '}
																- Accessories
															</option>
															<option value='62'>
																{' '}
																- Footwear
															</option>
															<option value='43'>
																{' '}
																Home &amp;
																Livings
															</option>
															<option value='64'>
																{' '}
																- Kitchen
															</option>
															<option value='65'>
																{' '}
																- Bathroom
															</option>
															<option value='66'>
																{' '}
																- Bedroom
															</option>
															<option value='67'>
																{' '}
																-
																Laundary,Steaming
																&amp; ironing
															</option>
															<option value='44'>
																{' '}
																Beauty
															</option>
															<option value='68'>
																{' '}
																- Health &amp;
																Wellness
															</option>
															<option value='69'>
																{' '}
																- Cosmetics
															</option>
															<option value='70'>
																{' '}
																- Body
															</option>
															<option value='71'>
																{' '}
																- - Men's
																gromming
															</option>
															<option value='72'>
																{' '}
																- Fragarance
															</option>
															<option value='45'>
																{' '}
																Sports
															</option>
															<option value='73'>
																{' '}
																- Surf, Skate
																&amp; Snow
															</option>
															<option value='74'>
																{' '}
																- Golf
															</option>
															<option value='75'>
																{' '}
																- Darts, Pool,
																Snooker
															</option>
															<option value='76'>
																{' '}
																- Outdoors
															</option>
															<option value='77'>
																{' '}
																- Fitness
															</option>
															<option value='78'>
																{' '}
																- Training
															</option>
															<option value='79'>
																{' '}
																- Cycling
															</option>
															<option value='47'>
																{' '}
																Electronics
															</option>
															<option value='80'>
																{' '}
																- Comuters &amp;
																Tablets
															</option>
															<option value='81'>
																{' '}
																- Audio &amp;
																Visual
															</option>
															<option value='82'>
																{' '}
																- Phones
															</option>
															<option value='83'>
																{' '}
																- Cameras &amp;
																Drones
															</option>
															<option value='84'>
																{' '}
																- Gaming
															</option>
															<option value='85'>
																{' '}
																- Tech
															</option>
															<option value='86'>
																{' '}
																- Wearable Tech
															</option>
															<option value='87'>
																{' '}
																- Smart Home
															</option>
															<option value='48'>
																{' '}
																Toys
															</option>
															<option value='88'>
																{' '}
																- Toys
															</option>
															<option value='94'>
																{' '}
																- Games
															</option>
															<option value='97'>
																{' '}
																Apple
															</option>
															<option value='98'>
																{' '}
																- iPhone
															</option>
															<option value='100'>
																{' '}
																- - iOS
															</option>
															<option value='99'>
																{' '}
																- iPad
															</option>
														</select>
													</div>

													<div className='col-md-6'>
														<label htmlFor='brand_name'>
															Brand Name*
														</label>
														<select
															className='form-control'
															name='brand_name'
														>
															<option
																value=''
																selected='selected'
															>
																Select Brand
															</option>
															<option value='40'>
																{' '}
																Women
															</option>
															<option value='46'>
																{' '}
																- Clothing
															</option>
															<option value='49'>
																{' '}
																- Sports
																Footwear
															</option>
															<option value='50'>
																{' '}
																- Footwear
															</option>
															<option value='51'>
																{' '}
																- Jewellery
															</option>
															<option value='52'>
																{' '}
																- Accessories
															</option>
															<option value='53'>
																{' '}
																- Maternity
															</option>
															<option value='41'>
																{' '}
																Men
															</option>
															<option value='54'>
																{' '}
																- Bags &amp;
																Wallets
															</option>
															<option value='55'>
																{' '}
																- Accessories
															</option>
															<option value='56'>
																{' '}
																- Clothing
															</option>
															<option value='57'>
																{' '}
																- Footwear
															</option>
															<option value='96'>
																{' '}
																- Tshirts
															</option>
															<option value='42'>
																{' '}
																Kids
															</option>
															<option value='58'>
																{' '}
																- Baby
															</option>
															<option value='59'>
																{' '}
																- Juniors
															</option>
															<option value='60'>
																{' '}
																- Teens
															</option>
															<option value='61'>
																{' '}
																- Accessories
															</option>
															<option value='62'>
																{' '}
																- Footwear
															</option>
															<option value='43'>
																{' '}
																Home &amp;
																Livings
															</option>
															<option value='64'>
																{' '}
																- Kitchen
															</option>
															<option value='65'>
																{' '}
																- Bathroom
															</option>
															<option value='66'>
																{' '}
																- Bedroom
															</option>
															<option value='67'>
																{' '}
																-
																Laundary,Steaming
																&amp; ironing
															</option>
															<option value='44'>
																{' '}
																Beauty
															</option>
															<option value='68'>
																{' '}
																- Health &amp;
																Wellness
															</option>
															<option value='69'>
																{' '}
																- Cosmetics
															</option>
															<option value='70'>
																{' '}
																- Body
															</option>
															<option value='71'>
																{' '}
																- - Men's
																gromming
															</option>
															<option value='72'>
																{' '}
																- Fragarance
															</option>
															<option value='45'>
																{' '}
																Sports
															</option>
															<option value='73'>
																{' '}
																- Surf, Skate
																&amp; Snow
															</option>
															<option value='74'>
																{' '}
																- Golf
															</option>
															<option value='75'>
																{' '}
																- Darts, Pool,
																Snooker
															</option>
															<option value='76'>
																{' '}
																- Outdoors
															</option>
															<option value='77'>
																{' '}
																- Fitness
															</option>
															<option value='78'>
																{' '}
																- Training
															</option>
															<option value='79'>
																{' '}
																- Cycling
															</option>
															<option value='47'>
																{' '}
																Electronics
															</option>
															<option value='80'>
																{' '}
																- Comuters &amp;
																Tablets
															</option>
															<option value='81'>
																{' '}
																- Audio &amp;
																Visual
															</option>
															<option value='82'>
																{' '}
																- Phones
															</option>
															<option value='83'>
																{' '}
																- Cameras &amp;
																Drones
															</option>
															<option value='84'>
																{' '}
																- Gaming
															</option>
															<option value='85'>
																{' '}
																- Tech
															</option>
															<option value='86'>
																{' '}
																- Wearable Tech
															</option>
															<option value='87'>
																{' '}
																- Smart Home
															</option>
															<option value='48'>
																{' '}
																Toys
															</option>
															<option value='88'>
																{' '}
																- Toys
															</option>
															<option value='94'>
																{' '}
																- Games
															</option>
															<option value='97'>
																{' '}
																Apple
															</option>
															<option value='98'>
																{' '}
																- iPhone
															</option>
															<option value='100'>
																{' '}
																- - iOS
															</option>
															<option value='99'>
																{' '}
																- iPad
															</option>
														</select>
													</div>
												</div>
												<div className='row mt-3'>
													<div className='col-md-6'>
														<label htmlFor='product_name'>
															Product Name*
														</label>
														<input
															className='form-control'
															type='text'
															name='product_name'
															id='product_name'
															placeholder='Product Name'
														/>
													</div>
													<div className='col-md-6'>
														<label htmlFor='sku'>
															SKU*
														</label>
														<input
															className='form-control'
															type='text'
															name='sku'
															id='sku'
															placeholder='SKU'
														/>
													</div>
												</div>
												<div className='row mt-3'>
													<div className='col-md-6'>
														<label htmlFor='country_of_manufacture'>
															Country of
															Manufacture
														</label>
														<select
															className='form-control'
															name='country_of_manufacture'
														>
															<option value=''>
																Country of
																Manufacture
															</option>
															<option value='1'>
																Afghanistan
															</option>
															<option value='2'>
																Albania
															</option>
															<option value='3'>
																Algeria
															</option>
															<option value='4'>
																American Samoa
															</option>
															<option value='5'>
																Andorra
															</option>
															<option value='6'>
																Angola
															</option>
															<option value='7'>
																Anguilla
															</option>
															<option value='8'>
																Antarctica
															</option>
															<option value='9'>
																Antigua And
																Barbuda
															</option>
															<option value='10'>
																Argentina
															</option>
															<option value='11'>
																Armenia
															</option>
															<option value='12'>
																Aruba
															</option>
															<option
																value='13'
																selected='selected'
															>
																Australia
															</option>
															<option value='14'>
																Austria
															</option>
															<option value='15'>
																Azerbaijan
															</option>
															<option value='16'>
																Bahamas The
															</option>
															<option value='17'>
																Bahrain
															</option>
															<option value='18'>
																Bangladesh
															</option>
															<option value='19'>
																Barbados
															</option>
															<option value='20'>
																Belarus
															</option>
															<option value='21'>
																Belgium
															</option>
															<option value='22'>
																Belize
															</option>
															<option value='23'>
																Benin
															</option>
															<option value='24'>
																Bermuda
															</option>
															<option value='25'>
																Bhutan
															</option>
															<option value='26'>
																Bolivia
															</option>
															<option value='27'>
																Bosnia and
																Herzegovina
															</option>
															<option value='28'>
																Botswana
															</option>
															<option value='29'>
																Bouvet Island
															</option>
															<option value='30'>
																Brazil
															</option>
															<option value='31'>
																British Indian
																Ocean Territory
															</option>
															<option value='32'>
																Brunei
															</option>
															<option value='33'>
																Bulgaria
															</option>
															<option value='34'>
																Burkina Faso
															</option>
															<option value='35'>
																Burundi
															</option>
															<option value='36'>
																Cambodia
															</option>
															<option value='37'>
																Cameroon
															</option>
															<option value='38'>
																Canada
															</option>
															<option value='39'>
																Cape Verde
															</option>
															<option value='40'>
																Cayman Islands
															</option>
															<option value='41'>
																Central African
																Republic
															</option>
															<option value='42'>
																Chad
															</option>
															<option value='43'>
																Chile
															</option>
															<option value='44'>
																China
															</option>
															<option value='45'>
																Christmas Island
															</option>
															<option value='46'>
																Cocos (Keeling)
																Islands
															</option>
															<option value='47'>
																Colombia
															</option>
															<option value='48'>
																Comoros
															</option>
															<option value='49'>
																Republic Of The
																Congo
															</option>
															<option value='50'>
																Democratic
																Republic Of The
																Congo
															</option>
															<option value='51'>
																Cook Islands
															</option>
															<option value='52'>
																Costa Rica
															</option>
															<option value='53'>
																Cote D'Ivoire
																(Ivory Coast)
															</option>
															<option value='54'>
																Croatia
																(Hrvatska)
															</option>
															<option value='55'>
																Cuba
															</option>
															<option value='56'>
																Cyprus
															</option>
															<option value='57'>
																Czech Republic
															</option>
															<option value='58'>
																Denmark
															</option>
															<option value='59'>
																Djibouti
															</option>
															<option value='60'>
																Dominica
															</option>
															<option value='61'>
																Dominican
																Republic
															</option>
															<option value='62'>
																East Timor
															</option>
															<option value='63'>
																Ecuador
															</option>
															<option value='64'>
																Egypt
															</option>
															<option value='65'>
																El Salvador
															</option>
															<option value='66'>
																Equatorial
																Guinea
															</option>
															<option value='67'>
																Eritrea
															</option>
															<option value='68'>
																Estonia
															</option>
															<option value='69'>
																Ethiopia
															</option>
															<option value='70'>
																External
																Territories of
																Australia
															</option>
															<option value='71'>
																Falkland Islands
															</option>
															<option value='72'>
																Faroe Islands
															</option>
															<option value='73'>
																Fiji Islands
															</option>
															<option value='74'>
																Finland
															</option>
															<option value='75'>
																France
															</option>
															<option value='76'>
																French Guiana
															</option>
															<option value='77'>
																French Polynesia
															</option>
															<option value='78'>
																French Southern
																Territories
															</option>
															<option value='79'>
																Gabon
															</option>
															<option value='80'>
																Gambia The
															</option>
															<option value='81'>
																Georgia
															</option>
															<option value='82'>
																Germany
															</option>
															<option value='83'>
																Ghana
															</option>
															<option value='84'>
																Gibraltar
															</option>
															<option value='85'>
																Greece
															</option>
															<option value='86'>
																Greenland
															</option>
															<option value='87'>
																Grenada
															</option>
															<option value='88'>
																Guadeloupe
															</option>
															<option value='89'>
																Guam
															</option>
															<option value='90'>
																Guatemala
															</option>
															<option value='91'>
																Guernsey and
																Alderney
															</option>
															<option value='92'>
																Guinea
															</option>
															<option value='93'>
																Guinea-Bissau
															</option>
															<option value='94'>
																Guyana
															</option>
															<option value='95'>
																Haiti
															</option>
															<option value='96'>
																Heard and
																McDonald Islands
															</option>
															<option value='97'>
																Honduras
															</option>
															<option value='98'>
																Hong Kong S.A.R.
															</option>
															<option value='99'>
																Hungary
															</option>
															<option value='100'>
																Iceland
															</option>
															<option value='101'>
																India
															</option>
															<option value='102'>
																Indonesia
															</option>
															<option value='103'>
																Iran
															</option>
															<option value='104'>
																Iraq
															</option>
															<option value='105'>
																Ireland
															</option>
															<option value='106'>
																Israel
															</option>
															<option value='107'>
																Italy
															</option>
															<option value='108'>
																Jamaica
															</option>
															<option value='109'>
																Japan
															</option>
															<option value='110'>
																Jersey
															</option>
															<option value='111'>
																Jordan
															</option>
															<option value='112'>
																Kazakhstan
															</option>
															<option value='113'>
																Kenya
															</option>
															<option value='114'>
																Kiribati
															</option>
															<option value='115'>
																Korea North
															</option>
															<option value='116'>
																Korea South
															</option>
															<option value='117'>
																Kuwait
															</option>
															<option value='118'>
																Kyrgyzstan
															</option>
															<option value='119'>
																Laos
															</option>
															<option value='120'>
																Latvia
															</option>
															<option value='121'>
																Lebanon
															</option>
															<option value='122'>
																Lesotho
															</option>
															<option value='123'>
																Liberia
															</option>
															<option value='124'>
																Libya
															</option>
															<option value='125'>
																Liechtenstein
															</option>
															<option value='126'>
																Lithuania
															</option>
															<option value='127'>
																Luxembourg
															</option>
															<option value='128'>
																Macau S.A.R.
															</option>
															<option value='129'>
																Macedonia
															</option>
															<option value='130'>
																Madagascar
															</option>
															<option value='131'>
																Malawi
															</option>
															<option value='132'>
																Malaysia
															</option>
															<option value='133'>
																Maldives
															</option>
															<option value='134'>
																Mali
															</option>
															<option value='135'>
																Malta
															</option>
															<option value='136'>
																Man (Isle of)
															</option>
															<option value='137'>
																Marshall Islands
															</option>
															<option value='138'>
																Martinique
															</option>
															<option value='139'>
																Mauritania
															</option>
															<option value='140'>
																Mauritius
															</option>
															<option value='141'>
																Mayotte
															</option>
															<option value='142'>
																Mexico
															</option>
															<option value='143'>
																Micronesia
															</option>
															<option value='144'>
																Moldova
															</option>
															<option value='145'>
																Monaco
															</option>
															<option value='146'>
																Mongolia
															</option>
															<option value='147'>
																Montserrat
															</option>
															<option value='148'>
																Morocco
															</option>
															<option value='149'>
																Mozambique
															</option>
															<option value='150'>
																Myanmar
															</option>
															<option value='151'>
																Namibia
															</option>
															<option value='152'>
																Nauru
															</option>
															<option value='153'>
																Nepal
															</option>
															<option value='154'>
																Netherlands
																Antilles
															</option>
															<option value='155'>
																Netherlands The
															</option>
															<option value='156'>
																New Caledonia
															</option>
															<option value='157'>
																New Zealand
															</option>
															<option value='158'>
																Nicaragua
															</option>
															<option value='159'>
																Niger
															</option>
															<option value='160'>
																Nigeria
															</option>
															<option value='161'>
																Niue
															</option>
															<option value='162'>
																Norfolk Island
															</option>
															<option value='163'>
																Northern Mariana
																Islands
															</option>
															<option value='164'>
																Norway
															</option>
															<option value='165'>
																Oman
															</option>
															<option value='166'>
																Pakistan
															</option>
															<option value='167'>
																Palau
															</option>
															<option value='168'>
																Palestinian
																Territory
																Occupied
															</option>
															<option value='169'>
																Panama
															</option>
															<option value='170'>
																Papua new Guinea
															</option>
															<option value='171'>
																Paraguay
															</option>
															<option value='172'>
																Peru
															</option>
															<option value='173'>
																Philippines
															</option>
															<option value='174'>
																Pitcairn Island
															</option>
															<option value='175'>
																Poland
															</option>
															<option value='176'>
																Portugal
															</option>
															<option value='177'>
																Puerto Rico
															</option>
															<option value='178'>
																Qatar
															</option>
															<option value='179'>
																Reunion
															</option>
															<option value='180'>
																Romania
															</option>
															<option value='181'>
																Russia
															</option>
															<option value='182'>
																Rwanda
															</option>
															<option value='183'>
																Saint Helena
															</option>
															<option value='184'>
																Saint Kitts And
																Nevis
															</option>
															<option value='185'>
																Saint Lucia
															</option>
															<option value='186'>
																Saint Pierre and
																Miquelon
															</option>
															<option value='187'>
																Saint Vincent
																And The
																Grenadines
															</option>
															<option value='188'>
																Samoa
															</option>
															<option value='189'>
																San Marino
															</option>
															<option value='190'>
																Sao Tome and
																Principe
															</option>
															<option value='191'>
																Saudi Arabia
															</option>
															<option value='192'>
																Senegal
															</option>
															<option value='193'>
																Serbia
															</option>
															<option value='194'>
																Seychelles
															</option>
															<option value='195'>
																Sierra Leone
															</option>
															<option value='196'>
																Singapore
															</option>
															<option value='197'>
																Slovakia
															</option>
															<option value='198'>
																Slovenia
															</option>
															<option value='199'>
																Smaller
																Territories of
																the UK
															</option>
															<option value='200'>
																Solomon Islands
															</option>
															<option value='201'>
																Somalia
															</option>
															<option value='202'>
																South Africa
															</option>
															<option value='203'>
																South Georgia
															</option>
															<option value='204'>
																South Sudan
															</option>
															<option value='205'>
																Spain
															</option>
															<option value='206'>
																Sri Lanka
															</option>
															<option value='207'>
																Sudan
															</option>
															<option value='208'>
																Suriname
															</option>
															<option value='209'>
																Svalbard And Jan
																Mayen Islands
															</option>
															<option value='210'>
																Swaziland
															</option>
															<option value='211'>
																Sweden
															</option>
															<option value='212'>
																Switzerland
															</option>
															<option value='213'>
																Syria
															</option>
															<option value='214'>
																Taiwan
															</option>
															<option value='215'>
																Tajikistan
															</option>
															<option value='216'>
																Tanzania
															</option>
															<option value='217'>
																Thailand
															</option>
															<option value='218'>
																Togo
															</option>
															<option value='219'>
																Tokelau
															</option>
															<option value='220'>
																Tonga
															</option>
															<option value='221'>
																Trinidad And
																Tobago
															</option>
															<option value='222'>
																Tunisia
															</option>
															<option value='223'>
																Turkey
															</option>
															<option value='224'>
																Turkmenistan
															</option>
															<option value='225'>
																Turks And Caicos
																Islands
															</option>
															<option value='226'>
																Tuvalu
															</option>
															<option value='227'>
																Uganda
															</option>
															<option value='228'>
																Ukraine
															</option>
															<option value='229'>
																United Arab
																Emirates
															</option>
															<option value='230'>
																United Kingdom
															</option>
															<option value='231'>
																United States
															</option>
															<option value='232'>
																United States
																Minor Outlying
																Islands
															</option>
															<option value='233'>
																Uruguay
															</option>
															<option value='234'>
																Uzbekistan
															</option>
															<option value='235'>
																Vanuatu
															</option>
															<option value='236'>
																Vatican City
																State (Holy See)
															</option>
															<option value='237'>
																Venezuela
															</option>
															<option value='238'>
																Vietnam
															</option>
															<option value='239'>
																Virgin Islands
																(British)
															</option>
															<option value='240'>
																Virgin Islands
																(US)
															</option>
															<option value='241'>
																Wallis And
																Futuna Islands
															</option>
															<option value='242'>
																Western Sahara
															</option>
															<option value='243'>
																Yemen
															</option>
															<option value='244'>
																Yugoslavia
															</option>
															<option value='245'>
																Zambia
															</option>
															<option value='246'>
																Zimbabwe
															</option>
														</select>
													</div>
												</div>
												<div className='row mt-3'>
													<div className='col-md-6'>
														<label htmlFor='price'>
															Price*
														</label>
														<input
															className='form-control'
															type='text'
															name='price'
															id='price'
															placeholder='$ 25000.00'
														/>
													</div>
													<div className='col-md-6'>
														<label htmlFor='discountted_price'>
															Discounted Price*
														</label>
														<input
															className='form-control'
															type='text'
															name='discounted_price'
															id='discounted_price'
															placeholder='$ 20000.00'
														/>
													</div>
												</div>
												{/* Product Description */}
												<div className='row mt-3'>
													<div className='col-md-12'>
														<span>
															Product Description
														</span>
														{/* <JoditEditor
															className='mt-3'
															ref={editor}
															value={content}
															onChange={newContent => setContent(newContent)}
														/> */}
													</div>
												</div>

												<div className='row mt-3'>
													<div className='col-md-12'>
														<label className='chk-container'>
															Is Popular
															<input
																name='is_popular'
																type='checkbox'
																checked='checked'
															/>
														</label>
													</div>
												</div>
												<div className='row'>
													<div className='col-md-12'>
														<label className='chk-container'>
															Is Active
															<input
																name='status'
																type='checkbox'
															/>
														</label>
													</div>
												</div>
												<div className='mt-3'>
													<button
														type='button'
														className='btn btn-success btn-navigate-form-step float-right mb-2'
														// eslint-disable-next-line react/no-unknown-property
														step_number='2'
													>
														Next{' '}
														<i className='fa fa-arrow-right'></i>
													</button>
												</div>
											</div>
										</section>
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

export default EditProduct;
