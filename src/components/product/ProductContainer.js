// import React, { useState, useEffect,useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import api from '../../api/api';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import './product.css';
// import { AiOutlineEye } from 'react-icons/ai';
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { BsHeart, BsShare, BsPlus, BsHeartFill } from "react-icons/bs";
// import { BiMinus, BiLink } from 'react-icons/bi';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import QuickViewModal from './QuickViewModal';
// import { FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';
// import { IoIosArrowDown } from 'react-icons/io';
// import { useTranslation } from 'react-i18next';

// import { addtoGuestCart, setCart, setCartProducts, setCartSubTotal, setSellerFlag } from "../../model/reducer/cartReducer";
// import { setFavouriteLength, setFavouriteProductIds } from "../../model/reducer/favouriteReducer";
// import { setProductSizes } from "../../model/reducer/productSizesReducer";
// import { setFilterCategory, setFilterSection } from '../../model/reducer/productFilterReducer';
// import Popup from "../same-seller-popup/Popup";
// import { LuStar } from 'react-icons/lu';
// import Loader from '../loader/Loader';
// import { setSelectedProduct } from '../../model/reducer/selectedProduct';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
// import ImageWithPlaceholder from '../image-with-placeholder/ImageWithPlaceholder';
// import { Autoplay, Navigation } from 'swiper/modules';
// import 'swiper/css'; // Import Swiper styles
// import 'swiper/css/navigation';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
// import { setCSSMode } from '../../model/reducer/cssmodeReducer';
// import { Button } from 'react-bootstrap';


// const ProductContainer = React.memo(({ showModal, setShowModal, BelowSectionOfferArray }) => {
//     const cssmode = useSelector(state => (state.cssmode));

//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { t } = useTranslation();
//     const swiperRef = useRef(null);  // Ref for Swiper instance
//     const [swiperInstance, setSwiperInstance] = useState(null); // Swiper instance state

//     const city = useSelector(state => state.city);
//     const shop = useSelector(state => state.shop);
//     const setting = useSelector(state => state.setting);
//     const cart = useSelector(state => state.cart);
//     const sizes = useSelector(state => state.productSizes);
//     const favorite = useSelector(state => (state.favourite));
//     const user = useSelector(state => (state.user));

//     const [selectedVariant, setSelectedVariant] = useState({});
//     const [p_id, setP_id] = useState(0);
//     const [p_v_id, setP_V_id] = useState(0);
//     const [qnty, setQnty] = useState(0);
//     const [loader, setisLoader] = useState(false);
//     const [selectedProduct, setselectedProduct] = useState({});
//     const [productSizes, setproductSizes] = useState(null);
//     const [offerConatiner, setOfferContainer] = useState(0);
//     const [variant_index, setVariantIndex] = useState(null);


//     const handleMouseEnter = () => {

//         if (swiperInstance?.autoplay) {


//             swiperInstance.autoplay.stop();
//             // Stops autoplay when hovered
//         }
//     };

//     // Function to resume autoplay on mouse leave
//     const handleMouseLeave = () => {
//         if (swiperInstance?.autoplay) {

//             swiperInstance.autoplay.start();  // Resumes autoplay when mouse leaves
//         }
//     };

//     useEffect(() => {
//         if (sizes.sizes === null || sizes.status === 'loading') {
//             if (city.city !== null) {
//                 api.getProductbyFilter(city.city.latitude, city.city.longitude)
//                     .then(response => response.json())
//                     .then(result => {
//                         if (result.status === 1) {
//                             setproductSizes(result.sizes);
//                             dispatch(setProductSizes({ data: result.sizes }));
//                         }
//                     });
//             }
//         }
//         else {
//             setproductSizes(sizes.sizes);
//         }
//     }, [city, sizes]);

//     //Add to Cart
//     const addtoCart = async (product_id, product_variant_id, qty) => {
//         setP_id(product_id);
//         setP_V_id(product_variant_id);
//         setQnty(qty);
//         await api.addToCart(user?.jwtToken, product_id, product_variant_id, qty)
//             .then(response => response.json())
//             .then(async (result) => {
//                 if (result.status === 1) {
//                     // toast.success(result.message);
//                     if (cart?.cartProducts?.find((product) => product?.product_id == product_id)?.qty == undefined) {
//                         dispatch(setCart({ data: result }));
//                         dispatch(setCartSubTotal({ data: result?.data?.sub_total }));
//                         const updatedCartCount = [...cart?.cartProducts, { product_id: product_id, product_variant_id: product_variant_id, qty: qty }];
//                         dispatch(setCartProducts({ data: updatedCartCount }));
//                     } else {
//                         const updatedProducts = cart?.cartProducts?.map(product => {
//                             if (product.product_id == product_id) {
//                                 return { ...product, qty: qty };
//                             } else {
//                                 return product;
//                             }
//                         });
//                         dispatch(setCart({ data: result }));
//                         dispatch(setCartProducts({ data: updatedProducts }));
//                         dispatch(setCartSubTotal({ data: result?.data?.sub_total }));
//                     }
//                 }
//                 else if (result?.data?.one_seller_error_code == 1) {
//                     dispatch(setSellerFlag({ data: 1 }));
//                     // toast.error(t(`${result.message}`));
//                 }
//             });
//     };

//     //remove from Cart
//     const removefromCart = async (product_id, product_variant_id, section_id) => {
//         await api.removeFromCart(user?.jwtToken, product_id, product_variant_id)
//             .then(response => response.json())
//             .then(async (result) => {
//                 if (result.status === 1) {
//                     // toast.success(result.message);
//                     const updatedProducts = cart?.cartProducts?.filter(product => product?.product_id != product_id);
//                     dispatch(setCartProducts({ data: updatedProducts }));
//                 }
//                 else {
//                     toast.error(result.message);
//                 }
//             });
//     };

//     //Add to favorite
//     const addToFavorite = async (product_id) => {
//         await api.addToFavotite(user?.jwtToken, product_id)
//             .then(response => response.json())
//             .then(async (result) => {
//                 if (result.status === 1) {
//                     // toast.success(result.message);

//                     // Ensure favorite.favouriteProductIds is an array before spreading
//                     const updatedFavouriteProducts = [
//                         ...(Array.isArray(favorite?.favouriteProductIds) ? favorite.favouriteProductIds : []),
//                         product_id
//                     ];

//                     dispatch(setFavouriteProductIds({ data: updatedFavouriteProducts }));

//                     const updatedFavouriteLength = (favorite?.favouritelength || 0) + 1;
//                     dispatch(setFavouriteLength({ data: updatedFavouriteLength }));
//                 } else {
//                     toast.error(result.message);
//                 }
//             });
//     };




//     const removefromFavorite = async (product_id) => {
//         await api.removeFromFavorite(user?.jwtToken, product_id)
//             .then(response => response.json())
//             .then(async (result) => {
//                 if (result.status === 1) {
//                     // toast.success(result.message);
//                     const updatedFavouriteProducts = favorite?.favouriteProductIds.filter(id => id != product_id);
//                     dispatch(setFavouriteProductIds({ data: updatedFavouriteProducts }));
//                     const updatedFavouriteLength = favorite?.favouritelength - 1;
//                     dispatch(setFavouriteLength({ data: updatedFavouriteLength }));
//                 }
//                 else {
//                     toast.error(result.message);
//                 }
//             });
//     };

//     const CustomPrevButton = (props) => {
//         const { slideCount, currentSlide, ...remainingProps } = props;
//         return (
//             <button {...remainingProps} type="button" className="slick-prev">
//                 <FaChevronLeft fill='black' size={30} className="prev-arrow"  />
//             </button>
//         );
//     };

