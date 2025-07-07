import React from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon?: string;
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
      description: 'Description of the milestone'
    };
    handleChange('items', [...content.items, newItem]);
  };

  const removeItem = (index: number) => {
    const updatedItems = content.items.filter((_, i) => i !== index);
    handleChange('items', updatedItems);
  };

  // Vertical Timeline
  const renderVerticalTimeline = () => (
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

        <div className="relative">
          {/* Timeline Line */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 hidden md:block"
            style={{ backgroundColor: `${theme?.colors?.primary}30` }}
          ></div>

          <div className="space-y-12">
            {content.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {isEditing && (
                  <button
                    onClick={() => removeItem(index)}
                    className="absolute top-0 right-0 z-10 w-6 h-6 rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ 
                      backgroundColor: theme?.colors?.error,
                      color: '#ffffff'
                    }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                
                <div className="flex flex-col md:flex-row items-center">
                  {/* Left Side (even index) */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:hidden'}`}>
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={item.year}
                          onChange={(e) => handleItemChange(index, 'year', e.target.value)}
                          className="text-2xl font-bold mb-2 bg-transparent border-2 border-dashed rounded-lg p-2 w-full md:text-right"
                          style={{ 
                            color: theme?.colors?.primary,
                            borderColor: `${theme?.colors?.primary}50`,
                            fontFamily: theme?.fonts?.accent
                          }}
                          placeholder="Year"
                        />
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                          className="text-xl font-semibold mb-3 bg-transparent border-2 border-dashed rounded-lg p-2 w-full md:text-right"
                          style={{ 
                            color: theme?.colors?.text,
                            borderColor: `${theme?.colors?.primary}50`,
                            fontFamily: theme?.fonts?.primary
                          }}
                          placeholder="Title"
                        />
                        <textarea
                          value={item.description}
                          onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                          className="leading-relaxed bg-transparent border-2 border-dashed rounded-lg p-2 w-full h-24 resize-none md:text-right"
                          style={{ 
                            color: theme?.colors?.textSecondary,
                            borderColor: `${theme?.colors?.primary}50`,
                            fontFamily: theme?.fonts?.secondary
                          }}
                          placeholder="Description"
                        />
                      </>
                    ) : (
                      <>
                        <div 
                          className="text-2xl font-bold mb-2"
                          style={{ 
                            color: theme?.colors?.primary,
                            fontFamily: theme?.fonts?.accent
                          }}
                        >
                          {item.year}
                        </div>
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
                  
                  {/* Center Dot */}
                  <div className="md:w-0 flex justify-center my-4 md:my-0">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center z-10"
                      style={{ 
                        background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                        boxShadow: theme?.shadows?.md
                      }}
                    >
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Right Side (odd index) */}
                  <div className={`md:w-1/2 ${index % 2 === 1 ? 'md:pl-12' : 'md:hidden'}`}>
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={item.year}
                          onChange={(e) => handleItemChange(index, 'year', e.target.value)}
                          className="text-2xl font-bold mb-2 bg-transparent border-2 border-dashed rounded-lg p-2 w-full"
                          style={{ 
                            color: theme?.colors?.primary,
                            borderColor: `${theme?.colors?.primary}50`,
                            fontFamily: theme?.fonts?.accent
                          }}
                          placeholder="Year"
                        />
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
                          placeholder="Title"
                        />
                        <textarea
                          value={item.description}
                          onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                          className="leading-relaxed bg-transparent border-2 border-dashed rounded-lg p-2 w-full h-24 resize-none"
                          style={{ 
                            color: theme?.colors?.textSecondary,
                            borderColor: `${theme?.colors?.primary}50`,
                            fontFamily: theme?.fonts?.secondary
                          }}
                          placeholder="Description"
                        />
                      </>
                    ) : (
                      <>
                        <div 
                          className="text-2xl font-bold mb-2"
                          style={{ 
                            color: theme?.colors?.primary,
                            fontFamily: theme?.fonts?.accent
                          }}
                        >
                          {item.year}
                        </div>
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
                </div>
              </motion.div>
            ))}
          </div>
          
          {isEditing && (
            <div className="text-center mt-8">
              <button
                onClick={addItem}
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
                Add Milestone
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );

  // Horizontal Timeline
  const renderHorizontalTimeline = () => (
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

        <div className="relative mt-16">
          {/* Timeline Line */}
          <div 
            className="absolute top-8 left-0 w-full h-1 hidden md:block"
            style={{ backgroundColor: `${theme?.colors?.primary}30` }}
          ></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {content.items.slice(0, 4).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {isEditing && (
                  <button
                    onClick={() => removeItem(index)}
                    className="absolute top-0 right-0 z-10 w-6 h-6 rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ 
                      backgroundColor: theme?.colors?.error,
                      color: '#ffffff'
                    }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                
                {/* Dot */}
                <div className="flex justify-center mb-6">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center z-10"
                    style={{ 
                      background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                      boxShadow: theme?.shadows?.md
                    }}
                  >
                    <div className="text-xl font-bold text-white">{item.year}</div>
                  </div>
                </div>
                
                <div className="text-center">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                        className="text-xl font-semibold mb-3 bg-transparent border-2 border-dashed rounded-lg p-2 w-full text-center"
                        style={{ 
                          color: theme?.colors?.text,
                          borderColor: `${theme?.colors?.primary}50`,
                          fontFamily: theme?.fonts?.primary
                        }}
                        placeholder="Title"
                      />
                      <textarea
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        className="leading-relaxed bg-transparent border-2 border-dashed rounded-lg p-2 w-full h-24 resize-none text-center"
                        style={{ 
                          color: theme?.colors?.textSecondary,
                          borderColor: `${theme?.colors?.primary}50`,
                          fontFamily: theme?.fonts?.secondary
                        }}
                        placeholder="Description"
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
          </div>
          
          {isEditing && (
            <div className="text-center mt-8">
              <button
                onClick={addItem}
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
                Add Milestone
              </button>
            </div>
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

        <div className="space-y-8">
          {content.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl p-6 transition-shadow duration-300 relative group"
              style={{ 
                backgroundColor: theme?.colors?.background,
                boxShadow: theme?.shadows?.lg
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = theme?.shadows?.xl || '0 20px 25px -5px rgb(0 0 0 / 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = theme?.shadows?.lg || '0 10px 15px -3px rgb(0 0 0 / 0.1)';
              }}
            >
              {isEditing && (
                <button
                  onClick={() => removeItem(index)}
                  className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ 
                    backgroundColor: theme?.colors?.error,
                    color: '#ffffff'
                  }}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              
              <div className="flex flex-col md:flex-row gap-6">
                <div 
                  className="flex-shrink-0 w-24 h-24 rounded-2xl flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                    boxShadow: theme?.shadows?.md
                  }}
                >
                  <div 
                    className="text-2xl font-bold text-white"
                    style={{ fontFamily: theme?.fonts?.accent }}
                  >
                    {isEditing ? (
                      <input
                        type="text"
                        value={item.year}
                        onChange={(e) => handleItemChange(index, 'year', e.target.value)}
                        className="bg-transparent text-white text-center w-full border-0"
                        style={{ fontFamily: theme?.fonts?.accent }}
                        placeholder="Year"
                      />
                    ) : (
                      item.year
                    )}
                  </div>
                </div>
                
                <div className="flex-1">
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
                        placeholder="Title"
                      />
                      <textarea
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        className="leading-relaxed bg-transparent border-2 border-dashed rounded-lg p-2 w-full h-24 resize-none"
                        style={{ 
                          color: theme?.colors?.textSecondary,
                          borderColor: `${theme?.colors?.primary}50`,
                          fontFamily: theme?.fonts?.secondary
                        }}
                        placeholder="Description"
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
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="text-center">
                <Plus className="w-6 h-6 mx-auto mb-2" style={{ color: theme?.colors?.textSecondary }} />
                <span className="text-sm" style={{ color: theme?.colors?.textSecondary }}>Add Milestone</span>
              </div>
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );

  // Initialize default content if needed
  React.useEffect(() => {
    if (!content.subtitle) {
      handleChange('subtitle', 'Key milestones in our journey');
    }
    
    // Ensure we have at least one timeline item
    if (content.items.length === 0) {
      handleChange('items', [
        {
          year: '2020',
          title: 'Company Founded',
          description: 'Our company was founded with a vision to revolutionize the industry with innovative solutions.'
        },
        {
          year: '2021',
          title: 'First Major Client',
          description: 'We secured our first major client and delivered a successful project that exceeded expectations.'
        },
        {
          year: '2022',
          title: 'Team Expansion',
          description: 'Our team grew to 20 talented professionals, allowing us to take on more complex projects.'
        },
        {
          year: '2023',
          title: 'International Expansion',
          description: 'We opened our first international office and began serving clients globally.'
        }
      ]);
    }
  }, []);

  switch (variant) {
    case 'timeline-horizontal':
      return renderHorizontalTimeline();
    case 'timeline-cards':
      return renderCardTimeline();
    default:
      return renderVerticalTimeline();
  }
};

export default TimelineSection;