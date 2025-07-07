import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

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
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 bg-transparent border-2 border-dashed border-white/50 rounded-lg p-2 text-center w-full max-w-2xl mx-auto placeholder-white/70"
                style={{ fontFamily: theme?.fonts?.primary }}
                placeholder="Enter CTA title"
              />
              <textarea
                value={content.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="text-lg sm:text-xl text-white/90 mb-8 bg-transparent border-2 border-dashed border-white/50 rounded-lg p-2 w-full max-w-3xl mx-auto h-24 resize-none placeholder-white/70"
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
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 bg-transparent border-2 border-dashed border-white/50 rounded-lg p-2 text-center w-full max-w-2xl mx-auto placeholder-white/70"
                style={{ fontFamily: theme?.fonts?.primary }}
                placeholder="Enter CTA title"
              />
              <textarea
                value={content.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="text-lg sm:text-xl text-white/90 mb-8 bg-transparent border-2 border-dashed border-white/50 rounded-lg p-2 w-full max-w-3xl mx-auto h-24 resize-none placeholder-white/70"
                style={{ fontFamily: theme?.fonts?.secondary }}
                placeholder="Enter CTA description"
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

  switch (variant) {
    case 'cta-image':
      return renderImageCTA();
    default:
      return renderGradientCTA();
  }
};

export default CTASection;