//     const CustomNextButton = (props) => {
//         const { slideCount, currentSlide, ...remainingProps } = props;
//         return (
//             <button {...remainingProps} type="button" className="slick-next">
//                 <FaChevronRight fill='black' size={30} className='next-arrow' />
//             </button>
//         );
//     };

//     const settings = {
//         infinite: false,
//         slidesToShow: 4,
//         slidesPerRow: 1,
//         initialSlide: 0,
//         // centerMode: true,
//         centerMargin: "10px",
//         margin: "20px", // set the time interval between slides
//         // Add custom navigation buttons using Font Awesome icons
//         prevArrow:
//             // (
//             //     <button type="button" className="slick-prev">
//             //         <FaChevronLeft fill='black' size={30} className="prev-arrow" />
//             //     </button>
//             // )
//             <CustomPrevButton />,
//         nextArrow:
//             // (
//             //     <button type="button" className="slick-next">
//             //         <FaChevronRight fill='black' size={30} className='next-arrow' />
//             //     </button>
//             // )
//             <CustomNextButton />
//         ,
//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: 4,
//                 }
//             },
//             {
//                 breakpoint: 768,
//                 settings: {
//                     slidesToShow: 3,
//                 }
//             },
//             {
//                 breakpoint: 425,
//                 settings: {
//                     slidesToShow: 1,
//                 }
//             }
//         ]
//     };

//     const placeHolderImage = (e) => {

//         e.target.src = setting.setting?.web_logo;
//     };

//     function getProductQuantities(products) {
//         return Object.entries(products.reduce((quantities, product) => {
//             const existingQty = quantities[product.product_id] || 0;
//             return { ...quantities, [product.product_id]: existingQty + product.qty };
//         }, {})).map(([productId, qty]) => ({
//             product_id: parseInt(productId),
//             qty
//         }));
//     }

//     const handleValidateAddExistingProduct = (productQuantity, product) => {
//         if (Number(product.is_unlimited_stock)) {
//             if (productQuantity?.find(prdct => prdct?.product_id == product?.id)?.qty < Number(product.total_allowed_quantity)) {
//                 // addtoCart(product.id, product.variants[0].id, product.variants[0].cart_count + 1);
//                 addtoCart(product.id, product.variants[0].id, cart?.cartProducts?.find(prdct => prdct?.product_id == product?.id)?.qty + 1);

//             } else {
//                 toast.error(t("max_cart_limit_error"));
//             }
//         } else {
//             if (productQuantity?.find(prdct => prdct?.product_id == product?.id)?.qty >= Number(product.variants[0].stock)) {
//                 toast.error(t("out_of_stock_message"));
//             }
//             else if (productQuantity?.find(prdct => prdct?.product_id == product?.id)?.qty >= Number(product.total_allowed_quantity)) {
//                 toast.error(t("max_cart_limit_error"));
//             } else {
//                 addtoCart(product.id, product.variants[0].id, cart?.cartProducts?.find(prdct => prdct?.product_id == product?.id)?.qty + 1);
//                 // addtoCart(product.id, product.variants[0].id, cart?.cartProducts?.find(prdct => prdct?.product_variant_id == product?.variants[0]?.id)?.qty + 1);
//             }
//         }
//     };
//     const AddToGuestCart = (productId, productVariantId, Qty, isExisting) => {
//         if (isExisting) {
//             const updatedProducts = Qty !== 0 ? cart?.guestCart?.map((product) => {
//                 if (product?.product_id == productId && product?.product_variant_id == productVariantId) {
//                     return { ...product, qty: Qty };
//                 } else {
//                     return product;
//                 }
//             }) : cart?.guestCart?.filter(product => product?.product_id != productId && product?.productVariantId != productVariantId);
//             dispatch(addtoGuestCart({ data: updatedProducts }));
//         } else {
//             const productData = { product_id: productId, product_variant_id: productVariantId, qty: Qty };
//             dispatch(addtoGuestCart({ data: [...cart?.guestCart, productData] }));
//         }
//     };

//     const handleValidateAddExistingGuestProduct = (productQuantity, product, quantity) => {
//         if (Number(product.is_unlimited_stock)) {
//             if (productQuantity?.find(prdct => prdct?.product_id == product?.id)?.qty >= Number(product?.total_allowed_quantity)) {
//                 toast.error(t("max_cart_limit_error"));
//             }
//             else {
//                 AddToGuestCart(product?.id, product?.variants?.[0]?.id, quantity, 1);
//             }
//         }
//         else {
//             if (productQuantity?.find(prdct => prdct?.product_id == product?.id)?.qty >= Number(product?.variants?.[0]?.stock)) {
//                 toast.error(t("limited_product_stock_error"));
//             }
//             else if (productQuantity?.find(prdct => prdct?.product_id == product?.id)?.qty >= Number(product?.total_allowed_quantity)) {
//                 toast.error(t("max_cart_limit_error"));
//             }
//             else {
//                 AddToGuestCart(product?.id, product?.variants?.[0]?.id, quantity, 1);
//             }
//         }
//     };

//     const handleAddNewProductGuest = (productQuantity, product) => {
//         if ((productQuantity?.find(prdct => prdct?.product_id == product?.id)?.qty || 0) < Number(product.total_allowed_quantity)) {
//             AddToGuestCart(product.id, product.variants[0].id, 1, 0);
//         } else {
//             toast.error(t("out_of_stock_message"));
//         }
//     };

//     return (
//         <section id="products">
//             <div className="container-fluid">
//                 {shop.shop === null || productSizes === null
//                     ? (
//                         <>
//                             <div className="d-flex justify-content-center">
//                                 <Loader width={"100%"} height={"500px"} />
//                             </div>
//                         </>
//                     )
//                     : (
//                         <>
//                             {shop?.shop?.sections?.map((section, index0) => {
//                                 if (section.products.length > 0) {
//                                     return (
//                                         <div key={index0}>
//                                             <div className='product_section row flex-column' value={index0} onChange={(e) => { setOfferContainer(index0); }}>
//                                                 <div className="d-flex product_title_content justify-content-between align-items-center col-md-12">
//                                                     <div className="">
//                                                         <p>{section.title}</p>
//                                                         <span className='d-none d-md-block'>{section.short_description}</span>
//                                                     </div>
//                                                     <div>
//                                                         {/* {console.log(section)} */}
// <Link type="button" class="btn btn-outline-success "  to="/products" onClick={() => {
//     dispatch(setFilterSection({ data: section.id }));
//     navigate('/products');


// }}>{t('see_all')}</Link>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-1 d-flex align-items-center justify-content-center">
//                     <FaCircleChevronLeft className="swiper-button-prev" size={40}    style={{
//             position: 'absolute',
//             top: '58%', // Adjusting position
//             zIndex: 10,
//             color: 'var(--swiper-navigation-color)', // Ensure color applies
//             display: 'flex',
//             cursor: 'pointer',
//             alignItems: 'center',
//             justifyContent: 'center',
//             width: 'calc(var(--swiper-navigation-size) / 44 * 27)',
//             height: 'var(--swiper-navigation-size)',
//             marginTop: 'calc(0px - (var(--swiper-navigation-size) / 2))',
//             important: 'true',
//             color: cssmode.cssmode === 'dark' ? 'white' : 'black',
//             left: 'var(--swiper-navigation-sides-offset, 1px)',
//   right: 'auto'

//              // This won't work in React, but inline should still take priority
//         }}  />
//                 </div>
//                                                 <div className="product_section_content p-0" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

