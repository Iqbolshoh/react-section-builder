import React from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  content: {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
    image: string;
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: any;
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
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center overflow-hidden" style={{ fontFamily: theme?.fontFamily }}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-purple-100/20"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
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
                  className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 lg:mb-6 bg-transparent border-2 border-dashed border-blue-300 rounded-lg p-2 w-full"
                  placeholder="Enter hero title"
                />
              ) : (
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight" style={{ color: theme?.primaryColor }}>
                  {content.title}
                </h1>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {isEditing ? (
                <textarea
                  value={content.subtitle}
                  onChange={(e) => handleChange('subtitle', e.target.value)}
                  className="text-lg sm:text-xl text-gray-600 mb-6 lg:mb-8 bg-transparent border-2 border-dashed border-blue-300 rounded-lg p-2 w-full h-20 sm:h-24 resize-none"
                  placeholder="Enter subtitle"
                />
              ) : (
                <p className="text-lg sm:text-xl text-gray-600 mb-6 lg:mb-8 leading-relaxed">
                  {content.subtitle}
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {isEditing ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    value={content.buttonText}
                    onChange={(e) => handleChange('buttonText', e.target.value)}
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-base sm:text-lg border-2 border-dashed border-blue-300"
                    placeholder="Button text"
                  />
                  <input
                    type="text"
                    value={content.buttonLink}
                    onChange={(e) => handleChange('buttonLink', e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Button link"
                  />
                </div>
              ) : (
                <a
                  href={content.buttonLink}
                  className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-base sm:text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: theme?.primaryColor }}
                >
                  {content.buttonText}
                </a>
              )}
            </motion.div>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {isEditing ? (
                <div className="relative">
                  <img
                    src={content.image}
                    alt="Hero"
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-2xl"
                  />
                  <input
                    type="url"
                    value={content.image}
                    onChange={(e) => handleChange('image', e.target.value)}
                    className="absolute bottom-4 left-4 right-4 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                    placeholder="Image URL"
                  />
                </div>
              ) : (
                <img
                  src={content.image}
                  alt="Hero"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-2xl"
                />
              )}
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20"></div>
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-30"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderCenteredHero = () => (
    <section 
      className="relative min-h-screen flex items-center justify-center text-center bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${content.image})`,
        fontFamily: theme?.fontFamily 
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
                placeholder="Enter hero title"
              />
              <textarea
                value={content.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="text-lg sm:text-xl mb-8 bg-transparent border-2 border-dashed border-white/50 rounded-lg p-2 w-full h-24 resize-none text-white placeholder-white/70"
                placeholder="Enter subtitle"
              />
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input
                  type="text"
                  value={content.buttonText}
                  onChange={(e) => handleChange('buttonText', e.target.value)}
                  className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg border-2 border-dashed border-white/50"
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
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
                {content.title}
              </h1>
              <p className="text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl mx-auto">
                {content.subtitle}
              </p>
              <a
                href={content.buttonLink}
                className="inline-block px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {content.buttonText}
              </a>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );

  const renderVideoHero = () => (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ fontFamily: theme?.fontFamily }}>
      {/* Video Background Placeholder */}
      <div className="absolute inset-0">
        <img
          src={content.image}
          alt="Video Background"
          className="w-full h-full object-cover"
        />
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
                type="url"
                value={content.image}
                onChange={(e) => handleChange('image', e.target.value)}
                className="w-full mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70"
                placeholder="Video/Background Image URL"
              />
              <input
                type="text"
                value={content.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 bg-transparent border-2 border-dashed border-white/50 rounded-lg p-2 w-full text-white placeholder-white/70"
                placeholder="Enter hero title"
              />
              <textarea
                value={content.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="text-lg sm:text-xl mb-8 bg-transparent border-2 border-dashed border-white/50 rounded-lg p-2 w-full h-24 resize-none text-white placeholder-white/70"
                placeholder="Enter subtitle"
              />
              <input
                type="text"
                value={content.buttonText}
                onChange={(e) => handleChange('buttonText', e.target.value)}
                className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg border-2 border-dashed border-white/50"
                placeholder="Button text"
              />
            </>
          ) : (
            <>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
                {content.title}
              </h1>
              <p className="text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl mx-auto">
                {content.subtitle}
              </p>
              <a
                href={content.buttonLink}
                className="inline-block px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {content.buttonText}
              </a>
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
    default:
      return renderSplitHero();
  }
};

export default HeroSection;