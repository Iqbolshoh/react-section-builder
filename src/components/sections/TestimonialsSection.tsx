import React from 'react';
import { motion } from 'framer-motion';
import { Star, Plus, X, Quote } from 'lucide-react';
import ImageUpload from '../ImageUpload';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar?: string;
  rating?: number;
  company?: string;
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

interface TestimonialsSectionProps {
  content: {
    title: string;
    subtitle?: string;
    testimonials: Testimonial[];
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
  variant?: string;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ 
  content, 
  isEditing, 
  onChange, 
  theme,
  variant = 'testimonials-grid'
}) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const handleTestimonialChange = (index: number, field: string, value: string | number) => {
    const updatedTestimonials = [...content.testimonials];
    updatedTestimonials[index] = { ...updatedTestimonials[index], [field]: value };
    handleChange('testimonials', updatedTestimonials);
  };

  const addTestimonial = () => {
    const newTestimonial: Testimonial = {
      name: 'New Customer',
      role: 'Customer',
      content: 'This is an amazing service that has helped our business grow.',
      rating: 5
    };
    handleChange('testimonials', [...content.testimonials, newTestimonial]);
  };

  const removeTestimonial = (index: number) => {
    const updatedTestimonials = content.testimonials.filter((_, i) => i !== index);
    handleChange('testimonials', updatedTestimonials);
  };

  // Grid Layout
  const renderGridTestimonials = () => (
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl p-8 transition-shadow duration-300 relative group"
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
            >
              {isEditing && (
                <button
                  onClick={() => removeTestimonial(index)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ 
                    backgroundColor: theme?.colors?.error,
                    color: '#ffffff'
                  }}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              
              <div className="flex items-center gap-1 mb-6">
                {isEditing ? (
                  <select
                    value={testimonial.rating || 5}
                    onChange={(e) => handleTestimonialChange(index, 'rating', parseInt(e.target.value))}
                    className="bg-transparent border rounded px-2 py-1 text-sm"
                    style={{ 
                      borderColor: theme?.colors?.border,
                      color: theme?.colors?.text
                    }}
                  >
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                  </select>
                ) : (
                  [...Array(testimonial.rating || 5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 fill-current" 
                      style={{ color: theme?.colors?.warning || '#f59e0b' }}
                    />
                  ))
                )}
              </div>
              
              {isEditing ? (
                <textarea
                  value={testimonial.content}
                  onChange={(e) => handleTestimonialChange(index, 'content', e.target.value)}
                  className="leading-relaxed mb-6 bg-transparent border-2 border-dashed rounded-lg p-2 w-full h-32 resize-none"
                  style={{ 
                    color: theme?.colors?.text,
                    borderColor: `${theme?.colors?.primary}50`,
                    fontFamily: theme?.fonts?.secondary
                  }}
                  placeholder="Testimonial content"
                />
              ) : (
                <p 
                  className="leading-relaxed mb-6"
                  style={{ 
                    color: theme?.colors?.text,
                    fontFamily: theme?.fonts?.secondary
                  }}
                >
                  "{testimonial.content}"
                </p>
              )}
              
              <div className="flex items-center gap-4">
                {isEditing ? (
                  <ImageUpload
                    value={testimonial.avatar || ''}
                    onChange={(url) => handleTestimonialChange(index, 'avatar', url)}
                    placeholder="Add avatar"
                    className="w-12 h-12"
                    theme={theme}
                  />
                ) : testimonial.avatar ? (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                    style={{ boxShadow: theme?.shadows?.sm }}
                  />
                ) : (
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ 
                      background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                      color: '#ffffff'
                    }}
                  >
                    <span className="text-lg font-semibold">{testimonial.name.charAt(0)}</span>
                  </div>
                )}
                
                <div>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={testimonial.name}
                        onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)}
                        className="font-semibold bg-transparent border-2 border-dashed rounded-lg p-1 w-full text-sm mb-1"
                        style={{ 
                          color: theme?.colors?.text,
                          borderColor: `${theme?.colors?.primary}50`,
                          fontFamily: theme?.fonts?.primary
                        }}
                        placeholder="Customer name"
                      />
                      <input
                        type="text"
                        value={testimonial.role}
                        onChange={(e) => handleTestimonialChange(index, 'role', e.target.value)}
                        className="bg-transparent border-2 border-dashed rounded-lg p-1 w-full text-sm"
                        style={{ 
                          color: theme?.colors?.textSecondary,
                          borderColor: `${theme?.colors?.primary}50`,
                          fontFamily: theme?.fonts?.secondary
                        }}
                        placeholder="Customer role"
                      />
                    </>
                  ) : (
                    <>
                      <div 
                        className="font-semibold"
                        style={{ 
                          color: theme?.colors?.text,
                          fontFamily: theme?.fonts?.primary
                        }}
                      >
                        {testimonial.name}
                      </div>
                      <div 
                        className="text-sm"
                        style={{ 
                          color: theme?.colors?.textSecondary,
                          fontFamily: theme?.fonts?.secondary
                        }}
                      >
                        {testimonial.role}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          
          {isEditing && (
            <motion.button
              onClick={addTestimonial}
              className="border-2 border-dashed rounded-xl p-8 transition-all duration-200 flex items-center justify-center"
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
                <Plus className="w-8 h-8 mx-auto mb-2" style={{ color: theme?.colors?.textSecondary }} />
                <span style={{ color: theme?.colors?.textSecondary }}>Add Testimonial</span>
              </div>
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );

  // Featured Testimonial
  const renderFeaturedTestimonial = () => (
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

        {/* Featured Testimonial */}
        {content.testimonials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div 
              className="rounded-3xl p-8 sm:p-12 relative"
              style={{ 
                backgroundColor: theme?.colors?.background,
                boxShadow: theme?.shadows?.xl
              }}
            >
              {/* Quote Icon */}
              <div 
                className="absolute top-8 left-8 w-16 h-16 rounded-full flex items-center justify-center opacity-10"
                style={{ backgroundColor: theme?.colors?.primary }}
              >
                <Quote className="w-8 h-8" style={{ color: theme?.colors?.primary }} />
              </div>

              {isEditing ? (
                <textarea
                  value={content.testimonials[0].content}
                  onChange={(e) => handleTestimonialChange(0, 'content', e.target.value)}
                  className="text-xl sm:text-2xl leading-relaxed mb-8 bg-transparent border-2 border-dashed rounded-lg p-4 w-full h-40 resize-none"
                  style={{ 
                    color: theme?.colors?.text,
                    borderColor: `${theme?.colors?.primary}50`,
                    fontFamily: theme?.fonts?.secondary
                  }}
                  placeholder="Testimonial content"
                />
              ) : (
                <blockquote 
                  className="text-xl sm:text-2xl leading-relaxed mb-8 pl-16"
                  style={{ 
                    color: theme?.colors?.text,
                    fontFamily: theme?.fonts?.secondary
                  }}
                >
                  "{content.testimonials[0].content}"
                </blockquote>
              )}

              <div className="flex items-center gap-4 pl-16">
                {isEditing ? (
                  <ImageUpload
                    value={content.testimonials[0].avatar || ''}
                    onChange={(url) => handleTestimonialChange(0, 'avatar', url)}
                    placeholder="Add avatar"
                    className="w-16 h-16"
                    theme={theme}
                  />
                ) : content.testimonials[0].avatar ? (
                  <img
                    src={content.testimonials[0].avatar}
                    alt={content.testimonials[0].name}
                    className="w-16 h-16 rounded-full object-cover"
                    style={{ boxShadow: theme?.shadows?.md }}
                  />
                ) : (
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ 
                      background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                      color: '#ffffff'
                    }}
                  >
                    <span className="text-xl font-semibold">{content.testimonials[0].name.charAt(0)}</span>
                  </div>
                )}
                
                <div>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={content.testimonials[0].name}
                        onChange={(e) => handleTestimonialChange(0, 'name', e.target.value)}
                        className="text-lg font-semibold bg-transparent border-2 border-dashed rounded-lg p-1 w-full mb-1"
                        style={{ 
                          color: theme?.colors?.text,
                          borderColor: `${theme?.colors?.primary}50`,
                          fontFamily: theme?.fonts?.primary
                        }}
                        placeholder="Customer name"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={content.testimonials[0].role}
                          onChange={(e) => handleTestimonialChange(0, 'role', e.target.value)}
                          className="bg-transparent border-2 border-dashed rounded-lg p-1 text-sm flex-1"
                          style={{ 
                            color: theme?.colors?.textSecondary,
                            borderColor: `${theme?.colors?.primary}50`,
                            fontFamily: theme?.fonts?.secondary
                          }}
                          placeholder="Customer role"
                        />
                        <input
                          type="text"
                          value={content.testimonials[0].company || ''}
                          onChange={(e) => handleTestimonialChange(0, 'company', e.target.value)}
                          className="bg-transparent border-2 border-dashed rounded-lg p-1 text-sm flex-1"
                          style={{ 
                            color: theme?.colors?.textSecondary,
                            borderColor: `${theme?.colors?.primary}50`,
                            fontFamily: theme?.fonts?.secondary
                          }}
                          placeholder="Company"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div 
                        className="text-lg font-semibold"
                        style={{ 
                          color: theme?.colors?.text,
                          fontFamily: theme?.fonts?.primary
                        }}
                      >
                        {content.testimonials[0].name}
                      </div>
                      <div 
                        className="text-sm"
                        style={{ 
                          color: theme?.colors?.textSecondary,
                          fontFamily: theme?.fonts?.secondary
                        }}
                      >
                        {content.testimonials[0].role}
                        {content.testimonials[0].company && `, ${content.testimonials[0].company}`}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Additional Testimonials */}
        {content.testimonials.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {content.testimonials.slice(1).map((testimonial, index) => (
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
                    onClick={() => removeTestimonial(index + 1)}
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
                  <textarea
                    value={testimonial.content}
                    onChange={(e) => handleTestimonialChange(index + 1, 'content', e.target.value)}
                    className="leading-relaxed mb-4 bg-transparent border-2 border-dashed rounded-lg p-2 w-full h-24 resize-none"
                    style={{ 
                      color: theme?.colors?.text,
                      borderColor: `${theme?.colors?.primary}50`,
                      fontFamily: theme?.fonts?.secondary
                    }}
                    placeholder="Testimonial content"
                  />
                ) : (
                  <p 
                    className="leading-relaxed mb-4"
                    style={{ 
                      color: theme?.colors?.text,
                      fontFamily: theme?.fonts?.secondary
                    }}
                  >
                    "{testimonial.content}"
                  </p>
                )}
                
                <div className="flex items-center gap-3">
                  {isEditing ? (
                    <ImageUpload
                      value={testimonial.avatar || ''}
                      onChange={(url) => handleTestimonialChange(index + 1, 'avatar', url)}
                      placeholder="Add avatar"
                      className="w-10 h-10"
                      theme={theme}
                    />
                  ) : testimonial.avatar ? (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                      style={{ boxShadow: theme?.shadows?.sm }}
                    />
                  ) : (
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ 
                        background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                        color: '#ffffff'
                      }}
                    >
                      <span className="text-sm font-semibold">{testimonial.name.charAt(0)}</span>
                    </div>
                  )}
                  
                  <div>
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={testimonial.name}
                          onChange={(e) => handleTestimonialChange(index + 1, 'name', e.target.value)}
                          className="font-semibold bg-transparent border-2 border-dashed rounded-lg p-1 w-full text-sm mb-1"
                          style={{ 
                            color: theme?.colors?.text,
                            borderColor: `${theme?.colors?.primary}50`,
                            fontFamily: theme?.fonts?.primary
                          }}
                          placeholder="Customer name"
                        />
                        <input
                          type="text"
                          value={testimonial.role}
                          onChange={(e) => handleTestimonialChange(index + 1, 'role', e.target.value)}
                          className="bg-transparent border-2 border-dashed rounded-lg p-1 w-full text-xs"
                          style={{ 
                            color: theme?.colors?.textSecondary,
                            borderColor: `${theme?.colors?.primary}50`,
                            fontFamily: theme?.fonts?.secondary
                          }}
                          placeholder="Customer role"
                        />
                      </>
                    ) : (
                      <>
                        <div 
                          className="font-semibold text-sm"
                          style={{ 
                            color: theme?.colors?.text,
                            fontFamily: theme?.fonts?.primary
                          }}
                        >
                          {testimonial.name}
                        </div>
                        <div 
                          className="text-xs"
                          style={{ 
                            color: theme?.colors?.textSecondary,
                            fontFamily: theme?.fonts?.secondary
                          }}
                        >
                          {testimonial.role}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {isEditing && (
              <motion.button
                onClick={addTestimonial}
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
                  <span className="text-sm" style={{ color: theme?.colors?.textSecondary }}>Add Testimonial</span>
                </div>
              </motion.button>
            )}
          </div>
        )}
      </div>
    </section>
  );

  // Wall Layout
  const renderWallTestimonials = () => (
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

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {content.testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="break-inside-avoid mb-6 rounded-xl p-6 transition-shadow duration-300 relative group"
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
            >
              {isEditing && (
                <button
                  onClick={() => removeTestimonial(index)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ 
                    backgroundColor: theme?.colors?.error,
                    color: '#ffffff'
                  }}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              
              {/* Rating Stars */}
              {(testimonial.rating || isEditing) && (
                <div className="flex items-center gap-1 mb-4">
                  {isEditing ? (
                    <select
                      value={testimonial.rating || 5}
                      onChange={(e) => handleTestimonialChange(index, 'rating', parseInt(e.target.value))}
                      className="bg-transparent border rounded px-2 py-1 text-sm"
                      style={{ 
                        borderColor: theme?.colors?.border,
                        color: theme?.colors?.text
                      }}
                    >
                      <option value="1">1 Star</option>
                      <option value="2">2 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="5">5 Stars</option>
                    </select>
                  ) : (
                    [...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-4 h-4 fill-current" 
                        style={{ color: theme?.colors?.warning || '#f59e0b' }}
                      />
                    ))
                  )}
                </div>
              )}
              
              {isEditing ? (
                <textarea
                  value={testimonial.content}
                  onChange={(e) => handleTestimonialChange(index, 'content', e.target.value)}
                  className="leading-relaxed mb-4 bg-transparent border-2 border-dashed rounded-lg p-2 w-full h-24 resize-none"
                  style={{ 
                    color: theme?.colors?.text,
                    borderColor: `${theme?.colors?.primary}50`,
                    fontFamily: theme?.fonts?.secondary
                  }}
                  placeholder="Testimonial content"
                />
              ) : (
                <p 
                  className="leading-relaxed mb-4"
                  style={{ 
                    color: theme?.colors?.text,
                    fontFamily: theme?.fonts?.secondary
                  }}
                >
                  "{testimonial.content}"
                </p>
              )}
              
              <div className="flex items-center gap-3">
                {isEditing ? (
                  <ImageUpload
                    value={testimonial.avatar || ''}
                    onChange={(url) => handleTestimonialChange(index, 'avatar', url)}
                    placeholder="Add avatar"
                    className="w-10 h-10"
                    theme={theme}
                  />
                ) : testimonial.avatar ? (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                    style={{ boxShadow: theme?.shadows?.sm }}
                  />
                ) : (
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ 
                      background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                      color: '#ffffff'
                    }}
                  >
                    <span className="text-sm font-semibold">{testimonial.name.charAt(0)}</span>
                  </div>
                )}
                
                <div>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={testimonial.name}
                        onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)}
                        className="font-semibold bg-transparent border-2 border-dashed rounded-lg p-1 w-full text-sm mb-1"
                        style={{ 
                          color: theme?.colors?.text,
                          borderColor: `${theme?.colors?.primary}50`,
                          fontFamily: theme?.fonts?.primary
                        }}
                        placeholder="Customer name"
                      />
                      <input
                        type="text"
                        value={testimonial.role}
                        onChange={(e) => handleTestimonialChange(index, 'role', e.target.value)}
                        className="bg-transparent border-2 border-dashed rounded-lg p-1 w-full text-xs"
                        style={{ 
                          color: theme?.colors?.textSecondary,
                          borderColor: `${theme?.colors?.primary}50`,
                          fontFamily: theme?.fonts?.secondary
                        }}
                        placeholder="Customer role"
                      />
                    </>
                  ) : (
                    <>
                      <div 
                        className="font-semibold text-sm"
                        style={{ 
                          color: theme?.colors?.text,
                          fontFamily: theme?.fonts?.primary
                        }}
                      >
                        {testimonial.name}
                      </div>
                      <div 
                        className="text-xs"
                        style={{ 
                          color: theme?.colors?.textSecondary,
                          fontFamily: theme?.fonts?.secondary
                        }}
                      >
                        {testimonial.role}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          
          {isEditing && (
            <motion.button
              onClick={addTestimonial}
              className="border-2 border-dashed rounded-xl p-6 transition-all duration-200 flex items-center justify-center w-full mb-6 break-inside-avoid"
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
                <span className="text-sm" style={{ color: theme?.colors?.textSecondary }}>Add Testimonial</span>
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
      handleChange('subtitle', 'See what our customers have to say about us');
    }
    
    // Ensure we have at least one testimonial
    if (content.testimonials.length === 0) {
      addTestimonial();
    }
  }, []);

  switch (variant) {
    case 'testimonials-featured':
      return renderFeaturedTestimonial();
    case 'testimonials-wall':
      return renderWallTestimonials();
    default:
      return renderGridTestimonials();
  }
};

export default TestimonialsSection;