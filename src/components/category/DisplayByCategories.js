import React, { useEffect } from 'react';
import './DisplayByCategories.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setFilterCategory } from '../../model/reducer/productFilterReducer';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/navigation'; // Import Navigation module styles

import { Swiper, SwiperSlide } from 'swiper/react';
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { setCSSMode } from '../../model/reducer/cssmodeReducer';

const DisplayByCategories = () => {
    const { t } = useTranslation();
    const shop = useSelector(state => state.shop);
    const categories = shop?.shop?.categories || [];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Get theme from Redux store
    const theme = useSelector(state => state.theme);
    const cssmode = useSelector(state => (state.cssmode));
    // Dynamically set theme colors
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
            top: '50%', // Adjusting position
            zIndex: 10,
            color: 'var(--swiper-navigation-color)', // Ensure color applies
            display: 'flex',
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center',
            width: 'calc(var(--swiper-navigation-size) / 44 * 27)',
            height: 'var(--swiper-navigation-size)',
            marginTop: 'calc(0px - (var(--swiper-navigation-size) / 2))',
            important: 'true',
            left: 'var(--swiper-navigation-sides-offset, -20px)',
            right: 'auto' // This won't work in React, but inline should still take priority
        }}
    />
</div>


                {/* Category Navigation */}
                <div className="col-md-12 category-container">
                <Swiper
    spaceBetween={5}  // Space between slides
    slidesPerView={6}  // Number of slides to show at a time
    navigation={{ // Add navigation arrows
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
    }}
    modules={[Autoplay, Navigation]} // Include Autoplay and Navigation modules
    autoplay={{
        delay: 1500, // Delay between slides (in ms)
        disableOnInteraction: true, // Stop autoplay when the user interacts
    }}
    breakpoints={{
        320: { slidesPerView: 3 },
        576: { slidesPerView: 4 },
        768: { slidesPerView: 5 },
        992: { slidesPerView: 6 },
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
                                                backgroundSize: 'cover',
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
    <p className="category-subtitle text-muted">{t(category.subtitle)}</p>
</div>

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
            display: 'flex',
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center',
            width: 'calc(var(--swiper-navigation-size) / 44 * 27)',
            height: 'var(--swiper-navigation-size)',
            marginTop: 'calc(0px - (var(--swiper-navigation-size) / 2))',
            important: 'true',
              right: 'var(--swiper-navigation-sides-offset, -20px)',
          left: 'auto'
        }}
    />
</div>
            </div>
        </div>
    );
};

export default DisplayByCategories;
