import React from 'react';
import { motion } from 'framer-motion';

interface About1Props {
  title: string;
  description: string;
  image: string;
  stats?: { label: string; value: string }[];
  customData?: any;
}

const About1: React.FC<About1Props> = ({
  title,
  description,
  image,
  stats,
  customData
}) => {
  const bgColor = customData?.bgColor || '#ffffff';
  const textColor = customData?.textColor || '#1f2937';
  const accentColor = customData?.accentColor || '#3b82f6';
  const secondaryTextColor = customData?.secondaryTextColor || '#6b7280';
  
  return (
    <section 
      className="py-12 sm:py-20"
      style={{ 
        backgroundColor: bgColor,
        color: textColor
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src={image}
                alt="About"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-3xl"
                style={{ boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
              />
              
              {/* Decorative elements */}
              <div 
                className="absolute -top-6 -left-6 w-20 h-20 sm:w-28 sm:h-28 rounded-3xl opacity-20"
                style={{ 
                  background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)` 
                }}
              ></div>
              <div 
                className="absolute -bottom-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl opacity-30"
                style={{ 
                  background: `linear-gradient(135deg, ${accentColor}dd, ${accentColor})` 
                }}
              ></div>
              
              {/* Floating badge */}
              <div 
                className="absolute top-6 right-6 px-4 py-2 rounded-2xl text-white font-semibold text-sm backdrop-blur-sm"
                style={{ 
                  backgroundColor: `${accentColor}90`
                }}
              >
                Our Story
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6"
                style={{ color: accentColor }}
              >
                {title}
              </h2>
              <p 
                className="text-lg sm:text-xl mb-8 leading-relaxed"
                style={{ color: secondaryTextColor }}
              >
                {description}
              </p>

              {/* Stats */}
              {stats && stats.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 lg:mt-8"
                >
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div 
                        className="text-2xl sm:text-3xl font-bold mb-2"
                        style={{ color: accentColor }}
                      >
                        {stat.value}
                      </div>
                      <div 
                        className="text-sm sm:text-base"
                        style={{ color: secondaryTextColor }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* CTA Button */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-semibold text-lg transition-all duration-300 mt-8"
                style={{ 
                  background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`,
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              >
                Learn More About Us
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About1;