import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, ZoomIn } from 'lucide-react';
import ImageUpload from '../ImageUpload';

interface GalleryItem {
  image: string;
  title: string;
  category: string;
}

interface GallerySectionProps {
  content: {
    title: string;
    subtitle?: string;
    items: GalleryItem[];
    categories: string[];
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: any;
  variant?: string;
}

const GallerySection: React.FC<GallerySectionProps> = ({ 
  content, 
  isEditing, 
  onChange, 
  theme,
  variant = 'gallery-grid'
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const handleChange = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    const updatedItems = [...content.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    handleChange('items', updatedItems);
  };

  const addItem = () => {
    const newItem: GalleryItem = {
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      title: 'New Image',
      category: 'General'
    };
    handleChange('items', [...content.items, newItem]);
  };

  const removeItem = (index: number) => {
    const updatedItems = content.items.filter((_, i) => i !== index);
    handleChange('items', updatedItems);
  };

  const filteredItems = selectedCategory === 'All' 
    ? content.items 
    : content.items.filter(item => item.category === selectedCategory);

  const allCategories = ['All', ...content.categories];

  return (
    <section className="py-12 sm:py-20 bg-white" style={{ fontFamily: theme?.fontFamily }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-16">
          {isEditing ? (
            <>
              <input
                type="text"
                value={content.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 bg-transparent border-2 border-dashed border-blue-300 rounded-lg p-2 text-center w-full max-w-2xl mx-auto"
                placeholder="Enter section title"
              />
              <input
                type="text"
                value={content.subtitle || ''}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="text-lg sm:text-xl text-gray-600 bg-transparent border-2 border-dashed border-blue-300 rounded-lg p-2 text-center w-full max-w-3xl mx-auto"
                placeholder="Enter subtitle (optional)"
              />
            </>
          ) : (
            <>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4" style={{ color: theme?.primaryColor }}>
                {content.title}
              </h2>
              {content.subtitle && (
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                  {content.subtitle}
                </p>
              )}
            </>
          )}
        </div>

        {/* Category Filter */}
        {!isEditing && (
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {(isEditing ? content.items : filteredItems).map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer"
            >
              {isEditing && (
                <button
                  onClick={() => removeItem(index)}
                  className="absolute top-2 right-2 z-10 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              )}

              <div className="relative overflow-hidden rounded-xl aspect-square">
                {isEditing ? (
                  <ImageUpload
                    value={item.image}
                    onChange={(url) => handleItemChange(index, 'image', url)}
                    className="w-full h-full"
                  />
                ) : (
                  <>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div 
                      className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center"
                      onClick={() => setLightboxImage(item.image)}
                    >
                      <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </>
                )}
              </div>

              <div className="mt-3">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                      className="text-lg font-semibold text-gray-900 mb-1 bg-transparent border-2 border-dashed border-blue-300 rounded-lg p-1 w-full"
                      placeholder="Image title"
                    />
                    <input
                      type="text"
                      value={item.category}
                      onChange={(e) => handleItemChange(index, 'category', e.target.value)}
                      className="text-sm text-gray-600 bg-transparent border border-gray-300 rounded px-2 py-1 w-full"
                      placeholder="Category"
                    />
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.category}
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          ))}

          {isEditing && (
            <motion.button
              onClick={addItem}
              className="aspect-square border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <span className="text-gray-600 text-sm">Add Image</span>
              </div>
            </motion.button>
          )}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setLightboxImage(null)}
            >
              <motion.img
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                src={lightboxImage}
                alt="Gallery"
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GallerySection;