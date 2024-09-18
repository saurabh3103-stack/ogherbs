import React from 'react';
import Category from '../category/Category';
import Slider from '../sliders/Slider';
import './homecontainer.css';
import { useDispatch, useSelector } from 'react-redux';
import Brand from '../brands/Brand';
import ShopByCountries from '../shop-by-countries/ShopByCountries';
import ShopBySellers from '../shop-by-seller/ShopBySellers';
import { useNavigate } from 'react-router-dom';
import { setFilterCategory } from '../../model/reducer/productFilterReducer';
import DisplayByCategories from '../category/DisplayByCategories';
import CardSection from '../card-section/CardSection';
import ProductContainer from '../product/ProductContainer';

const HomeContainer = ({ OfferImagesArray, BelowSliderOfferArray, BelowCategoryOfferArray,showModal,setShowModal,BelowSectionOfferArray }) => {
    const shop = useSelector((state) => state.shop);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <section id="home" className='home-section container-fluid px-5 home-element section' style={{marginTop:"100px"}}>
            {/* Slider & Category */}
            {OfferImagesArray?.map((offer) => (
                <div className='col-md-12 p-0 col-12' key={offer?.id} onClick={() => {
                    if (offer?.category) {
                        dispatch(setFilterCategory({ data: offer?.category?.id.toString() }));
                        navigate("/products");
                    } else if (offer?.product) {
                        navigate(`/product/${offer.product.slug}`);
                    } else if (offer?.offer_url) {
                        window.open(offer?.offer_url, "_blank");
                    }
                }}>
                </div>
            ))}

            {/* Responsive Done */}
            <div className='home-container row'>
                <div className="col-md-12 py-0 col-12 pt-0">
                    <Slider />
                </div>
            </div>
            {/* Responsive Done */}

            {BelowSliderOfferArray?.map((offer) => (
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
                </div>
            ))}

            {/* Responsive Done */}
            <div className='mt-5'>
                <CardSection></CardSection>
            </div>
            {/* Responsive Done */}

            {/* Responsive Done */}
            <div className='mt-5'>
                <DisplayByCategories></DisplayByCategories>
            </div>
            {/* Responsive Done */}

            {BelowCategoryOfferArray?.map((offer) => (
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

            {/* Responsive Done */}
            <div className='mt-5'>
                <ProductContainer showModal={showModal} setShowModal={setShowModal} BelowSectionOfferArray={BelowSectionOfferArray} /> 
            </div>
            {/* Responsive Done */}

            {/* {shop.shop?.is_brand_section_in_homepage ?
                <div className='category_section'>
                    <div className="container-fluid">
                        <Brand />
                    </div>
                </div>
                : <></>}
            {shop.shop?.is_country_section_in_homepage ?
                <div className='category_section'>
                    <div className='container-fluid'>
                        <ShopByCountries />
                    </div>
                </div>
                : <></>}
            {shop.shop?.is_seller_section_in_homepage ?
                <div className='category_section'>
                    <div className='container-fluid'>
                        <ShopBySellers />
                    </div>
                </div>
                : <></>} */}
        </section>
    );
};

export default HomeContainer;