//                                                     <Swiper 
//                                                      ref={swiperRef}  // Assign Swiper reference
//                                                      spaceBetween={5}
//                                                      slidesPerView={6}
//                                                      navigation={{
//                                                          prevEl: '.swiper-button-prev',
//                                                          nextEl: '.swiper-button-next',
//                                                      }}
//                                                      modules={[Autoplay, Navigation]}
//                                                      autoplay={{
//                                                          delay: 1500,
//                                                          disableOnInteraction: false,
//                                                          pauseOnMouseEnter:true// Allows autoplay after interaction
//                                                      }}
//                                                      onSwiper={setSwiperInstance} // Set swiper instance when it's initialized
//                                                      breakpoints={{
//                                                          320: { slidesPerView: 3 },
//                                                          576: { slidesPerView: 4 },
//                                                          768: { slidesPerView: 4 },
//                                                          992: { slidesPerView: 4 },

//                                                      }}
//                                                         >
//                                                         {section?.products?.map((product, index) => (
//                                                             <div className="row" key={index}>



//                                                                 <div className="col-md-12">


//                                                                     <SwiperSlide className='product-card'>
//                                                                         <span className='border border-light rounded-circle' id='aiEye'>
//                                                                             <AiOutlineEye
//                                                                                 onClick={() => {
//                                                                                     setselectedProduct(product); setShowModal(true);
//                                                                                     setP_id(product.id); setP_V_id(product.variants[0].id); setQnty(product.variants[0].cart_count + 1);
//                                                                                 }}
//                                                                             />
//                                                                         </span>
//                                                                         <Link to={`/product/${product.slug}`} onClick={() => {
//                                                                             dispatch(setSelectedProduct({ data: product?.id }));
//                                                                         }} className='text-decoration-none text-reset'>

//                                                                             <div className='image-container' >
//                                                                                 {/* <img onLoadStart={(e) => { e.target.src = setting.setting?.web_logo; }} onError={placeHolderImage} src={product.image_url} alt={product.slug} className={`card-img-top`} loading='lazy' /> */}
//                                                                                 <ImageWithPlaceholder src={product.image_url} alt={product.slug} className={`card-img-top`} />
//                                                                                 {!Number(product.is_unlimited_stock) && parseInt(product.variants[0].status) === 0 &&
//                                                                                     <div className="out_of_stockOverlay">
//                                                                                         <p className="out_of_stockText">{t("out_of_stock")}</p>
//                                                                                     </div>
//                                                                                 }
//                                                                             </div>
//                                                                             {/* {console.log(product)} */}
//                                                                             <div className="card-body product-card-body p-3" >
//                                                                                 {product?.rating_count > 0 ?
//                                                                                     <div className='ratings d-flex align-items-center'>
//                                                                                         <LuStar className='me-2' style={{ fill: "#fead0e", stroke: "#fead0e" }} />
//                                                                                         <div className='border-end border-2 pe-2 me-2 avgRating'>
//                                                                                             {product?.average_rating?.toFixed(setting.setting && setting.setting.decimal_point)}
//                                                                                         </div>
//                                                                                         <div>
//                                                                                             {product?.rating_count}
//                                                                                         </div>
//                                                                                     </div> : null}
//                                                                                 <h3>{product.name}</h3>
//                                                                                 <div className='price'>
//                                                                                     <span id={`price${index}${index0}-section`} className="d-flex align-items-center">
//                                                                                         <p id='fa-rupee' className='m-0'>
//                                                                                             {setting.setting && setting.setting.currency}
//                                                                                             {product.variants[0].discounted_price === 0 ? product.variants[0].price.toFixed(setting.setting && setting.setting.decimal_point) : product.variants[0].discounted_price.toFixed(setting.setting && setting.setting.decimal_point)}
//                                                                                         </p>
//                                                                                         {(product?.variants[0]?.price && (product?.variants[0]?.discounted_price != 0)) && (product?.variants[0]?.price !== product?.variants[0]?.discounted_price) ?
//                                                                                             <span id={`price${index}-section`} className="d-flex align-items-center" >
//                                                                                                 <p id='relatedproduct-fa-rupee' className='fw-normal text-decoration-line-through m-0' style={{ color: "var(--sub-text-color)", fontSize: "14px" }}>{setting.setting && setting.setting.currency}
//                                                                                                     {product?.variants[0]?.price?.toFixed(setting.setting && setting.setting.decimal_point)}
//                                                                                                 </p>
//                                                                                             </span>
//                                                                                             : null}
//                                                                                     </span>
//                                                                                 </div>
//                                                                                 <div className='product_varients_drop'>
//                                                                                     <input type="hidden" name={`select-product${index}${index0}-variant-id`} id={`select-product${index}${index0}-variant-id`} value={selectedVariant.pid === product.id ? selectedVariant.id : product.variants[0].id} />
//                                                                                     {/* {console.log(product, product.variants)} */}
//                                                                                     {product.variants.length > 1 ? <>
//                                                                                         <div className='variant_selection' onClick={() => { setselectedProduct(product); setShowModal(true); setP_id(product.id); setP_V_id(product.variants[0].id); setQnty(product.variants[0].cart_count + 1); }} >
//                                                                                             <span>{<>{product.variants[0].measurement} {product.variants[0].stock_unit_name} </>}</span>
//                                                                                             <IoIosArrowDown  />
//                                                                                         </div>
//                                                                                     </>
//                                                                                         :
//                                                                                         <>

//                                                                                             {/* {document.getElementById()} */}
//                                                                                             <span className={`variant_value select-arrow ${product.variants[0].stock > 0 ? '' : ''}`}>{product.variants[0].measurement + " " + product.variants[0].stock_unit_name}
//                                                                                             </span>
//                                                                                         </>}



//                                                                                 </div>
//                                                                             </div>
//                                                                         </Link>
//                                                                         <div className='d-flex flex-row border-top product-card-footer'>
//                                                                             <div className='border-end'>
//                                                                                 {favorite.favorite && favorite?.favouriteProductIds?.some(id => id == product.id) ? (
//                                                                                     <button type="button" className='w-100 h-100 favouriteBtn' onClick={() => {
//                                                                                         if (user?.jwtToken !== "") {
//                                                                                             removefromFavorite(product.id);
//                                                                                         } else {
//                                                                                             toast.error(t('required_login_message_for_cart'));
//                                                                                         }
//                                                                                     }}
//                                                                                     >
//                                                                                         <BsHeartFill size={16} fill='green' />
//                                                                                     </button>
//                                                                                 ) : (
//                                                                                     <button key={product.id} type="button" className='w-100 h-100 favouriteBtn' onClick={() => {
//                                                                                         if (user?.jwtToken !== "") {
//                                                                                             addToFavorite(product.id);
//                                                                                         } else {
//                                                                                             toast.error(t("required_login_message_for_cart"));
//                                                                                         }
//                                                                                     }}>
//                                                                                         <BsHeart size={16} /></button>
//                                                                                 )}
//                                                                             </div>
//                                                                             <div className='border-end' style={{ flexGrow: "1" }}>
//                                                                                 {(cart?.isGuest === false && cart?.cartProducts?.find(prdct => prdct?.product_id == product?.id && prdct?.product_variant_id == product?.variants?.[0]?.id)?.qty > 0) ||
//                                                                                     (cart?.isGuest === true && cart?.guestCart?.find(prdct => prdct?.product_id == product?.id && prdct?.product_variant_id == product?.variants?.[0]?.id)?.qty > 0) ? <>
//                                                                                     <div id={`input-cart-productdetail`} className="input-to-cart">
//                                                                                         <button type='button' className="wishlist-button" onClick={() => {
//                                                                                             if (cart?.isGuest) {
//                                                                                                 AddToGuestCart(product?.id, product?.variants?.[0]?.id, cart?.guestCart?.find(prdct => prdct.product_id == product.id && prdct.product_variant_id == product.variants[0]?.id)?.qty - 1, 1);
//                                                                                             } else {

