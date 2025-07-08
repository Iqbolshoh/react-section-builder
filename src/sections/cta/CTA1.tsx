import React from 'react';
import { motion } from 'framer-motion';

interface CTA1Props {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage?: string;
  customData?: any;
}

const CTA1: React.FC<CTA1Props> = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  backgroundImage,
  customData
}) => {
  const accentColor = customData?.accentColor || '#3b82f6';
  const secondaryColor = customData?.secondaryColor || '#4f46e5';
  const overlayOpacity = customData?.overlayOpacity || 0.7;
  
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
      className="py-12 sm:py-20"
      style={backgroundStyle}
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
            style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>

          <h2 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4"
          >
            {title}
          </h2>
          <p 
            className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            {subtitle}
          </p>
          <motion.a
            href={buttonLink}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
            style={{ 
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}
          >
            {buttonText}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA1;