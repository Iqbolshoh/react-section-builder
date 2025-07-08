import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar?: string;
  rating?: number;
}

interface Slider1Props {
  title: string;
  slides: Testimonial[];
  customData?: any;
}

const Slider1: React.FC<Slider1Props> = ({
  title,
  slides,
  customData
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const bgColor = customData?.bgColor || '#f9fafb';
  const textColor = customData?.textColor || '#1f2937';
  const accentColor = customData?.accentColor || '#3b82f6';
  const surfaceColor = customData?.surfaceColor || '#ffffff';
  
  useEffect(() => {
    if (slides.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section 
      className="py-12 sm:py-20"
      style={{ 
        backgroundColor: bgColor,
        color: textColor
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
              style={{ color: accentColor }}
            >
              {title}
            </h2>
          </motion.div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {slides.length > 0 && (
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl p-6 sm:p-8 lg:p-12"
                style={{
                  backgroundColor: surfaceColor,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className="w-5 h-5" 
                        fill={i < (slides[currentSlide].rating || 5) ? 'currentColor' : 'none'} 
                        stroke="currentColor" 
                        style={{ color: '#f59e0b' }}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote 
                    className="text-lg sm:text-xl lg:text-2xl mb-8 leading-relaxed"
                    style={{ color: textColor }}
                  >
                    "{slides[currentSlide].content}"
                  </blockquote>
                  <div className="flex items-center justify-center gap-4">
                    {slides[currentSlide].avatar ? (
                      <img
                        src={slides[currentSlide].avatar}
                        alt={slides[currentSlide].name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div 
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
                        style={{ 
                          background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)` 
                        }}
                      >
                        {slides[currentSlide].name.charAt(0)}
                      </div>
                    )}
                    <div className="text-left">
                      <div 
                        className="font-semibold text-lg"
                        style={{ color: textColor }}
                      >
                        {slides[currentSlide].name}
                      </div>
                      <div 
                        style={{ color: `${textColor}99` }}
                      >
                        {slides[currentSlide].role}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {slides.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 sm:-translate-x-12 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-shadow"
                style={{
                  backgroundColor: surfaceColor,
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 sm:translate-x-12 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-shadow"
                style={{
                  backgroundColor: surfaceColor,
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Dots */}
          {slides.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className="w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors"
                  style={{
                    backgroundColor: index === currentSlide ? accentColor : '#d1d5db'
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Slider1;