//                                                                                                 if (cart?.cartProducts?.find(prdct => prdct?.product_id == product?.id)?.qty == 1) {
//                                                                                                     removefromCart(product.id, product.variants[0].id);
//                                                                                                 }
//                                                                                                 else {
//                                                                                                     addtoCart(product.id, product.variants[0].id, cart?.cartProducts?.find(prdct => prdct?.product_id == product?.id)?.qty - 1);
//                                                                                                     // addtoCart(product.id, product.variants[0].id, cart?.cartProducts?.find(prdct => prdct?.product_variant_id == product?.variants[0]?.id)?.qty - 1);
//                                                                                                 }
//                                                                                             }

//                                                                                         }}><BiMinus size={20} fill='#fff' /></button>
//                                                                                         <div className="quantity-container text-center">
//                                                                                             <input
//                                                                                                 type="number"
//                                                                                                 min="1"
//                                                                                                 max={product.variants[0].stock}
//                                                                                                 className="quantity-input bg-transparent text-center"
//                                                                                                 // value={product.variants[0].cart_count} 
//                                                                                                 value={cart?.isGuest === false ? cart?.cartProducts?.find(prdct => prdct?.product_id == product?.id)?.qty : cart?.guestCart?.find(prdct => prdct?.product_id == product?.id)?.qty}
//                                                                                                 disabled
//                                                                                             />
//                                                                                         </div>
//                                                                                         <button type='button' className="wishlist-button" onClick={() => {
//                                                                                             if (cart?.isGuest) {
//                                                                                                 // AddToGuestCart(product?.id, product?.variants?.[0]?.id, cart?.guestCart?.find(prdct => prdct.product_id == product.id && prdct.product_variant_id == product.variants[0]?.id)?.qty + 1, 1);

//                                                                                                 const productQuantity = getProductQuantities(cart?.guestCart);
//                                                                                                 handleValidateAddExistingGuestProduct(
//                                                                                                     productQuantity,
//                                                                                                     product,
//                                                                                                     cart?.guestCart?.find(prdct => prdct?.product_id == product?.id && prdct?.product_variant_id == product?.variants?.[0]?.id)?.qty + 1
//                                                                                                 );
//                                                                                             } else {
//                                                                                                 const productQuantity = getProductQuantities(cart?.cartProducts);
//                                                                                                 handleValidateAddExistingProduct(productQuantity, product);
//                                                                                             }
//                                                                                         }}><BsPlus size={20} fill='#fff' /> </button>
//                                                                                     </div>
//                                                                                 </> : <>
//                                                                                     <button type="button" id={`Add-to-cart-section${index}${index0}`} className='w-100 h-100 add-to-cart active' onClick={() => {
//                                                                                         if (cart?.isGuest) {
//                                                                                             const productQuantity = getProductQuantities(cart?.guestCart);
//                                                                                             handleAddNewProductGuest(
//                                                                                                 productQuantity,
//                                                                                                 product
//                                                                                             );
//                                                                                         }
//                                                                                         else if (user?.jwtToken !== "") {
//                                                                                             const productQuantity = getProductQuantities(cart?.cartProducts);
//                                                                                             if ((productQuantity?.find(prdct => prdct?.product_id == product?.id)?.qty || 0) < Number(product.total_allowed_quantity)) {
//                                                                                                 addtoCart(product.id, product.variants[0].id, 1);
//                                                                                             } else {
//                                                                                                 toast.error(t("out_of_stock_message"));
//                                                                                             }
//                                                                                         }
//                                                                                         else {
//                                                                                             toast.error(t("required_login_message_for_cartRedirect"));
//                                                                                         }

//                                                                                     }} disabled={!Number(product.is_unlimited_stock) && product.variants[0].stock <= 0}>{t('add_to_cart')}</button>
//                                                                                 </>}
//                                                                             </div>

//                                                                             <div className='dropup share'>
//                                                                                 <button type="button" className='w-100 h-100 shareBtn' data-bs-toggle="dropdown" aria-expanded="false"><BsShare size={16} /></button>

//                                                                                 <ul className='dropdown-menu'>
//                                                                                     <li className='dropDownLi'><WhatsappShareButton url={`${setting.setting && setting.setting.web_settings.website_url}product/${product.slug}`}><WhatsappIcon size={32} round={true} /> <span>WhatsApp</span></WhatsappShareButton></li>
//                                                                                     <li className='dropDownLi'><TelegramShareButton url={`${setting.setting && setting.setting.web_settings.website_url}product/${product.slug}`}><TelegramIcon size={32} round={true} /> <span>Telegram</span></TelegramShareButton></li>
//                                                                                     <li className='dropDownLi'><FacebookShareButton url={`${setting.setting && setting.setting.web_settings.website_url}product/${product.slug}`}><FacebookIcon size={32} round={true} /> <span>Facebook</span></FacebookShareButton></li>
//                                                                                     <li>
//                                                                                         <button type='button' onClick={() => {
//                                                                                             navigator.clipboard.writeText(`${setting.setting && setting.setting.web_settings.website_url}product/${product.slug}`);
//                                                                                             toast.success("Copied Succesfully!!");
//                                                                                         }} className="react-share__ShareButton"> <BiLink size={30} /> <span>{t('tap_to_copy')}</span></button>
//                                                                                     </li>
//                                                                                 </ul>
//                                                                             </div>
//                                                                         </div>
//                                                                     </SwiperSlide>
//                                                                 </div>
//                                                             </div>
//                                                         ))}
//                                                     </Swiper>
//                                                 </div>
//                                                 <div className="col-1 d-flex align-items-center justify-content-center">
//             <FaCircleChevronRight className="swiper-button-next" size={40}    

// style={{
//     position: 'absolute',
//     top: '58%', // Adjusting position
//     zIndex: 10,
//     color: 'var(--swiper-navigation-color)', // Ensure color applies
//     display: 'flex',
//     cursor: 'pointer',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 'calc(var(--swiper-navigation-size) / 44 * 27)',
//     height: 'var(--swiper-navigation-size)',
//     marginTop: 'calc(0px - (var(--swiper-navigation-size) / 2))',
//     important: 'true',
//     color: cssmode.cssmode === 'dark' ? 'white' : 'black',
//      // This won't work in React, but inline should still take priority
// }} />
//                 </div>


//                                             </div>
//                                             {BelowSectionOfferArray?.filter((offer) => offer?.section?.title == section?.title)?.map((offer) => (
//                                                 <div className='col-md-12 p-0 col-12 my-5' key={offer?.id} onClick={() => {
//                                                     if (offer?.category) {
//                                                         dispatch(setFilterCategory({ data: offer?.category?.id.toString() }));
//                                                         navigate("/products");
//                                                     } else if (offer?.product) {
//                                                         navigate(`/product/${offer.product.slug}`);
//                                                     } else if (offer?.offer_url) {
//                                                         window.open(offer?.offer_url, "_blank");
//                                                     }
//                                                 }}>
//                                                     <img className={`offerImages ${offer?.category ? "cursorPointer" : ""} ${offer?.product ? "cursorPointer" : ""} ${offer?.offer_url ? "cursorPointer" : ""}`} src={offer.image_url} alt="offers" />
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     );
//                                 }
//                             })}
//                             <QuickViewModal selectedProduct={selectedProduct} setselectedProduct={setselectedProduct} showModal={showModal} setShowModal={setShowModal} setP_id={setP_id} setP_V_id={setP_V_id} />
//                             <Popup product_id={p_id} product_variant_id={p_v_id} quantity={qnty} setisLoader={setisLoader} toast={toast} city={city} />
//                         </>


