import React from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Calendar, Clock, Award, Briefcase, GraduationCap, Flag, Target, Heart, Star } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
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
      description: 'Description of this milestone',
      icon: 'Calendar'
    };
    handleChange('items', [...content.items, newItem]);
  };

  const removeItem = (index: number) => {
    const updatedItems = content.items.filter((_, i) => i !== index);
    handleChange('items', updatedItems);
  };

  const getIcon = (iconName: string = 'Calendar') => {
    switch (iconName) {
      case 'Calendar': return <Calendar className="w-5 h-5" />;
      case 'Clock': return <Clock className="w-5 h-5" />;
      case 'Award': return <Award className="w-5 h-5" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      case 'Flag': return <Flag className="w-5 h-5" />;
      case 'Target': return <Target className="w-5 h-5" />;
      case 'Heart': return <Heart className="w-5 h-5" />;
      case 'Star': return <Star className="w-5 h-5" />;
      default: return <Calendar className="w-5 h-5" />;
    }
  };

  // Vertical Timeline
  const renderVerticalTimeline = () => (
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
                        style={{ 
                          background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                          color: '#ffffff'
                        }}
                      >
                        {getIcon(item.icon)}
                      </div>
                      {isEditing ? (
                        <div className="flex flex-col gap-2">
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
                          <select
                            value={item.icon || 'Calendar'}
                            onChange={(e) => handleItemChange(index, 'icon', e.target.value)}
                            className="text-sm border rounded-lg px-2 py-1"
                            style={{ 
                              borderColor: theme?.colors?.border,
                              color: theme?.colors?.textSecondary,
                              backgroundColor: theme?.colors?.surface,
                              fontFamily: theme?.fonts?.secondary
                            }}
                          >
                            <option value="Calendar">Calendar</option>
                            <option value="Clock">Clock</option>
                            <option value="Award">Award</option>
                            <option value="Briefcase">Briefcase</option>
                            <option value="GraduationCap">Graduation</option>
                            <option value="Flag">Flag</option>
                            <option value="Target">Target</option>
                            <option value="Heart">Heart</option>
                            <option value="Star">Star</option>
                          </select>
                        </div>
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
                          className="text-xl font-semibold mb-3 bg-transparent border-2 border-dashed rounded-xl p-2 w-full"
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
                          className="leading-relaxed bg-transparent border-2 border-dashed rounded-xl p-2 w-full h-20 resize-none"
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

  // Horizontal Timeline
  const renderHorizontalTimeline = () => (
    <section 
      className="py-12 sm:py-20" 
      style={{ 
        backgroundColor: theme?.colors?.surface || '#ffffff',
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

        <div className="relative">
          {/* Timeline Line */}
          <div 
            className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-0.5 hidden md:block"
            style={{ backgroundColor: theme?.colors?.border }}
          ></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {content.items.slice(0, 4).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div 
                  className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-4 rounded-full z-10 hidden md:block"
                  style={{ 
                    backgroundColor: theme?.colors?.surface,
                    borderColor: theme?.colors?.primary
                  }}
                ></div>

                {/* Year */}
                <div 
                  className="text-center mb-6 pt-6 hidden md:block"
                  style={{ 
                    color: theme?.colors?.primary,
                    fontFamily: theme?.fonts?.accent
                  }}
                >
                  {isEditing ? (
                    <input
                      type="text"
                      value={item.year}
                      onChange={(e) => handleItemChange(index, 'year', e.target.value)}
                      className="text-lg font-bold bg-transparent border-2 border-dashed rounded-lg p-1 text-center"
                      style={{ 
                        color: theme?.colors?.primary,
                        borderColor: `${theme?.colors?.primary}50`,
                        fontFamily: theme?.fonts?.accent
                      }}
                      placeholder="Year"
                    />
                  ) : (
                    <span className="text-lg font-bold">{item.year}</span>
                  )}
                </div>

                {/* Content */}
                <motion.div
                  className="rounded-xl p-6 transition-shadow duration-300 relative group"
                  style={{
                    backgroundColor: theme?.colors?.background,
                    boxShadow: theme?.shadows?.md
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = theme?.shadows?.lg || '0 10px 15px -3px rgb(0 0 0 / 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = theme?.shadows?.md || '0 4px 6px -1px rgb(0 0 0 / 0.1)';
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
                      style={{ 
                        background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                        color: '#ffffff'
                      }}
                    >
                      {getIcon(item.icon)}
                    </div>
                    {isEditing ? (
                      <div className="flex flex-col gap-2 md:hidden">
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
                        <select
                          value={item.icon || 'Calendar'}
                          onChange={(e) => handleItemChange(index, 'icon', e.target.value)}
                          className="text-sm border rounded-lg px-2 py-1"
                          style={{ 
                            borderColor: theme?.colors?.border,
                            color: theme?.colors?.textSecondary,
                            backgroundColor: theme?.colors?.surface,
                            fontFamily: theme?.fonts?.secondary
                          }}
                        >
                          <option value="Calendar">Calendar</option>
                          <option value="Clock">Clock</option>
                          <option value="Award">Award</option>
                          <option value="Briefcase">Briefcase</option>
                          <option value="GraduationCap">Graduation</option>
                          <option value="Flag">Flag</option>
                          <option value="Target">Target</option>
                          <option value="Heart">Heart</option>
                          <option value="Star">Star</option>
                        </select>
                      </div>
                    ) : (
                      <span 
                        className="text-lg font-bold md:hidden"
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
                        className="text-xl font-semibold mb-3 bg-transparent border-2 border-dashed rounded-xl p-2 w-full"
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
                        className="leading-relaxed bg-transparent border-2 border-dashed rounded-xl p-2 w-full h-20 resize-none"
                        style={{ 
                          color: theme?.colors?.textSecondary,
                          borderColor: `${theme?.colors?.primary}50`,
                          fontFamily: theme?.fonts?.secondary
                        }}
                        placeholder="Milestone description"
                      />
                      <select
                        value={item.icon || 'Calendar'}
                        onChange={(e) => handleItemChange(index, 'icon', e.target.value)}
                        className="text-sm border rounded-lg px-2 py-1 mt-2 hidden md:block"
                        style={{ 
                          borderColor: theme?.colors?.border,
                          color: theme?.colors?.textSecondary,
                          backgroundColor: theme?.colors?.surface,
                          fontFamily: theme?.fonts?.secondary
                        }}
                      >
                        <option value="Calendar">Calendar</option>
                        <option value="Clock">Clock</option>
                        <option value="Award">Award</option>
                        <option value="Briefcase">Briefcase</option>
                        <option value="GraduationCap">Graduation</option>
                        <option value="Flag">Flag</option>
                        <option value="Target">Target</option>
                        <option value="Heart">Heart</option>
                        <option value="Star">Star</option>
                      </select>
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
              </motion.div>
            ))}

            {isEditing && content.items.length < 4 && (
              <motion.button
                onClick={addItem}
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
                  <span style={{ color: theme?.colors?.textSecondary }}>Add Milestone</span>
                </div>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </section>
  );

  // Zigzag Timeline
  const renderZigzagTimeline = () => (
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

        <div className="space-y-12 sm:space-y-16">
          {content.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'} gap-8 items-center`}
            >
              {/* Year */}
              <div 
                className="w-full sm:w-1/3 text-center sm:text-right"
                style={{ 
                  color: theme?.colors?.primary,
                  fontFamily: theme?.fonts?.accent
                }}
              >
                {isEditing ? (
                  <input
                    type="text"
                    value={item.year}
                    onChange={(e) => handleItemChange(index, 'year', e.target.value)}
                    className="text-3xl sm:text-4xl font-bold bg-transparent border-2 border-dashed rounded-xl p-2 text-center sm:text-right w-full"
                    style={{ 
                      color: theme?.colors?.primary,
                      borderColor: `${theme?.colors?.primary}50`,
                      fontFamily: theme?.fonts?.accent
                    }}
                    placeholder="Year"
                  />
                ) : (
                  <div className="text-3xl sm:text-4xl font-bold">{item.year}</div>
                )}
              </div>

              {/* Content */}
              <div className="w-full sm:w-2/3">
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
                      style={{ 
                        background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                        color: '#ffffff'
                      }}
                    >
                      {getIcon(item.icon)}
                    </div>
                    {isEditing && (
                      <select
                        value={item.icon || 'Calendar'}
                        onChange={(e) => handleItemChange(index, 'icon', e.target.value)}
                        className="text-sm border rounded-lg px-2 py-1"
                        style={{ 
                          borderColor: theme?.colors?.border,
                          color: theme?.colors?.textSecondary,
                          backgroundColor: theme?.colors?.surface,
                          fontFamily: theme?.fonts?.secondary
                        }}
                      >
                        <option value="Calendar">Calendar</option>
                        <option value="Clock">Clock</option>
                        <option value="Award">Award</option>
                        <option value="Briefcase">Briefcase</option>
                        <option value="GraduationCap">Graduation</option>
                        <option value="Flag">Flag</option>
                        <option value="Target">Target</option>
                        <option value="Heart">Heart</option>
                        <option value="Star">Star</option>
                      </select>
                    )}
                  </div>

                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                        className="text-xl font-semibold mb-3 bg-transparent border-2 border-dashed rounded-xl p-2 w-full"
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
                        className="leading-relaxed bg-transparent border-2 border-dashed rounded-xl p-2 w-full h-20 resize-none"
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
            </motion.div>
          ))}

          {isEditing && (
            <motion.button
              onClick={addItem}
              className="border-2 border-dashed rounded-xl p-6 transition-all duration-200 flex items-center justify-center mx-auto"
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
          )}
        </div>
      </div>
    </section>
  );

  // Card Timeline
  const renderCardTimeline = () => (
    <section 
      className="py-12 sm:py-20" 
      style={{ 
        backgroundColor: theme?.colors?.surface || '#ffffff',
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {content.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden relative group"
              style={{ 
                backgroundColor: theme?.colors?.background,
                boxShadow: theme?.shadows?.lg
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = theme?.shadows?.xl || '0 20px 25px -5px rgb(0 0 0 / 0.1)';
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = theme?.shadows?.lg || '0 10px 15px -3px rgb(0 0 0 / 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {isEditing && (
                <button
                  onClick={() => removeItem(index)}
                  className="absolute top-2 right-2 z-10 w-6 h-6 text-white rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: theme?.colors?.error }}
                >
                  ×
                </button>
              )}

              <div 
                className="h-2"
                style={{ 
                  background: `linear-gradient(90deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})` 
                }}
              ></div>

              <div className="p-6">
                <div 
                  className="inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4"
                  style={{ 
                    backgroundColor: `${theme?.colors?.primary}15`,
                    color: theme?.colors?.primary,
                    fontFamily: theme?.fonts?.accent
                  }}
                >
                  {isEditing ? (
                    <input
                      type="text"
                      value={item.year}
                      onChange={(e) => handleItemChange(index, 'year', e.target.value)}
                      className="bg-transparent w-20 text-center"
                      style={{ 
                        color: theme?.colors?.primary,
                        fontFamily: theme?.fonts?.accent
                      }}
                      placeholder="Year"
                    />
                  ) : (
                    item.year
                  )}
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ 
                      background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                      color: '#ffffff'
                    }}
                  >
                    {getIcon(item.icon)}
                  </div>
                  {isEditing && (
                    <select
                      value={item.icon || 'Calendar'}
                      onChange={(e) => handleItemChange(index, 'icon', e.target.value)}
                      className="text-sm border rounded-lg px-2 py-1"
                      style={{ 
                        borderColor: theme?.colors?.border,
                        color: theme?.colors?.textSecondary,
                        backgroundColor: theme?.colors?.surface,
                        fontFamily: theme?.fonts?.secondary
                      }}
                    >
                      <option value="Calendar">Calendar</option>
                      <option value="Clock">Clock</option>
                      <option value="Award">Award</option>
                      <option value="Briefcase">Briefcase</option>
                      <option value="GraduationCap">Graduation</option>
                      <option value="Flag">Flag</option>
                      <option value="Target">Target</option>
                      <option value="Heart">Heart</option>
                      <option value="Star">Star</option>
                    </select>
                  )}
                </div>

                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                      className="text-xl font-semibold mb-3 bg-transparent border-2 border-dashed rounded-xl p-2 w-full"
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
                      className="leading-relaxed bg-transparent border-2 border-dashed rounded-xl p-2 w-full h-20 resize-none"
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
              </div>
            </motion.div>
          ))}

          {isEditing && (
            <motion.button
              onClick={addItem}
              className="border-2 border-dashed rounded-xl p-6 transition-all duration-200 flex items-center justify-center h-full"
              style={{ 
                borderColor: theme?.colors?.border,
                backgroundColor: 'transparent',
                minHeight: '250px'
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
          )}
        </div>
      </div>
    </section>
  );

  // Compact Timeline
  const renderCompactTimeline = () => (
    <section 
      className="py-12 sm:py-20" 
      style={{ 
        backgroundColor: theme?.colors?.background || '#f9fafb',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div 
          className="rounded-2xl p-6 sm:p-8"
          style={{ 
            backgroundColor: theme?.colors?.surface,
            boxShadow: theme?.shadows?.lg
          }}
        >
          <div className="space-y-6">
            {content.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Line */}
                {index < content.items.length - 1 && (
                  <div 
                    className="absolute left-5 top-10 bottom-0 w-0.5"
                    style={{ backgroundColor: theme?.colors?.border }}
                  ></div>
                )}

                <div className="flex gap-4">
                  {/* Icon */}
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                    style={{ 
                      background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                      color: '#ffffff'
                    }}
                  >
                    {getIcon(item.icon)}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div 
                        className="text-lg font-bold"
                        style={{ 
                          color: theme?.colors?.primary,
                          fontFamily: theme?.fonts?.accent
                        }}
                      >
                        {isEditing ? (
                          <input
                            type="text"
                            value={item.year}
                            onChange={(e) => handleItemChange(index, 'year', e.target.value)}
                            className="bg-transparent border-2 border-dashed rounded-lg p-1"
                            style={{ 
                              color: theme?.colors?.primary,
                              borderColor: `${theme?.colors?.primary}50`,
                              fontFamily: theme?.fonts?.accent
                            }}
                            placeholder="Year"
                          />
                        ) : (
                          item.year
                        )}
                      </div>
                      {isEditing && (
                        <button
                          onClick={() => removeItem(index)}
                          className="w-6 h-6 text-white rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ backgroundColor: theme?.colors?.error }}
                        >
                          ×
                        </button>
                      )}
                    </div>

                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                          className="text-xl font-semibold mb-2 bg-transparent border-2 border-dashed rounded-lg p-2 w-full"
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
                          className="leading-relaxed bg-transparent border-2 border-dashed rounded-lg p-2 w-full h-16 resize-none"
                          style={{ 
                            color: theme?.colors?.textSecondary,
                            borderColor: `${theme?.colors?.primary}50`,
                            fontFamily: theme?.fonts?.secondary
                          }}
                          placeholder="Milestone description"
                        />
                        <select
                          value={item.icon || 'Calendar'}
                          onChange={(e) => handleItemChange(index, 'icon', e.target.value)}
                          className="text-sm border rounded-lg px-2 py-1 mt-2"
                          style={{ 
                            borderColor: theme?.colors?.border,
                            color: theme?.colors?.textSecondary,
                            backgroundColor: theme?.colors?.surface,
                            fontFamily: theme?.fonts?.secondary
                          }}
                        >
                          <option value="Calendar">Calendar</option>
                          <option value="Clock">Clock</option>
                          <option value="Award">Award</option>
                          <option value="Briefcase">Briefcase</option>
                          <option value="GraduationCap">Graduation</option>
                          <option value="Flag">Flag</option>
                          <option value="Target">Target</option>
                          <option value="Heart">Heart</option>
                          <option value="Star">Star</option>
                        </select>
                      </>
                    ) : (
                      <>
                        <h3 
                          className="text-xl font-semibold mb-2"
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
                  </div>
                </div>
              </motion.div>
            ))}

            {isEditing && (
              <motion.button
                onClick={addItem}
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-center">
                  <Plus className="w-6 h-6 mx-auto mb-2" style={{ color: theme?.colors?.textSecondary }} />
                  <span style={{ color: theme?.colors?.textSecondary }}>Add Milestone</span>
                </div>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </section>
  );

  // Initialize default content if needed
  React.useEffect(() => {
    if (content.items.length === 0) {
      handleChange('items', [
        {
          year: '2020',
          title: 'Company Founded',
          description: 'Started with a vision to make website building accessible to everyone',
          icon: 'Flag'
        },
        {
          year: '2021',
          title: 'First 1000 Users',
          description: 'Reached our first milestone of 1000 happy customers',
          icon: 'Award'
        },
        {
          year: '2022',
          title: 'Mobile App Launch',
          description: 'Launched our mobile app for building websites on the go',
          icon: 'Smartphone'
        },
        {
          year: '2023',
          title: 'Global Expansion',
          description: 'Expanded our services to serve customers worldwide',
          icon: 'Globe'
        }
      ]);
    }
  }, []);

  switch (variant) {
    case 'timeline-horizontal':
      return renderHorizontalTimeline();
    case 'timeline-zigzag':
      return renderZigzagTimeline();
    case 'timeline-cards':
      return renderCardTimeline();
    case 'timeline-compact':
      return renderCompactTimeline();
    default:
      return renderVerticalTimeline();
  }
};

export default TimelineSection;