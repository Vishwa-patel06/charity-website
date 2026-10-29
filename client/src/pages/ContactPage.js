import React, { useState } from 'react';
import axios from 'axios';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    messageText: '',
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setStatusMessage('');
  setIsError(false);

  try {
    const response = await axios.post('http://localhost:4201/api/contact', {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      message: formData.messageText
    });

    if (response.data.success) {
      setStatusMessage('Thank you! Your message has been sent successfully.');
      setFormData({ firstName: '', lastName: '', email: '', messageText: '' });
    }
  } catch (error) {
    setStatusMessage(
      'Sorry, something went wrong. Please check the server connection and try again.'
    );
    setIsError(true);
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="contact-page py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2>Get in Touch</h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="contact-form p-5 shadow-sm">
              <h4 className="mb-1">Contact form</h4>
              <p className="text-muted mb-4">Send us a message and we'll get back to you shortly.</p>
              
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input type="text" name="firstName" className="form-control" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="text" name="lastName" className="form-control" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                  </div>
                </div>
                <div className="mb-3">
                  <input type="email" name="email" className="form-control" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <textarea name="messageText" className="form-control" rows="5" placeholder="What can we help you with?" value={formData.messageText} onChange={handleChange} required></textarea>
                </div>

                {statusMessage && (
                  <div className={`alert ${isError ? 'alert-danger' : 'alert-success'}`}>
                    {statusMessage}
                  </div>
                )}

                <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;