import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Plus, X } from 'lucide-react';

interface SliderSectionProps {
  content: {
    title: string;
    slides: any[];
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: any;
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
    <section className="py-12 sm:py-20 bg-gray-50" style={{ fontFamily: theme?.fontFamily }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-16">
          {isEditing ? (
            <input
              type="text"
              value={content.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 bg-transparent border-2 border-dashed border-blue-300 rounded-lg p-2 text-center w-full max-w-2xl mx-auto"
              placeholder="Enter section title"
            />
          ) : (
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4" style={{ color: theme?.primaryColor }}>
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
                className="bg-white rounded-2xl p-6 sm:p-8 lg:p-12 shadow-xl"
              >
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Slide {currentSlide + 1}</h3>
                      <button
                        onClick={() => removeSlide(currentSlide)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <textarea
                      value={content.slides[currentSlide]?.content || ''}
                      onChange={(e) => handleSlideChange(currentSlide, 'content', e.target.value)}
                      className="w-full p-4 border border-gray-300 rounded-lg h-32 resize-none"
                      placeholder="Testimonial content"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={content.slides[currentSlide]?.name || ''}
                        onChange={(e) => handleSlideChange(currentSlide, 'name', e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="Customer name"
                      />
                      <input
                        type="text"
                        value={content.slides[currentSlide]?.role || ''}
                        onChange={(e) => handleSlideChange(currentSlide, 'role', e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="Customer role"
                      />
                    </div>
                    <input
                      type="url"
                      value={content.slides[currentSlide]?.avatar || ''}
                      onChange={(e) => handleSlideChange(currentSlide, 'avatar', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="Avatar URL"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-lg sm:text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed">
                      "{content.slides[currentSlide]?.content}"
                    </blockquote>
                    <div className="flex items-center justify-center gap-4">
                      <img
                        src={content.slides[currentSlide]?.avatar}
                        alt={content.slides[currentSlide]?.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                      />
                      <div className="text-left">
                        <div className="font-semibold text-gray-900 text-lg">
                          {content.slides[currentSlide]?.name}
                        </div>
                        <div className="text-gray-600">
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
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 sm:-translate-x-12 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 sm:translate-x-12 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
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
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Add Slide Button */}
          {isEditing && (
            <div className="text-center mt-8">
              <button
                onClick={addSlide}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
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
    <section className="py-12 sm:py-20 bg-white" style={{ fontFamily: theme?.fontFamily }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-16">
          {isEditing ? (
            <input
              type="text"
              value={content.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 bg-transparent border-2 border-dashed border-blue-300 rounded-lg p-2 text-center w-full max-w-2xl mx-auto"
              placeholder="Enter section title"
            />
          ) : (
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4" style={{ color: theme?.primaryColor }}>
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
                    <div className="bg-gray-100 p-6 rounded-2xl">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">Project {currentSlide + 1}</h3>
                          <button
                            onClick={() => removeSlide(currentSlide)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <input
                          type="url"
                          value={content.slides[currentSlide]?.image || ''}
                          onChange={(e) => handleSlideChange(currentSlide, 'image', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Project image URL"
                        />
                        <input
                          type="text"
                          value={content.slides[currentSlide]?.title || ''}
                          onChange={(e) => handleSlideChange(currentSlide, 'title', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Project title"
                        />
                        <textarea
                          value={content.slides[currentSlide]?.description || ''}
                          onChange={(e) => handleSlideChange(currentSlide, 'description', e.target.value)}
                          className="w-full p-4 border border-gray-300 rounded-lg h-24 resize-none"
                          placeholder="Project description"
                        />
                        <input
                          type="text"
                          value={content.slides[currentSlide]?.category || ''}
                          onChange={(e) => handleSlideChange(currentSlide, 'category', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
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
                          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                            {content.slides[currentSlide]?.category}
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                            {content.slides[currentSlide]?.title}
                          </h3>
                          <p className="text-lg opacity-90">
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
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
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
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}

          {isEditing && (
            <div className="text-center mt-8">
              <button
                onClick={addSlide}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
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