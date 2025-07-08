import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Plus, X } from 'lucide-react';

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

interface SliderSectionProps {
  content: {
    title: string;
    slides: any[];
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
  variant?: string;
}

const SliderSection: React.FC<SliderSectionProps> = ({ 
  content, 
  isEditing, 
  onChange, 
  theme,
  variant = 'slider-testimonials'
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!isEditing && content.slides.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % content.slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isEditing, content.slides.length]);

  const handleChange = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const handleSlideChange = (index: number, field: string, value: any) => {
    const updatedSlides = [...content.slides];
    updatedSlides[index] = { ...updatedSlides[index], [field]: value };
    handleChange('slides', updatedSlides);
  };

  const addSlide = () => {
    const newSlide = getDefaultSlide(variant);
    handleChange('slides', [...content.slides, newSlide]);
  };

  const removeSlide = (index: number) => {
    const updatedSlides = content.slides.filter((_, i) => i !== index);
    handleChange('slides', updatedSlides);
    if (currentSlide >= updatedSlides.length) {
      setCurrentSlide(Math.max(0, updatedSlides.length - 1));
    }
  };

  const getDefaultSlide = (variant: string) => {
    switch (variant) {
      case 'slider-testimonials':
        return {
          name: 'New Customer',
          role: 'Customer',
          content: 'This is an amazing service!',
          rating: 5,
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
        };
      case 'slider-portfolio':
        return {
          title: 'New Project',
          description: 'Project description',
          image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
          category: 'Web Design'
        };
      case 'slider-features':
        return {
          title: 'New Feature',
          description: 'Feature description',
          icon: 'Star',
          image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
        };
      default:
        return {};
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % content.slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + content.slides.length) % content.slides.length);
  };

  const renderTestimonialSlider = () => (
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
          ) : (
            <h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" 
              style={{ 
                color: theme?.colors?.primary,
                fontFamily: theme?.fonts?.primary
              }}
            >
              {content.title}
            </h2>
          )}
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {content.slides.length > 0 && (
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl p-6 sm:p-8 lg:p-12"
                style={{
                  backgroundColor: theme?.colors?.surface,
                  boxShadow: theme?.shadows?.xl
                }}
              >
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 
                        className="text-lg font-semibold"
                        style={{ 
                          color: theme?.colors?.text,
                          fontFamily: theme?.fonts?.primary
                        }}
                      >
                        Slide {currentSlide + 1}
                      </h3>
                      <button
                        onClick={() => removeSlide(currentSlide)}
                        className="transition-colors"
                        style={{ color: theme?.colors?.error }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = theme?.colors?.error || '#ef4444';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = theme?.colors?.error || '#ef4444';
                        }}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <textarea
                      value={content.slides[currentSlide]?.content || ''}
                      onChange={(e) => handleSlideChange(currentSlide, 'content', e.target.value)}
                      className="w-full p-4 border border-gray-300 rounded-lg h-32 resize-none"
                      style={{ 
                        borderColor: theme?.colors?.border,
                        color: theme?.colors?.text,
                        backgroundColor: theme?.colors?.surface,
                        fontFamily: theme?.fonts?.secondary
                      }}
                      placeholder="Testimonial content"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={content.slides[currentSlide]?.name || ''}
                        onChange={(e) => handleSlideChange(currentSlide, 'name', e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg"
                        style={{ 
                          borderColor: theme?.colors?.border,
                          color: theme?.colors?.text,
                          backgroundColor: theme?.colors?.surface,
                          fontFamily: theme?.fonts?.primary
                        }}
                        placeholder="Customer name"
                      />
                      <input
                        type="text"
                        value={content.slides[currentSlide]?.role || ''}
                        onChange={(e) => handleSlideChange(currentSlide, 'role', e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg"
                        style={{ 
                          borderColor: theme?.colors?.border,
                          color: theme?.colors?.textSecondary,
                          backgroundColor: theme?.colors?.surface,
                          fontFamily: theme?.fonts?.secondary
                        }}
                        placeholder="Customer role"
                      />
                    </div>
                    <input
                      type="url"
                      value={content.slides[currentSlide]?.avatar || ''}
                      onChange={(e) => handleSlideChange(currentSlide, 'avatar', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      style={{ 
                        borderColor: theme?.colors?.border,
                        color: theme?.colors?.text,
                        backgroundColor: theme?.colors?.surface
                      }}
                      placeholder="Avatar URL"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-5 h-5 fill-current" 
                          style={{ color: theme?.colors?.warning || '#f59e0b' }}
                        />
                      ))}
                    </div>
                    <blockquote 
                      className="text-lg sm:text-xl lg:text-2xl mb-8 leading-relaxed"
                      style={{ 
                        color: theme?.colors?.text,
                        fontFamily: theme?.fonts?.secondary
                      }}
                    >
                      "{content.slides[currentSlide]?.content}"
                    </blockquote>
                    <div className="flex items-center justify-center gap-4">
                      <img
                        src={content.slides[currentSlide]?.avatar}
                        alt={content.slides[currentSlide]?.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                      />
                      <div className="text-left">
                        <div 
                          className="font-semibold text-lg"
                          style={{ 
                            color: theme?.colors?.text,
                            fontFamily: theme?.fonts?.primary
                          }}
                        >
                          {content.slides[currentSlide]?.name}
                        </div>
                        <div 
                          style={{ 
                            color: theme?.colors?.textSecondary,
                            fontFamily: theme?.fonts?.secondary
                          }}
                        >
                          {content.slides[currentSlide]?.role}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {content.slides.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 sm:-translate-x-12 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-shadow"
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
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: theme?.colors?.textSecondary }} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 sm:translate-x-12 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-shadow"
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
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: theme?.colors?.textSecondary }} />
              </button>
            </>
          )}

          {/* Dots */}
          {content.slides.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {content.slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors`}
                  style={{
                    backgroundColor: index === currentSlide ? theme?.colors?.primary : theme?.colors?.border
                  }}
                />
              ))}
            </div>
          )}

          {/* Add Slide Button */}
          {isEditing && (
            <div className="text-center mt-8">
              <button
                onClick={addSlide}
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
                Add Slide
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );

  const renderPortfolioSlider = () => (
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
          ) : (
            <h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" 
              style={{ 
                color: theme?.colors?.primary,
                fontFamily: theme?.fonts?.primary
              }}
            >
              {content.title}
            </h2>
          )}
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              {content.slides.length > 0 && (
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  {isEditing ? (
                    <div 
                      className="p-6 rounded-2xl"
                      style={{ backgroundColor: theme?.colors?.background }}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 
                            className="text-lg font-semibold"
                            style={{ 
                              color: theme?.colors?.text,
                              fontFamily: theme?.fonts?.primary
                            }}
                          >
                            Project {currentSlide + 1}
                          </h3>
                          <button
                            onClick={() => removeSlide(currentSlide)}
                            className="transition-colors"
                            style={{ color: theme?.colors?.error }}
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <input
                          type="url"
                          value={content.slides[currentSlide]?.image || ''}
                          onChange={(e) => handleSlideChange(currentSlide, 'image', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          style={{ 
                            borderColor: theme?.colors?.border,
                            color: theme?.colors?.text,
                            backgroundColor: theme?.colors?.surface
                          }}
                          placeholder="Project image URL"
                        />
                        <input
                          type="text"
                          value={content.slides[currentSlide]?.title || ''}
                          onChange={(e) => handleSlideChange(currentSlide, 'title', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          style={{ 
                            borderColor: theme?.colors?.border,
                            color: theme?.colors?.text,
                            backgroundColor: theme?.colors?.surface,
                            fontFamily: theme?.fonts?.primary
                          }}
                          placeholder="Project title"
                        />
                        <textarea
                          value={content.slides[currentSlide]?.description || ''}
                          onChange={(e) => handleSlideChange(currentSlide, 'description', e.target.value)}
                          className="w-full p-4 border border-gray-300 rounded-lg h-24 resize-none"
                          style={{ 
                            borderColor: theme?.colors?.border,
                            color: theme?.colors?.textSecondary,
                            backgroundColor: theme?.colors?.surface,
                            fontFamily: theme?.fonts?.secondary
                          }}
                          placeholder="Project description"
                        />
                        <input
                          type="text"
                          value={content.slides[currentSlide]?.category || ''}
                          onChange={(e) => handleSlideChange(currentSlide, 'category', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          style={{ 
                            borderColor: theme?.colors?.border,
                            color: theme?.colors?.primary,
                            backgroundColor: theme?.colors?.surface,
                            fontFamily: theme?.fonts?.secondary
                          }}
                          placeholder="Project category"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <img
                        src={content.slides[currentSlide]?.image}
                        alt={content.slides[currentSlide]?.title}
                        className="w-full h-64 sm:h-96 lg:h-[500px] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                        <div className="max-w-2xl">
                          <span 
                            className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4"
                            style={{ fontFamily: theme?.fonts?.secondary }}
                          >
                            {content.slides[currentSlide]?.category}
                          </span>
                          <h3 
                            className="text-2xl sm:text-3xl font-bold mb-4"
                            style={{ fontFamily: theme?.fonts?.primary }}
                          >
                            {content.slides[currentSlide]?.title}
                          </h3>
                          <p 
                            className="text-lg opacity-90"
                            style={{ fontFamily: theme?.fonts?.secondary }}
                          >
                            {content.slides[currentSlide]?.description}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation and controls same as testimonial slider */}
          {content.slides.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
            </>
          )}

          {content.slides.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {content.slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors`}
                  style={{
                    backgroundColor: index === currentSlide ? theme?.colors?.primary : theme?.colors?.border
                  }}
                />
              ))}
            </div>
          )}

          {isEditing && (
            <div className="text-center mt-8">
              <button
                onClick={addSlide}
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
                Add Project
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );

  switch (variant) {
    case 'slider-portfolio':
      return renderPortfolioSlider();
    case 'slider-features':
      return renderPortfolioSlider(); // Similar layout for features
    default:
      return renderTestimonialSlider();
  }
};

export default SliderSection;