import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import coverImg from '../../utils/cover-img.jpg';
import './contact.css';
import Loader from '../loader/Loader';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MdOutlineMail } from "react-icons/md";
import { FaPhone, FaLocationArrow } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// toast.configure();

const Contact = () => {
    const setting = useSelector(state => state.setting);
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        querry_type: '',
        message: ''
    });

    const placeHolderImage = (e) => {
        e.target.src = setting.setting?.web_logo;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://ogherbs.deificindia.com/api/add_contactus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success("Your message has been sent successfully!");
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    querry_type: '',
                    message: ''
                });
            } else {
                toast.error("Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("There was an error sending your message. Please try again later.");
        }
    };

    return (
        <section id='contact-us' className='contact-us'>
            {setting.setting === null ? <Loader screen='full' />
                : (
                    <>
                        <div className='cover'>
                            <img onError={placeHolderImage} src={coverImg} className='img-fluid' alt="cover" />
                            <div className='title'>
                                <h3>{t("contact_us")}</h3>
                                <span> <Link to="/" className='text-light text-decoration-none'>{t("home")} /</Link> </span>
                                <span className='active'>{t("contact_us")}</span>
                            </div>
                        </div>
                        <div className='container'>
                            <div className='contact-wrapper'>
                                <div className="map-section mb-4">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d228624.5610691504!2d80.17356440406607!3d26.44738660476833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c4770b127c46f%3A0x1778302a9fbe7b41!2sKanpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1726799760906!5m2!1sen!2sin" height="350" style={{ width: "100%", border: "0" }} allowFullScreen loading="lazy"></iframe>
                                </div>
                                <div className="up-section">
                                    <div className="contact-card">
                                        <MdOutlineMail size={32} className="icon-color" />
                                        <div className="content">
                                            <h3>Email Us</h3>
                                            <p>support@example.com</p>
                                        </div>
                                    </div>
                                    <div className="contact-card">
                                        <FaPhone size={32} className="icon-color" />
                                        <div className="content">
                                            <h3>Call Us</h3>
                                            <p>+1 (555) 123-4567</p>
                                        </div>
                                    </div>
                                    <div className="contact-card">
                                        <FaLocationArrow size={32} className="icon-color" />
                                        <div className="content">
                                            <h3>Address</h3>
                                            <p>No: 58 A, Madison Street,</p>
                                            <p>Baltimore, MD, USA 4508</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom-section">
                                    <form className="p-4 border rounded shadow-sm" onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="mb-3">
                                                    <label htmlFor="name" className="form-label">Full Name</label>
                                                    <input type="text" className="form-control" id="name" placeholder="Enter your full name" value={formData.name} onChange={handleChange} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="email" className="form-label">Email Address</label>
                                                    <input type="email" className="form-control" id="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="mb-3">
                                                    <label htmlFor="phone" className="form-label">Phone Number</label>
                                                    <input type="tel" className="form-control" id="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="querry_type" className="form-label">Query Type</label>
                                                    <select className="form-select" id="querry_type" value={formData.querry_type} onChange={handleChange} required>
                                                        <option disabled>Select an option</option>
                                                        <option value="order_issue">Order Issue</option>
                                                        <option value="product_inquiry">Product Inquiry</option>
                                                        <option value="general_feedback">General Feedback</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="message" className="form-label">Message</label>
                                            <textarea className="form-control" id="message" rows="4" placeholder="Write your message here..." value={formData.message} onChange={handleChange} required></textarea>
                                        </div>
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
    );
};

export default Contact;
