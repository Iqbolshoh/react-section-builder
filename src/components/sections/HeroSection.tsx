import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ChevronDown, Star, Sparkles, Check } from 'lucide-react';
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
    features?: string[];
    stats?: { value: string; label: string }[];
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    backgroundImage?: string;
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
  const handleChange = (field: string, value: any) => {
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

  // Hero Split Layout
  const renderSplitHero = () => (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ 
        fontFamily: theme?.fonts?.primary,
        backgroundColor: theme?.colors?.background
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl opacity-20"
          style={{ 
            background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})` 
          }}
        ></div>
        <div 
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ 
            background: `linear-gradient(135deg, ${theme?.colors?.accent}, ${theme?.colors?.primary})` 
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">
          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {isEditing ? (
                <input
                  type="text"
                  value={content.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 bg-transparent border-2 border-dashed rounded-xl p-3 w-full"
                  style={{ 
                    color: theme?.colors?.primary,
                    borderColor: `${theme?.colors?.primary}50`,
                    fontFamily: theme?.fonts?.primary
                  }}
                  placeholder="Enter hero title"
                />
              ) : (
                <h1 
                  className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 leading-tight"
                  style={{ 
                    color: theme?.colors?.primary,
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
                  className="text-lg sm:text-xl lg:text-2xl mb-8 bg-transparent border-2 border-dashed rounded-xl p-4 w-full h-32 resize-none"
                  style={{ 
                    color: theme?.colors?.textSecondary,
                    borderColor: `${theme?.colors?.primary}50`,
                    fontFamily: theme?.fonts?.secondary
                  }}
                  placeholder="Enter subtitle"
                />
              ) : (
                <p 
                  className="text-lg sm:text-xl lg:text-2xl mb-8 leading-relaxed max-w-2xl"
                  style={{ 
                    color: theme?.colors?.textSecondary,
                    fontFamily: theme?.fonts?.secondary
                  }}
                >
                  {content.subtitle}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={content.buttonText}
                        onChange={(e) => handleChange('buttonText', e.target.value)}
                        className="px-8 py-4 rounded-2xl font-semibold border-2 border-dashed"
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
                        className="px-4 py-2 border rounded-lg w-full"
                        style={{ 
                          borderColor: theme?.colors?.border,
                          fontFamily: theme?.fonts?.secondary
                        }}
                        placeholder="Button link"
                      />
                    </div>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={content.secondaryButtonText || 'Watch Demo'}
                        onChange={(e) => handleChange('secondaryButtonText', e.target.value)}
                        className="px-8 py-4 rounded-2xl font-semibold border-2"
                        style={{ 
                          color: theme?.colors?.primary,
                          borderColor: theme?.colors?.primary,
                          backgroundColor: 'transparent',
                          fontFamily: theme?.fonts?.accent
                        }}
                        placeholder="Secondary button text"
                      />
                      <input
                        type="text"
                        value={content.secondaryButtonLink || '#video'}
                        onChange={(e) => handleChange('secondaryButtonLink', e.target.value)}
                        className="px-4 py-2 border rounded-lg w-full"
                        style={{ 
                          borderColor: theme?.colors?.border,
                          fontFamily: theme?.fonts?.secondary
                        }}
                        placeholder="Secondary button link"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <motion.a
                      href={content.buttonLink}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-semibold text-lg transition-all duration-300"
                      style={{ 
                        background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                        boxShadow: theme?.shadows?.lg,
                        fontFamily: theme?.fonts?.accent
                      }}
                    >
                      {content.buttonText}
                      <ArrowRight className="w-5 h-5" />
                    </motion.a>
                    
                    <motion.a
                      href={content.secondaryButtonLink || '#video'}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg border-2 transition-all duration-300"
                      style={{ 
                        color: theme?.colors?.primary,
                        borderColor: theme?.colors?.primary,
                        backgroundColor: 'transparent',
                        fontFamily: theme?.fonts?.accent
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = theme?.colors?.primary || '';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = theme?.colors?.primary || '';
                      }}
                    >
                      <Play className="w-5 h-5" />
                      {content.secondaryButtonText || 'Watch Demo'}
                    </motion.a>
                  </>
                )}
              </div>

              {/* Features List */}
              {content.features && content.features.length > 0 && (
                <div className="mt-8">
                  {isEditing ? (
                    <div className="space-y-2">
                      {content.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div 
                            className="w-5 h-5 rounded-full flex items-center justify-center"
                            style={{ 
                              backgroundColor: `${theme?.colors?.success}20`,
                              color: theme?.colors?.success
                            }}
                          >
                            <Check className="w-3 h-3" />
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
                            <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.2 }}>
                              <ArrowRight className="w-4 h-4" />
                            </motion.div>
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
                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-8">
                      {content.features.map((feature, index) => (
                        <div 
                          key={index}
                          className="flex items-center gap-2 px-4 py-2 rounded-full"
                          style={{ 
                            backgroundColor: `${theme?.colors?.primary}15`,
                            color: theme?.colors?.text,
                            fontFamily: theme?.fonts?.secondary
                          }}
                        >
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: theme?.colors?.primary }}
                          ></div>
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
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
                  <img
                    src={content.image}
                    alt="Hero"
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-3xl"
                    style={{ boxShadow: theme?.shadows?.xl }}
                  />
                  
                  {/* Floating Elements */}
                  <div 
                    className="absolute -top-6 -left-6 w-20 h-20 sm:w-28 sm:h-28 rounded-3xl opacity-20"
                    style={{ 
                      background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})` 
                    }}
                  ></div>
                  <div 
                    className="absolute -bottom-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl opacity-30"
                    style={{ 
                      background: `linear-gradient(135deg, ${theme?.colors?.accent}, ${theme?.colors?.primary})` 
                    }}
                  ></div>
                  
                  {/* Floating Badge */}
                  <div 
                    className="absolute top-6 right-6 px-4 py-2 rounded-2xl text-white font-semibold text-sm backdrop-blur-sm"
                    style={{ 
                      backgroundColor: `${theme?.colors?.primary}90`,
                      fontFamily: theme?.fonts?.accent
                    }}
                  >
                    ✨ New Release
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown 
          className="w-6 h-6" 
          style={{ color: theme?.colors?.textSecondary }}
        />
      </motion.div>
    </section>
  );

  // Hero Centered Layout
  const renderCenteredHero = () => (
    <section 
      className="relative min-h-screen flex items-center justify-center text-center bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: content.backgroundImage ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${content.backgroundImage})` : `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-white opacity-80" />
          </div>

          {isEditing ? (
            <>
              <input
                type="text"
                value={content.backgroundImage || ''}
                onChange={(e) => handleChange('backgroundImage', e.target.value)}
                className="w-full mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70"
                placeholder="Background Image URL"
              />
              <input
                type="text"
                value={content.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 bg-transparent border-2 border-dashed border-white/50 rounded-xl p-3 w-full text-white placeholder-white/70"
                style={{ fontFamily: theme?.fonts?.primary }}
                placeholder="Enter hero title"
              />
              <textarea
                value={content.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="text-lg sm:text-xl lg:text-2xl mb-8 bg-transparent border-2 border-dashed border-white/50 rounded-xl p-4 w-full h-32 resize-none text-white placeholder-white/70"
                style={{ fontFamily: theme?.fonts?.secondary }}
                placeholder="Enter subtitle"
              />
              <div className="space-y-2">
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
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 w-full"
                  placeholder="Button link"
                />
              </div>
            </>
          ) : (
            <>
              <h1 
                className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 leading-tight"
                style={{ fontFamily: theme?.fonts?.primary }}
              >
                {content.title}
              </h1>
              <p 
                className="text-lg sm:text-xl lg:text-2xl mb-8 leading-relaxed max-w-2xl mx-auto"
                style={{ fontFamily: theme?.fonts?.secondary }}
              >
                {content.subtitle}
              </p>
              <motion.a
                href={content.buttonLink}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-2xl font-semibold text-lg transition-all duration-300"
                style={{ 
                  boxShadow: theme?.shadows?.xl,
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

  // Hero Gradient
  const renderGradientHero = () => (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
        fontFamily: theme?.fonts?.primary
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        ></motion.div>
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, 100, 0],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl"
        ></motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {isEditing ? (
              <input
                type="text"
                value={content.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 bg-transparent border-2 border-dashed border-white/50 rounded-xl p-3 w-full text-center text-white placeholder-white/70"
                style={{ fontFamily: theme?.fonts?.primary }}
                placeholder="Enter hero title"
              />
            ) : (
              <h1 
                className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white"
                style={{ fontFamily: theme?.fonts?.primary }}
              >
                {content.title.split(' ').map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="inline-block mr-3"
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
            )}

            {isEditing ? (
              <textarea
                value={content.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="text-lg sm:text-xl lg:text-2xl mb-8 bg-transparent border-2 border-dashed border-white/50 rounded-xl p-4 w-full h-32 resize-none text-white placeholder-white/70"
                style={{ fontFamily: theme?.fonts?.secondary }}
                placeholder="Enter subtitle"
              />
            ) : (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-lg sm:text-xl lg:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto text-white/90"
                style={{ fontFamily: theme?.fonts?.secondary }}
              >
                {content.subtitle}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {isEditing ? (
                <div className="space-y-2">
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
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 w-full"
                    placeholder="Button link"
                  />
                </div>
              ) : (
                <>
                  <motion.a
                    href={content.buttonLink}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-2xl font-semibold text-lg transition-all duration-300"
                    style={{ 
                      boxShadow: theme?.shadows?.xl,
                      fontFamily: theme?.fonts?.accent
                    }}
                  >
                    {content.buttonText}
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </motion.a>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl font-semibold text-lg text-white transition-all duration-300"
                    style={{ fontFamily: theme?.fonts?.accent }}
                  >
                    <Play className="w-5 h-5" />
                    Learn More
                  </motion.button>
                </>
              )}
            </motion.div>
          </motion.div>

          {/* Stats */}
          {content.stats && content.stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {content.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div 
                    className="text-3xl sm:text-4xl font-bold mb-2 text-white"
                    style={{ fontFamily: theme?.fonts?.accent }}
                  >
                    {stat.value}
                  </div>
                  <div 
                    className="text-sm text-white/80"
                    style={{ fontFamily: theme?.fonts?.secondary }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );

  // Hero Animated
  const renderAnimatedHero = () => (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ 
        fontFamily: theme?.fonts?.primary,
        background: `linear-gradient(135deg, ${theme?.colors?.background}, ${theme?.colors?.surface})`
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
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
            className="absolute rounded-full opacity-10"
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              left: `${10 + i * 15}%`,
              top: `${10 + i * 10}%`,
              background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {isEditing ? (
              <input
                type="text"
                value={content.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 bg-transparent border-2 border-dashed rounded-xl p-3 w-full text-center"
                style={{ 
                  color: theme?.colors?.primary,
                  borderColor: `${theme?.colors?.primary}50`,
                  fontFamily: theme?.fonts?.primary
                }}
                placeholder="Enter hero title"
              />
            ) : (
              <h1 
                className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 leading-tight"
                style={{ 
                  color: theme?.colors?.primary,
                  fontFamily: theme?.fonts?.primary
                }}
              >
                {content.title.split(' ').map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="inline-block mr-3"
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
            )}

            {isEditing ? (
              <textarea
                value={content.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="text-lg sm:text-xl lg:text-2xl mb-8 bg-transparent border-2 border-dashed rounded-xl p-4 w-full h-32 resize-none"
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
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-lg sm:text-xl lg:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto"
                style={{ 
                  color: theme?.colors?.textSecondary,
                  fontFamily: theme?.fonts?.secondary
                }}
              >
                {content.subtitle}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={content.buttonText}
                    onChange={(e) => handleChange('buttonText', e.target.value)}
                    className="px-8 py-4 rounded-2xl font-semibold border-2 border-dashed"
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
                    className="px-4 py-2 border rounded-lg w-full"
                    style={{ 
                      borderColor: theme?.colors?.border,
                      fontFamily: theme?.fonts?.secondary
                    }}
                    placeholder="Button link"
                  />
                </div>
              ) : (
                <motion.a
                  href={content.buttonLink}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-semibold text-lg transition-all duration-300"
                  style={{ 
                    background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                    boxShadow: theme?.shadows?.lg,
                    fontFamily: theme?.fonts?.accent
                  }}
                >
                  {content.buttonText}
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </motion.a>
              )}
            </motion.div>
          </motion.div>

          {/* Floating Image */}
          {content.image && !isEditing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-16 relative"
            >
              <motion.img
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                src={content.image}
                alt="Hero"
                className="w-full max-w-4xl mx-auto rounded-3xl"
                style={{ boxShadow: theme?.shadows?.xl }}
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );

  // Initialize default content based on variant
  React.useEffect(() => {
    if (variant === 'hero-gradient' && !content.stats) {
      handleChange('stats', [
        { value: '10K+', label: 'Happy Users' },
        { value: '99%', label: 'Satisfaction' },
        { value: '24/7', label: 'Support' },
        { value: '50+', label: 'Countries' }
      ]);
    } else if (variant === 'hero-split' && !content.features) {
      handleChange('features', [
        'No Credit Card Required',
        'Free 14-day Trial',
        '24/7 Support'
      ]);
    }
    
    // Add secondary button if not present
    if (!content.secondaryButtonText) {
      handleChange('secondaryButtonText', 'Watch Demo');
      handleChange('secondaryButtonLink', '#video');
    }
  }, [variant]);

  switch (variant) {
    case 'hero-centered':
      return renderCenteredHero();
    case 'hero-gradient':
      return renderGradientHero();
    case 'hero-animated':
      return renderAnimatedHero();
    default:
      return renderSplitHero();
  }
};

export default HeroSection;