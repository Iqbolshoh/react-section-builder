import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Stat {
  number: string;
  label: string;
  suffix?: string;
  icon?: string;
}

interface Stats1Props {
  title: string;
  subtitle?: string;
  stats: Stat[];
  customData?: any;
}

const Stats1: React.FC<Stats1Props> = ({
  title,
  subtitle,
  stats,
  customData
}) => {
  const [animatedNumbers, setAnimatedNumbers] = useState<{ [key: number]: number }>({});
  
  const bgColor = customData?.bgColor || '#f9fafb';
  const textColor = customData?.textColor || '#1f2937';
  const accentColor = customData?.accentColor || '#3b82f6';
  const secondaryTextColor = customData?.secondaryTextColor || '#6b7280';
  const surfaceColor = customData?.surfaceColor || '#ffffff';
  
  // Animate numbers when component comes into view
  useEffect(() => {
    stats.forEach((stat, index) => {
      const targetNumber = parseInt(stat.number.replace(/\D/g, ''));
      if (!isNaN(targetNumber)) {
        let current = 0;
        const increment = targetNumber / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= targetNumber) {
            current = targetNumber;
            clearInterval(timer);
          }
          setAnimatedNumbers(prev => ({ ...prev, [index]: Math.floor(current) }));
        }, 30);
      }
    });
  }, [stats]);

  const getIcon = (iconName: string) => {
    // This is a simplified approach - in a real implementation, you would use a proper icon library
    return (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    );
  };

  return (
    <section 
      className="py-12 sm:py-20"
      style={{ 
        background: `linear-gradient(135deg, ${accentColor}10, ${accentColor}10)`,
        backgroundColor: bgColor,
        color: textColor
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-xl transition-shadow duration-300"
              style={{
                backgroundColor: surfaceColor,
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div 
                className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)` }}
              >
                {getIcon(stat.icon || '')}
              </div>
              
              <div 
                className="text-3xl sm:text-4xl font-bold mb-2"
                style={{ color: accentColor }}
              >
                {animatedNumbers[index] || stat.number}{stat.suffix}
              </div>
              <div 
                className="font-medium"
                style={{ color: secondaryTextColor }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats1;