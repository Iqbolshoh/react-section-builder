import React from 'react';
import { motion } from 'framer-motion';
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

interface HeroSectionProps {
  content: {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
    image: string;
    videoUrl?: string;
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
  variant?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  content, 
  isEditing, 
  onChange, 
  theme,
  variant = 'hero-split'
}) => {
  const handleChange = (field: string, value: string) => {
    onChange({ ...content, [field]: value });
  };

  const renderSplitHero = () => (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ 
        fontFamily: theme?.fonts?.primary || 'Inter',
        background: `linear-gradient(135deg, ${theme?.colors?.primary}15, ${theme?.colors?.secondary}15)`,
        backgroundColor: theme?.colors?.background || '#f8fafc'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl"
          style={{ 
            background: `linear-gradient(135deg, ${theme?.colors?.primary}20, ${theme?.colors?.secondary}20)`
          }}
        />
        <motion.div
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl"
          style={{ 
            background: `linear-gradient(135deg, ${theme?.colors?.secondary}20, ${theme?.colors?.accent}20)`
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            {isEditing ? (
              <input
                type="text"
                value={content.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6 bg-transparent border-2 border-dashed rounded-lg p-2 w-full leading-tight"
                style={{ 
                  color: theme?.colors?.primary,
                  borderColor: `${theme?.colors?.primary}50`,
                  fontFamily: theme?.fonts?.primary
                }}
                placeholder="Enter hero title"
              />
            ) : (
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6 leading-tight"
                style={{ 
                  color: theme?.colors?.primary,
                  fontFamily: theme?.fonts?.primary
                }}
              >
                {content.title}
              </motion.h1>
            )}

            {isEditing ? (
              <textarea
                value={content.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="text-lg sm:text-xl mb-6 lg:mb-8 bg-transparent border-2 border-dashed rounded-lg p-2 w-full h-20 sm:h-24 resize-none leading-relaxed"
                style={{ 
                  color: theme?.colors?.textSecondary,
                  borderColor: `${theme?.colors?.primary}50`,
                  fontFamily: theme?.fonts?.secondary
                }}
                placeholder="Enter subtitle"
              />
            ) : (
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg sm:text-xl mb-6 lg:mb-8 leading-relaxed max-w-2xl"
                style={{ 
                  color: theme?.colors?.textSecondary,
                  fontFamily: theme?.fonts?.secondary
                }}
              >
                {content.subtitle}
              </motion.p>
            )}

            {isEditing ? (
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  value={content.buttonText}
                  onChange={(e) => handleChange('buttonText', e.target.value)}
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg border-2 border-dashed text-white"
                  style={{ 
                    background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                    borderColor: `${theme?.colors?.primary}50`,
                    fontFamily: theme?.fonts?.accent
                  }}
                  placeholder="Button text"
                />
                <input
                  type="text"
                  value={content.buttonLink}
                  onChange={(e) => handleChange('buttonLink', e.target.value)}
                  className="px-4 py-2 border rounded-lg text-sm"
                  style={{ 
                    borderColor: theme?.colors?.border,
                    color: theme?.colors?.text,
                    backgroundColor: theme?.colors?.surface
                  }}
                  placeholder="Button link"
                />
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.a
                  href={content.buttonLink}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg text-white transition-all duration-300"
                  style={{ 
                    background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                    boxShadow: theme?.shadows?.lg,
                    fontFamily: theme?.fonts?.accent
                  }}
                >
                  {content.buttonText}
                </motion.a>
              </motion.div>
            )}
          </motion.div>

          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            {isEditing ? (
              <ImageUpload
                value={content.image}
                onChange={(url) => handleChange('image', url)}
                placeholder="Add hero image"
                className="w-full h-64 sm:h-80 lg:h-96"
              />
            ) : (
              <div className="relative">
                <motion.img
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  src={content.image}
                  alt="Hero"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl"
                  style={{ boxShadow: theme?.shadows?.xl }}
                />
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-24 sm:h-24 rounded-full opacity-20"
                  style={{ 
                    background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`
                  }}
                />
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 rounded-full opacity-30"
                  style={{ 
                    background: `linear-gradient(135deg, ${theme?.colors?.secondary}, ${theme?.colors?.accent})`
                  }}
                />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );

  const renderCenteredHero = () => (
    <section 
      className="relative min-h-screen flex items-center justify-center text-center bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: content.image ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${content.image})` : `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {isEditing ? (
            <>
              <input
                type="url"
                value={content.image}
                onChange={(e) => handleChange('image', e.target.value)}
                className="w-full mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70"
                placeholder="Background Image URL"
              />
              <input
                type="text"
                value={content.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 bg-transparent border-2 border-dashed border-white/50 rounded-lg p-2 w-full text-white placeholder-white/70"
                style={{ fontFamily: theme?.fonts?.primary }}
                placeholder="Enter hero title"
              />
              <textarea
                value={content.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="text-lg sm:text-xl mb-8 bg-transparent border-2 border-dashed border-white/50 rounded-lg p-2 w-full h-24 resize-none text-white placeholder-white/70"
                style={{ fontFamily: theme?.fonts?.secondary }}
                placeholder="Enter subtitle"
              />
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input
                  type="text"
                  value={content.buttonText}
                  onChange={(e) => handleChange('buttonText', e.target.value)}
                  className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg border-2 border-dashed border-white/50"
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
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight"
                style={{ fontFamily: theme?.fonts?.primary }}
              >
                {content.title}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl mx-auto"
                style={{ fontFamily: theme?.fonts?.secondary }}
              >
                {content.subtitle}
              </motion.p>
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                href={content.buttonLink}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200"
                style={{ 
                  boxShadow: theme?.shadows?.lg,
                  fontFamily: theme?.fonts?.accent
                }}
              >
                {content.buttonText}
              </motion.a>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );

  const renderVideoHero = () => (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden" 
      style={{ fontFamily: theme?.fonts?.primary }}
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        {isEditing ? (
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: theme?.colors?.text }}
          >
            <div className="text-center text-white">
              <input
                type="url"
                value={content.videoUrl || ''}
                onChange={(e) => handleChange('videoUrl', e.target.value)}
                className="w-full max-w-md mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70"
                placeholder="YouTube/Vimeo URL"
              />
              <p className="text-sm text-white/70">Enter video URL for background</p>
            </div>
          </div>
        ) : content.videoUrl ? (
          <iframe
            src={content.videoUrl.includes('youtube.com') 
              ? content.videoUrl.replace('watch?v=', 'embed/') + '?autoplay=1&mute=1&loop=1&controls=0'
              : content.videoUrl
            }
            className="w-full h-full object-cover"
            allow="autoplay; encrypted-media"
          />
        ) : (
          <img
            src={content.image}
            alt="Video Background"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {isEditing ? (
            <>
              <input
                type="text"
                value={content.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 bg-transparent border-2 border-dashed border-white/50 rounded-lg p-2 w-full text-white placeholder-white/70"
                style={{ fontFamily: theme?.fonts?.primary }}
                placeholder="Enter hero title"
              />
              <textarea
                value={content.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="text-lg sm:text-xl mb-8 bg-transparent border-2 border-dashed border-white/50 rounded-lg p-2 w-full h-24 resize-none text-white placeholder-white/70"
                style={{ fontFamily: theme?.fonts?.secondary }}
                placeholder="Enter subtitle"
              />
              <input
                type="text"
                value={content.buttonText}
                onChange={(e) => handleChange('buttonText', e.target.value)}
                className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg border-2 border-dashed border-white/50"
                style={{ fontFamily: theme?.fonts?.accent }}
                placeholder="Button text"
              />
            </>
          ) : (
            <>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight"
                style={{ fontFamily: theme?.fonts?.primary }}
              >
                {content.title}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl mx-auto"
                style={{ fontFamily: theme?.fonts?.secondary }}
              >
                {content.subtitle}
              </motion.p>
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                href={content.buttonLink}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200"
                style={{ 
                  boxShadow: theme?.shadows?.lg,
                  fontFamily: theme?.fonts?.accent
                }}
              >
                {content.buttonText}
              </motion.a>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );

  const renderGradientHero = () => (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
        fontFamily: theme?.fonts?.primary
      }}
    >
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {isEditing ? (
            <>
              <input
                type="text"
                value={content.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 bg-transparent border-2 border-dashed border-white/50 rounded-lg p-2 w-full text-white placeholder-white/70"
                style={{ fontFamily: theme?.fonts?.primary }}
                placeholder="Enter hero title"
              />
              <textarea
                value={content.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="text-lg sm:text-xl mb-8 bg-transparent border-2 border-dashed border-white/50 rounded-lg p-2 w-full h-24 resize-none text-white placeholder-white/70"
                style={{ fontFamily: theme?.fonts?.secondary }}
                placeholder="Enter subtitle"
              />
              <input
                type="text"
                value={content.buttonText}
                onChange={(e) => handleChange('buttonText', e.target.value)}
                className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg border-2 border-dashed border-white/50"
                style={{ fontFamily: theme?.fonts?.accent }}
                placeholder="Button text"
              />
            </>
          ) : (
            <>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight"
                style={{ fontFamily: theme?.fonts?.primary }}
              >
                {content.title}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl mx-auto opacity-90"
                style={{ fontFamily: theme?.fonts?.secondary }}
              >
                {content.subtitle}
              </motion.p>
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                href={content.buttonLink}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200"
                style={{ 
                  boxShadow: theme?.shadows?.lg,
                  fontFamily: theme?.fonts?.accent
                }}
              >
                {content.buttonText}
              </motion.a>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );

  switch (variant) {
    case 'hero-centered':
      return renderCenteredHero();
    case 'hero-video':
      return renderVideoHero();
    case 'hero-gradient':
      return renderGradientHero();
    default:
      return renderSplitHero();
  }
};

export default HeroSection;