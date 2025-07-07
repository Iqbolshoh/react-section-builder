import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Play, Download, Mail, Check, Star } from 'lucide-react';
import ImageUpload from '../ImageUpload';

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

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...(content.features || [])];
    updatedFeatures[index] = value;
    handleChange('features', updatedFeatures);
  };

  const addFeature = () => {
    const newFeatures = [...(content.features || []), 'New Feature'];
    handleChange('features', newFeatures);
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = [...(content.features || [])];
    updatedFeatures.splice(index, 1);
    handleChange('features', updatedFeatures);
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
              <ImageUpload
                value={content.backgroundImage || ''}
                onChange={(url) => handleChange('backgroundImage', url)}
                placeholder="Add background image"
                className="w-full h-32 mb-6"
                theme={theme}
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
                  {isEditing ? (
                    <div className="space-y-2">
                      {content.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div 
                            className="w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ 
                              backgroundColor: `${theme?.colors?.success}20`,
                              color: theme?.colors?.success
                            }}
                          >
                            <Check className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => handleFeatureChange(index, e.target.value)}
                            className="flex-1 px-2 py-1 text-sm bg-transparent border rounded-lg"
                            style={{ 
                              borderColor: theme?.colors?.border,
                              color: theme?.colors?.text
                            }}
                            placeholder="Feature"
                          />
                          <button
                            onClick={() => removeFeature(index)}
                            className="p-1 text-red-500 hover:text-red-700 transition-colors"
                          >
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={addFeature}
                        className="px-3 py-1 text-sm rounded-lg transition-colors"
                        style={{ 
                          backgroundColor: `${theme?.colors?.primary}15`,
                          color: theme?.colors?.primary
                        }}
                      >
                        + Add Feature
                      </button>
                    </div>
                  ) : (
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
                  )}
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
                <ImageUpload
                  value={content.backgroundImage || ''}
                  onChange={(url) => handleChange('backgroundImage', url)}
                  placeholder="Add video thumbnail"
                  className="w-full h-64 sm:h-80 lg:h-96"
                  theme={theme}
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

  // Initialize default content based on variant
  React.useEffect(() => {
    if (variant === 'cta-video' && !content.features) {
      handleChange('features', [
        'High-quality video tutorials',
        'Expert-led instruction',
        'Learn at your own pace',
        'Certificate upon completion'
      ]);
    }
  }, [variant]);

  switch (variant) {
    case 'cta-image':
      return renderImageCTA();
    case 'cta-video':
      return renderVideoCTA();
    default:
      return renderGradientCTA();
  }
};

export default CTASection;