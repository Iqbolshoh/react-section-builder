import React from 'react';
import { motion } from 'framer-motion';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface Timeline2Props {
  title: string;
  subtitle?: string;
  items: TimelineItem[];
  customData?: any;
}

const Timeline2: React.FC<Timeline2Props> = ({
  title,
  subtitle,
  items,
  customData
}) => {
  const bgColor = customData?.bgColor || '#f9fafb';
  const textColor = customData?.textColor || '#1f2937';
  const accentColor = customData?.accentColor || '#3b82f6';
  const secondaryTextColor = customData?.secondaryTextColor || '#6b7280';
  const surfaceColor = customData?.surfaceColor || '#ffffff';
  
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

        <div className="space-y-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl p-6 transition-shadow duration-300 relative"
              style={{ 
                backgroundColor: surfaceColor,
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div 
                  className="flex-shrink-0 w-24 h-24 rounded-2xl flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`,
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div 
                    className="text-2xl font-bold text-white"
                  >
                    {item.year}
                  </div>
                </div>
                
                <div className="flex-1">
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
    </section>
  );
};

export default Timeline2;