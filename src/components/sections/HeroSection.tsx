import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Play } from 'lucide-react';
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
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    image: string;
    videoUrl?: string;
    overlayOpacity?: number;
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
                <div className="space-y-2">
                  <input
                    type="text"
                    value={content.buttonText}
                    onChange={(e) => handleChange('buttonText', e.target.value)}
                    className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg border-2 border-dashed text-white w-full"
                    style={{ 
                      background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                      borderColor: `${theme?.colors?.primary}50`,
                      fontFamily: theme?.fonts?.accent
                    }}
                    placeholder="Primary button text"
                  />
                  <input
                    type="text"
                    value={content.buttonLink}
                    onChange={(e) => handleChange('buttonLink', e.target.value)}
                    className="px-4 py-2 border rounded-lg text-sm w-full"
                    style={{ 
                      borderColor: theme?.colors?.border,
                      color: theme?.colors?.text,
                      backgroundColor: theme?.colors?.surface
                    }}
                    placeholder="Primary button link"
                  />
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={content.secondaryButtonText || ''}
                    onChange={(e) => handleChange('secondaryButtonText', e.target.value)}
                    className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg border-2 w-full"
                    style={{ 
                      borderColor: theme?.colors?.primary,
                      color: theme?.colors?.primary,
                      backgroundColor: 'transparent',
                      fontFamily: theme?.fonts?.accent
                    }}
                    placeholder="Secondary button text (optional)"
                  />
                  <input
                    type="text"
                    value={content.secondaryButtonLink || ''}
                    onChange={(e) => handleChange('secondaryButtonLink', e.target.value)}
                    className="px-4 py-2 border rounded-lg text-sm w-full"
                    style={{ 
                      borderColor: theme?.colors?.border,
                      color: theme?.colors?.text,
                      backgroundColor: theme?.colors?.surface
                    }}
                    placeholder="Secondary button link"
                  />
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.a
                  href={content.buttonLink}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg text-white transition-all duration-300"
                  style={{ 
                    background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                    boxShadow: theme?.shadows?.lg,
                    fontFamily: theme?.fonts?.accent
                  }}
                >
                  {content.buttonText}
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
                
                {content.secondaryButtonText && (
                  <motion.a
                    href={content.secondaryButtonLink || '#'}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg border-2 transition-all duration-300"
                    style={{ 
                      borderColor: theme?.colors?.primary,
                      color: theme?.colors?.primary,
                      fontFamily: theme?.fonts?.accent
                    }}
                  >
                    {content.secondaryButtonText}
                  </motion.a>
                )}
              </motion.div>
            )}
            
            {/* Scroll indicator */}
            {!isEditing && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="hidden lg:flex items-center gap-2 mt-12 text-sm"
                style={{ color: theme?.colors?.textSecondary }}
              >
                <span style={{ fontFamily: theme?.fonts?.secondary }}>Scroll to explore</span>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
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
                theme={theme}
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
                
                {/* Video play button if video URL exists */}
                {content.videoUrl && (
                  <motion.a
                    href={content.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center"
                    style={{ 
                      background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                      boxShadow: theme?.shadows?.xl
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1" />
                  </motion.a>
                )}
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
        backgroundImage: content.image ? `linear-gradient(rgba(0, 0, 0, ${content.overlayOpacity || 0.5}), rgba(0, 0, 0, ${content.overlayOpacity || 0.5})), url(${content.image})` : `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
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
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={content.overlayOpacity || 0.5}
                onChange={(e) => handleChange('overlayOpacity', e.target.value)}
                className="w-full mb-4"
              />
              <span className="text-sm text-white/70 block mb-4">
                Overlay Opacity: {content.overlayOpacity || 0.5}
              </span>
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
                <div className="space-y-2">
                  <input
                    type="text"
                    value={content.buttonText}
                    onChange={(e) => handleChange('buttonText', e.target.value)}
                    className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg border-2 border-dashed border-white/50 w-full"
                    style={{ fontFamily: theme?.fonts?.accent }}
                    placeholder="Button text"
                  />
                  <input
                    type="text"
                    value={content.buttonLink}
                    onChange={(e) => handleChange('buttonLink', e.target.value)}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 w-full"
                    placeholder="Button link"
                  />
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={content.secondaryButtonText || ''}
                    onChange={(e) => handleChange('secondaryButtonText', e.target.value)}
                    className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold text-lg w-full"
                    style={{ fontFamily: theme?.fonts?.accent }}
                    placeholder="Secondary button (optional)"
                  />
                  <input
                    type="text"
                    value={content.secondaryButtonLink || ''}
                    onChange={(e) => handleChange('secondaryButtonLink', e.target.value)}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 w-full"
                    placeholder="Secondary button link"
                  />
                </div>
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.a
                  href={content.buttonLink}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200"
                  style={{ 
                    boxShadow: theme?.shadows?.lg,
                    fontFamily: theme?.fonts?.accent
                  }}
                >
                  {content.buttonText}
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
                
                {content.secondaryButtonText && (
                  <motion.a
                    href={content.secondaryButtonLink || '#'}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-200"
                    style={{ 
                      boxShadow: theme?.shadows?.lg,
                      fontFamily: theme?.fonts?.accent
                    }}
                  >
                    {content.secondaryButtonText}
                  </motion.a>
                )}
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      {!isEditing && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span 
            className="text-sm text-white text-opacity-80"
            style={{ fontFamily: theme?.fonts?.secondary }}
          >
            Scroll down
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5 text-white" />
          </motion.div>
        </motion.div>
      )}
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
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: `rgba(0, 0, 0, ${content.overlayOpacity || 0.4})` }}
        ></div>
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
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={content.overlayOpacity || 0.4}
                onChange={(e) => handleChange('overlayOpacity', e.target.value)}
                className="w-full mb-4"
              />
              <span className="text-sm text-white/70 block mb-4">
                Overlay Opacity: {content.overlayOpacity || 0.4}
              </span>
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
                <div className="space-y-2">
                  <input
                    type="text"
                    value={content.buttonText}
                    onChange={(e) => handleChange('buttonText', e.target.value)}
                    className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg border-2 border-dashed border-white/50 w-full"
                    style={{ fontFamily: theme?.fonts?.accent }}
                    placeholder="Button text"
                  />
                  <input
                    type="text"
                    value={content.buttonLink}
                    onChange={(e) => handleChange('buttonLink', e.target.value)}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 w-full"
                    placeholder="Button link"
                  />
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={content.secondaryButtonText || ''}
                    onChange={(e) => handleChange('secondaryButtonText', e.target.value)}
                    className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold text-lg w-full"
                    style={{ fontFamily: theme?.fonts?.accent }}
                    placeholder="Secondary button (optional)"
                  />
                  <input
                    type="text"
                    value={content.secondaryButtonLink || ''}
                    onChange={(e) => handleChange('secondaryButtonLink', e.target.value)}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 w-full"
                    placeholder="Secondary button link"
                  />
                </div>
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.a
                  href={content.buttonLink}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200"
                  style={{ 
                    boxShadow: theme?.shadows?.lg,
                    fontFamily: theme?.fonts?.accent
                  }}
                >
                  {content.buttonText}
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
                
                {content.secondaryButtonText && (
                  <motion.a
                    href={content.secondaryButtonLink || '#'}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-200"
                    style={{ 
                      boxShadow: theme?.shadows?.lg,
                      fontFamily: theme?.fonts?.accent
                    }}
                  >
                    {content.secondaryButtonText}
                  </motion.a>
                )}
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
      
      {/* Play button for video */}
      {!isEditing && content.videoUrl && (
        <motion.a
          href={content.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex items-center gap-3 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ 
              background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
              boxShadow: theme?.shadows?.lg
            }}
          >
            <Play className="w-5 h-5 ml-1" />
          </div>
          <span style={{ fontFamily: theme?.fonts?.secondary }}>Watch Video</span>
        </motion.a>
      )}
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
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="space-y-2">
                  <input
                    type="text"
                    value={content.buttonText}
                    onChange={(e) => handleChange('buttonText', e.target.value)}
                    className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg border-2 border-dashed border-white/50 w-full"
                    style={{ fontFamily: theme?.fonts?.accent }}
                    placeholder="Button text"
                  />
                  <input
                    type="text"
                    value={content.buttonLink}
                    onChange={(e) => handleChange('buttonLink', e.target.value)}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 w-full"
                    placeholder="Button link"
                  />
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={content.secondaryButtonText || ''}
                    onChange={(e) => handleChange('secondaryButtonText', e.target.value)}
                    className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold text-lg w-full"
                    style={{ fontFamily: theme?.fonts?.accent }}
                    placeholder="Secondary button (optional)"
                  />
                  <input
                    type="text"
                    value={content.secondaryButtonLink || ''}
                    onChange={(e) => handleChange('secondaryButtonLink', e.target.value)}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 w-full"
                    placeholder="Secondary button link"
                  />
                </div>
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
                className="text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl mx-auto opacity-90"
                style={{ fontFamily: theme?.fonts?.secondary }}
              >
                {content.subtitle}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.a
                  href={content.buttonLink}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200"
                  style={{ 
                    boxShadow: theme?.shadows?.lg,
                    fontFamily: theme?.fonts?.accent
                  }}
                >
                  {content.buttonText}
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
                
                {content.secondaryButtonText && (
                  <motion.a
                    href={content.secondaryButtonLink || '#'}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-200"
                    style={{ 
                      boxShadow: theme?.shadows?.lg,
                      fontFamily: theme?.fonts?.accent
                    }}
                  >
                    {content.secondaryButtonText}
                  </motion.a>
                )}
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      {!isEditing && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span 
            className="text-sm text-white text-opacity-80"
            style={{ fontFamily: theme?.fonts?.secondary }}
          >
            Scroll down
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5 text-white" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );

  const renderMinimalHero = () => (
    <section 
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
      style={{ 
        backgroundColor: theme?.colors?.surface || '#ffffff',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-0 right-0 w-full h-full bg-no-repeat bg-right-top opacity-10"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='600' height='600' viewBox='0 0 600 600' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='300' cy='300' r='300' fill='${encodeURIComponent(theme?.colors?.primary || '#3b82f6')}'/%3E%3C/svg%3E")`,
            backgroundSize: '80%'
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            {isEditing ? (
              <input
                type="text"
                value={content.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 bg-transparent border-2 border-dashed rounded-lg p-2 w-full leading-tight"
                style={{ 
                  color: theme?.colors?.text,
                  borderColor: `${theme?.colors?.primary}50`,
                  fontFamily: theme?.fonts?.primary
                }}
                placeholder="Enter hero title"
              />
            ) : (
              <h1 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 leading-tight"
                style={{ 
                  color: theme?.colors?.text,
                  fontFamily: theme?.fonts?.primary
                }}
              >
                {content.title}
              </h1>
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
              <p 
                className="text-lg sm:text-xl mb-6 lg:mb-8 leading-relaxed max-w-2xl lg:mx-0 mx-auto"
                style={{ 
                  color: theme?.colors?.textSecondary,
                  fontFamily: theme?.fonts?.secondary
                }}
              >
                {content.subtitle}
              </p>
            )}

            {isEditing ? (
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="space-y-2">
                  <input
                    type="text"
                    value={content.buttonText}
                    onChange={(e) => handleChange('buttonText', e.target.value)}
                    className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg border-2 border-dashed text-white w-full"
                    style={{ 
                      background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                      borderColor: `${theme?.colors?.primary}50`,
                      fontFamily: theme?.fonts?.accent
                    }}
                    placeholder="Primary button text"
                  />
                  <input
                    type="text"
                    value={content.buttonLink}
                    onChange={(e) => handleChange('buttonLink', e.target.value)}
                    className="px-4 py-2 border rounded-lg text-sm w-full"
                    style={{ 
                      borderColor: theme?.colors?.border,
                      color: theme?.colors?.text,
                      backgroundColor: theme?.colors?.surface
                    }}
                    placeholder="Primary button link"
                  />
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={content.secondaryButtonText || ''}
                    onChange={(e) => handleChange('secondaryButtonText', e.target.value)}
                    className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg border-2 w-full"
                    style={{ 
                      borderColor: theme?.colors?.primary,
                      color: theme?.colors?.primary,
                      backgroundColor: 'transparent',
                      fontFamily: theme?.fonts?.accent
                    }}
                    placeholder="Secondary button text (optional)"
                  />
                  <input
                    type="text"
                    value={content.secondaryButtonLink || ''}
                    onChange={(e) => handleChange('secondaryButtonLink', e.target.value)}
                    className="px-4 py-2 border rounded-lg text-sm w-full"
                    style={{ 
                      borderColor: theme?.colors?.border,
                      color: theme?.colors?.text,
                      backgroundColor: theme?.colors?.surface
                    }}
                    placeholder="Secondary button link"
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 lg:justify-start justify-center">
                <motion.a
                  href={content.buttonLink}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg text-white transition-all duration-300"
                  style={{ 
                    background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                    boxShadow: theme?.shadows?.lg,
                    fontFamily: theme?.fonts?.accent
                  }}
                >
                  {content.buttonText}
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
                
                {content.secondaryButtonText && (
                  <motion.a
                    href={content.secondaryButtonLink || '#'}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg border-2 transition-all duration-300"
                    style={{ 
                      borderColor: theme?.colors?.primary,
                      color: theme?.colors?.primary,
                      fontFamily: theme?.fonts?.accent
                    }}
                  >
                    {content.secondaryButtonText}
                  </motion.a>
                )}
              </div>
            )}
          </motion.div>

          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5"
          >
            {isEditing ? (
              <ImageUpload
                value={content.image}
                onChange={(url) => handleChange('image', url)}
                placeholder="Add hero image"
                className="w-full"
                theme={theme}
              />
            ) : (
              <img
                src={content.image}
                alt="Hero"
                className="w-full h-auto object-cover rounded-2xl"
                style={{ boxShadow: theme?.shadows?.lg }}
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );

  const renderAnimatedHero = () => (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ 
        backgroundColor: theme?.colors?.background || '#f8fafc',
        fontFamily: theme?.fonts?.primary
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: theme?.colors?.primary || '#3b82f6', stopOpacity: 0.2 }}/>
              <stop offset="100%" style={{ stopColor: theme?.colors?.secondary || '#06b6d4', stopOpacity: 0.2 }}/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill={theme?.colors?.background || '#f8fafc'} />
          
          <motion.circle
            cx="10%"
            cy="20%"
            r="5%"
            fill="url(#grad1)"
            animate={{ 
              cx: ['10%', '15%', '10%'],
              cy: ['20%', '25%', '20%'],
              r: ['5%', '6%', '5%']
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.circle
            cx="80%"
            cy="60%"
            r="10%"
            fill="url(#grad1)"
            animate={{ 
              cx: ['80%', '75%', '80%'],
              cy: ['60%', '65%', '60%'],
              r: ['10%', '12%', '10%']
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.path
            d="M0,100 Q250,50 500,100 T1000,100"
            fill="none"
            stroke={theme?.colors?.primary || '#3b82f6'}
            strokeWidth="2"
            strokeOpacity="0.1"
            animate={{ 
              d: [
                "M0,100 Q250,50 500,100 T1000,100",
                "M0,110 Q250,60 500,110 T1000,110",
                "M0,100 Q250,50 500,100 T1000,100"
              ]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {isEditing ? (
              <input
                type="text"
                value={content.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6 bg-transparent border-2 border-dashed rounded-lg p-2 w-full leading-tight"
                style={{ 
                  color: theme?.colors?.text,
                  borderColor: `${theme?.colors?.primary}50`,
                  fontFamily: theme?.fonts?.primary
                }}
                placeholder="Enter hero title"
              />
            ) : (
              <div className="relative">
                {content.title.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-2 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                    style={{ 
                      color: i % 3 === 0 ? theme?.colors?.primary : 
                             i % 3 === 1 ? theme?.colors?.secondary : 
                             theme?.colors?.text,
                      fontFamily: theme?.fonts?.primary
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
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
                <div className="space-y-2">
                  <input
                    type="text"
                    value={content.buttonText}
                    onChange={(e) => handleChange('buttonText', e.target.value)}
                    className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg border-2 border-dashed text-white w-full"
                    style={{ 
                      background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                      borderColor: `${theme?.colors?.primary}50`,
                      fontFamily: theme?.fonts?.accent
                    }}
                    placeholder="Primary button text"
                  />
                  <input
                    type="text"
                    value={content.buttonLink}
                    onChange={(e) => handleChange('buttonLink', e.target.value)}
                    className="px-4 py-2 border rounded-lg text-sm w-full"
                    style={{ 
                      borderColor: theme?.colors?.border,
                      color: theme?.colors?.text,
                      backgroundColor: theme?.colors?.surface
                    }}
                    placeholder="Primary button link"
                  />
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={content.secondaryButtonText || ''}
                    onChange={(e) => handleChange('secondaryButtonText', e.target.value)}
                    className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg border-2 w-full"
                    style={{ 
                      borderColor: theme?.colors?.primary,
                      color: theme?.colors?.primary,
                      backgroundColor: 'transparent',
                      fontFamily: theme?.fonts?.accent
                    }}
                    placeholder="Secondary button text (optional)"
                  />
                  <input
                    type="text"
                    value={content.secondaryButtonLink || ''}
                    onChange={(e) => handleChange('secondaryButtonLink', e.target.value)}
                    className="px-4 py-2 border rounded-lg text-sm w-full"
                    style={{ 
                      borderColor: theme?.colors?.border,
                      color: theme?.colors?.text,
                      backgroundColor: theme?.colors?.surface
                    }}
                    placeholder="Secondary button link"
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 lg:justify-start justify-center">
                <motion.a
                  href={content.buttonLink}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg text-white transition-all duration-300"
                  style={{ 
                    background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                    boxShadow: theme?.shadows?.lg,
                    fontFamily: theme?.fonts?.accent
                  }}
                >
                  {content.buttonText}
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
                
                {content.secondaryButtonText && (
                  <motion.a
                    href={content.secondaryButtonLink || '#'}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg border-2 transition-all duration-300"
                    style={{ 
                      borderColor: theme?.colors?.primary,
                      color: theme?.colors?.primary,
                      fontFamily: theme?.fonts?.accent
                    }}
                  >
                    {content.secondaryButtonText}
                  </motion.a>
                )}
              </div>
            )}
          </motion.div>

          {/* Image with animated elements */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {isEditing ? (
              <ImageUpload
                value={content.image}
                onChange={(url) => handleChange('image', url)}
                placeholder="Add hero image"
                className="w-full"
                theme={theme}
              />
            ) : (
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="relative z-10"
                >
                  <img
                    src={content.image}
                    alt="Hero"
                    className="w-full h-auto object-cover rounded-2xl"
                    style={{ boxShadow: theme?.shadows?.xl }}
                  />
                </motion.div>
                
                {/* Decorative elements */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="absolute -top-6 -left-6 w-12 h-12 rounded-lg z-20"
                  style={{ 
                    background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                    boxShadow: theme?.shadows?.lg
                  }}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full z-0"
                  style={{ 
                    background: `linear-gradient(135deg, ${theme?.colors?.secondary}, ${theme?.colors?.accent})`,
                    opacity: 0.3
                  }}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.3 }}
                  className="absolute top-1/2 -right-3 w-6 h-6 rounded-full z-20"
                  style={{ 
                    backgroundColor: theme?.colors?.accent,
                    boxShadow: theme?.shadows?.md
                  }}
                />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );

  // Initialize default content if needed
  React.useEffect(() => {
    if (!content.secondaryButtonText && variant === 'hero-animated') {
      handleChange('secondaryButtonText', 'Learn More');
      handleChange('secondaryButtonLink', '#about');
    }
    
    if (!content.overlayOpacity) {
      if (variant === 'hero-centered') {
        handleChange('overlayOpacity', '0.5');
      } else if (variant === 'hero-video') {
        handleChange('overlayOpacity', '0.4');
      }
    }
  }, [variant]);

  switch (variant) {
    case 'hero-centered':
      return renderCenteredHero();
    case 'hero-video':
      return renderVideoHero();
    case 'hero-gradient':
      return renderGradientHero();
    case 'hero-minimal':
      return renderMinimalHero();
    case 'hero-animated':
      return renderAnimatedHero();
    default:
      return renderSplitHero();
  }
};

export default HeroSection;