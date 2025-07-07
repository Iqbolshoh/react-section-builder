import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, X, Search, Filter, HelpCircle, MessageSquare, CheckCircle } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  category?: string;
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
    categories?: string[];
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
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

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
      answer: 'Answer to the question',
      category: content.categories?.[0] || 'General'
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

  // Filter FAQs based on search term and category
  const filteredFAQs = content.faqs.filter(faq => {
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Standard Accordion FAQ
  const renderAccordionFAQ = () => (
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
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-transparent border-2 border-dashed rounded-xl p-3 text-center w-full max-w-2xl mx-auto"
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
                className="text-lg sm:text-xl bg-transparent border-2 border-dashed rounded-xl p-3 text-center w-full max-w-3xl mx-auto"
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
          {(isEditing ? content.faqs : filteredFAQs).map((faq, index) => (
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
                      className="text-lg font-semibold bg-transparent border-2 border-dashed rounded-xl p-2 w-full"
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
                          className="leading-relaxed bg-transparent border-2 border-dashed rounded-xl p-2 w-full h-24 resize-none"
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

  // Categorized FAQ
  const renderCategorizedFAQ = () => (
    <section 
      className="py-12 sm:py-20" 
      style={{ 
        backgroundColor: theme?.colors?.surface || '#ffffff',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-16">
          {isEditing ? (
            <>
              <input
                type="text"
                value={content.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-transparent border-2 border-dashed rounded-xl p-3 text-center w-full max-w-2xl mx-auto"
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
                className="text-lg sm:text-xl bg-transparent border-2 border-dashed rounded-xl p-3 text-center w-full max-w-3xl mx-auto"
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

        {!isEditing && (
          <div className="mb-8">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: theme?.colors?.textSecondary }} />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl transition-all"
                  style={{ 
                    backgroundColor: theme?.colors?.background,
                    borderColor: theme?.colors?.border,
                    color: theme?.colors?.text,
                    fontFamily: theme?.fonts?.secondary,
                    boxShadow: theme?.shadows?.sm
                  }}
                />
              </div>
              
              {content.categories && content.categories.length > 0 && (
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5" style={{ color: theme?.colors?.textSecondary }} />
                    <select
                      value={activeCategory}
                      onChange={(e) => setActiveCategory(e.target.value)}
                      className="py-3 px-4 pr-10 rounded-xl appearance-none transition-all"
                      style={{ 
                        backgroundColor: theme?.colors?.background,
                        borderColor: theme?.colors?.border,
                        color: theme?.colors?.text,
                        fontFamily: theme?.fonts?.secondary,
                        boxShadow: theme?.shadows?.sm
                      }}
                    >
                      <option value="All">All Categories</option>
                      {content.categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <ChevronDown className="w-5 h-5" style={{ color: theme?.colors?.textSecondary }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Results Count */}
            <p 
              className="text-sm mb-6"
              style={{ 
                color: theme?.colors?.textSecondary,
                fontFamily: theme?.fonts?.secondary
              }}
            >
              Showing {filteredFAQs.length} of {content.faqs.length} questions
            </p>
          </div>
        )}

        <div className="space-y-4">
          {(isEditing ? content.faqs : filteredFAQs).map((faq, index) => (
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
                <div className="flex items-center gap-4 flex-1 pr-4">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ 
                      backgroundColor: `${theme?.colors?.primary}15`,
                      color: theme?.colors?.primary
                    }}
                  >
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  
                  {isEditing ? (
                    <div className="flex-1">
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
                        className="text-lg font-semibold bg-transparent border-2 border-dashed rounded-xl p-2 w-full mb-2"
                        style={{ 
                          color: theme?.colors?.text,
                          borderColor: `${theme?.colors?.primary}50`,
                          fontFamily: theme?.fonts?.primary
                        }}
                        placeholder="Enter question"
                        onClick={(e) => e.stopPropagation()}
                      />
                      
                      {content.categories && content.categories.length > 0 && (
                        <select
                          value={faq.category || 'General'}
                          onChange={(e) => handleFAQChange(index, 'category', e.target.value)}
                          className="text-sm border rounded-lg px-2 py-1 mb-2"
                          style={{ 
                            borderColor: theme?.colors?.border,
                            color: theme?.colors?.textSecondary,
                            backgroundColor: theme?.colors?.surface,
                            fontFamily: theme?.fonts?.secondary
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {content.categories.map((category, catIndex) => (
                            <option key={catIndex} value={category}>{category}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  ) : (
                    <div>
                      <h3 
                        className="text-lg font-semibold"
                        style={{ 
                          color: theme?.colors?.text,
                          fontFamily: theme?.fonts?.primary
                        }}
                      >
                        {faq.question}
                      </h3>
                      
                      {faq.category && (
                        <span 
                          className="text-xs px-2 py-1 rounded-full inline-block mt-1"
                          style={{ 
                            backgroundColor: `${theme?.colors?.primary}15`,
                            color: theme?.colors?.primary,
                            fontFamily: theme?.fonts?.secondary
                          }}
                        >
                          {faq.category}
                        </span>
                      )}
                    </div>
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
                    <div className="px-6 pb-6 pl-20">
                      {isEditing ? (
                        <textarea
                          value={faq.answer}
                          onChange={(e) => handleFAQChange(index, 'answer', e.target.value)}
                          className="leading-relaxed bg-transparent border-2 border-dashed rounded-xl p-2 w-full h-24 resize-none"
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

        {/* Contact Support */}
        {!isEditing && (
          <div 
            className="mt-12 p-8 rounded-2xl text-center"
            style={{ 
              background: `linear-gradient(135deg, ${theme?.colors?.primary}15, ${theme?.colors?.secondary}15)`,
              boxShadow: theme?.shadows?.md
            }}
          >
            <h3 
              className="text-xl font-bold mb-4"
              style={{ 
                color: theme?.colors?.text,
                fontFamily: theme?.fonts?.primary
              }}
            >
              Still have questions?
            </h3>
            <p 
              className="mb-6 max-w-2xl mx-auto"
              style={{ 
                color: theme?.colors?.textSecondary,
                fontFamily: theme?.fonts?.secondary
              }}
            >
              If you couldn't find the answer to your question, feel free to contact our support team.
            </p>
            <button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white transition-all"
              style={{ 
                backgroundColor: theme?.colors?.primary,
                fontFamily: theme?.fonts?.accent,
                boxShadow: theme?.shadows?.md
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme?.colors?.secondary || '';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = theme?.shadows?.lg || '';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = theme?.colors?.primary || '';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = theme?.shadows?.md || '';
              }}
            >
              <MessageSquare className="w-5 h-5" />
              Contact Support
            </button>
          </div>
        )}
      </div>
    </section>
  );

  // Grid FAQ
  const renderGridFAQ = () => (
    <section 
      className="py-12 sm:py-20" 
      style={{ 
        backgroundColor: theme?.colors?.background || '#f9fafb',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-16">
          {isEditing ? (
            <>
              <input
                type="text"
                value={content.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-transparent border-2 border-dashed rounded-xl p-3 text-center w-full max-w-2xl mx-auto"
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
                className="text-lg sm:text-xl bg-transparent border-2 border-dashed rounded-xl p-3 text-center w-full max-w-3xl mx-auto"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(isEditing ? content.faqs : filteredFAQs).map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl p-6 relative group transition-all duration-300"
              style={{ 
                backgroundColor: theme?.colors?.surface,
                boxShadow: theme?.shadows?.md
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = theme?.shadows?.lg || '';
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = theme?.shadows?.md || '';
                e.currentTarget.style.transform = 'translateY(0)';
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

              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ 
                  background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                  boxShadow: theme?.shadows?.sm
                }}
              >
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
                    className="text-lg font-semibold bg-transparent border-2 border-dashed rounded-xl p-2 w-full mb-3"
                    style={{ 
                      color: theme?.colors?.text,
                      borderColor: `${theme?.colors?.primary}50`,
                      fontFamily: theme?.fonts?.primary
                    }}
                    placeholder="Enter question"
                  />
                  <textarea
                    value={faq.answer}
                    onChange={(e) => handleFAQChange(index, 'answer', e.target.value)}
                    className="leading-relaxed bg-transparent border-2 border-dashed rounded-xl p-2 w-full h-24 resize-none"
                    style={{ 
                      color: theme?.colors?.textSecondary,
                      borderColor: `${theme?.colors?.primary}50`,
                      fontFamily: theme?.fonts?.secondary
                    }}
                    placeholder="Enter answer"
                  />
                </>
              ) : (
                <>
                  <h3 
                    className="text-lg font-semibold mb-3"
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
              className="border-2 border-dashed rounded-xl p-6 transition-all duration-200 flex items-center justify-center h-full"
              style={{ 
                borderColor: theme?.colors?.border,
                backgroundColor: 'transparent',
                minHeight: '200px'
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

  // Tabbed FAQ
  const renderTabbedFAQ = () => {
    // Ensure categories exist
    const categories = content.categories || ['General'];
    const activeTab = activeCategory === 'All' ? categories[0] : activeCategory;
    
    return (
      <section 
        className="py-12 sm:py-20" 
        style={{ 
          backgroundColor: theme?.colors?.surface || '#ffffff',
          fontFamily: theme?.fonts?.primary
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={content.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-transparent border-2 border-dashed rounded-xl p-3 text-center w-full max-w-2xl mx-auto"
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
                  className="text-lg sm:text-xl bg-transparent border-2 border-dashed rounded-xl p-3 text-center w-full max-w-3xl mx-auto"
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

          {!isEditing && (
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(category)}
                  className="px-6 py-3 rounded-xl transition-all duration-200"
                  style={{ 
                    backgroundColor: activeTab === category ? theme?.colors?.primary : `${theme?.colors?.primary}15`,
                    color: activeTab === category ? '#ffffff' : theme?.colors?.text,
                    fontFamily: theme?.fonts?.secondary,
                    boxShadow: activeTab === category ? theme?.shadows?.md : 'none'
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          <div className="space-y-4">
            {(isEditing ? content.faqs : filteredFAQs).map((faq, index) => (
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
                      <>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
                          className="text-lg font-semibold bg-transparent border-2 border-dashed rounded-xl p-2 w-full mb-2"
                          style={{ 
                            color: theme?.colors?.text,
                            borderColor: `${theme?.colors?.primary}50`,
                            fontFamily: theme?.fonts?.primary
                          }}
                          placeholder="Enter question"
                          onClick={(e) => e.stopPropagation()}
                        />
                        
                        <select
                          value={faq.category || 'General'}
                          onChange={(e) => handleFAQChange(index, 'category', e.target.value)}
                          className="text-sm border rounded-lg px-2 py-1"
                          style={{ 
                            borderColor: theme?.colors?.border,
                            color: theme?.colors?.textSecondary,
                            backgroundColor: theme?.colors?.surface,
                            fontFamily: theme?.fonts?.secondary
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {categories.map((category, catIndex) => (
                            <option key={catIndex} value={category}>{category}</option>
                          ))}
                        </select>
                      </>
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
                            className="leading-relaxed bg-transparent border-2 border-dashed rounded-xl p-2 w-full h-24 resize-none"
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

  // Card FAQ
  const renderCardFAQ = () => (
    <section 
      className="py-12 sm:py-20" 
      style={{ 
        backgroundColor: theme?.colors?.background || '#f9fafb',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-16">
          {isEditing ? (
            <>
              <input
                type="text"
                value={content.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-transparent border-2 border-dashed rounded-xl p-3 text-center w-full max-w-2xl mx-auto"
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
                className="text-lg sm:text-xl bg-transparent border-2 border-dashed rounded-xl p-3 text-center w-full max-w-3xl mx-auto"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(isEditing ? content.faqs : filteredFAQs).map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl p-6 relative group transition-all duration-300"
              style={{ 
                backgroundColor: theme?.colors?.surface,
                boxShadow: theme?.shadows?.md
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = theme?.shadows?.lg || '';
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = theme?.shadows?.md || '';
                e.currentTarget.style.transform = 'translateY(0)';
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

              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
                    className="text-lg font-semibold bg-transparent border-2 border-dashed rounded-xl p-2 w-full mb-3"
                    style={{ 
                      color: theme?.colors?.text,
                      borderColor: `${theme?.colors?.primary}50`,
                      fontFamily: theme?.fonts?.primary
                    }}
                    placeholder="Enter question"
                  />
                  <textarea
                    value={faq.answer}
                    onChange={(e) => handleFAQChange(index, 'answer', e.target.value)}
                    className="leading-relaxed bg-transparent border-2 border-dashed rounded-xl p-2 w-full h-24 resize-none"
                    style={{ 
                      color: theme?.colors?.textSecondary,
                      borderColor: `${theme?.colors?.primary}50`,
                      fontFamily: theme?.fonts?.secondary
                    }}
                    placeholder="Enter answer"
                  />
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ 
                        backgroundColor: `${theme?.colors?.primary}15`,
                        color: theme?.colors?.primary
                      }}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <h3 
                      className="text-lg font-semibold"
                      style={{ 
                        color: theme?.colors?.text,
                        fontFamily: theme?.fonts?.primary
                      }}
                    >
                      {faq.question}
                    </h3>
                  </div>
                  <p 
                    className="leading-relaxed pl-12"
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
              className="border-2 border-dashed rounded-xl p-6 transition-all duration-200 flex items-center justify-center h-full"
              style={{ 
                borderColor: theme?.colors?.border,
                backgroundColor: 'transparent',
                minHeight: '200px'
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

  // Sidebar FAQ
  const renderSidebarFAQ = () => (
    <section 
      className="py-12 sm:py-20" 
      style={{ 
        backgroundColor: theme?.colors?.surface || '#ffffff',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center lg:text-left mb-8 sm:mb-16">
          {isEditing ? (
            <>
              <input
                type="text"
                value={content.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-transparent border-2 border-dashed rounded-xl p-3 w-full max-w-2xl"
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
                className="text-lg sm:text-xl bg-transparent border-2 border-dashed rounded-xl p-3 w-full max-w-3xl"
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
                  className="text-lg sm:text-xl max-w-3xl"
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          {!isEditing && content.categories && content.categories.length > 0 && (
            <div className="lg:col-span-3">
              <div 
                className="sticky top-24 rounded-xl p-6"
                style={{ 
                  backgroundColor: theme?.colors?.background,
                  boxShadow: theme?.shadows?.md
                }}
              >
                <h3 
                  className="text-lg font-semibold mb-4"
                  style={{ 
                    color: theme?.colors?.text,
                    fontFamily: theme?.fonts?.primary
                  }}
                >
                  Categories
                </h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveCategory('All')}
                      className="w-full text-left py-2 px-3 rounded-lg transition-colors"
                      style={{ 
                        backgroundColor: activeCategory === 'All' ? `${theme?.colors?.primary}15` : 'transparent',
                        color: activeCategory === 'All' ? theme?.colors?.primary : theme?.colors?.textSecondary,
                        fontFamily: theme?.fonts?.secondary
                      }}
                    >
                      All Questions
                    </button>
                  </li>
                  {content.categories.map((category, index) => (
                    <li key={index}>
                      <button
                        onClick={() => setActiveCategory(category)}
                        className="w-full text-left py-2 px-3 rounded-lg transition-colors"
                        style={{ 
                          backgroundColor: activeCategory === category ? `${theme?.colors?.primary}15` : 'transparent',
                          color: activeCategory === category ? theme?.colors?.primary : theme?.colors?.textSecondary,
                          fontFamily: theme?.fonts?.secondary
                        }}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 pt-6 border-t" style={{ borderColor: theme?.colors?.border }}>
                  <h3 
                    className="text-lg font-semibold mb-4"
                    style={{ 
                      color: theme?.colors?.text,
                      fontFamily: theme?.fonts?.primary
                    }}
                  >
                    Need Help?
                  </h3>
                  <p 
                    className="mb-4"
                    style={{ 
                      color: theme?.colors?.textSecondary,
                      fontFamily: theme?.fonts?.secondary
                    }}
                  >
                    Can't find the answer you're looking for?
                  </p>
                  <button
                    className="w-full py-3 px-4 rounded-xl text-white transition-all"
                    style={{ 
                      backgroundColor: theme?.colors?.primary,
                      fontFamily: theme?.fonts?.accent
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = theme?.colors?.secondary || '';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = theme?.colors?.primary || '';
                    }}
                  >
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* FAQ Content */}
          <div className={`${!isEditing && content.categories && content.categories.length > 0 ? 'lg:col-span-9' : 'lg:col-span-12'}`}>
            {!isEditing && (
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: theme?.colors?.textSecondary }} />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl transition-all"
                  style={{ 
                    backgroundColor: theme?.colors?.background,
                    borderColor: theme?.colors?.border,
                    color: theme?.colors?.text,
                    fontFamily: theme?.fonts?.secondary,
                    boxShadow: theme?.shadows?.sm
                  }}
                />
              </div>
            )}

            <div className="space-y-4">
              {(isEditing ? content.faqs : filteredFAQs).map((faq, index) => (
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
                        <>
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
                            className="text-lg font-semibold bg-transparent border-2 border-dashed rounded-xl p-2 w-full mb-2"
                            style={{ 
                              color: theme?.colors?.text,
                              borderColor: `${theme?.colors?.primary}50`,
                              fontFamily: theme?.fonts?.primary
                            }}
                            placeholder="Enter question"
                            onClick={(e) => e.stopPropagation()}
                          />
                          
                          <select
                            value={faq.category || 'General'}
                            onChange={(e) => handleFAQChange(index, 'category', e.target.value)}
                            className="text-sm border rounded-lg px-2 py-1"
                            style={{ 
                              borderColor: theme?.colors?.border,
                              color: theme?.colors?.textSecondary,
                              backgroundColor: theme?.colors?.surface,
                              fontFamily: theme?.fonts?.secondary
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {categories.map((category, catIndex) => (
                              <option key={catIndex} value={category}>{category}</option>
                            ))}
                          </select>
                        </>
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
                              className="leading-relaxed bg-transparent border-2 border-dashed rounded-xl p-2 w-full h-24 resize-none"
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
        </div>
      </div>
    </section>
  );

  // Initialize default content if needed
  React.useEffect(() => {
    if (variant === 'faq-categorized' && !content.categories) {
      handleChange('categories', ['General', 'Pricing', 'Technical', 'Shipping', 'Returns']);
      
      // Add categories to existing FAQs
      if (content.faqs && content.faqs.length > 0) {
        const categories = ['General', 'Pricing', 'Technical', 'Shipping', 'Returns'];
        const updatedFAQs = content.faqs.map((faq, index) => ({
          ...faq,
          category: categories[index % categories.length]
        }));
        handleChange('faqs', updatedFAQs);
      }
    }
  }, [variant]);

  switch (variant) {
    case 'faq-categorized':
      return renderCategorizedFAQ();
    case 'faq-grid':
      return renderGridFAQ();
    case 'faq-tabbed':
      return renderTabbedFAQ();
    case 'faq-sidebar':
      return renderSidebarFAQ();
    default:
      return renderAccordionFAQ();
  }
};

export default FAQSection;