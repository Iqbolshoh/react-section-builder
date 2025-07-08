import React from 'react';
import { motion } from 'framer-motion';

interface Hero1Props {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  features?: string[];
  customData?: any;
}

const Hero1: React.FC<Hero1Props> = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  image,
  features = [],
  customData
}) => {
  const bgColor = customData?.bgColor || '#f9fafb';
  const textColor = customData?.textColor || '#1f2937';
  const accentColor = customData?.accentColor || '#3b82f6';
  const secondaryColor = customData?.secondaryColor || '#4f46e5';
  
  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ 
        backgroundColor: bgColor,
        color: textColor
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl opacity-20"
          style={{ 
            background: `linear-gradient(135deg, ${accentColor}, ${secondaryColor})` 
          }}
        ></div>
        <div 
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ 
            background: `linear-gradient(135deg, ${secondaryColor}, ${accentColor})` 
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
              <h1 
                className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 leading-tight"
                style={{ color: accentColor }}
              >
                {title}
              </h1>
              <p 
                className="text-lg sm:text-xl lg:text-2xl mb-8 leading-relaxed max-w-2xl"
                style={{ color: textColor }}
              >
                {subtitle}
              </p>

              <motion.a
                href={buttonLink}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-semibold text-lg transition-all duration-300"
                style={{ 
                  background: `linear-gradient(135deg, ${accentColor}, ${secondaryColor})`,
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              >
                {buttonText}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.a>

              {/* Features List */}
              {features.length > 0 && (
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-8">
                  {features.map((feature, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 rounded-full"
                      style={{ 
                        backgroundColor: `${accentColor}15`,
                        color: textColor
                      }}
                    >
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: accentColor }}
                      ></div>
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
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
              <img
                src={image}
                alt="Hero"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-3xl"
                style={{ boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
              />
              
              {/* Floating Elements */}
              <div 
                className="absolute -top-6 -left-6 w-20 h-20 sm:w-28 sm:h-28 rounded-3xl opacity-20"
                style={{ 
                  background: `linear-gradient(135deg, ${accentColor}, ${secondaryColor})` 
                }}
              ></div>
              <div 
                className="absolute -bottom-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl opacity-30"
                style={{ 
                  background: `linear-gradient(135deg, ${secondaryColor}, ${accentColor})` 
                }}
              ></div>
              
              {/* Floating Badge */}
              <div 
                className="absolute top-6 right-6 px-4 py-2 rounded-2xl text-white font-semibold text-sm backdrop-blur-sm"
                style={{ 
                  backgroundColor: `${accentColor}90`
                }}
              >
                ✨ New Release
              </div>
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
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero1;