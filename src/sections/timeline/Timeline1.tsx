import React from 'react';
import { motion } from 'framer-motion';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface Timeline1Props {
  title: string;
  subtitle?: string;
  items: TimelineItem[];
  customData?: any;
}

const Timeline1: React.FC<Timeline1Props> = ({
  title,
  subtitle,
  items,
  customData
}) => {
  const bgColor = customData?.bgColor || '#ffffff';
  const textColor = customData?.textColor || '#1f2937';
  const accentColor = customData?.accentColor || '#3b82f6';
  const secondaryTextColor = customData?.secondaryTextColor || '#6b7280';
  const timelineColor = customData?.timelineColor || `${accentColor}30`;
  
  return (
    <section 
      className="py-12 sm:py-20"
      style={{ 
        backgroundColor: bgColor,
        color: textColor
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: accentColor }}
            >
              {title}
            </h2>
            {subtitle && (
              <p 
                className="text-lg sm:text-xl max-w-3xl mx-auto"
                style={{ color: secondaryTextColor }}
              >
                {subtitle}
              </p>
            )}
          </motion.div>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 hidden md:block"
            style={{ backgroundColor: timelineColor }}
          ></div>

          <div className="space-y-12">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex flex-col md:flex-row items-center">
                  {/* Left Side (even index) */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:hidden'}`}>
                    <div 
                      className="text-2xl font-bold mb-2"
                      style={{ color: accentColor }}
                    >
                      {item.year}
                    </div>
                    <h3 
                      className="text-xl font-semibold mb-3"
                      style={{ color: textColor }}
                    >
                      {item.title}
                    </h3>
                    <p 
                      className="leading-relaxed"
                      style={{ color: secondaryTextColor }}
                    >
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Center Dot */}
                  <div className="md:w-0 flex justify-center my-4 md:my-0">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center z-10"
                      style={{ 
                        background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`,
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Right Side (odd index) */}
                  <div className={`md:w-1/2 ${index % 2 === 1 ? 'md:pl-12' : 'md:hidden'}`}>
                    <div 
                      className="text-2xl font-bold mb-2"
                      style={{ color: accentColor }}
                    >
                      {item.year}
                    </div>
                    <h3 
                      className="text-xl font-semibold mb-3"
                      style={{ color: textColor }}
                    >
                      {item.title}
                    </h3>
                    <p 
                      className="leading-relaxed"
                      style={{ color: secondaryTextColor }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline1;