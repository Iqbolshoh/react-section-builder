import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Newsletter1Props {
  title: string;
  subtitle: string;
  placeholder: string;
  buttonText: string;
  privacyText?: string;
  customData?: any;
}

const Newsletter1: React.FC<Newsletter1Props> = ({
  title,
  subtitle,
  placeholder,
  buttonText,
  privacyText = "No spam, unsubscribe at any time",
  customData
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const accentColor = customData?.accentColor || '#3b82f6';
  const secondaryColor = customData?.secondaryColor || '#4f46e5';
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section 
      className="py-12 sm:py-20"
      style={{ 
        background: `linear-gradient(135deg, ${accentColor}, ${secondaryColor})`
      }}
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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

          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-green-500 text-white px-8 py-4 rounded-xl inline-flex items-center gap-3 text-lg font-semibold"
              style={{ 
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Thank you for subscribing!
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholder}
                  required
                  className="flex-1 px-6 py-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                  style={{ 
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  {buttonText}
                </motion.button>
              </div>
              
              <p 
                className="text-white/70 text-sm mt-4"
              >
                {privacyText}
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter1;