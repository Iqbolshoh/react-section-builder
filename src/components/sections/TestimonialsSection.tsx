import React from 'react';
import { motion } from 'framer-motion';
import { Star, Plus, X } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar?: string;
}

interface TestimonialsSectionProps {
  content: {
    title: string;
    testimonials: Testimonial[];
  };
  isEditing: boolean;
  onChange: (content: any) => void;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ content, isEditing, onChange }) => {
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
    <section className="py-20 bg-gray-50">
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
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 bg-transparent border-2 border-dashed border-blue-300 rounded-lg p-2 text-center"
                placeholder="Enter section title"
              />
            ) : (
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
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
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 relative group"
            >
              {isEditing && (
                <button
                  onClick={() => removeTestimonial(index)}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              )}
              
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              {isEditing ? (
                <textarea
                  value={testimonial.content}
                  onChange={(e) => handleTestimonialChange(index, 'content', e.target.value)}
                  className="text-gray-700 leading-relaxed mb-6 bg-transparent border-2 border-dashed border-blue-300 rounded-lg p-2 w-full h-32 resize-none"
                  placeholder="Testimonial content"
                />
              ) : (
                <p className="text-gray-700 leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>
              )}
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
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
                        className="font-semibold text-gray-900 bg-transparent border-2 border-dashed border-blue-300 rounded-lg p-1 w-full text-sm mb-1"
                        placeholder="Customer name"
                      />
                      <input
                        type="text"
                        value={testimonial.role}
                        onChange={(e) => handleTestimonialChange(index, 'role', e.target.value)}
                        className="text-gray-600 bg-transparent border-2 border-dashed border-blue-300 rounded-lg p-1 w-full text-sm"
                        placeholder="Customer role"
                      />
                    </>
                  ) : (
                    <>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-600 text-sm">{testimonial.role}</div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          
          {isEditing && (
            <motion.button
              onClick={addTestimonial}
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <span className="text-gray-600">Add Testimonial</span>
              </div>
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;