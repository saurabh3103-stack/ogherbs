
import React from 'react'
import { useSelector } from 'react-redux'
import coverImg from '../../utils/cover-img.jpg'
import './contact.css'
import Loader from '../loader/Loader'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { MdOutlineMail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaLocationArrow } from "react-icons/fa";

const Contact = () => {

    const setting = useSelector(state => (state.setting))
    const {t} = useTranslation()
    const placeHolderImage = (e) =>{
        
        e.target.src = setting.setting?.web_logo
    }
    return (
        <section id='contact-us' className='contact-us'>
            {setting.setting === null ? <Loader screen='full' />
                : (
                    <>
                        <div className='cover'>
                            <img  onError={placeHolderImage} src={coverImg} className='img-fluid' alt="cover"></img>
                            <div className='title'>
                                <h3>{t("contact_us")}</h3>
                                <span> <Link to="/" className='text-light text-decoration-none'>{t("home")} /</Link> </span><span className='active'>{t("contact_us")}</span>
                            </div>
                        </div>
                        {/* <div className='container'>
                            <div className='contact-wrapper'  dangerouslySetInnerHTML={{ __html: setting.setting.contact_us }}>
                          

                            </div>
                        </div> */}
                    </>
                )}
                 <section id='contact-us' className='contact-us' style={{marginTop:"10px"}}>
            {setting.setting === null ? <Loader screen='full' />
                : (
                    <>
                      
                        <div className='container'>
                            <div className='contact-wrapper'>
                                  {/* Map Section */}
                                <div className="map-section mb-4">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d228624.5610691504!2d80.17356440406607!3d26.44738660476833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c4770b127c46f%3A0x1778302a9fbe7b41!2sKanpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1726799760906!5m2!1sen!2sin"  height="350" style={{width:"100%",border:"0"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                </div>
                                <div className="up-section">
                                    <div className="contact-card">
                                        <div className="icon">
                                            <MdOutlineMail size={32} className="icon-color" />
                                        </div>
                                        <div className="content">
                                            <h3>Email Us</h3>
                                            <p>support@example.com</p>
                                        </div>
                                    </div>

                                    <div className="contact-card">
                                        <div className="icon">
                                            <FaPhone size={32} className="icon-color" />
                                        </div>
                                        <div className="content">
                                            <h3>Call Us</h3>
                                            <p>+1 (555) 123-4567</p>
                                        </div>
                                    </div>

                                    <div className="contact-card">
                                        <div className="icon">
                                            <FaLocationArrow size={32} className="icon-color" />
                                        </div>
                                        <div className="content">
                                            <h3>Address</h3>
                                            <p>No: 58 A, Madison Street,</p>
                                            <p>Baltimore, MD, USA 4508</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bottom-section">
                                    <form className="p-4 border rounded shadow-sm">
                                        <div className="row">
                                            <div className="col-6">
                                            {/* Full Name Input */}
                                            <div className="mb-3">
                                                <label htmlFor="name" className="form-label">Full Name</label>
                                                <input type="text" className="form-control" id="name" placeholder="Enter your full name" required/>
                                            </div>
                                            
                                            {/* Email Input */}
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">Email Address</label>
                                                <input type="email" className="form-control" id="email" placeholder="Enter your email" required/>
                                            </div>
                                            </div>

                                            <div className="col-6">
                                            {/* Phone Number Input */}
                                            <div className="mb-3">
                                                <label htmlFor="phone" className="form-label">Phone Number (Optional)</label>
                                                <input type="tel" className="form-control" id="phone" placeholder="Enter your phone number"/>
                                            </div>

                                            {/* Order Number Input */}
                                            <div className="mb-3">
                                                <label htmlFor="orderNumber" className="form-label">Order Number (Optional)</label>
                                                <input type="text" className="form-control" id="orderNumber" placeholder="Enter your order number if applicable"/>
                                            </div>
                                            </div>
                                        </div>

                                        {/* Query Type Dropdown */}
                                        <div className="mb-3">
                                            <label htmlFor="queryType" className="form-label">Query Type</label>
                                            <select className="form-select" id="queryType" required>
                                            <option selected disabled>Select an option</option>
                                            <option value="order_issue">Order Issue</option>
                                            <option value="product_inquiry">Product Inquiry</option>
                                            <option value="general_feedback">General Feedback</option>
                                            </select>
                                        </div>

                                        {/* Message Input */}
                                        <div className="mb-3">
                                            <label htmlFor="message" className="form-label">Message</label>
                                            <textarea className="form-control" id="message" rows="4" placeholder="Write your message here..." required></textarea>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="d-flex justify-content-start">
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </>
                )}
        </section>


        </section>

        
    )
}

export default Contact
