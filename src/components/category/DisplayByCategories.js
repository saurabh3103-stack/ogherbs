import React, { useEffect, useRef, useState } from 'react';
import './DisplayByCategories.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setFilterCategory } from '../../model/reducer/productFilterReducer';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import CategoryComponent from '../product/Categories';// Import CategoryComponent

const DisplayByCategories = () => {
    const { t } = useTranslation();
    const shop = useSelector(state => state.shop);
    const categories = shop?.shop?.categories || [];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const swiperRef = useRef(null);  // Ref for Swiper instance
    const [swiperInstance, setSwiperInstance] = useState(null); // Swiper instance state
    const theme = useSelector(state => state.theme);
    const cssmode = useSelector(state => state.cssmode);

    const handleSelectedCategories = (categoryId) => {
        dispatch(setFilterCategory({ data: categoryId }));
        navigate("/products");
    };

    const setThemeColors = (primaryColor, secondaryColor, textColor) => {
        document.documentElement.style.setProperty('--primary-color', primaryColor);
        document.documentElement.style.setProperty('--secondary-color', secondaryColor);
        document.documentElement.style.setProperty('--text-field-color', textColor);
    };

    useEffect(() => {
        if (theme) {
            setThemeColors(theme.primaryColor, theme.secondaryColor, theme.textColor);
        }
    }, [theme]);

    return (
        <div className="container-fluid categories">
            <div className="row">
                {/* Left Navigation */}
                <div className="col-1 d-flex align-items-center justify-content-center">
                    <FaCircleChevronLeft 
                        className="swiper-button-prev" 
                        size={40} 
                        style={{
                            position: 'absolute',
                            top: '50%',
                            zIndex: 10,
                            color: 'var(--swiper-navigation-color)',
                            cursor: 'pointer',
                        }}
                    />
                </div>

                {/* Category Navigation */}
                <div className="col-md-12 category-container">
                    <Swiper
                        ref={swiperRef}  // Assign Swiper reference
                        spaceBetween={0}
                        slidesPerView={6}
                        navigation={{
                            prevEl: '.swiper-button-prev',
                            nextEl: '.swiper-button-next',
                        }}
                        modules={[Autoplay, Navigation]}
                        autoplay={{
                            delay: 15000000000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true // Allows autoplay after interaction
                        }}
                        onSwiper={setSwiperInstance} // Set swiper instance when it's initialized
                        breakpoints={{
                            320: { slidesPerView: 3 },
                            576: { slidesPerView: 4 },
                            768: { slidesPerView: 5 },
                            992: { slidesPerView: 7 },
                        }}
                    >
                        {categories.map(category => (
                            <SwiperSlide key={category.id}>
                                <div
                                    className="outer-circle category-link cursor-pointer"
                                    onClick={() => handleSelectedCategories(category.id)} // Call the function on click
                                >
                                    <div
                                        className='inner-image'
                                        style={{
                                            backgroundImage: `url(${category.image_url})`,
                                        }}
                                    />
                                </div>
                                <div className="text-center mt-2">
                                    <h5 
                                        className="category-title" 
                                        style={{ color: cssmode.cssmode === 'dark' ? 'white' : 'black' }}
                                    >
                                        {t(category.name)}
                                    </h5>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Right Navigation */}
                <div className="col-1 d-flex align-items-center justify-content-center">
                    <FaCircleChevronRight 
                        className="swiper-button-next" 
                        size={40} 
                        style={{
                            position: 'absolute',
                            top: '50%',
                            zIndex: 10,
                            color: 'var(--swiper-navigation-color)',
                            cursor: 'pointer',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default DisplayByCategories;
