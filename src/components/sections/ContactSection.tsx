import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

interface ThemeConfig {
  fonts: {
    primary: string;
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
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
}

const ContactSection: React.FC<ContactSectionProps> = ({ content, isEditing, onChange, theme }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (field: string, value: string) => {
    onChange({ ...content, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section 
      className="py-20" 
      style={{ 
        backgroundColor: theme?.colors?.surface || '#ffffff',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
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
                  className="text-3xl sm:text-4xl font-bold mb-4 bg-transparent border-2 border-dashed rounded-lg p-2 text-center"
                  style={{ 
                    color: theme?.colors?.primary,
                    borderColor: `${theme?.colors?.primary}50`
                  }}
                  placeholder="Enter section title"
                />
                <input
                  type="text"
                  value={content.subtitle}
                  onChange={(e) => handleChange('subtitle', e.target.value)}
                  className="text-xl bg-transparent border-2 border-dashed rounded-lg p-2 text-center"
                  style={{ 
                    color: theme?.colors?.textSecondary,
                    borderColor: `${theme?.colors?.primary}50`
                  }}
                  placeholder="Enter subtitle"
                />
              </>
            ) : (
              <>
                <h2 
                  className="text-3xl sm:text-4xl font-bold mb-4"
                  style={{ color: theme?.colors?.primary }}
                >
                  {content.title}
                </h2>
                <p 
                  className="text-xl"
                  style={{ color: theme?.colors?.textSecondary }}
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
                style={{ color: theme?.colors?.text }}
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
                      backgroundColor: theme?.colors?.surface
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
                      backgroundColor: theme?.colors?.surface
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
                      backgroundColor: theme?.colors?.surface
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
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;