//                     )
//                 }
//             </div>
//         </section>
//     );
// });

// export default ProductContainer;
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../api/api';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './product.css';
import { AiOutlineEye } from 'react-icons/ai';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsHeart, BsShare, BsPlus, BsHeartFill } from "react-icons/bs";
import { BiMinus, BiLink } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import QuickViewModal from './QuickViewModal';
import { FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';
import { IoIosArrowDown } from 'react-icons/io';
import { Dropdown } from 'react-bootstrap';

import { useTranslation } from 'react-i18next';

import { addtoGuestCart, setCart, setCartProducts, setCartSubTotal, setSellerFlag } from "../../model/reducer/cartReducer";
import { setFavouriteLength, setFavouriteProductIds, setFavourite } from "../../model/reducer/favouriteReducer";
import { setProductSizes } from "../../model/reducer/productSizesReducer";
import { setFilterCategory, setFilterSection } from '../../model/reducer/productFilterReducer';
import Popup from "../same-seller-popup/Popup";
import { LuStar } from 'react-icons/lu';
import Loader from '../loader/Loader';
import { setSelectedProduct } from '../../model/reducer/selectedProduct';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ImageWithPlaceholder from '../image-with-placeholder/ImageWithPlaceholder';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { setCSSMode } from '../../model/reducer/cssmodeReducer';
import { Button } from 'react-bootstrap';
import { ValidateNoInternet } from '../../utils/NoInternetValidator';

import { useWindowSize } from 'react-use';
const ProductContainer = React.memo(({ showModal, setShowModal, BelowSectionOfferArray }) => {
    const cssmode = useSelector(state => (state.cssmode));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { width } = useWindowSize();
   
    const { t } = useTranslation();
    const swiperRef = useRef(null);  // Ref for Swiper instance
    const [swiperInstance, setSwiperInstance] = useState(null); // Swiper instance state

    const city = useSelector(state => state.city);
    const shop = useSelector(state => state.shop);
    const setting = useSelector(state => state.setting);
    const cart = useSelector(state => state.cart);
    const sizes = useSelector(state => state.productSizes);
    const favorite = useSelector(state => (state.favourite));
    const user = useSelector(state => (state.user));

    const [selectedVariant, setSelectedVariant] = useState({});
    const [p_id, setP_id] = useState(0);
    const [p_v_id, setP_V_id] = useState(0);
    const [qnty, setQnty] = useState(0);
    const [loader, setisLoader] = useState(false);
    const [selectedProduct, setselectedProduct] = useState({});
    const [productSizes, setproductSizes] = useState(null);
    const [offerConatiner, setOfferContainer] = useState(0);
    const [variant_index, setVariantIndex] = useState(null);
    const [isNetworkError, setIsNetworkError] = useState(false);
    const[favoriteData,setFavouriteData]=useState(true);





    const handleMouseEnter = () => {

        if (swiperInstance?.autoplay) {


            swiperInstance.autoplay.stop();
            // Stops autoplay when hovered
        }
    };


    function IsContained(id) {
        return favorite.favorite.data.filter(item => item.id === id).map(item => item.id);

    }


    // Function to resume autoplay on mouse leave
    const handleMouseLeave = () => {
        if (swiperInstance?.autoplay) {

            swiperInstance.autoplay.start();  // Resumes autoplay when mouse leaves
        }
    };

    useEffect(() => {
        if (sizes.sizes === null || sizes.status === 'loading') {
            if (city.city !== null) {
                api.getProductbyFilter(city.city.latitude, city.city.longitude)
                    .then(response => response.json())
                    .then(result => {
                        if (result.status === 1) {
                            setproductSizes(result.sizes);
                            dispatch(setProductSizes({ data: result.sizes }));
                        }
                    });
            }
        }
        else {
            setproductSizes(sizes.sizes);
        }
    }, [city, sizes]);

    //Add to Cart
    const addtoCart = async (product_id, product_variant_id, qty) => {
        setP_id(product_id);
        setP_V_id(product_variant_id);
        setQnty(qty);
        await api.addToCart(user?.jwtToken, product_id, product_variant_id, qty)
            .then(response => response.json())
            .then(async (result) => {
                if (result.status === 1) {
                    // toast.success(result.message);
                    if (cart?.cartProducts?.find((product) => product?.product_id == product_id)?.qty == undefined) {
                        dispatch(setCart({ data: result }));
                        dispatch(setCartSubTotal({ data: result?.data?.sub_total }));
                        const updatedCartCount = [...cart?.cartProducts, { product_id: product_id, product_variant_id: product_variant_id, qty: qty }];
                        dispatch(setCartProducts({ data: updatedCartCount }));
                    } else {
                        const updatedProducts = cart?.cartProducts?.map(product => {
                            if (product.product_id == product_id) {
                                return { ...product, qty: qty };
                            } else {
                                return product;
                            }
                        });
                        dispatch(setCart({ data: result }));
                        dispatch(setCartProducts({ data: updatedProducts }));
                        dispatch(setCartSubTotal({ data: result?.data?.sub_total }));
                    }
                }
                else if (result?.data?.one_seller_error_code == 1) {
                    dispatch(setSellerFlag({ data: 1 }));
                    // toast.error(t(`${result.message}`));
                }
            });
    };

    //remove from Cart
    const removefromCart = async (product_id, product_variant_id, section_id) => {
        await api.removeFromCart(user?.jwtToken, product_id, product_variant_id)
            .then(response => response.json())
            .then(async (result) => {
                if (result.status === 1) {
                    // toast.success(result.message);
                    const updatedProducts = cart?.cartProducts?.filter(product => product?.product_id != product_id);
                    dispatch(setCartProducts({ data: updatedProducts }));
                }
                else {
                    toast.error(result.message);
                }
            });
    };
    console.log(favorite)
    //Add to favorite
    const addToFavorite = async (product_id) => {
        navigate("/")
                await api.addToFavotite(user?.jwtToken, product_id)
                    .then(response => response.json())
                    .then(async (result) => {
                        if (result.status === 1) {
                            // toast.success(result.message);
        
                            // Ensure favorite.favouriteProductIds is an array before spreading
                            const updatedFavouriteProducts = [
                                ...(Array.isArray(favorite?.favouriteProductIds) ? favorite.favouriteProductIds : []),
                                product_id
                            ];
        
                            dispatch(setFavouriteProductIds({ data: updatedFavouriteProducts }));
        
                            const updatedFavouriteLength = (favorite?.favouritelength || 0) + 1;
                            dispatch(setFavouriteLength({ data: updatedFavouriteLength }));
                        } else {
                            toast.error(result.message);
                        }
                    });
            };




    const removefromFavorite = async (product_id) => {
        await api.removeFromFavorite(user?.jwtToken, product_id)
            .then(response => response.json())
            .then(async (result) => {
                if (result.status === 1) {
                    // toast.success(result.message);
                    const updatedFavouriteProducts = favorite?.favouriteProductIds.filter(id => id != product_id);
                    dispatch(setFavouriteProductIds({ data: updatedFavouriteProducts }));
                    const updatedFavouriteLength = favorite?.favouritelength - 1;
                    dispatch(setFavouriteLength({ data: updatedFavouriteLength }));
                }
                else {

                    toast.error(result.message);
                }
            });
    };

    const CustomPrevButton = (props) => {
        const { slideCount, currentSlide, ...remainingProps } = props;
        return (
            <button {...remainingProps} type="button" className="slick-prev">
                <FaChevronLeft fill='black' size={30} className
                    ="prev-arrow" />
            </button>
        );
    };

    const CustomNextButton = (props) => {
        const { slideCount, currentSlide, ...remainingProps } = props;
        return (
            <button {...remainingProps} type="button" className="slick-next">
                <FaChevronRight fill='black' size={30} className='next-arrow' />
            </button>
        );
    };

    const settings = {
        infinite: false,
        slidesToShow: 4,
        slidesPerRow: 1,
        initialSlide: 0,
        // centerMode: true,
        centerMargin: "10px",
        margin: "20px", // set the time interval between slides
        // Add custom navigation buttons using Font Awesome icons
        prevArrow:
            // (
            //     <button type="button" className="slick-prev">
            //         <FaChevronLeft fill='black' size={30} className="prev-arrow" />
            //     </button>
            // )
            <CustomPrevButton />,
        nextArrow:
            // (
            //     <button type="button" className="slick-next">
            //         <FaChevronRight fill='black' size={30} className='next-arrow' />
            //     </button>
            // )
            <CustomNextButton />
        ,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    const placeHolderImage = (e) => {

        e.target.src = setting.setting?.web_logo;
    };

    function getProductQuantities(products) {
        return Object.entries(products.reduce((quantities, product) => {
            const existingQty = quantities[product.product_id] || 0;
            return { ...quantities, [product.product_id]: existingQty + product.qty };
        }, {})).map(([productId, qty]) => ({
            product_id: parseInt(productId),
            qty
        }));
    }

    const handleValidateAddExistingProduct = (productQuantity, product) => {
        if (Number(product.is_unlimited_stock)) {
            if (productQuantity?.find(prdct => prdct?.product_id == product?.id)?.qty < Number(product.total_allowed_quantity)) {
                // addtoCart(product.id, product.variants[0].id, product.variants[0].cart_count + 1);
                addtoCart(product.id, product.variants[0].id, cart?.cartProducts?.find(prdct => prdct?.product_id == product?.id)?.qty + 1);

            } else {
                toast.error(t("max_cart_limit_error"));
            }
        } else {
            if (productQuantity?.find(prdct => prdct?.product_id == product?.id)?.qty >= Number(product.variants[0].stock)) {
                toast.error(t("out_of_stock_message"));
            }
            else if (productQuantity?.find(prdct => prdct?.product_id == product?.id)?.qty >= Number(product.total_allowed_quantity)) {
                toast.error(t("max_cart_limit_error"));
            } else {
                addtoCart(product.id, product.variants[0].id, cart?.cartProducts?.find(prdct => prdct?.product_id == product?.id)?.qty + 1);
                // addtoCart(product.id, product.variants[0].id, cart?.cartProducts?.find(prdct => prdct?.product_variant_id == product?.variants[0]?.id)?.qty + 1);
            }
        }
    };
    const AddToGuestCart = (productId, productVariantId, Qty, isExisting) => {
        if (isExisting) {
            const updatedProducts = Qty !== 0 ? cart?.guestCart?.map((product) => {
                if (product?.product_id == productId && product?.product_variant_id == productVariantId) {
                    return { ...product, qty: Qty };
                } else {
                    return product;
                }
            }) : cart?.guestCart?.filter(product => product?.product_id != productId && product?.productVariantId != productVariantId);
            dispatch(addtoGuestCart({ data: updatedProducts }));
        } else {
            const productData = { product_id: productId, product_variant_id: productVariantId, qty: Qty };
            dispatch(addtoGuestCart({ data: [...cart?.guestCart, productData] }));
        }
    };

    const handleValidateAddExistingGuestProduct = (productQuantity, product, quantity) => {
        if (Number(product.is_unlimited_stock)) {
            if (productQuantity?.find(prdct => prdct?.product_id == product?.id)?.qty >= Number(product?.total_allowed_quantity)) {
                toast.error(t("max_cart_limit_error"));
            }
            else {
                AddToGuestCart(product?.id, product?.variants?.[0]?.id, quantity, 1);
            }
        }
        else {
            if (productQuantity?.find(prdct => prdct?.product_id == product?.id)?.qty >= Number(product?.variants?.[0]?.stock)) {
                toast.error(t("limited_product_stock_error"));
            }
            else if (productQuantity?.find(prdct => prdct?.product_id == product?.id)?.qty >= Number(product?.total_allowed_quantity)) {
                toast.error(t("max_cart_limit_error"));
            }
            else {
                AddToGuestCart(product?.id, product?.variants?.[0]?.id, quantity, 1);
            }
        }
    };

    const handleAddNewProductGuest = (productQuantity, product) => {
        if ((productQuantity?.find(prdct => prdct?.product_id == product?.id)?.qty || 0) < Number(product.total_allowed_quantity)) {
            AddToGuestCart(product.id, product.variants[0].id, 1, 0);
        } else {
            toast.error(t("out_of_stock_message"));
        }
    };



    function IsContained(id, favorite) {
        return favorite.favorite.data.filter(item => item.id === id).map(item => item.id);
    }

    function ProductButton({ product, favorite, user, addToFavorite }) {
        const [isFavorite, setIsFavorite] = useState(false);

        useEffect(() => {
            const result = IsContained(product.id, favorite);
            if (result.length > 0) {
                setIsFavorite(true); // Set as favorite if id is found
            } else {
                setIsFavorite(false); // Otherwise, not favorite
            }
        }, [favorite, product.id]);

    }
    useEffect(() => {
        const fetchFavorites = async () => {
            if (user?.jwtToken && city?.city) { // Check if user and city.city are defined
                try {
                    const response = await api.getFavorite(user.jwtToken, city.city.latitude, city.city.longitude);
                    const result = await response.json();
                    dispatch(setFavourite({ data: result }));
                } catch (err) {
                    const isNoInternet = ValidateNoInternet(err);
                    if (isNoInternet) {
                        setIsNetworkError(true);
                    }
                }
            } else {
                console.warn("User token or city data is not available.");
            }
        };
    
        fetchFavorites();
    }, [user, city]); // Add dependencies to re-run the effect when user or city changes
    

    return (
        <section id="products">
            <div className="container-fluid">
                {shop.shop === null || productSizes === null
                    ? (
                        <>
                            <div className="d-flex justify-content-center">
                                <Loader width={"100%"} height={"500px"} />
                            </div>
                        </>
                    )
                    : (
                        <>
                            {shop?.shop?.sections?.map((section, index0) => {
                                if (section.products.length > 0) {
                                    return (
                                        <div key={index0}>
                                            <div className='product_section row flex-column' value={index0} onChange={(e) => { setOfferContainer(index0); }}>
                                                <div className="d-flex product_title_content justify-content-between align-items-center col-md-12">
                                                    <div className="">
                                                        <p>{section.title}</p>
                                                        <span className='d-none d-md-block'>{section.short_description}</span>
                                                    </div>
                                                    <div>
                                                        {/* {console.log(section)} */}
                                                        <Link type="button" class="btn btn-outline-success " to="/products" onClick={() => {
                                                            dispatch(setFilterSection({ data: section.id }));
                                                            navigate('/products');


                                                        }}>{t('see_all')}</Link>
                                                    </div>
                                                </div>
                                                <div className="col-1 d-flex align-items-center justify-content-center" style={{ zIndex: 1 }}>

                                                </div>
                                                <div className="product_section_content p-0" style={{ zIndex: 1 }}>

                                                
                                                    <Swiper style={{ zIndex: 1 }}


                                                        //  ref={swiperRef}  // Assign Swiper reference                                                    spaceBetween={5}
                                                            //  ref={swiperRef}  // Assign Swiper reference                                                    spaceBetween={5}
                                                    slidesPerView={6}
                                                    spaceBetween={0}
                                                    navigation={{
                                                        prevEl: '.swiper-button-prev',
                                                        nextEl: '.swiper-button-next',
                                                    }}
                                                    modules={[Autoplay, Navigation]}
                                                    autoplay={{
                                                        delay: 60000000,
                                                        disableOnInteraction: false,
                                                        pauseOnMouseEnter: true// Allows autoplay after interaction
                                                    }}
                                                    //  onSwiper={setSwiperInstance} // Set swiper instance when it's initialized
                                                    breakpoints={{
                                                        224: { slidesPerView: 2 },
                                                        332: { slidesPerView: 2 },
                                                        472: { slidesPerView: 3 },
                                                        768: { slidesPerView: 4 },
                                                        1024: { slidesPerView: 5 },
                                                        1336: { slidesPerView: 6 },
                                                    }}
                                                >
                                                  {width > 1024 ? (
<FaCircleChevronLeft className="swiper-button-prev medium" size={40} />) : null}                                                    {section?.products?.map((product, index) => (
                                                        <div className="row" key={index}>
                                                            <div className="col-md-12">
                                                                <SwiperSlide className='product-card swiper-slide-card' style={{ padding: "5px" }}>


                                                                    <span className='border border-light rounded-circle' id='aiEye'>
                                                                        <AiOutlineEye
                                                                            onClick={() => {
                                                                                setselectedProduct(product); setShowModal(true);
                                                                                setP_id(product.id); setP_V_id(product.variants[0].id); setQnty(product.variants[0].cart_count + 1);
                                                                            }}
                                                                        />
                                                                    </span>
                                                                    <Link to={`/product/${product.slug}`} onClick={() => {
                                                                        dispatch(setSelectedProduct({ data: product?.id }));
                                                                    }} className='text-decoration-none text-reset'>

                                                                        <div className='image-container' style={{ textAlign: 'center', padding: '20px' }}>
                                                                            {/* <img onLoadStart={(e) => { e.target.src = setting.setting?.web_logo; }} onError={placeHolderImage} src={product.image_url} alt={product.slug} className={`card-img-top`} loading='lazy' /> */}
                                                                            <ImageWithPlaceholder src={product.image_url} alt={product.slug} className={`card-img-top`} style={{ maxWidth: '100%', height: 'auto', margin: '0 auto', display: 'block' }} />
                                                                            {!Number(product.is_unlimited_stock) && parseInt(product.variants[0].status) === 0 &&
                                                                                <div className="out_of_stockOverlay">
                                                                                    <p className="out_of_stockText">{t("out_of_stock")}</p>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                    </Link>
                                                                    {/* {console.log(product)} */}
                                                                    <div className='d-flex flex-row product-card-footer'>
                                                                        <div>
                                                                            <button
                                                                                key={product.id}
                                                                                type="button"
                                                                                className={`w-100 h-100 favouriteBtn px-3 border border-light rounded-circle ${favorite?.favorite?.data?.some(item => item.id === product.id) ? 'text-danger' : ''}`}

                                                                                onClick={() => {
                                                                                    if (user?.jwtToken !== "") {
                                                                                        addToFavorite(product.id);
                                                                                    } else {
                                                                                        toast.error(t("required_login_message_for_cart"));
                                                                                    }
                                                                                }}>
                                                                                <BsHeart
                                                                                    size={16}
                                                                                    className={favorite?.favorite?.data?.some(item => item.id === product.id) ? 'text-danger' : ''} // Conditionally add text-danger class to the heart icon
                                                                                />
                                                                            </button>

                                                                        </div>
                                                                        <div style={{ flexGrow: "1" }}>
                                                                            {(cart?.isGuest === false && cart?.cartProducts?.find(prdct => prdct?.product_id == product?.id && prdct?.product_variant_id == product?.variants?.[0]?.id)?.qty > 0) ||
                                                                                (cart?.isGuest === true && cart?.guestCart?.find(prdct => prdct?.product_id == product?.id && prdct?.product_variant_id == product?.variants?.[0]?.id)?.qty > 0) ? <>
                                                                                <div id={`input-cart-productdetail`} className="input-to-cart border border-secondary" style={{ background: "white" }}>
                                                                                    <button type='button' className="wishlist-button" style={{ background: "var(--secondary-color)" }} onClick={() => {
                                                                                        if (cart?.isGuest) {
                                                                                            AddToGuestCart(product?.id, product?.variants?.[0]?.id, cart?.guestCart?.find(prdct => prdct.product_id == product.id && prdct.product_variant_id == product.variants[0]?.id)?.qty - 1, 1);
                                                                                        } else {

                                                                                            if (cart?.cartProducts?.find(prdct => prdct?.product_id == product?.id)?.qty == 1) {
                                                                                                removefromCart(product.id, product.variants[0].id);
                                                                                            }
                                                                                            else {
                                                                                                addtoCart(product.id, product.variants[0].id, cart?.cartProducts?.find(prdct => prdct?.product_id == product?.id)?.qty - 1);
                                                                                                // addtoCart(product.id, product.variants[0].id, cart?.cartProducts?.find(prdct => prdct?.product_variant_id == product?.variants[0]?.id)?.qty - 1);
                                                                                            }
                                                                                        }

                                                                                    }}><BiMinus size={20} fill='#fff' /></button>
                                                                                    <div className="quantity-container text-center">
                                                                                        <input
                                                                                            type="number"
                                                                                            min="1"

                                                                                            max={product.variants[0].stock}
                                                                                            className="quantity-input bg-transparent text-center"
                                                                                            // value={product.variants[0].cart_count} 
                                                                                            value={cart?.isGuest === false ? cart?.cartProducts?.find(prdct => prdct?.product_id == product?.id)?.qty : cart?.guestCart?.find(prdct => prdct?.product_id == product?.id)?.qty}
                                                                                            disabled
                                                                                        />
                                                                                    </div>
                                                                                    <button type='button' className="wishlist-button" style={{ background: "var(--secondary-color)" }} onClick={() => {
                                                                                        if (cart?.isGuest) {
                                                                                            // AddToGuestCart(product?.id, product?.variants?.[0]?.id, cart?.guestCart?.find(prdct => prdct.product_id == product.id && prdct.product_variant_id == product.variants[0]?.id)?.qty + 1, 1);

                                                                                            const productQuantity = getProductQuantities(cart?.guestCart);
                                                                                            handleValidateAddExistingGuestProduct(
                                                                                                productQuantity,
                                                                                                product,
                                                                                                cart?.guestCart?.find(prdct => prdct?.product_id == product?.id && prdct?.product_variant_id == product?.variants?.[0]?.id)?.qty + 1
                                                                                            );
                                                                                        } else {
                                                                                            const productQuantity = getProductQuantities(cart?.cartProducts);
                                                                                            handleValidateAddExistingProduct(productQuantity, product);
                                                                                        }
                                                                                    }}><BsPlus size={20} fill='#fff' /> </button>
                                                                                </div>
                                                                            </> : <>
                                                                            </>}
                                                                        </div>
                                                                        <Dropdown drop="up" className="share">
                                                                            <Dropdown.Toggle
                                                                                className='w-100 h-100 shareBtn px-3 border border-light rounded-circle'
                                                                                style={{ padding: '10px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                                            >
                                                                                <BsShare size={16} style={{ color: "var(--font-color)" }} />
                                                                            </Dropdown.Toggle>

                                                                            <Dropdown.Menu style={{ width: "50px", padding: "5px", textAlign: "center", borderRadius: "10px" }} className='hide-pointer drop-menu'>
                                                                                <Dropdown.Item as="li" style={{ display: 'flex', justifyContent: 'center', borderBottom: "1px var(--font-color)  solid" }}>
                                                                                    <WhatsappShareButton url={`${setting.setting && setting.setting.web_settings.website_url}product/${product.slug}`}>
                                                                                        <WhatsappIcon size={30} round />
                                                                                    </WhatsappShareButton>
                                                                                </Dropdown.Item>
                                                                                <Dropdown.Item as="li" style={{ display: 'flex', justifyContent: 'center', borderBottom: "1px var(--font-color)  solid" }}>
                                                                                    <TelegramShareButton url={`${setting.setting && setting.setting.web_settings.website_url}product/${product.slug}`}>
                                                                                        <TelegramIcon size={30} round />
                                                                                    </TelegramShareButton>
                                                                                </Dropdown.Item>
                                                                                <Dropdown.Item as="li" style={{ display: 'flex', justifyContent: 'center', borderBottom: "1px var(--font-color)  solid" }}>
                                                                                    <FacebookShareButton url={`${setting.setting && setting.setting.web_settings.website_url}product/${product.slug}`}>
                                                                                        <FacebookIcon size={30} round />
                                                                                    </FacebookShareButton>
                                                                                </Dropdown.Item>
                                                                                <Dropdown.Item as="li" style={{ display: 'flex', justifyContent: 'center' }}>
                                                                                    <button
                                                                                        type='button'
                                                                                        onClick={() => {
                                                                                            navigator.clipboard.writeText(`${setting.setting && setting.setting.web_settings.website_url}product/${product.slug}`);
                                                                                            toast.success("Copied Successfully!!");
                                                                                        }}
                                                                                        style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                                                                                    >
                                                                                        <BiLink size={18} />
                                                                                    </button>
                                                                                </Dropdown.Item>
                                                                            </Dropdown.Menu>
                                                                        </Dropdown>
                                                                    </div>

                                                                    <div className="card-body product-card-body p-3">
                                                                        {product?.rating_count > 0 ? (
                                                                            <div className='ratings d-flex align-items-center'>
                                                                                <LuStar className='me-2' style={{ fill: "#fead0e", stroke: "#fead0e" }} />
                                                                                <div className='border-end border-2 pe-2 me-2 avgRating'>
                                                                                    {product?.average_rating?.toFixed(setting.setting && setting.setting.decimal_point)}
                                                                                </div>
                                                                                <div>
                                                                                    {product?.rating_count}
                                                                                </div>
                                                                            </div>
                                                                        ) : null}

                                                                        <h3 className='fw-bold'>{product.name}</h3>
                                                                        <br/>

                                                                        <div className='price d-flex flex-row mt-1'>
                                                                            <span id={`price${index}${index0}-section`} className="d-flex align-items-center">
                                                                                <p id='fa-rupee' className='m-0'>
                                                                                    {setting.setting && setting.setting.currency}
                                                                                    {product.variants[0].discounted_price === 0
                                                                                        ? product.variants[0].price.toFixed(setting.setting && setting.setting.decimal_point)
                                                                                        : product.variants[0].discounted_price.toFixed(setting.setting && setting.setting.decimal_point)}
                                                                                </p>

                                                                                {/* Display the original price if there's a discount */}
                                                                                {(product?.variants[0]?.price && (product?.variants[0]?.discounted_price !== 0)) && (product?.variants[0]?.price !== product?.variants[0]?.discounted_price) ? (
                                                                                    <span id={`price${index}-section`} className="d-flex align-items-center">
                                                                                        <p id='relatedproduct-fa-rupee' className='fw-normal text-decoration-line-through m-0' style={{ color: "var(--sub-text-color)", fontSize: "10hpx" }}>
                                                                                            {setting.setting && setting.setting.currency}
                                                                                            {product?.variants[0]?.price?.toFixed(setting.setting && setting.setting.decimal_point)}
                                                                                        </p>
                                                                                    </span>
                                                                                ) : null}

                                                                                {/* Calculate and display the discount percentage */}
                                                                                {(product?.variants[0]?.price && product?.variants[0]?.discounted_price !== 0 && product?.variants[0]?.price !== product?.variants[0]?.discounted_price) && (
                                                                                    <span className="discoutPercentage" style={{ fontSize: "1.4rem" }}>
                                                                                        ({Math.round(((product.variants[0].price - product.variants[0].discounted_price) / product.variants[0].price) * 100)}% OFF)
                                                                                    </span>
                                                                                )}
                                                                            </span>
                                                                        </div>

                                                                        {/* New Row for Button */}
                                                                        <div className="mt-3 priceBtn">
                                                                            <button
                                                                                type="button"
                                                                                id={`Add-to-cart-section${index}${index0}`}
                                                                                className='w-100 h-100 add-to-cart active'
                                                                                onClick={() => {
                                                                                    if (cart?.isGuest) {
                                                                                        const productQuantity = getProductQuantities(cart?.guestCart);
                                                                                        handleAddNewProductGuest(productQuantity, product);
                                                                                    } else if (user?.jwtToken !== "") {
                                                                                        const productQuantity = getProductQuantities(cart?.cartProducts);
                                                                                        if ((productQuantity?.find(prdct => prdct?.product_id == product?.id)?.qty || 0) < Number(product.total_allowed_quantity)) {
                                                                                            addtoCart(product.id, product.variants[0].id, 1);
                                                                                        } else {
                                                                                            toast.error(t("out_of_stock_message"));
                                                                                        }
                                                                                    } else {
                                                                                        toast.error(t("required_login_message_for_cartRedirect"));
                                                                                    }
                                                                                }}
                                                                                disabled={!Number(product.is_unlimited_stock) && product.variants[0].stock <= 0}
                                                                            >
                                                                                {t('ADD')}
                                                                            </button>
                                                                        </div>
                                                                    </div>



                                                                </SwiperSlide>
                                                            </div>
                                                        </div>
                                                    ))}
                                                      {width > 1024 ? (
            <FaCircleChevronRight className="swiper-button-next" size={40} />
        ) : null}

                                                    
                                                </Swiper>
                                                </div>
                                                <div className="col-1 d-flex align-items-center justify-content-center">

                                                </div>


                                            </div>
                                            {BelowSectionOfferArray?.filter((offer) => offer?.section?.title == section?.title)?.map((offer) => (
                                                <div className='col-md-12 p-0 col-12 my-5' key={offer?.id} onClick={() => {
                                                    if (offer?.category) {
                                                        dispatch(setFilterCategory({ data: offer?.category?.id.toString() }));
                                                        navigate("/products");
                                                    } else if (offer?.product) {
                                                        navigate(`/product/${offer.product.slug}`);
                                                    } else if (offer?.offer_url) {
                                                        window.open(offer?.offer_url, "_blank");
                                                    }
                                                }}>
                                                    <img className={`offerImages ${offer?.category ? "cursorPointer" : ""} ${offer?.product ? "cursorPointer" : ""} ${offer?.offer_url ? "cursorPointer" : ""}`} src={offer.image_url} alt="offers" />
                                                </div>
                                            ))}
                                        </div>
                                    );
                                }
                            })}
                            <QuickViewModal selectedProduct={selectedProduct} setselectedProduct={setselectedProduct} showModal={showModal} setShowModal={setShowModal} setP_id={setP_id} setP_V_id={setP_V_id} />
                            <Popup product_id={p_id} product_variant_id={p_v_id} quantity={qnty} setisLoader={setisLoader} toast={toast} city={city} />
                        </>


                    )
                }
            </div>
        </section>
    );
});

export default ProductContainer;