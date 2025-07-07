import React from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Calendar } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
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

interface TimelineSectionProps {
  content: {
    title: string;
    subtitle?: string;
    items: TimelineItem[];
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
  variant?: string;
}

const TimelineSection: React.FC<TimelineSectionProps> = ({ 
  content, 
  isEditing, 
  onChange, 
  theme,
  variant = 'timeline-vertical'
}) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    const updatedItems = [...content.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    handleChange('items', updatedItems);
  };

  const addItem = () => {
    const newItem: TimelineItem = {
      year: new Date().getFullYear().toString(),
      title: 'New Milestone',
      description: 'Description of this milestone'
    };
    handleChange('items', [...content.items, newItem]);
  };

  const removeItem = (index: number) => {
    const updatedItems = content.items.filter((_, i) => i !== index);
    handleChange('items', updatedItems);
  };

  return (
    <section 
      className="py-12 sm:py-20" 
      style={{ 
        backgroundColor: theme?.colors?.background || '#f9fafb',
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

        <div className="relative">
          {/* Timeline Line */}
          <div 
            className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5"
            style={{ backgroundColor: theme?.colors?.border }}
          ></div>

          <div className="space-y-8 md:space-y-12">
            {content.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:flex-row`}
              >
                {/* Timeline Dot */}
                <div 
                  className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 border-4 rounded-full z-10"
                  style={{ 
                    backgroundColor: theme?.colors?.surface,
                    borderColor: theme?.colors?.primary
                  }}
                ></div>

                {/* Content */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} ml-12 md:ml-0`}>
                  <motion.div
                    className="rounded-xl p-6 transition-shadow duration-300 relative group"
                    style={{
                      backgroundColor: theme?.colors?.surface,
                      boxShadow: theme?.shadows?.lg
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = theme?.shadows?.xl || '0 20px 25px -5px rgb(0 0 0 / 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = theme?.shadows?.lg || '0 10px 15px -3px rgb(0 0 0 / 0.1)';
                    }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {isEditing && (
                      <button
                        onClick={() => removeItem(index)}
                        className="absolute top-2 right-2 w-6 h-6 text-white rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: theme?.colors?.error }}
                      >
                        ×
                      </button>
                    )}

                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${theme?.colors?.primary}20` }}
                      >
                        <Calendar className="w-5 h-5" style={{ color: theme?.colors?.primary }} />
                      </div>
                      {isEditing ? (
                        <input
                          type="text"
                          value={item.year}
                          onChange={(e) => handleItemChange(index, 'year', e.target.value)}
                          className="text-lg font-bold bg-transparent border-2 border-dashed rounded-lg p-1"
                          style={{ 
                            color: theme?.colors?.primary,
                            borderColor: `${theme?.colors?.primary}50`,
                            fontFamily: theme?.fonts?.accent
                          }}
                          placeholder="Year"
                        />
                      ) : (
                        <span 
                          className="text-lg font-bold"
                          style={{ 
                            color: theme?.colors?.primary,
                            fontFamily: theme?.fonts?.accent
                          }}
                        >
                          {item.year}
                        </span>
                      )}
                    </div>

                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                          className="text-xl font-semibold mb-3 bg-transparent border-2 border-dashed rounded-lg p-2 w-full"
                          style={{ 
                            color: theme?.colors?.text,
                            borderColor: `${theme?.colors?.primary}50`,
                            fontFamily: theme?.fonts?.primary
                          }}
                          placeholder="Milestone title"
                        />
                        <textarea
                          value={item.description}
                          onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                          className="leading-relaxed bg-transparent border-2 border-dashed rounded-lg p-2 w-full h-20 resize-none"
                          style={{ 
                            color: theme?.colors?.textSecondary,
                            borderColor: `${theme?.colors?.primary}50`,
                            fontFamily: theme?.fonts?.secondary
                          }}
                          placeholder="Milestone description"
                        />
                      </>
                    ) : (
                      <>
                        <h3 
                          className="text-xl font-semibold mb-3"
                          style={{ 
                            color: theme?.colors?.text,
                            fontFamily: theme?.fonts?.primary
                          }}
                        >
                          {item.title}
                        </h3>
                        <p 
                          className="leading-relaxed"
                          style={{ 
                            color: theme?.colors?.textSecondary,
                            fontFamily: theme?.fonts?.secondary
                          }}
                        >
                          {item.description}
                        </p>
                      </>
                    )}
                  </motion.div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block w-2/12"></div>
              </motion.div>
            ))}

            {isEditing && (
              <div className="relative flex items-center justify-center">
                <div 
                  className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full z-10"
                  style={{ backgroundColor: theme?.colors?.border }}
                ></div>
                <motion.button
                  onClick={addItem}
                  className="ml-12 md:ml-0 border-2 border-dashed rounded-xl p-6 transition-all duration-200 flex items-center justify-center"
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
                    <span style={{ color: theme?.colors?.textSecondary }}>Add Milestone</span>
                  </div>
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;