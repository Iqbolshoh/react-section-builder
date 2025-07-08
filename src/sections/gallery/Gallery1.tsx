import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryItem {
  image: string;
  title: string;
  category: string;
  description?: string;
}

interface Gallery1Props {
  title: string;
  subtitle?: string;
  items: GalleryItem[];
  categories: string[];
  customData?: any;
}

const Gallery1: React.FC<Gallery1Props> = ({
  title,
  subtitle,
  items,
  categories,
  customData
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState<string | null>(null);
  const [lightboxDescription, setLightboxDescription] = useState<string | null>(null);
  
  const bgColor = customData?.bgColor || '#ffffff';
  const textColor = customData?.textColor || '#1f2937';
  const accentColor = customData?.accentColor || '#3b82f6';
  const secondaryTextColor = customData?.secondaryTextColor || '#6b7280';
  
  const filteredItems = selectedCategory === 'All' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  const allCategories = ['All', ...categories];

  const openLightbox = (item: GalleryItem) => {
    setLightboxImage(item.image);
    setLightboxTitle(item.title);
    setLightboxDescription(item.description || null);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setLightboxTitle(null);
    setLightboxDescription(null);
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
            {subtitle && (
              <p 
                className="text-lg sm:text-xl max-w-3xl mx-auto"
                style={{ color: secondaryTextColor }}
              >
                {subtitle}
              </p>
            )}
          </motion.div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
              style={{
                backgroundColor: selectedCategory === category ? accentColor : bgColor,
                color: selectedCategory === category ? '#ffffff' : textColor,
                border: `1px solid ${selectedCategory === category ? accentColor : '#e5e7eb'}`
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer"
              onClick={() => openLightbox(item)}
            >
              <div 
                className="relative overflow-hidden rounded-xl aspect-square"
                style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div 
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center"
                >
                  <svg 
                    className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>

              <div className="mt-3">
                <h3 
                  className="text-lg font-semibold mb-1"
                  style={{ color: textColor }}
                >
                  {item.title}
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: secondaryTextColor }}
                >
                  {item.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="max-w-5xl w-full flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.img
                  src={lightboxImage}
                  alt={lightboxTitle || 'Gallery'}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg"
                />
                
                {(lightboxTitle || lightboxDescription) && (
                  <div 
                    className="mt-4 p-4 rounded-lg text-center max-w-2xl"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    {lightboxTitle && (
                      <h3 
                        className="text-xl font-semibold mb-2 text-white"
                      >
                        {lightboxTitle}
                      </h3>
                    )}
                    {lightboxDescription && (
                      <p className="text-white/80">
                        {lightboxDescription}
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
              
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery1;