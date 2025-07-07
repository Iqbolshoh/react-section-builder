import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, X } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

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

interface FAQSectionProps {
  content: {
    title: string;
    subtitle?: string;
    faqs: FAQ[];
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
  variant?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({ 
  content, 
  isEditing, 
  onChange, 
  theme,
  variant = 'faq-accordion'
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleChange = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const handleFAQChange = (index: number, field: string, value: string) => {
    const updatedFAQs = [...content.faqs];
    updatedFAQs[index] = { ...updatedFAQs[index], [field]: value };
    handleChange('faqs', updatedFAQs);
  };

  const addFAQ = () => {
    const newFAQ: FAQ = {
      question: 'New Question',
      answer: 'Answer to the question'
    };
    handleChange('faqs', [...content.faqs, newFAQ]);
  };

  const removeFAQ = (index: number) => {
    const updatedFAQs = content.faqs.filter((_, i) => i !== index);
    handleChange('faqs', updatedFAQs);
    if (openIndex === index) {
      setOpenIndex(null);
    }
  };

  return (
    <section 
      className="py-12 sm:py-20" 
      style={{ 
        backgroundColor: theme?.colors?.surface || '#ffffff',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-16">
          {isEditing ? (
            <>
              <input
                type="text"
                value={content.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-transparent border-2 border-dashed rounded-lg p-2 text-center w-full max-w-2xl mx-auto"
                style={{ 
                  color: theme?.colors?.primary,
                  borderColor: `${theme?.colors?.primary}50`,
                  fontFamily: theme?.fonts?.primary
                }}
                placeholder="Enter section title"
              />
              <input
                type="text"
                value={content.subtitle || ''}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="text-lg sm:text-xl bg-transparent border-2 border-dashed rounded-lg p-2 text-center w-full max-w-3xl mx-auto"
                style={{ 
                  color: theme?.colors?.textSecondary,
                  borderColor: `${theme?.colors?.primary}50`,
                  fontFamily: theme?.fonts?.secondary
                }}
                placeholder="Enter subtitle (optional)"
              />
            </>
          ) : (
            <>
              <h2 
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" 
                style={{ 
                  color: theme?.colors?.primary,
                  fontFamily: theme?.fonts?.primary
                }}
              >
                {content.title}
              </h2>
              {content.subtitle && (
                <p 
                  className="text-lg sm:text-xl max-w-3xl mx-auto"
                  style={{ 
                    color: theme?.colors?.textSecondary,
                    fontFamily: theme?.fonts?.secondary
                  }}
                >
                  {content.subtitle}
                </p>
              )}
            </>
          )}
        </div>

        <div className="space-y-4">
          {content.faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden relative group"
              style={{ 
                backgroundColor: theme?.colors?.background || '#f9fafb',
                boxShadow: theme?.shadows?.sm
              }}
            >
              {isEditing && (
                <button
                  onClick={() => removeFAQ(index)}
                  className="absolute top-4 right-4 z-10 w-6 h-6 text-white rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: theme?.colors?.error }}
                >
                  ×
                </button>
              )}

              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between transition-colors"
                style={{ 
                  backgroundColor: 'transparent',
                  fontFamily: theme?.fonts?.primary
                }}
                onMouseEnter={(e) => {
                  if (!isEditing) {
                    e.currentTarget.style.backgroundColor = `${theme?.colors?.primary}10` || '#f3f4f6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isEditing) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
                disabled={isEditing}
              >
                <div className="flex-1 pr-4">
                  {isEditing ? (
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
                      className="text-lg font-semibold bg-transparent border-2 border-dashed rounded-lg p-2 w-full"
                      style={{ 
                        color: theme?.colors?.text,
                        borderColor: `${theme?.colors?.primary}50`,
                        fontFamily: theme?.fonts?.primary
                      }}
                      placeholder="Enter question"
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <h3 
                      className="text-lg font-semibold"
                      style={{ 
                        color: theme?.colors?.text,
                        fontFamily: theme?.fonts?.primary
                      }}
                    >
                      {faq.question}
                    </h3>
                  )}
                </div>
                {!isEditing && (
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown 
                      className="w-5 h-5" 
                      style={{ color: theme?.colors?.textSecondary }}
                    />
                  </motion.div>
                )}
              </button>

              <AnimatePresence>
                {(openIndex === index || isEditing) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      {isEditing ? (
                        <textarea
                          value={faq.answer}
                          onChange={(e) => handleFAQChange(index, 'answer', e.target.value)}
                          className="leading-relaxed bg-transparent border-2 border-dashed rounded-lg p-2 w-full h-24 resize-none"
                          style={{ 
                            color: theme?.colors?.textSecondary,
                            borderColor: `${theme?.colors?.primary}50`,
                            fontFamily: theme?.fonts?.secondary
                          }}
                          placeholder="Enter answer"
                        />
                      ) : (
                        <p 
                          className="leading-relaxed"
                          style={{ 
                            color: theme?.colors?.textSecondary,
                            fontFamily: theme?.fonts?.secondary
                          }}
                        >
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {isEditing && (
            <motion.button
              onClick={addFAQ}
              className="w-full border-2 border-dashed rounded-xl p-6 transition-all duration-200 flex items-center justify-center"
              style={{ 
                borderColor: theme?.colors?.border,
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = theme?.colors?.primary || '#3b82f6';
                e.currentTarget.style.backgroundColor = `${theme?.colors?.primary}10` || '#dbeafe';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme?.colors?.border || '#d1d5db';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <Plus className="w-6 h-6 mx-auto mb-2" style={{ color: theme?.colors?.textSecondary }} />
                <span style={{ color: theme?.colors?.textSecondary }}>Add FAQ</span>
              </div>
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;