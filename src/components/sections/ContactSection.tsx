import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';

interface ThemeConfig {
  fonts: {
    primary: string;
    secondary: string;
    accent: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    primary100: string;
    primary200: string;
    primary300: string;
    secondary100: string;
    secondary200: string;
    accent100: string;
    accent200: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

interface ContactSectionProps {
  content: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    address?: string;
    mapUrl?: string;
    formTitle?: string;
    formSubtitle?: string;
    submitButtonText?: string;
    socialLinks?: { platform: string; url: string }[];
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
  variant?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ 
  content, 
  isEditing, 
  onChange, 
  theme,
  variant = 'contact-form'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    onChange({ ...content, [field]: value });
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

  // Initialize default content if needed
  useEffect(() => {
    if (!content.formTitle) {
      handleChange('formTitle', 'Send Us a Message');
    }
    if (!content.formSubtitle) {
      handleChange('formSubtitle', 'Fill out the form below and we\'ll get back to you as soon as possible.');
    }
    if (!content.submitButtonText) {
      handleChange('submitButtonText', 'Send Message');
    }
    if (variant === 'contact-map' && !content.mapUrl) {
      handleChange('mapUrl', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910525!2d-74.25986432970718!3d40.697149422113014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sca!4v1627325404342!5m2!1sen!2sca');
    }
  }, [variant, content, handleChange]);

  const renderContactForm = () => (
    <section className="py-16 px-4" style={{ backgroundColor: theme?.colors.background || '#ffffff' }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {isEditing ? (
            <input
              type="text"
              value={content.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="text-4xl font-bold mb-4 w-full text-center bg-transparent border-b-2 border-dashed border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Contact Us"
            />
          ) : (
            <h2 className="text-4xl font-bold mb-4" style={{ color: theme?.colors.text || '#1f2937' }}>
              {content.title}
            </h2>
          )}
          
          {isEditing ? (
            <textarea
              value={content.subtitle}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              className="text-lg w-full text-center bg-transparent border-b-2 border-dashed border-gray-300 focus:outline-none focus:border-blue-500 resize-none"
              placeholder="Get in touch with us"
              rows={2}
            />
          ) : (
            <p className="text-lg" style={{ color: theme?.colors.textSecondary || '#6b7280' }}>
              {content.subtitle}
            </p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-6" style={{ color: theme?.colors.text || '#1f2937' }}>
              Get in Touch
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3" style={{ color: theme?.colors.primary || '#3b82f6' }} />
                {isEditing ? (
                  <input
                    type="email"
                    value={content.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="bg-transparent border-b border-dashed border-gray-300 focus:outline-none focus:border-blue-500"
                    placeholder="your@email.com"
                  />
                ) : (
                  <span style={{ color: theme?.colors.text || '#1f2937' }}>{content.email}</span>
                )}
              </div>
              
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3" style={{ color: theme?.colors.primary || '#3b82f6' }} />
                {isEditing ? (
                  <input
                    type="tel"
                    value={content.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="bg-transparent border-b border-dashed border-gray-300 focus:outline-none focus:border-blue-500"
                    placeholder="+1 (555) 123-4567"
                  />
                ) : (
                  <span style={{ color: theme?.colors.text || '#1f2937' }}>{content.phone}</span>
                )}
              </div>
              
              {content.address && (
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3" style={{ color: theme?.colors.primary || '#3b82f6' }} />
                  {isEditing ? (
                    <input
                      type="text"
                      value={content.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      className="bg-transparent border-b border-dashed border-gray-300 focus:outline-none focus:border-blue-500"
                      placeholder="123 Main St, City, State"
                    />
                  ) : (
                    <span style={{ color: theme?.colors.text || '#1f2937' }}>{content.address}</span>
                  )}
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
                <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: theme?.colors.text || '#1f2937' }}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ 
                    borderColor: theme?.colors.border || '#d1d5db',
                    backgroundColor: theme?.colors.surface || '#ffffff'
                  }}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: theme?.colors.text || '#1f2937' }}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ 
                    borderColor: theme?.colors.border || '#d1d5db',
                    backgroundColor: theme?.colors.surface || '#ffffff'
                  }}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: theme?.colors.text || '#1f2937' }}>
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ 
                    borderColor: theme?.colors.border || '#d1d5db',
                    backgroundColor: theme?.colors.surface || '#ffffff'
                  }}
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={formSubmitted}
                className="w-full px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                style={{
                  backgroundColor: formSubmitted ? theme?.colors.success || '#10b981' : theme?.colors.primary || '#3b82f6',
                  color: '#ffffff'
                }}
              >
                {formSubmitted ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    {content.submitButtonText || 'Send Message'}
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );

  const renderContactMap = () => (
    <section className="py-16 px-4" style={{ backgroundColor: theme?.colors.background || '#ffffff' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {isEditing ? (
            <input
              type="text"
              value={content.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="text-4xl font-bold mb-4 w-full text-center bg-transparent border-b-2 border-dashed border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Find Us"
            />
          ) : (
            <h2 className="text-4xl font-bold mb-4" style={{ color: theme?.colors.text || '#1f2937' }}>
              {content.title}
            </h2>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-96 rounded-lg overflow-hidden"
              style={{ boxShadow: theme?.shadows.lg || '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
            >
              <iframe
                src={content.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-lg" style={{ backgroundColor: theme?.colors.surface || '#f9fafb' }}>
              <h3 className="text-xl font-semibold mb-4" style={{ color: theme?.colors.text || '#1f2937' }}>
                Contact Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3" style={{ color: theme?.colors.primary || '#3b82f6' }} />
                  {isEditing ? (
                    <input
                      type="email"
                      value={content.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="bg-transparent border-b border-dashed border-gray-300 focus:outline-none focus:border-blue-500"
                      placeholder="your@email.com"
                    />
                  ) : (
                    <span style={{ color: theme?.colors.text || '#1f2937' }}>{content.email}</span>
                  )}
                </div>
                
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3" style={{ color: theme?.colors.primary || '#3b82f6' }} />
                  {isEditing ? (
                    <input
                      type="tel"
                      value={content.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="bg-transparent border-b border-dashed border-gray-300 focus:outline-none focus:border-blue-500"
                      placeholder="+1 (555) 123-4567"
                    />
                  ) : (
                    <span style={{ color: theme?.colors.text || '#1f2937' }}>{content.phone}</span>
                  )}
                </div>
                
                {content.address && (
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-3" style={{ color: theme?.colors.primary || '#3b82f6' }} />
                    {isEditing ? (
                      <input
                        type="text"
                        value={content.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        className="bg-transparent border-b border-dashed border-gray-300 focus:outline-none focus:border-blue-500"
                        placeholder="123 Main St, City, State"
                      />
                    ) : (
                      <span style={{ color: theme?.colors.text || '#1f2937' }}>{content.address}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );

  const renderCtaContact = () => (
    <section className="py-16 px-4" style={{ backgroundColor: theme?.colors.primary || '#3b82f6' }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {isEditing ? (
            <input
              type="text"
              value={content.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="text-4xl font-bold mb-6 w-full text-center bg-transparent border-b-2 border-dashed border-white/30 focus:outline-none focus:border-white text-white placeholder-white/70"
              placeholder="Ready to Get Started?"
            />
          ) : (
            <h2 className="text-4xl font-bold mb-6 text-white">
              {content.title}
            </h2>
          )}
          
          {isEditing ? (
            <textarea
              value={content.subtitle}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              className="text-xl mb-8 w-full text-center bg-transparent border-b-2 border-dashed border-white/30 focus:outline-none focus:border-white text-white placeholder-white/70 resize-none"
              placeholder="Contact us today and let's discuss your project"
              rows={2}
            />
          ) : (
            <p className="text-xl mb-8 text-white/90">
              {content.subtitle}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={`mailto:${content.email}`}
              className="inline-flex items-center px-8 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              <Mail className="w-5 h-5 mr-2" />
              {content.email}
            </a>
            
            <a
              href={`tel:${content.phone}`}
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-gray-900 transition-colors duration-200"
            >
              <Phone className="w-5 h-5 mr-2" />
              {content.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );

  switch (variant) {
    case 'contact-map':
      return renderContactMap();
    case 'contact-cta':
      return renderCtaContact();
    default:
      return renderContactForm();
  }
};

export default ContactSection;