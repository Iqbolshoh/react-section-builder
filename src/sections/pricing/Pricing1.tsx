import React from 'react';
import { motion } from 'framer-motion';

interface Plan {
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  buttonText?: string;
  buttonLink?: string;
}

interface Pricing1Props {
  title: string;
  subtitle?: string;
  plans: Plan[];
  customData?: any;
}

const Pricing1: React.FC<Pricing1Props> = ({
  title,
  subtitle,
  plans,
  customData
}) => {
  const bgColor = customData?.bgColor || '#ffffff';
  const textColor = customData?.textColor || '#1f2937';
  const accentColor = customData?.accentColor || '#3b82f6';
  const secondaryTextColor = customData?.secondaryTextColor || '#6b7280';
  const borderColor = customData?.borderColor || '#e5e7eb';
  
  return (
    <section 
      className="py-20"
      style={{ 
        backgroundColor: bgColor,
        color: textColor
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-xl p-8 transition-shadow duration-300 relative border-2 ${
                plan.isPopular ? 'scale-105 z-10' : ''
              }`}
              style={{
                backgroundColor: bgColor,
                borderColor: plan.isPopular ? accentColor : borderColor,
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              {plan.isPopular && (
                <div 
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-white px-4 py-1 rounded-full text-sm font-semibold"
                  style={{ backgroundColor: accentColor }}
                >
                  Popular
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 
                  className="text-2xl font-bold mb-4"
                  style={{ color: textColor }}
                >
                  {plan.name}
                </h3>
                <div 
                  className="text-4xl font-bold mb-2"
                  style={{ color: accentColor }}
                >
                  {plan.price}
                </div>
                <p 
                  style={{ color: secondaryTextColor }}
                >
                  per month
                </p>
              </div>
              
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${accentColor}20` }}
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: accentColor }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span style={{ color: textColor }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
              
              <a
                href={plan.buttonLink || '#'}
                className="w-full py-3 px-6 rounded-lg font-semibold transition-colors text-center block"
                style={{
                  backgroundColor: plan.isPopular ? accentColor : `${accentColor}15`,
                  color: plan.isPopular ? '#ffffff' : accentColor
                }}
                onMouseEnter={(e) => {
                  if (!plan.isPopular) {
                    e.currentTarget.style.backgroundColor = accentColor;
                    e.currentTarget.style.color = '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!plan.isPopular) {
                    e.currentTarget.style.backgroundColor = `${accentColor}15`;
                    e.currentTarget.style.color = accentColor;
                  }
                }}
              >
                {plan.buttonText || 'Get Started'}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing1;