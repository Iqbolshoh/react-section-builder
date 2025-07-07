import React from 'react';
import { motion } from 'framer-motion';
import { Star, Plus, X } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar?: string;
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

interface TestimonialsSectionProps {
  content: {
    title: string;
    testimonials: Testimonial[];
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ content, isEditing, onChange, theme }) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const handleTestimonialChange = (index: number, field: string, value: string) => {
    const updatedTestimonials = [...content.testimonials];
    updatedTestimonials[index] = { ...updatedTestimonials[index], [field]: value };
    handleChange('testimonials', updatedTestimonials);
  };

  const addTestimonial = () => {
    const newTestimonial: Testimonial = {
      name: 'New Customer',
      role: 'Customer',
      content: 'This is an amazing service that has helped our business grow.'
    };
    handleChange('testimonials', [...content.testimonials, newTestimonial]);
  };

  const removeTestimonial = (index: number) => {
    const updatedTestimonials = content.testimonials.filter((_, i) => i !== index);
    handleChange('testimonials', updatedTestimonials);
  };

  return (
    <section 
      className="py-20" 
      style={{ 
        backgroundColor: theme?.colors?.background || '#f9fafb',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {isEditing ? (
              <input
                type="text"
                value={content.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="text-3xl sm:text-4xl font-bold mb-4 bg-transparent border-2 border-dashed rounded-lg p-2 text-center"
                style={{ 
                  color: theme?.colors?.primary,
                  borderColor: `${theme?.colors?.primary}50`,
                  fontFamily: theme?.fonts?.primary
                }}
                placeholder="Enter section title"
              />
            ) : (
              <h2 
                className="text-3xl sm:text-4xl font-bold mb-4"
                style={{ 
                  color: theme?.colors?.primary,
                  fontFamily: theme?.fonts?.primary
                }}
              >
                {content.title}
              </h2>
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
            >
              {isEditing && (
                <button
                  onClick={() => removeTestimonial(index)}
                  className="absolute top-2 right-2 w-6 h-6 text-white rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: theme?.colors?.error }}
                >
                  ×
                </button>
              )}
              
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-5 h-5 fill-current" 
                    style={{ color: theme?.colors?.warning || '#f59e0b' }}
                  />
                ))}
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
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})` }}
                >
                  <span 
                    className="text-white font-semibold"
                    style={{ fontFamily: theme?.fonts?.accent }}
                  >
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
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
};

export default TestimonialsSection;