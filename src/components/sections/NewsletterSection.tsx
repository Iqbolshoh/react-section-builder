import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Check } from 'lucide-react';

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

interface NewsletterSectionProps {
  content: {
    title: string;
    subtitle: string;
    placeholder: string;
    buttonText: string;
    privacyText?: string;
    backgroundImage?: string;
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
  variant?: string;
}

const NewsletterSection: React.FC<NewsletterSectionProps> = ({ 
  content, 
  isEditing, 
  onChange, 
  theme,
  variant = 'newsletter-centered'
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    onChange({ ...content, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  // Centered Newsletter
  const renderCenteredNewsletter = () => (
    <section 
      className="py-12 sm:py-20" 
      style={{ 
        background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div 
            className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ boxShadow: theme?.shadows?.md }}
          >
            <Mail className="w-8 h-8 text-white" />
          </div>

          {isEditing ? (
            <>
              <input
                type="text"
                value={content.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 bg-transparent border-2 border-dashed border-white/50 rounded-lg p-2 text-center w-full max-w-2xl mx-auto placeholder-white/70"
                style={{ fontFamily: theme?.fonts?.primary }}
                placeholder="Enter newsletter title"
              />
              <textarea
                value={content.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="text-lg sm:text-xl text-white/90 mb-8 bg-transparent border-2 border-dashed border-white/50 rounded-lg p-2 w-full max-w-3xl mx-auto h-24 resize-none placeholder-white/70"
                style={{ fontFamily: theme?.fonts?.secondary }}
                placeholder="Enter newsletter description"
              />
            </>
          ) : (
            <>
              <h2 
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: theme?.fonts?.primary }}
              >
                {content.title}
              </h2>
              <p 
                className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
                style={{ fontFamily: theme?.fonts?.secondary }}
              >
                {content.subtitle}
              </p>
            </>
          )}

          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-green-500 text-white px-8 py-4 rounded-xl inline-flex items-center gap-3 text-lg font-semibold"
              style={{ 
                backgroundColor: theme?.colors?.success,
                boxShadow: theme?.shadows?.lg,
                fontFamily: theme?.fonts?.accent
              }}
            >
              <Check className="w-6 h-6" />
              Thank you for subscribing!
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={content.placeholder}
                      onChange={(e) => handleChange('placeholder', e.target.value)}
                      className="flex-1 px-6 py-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 border-2 border-dashed border-white/50"
                      style={{ fontFamily: theme?.fonts?.secondary }}
                      placeholder="Email placeholder text"
                    />
                    <input
                      type="text"
                      value={content.buttonText}
                      onChange={(e) => handleChange('buttonText', e.target.value)}
                      className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold border-2 border-dashed border-white/50"
                      style={{ fontFamily: theme?.fonts?.accent }}
                      placeholder="Button text"
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={content.placeholder}
                      required
                      className="flex-1 px-6 py-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                      style={{ fontFamily: theme?.fonts?.secondary }}
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                      style={{ 
                        boxShadow: theme?.shadows?.lg,
                        fontFamily: theme?.fonts?.accent
                      }}
                    >
                      <Send className="w-5 h-5" />
                      {content.buttonText}
                    </motion.button>
                  </>
                )}
              </div>
              
              {!isEditing && (
                <p 
                  className="text-white/70 text-sm mt-4"
                  style={{ fontFamily: theme?.fonts?.secondary }}
                >
                  {content.privacyText || 'No spam, unsubscribe at any time'}
                </p>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );

  // Box Newsletter
  const renderBoxNewsletter = () => (
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
          style={{ 
            boxShadow: theme?.shadows?.xl
          }}
        >
          <div 
            className="p-8 sm:p-12 lg:p-16 text-center"
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
              <div 
                className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ boxShadow: theme?.shadows?.md }}
              >
                <Mail className="w-8 h-8 text-white" />
              </div>

              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={content.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 bg-transparent border-2 border-dashed border-white/50 rounded-lg p-2 text-center w-full max-w-2xl mx-auto placeholder-white/70"
                    style={{ fontFamily: theme?.fonts?.primary }}
                    placeholder="Enter newsletter title"
                  />
                  <textarea
                    value={content.subtitle}
                    onChange={(e) => handleChange('subtitle', e.target.value)}
                    className="text-lg sm:text-xl text-white/90 mb-8 bg-transparent border-2 border-dashed border-white/50 rounded-lg p-2 w-full max-w-3xl mx-auto h-24 resize-none placeholder-white/70"
                    style={{ fontFamily: theme?.fonts?.secondary }}
                    placeholder="Enter newsletter description"
                  />
                </>
              ) : (
                <>
                  <h2 
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4"
                    style={{ fontFamily: theme?.fonts?.primary }}
                  >
                    {content.title}
                  </h2>
                  <p 
                    className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
                    style={{ fontFamily: theme?.fonts?.secondary }}
                  >
                    {content.subtitle}
                  </p>
                </>
              )}

              {isSubmitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-green-500 text-white px-8 py-4 rounded-xl inline-flex items-center gap-3 text-lg font-semibold"
                  style={{ 
                    backgroundColor: theme?.colors?.success,
                    boxShadow: theme?.shadows?.lg,
                    fontFamily: theme?.fonts?.accent
                  }}
                >
                  <Check className="w-6 h-6" />
                  Thank you for subscribing!
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
                  <div className="flex flex-col sm:flex-row gap-3">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={content.placeholder}
                          onChange={(e) => handleChange('placeholder', e.target.value)}
                          className="flex-1 px-6 py-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 border-2 border-dashed border-white/50"
                          style={{ fontFamily: theme?.fonts?.secondary }}
                          placeholder="Email placeholder text"
                        />
                        <input
                          type="text"
                          value={content.buttonText}
                          onChange={(e) => handleChange('buttonText', e.target.value)}
                          className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold border-2 border-dashed border-white/50"
                          style={{ fontFamily: theme?.fonts?.accent }}
                          placeholder="Button text"
                        />
                      </>
                    ) : (
                      <>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={content.placeholder}
                          required
                          className="flex-1 px-6 py-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                          style={{ fontFamily: theme?.fonts?.secondary }}
                        />
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                          style={{ 
                            boxShadow: theme?.shadows?.lg,
                            fontFamily: theme?.fonts?.accent
                          }}
                        >
                          <Send className="w-5 h-5" />
                          {content.buttonText}
                        </motion.button>
                      </>
                    )}
                  </div>
                  
                  {isEditing ? (
                    <input
                      type="text"
                      value={content.privacyText || 'No spam, unsubscribe at any time'}
                      onChange={(e) => handleChange('privacyText', e.target.value)}
                      className="text-white/70 text-sm mt-4 bg-transparent border-2 border-dashed border-white/30 rounded-lg p-1 w-full text-center"
                      style={{ fontFamily: theme?.fonts?.secondary }}
                      placeholder="Privacy text"
                    />
                  ) : (
                    <p 
                      className="text-white/70 text-sm mt-4"
                      style={{ fontFamily: theme?.fonts?.secondary }}
                    >
                      {content.privacyText || 'No spam, unsubscribe at any time'}
                    </p>
                  )}
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );

