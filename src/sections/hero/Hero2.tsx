import React from 'react';
import { motion } from 'framer-motion';

interface Hero2Props {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage?: string;
  customData?: any;
}

const Hero2: React.FC<Hero2Props> = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  backgroundImage,
  customData
}) => {
  const accentColor = customData?.accentColor || '#3b82f6';
  const secondaryColor = customData?.secondaryColor || '#4f46e5';
  const overlayOpacity = customData?.overlayOpacity || 0.5;
  
  const backgroundStyle = backgroundImage 
    ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, ${overlayOpacity}), rgba(0, 0, 0, ${overlayOpacity})), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }
    : {
        background: `linear-gradient(135deg, ${accentColor}, ${secondaryColor})`
      };
  
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center text-center"
      style={backgroundStyle}
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6">
            <svg className="w-12 h-12 mx-auto mb-4 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>

          <h1 
            className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            {title}
          </h1>
          <p 
            className="text-lg sm:text-xl lg:text-2xl mb-8 leading-relaxed max-w-2xl mx-auto"
          >
            {subtitle}
          </p>
          <motion.a
            href={buttonLink}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-2xl font-semibold text-lg transition-all duration-300"
            style={{ 
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
          >
            {buttonText}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-10"
            style={{
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0.1, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero2;