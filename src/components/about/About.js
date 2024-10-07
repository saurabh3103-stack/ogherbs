

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import coverImg from '../../utils/cover-img.jpg';
import Loader from '../loader/Loader';
import './about.css';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate=useNavigate()
    

    const setting = useSelector(state => state.setting);
    const { t } = useTranslation();

    const placeHolderImage = (e) => {
        e.target.src = setting.setting?.web_logo;
    };
    const handleClick=()=>{
        navigate('/contact')
    }
    return (
        <section id='about-us' className='about-us'>
            {setting.status === 'loading' || setting.setting === null
                ? (
                    <Loader screen='full' />
                )
                : (
                    <>
                        <div className='cover'>
                            <img src={coverImg} className='img-fluid' alt="cover" onError={placeHolderImage}></img>
                            <div className='title'>
                                <h3>{t("about_us")}</h3>
                                <span> <Link to="/" className='text-light text-decoration-none'>{t("home")} /</Link> </span><span className='active'>{t("about_us")}</span>
                            </div>
                        </div>
                        <div className='container'>
                            <div className='about-container' dangerouslySetInnerHTML={{ __html: setting.setting.about_us }}></div>
                        </div>
                    </>

                )}
              



    
<section className="about-section">
    <div className="container">
        <div className="row">
            {/* Text Content Column */}
            <div className="content-column col-lg-6 col-md-12 col-sm-12 order-2">
                <div className="inner-column">
                    <div className="sec-title">
                        <span className="title text-success">More About OG Herbs</span>
                        <h2 style={{color:"var(--font-color)"}}>Empowering Healthy Living with Organic Products Since 2015</h2>
                    </div>
                    <div className="text">
                        Welcome to <strong>OG Herbs</strong>, powered by <strong>Deific Digital</strong>. Since 2015, we've been committed to bringing you high-quality organic herbs and groceries to help you live a healthier, more sustainable life. Our team of tech enthusiasts works hard to ensure that our platform is seamless, user-friendly, and provides you with the freshest organic produce, herbs, and pantry essentials.
                    </div>
                    <div className="text">
                        At <strong>OG Herbs</strong>, we believe in supporting local farmers and ensuring our customers receive the best products at competitive prices. With fast and reliable delivery services, we aim to make your grocery shopping experience convenient and stress-free, so you can focus on a healthier lifestyle.
                    </div>
                    <div className="btn-box">
                    <button type="button" class="btn btn-outline-success px-4" style={{fontSize:"20px",borderRadius:"10px"}} onClick={handleClick}>Contact us</button>
                    </div>
                </div>
            </div>

            {/* Image Column */}
            <div className="image-column col-lg-6 col-md-12 col-sm-12">
                <div className="inner-column wow fadeInLeft">
                    <div className="author-desc">
                        <h2 style={{ fontWeight: "bolder" }}>OG HERBS</h2>
                        <span>Deific Digital</span>
                    </div>
                    <figure className="image-1">
                        <a href="#" className="lightbox-image" data-fancybox="images">
                            <img src="https://sendapp.com.au/wp-content/uploads/2023/05/istockphoto-1363056697-612x612-1.jpg" alt="OG Herbs" />
                        </a>
                    </figure>
                </div>
            </div>
        </div>
    </div>
</section>

{/* <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" /> */}
<section class="about-cards-section">
  <div class="container">
    <div class="row">
      <div class="col-sm-4 card-wrapper">
        <div class="card border-0">
          <div class="position-relative rounded-circle overflow-hidden mx-auto custom-circle-image">
            <img class="w-100 h-100" src="https://cdni.iconscout.com/illustration/premium/thumb/man-select-product-in-online-shopping-app-illustration-download-svg-png-gif-file-formats--boy-male-pack-e-commerce-illustrations-6480696.png?f=webp" alt="Card image cap"/>
          </div>
          <div class="card-body text-center mt-4">
            <h1 class="text-uppercase card-title font-weight-bold"  >Choose product</h1>
            <p class="card-text"> you need to be sure there isn't anything emc barrassing hidden in the middle.</p>
          </div>
        </div>
      </div>

      <div class="col-sm-4 card-wrapper">
        <div class="card border-0">
          <div class="position-relative rounded-circle overflow-hidden mx-auto custom-circle-image">
            <img class="w-100 h-100 " src="data:image/png;base64,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"/>
          </div>
          <div class="card-body text-center mt-4">
            <h1 class="text-uppercase font-weight-bold card-title"  style={{fontWeight:"bolder"}}>Make Your Payment</h1>
            <p class="card-text ">Experience hassle-free online shopping with our service! Simply choose the product you want.</p>
          </div>
        </div>
      </div>

      <div class="col-sm-4 card-wrapper">
        <div class="card border-0">
          <div class="position-relative rounded-circle overflow-hidden mx-auto custom-circle-image">
            <img class="w-100 h-100" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABQVBMVEX////OBiv//v////3OBiozMzP//f/8///NBizLAA/NACX//PzNByrbrbLPACn///z57O7MX2QuLi7/9PcmJibAEiHBAADOACMeHh7PACTOAB/39/fGAADb29sYGBjh4eG/ABLCAAq0AADJABbZgIvLP0m5ubmAgICpqamLi4sjIyNnZ2ft7e0PDw/Pz8/SABi8ABfqwsZDQ0NbW1sAAACioqK0tLTz3uO1AA3w1NnousPbk6PUf5HOTlmWlpZQUFDYi429P0v/7PO7KjviprLBTVfIMz3EHi/Qa3Dkr7zio7DXh5vSdIfOZnzIVXHCSWOyMkDPkZewHSOqABHrwMmyW2LCeH65LD7flJjfV2jRcnujLjrSnKHgoaLLU1/01+GuS1PEXWrwzsnutbbOKTvWZ3DcW2vWd3nDKELeOk7YtruK+rX1AAATJElEQVR4nO1bDVfb1rI9+sASkiwLC1tYEOoPyCeJ7bSNbFoSbGJMe/sR2lzg+uKkQPJ4r///B7w9c2RjjNPetWo3a911dlOwZUk+o5mzZ8+cgxAKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/bdi59+w+8Gxn/XOPZBFYv//g+ermGmFzbenJw53PPaA5496D1c18fmmM/NrTL+9/7kHNEV88+Yqty+fzq6ureWlqfnPpv8bGR0/zbNHmqwcvH754+PWjL5fkkbVXX3zusc0DXyytwprVtSf3b/jFvfdoaY2tfvgZRzYn3N/Mk7ce3WGW+88fw8bNB3/fUAyCfGXp/IuOyc8sXR+/xrv0fB0X6BZ+Cv6f7oBXt+/6YpPMeML2PRsd3JHmfv0Unz1+siiDMGah3zkqzeAftz60DMO4fZrO51kTN8zp0+YBL2HF0xfy9Tgi76cO/eI5Anh1QSamDqMfBv7T9Qz+Sbgu/sE1wSRcywon3lrkQTIvudo/OjraGrbpHiITTEM8fJq/l37n2Ic3HPoEkfr40SIMXA+DJGm3m823u9+9/v77b775x7ff/vDjjz/+9PPPP3c6nTfHwgp+KdyglQhxXB69a7zBE7DwcNorhXJMKDd6l2Tvr4VbaLzJiId/yJdP4MXNhWQNchq5axohwQ1dSyQNf4xSqyvEXmn0Nt52jQzidNiKNdvUNM3W/Lj8WojLSunmIt/0470ZM+EW3C9BRI8XJ3Aku0wPgsNXNDds27Q1hnOYMbotX76xfe/QpfC+qji2DetMNrLUCqyrMlkrYeJi5wi3Wv9kRrgH965T0lgY20zw5zRyIrtMY7XJR2b0TojdMjtLM8ngENeGBz486Jm1skMn2ZWmOK7hAjqD/9dsZ5/u9WwqCkce2/mazfwKcfpMzBu6pBqDwlVPqVNnUPBmXLj1uMYWmhxtAyH2Y8SiNrYQTq7AQtsvn131fbK9nhVbdc3xPI+t0xzfqWT526ZKiZE56eFHq0v5L+dtoLseMNO8BdGAaUA0kml++glU0+t0/ol5eBTZHiIyPu10tk+HItNxRvGnOf3Q0MUWJqGvRStCdHzNZAtPtnGyQ0/Btj+AsU7bM758OmrXQTZf3Ztx4l+BnjE+QTLMM2GInL/nw0LNL4R8hZWU2VE08Wxp4Z6HN158LjIHJTK+vMtntiuIU5xzxpfN+PJnL6YOvIQT5y5tZjCcIW5mZM4y9D5PJf+QR2nIaWl6/yJq8fsB4qBPnrKXd0XYjxGRUbVNCQQn4jzbrGUp2WZmfPeDaX/tQKLm51gUS+OMT5OMPCmQtOisQMSRdhlEeOf1zxyysBAgXxZ8YtH6UCRvtgmnAV/K89c2i21ovQnhN8b63dzwJL/0dJ5cM+k/Y+Q5ffqcpMLJIT4BAxmG5R46NAFPX0fk2AaMCQomneH3EwF2QpRnDL7JtYMY1bRiVwqmOxY+e3pnRC/WllZfztFCjH99XUqat7u3JM1PqaT5dyKstxUmleXX8pJ2A1xix1tXkeaRhZYIC/wIzFI/O3FrQ+wheD3TrrrpoxJC3DLywavJd+69F674YnPeKRFJYRbF3ABuG8ZsYTw4BwLxukYUU9sdRhS8jQSilEiTmbVyEXB1wSWIfuCDfzTvkL+HJPtUfKzeIpX1e5iALubh87la+KcwKP3J8Uf1er3RFR+RDcl3Z3TYbECmirOaL/O6FhWaY2+FfZ8YiDRCRiTHU2y6/vLV6gzafJWfK9VIG8bVk5XGkHFDPnToY0lqL1JpB274C8+5bbEfkUprvcfAw9PYTCVAqXpMvELiISkjRG0b8xdoVr8Xk0HqvlrL59e+vjMaUM3afLUpkccfUCnyPXS2zWRqe3bcoySH4IO02SJK9cttPBAr6dVMFt50ZD9HNTGMqrCYrZ/T8xvWGleyKJZfdn9z9cHzpad33PVgzhbqLtVOCRTNhKT5YSxpep2ssFxSYqyi2bDzGlS4uZxF0qBsUUaphIGHg9pI6PitXVkRXzWQKkxKkzDxLPIbu8KS1bJggSburz29U0/N2UIpP1HmQoDeJRmGJbpVNs9vVFtVhOA7tqSciAHRi9m6JIchmL8rYF76eBim0xEUpixfkfErlxAN4ii2S+WmxTmDvPhwjXz41ayEOPcoTV9MharFvGAJ3Wq3OPzirSDpdkO3bJKUPnDJhzCgfGlJqWMlnZonnYgcaegZMooqkkJioYTcg8d90JAucjp5cX0pv5qf0XwC06wustN/i81pMsHs3TI5zay9ZrMvOTmWjsLwIznTLDeFm7YpwkHDZBvhYJqHNH8Rx79Q9aGDV3271G9bVtrJ2nmy9PxubtfnnC3+pOoWPMWGNRLaPkxB7IFBufLtHx7aWmph+9d+v9AvHIRixaES2IeF8H2m73Dl1MFtLA5104OJFDUyWqZctf4Mcm3uGT8lGpI0kmhY0khN0wPRENFjOoEmvSrGhum2hxqXCgnfY0WmwcLssm96XnTKmpyqXvIh1GpLI5dCzuJJtls+lSNaBC9yRarfrTV2QDv315by81VtMJJbNKG7PkEvQRh0u0GAfxjHBRgEIy106ewAks3kfgUfRMbfFed1okyyBMUETOR5aFjtMhXAZrRF1zXLZip7Cu8px1rWzHJq3spbvxOlMnyY8XLI9nhhZToRz7zDkD5MGxi2b6aNm/KVOK5TGUhtimzNJsf2WYg2yaG2Fw/ptsNaWjLbpYNECvFZU2SHuqYLIRpdGqtPdXvxmK3wAz/90p7IsYJDxNqm02iMWOVKnNQp9cfHQgxitvUd+ydb57hEGMPC49hOe1d2dBDQna1ZKuPrxwuogP8Q0MtJhdSY51zTU3c7kj0+NNuvG/akhR6iMSlQQ8qGrdZYzvoVbl9waqGotn0t7gQ3tdpt5JfmWx6Cv4KuJJq7THMBpvkNxV+7SHPOpCA0qHNKBENzrl22J6IUhjl7fWIhU6tcsjzD/CXvF6ga5icjtbkHZdRxxUwLXz6ed2UxLp1uSAYM072BS9PJpNCj6tCwsjUTE9COzkh1sk8qQ9Es+rbsqLE2jVdIKAiqDomRMCkN3f2Qajr5M+6Etw1c50mys5hu4qchZc1x7MEX5kaTaqBBzG3FYjO10NNqIJKLmm+nHVXbr6VM4vbBOqbnUzoUQTVyJuDVeuEtKt3hphtVTnNvJkqK0fVR19QYdVMMPoj5dF2LojiKi8jiEOG1OMabKrLIdxtR5ETRBtwZDsqxz3miVCsPAqJiyvE4M4prH7kR0lu5jXfH7q1xPAOBPgCRrv3NS8FIGeJ8SwJxZQTpa0pxzfRlk3zdHPzSKpfLv3b2iVd0CtJgID/Pipnp/W46fLSGGJ3zQjDVTgGIhtrBoy5NuvL0408X73q/NTlhpCMyJpP0xCyi4VsixH0SIpV0/cMan6sbwpgiFio2ppnmBSbh43lnCsOYZBkSzyOGSQjdJLQMaiBy1JGaNCx9tDYsExo+zeClwQcw8pxuybVSnSUeXZnj2oof0Mg++mcZaa+DHwcde7KafzVrlH8Jf668LeoBTDxuw3Jp0LSs7eJDF2LcpTci4+o54RqW7BtiyHivG7y+mnZF8ChytD4sjbSo2447ZegB5ISRca0vny+mbEqtnOplGOS8DMaxzy3evb131/uXOTgjONhO8SYUF/T7oCkw6uwhvT5O+OPTxHBX+KTjy9PR+b+FmR6/6LxbuR4GlsXt44NdTHW+XbD+GXaAIXZW6o5TchzfceLiSs6CACg5fglH4g8ic1gvOVHxPaW//TrywfJxlxjWqb63gkKMkzZ2ryqRzxmi3hNhteTRzRwnKiOnhAWcu/yNEAex49UHizAARMOSZqxpRlTzww+DwcXRxTl092mJagmZC5aPLYhr1EQeybR3IuyXuJIg51+QaKldBUX6qJogXUKfacXwTLYibTseiKTl841IKdQvhOg4phbvi/dFCIVq+27X/6+DmeaGZohokgm0EUlBn7q6XiOiVbOoY4izSK5kl5YH4n2DRUuGSGfb0XyzfJkUbc/0WgmKCdv2vG0S43hCpThePqPmGy0bNyJabCyEpB9sWAhVTk08a2Y59ZdN/KM1GUoESQH+8g/bZ7TI4m1Td4Za9afchmvSMpuzzWMr+J5tVpNuEf42W4E4iqHvavuih6ICjwbn71K1AZMu2r2SZpqNrsBNvfoWXOnbtebsYuOvmyhklXjbTmNkPfQ1dZecjlwKdKCY96hIKL6FhNNprd62nSPiTkQntHch7JIeN1uJe0BCtNLM/ELt5PJ7+h44C/qvfsxdA1q0uirDeVtJ0bOdQ3fW8OYE65PhgRxIS4B2fEQBhii9ELzwZBcTi5LYPq1gwE+CKhBa8t7WgwZi06x2aRUVFgdBgURtP+DzB7EHb2U5cqlB1a7i3oMhHuLyEKl0Abatj5iGNY1kGtkSBtUcHZ24FnUoNLu+T79tu34igoaP+qca5mjpZVCnogOyTLd2K1RUgXwa1LaqBrvLVCj2qMYyufeIp6j3HLmLoVOy7RIUOU3yeLDim36/Swpg/jaCaNbHLDPil/ftMQyLq3Yb9QPVgLQE2q7SNOzj4owlMJ94xIjmIdiDWjIhzVut6p4gIO0akQvIqNTjueAeIuLtVpLQnI2hbTOgp9L2BzLzpgO3KMy4Owfvnudzx/AiksvVTZ5n/YuLi3MRHhA1UuvQEFsOce0ZEoiHqGyFHd/UqAGZrZPFHy5WelkRVMBCfuHjQaT5TpEk+gotoXpy8UNfSJgSPnVfUlOWkANuIxmYKN7b3FGCXaVoeYggM5FI+ryiTZ1Su5xlCz2/0C2gYvT7IZELNdhK8cauSIqUZ8zIoRk6pIJDbluhaJ79kBcNK2OFVQwAOd2ltGgjkfOYqKKPr8CvtNfpgFva29SDgl8Qiabp9Nu09F9aEbKz72EO4zNai4Jn4TTnf9psUbYiVzZ2F2MALXDLfvCNpkmp5lsq7E4Sy0iIIkuHmYAaFTJJI6xIwsGfzWVaNu3JxVCQiF8MLPfQ9G3n4HvHw/Q9F3J12HRQQQfivMbiBqfacasJqrLoGclFkMVYmAqaSZ65YZn25WWIyhYJ3HP2RHsDQ4m3hd7BfPOcj9fXg4AEHK19c4eqRbvXGq7MJqW9AfSYBrcZ1H3TCnR+SAsCphadhadIlXgwluwvM5EtJkJv94Pv5ESu2UiF0qY7qEzbjlZEeAhfypVtS5yQheBL2vZFLW1zW4jctmObzt4eLKQNYUEV19N8pPl+RGwEtnrn2L7zvxlc5pKLeTvHIqFP/RYjhUMHSIX6zj7vjDGdLdEtcIM/5Mr1oyO7ibQ3kVrh1GN0oaZt7//6pu1HRwLkAk51tl1WZB0YT7xMZiEuqFsFArPjdwtx4X/EzAY9dk/DY9+idOcMJbmUDjK82rhNHWyMGLl6yOnvBJdwY5T7iLQct1vGfIQQIIS8D6dCrKX5/lG6l0HG+WKAbC837THRUKNmJGr+QUxz8jsCcY/W6jGfeo5tm0gGIBfbi1fY/EyBmvQUsRZt3ZPM4vacdFeDhiKRLIeF1/x9JIc0rRF2Gz4XTXjISZUsPFuYhS7bOOaZ90Bb2vu2CSQW8QZZGHANZVYSokMIro9JO2lbQQ3SxOk38UZckL6uUUu156QbFrzDjBD7dL1zTY8RxEkd70PEAazmBjO/JB3x2WDRY0cg7svlp0YoTmLUtV5cLG5UQwyP1HZlo3iin/KUJJnSK6WLTA4F30pEe/xqOKcv5RAilioK1noG5UObLluEmpm4p86SN119MtI9+7yEL9Il/AhK2SMqhXQhRcMba2j1m5eBwfY0n1APdXHhxchC2pGob5dMXm+zkR2GxMuYdMMYQo4azLSXQfOoUPxMsCgJwIU+Lfr6voMkLbZ5Z6nJvDnknQpgoHIzoe0LqIfkeky6rYY2vFF2t8n6+IR2DZs0V3/gPQsBPcbriHTEwvJ9GI4kDU+93RtV880ZcA5VOtxYHqH8BlVv2Bi93bgWJ6MPq+3LIh3qUAa9SI9uHOBdUh2fPxQrGzX8zoo9nLFxCDlh5Dp08sEnVkvnYuKEnkmVzFsGEQ08JtrZEZrtED5dH7/PtsXv49dhwr9+p8Brjq+gnamjN99lk/T8QPz+nTwXZ/+eXraAHtR/9Ahyt3TOdEfHuPvSunWKnrt1QW7q9jctotxCmEYww0x0oohvJmUNbRcZP1tdnjciIQwq/ZMvAr2yMrznUr9Z2zXGW//l5Rn6hA7ocptOjjb30V8UUVN/1srNHDHdcNPTg+Kmr2DxctJEd3/y79cyvO5iZOS2PH2kcK2cwUsVvOlB7hKQW09FhnYNSct0flh/Z5ROuFE+7tEb+cczhjXiBN0Yb9XUb23dNGb81ZrOMZq6lx/B1DmfZxoqKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKHwO/D/0XlkBM3xrWwAAAABJRU5ErkJggg==" alt="Card image cap"/>
          </div>
          <div class="card-body text-center mt-4">
            <h1 class="text-uppercase card-title font-weight-bold" style={{fontWeight:"bolder"}}>Our Expertise</h1>
            <p class="card-text ">Experience hassle-free online shopping with our service! enjoy fast delivery right to your doorstep..</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

        </section>
    );
};

export default About;
