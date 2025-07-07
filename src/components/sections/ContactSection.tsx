import React, { useState } from 'react';
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

  // Standard Contact Form
  const renderContactForm = () => (
    <section 
      className="py-12 sm:py-20" 
      style={{ 
        backgroundColor: theme?.colors?.surface || '#ffffff',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={content.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="text-3xl sm:text-4xl font-bold mb-4 bg-transparent border-2 border-dashed rounded-lg p-2 text-center w-full max-w-2xl mx-auto"
                  style={{ 
                    color: theme?.colors?.primary,
                    borderColor: `${theme?.colors?.primary}50`,
                    fontFamily: theme?.fonts?.primary
                  }}
                  placeholder="Enter section title"
                />
                <input
                  type="text"
                  value={content.subtitle}
                  onChange={(e) => handleChange('subtitle', e.target.value)}
                  className="text-lg sm:text-xl bg-transparent border-2 border-dashed rounded-lg p-2 text-center w-full max-w-3xl mx-auto"
                  style={{ 
                    color: theme?.colors?.textSecondary,
                    borderColor: `${theme?.colors?.primary}50`,
                    fontFamily: theme?.fonts?.secondary
                  }}
                  placeholder="Enter subtitle"
                />
              </>
            ) : (
              <>
                <h2 
                  className="text-3xl sm:text-4xl font-bold mb-4"
                  style={{ 
                    color: theme?.colors?.primary,
                    fontFamily: theme?.fonts?.primary
                  }}
                >
                  {content.title}
                </h2>
                <p 
                  className="text-lg sm:text-xl max-w-3xl mx-auto"
                  style={{ 
                    color: theme?.colors?.textSecondary,
                    fontFamily: theme?.fonts?.secondary
                  }}
                >
                  {content.subtitle}
                </p>
              </>
            )}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 
                className="text-2xl font-bold mb-8"
                style={{ 
                  color: theme?.colors?.text,
                  fontFamily: theme?.fonts?.primary
                }}
              >
                Get in Touch
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${theme?.colors?.primary}20` }}
                  >
                    <Mail className="w-6 h-6" style={{ color: theme?.colors?.primary }} />
                  </div>
                  <div>
                    <h4 
                      className="font-semibold"
                      style={{ color: theme?.colors?.text }}
                    >
                      Email
                    </h4>
                    {isEditing ? (
                      <input
                        type="email"
                        value={content.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="bg-transparent border-2 border-dashed rounded-lg p-1"
                        style={{ 
                          color: theme?.colors?.textSecondary,
                          borderColor: `${theme?.colors?.primary}50`
                        }}
                        placeholder="email@example.com"
                      />
                    ) : (
                      <p style={{ color: theme?.colors?.textSecondary }}>{content.email}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${theme?.colors?.primary}20` }}
                  >
                    <Phone className="w-6 h-6" style={{ color: theme?.colors?.primary }} />
                  </div>
                  <div>
                    <h4 
                      className="font-semibold"
                      style={{ color: theme?.colors?.text }}
                    >
                      Phone
                    </h4>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={content.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="bg-transparent border-2 border-dashed rounded-lg p-1"
                        style={{ 
                          color: theme?.colors?.textSecondary,
                          borderColor: `${theme?.colors?.primary}50`
                        }}
                        placeholder="+1 (555) 123-4567"
                      />
                    ) : (
                      <p style={{ color: theme?.colors?.textSecondary }}>{content.phone}</p>
                    )}
                  </div>
                </div>
                
                {(content.address || isEditing) && (
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${theme?.colors?.primary}20` }}
                    >
                      <MapPin className="w-6 h-6" style={{ color: theme?.colors?.primary }} />
                    </div>
                    <div>
                      <h4 
                        className="font-semibold"
                        style={{ color: theme?.colors?.text }}
                      >
                        Address
                      </h4>
                      {isEditing ? (
                        <input
                          type="text"
                          value={content.address || ''}
                          onChange={(e) => handleChange('address', e.target.value)}
                          className="bg-transparent border-2 border-dashed rounded-lg p-1"
                          style={{ 
                            color: theme?.colors?.textSecondary,
                            borderColor: `${theme?.colors?.primary}50`
                          }}
                          placeholder="123 Main St, City, State 12345"
                        />
                      ) : (
                        <p style={{ color: theme?.colors?.textSecondary }}>{content.address}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {formSubmitted ? (
                <div 
                  className="rounded-xl p-8 text-center"
                  style={{ 
                    backgroundColor: `${theme?.colors?.success}10`,
                    border: `1px solid ${theme?.colors?.success}30`
                  }}
                >
                  <div 
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: theme?.colors?.success }}
                  >
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <h3 
                    className="text-xl font-bold mb-2"
                    style={{ 
                      color: theme?.colors?.success,
                      fontFamily: theme?.fonts?.primary
                    }}
                  >
                    Message Sent!
                  </h3>
                  <p
                    style={{ 
                      color: theme?.colors?.textSecondary,
                      fontFamily: theme?.fonts?.secondary
                    }}
                  >
                    Thank you for your message. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label 
                      className="block text-sm font-semibold mb-2"
                      style={{ color: theme?.colors?.text }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                      style={{ 
                        borderColor: theme?.colors?.border,
                        backgroundColor: theme?.colors?.surface,
                        color: theme?.colors?.text
                      }}
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label 
                      className="block text-sm font-semibold mb-2"
                      style={{ color: theme?.colors?.text }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                      style={{ 
                        borderColor: theme?.colors?.border,
                        backgroundColor: theme?.colors?.surface,
                        color: theme?.colors?.text
                      }}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label 
                      className="block text-sm font-semibold mb-2"
                      style={{ color: theme?.colors?.text }}
                    >
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      rows={6}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 resize-none"
                      style={{ 
                        borderColor: theme?.colors?.border,
                        backgroundColor: theme?.colors?.surface,
                        color: theme?.colors?.text
                      }}
                      placeholder="Your message..."
                      required
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                    style={{ 
                      background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`
                    }}
                  >
                    <Send className="w-5 h-5" />
                    {content.submitButtonText || 'Send Message'}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );

  // Contact with Map
  const renderContactMap = () => (
    <section 
      className="py-12 sm:py-20" 
      style={{ 
        backgroundColor: theme?.colors?.background || '#f9fafb',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={content.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="text-3xl sm:text-4xl font-bold mb-4 bg-transparent border-2 border-dashed rounded-lg p-2 text-center w-full max-w-2xl mx-auto"
                  style={{ 
                    color: theme?.colors?.primary,
                    borderColor: `${theme?.colors?.primary}50`,
                    fontFamily: theme?.fonts?.primary
                  }}
                  placeholder="Enter section title"
                />
                <input
                  type="text"
                  value={content.subtitle}
                  onChange={(e) => handleChange('subtitle', e.target.value)}
                  className="text-lg sm:text-xl bg-transparent border-2 border-dashed rounded-lg p-2 text-center w-full max-w-3xl mx-auto"
                  style={{ 
                    color: theme?.colors?.textSecondary,
                    borderColor: `${theme?.colors?.primary}50`,
                    fontFamily: theme?.fonts?.secondary
                  }}
                  placeholder="Enter subtitle"
                />
              </>
            ) : (
              <>
                <h2 
                  className="text-3xl sm:text-4xl font-bold mb-4"
                  style={{ 
                    color: theme?.colors?.primary,
                    fontFamily: theme?.fonts?.primary
                  }}
                >
                  {content.title}
                </h2>
                <p 
                  className="text-lg sm:text-xl max-w-3xl mx-auto"
                  style={{ 
                    color: theme?.colors?.textSecondary,
                    fontFamily: theme?.fonts?.secondary
                  }}
                >
                  {content.subtitle}
                </p>
              </>
            )}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="rounded-xl p-8"
              style={{ 
                backgroundColor: theme?.colors?.surface,
                boxShadow: theme?.shadows?.lg
              }}
            >
              <h3 
                className="text-xl font-bold mb-6"
                style={{ 
                  color: theme?.colors?.text,
                  fontFamily: theme?.fonts?.primary
                }}
              >
                {isEditing ? (
                  <input
                    type="text"
                    value={content.formTitle || 'Send Us a Message'}
                    onChange={(e) => handleChange('formTitle', e.target.value)}
                    className="text-xl font-bold bg-transparent border-2 border-dashed rounded-lg p-2 w-full"
                    style={{ 
                      color: theme?.colors?.text,
                      borderColor: `${theme?.colors?.primary}50`,
                      fontFamily: theme?.fonts?.primary
                    }}
                    placeholder="Form title"
                  />
                ) : (
                  content.formTitle || 'Send Us a Message'
                )}
              </h3>
              
              {isEditing ? (
                <input
                  type="text"
                  value={content.formSubtitle || 'Fill out the form below and we\'ll get back to you as soon as possible.'}
                  onChange={(e) => handleChange('formSubtitle', e.target.value)}
                  className="text-sm mb-6 bg-transparent border-2 border-dashed rounded-lg p-2 w-full"
                  style={{ 
                    color: theme?.colors?.textSecondary,
                    borderColor: `${theme?.colors?.primary}50`,
                    fontFamily: theme?.fonts?.secondary
                  }}
                  placeholder="Form subtitle"
                />
              ) : (
                <p 
                  className="text-sm mb-6"
                  style={{ 
                    color: theme?.colors?.textSecondary,
                    fontFamily: theme?.fonts?.secondary
                  }}
                >
                  {content.formSubtitle || 'Fill out the form below and we'll get back to you as soon as possible.'}
                </p>
              )}
              
              {formSubmitted ? (
                <div 
                  className="rounded-xl p-6 text-center"
                  style={{ 
                    backgroundColor: `${theme?.colors?.success}10`,
                    border: `1px solid ${theme?.colors?.success}30`
                  }}
                >
                  <div 
                    className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: theme?.colors?.success }}
                  >
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <h4 
                    className="text-lg font-bold mb-1"
                    style={{ 
                      color: theme?.colors?.success,
                      fontFamily: theme?.fonts?.primary
                    }}
                  >
                    Message Sent!
                  </h4>
                  <p
                    className="text-sm"
                    style={{ 
                      color: theme?.colors?.textSecondary,
                      fontFamily: theme?.fonts?.secondary
                    }}
                  >
                    Thank you for your message. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                      style={{ 
                        borderColor: theme?.colors?.border,
                        backgroundColor: theme?.colors?.surface,
                        color: theme?.colors?.text
                      }}
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                      style={{ 
                        borderColor: theme?.colors?.border,
                        backgroundColor: theme?.colors?.surface,
                        color: theme?.colors?.text
                      }}
                      placeholder="Your Email"
                      required
                    />
                  </div>
                  
                  <div>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 resize-none"
                      style={{ 
                        borderColor: theme?.colors?.border,
                        backgroundColor: theme?.colors?.surface,
                        color: theme?.colors?.text
                      }}
                      placeholder="Your Message"
                      required
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                    style={{ 
                      background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`
                    }}
                  >
                    <Send className="w-5 h-5" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={content.submitButtonText || 'Send Message'}
                        onChange={(e) => handleChange('submitButtonText', e.target.value)}
                        className="bg-transparent text-white text-center"
                        placeholder="Button text"
                      />
                    ) : (
                      content.submitButtonText || 'Send Message'
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Map and Contact Info */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Map */}
              <div 
                className="rounded-xl overflow-hidden mb-8"
                style={{ boxShadow: theme?.shadows?.lg }}
              >
                {isEditing ? (
                  <div className="p-4 bg-gray-100">
                    <input
                      type="text"
                      value={content.mapUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910525!2d-74.25986432970718!3d40.697149422113014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sca!4v1627325404342!5m2!1sen!2sca'}
                      onChange={(e) => handleChange('mapUrl', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg"
                      style={{ 
                        borderColor: theme?.colors?.border,
                        color: theme?.colors?.text
                      }}
                      placeholder="Google Maps Embed URL"
                    />
                    <p className="text-xs mt-2 text-gray-500">
                      Enter a Google Maps embed URL (iframe src)
                    </p>
                  </div>
                ) : (
                  <iframe 
                    src={content.mapUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910525!2d-74.25986432970718!3d40.697149422113014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sca!4v1627325404342!5m2!1sen!2sca'} 
                    width="100%" 
                    height="300" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                    title="Location Map"
                  />
                )}
              </div>

              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  className="rounded-xl p-6 text-center"
                  style={{ 
                    backgroundColor: theme?.colors?.surface,
                    boxShadow: theme?.shadows?.md
                  }}
                >
                  <div 
                    className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${theme?.colors?.primary}15` }}
                  >
                    <Mail className="w-6 h-6" style={{ color: theme?.colors?.primary }} />
                  </div>
                  <h4 
                    className="font-semibold mb-2"
                    style={{ 
                      color: theme?.colors?.text,
                      fontFamily: theme?.fonts?.primary
                    }}
                  >
                    Email
                  </h4>
                  {isEditing ? (
                    <input
                      type="email"
                      value={content.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="bg-transparent border-2 border-dashed rounded-lg p-1 text-center w-full"
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        borderColor: `${theme?.colors?.primary}50`,
                        fontFamily: theme?.fonts?.secondary
                      }}
                      placeholder="email@example.com"
                    />
                  ) : (
                    <p 
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        fontFamily: theme?.fonts?.secondary
                      }}
                    >
                      {content.email}
                    </p>
                  )}
                </div>
                
                <div 
                  className="rounded-xl p-6 text-center"
                  style={{ 
                    backgroundColor: theme?.colors?.surface,
                    boxShadow: theme?.shadows?.md
                  }}
                >
                  <div 
                    className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${theme?.colors?.primary}15` }}
                  >
                    <Phone className="w-6 h-6" style={{ color: theme?.colors?.primary }} />
                  </div>
                  <h4 
                    className="font-semibold mb-2"
                    style={{ 
                      color: theme?.colors?.text,
                      fontFamily: theme?.fonts?.primary
                    }}
                  >
                    Phone
                  </h4>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={content.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="bg-transparent border-2 border-dashed rounded-lg p-1 text-center w-full"
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        borderColor: `${theme?.colors?.primary}50`,
                        fontFamily: theme?.fonts?.secondary
                      }}
                      placeholder="+1 (555) 123-4567"
                    />
                  ) : (
                    <p 
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        fontFamily: theme?.fonts?.secondary
                      }}
                    >
                      {content.phone}
                    </p>
                  )}
                </div>
                
                <div 
                  className="rounded-xl p-6 text-center"
                  style={{ 
                    backgroundColor: theme?.colors?.surface,
                    boxShadow: theme?.shadows?.md
                  }}
                >
                  <div 
                    className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${theme?.colors?.primary}15` }}
                  >
                    <MapPin className="w-6 h-6" style={{ color: theme?.colors?.primary }} />
                  </div>
                  <h4 
                    className="font-semibold mb-2"
                    style={{ 
                      color: theme?.colors?.text,
                      fontFamily: theme?.fonts?.primary
                    }}
                  >
                    Address
                  </h4>
                  {isEditing ? (
                    <input
                      type="text"
                      value={content.address || ''}
                      onChange={(e) => handleChange('address', e.target.value)}
                      className="bg-transparent border-2 border-dashed rounded-lg p-1 text-center w-full"
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        borderColor: `${theme?.colors?.primary}50`,
                        fontFamily: theme?.fonts?.secondary
                      }}
                      placeholder="123 Main St, City, State"
                    />
                  ) : (
                    <p 
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        fontFamily: theme?.fonts?.secondary
                      }}
                    >
                      {content.address || '123 Main Street, City, Country'}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );

  // CTA Contact
  const renderCtaContact = () => (
    <section 
      className="py-12 sm:py-20" 
      style={{ 
        backgroundColor: theme?.colors?.background || '#f9fafb',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="rounded-3xl overflow-hidden"
          style={{ boxShadow: theme?.shadows?.xl }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* CTA Content */}
            <div 
              className="p-8 sm:p-12 lg:p-16 text-white"
              style={{ 
                background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={content.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      className="text-3xl sm:text-4xl font-bold mb-4 bg-transparent border-2 border-dashed border-white/50 rounded-lg p-2 w-full text-white"
                      style={{ fontFamily: theme?.fonts?.primary }}
                      placeholder="Enter section title"
                    />
                    <textarea
                      value={content.subtitle}
                      onChange={(e) => handleChange('subtitle', e.target.value)}
                      className="text-lg mb-8 bg-transparent border-2 border-dashed border-white/50 rounded-lg p-2 w-full h-24 resize-none text-white"
                      style={{ fontFamily: theme?.fonts?.secondary }}
                      placeholder="Enter section subtitle"
                    />
                  </>
                ) : (
                  <>
                    <h2 
                      className="text-3xl sm:text-4xl font-bold mb-4"
                      style={{ fontFamily: theme?.fonts?.primary }}
                    >
                      {content.title}
                    </h2>
                    <p 
                      className="text-lg mb-8 text-white/90"
                      style={{ fontFamily: theme?.fonts?.secondary }}
                    >
                      {content.subtitle}
                    </p>
                  </>
                )}

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center"
                    >
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 
                        className="font-semibold text-white"
                      >
                        Email
                      </h4>
                      {isEditing ? (
                        <input
                          type="email"
                          value={content.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className="bg-transparent border-2 border-dashed border-white/50 rounded-lg p-1 text-white"
                          placeholder="email@example.com"
                        />
                      ) : (
                        <p className="text-white/80">{content.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center"
                    >
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 
                        className="font-semibold text-white"
                      >
                        Phone
                      </h4>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={content.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          className="bg-transparent border-2 border-dashed border-white/50 rounded-lg p-1 text-white"
                          placeholder="+1 (555) 123-4567"
                        />
                      ) : (
                        <p className="text-white/80">{content.phone}</p>
                      )}
                    </div>
                  </div>
                  
                  {(content.address || isEditing) && (
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center"
                      >
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 
                          className="font-semibold text-white"
                        >
                          Address
                        </h4>
                        {isEditing ? (
                          <input
                            type="text"
                            value={content.address || ''}
                            onChange={(e) => handleChange('address', e.target.value)}
                            className="bg-transparent border-2 border-dashed border-white/50 rounded-lg p-1 text-white"
                            placeholder="123 Main St, City, State"
                          />
                        ) : (
                          <p className="text-white/80">{content.address}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div 
              className="p-8 sm:p-12 lg:p-16"
              style={{ 
                backgroundColor: theme?.colors?.surface
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 
                  className="text-2xl font-bold mb-6"
                  style={{ 
                    color: theme?.colors?.text,
                    fontFamily: theme?.fonts?.primary
                  }}
                >
                  {isEditing ? (
                    <input
                      type="text"
                      value={content.formTitle || 'Send Us a Message'}
                      onChange={(e) => handleChange('formTitle', e.target.value)}
                      className="text-2xl font-bold bg-transparent border-2 border-dashed rounded-lg p-2 w-full"
                      style={{ 
                        color: theme?.colors?.text,
                        borderColor: `${theme?.colors?.primary}50`,
                        fontFamily: theme?.fonts?.primary
                      }}
                      placeholder="Form title"
                    />
                  ) : (
                    content.formTitle || 'Send Us a Message'
                  )}
                </h3>
                
                {formSubmitted ? (
                  <div 
                    className="rounded-xl p-8 text-center"
                    style={{ 
                      backgroundColor: `${theme?.colors?.success}10`,
                      border: `1px solid ${theme?.colors?.success}30`
                    }}
                  >
                    <div 
                      className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: theme?.colors?.success }}
                    >
                      <Check className="w-8 h-8 text-white" />
                    </div>
                    <h4 
                      className="text-xl font-bold mb-2"
                      style={{ 
                        color: theme?.colors?.success,
                        fontFamily: theme?.fonts?.primary
                      }}
                    >
                      Message Sent!
                    </h4>
                    <p
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        fontFamily: theme?.fonts?.secondary
                      }}
                    >
                      Thank you for your message. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                        style={{ 
                          borderColor: theme?.colors?.border,
                          backgroundColor: theme?.colors?.surface,
                          color: theme?.colors?.text
                        }}
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    
                    <div>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                        style={{ 
                          borderColor: theme?.colors?.border,
                          backgroundColor: theme?.colors?.surface,
                          color: theme?.colors?.text
                        }}
                        placeholder="Your Email"
                        required
                      />
                    </div>
                    
                    <div>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        rows={4}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 resize-none"
                        style={{ 
                          borderColor: theme?.colors?.border,
                          backgroundColor: theme?.colors?.surface,
                          color: theme?.colors?.text
                        }}
                        placeholder="Your Message"
                        required
                      />
                    </div>
                    
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                      style={{ 
                        background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`
                      }}
                    >
                      <Send className="w-5 h-5" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={content.submitButtonText || 'Send Message'}
                          onChange={(e) => handleChange('submitButtonText', e.target.value)}
                          className="bg-transparent text-white text-center"
                          placeholder="Button text"
                        />
                      ) : (
                        content.submitButtonText || 'Send Message'
                      )}
                    </motion.button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Initialize default content if needed
  React.useEffect(() => {
    if (!content.formTitle) {
      handleChange('formTitle', 'Send Us a Message');
    }
    if (!content.formSubtitle) {
      handleChange('formSubtitle', 'Fill out the form below and we'll get back to you as soon as possible.');
    }
    if (!content.submitButtonText) {
      handleChange('submitButtonText', 'Send Message');
    }
    if (variant === 'contact-map' && !content.mapUrl) {
      handleChange('mapUrl', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910525!2d-74.25986432970718!3d40.697149422113014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sca!4v1627325404342!5m2!1sen!2sca');
    }
  }, [variant]);

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