import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Plan {
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: string[];
  isPopular?: boolean;
  buttonText?: string;
  buttonLink?: string;
}

interface Pricing2Props {
  title: string;
  subtitle?: string;
  plans: Plan[];
  customData?: any;
}

const Pricing2: React.FC<Pricing2Props> = ({
  title,
  subtitle,
  plans,
  customData
}) => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  
  const bgColor = customData?.bgColor || '#f9fafb';
  const textColor = customData?.textColor || '#1f2937';
  const accentColor = customData?.accentColor || '#3b82f6';
  const secondaryTextColor = customData?.secondaryTextColor || '#6b7280';
  const surfaceColor = customData?.surfaceColor || '#ffffff';
  
  return (
    <section 
      className="py-20"
      style={{ 
        backgroundColor: bgColor,
        color: textColor
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
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

        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-12">
          <div 
            className="flex items-center p-1 rounded-full"
            style={{ backgroundColor: `${accentColor}15` }}
          >
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingPeriod === 'monthly' ? 'text-white' : ''
              }`}
              style={{
                backgroundColor: billingPeriod === 'monthly' ? accentColor : 'transparent',
                color: billingPeriod === 'monthly' ? 'white' : textColor
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingPeriod === 'yearly' ? 'text-white' : ''
              }`}
              style={{
                backgroundColor: billingPeriod === 'yearly' ? accentColor : 'transparent',
                color: billingPeriod === 'yearly' ? 'white' : textColor
              }}
            >
              Yearly
              <span 
                className="ml-1 px-2 py-0.5 text-xs rounded-full"
                style={{ 
                  backgroundColor: billingPeriod === 'yearly' ? 'white' : accentColor,
                  color: billingPeriod === 'yearly' ? accentColor : 'white'
                }}
              >
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-xl p-8 transition-shadow duration-300 relative ${
                plan.isPopular ? 'md:-mt-8 md:mb-8' : ''
              }`}
              style={{
                backgroundColor: surfaceColor,
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                border: plan.isPopular ? `2px solid ${accentColor}` : `1px solid #e5e7eb`
              }}
            >
              {plan.isPopular && (
                <div 
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-white px-4 py-1 rounded-full text-sm font-semibold"
                  style={{ backgroundColor: accentColor }}
                >
                  Most Popular
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
                  {billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                </div>
                <p 
                  style={{ color: secondaryTextColor }}
                >
                  per {billingPeriod === 'monthly' ? 'month' : 'year'}
                </p>
              </div>
              
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: accentColor }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
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
                  backgroundColor: plan.isPopular ? accentColor : 'transparent',
                  color: plan.isPopular ? '#ffffff' : accentColor,
                  border: `2px solid ${accentColor}`
                }}
                onMouseEnter={(e) => {
                  if (!plan.isPopular) {
                    e.currentTarget.style.backgroundColor = accentColor;
                    e.currentTarget.style.color = '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!plan.isPopular) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = accentColor;
                  }
                }}
              >
                {plan.buttonText || 'Get Started'}
              </a>
              
              {plan.isPopular && (
                <div className="text-center mt-4">
                  <span 
                    className="text-sm"
                    style={{ color: secondaryTextColor }}
                  >
                    30-day money-back guarantee
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        <div 
          className="mt-12 p-6 rounded-xl text-center max-w-3xl mx-auto"
          style={{ backgroundColor: `${accentColor}10` }}
        >
          <p 
            className="text-lg font-medium mb-2"
            style={{ color: textColor }}
          >
            Need a custom plan for your enterprise?
          </p>
          <p 
            className="mb-4"
            style={{ color: secondaryTextColor }}
          >
            Contact our sales team for a tailored solution to meet your specific requirements.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors"
            style={{
              backgroundColor: accentColor,
              color: '#ffffff'
            }}
          >
            Contact Sales
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing2;