  // Split Newsletter
  const renderSplitNewsletter = () => (
    <section 
      className="py-12 sm:py-20" 
      style={{ 
        backgroundColor: theme?.colors?.surface || '#ffffff',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={content.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-transparent border-2 border-dashed rounded-xl p-3 w-full"
                    style={{ 
                      color: theme?.colors?.primary,
                      borderColor: `${theme?.colors?.primary}50`,
                      fontFamily: theme?.fonts?.primary
                    }}
                    placeholder="Enter newsletter title"
                  />
                  <textarea
                    value={content.subtitle}
                    onChange={(e) => handleChange('subtitle', e.target.value)}
                    className="text-lg mb-8 bg-transparent border-2 border-dashed rounded-xl p-3 w-full h-24 resize-none"
                    style={{ 
                      color: theme?.colors?.textSecondary,
                      borderColor: `${theme?.colors?.primary}50`,
                      fontFamily: theme?.fonts?.secondary
                    }}
                    placeholder="Enter newsletter description"
                  />
                </>
              ) : (
                <>
                  <h2 
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
                    style={{ 
                      color: theme?.colors?.primary,
                      fontFamily: theme?.fonts?.primary
                    }}
                  >
                    {content.title}
                  </h2>
                  <p 
                    className="text-lg mb-8"
                    style={{ 
                      color: theme?.colors?.textSecondary,
                      fontFamily: theme?.fonts?.secondary
                    }}
                  >
                    {content.subtitle}
                  </p>
                </>
              )}

              {/* Form */}
              {isSubmitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="rounded-xl p-4 inline-flex items-center gap-3 text-lg font-semibold"
                  style={{ 
                    backgroundColor: `${theme?.colors?.success}10`,
                    color: theme?.colors?.success,
                    fontFamily: theme?.fonts?.accent
                  }}
                >
                  <Check className="w-6 h-6" />
                  Thank you for subscribing!
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={content.placeholder}
                          onChange={(e) => handleChange('placeholder', e.target.value)}
                          className="flex-1 px-6 py-4 rounded-xl border"
                          style={{ 
                            borderColor: theme?.colors?.border,
                            color: theme?.colors?.text,
                            fontFamily: theme?.fonts?.secondary
                          }}
                          placeholder="Email placeholder text"
                        />
                        <input
                          type="text"
                          value={content.buttonText}
                          onChange={(e) => handleChange('buttonText', e.target.value)}
                          className="px-8 py-4 rounded-xl font-semibold border-2 border-dashed"
                          style={{ 
                            backgroundColor: theme?.colors?.primary,
                            color: '#ffffff',
                            borderColor: `${theme?.colors?.primary}50`,
                            fontFamily: theme?.fonts?.accent
                          }}
                          placeholder="Button text"
                        />
                      </>
                    ) : (
                      <>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={content.placeholder}
                          required
                          className="flex-1 px-6 py-4 rounded-xl border focus:ring-2 focus:border-transparent transition-all"
                          style={{ 
                            borderColor: theme?.colors?.border,
                            color: theme?.colors?.text,
                            fontFamily: theme?.fonts?.secondary
                          }}
                        />
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-8 py-4 rounded-xl text-white font-semibold transition-colors flex items-center gap-2"
                          style={{ 
                            background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                            boxShadow: theme?.shadows?.md,
                            fontFamily: theme?.fonts?.accent
                          }}
                        >
                          <Send className="w-5 h-5" />
                          {content.buttonText}
                        </motion.button>
                      </>
                    )}
                  </div>
                  
                  {isEditing ? (
                    <input
                      type="text"
                      value={content.privacyText || 'No spam, unsubscribe at any time'}
                      onChange={(e) => handleChange('privacyText', e.target.value)}
                      className="text-sm bg-transparent border-2 border-dashed rounded-lg p-1 w-full"
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        borderColor: `${theme?.colors?.primary}50`,
                        fontFamily: theme?.fonts?.secondary
                      }}
                      placeholder="Privacy text"
                    />
                  ) : (
                    <p 
                      className="text-sm"
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        fontFamily: theme?.fonts?.secondary
                      }}
                    >
                      {content.privacyText || 'No spam, unsubscribe at any time'}
                    </p>
                  )}
                </form>
              )}
            </motion.div>
          </div>

          {/* Image */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {isEditing ? (
                <ImageUpload
                  value={content.backgroundImage || ''}
                  onChange={(url) => handleChange('backgroundImage', url)}
                  placeholder="Add image"
                  className="w-full h-64 sm:h-80 lg:h-96"
                  theme={theme}
                />
              ) : (
                <img 
                  src={content.backgroundImage || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
                  alt="Newsletter" 
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-3xl"
                  style={{ boxShadow: theme?.shadows?.xl }}
                />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );

  // Initialize default content if needed
  React.useEffect(() => {
    if (!content.privacyText) {
      handleChange('privacyText', 'No spam, unsubscribe at any time');
    }
  }, []);

  switch (variant) {
    case 'newsletter-box':
      return renderBoxNewsletter();
    case 'newsletter-split':
      return renderSplitNewsletter();
    default:
      return renderCenteredNewsletter();
  }
};

export default NewsletterSection;