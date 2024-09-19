import React from 'react';
import './cardSection.css';

const WidgetContainer = () => {
  return (
    <div className="widgets__Container">
      <div className="widgets__WidgetContainer">
        <div className="SaleCouponList__Wrapper">
          <div className="SaleCouponList__Container">
            {/* First Image */}
            <div className="Imagestyles__ImageContainer">
              <img
                src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/pharmacy-WEB.jpg"
                alt="masthead_web_pharma"
                width="310.4"
                height="195"
                loading="lazy"
                style={{ borderRadius: '16px', objectFit: 'fill', cursor: 'default' }}
              />
            </div>

            {/* Second Image */}
            <div className="Imagestyles__ImageContainer">
              <img
                src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/pharmacy-WEB.jpg"
                alt="masthead_web_pharma"
                width="310.4"
                height="195"
                loading="lazy"
                style={{ borderRadius: '16px', objectFit: 'fill', cursor: 'default' }}
              />
            </div>

            {/* Third Image */}
            <div className="Imagestyles__ImageContainer">
              <img
                src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/Pet-Care_WEB.jpg"
                alt="masthead_web_pet_care"
                width="310.4"
                height="195"
                loading="lazy"
                style={{ borderRadius: '16px', objectFit: 'fill', cursor: 'default' }}
              />
            </div>

            {/* Fourth Image */}
            <div className="Imagestyles__ImageContainer">
              <img
                src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-03/babycare-WEB.jpg"
                alt="masthead_web_baby_care"
                width="310.4"
                height="195"
                loading="lazy"
                style={{ borderRadius: '16px', objectFit: 'fill', cursor: 'default' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetContainer;