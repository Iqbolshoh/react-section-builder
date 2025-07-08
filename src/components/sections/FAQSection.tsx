import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
    primary100: string;
    primary200: string;
    primary300: string;
    secondary100: string;
    secondary200: string;
    accent100: string;
    accent200: string;
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
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

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
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Accordion Layout
  const renderAccordionFAQ = () => (
    <section 
      className="py-12 sm:py-20" 
      style={{ 
        backgroundColor: theme?.colors?.surface || '#ffffff',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={content.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="text-3xl sm:text-4xl font-bold mb-4 bg-transparent border-2 border-dashed rounded-lg p-2 text-center w-full max-w-2xl mx-auto"
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
                  className="text-3xl sm:text-4xl font-bold mb-4"
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
          </motion.div>
        </div>

        <div className="space-y-4">
          {content.faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden relative group"
              style={{ 
                backgroundColor: theme?.colors?.background,
                boxShadow: theme?.shadows?.md
              }}
            >
              {isEditing && (
                <button
                  onClick={() => removeFAQ(index)}
                  className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ 
                    backgroundColor: theme?.colors?.error,
                    color: '#ffffff'
                  }}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              
              {isEditing ? (
                <div className="p-6">
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
                    className="text-lg font-semibold mb-4 bg-transparent border-2 border-dashed rounded-lg p-2 w-full"
                    style={{ 
                      color: theme?.colors?.text,
                      borderColor: `${theme?.colors?.primary}50`,
                      fontFamily: theme?.fonts?.primary
                    }}
                    placeholder="Question"
                  />
                  <textarea
                    value={faq.answer}
                    onChange={(e) => handleFAQChange(index, 'answer', e.target.value)}
                    className="leading-relaxed bg-transparent border-2 border-dashed rounded-lg p-2 w-full h-24 resize-none"
                    style={{ 
                      color: theme?.colors?.textSecondary,
                      borderColor: `${theme?.colors?.primary}50`,
                      fontFamily: theme?.fonts?.secondary
                    }}
                    placeholder="Answer"
                  />
                </div>
              ) : (
                <>
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-6 text-left flex items-center justify-between transition-colors"
                    style={{ 
                      backgroundColor: openFAQ === index ? `${theme?.colors?.primary}10` : 'transparent'
                    }}
                  >
                    <h3 
                      className="text-lg font-semibold pr-8"
                      style={{ 
                        color: theme?.colors?.text,
                        fontFamily: theme?.fonts?.primary
                      }}
                    >
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openFAQ === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown 
                        className="w-5 h-5" 
                        style={{ color: theme?.colors?.textSecondary }}
                      />
                    </motion.div>
                  </button>
                  
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: openFAQ === index ? 'auto' : 0,
                      opacity: openFAQ === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div 
                      className="px-6 pb-6"
                      style={{ 
                        backgroundColor: openFAQ === index ? `${theme?.colors?.primary}10` : 'transparent'
                      }}
                    >
                      <p 
                        className="leading-relaxed"
                        style={{ 
                          color: theme?.colors?.textSecondary,
                          fontFamily: theme?.fonts?.secondary
                        }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                </>
              )}
            </motion.div>
          ))}
          
          {isEditing && (
            <motion.button
              onClick={addFAQ}
              className="border-2 border-dashed rounded-xl p-6 transition-all duration-200 flex items-center justify-center w-full"
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
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="text-center">
                <Plus className="w-6 h-6 mx-auto mb-2" style={{ color: theme?.colors?.textSecondary }} />
                <span className="text-sm" style={{ color: theme?.colors?.textSecondary }}>Add Question</span>
              </div>
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );

  // Grid Layout
  const renderGridFAQ = () => (
    <section 
      className="py-12 sm:py-20" 
      style={{ 
        backgroundColor: theme?.colors?.background || '#f9fafb',
        fontFamily: theme?.fonts?.primary
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
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={content.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="text-3xl sm:text-4xl font-bold mb-4 bg-transparent border-2 border-dashed rounded-lg p-2 text-center w-full max-w-2xl mx-auto"
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
                  className="text-3xl sm:text-4xl font-bold mb-4"
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
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl p-6 transition-shadow duration-300 relative group"
              style={{ 
                backgroundColor: theme?.colors?.surface,
                boxShadow: theme?.shadows?.md
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = theme?.shadows?.lg || '0 10px 15px -3px rgb(0 0 0 / 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = theme?.shadows?.md || '0 4px 6px -1px rgb(0 0 0 / 0.1)';
              }}
            >
              {isEditing && (
                <button
                  onClick={() => removeFAQ(index)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ 
                    backgroundColor: theme?.colors?.error,
                    color: '#ffffff'
                  }}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
                    className="text-lg font-semibold mb-4 bg-transparent border-2 border-dashed rounded-lg p-2 w-full"
                    style={{ 
                      color: theme?.colors?.text,
                      borderColor: `${theme?.colors?.primary}50`,
                      fontFamily: theme?.fonts?.primary
                    }}
                    placeholder="Question"
                  />
                  <textarea
                    value={faq.answer}
                    onChange={(e) => handleFAQChange(index, 'answer', e.target.value)}
                    className="leading-relaxed bg-transparent border-2 border-dashed rounded-lg p-2 w-full h-24 resize-none"
                    style={{ 
                      color: theme?.colors?.textSecondary,
                      borderColor: `${theme?.colors?.primary}50`,
                      fontFamily: theme?.fonts?.secondary
                    }}
                    placeholder="Answer"
                  />
                </>
              ) : (
                <>
                  <h3 
                    className="text-lg font-semibold mb-4"
                    style={{ 
                      color: theme?.colors?.text,
                      fontFamily: theme?.fonts?.primary
                    }}
                  >
                    {faq.question}
                  </h3>
                  <p 
                    className="leading-relaxed"
                    style={{ 
                      color: theme?.colors?.textSecondary,
                      fontFamily: theme?.fonts?.secondary
                    }}
                  >
                    {faq.answer}
                  </p>
                </>
              )}
            </motion.div>
          ))}
          
          {isEditing && (
            <motion.button
              onClick={addFAQ}
              className="border-2 border-dashed rounded-xl p-6 transition-all duration-200 flex items-center justify-center"
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
                <span className="text-sm" style={{ color: theme?.colors?.textSecondary }}>Add Question</span>
              </div>
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );

  // Grouped Layout
  const renderGroupedFAQ = () => (
    <section 
      className="py-12 sm:py-20" 
      style={{ 
        backgroundColor: theme?.colors?.surface || '#ffffff',
        fontFamily: theme?.fonts?.primary
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
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={content.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="text-3xl sm:text-4xl font-bold mb-4 bg-transparent border-2 border-dashed rounded-lg p-2 text-center w-full max-w-2xl mx-auto"
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
                  className="text-3xl sm:text-4xl font-bold mb-4"
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
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Group 1: First half of FAQs */}
          <div>
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-6"
              style={{ 
                backgroundColor: `${theme?.colors?.primary}15`,
                color: theme?.colors?.primary,
                fontFamily: theme?.fonts?.accent
              }}
            >
              <span className="font-semibold">General Questions</span>
            </div>
            
            <div className="space-y-4">
              {content.faqs.slice(0, Math.ceil(content.faqs.length / 2)).map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-xl overflow-hidden relative group"
                  style={{ 
                    backgroundColor: theme?.colors?.background,
                    boxShadow: theme?.shadows?.md
                  }}
                >
                  {isEditing && (
                    <button
                      onClick={() => removeFAQ(index)}
                      className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ 
                        backgroundColor: theme?.colors?.error,
                        color: '#ffffff'
                      }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  
                  {isEditing ? (
                    <div className="p-6">
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
                        className="text-lg font-semibold mb-4 bg-transparent border-2 border-dashed rounded-lg p-2 w-full"
                        style={{ 
                          color: theme?.colors?.text,
                          borderColor: `${theme?.colors?.primary}50`,
                          fontFamily: theme?.fonts?.primary
                        }}
                        placeholder="Question"
                      />
                      <textarea
                        value={faq.answer}
                        onChange={(e) => handleFAQChange(index, 'answer', e.target.value)}
                        className="leading-relaxed bg-transparent border-2 border-dashed rounded-lg p-2 w-full h-24 resize-none"
                        style={{ 
                          color: theme?.colors?.textSecondary,
                          borderColor: `${theme?.colors?.primary}50`,
                          fontFamily: theme?.fonts?.secondary
                        }}
                        placeholder="Answer"
                      />
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between transition-colors"
                        style={{ 
                          backgroundColor: openFAQ === index ? `${theme?.colors?.primary}10` : 'transparent'
                        }}
                      >
                        <h3 
                          className="text-lg font-semibold pr-8"
                          style={{ 
                            color: theme?.colors?.text,
                            fontFamily: theme?.fonts?.primary
                          }}
                        >
                          {faq.question}
                        </h3>
                        <motion.div
                          animate={{ rotate: openFAQ === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown 
                            className="w-5 h-5" 
                            style={{ color: theme?.colors?.textSecondary }}
                          />
                        </motion.div>
                      </button>
                      
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: openFAQ === index ? 'auto' : 0,
                          opacity: openFAQ === index ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div 
                          className="px-6 pb-4"
                          style={{ 
                            backgroundColor: openFAQ === index ? `${theme?.colors?.primary}10` : 'transparent'
                          }}
                        >
                          <p 
                            className="leading-relaxed"
                            style={{ 
                              color: theme?.colors?.textSecondary,
                              fontFamily: theme?.fonts?.secondary
                            }}
                          >
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Group 2: Second half of FAQs */}
          <div>
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-6"
              style={{ 
                backgroundColor: `${theme?.colors?.secondary}15`,
                color: theme?.colors?.secondary,
                fontFamily: theme?.fonts?.accent
              }}
            >
              <span className="font-semibold">Technical Questions</span>
            </div>
            
            <div className="space-y-4">
              {content.faqs.slice(Math.ceil(content.faqs.length / 2)).map((faq, index) => {
                const actualIndex = index + Math.ceil(content.faqs.length / 2);
                return (
                  <motion.div
                    key={actualIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="rounded-xl overflow-hidden relative group"
                    style={{ 
                      backgroundColor: theme?.colors?.background,
                      boxShadow: theme?.shadows?.md
                    }}
                  >
                    {isEditing && (
                      <button
                        onClick={() => removeFAQ(actualIndex)}
                        className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ 
                          backgroundColor: theme?.colors?.error,
                          color: '#ffffff'
                        }}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    
                    {isEditing ? (
                      <div className="p-6">
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => handleFAQChange(actualIndex, 'question', e.target.value)}
                          className="text-lg font-semibold mb-4 bg-transparent border-2 border-dashed rounded-lg p-2 w-full"
                          style={{ 
                            color: theme?.colors?.text,
                            borderColor: `${theme?.colors?.primary}50`,
                            fontFamily: theme?.fonts?.primary
                          }}
                          placeholder="Question"
                        />
                        <textarea
                          value={faq.answer}
                          onChange={(e) => handleFAQChange(actualIndex, 'answer', e.target.value)}
                          className="leading-relaxed bg-transparent border-2 border-dashed rounded-lg p-2 w-full h-24 resize-none"
                          style={{ 
                            color: theme?.colors?.textSecondary,
                            borderColor: `${theme?.colors?.primary}50`,
                            fontFamily: theme?.fonts?.secondary
                          }}
                          placeholder="Answer"
                        />
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => toggleFAQ(actualIndex)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between transition-colors"
                          style={{ 
                            backgroundColor: openFAQ === actualIndex ? `${theme?.colors?.secondary}10` : 'transparent'
                          }}
                        >
                          <h3 
                            className="text-lg font-semibold pr-8"
                            style={{ 
                              color: theme?.colors?.text,
                              fontFamily: theme?.fonts?.primary
                            }}
                          >
                            {faq.question}
                          </h3>
                          <motion.div
                            animate={{ rotate: openFAQ === actualIndex ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown 
                              className="w-5 h-5" 
                              style={{ color: theme?.colors?.textSecondary }}
                            />
                          </motion.div>
                        </button>
                        
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ 
                            height: openFAQ === actualIndex ? 'auto' : 0,
                            opacity: openFAQ === actualIndex ? 1 : 0
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div 
                            className="px-6 pb-4"
                            style={{ 
                              backgroundColor: openFAQ === actualIndex ? `${theme?.colors?.secondary}10` : 'transparent'
                            }}
                          >
                            <p 
                              className="leading-relaxed"
                              style={{ 
                                color: theme?.colors?.textSecondary,
                                fontFamily: theme?.fonts?.secondary
                              }}
                            >
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
        
        {isEditing && (
          <div className="text-center mt-8">
            <button
              onClick={addFAQ}
              className="flex items-center gap-2 px-6 py-3 rounded-lg transition-colors mx-auto"
              style={{ 
                backgroundColor: theme?.colors?.primary,
                color: '#ffffff'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme?.colors?.secondary || '#06b6d4';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = theme?.colors?.primary || '#3b82f6';
              }}
            >
              <Plus className="w-5 h-5" />
              Add Question
            </button>
          </div>
        )}
      </div>
    </section>
  );

  // Initialize default content if needed
  React.useEffect(() => {
    if (!content.subtitle) {
      handleChange('subtitle', 'Find answers to the most frequently asked questions about our services');
    }
    
    // Ensure we have at least one FAQ
    if (content.faqs.length === 0) {
      handleChange('faqs', [
        {
          question: 'What services do you offer?',
          answer: 'We offer a wide range of services including web design, development, digital marketing, and consulting. Our team of experts can help you with all aspects of your online presence.'
        },
        {
          question: 'How much do your services cost?',
          answer: 'Our pricing varies depending on the specific needs of your project. We offer customized solutions tailored to your requirements and budget. Contact us for a free quote.'
        },
        {
          question: 'How long does it take to complete a project?',
          answer: 'Project timelines depend on the scope and complexity of the work. A simple website might take 2-4 weeks, while more complex projects can take several months. We\'ll provide you with a detailed timeline during our initial consultation.'
        },
        {
          question: 'Do you offer ongoing support after the project is completed?',
          answer: 'Yes, we offer various support and maintenance packages to ensure your website or application continues to run smoothly after launch. Our team is always available to help with updates, troubleshooting, and improvements.'
        }
      ]);
    }
  }, []);

  switch (variant) {
    case 'faq-grid':
      return renderGridFAQ();
    case 'faq-grouped':
      return renderGroupedFAQ();
    default:
      return renderAccordionFAQ();
  }
};

export default FAQSection;