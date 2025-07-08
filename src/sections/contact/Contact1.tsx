import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Contact1Props {
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  address?: string;
  formTitle?: string;
  formSubtitle?: string;
  submitButtonText?: string;
  customData?: any;
}

const Contact1: React.FC<Contact1Props> = ({
  title,
  subtitle,
  email,
  phone,
  address,
  formTitle = "Send Us a Message",
  formSubtitle = "Fill out the form below and we'll get back to you as soon as possible.",
  submitButtonText = "Send Message",
  customData
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const bgColor = customData?.bgColor || '#ffffff';
  const textColor = customData?.textColor || '#1f2937';
  const accentColor = customData?.accentColor || '#3b82f6';
  const secondaryTextColor = customData?.secondaryTextColor || '#6b7280';
  const borderColor = customData?.borderColor || '#e5e7eb';
  const successColor = customData?.successColor || '#10b981';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section 
      className="py-16 px-4"
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 
            className="text-4xl font-bold mb-4"
            style={{ color: textColor }}
          >
            {title}
          </h2>
          <p 
            className="text-lg"
            style={{ color: secondaryTextColor }}
          >
            {subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 
              className="text-2xl font-semibold mb-6"
              style={{ color: textColor }}
            >
              Get in Touch
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: accentColor }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span style={{ color: textColor }}>{email}</span>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: accentColor }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span style={{ color: textColor }}>{phone}</span>
              </div>
              
              {address && (
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: accentColor }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span style={{ color: textColor }}>{address}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: textColor }}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                  style={{ 
                    borderColor: borderColor,
                    backgroundColor: bgColor,
                    color: textColor,
                    focusRing: `2px solid ${accentColor}`
                  }}
                  required
                />
              </div>
              
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: textColor }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                  style={{ 
                    borderColor: borderColor,
                    backgroundColor: bgColor,
                    color: textColor,
                    focusRing: `2px solid ${accentColor}`
                  }}
                  required
                />
              </div>
              
              <div>
                <label 
                  htmlFor="message" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: textColor }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                  style={{ 
                    borderColor: borderColor,
                    backgroundColor: bgColor,
                    color: textColor,
                    focusRing: `2px solid ${accentColor}`
                  }}
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={formSubmitted}
                className="w-full px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                style={{
                  backgroundColor: formSubmitted ? successColor : accentColor,
                  color: '#ffffff'
                }}
              >
                {formSubmitted ? (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Message Sent!
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    {submitButtonText}
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact1;