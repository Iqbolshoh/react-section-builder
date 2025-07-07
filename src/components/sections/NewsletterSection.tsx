import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Check } from 'lucide-react';

interface ThemeConfig {
  fonts: {
    primary: string;
    secondary: string;
    accent: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

interface NewsletterSectionProps {
  content: {
    title: string;
    subtitle: string;
    placeholder: string;
    buttonText: string;
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
  variant?: string;
}

const NewsletterSection: React.FC<NewsletterSectionProps> = ({ 
  content, 
  isEditing, 
  onChange, 
  theme,
  variant = 'newsletter-centered'
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    onChange({ ...content, [field]: value });
  };

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
        background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
        fontFamily: theme?.fonts?.primary
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
            style={{ boxShadow: theme?.shadows?.md }}
          >
            <Mail className="w-8 h-8 text-white" />
          </div>

          {isEditing ? (
            <>
              <input
                type="text"
                value={content.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 bg-transparent border-2 border-dashed border-white/50 rounded-lg p-2 text-center w-full max-w-2xl mx-auto placeholder-white/70"
                style={{ fontFamily: theme?.fonts?.primary }}
                placeholder="Enter newsletter title"
              />
              <textarea
                value={content.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="text-lg sm:text-xl text-white/90 mb-8 bg-transparent border-2 border-dashed border-white/50 rounded-lg p-2 w-full max-w-3xl mx-auto h-24 resize-none placeholder-white/70"
                style={{ fontFamily: theme?.fonts?.secondary }}
                placeholder="Enter newsletter description"
              />
            </>
          ) : (
            <>
              <h2 
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: theme?.fonts?.primary }}
              >
                {content.title}
              </h2>
              <p 
                className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
                style={{ fontFamily: theme?.fonts?.secondary }}
              >
                {content.subtitle}
              </p>
            </>
          )}

          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-green-500 text-white px-8 py-4 rounded-xl inline-flex items-center gap-3 text-lg font-semibold"
              style={{ 
                backgroundColor: theme?.colors?.success,
                boxShadow: theme?.shadows?.lg,
                fontFamily: theme?.fonts?.accent
              }}
            >
              <Check className="w-6 h-6" />
              Thank you for subscribing!
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={content.placeholder}
                      onChange={(e) => handleChange('placeholder', e.target.value)}
                      className="flex-1 px-6 py-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 border-2 border-dashed border-white/50"
                      style={{ fontFamily: theme?.fonts?.secondary }}
                      placeholder="Email placeholder text"
                    />
                    <input
                      type="text"
                      value={content.buttonText}
                      onChange={(e) => handleChange('buttonText', e.target.value)}
                      className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold border-2 border-dashed border-white/50"
                      style={{ fontFamily: theme?.fonts?.accent }}
                      placeholder="Button text"
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={content.placeholder}
                      required
                      className="flex-1 px-6 py-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                      style={{ fontFamily: theme?.fonts?.secondary }}
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                      style={{ 
                        boxShadow: theme?.shadows?.lg,
                        fontFamily: theme?.fonts?.accent
                      }}
                    >
                      <Send className="w-5 h-5" />
                      {content.buttonText}
                    </motion.button>
                  </>
                )}
              </div>
              
              {!isEditing && (
                <p 
                  className="text-white/70 text-sm mt-4"
                  style={{ fontFamily: theme?.fonts?.secondary }}
                >
                  No spam, unsubscribe at any time
                </p>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;