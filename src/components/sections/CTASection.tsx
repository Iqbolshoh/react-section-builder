import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Play, Download, Mail, Check, Star } from 'lucide-react';

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

interface CTASectionProps {
  content: {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
    backgroundImage?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    features?: string[];
    stats?: { value: string; label: string }[];
    testimonial?: { quote: string; author: string; role: string; avatar?: string };
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
  variant?: string;
}

const CTASection: React.FC<CTASectionProps> = ({ 
  content, 
  isEditing, 
  onChange, 
  theme,
  variant = 'cta-gradient'
}) => {
  const handleChange = (field: string, value: string) => {
    onChange({ ...content, [field]: value });
  };

  // Gradient CTA
  const renderGradientCTA = () => (
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
            <Sparkles className="w-8 h-8 text-white" />
          </div>

          {isEditing ? (
            <>
              <input
                type="text"
                value={content.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 bg-transparent border-2 border-dashed border-white/50 rounded-xl p-3 text-center w-full max-w-2xl mx-auto placeholder-white/70"
                style={{ fontFamily: theme?.fonts?.primary }}
                placeholder="Enter CTA title"
              />
              <textarea
                value={content.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="text-lg sm:text-xl text-white/90 mb-8 bg-transparent border-2 border-dashed border-white/50 rounded-xl p-3 w-full max-w-3xl mx-auto h-24 resize-none placeholder-white/70"
                style={{ fontFamily: theme?.fonts?.secondary }}
                placeholder="Enter CTA description"
              />
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input
                  type="text"
                  value={content.buttonText}
                  onChange={(e) => handleChange('buttonText', e.target.value)}
                  className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold border-2 border-dashed border-white/50"
                  style={{ fontFamily: theme?.fonts?.accent }}
                  placeholder="Button text"
                />
                <input
                  type="text"
                  value={content.buttonLink}
                  onChange={(e) => handleChange('buttonLink', e.target.value)}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70"
                  placeholder="Button link"
                />
              </div>
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
              <motion.a
                href={content.buttonLink}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
                style={{ 
                  boxShadow: theme?.shadows?.lg,
                  fontFamily: theme?.fonts?.accent
                }}
              >
                {content.buttonText}
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );

  // Image CTA
  const renderImageCTA = () => (
    <section 
      className="py-12 sm:py-20 bg-cover bg-center bg-no-repeat relative"
      style={{ 
        backgroundImage: content.backgroundImage ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${content.backgroundImage})` : `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {isEditing ? (
            <>
              <input
                type="url"
                value={content.backgroundImage || ''}
                onChange={(e) => handleChange('backgroundImage', e.target.value)}
                className="w-full mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70"
                placeholder="Background Image URL"
              />
              <input
                type="text"
                value={content.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 bg-transparent border-2 border-dashed border-white/50 rounded-xl p-3 text-center w-full max-w-2xl mx-auto placeholder-white/70"
                style={{ fontFamily: theme?.fonts?.primary }}
                placeholder="Enter CTA title"
              />
              <textarea
                value={content.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="text-lg sm:text-xl text-white/90 mb-8 bg-transparent border-2 border-dashed border-white/50 rounded-xl p-3 w-full max-w-3xl mx-auto h-24 resize-none placeholder-white/70"
                style={{ fontFamily: theme?.fonts?.secondary }}
                placeholder="Enter CTA description"
              />
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input
                  type="text"
                  value={content.buttonText}
                  onChange={(e) => handleChange('buttonText', e.target.value)}
                  className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold border-2 border-dashed border-white/50"
                  style={{ fontFamily: theme?.fonts?.accent }}
                  placeholder="Button text"
                />
                <input
                  type="text"
                  value={content.buttonLink}
                  onChange={(e) => handleChange('buttonLink', e.target.value)}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70"
                  placeholder="Button link"
                />
              </div>
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
              <motion.a
                href={content.buttonLink}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
                style={{ 
                  boxShadow: theme?.shadows?.lg,
                  fontFamily: theme?.fonts?.accent
                }}
              >
                {content.buttonText}
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );

  // Video CTA
  const renderVideoCTA = () => (
    <section 
      className="py-12 sm:py-20" 
      style={{ 
        backgroundColor: theme?.colors?.background || '#f9fafb',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
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
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-transparent border-2 border-dashed rounded-xl p-3 w-full"
                    style={{ 
                      color: theme?.colors?.primary,
                      borderColor: `${theme?.colors?.primary}50`,
                      fontFamily: theme?.fonts?.primary
                    }}
                    placeholder="Enter CTA title"
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
                    placeholder="Enter CTA description"
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

              {/* Features List */}
              {content.features && content.features.length > 0 && (
                <div className="mb-8">
                  <ul className="space-y-3">
                    {content.features.map((feature, index) => (
                      <li 
                        key={index}
                        className="flex items-center gap-3"
                      >
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ 
                            backgroundColor: `${theme?.colors?.success}20`,
                            color: theme?.colors?.success
                          }}
                        >
                          <Check className="w-4 h-4" />
                        </div>
                        <span 
                          style={{ 
                            color: theme?.colors?.text,
                            fontFamily: theme?.fonts?.secondary
                          }}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={content.buttonText}
                      onChange={(e) => handleChange('buttonText', e.target.value)}
                      className="px-6 py-3 rounded-xl font-semibold border-2 border-dashed"
                      style={{ 
                        backgroundColor: theme?.colors?.primary,
                        color: '#ffffff',
                        borderColor: `${theme?.colors?.primary}50`,
                        fontFamily: theme?.fonts?.accent
                      }}
                      placeholder="Button text"
                    />
                    <input
                      type="text"
                      value={content.buttonLink}
                      onChange={(e) => handleChange('buttonLink', e.target.value)}
                      className="px-4 py-2 border rounded-lg"
                      style={{ 
                        borderColor: theme?.colors?.border,
                        fontFamily: theme?.fonts?.secondary
                      }}
                      placeholder="Button link"
                    />
                  </>
                ) : (
                  <>
                    <motion.a
                      href={content.buttonLink}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-colors"
                      style={{ 
                        background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                        boxShadow: theme?.shadows?.md,
                        fontFamily: theme?.fonts?.accent
                      }}
                    >
                      {content.buttonText}
                      <ArrowRight className="w-5 h-5" />
                    </motion.a>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 transition-colors"
                      style={{ 
                        color: theme?.colors?.text,
                        borderColor: theme?.colors?.border,
                        fontFamily: theme?.fonts?.accent
                      }}
                    >
                      <Play className="w-5 h-5" />
                      Watch Demo
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>
          </div>

          {/* Video */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden"
              style={{ boxShadow: theme?.shadows?.xl }}
            >
              {isEditing ? (
                <input
                  type="url"
                  value={content.backgroundImage || ''}
                  onChange={(e) => handleChange('backgroundImage', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  style={{ 
                    borderColor: theme?.colors?.border,
                    fontFamily: theme?.fonts?.secondary
                  }}
                  placeholder="Video thumbnail URL"
                />
              ) : (
                <>
                  <img 
                    src={content.backgroundImage || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
                    alt="Video thumbnail" 
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        boxShadow: theme?.shadows?.lg
                      }}
                    >
                      <Play 
                        className="w-8 h-8 ml-1" 
                        style={{ color: theme?.colors?.primary }}
                      />
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );

  // App Download CTA
  const renderAppDownloadCTA = () => (
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
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-transparent border-2 border-dashed rounded-xl p-3 w-full"
                    style={{ 
                      color: theme?.colors?.primary,
                      borderColor: `${theme?.colors?.primary}50`,
                      fontFamily: theme?.fonts?.primary
                    }}
                    placeholder="Enter CTA title"
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
                    placeholder="Enter CTA description"
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

              {/* App Store Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.a
                  href={content.buttonLink}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-xl transition-colors"
                  style={{ 
                    backgroundColor: theme?.colors?.text || '#1f2937',
                    color: '#ffffff',
                    boxShadow: theme?.shadows?.md
                  }}
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5227 19.2951C16.7342 20.0836 15.8099 19.9242 14.9249 19.5627C13.9823 19.1918 13.1032 19.1728 12.1034 19.5627C10.8445 20.0647 10.1821 19.8958 9.47591 19.2951C5.90709 15.6366 6.52003 10.1335 10.6574 9.94621C11.7953 9.99995 12.5932 10.5479 13.2585 10.5859C14.2487 10.4739 15.1999 9.90662 16.2563 10.0092C17.5342 10.1429 18.4964 10.6716 19.1332 11.6237C16.2089 13.3053 16.8276 17.1965 19.5 18.2081C19.0057 18.9404 18.4111 19.6441 17.5132 19.3046L17.5227 19.2951ZM13.1506 9.8342C12.9963 7.95988 14.5173 6.42891 16.2848 6.25C16.5032 8.41891 14.3651 10.0092 13.1506 9.8342Z" fill="white"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-lg font-semibold">App Store</div>
                  </div>
                </motion.a>
                
                <motion.a
                  href="#google-play"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-xl transition-colors"
                  style={{ 
                    backgroundColor: theme?.colors?.text || '#1f2937',
                    color: '#ffffff',
                    boxShadow: theme?.shadows?.md
                  }}
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.0001 3.99997L4.00012 12L12.0001 20L12.0001 3.99997Z" fill="#EA4335"/>
                    <path d="M12 4V20L20 12L12 4Z" fill="#FBBC04"/>
                    <path d="M5.00012 12.5L12.0001 4.00002V3.99997L4.00012 12L12.0001 20V19.9999L5.00012 12.5Z" fill="#4285F4"/>
                    <path d="M12 20L12 12.5L5 12.5L12 20Z" fill="#34A853"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-lg font-semibold">Google Play</div>
                  </div>
                </motion.a>
              </div>

              {/* Rating */}
              <div className="mt-8 flex items-center justify-center lg:justify-start">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 fill-current" 
                      style={{ color: theme?.colors?.warning }}
                    />
                  ))}
                </div>
                <span 
                  className="ml-2"
                  style={{ 
                    color: theme?.colors?.textSecondary,
                    fontFamily: theme?.fonts?.secondary
                  }}
                >
                  4.9 • 2,500+ reviews
                </span>
              </div>
            </motion.div>
          </div>

          {/* App Image */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {isEditing ? (
                <input
                  type="url"
                  value={content.backgroundImage || ''}
                  onChange={(e) => handleChange('backgroundImage', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  style={{ 
                    borderColor: theme?.colors?.border,
                    fontFamily: theme?.fonts?.secondary
                  }}
                  placeholder="App screenshot URL"
                />
              ) : (
                <img 
                  src={content.backgroundImage || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
                  alt="App screenshot" 
                  className="w-full h-auto object-cover rounded-2xl"
                  style={{ boxShadow: theme?.shadows?.xl }}
                />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );

  // Newsletter CTA
  const renderNewsletterCTA = () => (
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
            background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
            boxShadow: theme?.shadows?.xl
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
            {/* Content */}
            <div className="p-8 sm:p-12 lg:p-16 text-white">
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
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-transparent border-2 border-dashed border-white/50 rounded-xl p-3 w-full text-white placeholder-white/70"
                      style={{ fontFamily: theme?.fonts?.primary }}
                      placeholder="Enter newsletter title"
                    />
                    <textarea
                      value={content.subtitle}
                      onChange={(e) => handleChange('subtitle', e.target.value)}
                      className="text-lg mb-8 bg-transparent border-2 border-dashed border-white/50 rounded-xl p-3 w-full h-24 resize-none text-white placeholder-white/70"
                      style={{ fontFamily: theme?.fonts?.secondary }}
                      placeholder="Enter newsletter description"
                    />
                  </>
                ) : (
                  <>
                    <h2 
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
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

                <form className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
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
                      <Mail className="w-5 h-5" />
                      {content.buttonText || 'Subscribe'}
                    </motion.button>
                  </div>
                  <p 
                    className="text-sm text-white/70"
                    style={{ fontFamily: theme?.fonts?.secondary }}
                  >
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              </motion.div>
            </div>

            {/* Image or Pattern */}
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      x: [0, 100, 0],
                      y: [0, -50, 0],
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 10 + i * 2,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                    className="absolute rounded-full opacity-20"
                    style={{
                      width: `${60 + i * 20}px`,
                      height: `${60 + i * 20}px`,
                      left: `${10 + i * 15}%`,
                      top: `${10 + i * 10}%`,
                      backgroundColor: 'rgba(255, 255, 255, 0.3)'
                    }}
                  />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Mail className="w-32 h-32 text-white/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Split CTA
  const renderSplitCTA = () => (
    <section 
      className="py-12 sm:py-20" 
      style={{ 
        backgroundColor: theme?.colors?.surface || '#ffffff',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="rounded-3xl overflow-hidden"
          style={{ 
            boxShadow: theme?.shadows?.xl,
            backgroundColor: theme?.colors?.background
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="relative h-64 lg:h-auto">
              {isEditing ? (
                <div className="p-8">
                  <input
                    type="url"
                    value={content.backgroundImage || ''}
                    onChange={(e) => handleChange('backgroundImage', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                    style={{ 
                      borderColor: theme?.colors?.border,
                      fontFamily: theme?.fonts?.secondary
                    }}
                    placeholder="Background Image URL"
                  />
                </div>
              ) : (
                <img 
                  src={content.backgroundImage || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
                  alt="CTA" 
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Content */}
            <div className="p-8 sm:p-12">
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
                      className="text-2xl sm:text-3xl font-bold mb-4 bg-transparent border-2 border-dashed rounded-xl p-3 w-full"
                      style={{ 
                        color: theme?.colors?.primary,
                        borderColor: `${theme?.colors?.primary}50`,
                        fontFamily: theme?.fonts?.primary
                      }}
                      placeholder="Enter CTA title"
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
                      placeholder="Enter CTA description"
                    />
                  </>
                ) : (
                  <>
                    <h2 
                      className="text-2xl sm:text-3xl font-bold mb-4"
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

                {/* Features List */}
                {content.features && content.features.length > 0 && (
                  <div className="mb-8">
                    <ul className="space-y-3">
                      {content.features.map((feature, index) => (
                        <li 
                          key={index}
                          className="flex items-center gap-3"
                        >
                          <div 
                            className="w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ 
                              backgroundColor: `${theme?.colors?.success}20`,
                              color: theme?.colors?.success
                            }}
                          >
                            <Check className="w-4 h-4" />
                          </div>
                          <span 
                            style={{ 
                              color: theme?.colors?.text,
                              fontFamily: theme?.fonts?.secondary
                            }}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={content.buttonText}
                        onChange={(e) => handleChange('buttonText', e.target.value)}
                        className="px-6 py-3 rounded-xl font-semibold border-2 border-dashed"
                        style={{ 
                          backgroundColor: theme?.colors?.primary,
                          color: '#ffffff',
                          borderColor: `${theme?.colors?.primary}50`,
                          fontFamily: theme?.fonts?.accent
                        }}
                        placeholder="Button text"
                      />
                      <input
                        type="text"
                        value={content.buttonLink}
                        onChange={(e) => handleChange('buttonLink', e.target.value)}
                        className="px-4 py-2 border rounded-lg"
                        style={{ 
                          borderColor: theme?.colors?.border,
                          fontFamily: theme?.fonts?.secondary
                        }}
                        placeholder="Button link"
                      />
                    </>
                  ) : (
                    <motion.a
                      href={content.buttonLink}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-colors"
                      style={{ 
                        background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                        boxShadow: theme?.shadows?.md,
                        fontFamily: theme?.fonts?.accent
                      }}
                    >
                      {content.buttonText}
                      <ArrowRight className="w-5 h-5" />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Initialize default content based on variant
  React.useEffect(() => {
    if (variant === 'cta-video' && !content.features) {
      handleChange('features', [
        'High-quality video tutorials',
        'Expert-led instruction',
        'Learn at your own pace',
        'Certificate upon completion'
      ]);
    } else if (variant === 'cta-app-download' && !content.features) {
      handleChange('features', [
        'Free to download',
        'Available on iOS and Android',
        'Offline access',
        'Regular updates'
      ]);
    }
  }, [variant]);

  switch (variant) {
    case 'cta-image':
      return renderImageCTA();
    case 'cta-video':
      return renderVideoCTA();
    case 'cta-newsletter':
      return renderNewsletterCTA();
    case 'cta-app-download':
      return renderAppDownloadCTA();
    case 'cta-split':
      return renderSplitCTA();
    default:
      return renderGradientCTA();
  }
};

export default CTASection;