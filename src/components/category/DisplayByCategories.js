import React from 'react';
import './DisplayByCategories.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setFilterCategory } from '../../model/reducer/productFilterReducer';

import 'swiper/css';  // Import Swiper styles
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
 // Import Swiper modules if you want additional functionalities like navigation
const DisplayByCategories = () => {
    const { t } = useTranslation();
    const shop = useSelector(state => state.shop);
    const categories = shop?.shop?.categories || [];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="container-fluid bg-light">
            <div className="row">
                {/* Category Navigation */}
                <div className="col-md-12 category-container">
                <Swiper
    spaceBetween={10}  // Space between slides
    slidesPerView={7}  // Number of slides to show at a time
    navigation // Enable navigation arrows
    modules={[Navigation]}  // Include Navigation module
    className="swiper-container"  // Add a className to target in CSS
>
    {categories.map(category => (
        <SwiperSlide key={category.id}>
            <div
                className="category-link cursor-pointer"
                onClick={() => {
                    dispatch(setFilterCategory({ data: category.id.toString() }));
                    navigate("/products");
                }}
            >
                <div className='p-4 d-flex justify-content-evenly'>
                    <div
                        className='category-image mx-4'
                        style={{
                            backgroundImage: `url(${category.image_url})`,
                            backgroundSize: 'cover',  // Ensure the image covers the div
                        }}
                    >
                        {/* Background image */}
                    </div>
                </div>
                <div className="text-center mt-2">
                    <h5 className="category-title">{t(category.name)}</h5>
                    <p className="category-subtitle text-muted">{t(category.subtitle)}</p>
                </div>
            </div>
        </SwiperSlide>
    ))}
</Swiper>

                </div>
            </div>
        </div>
    );
};

export default DisplayByCategories;
