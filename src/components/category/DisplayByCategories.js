import React from 'react';
import './DisplayByCategories.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setFilterCategory } from '../../model/reducer/productFilterReducer';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/navigation'; // Import Navigation module styles

import { Swiper, SwiperSlide } from 'swiper/react';

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
                        spaceBetween={5}  // Space between slides
                        slidesPerView={6}   // Number of slides to show at a time
                        navigation={true}   // Add navigation arrows
                        modules={[Autoplay, Navigation]} // Include Autoplay and Navigation modules
                        autoplay={{
                            delay: 1500, // Delay between slides (in ms)
                            disableOnInteraction: true, // Continue autoplay after user interactions
                        }}
                        breakpoints={{
                            // when window width is >= 320px (Extra small screen)
                            320: {
                                slidesPerView: 3, // Show 3 slides for extra small screens
                            },
                            // when window width is >= 768px (Small screen)
                            576: {
                                slidesPerView: 4, // Show 4 slides for small screens
                            },
                            // when window width is >= 1024px (Medium screen)
                            768: {
                                slidesPerView: 5, // Show 5 slides for medium screens
                            },
                            // when window width is >= 1200px (Large screens)
                            992: {
                                slidesPerView: 6, // Show 6 slides for large screens
                            },
                        }}
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
                                    <div className='d-flex justify-content-evenly'>
                                        <div
                                            className='category-image mx-2'
                                            style={{
                                                backgroundImage: `url(${category.image_url})`,
                                                backgroundSize: 'cover', // Ensure the image covers the div
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
