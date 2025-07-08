import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, ZoomIn, Filter, Grid, Columns, LayoutGrid } from 'lucide-react';
import ImageUpload from '../ImageUpload';

interface GalleryItem {
  image: string;
  title: string;
  category: string;
  description?: string;
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

interface GallerySectionProps {
  content: {
    title: string;
    subtitle?: string;
    items: GalleryItem[];
    categories: string[];
    layout?: 'grid' | 'masonry' | 'columns';
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
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
  const [lightboxTitle, setLightboxTitle] = useState<string | null>(null);
  const [lightboxDescription, setLightboxDescription] = useState<string | null>(null);
  const [layout, setLayout] = useState<'grid' | 'masonry' | 'columns'>(content.layout || 'grid');

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
      category: content.categories[0] || 'General',
      description: 'Image description'
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

  // Grid Gallery
  const renderGridGallery = () => (
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

        {/* Layout Switcher and Category Filter */}
        {!isEditing && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            {/* Category Filter */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: selectedCategory === category ? theme?.colors?.primary : theme?.colors?.background,
                    color: selectedCategory === category ? '#ffffff' : theme?.colors?.text,
                    fontFamily: theme?.fonts?.secondary
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== category) {
                      e.currentTarget.style.backgroundColor = `${theme?.colors?.primary}20` || '#e5e7eb';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== category) {
                      e.currentTarget.style.backgroundColor = theme?.colors?.background || '#f9fafb';
                    }
                  }}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Layout Switcher */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => {
                  setLayout('grid');
                  handleChange('layout', 'grid');
                }}
                className={`p-2 rounded-md transition-colors ${
                  layout === 'grid' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-800'
                }`}
                style={{
                  backgroundColor: layout === 'grid' ? '#ffffff' : 'transparent',
                  color: layout === 'grid' ? theme?.colors?.primary : theme?.colors?.textSecondary
                }}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setLayout('masonry');
                  handleChange('layout', 'masonry');
                }}
                className={`p-2 rounded-md transition-colors ${
                  layout === 'masonry' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-800'
                }`}
                style={{
                  backgroundColor: layout === 'masonry' ? '#ffffff' : 'transparent',
                  color: layout === 'masonry' ? theme?.colors?.primary : theme?.colors?.textSecondary
                }}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setLayout('columns');
                  handleChange('layout', 'columns');
                }}
                className={`p-2 rounded-md transition-colors ${
                  layout === 'columns' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-800'
                }`}
                style={{
                  backgroundColor: layout === 'columns' ? '#ffffff' : 'transparent',
                  color: layout === 'columns' ? theme?.colors?.primary : theme?.colors?.textSecondary
                }}
              >
                <Columns className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        {layout === 'grid' && (
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
                    className="absolute top-2 right-2 z-10 w-6 h-6 text-white rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: theme?.colors?.error }}
                  >
                    ×
                  </button>
                )}

                <div 
                  className="relative overflow-hidden rounded-xl aspect-square"
                  style={{ boxShadow: theme?.shadows?.md }}
                >
                  {isEditing ? (
                    <ImageUpload
                      value={item.image}
                      onChange={(url) => handleItemChange(index, 'image', url)}
                      className="w-full h-full"
                      theme={theme}
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
                        onClick={() => openLightbox(item)}
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
                        className="text-lg font-semibold mb-1 bg-transparent border-2 border-dashed rounded-lg p-2 w-full"
                        style={{ 
                          color: theme?.colors?.text,
                          borderColor: `${theme?.colors?.primary}50`,
                          fontFamily: theme?.fonts?.primary
                        }}
                        placeholder="Image title"
                      />
                      <select
                        value={item.category}
                        onChange={(e) => handleItemChange(index, 'category', e.target.value)}
                        className="text-sm bg-transparent border rounded-lg px-2 py-1 w-full mb-2"
                        style={{ 
                          color: theme?.colors?.textSecondary,
                          borderColor: theme?.colors?.border,
                          fontFamily: theme?.fonts?.secondary
                        }}
                      >
                        {content.categories.map((category, catIndex) => (
                          <option key={catIndex} value={category}>{category}</option>
                        ))}
                      </select>
                      <textarea
                        value={item.description || ''}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        className="text-sm bg-transparent border rounded-lg px-2 py-1 w-full h-16 resize-none"
                        style={{ 
                          color: theme?.colors?.textSecondary,
                          borderColor: theme?.colors?.border,
                          fontFamily: theme?.fonts?.secondary
                        }}
                        placeholder="Image description (optional)"
                      />
                    </>
                  ) : (
                    <>
                      <h3 
                        className="text-lg font-semibold mb-1"
                        style={{ 
                          color: theme?.colors?.text,
                          fontFamily: theme?.fonts?.primary
                        }}
                      >
                        {item.title}
                      </h3>
                      <p 
                        className="text-sm"
                        style={{ 
                          color: theme?.colors?.textSecondary,
                          fontFamily: theme?.fonts?.secondary
                        }}
                      >
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
                className="aspect-square border-2 border-dashed rounded-xl transition-all duration-200 flex items-center justify-center"
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
                  <span className="text-sm" style={{ color: theme?.colors?.textSecondary }}>Add Image</span>
                </div>
              </motion.button>
            )}
          </div>
        )}

        {/* Masonry Layout */}
        {layout === 'masonry' && (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6">
            {(isEditing ? content.items : filteredItems).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="break-inside-avoid mb-4 sm:mb-6 relative group cursor-pointer"
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
                  className="relative overflow-hidden rounded-xl"
                  style={{ boxShadow: theme?.shadows?.md }}
                >
                  {isEditing ? (
                    <ImageUpload
                      value={item.image}
                      onChange={(url) => handleItemChange(index, 'image', url)}
                      className="w-full"
                      theme={theme}
                    />
                  ) : (
                    <>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-300"
                        style={{ aspectRatio: `${Math.random() * 0.5 + 0.75}` }}
                      />
                      <div 
                        className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center"
                        onClick={() => openLightbox(item)}
                      >
                        <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-3 mb-6">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                        className="text-lg font-semibold mb-1 bg-transparent border-2 border-dashed rounded-lg p-2 w-full"
                        style={{ 
                          color: theme?.colors?.text,
                          borderColor: `${theme?.colors?.primary}50`,
                          fontFamily: theme?.fonts?.primary
                        }}
                        placeholder="Image title"
                      />
                      <select
                        value={item.category}
                        onChange={(e) => handleItemChange(index, 'category', e.target.value)}
                        className="text-sm bg-transparent border rounded-lg px-2 py-1 w-full mb-2"
                        style={{ 
                          color: theme?.colors?.textSecondary,
                          borderColor: theme?.colors?.border,
                          fontFamily: theme?.fonts?.secondary
                        }}
                      >
                        {content.categories.map((category, catIndex) => (
                          <option key={catIndex} value={category}>{category}</option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <>
                      <h3 
                        className="text-lg font-semibold mb-1"
                        style={{ 
                          color: theme?.colors?.text,
                          fontFamily: theme?.fonts?.primary
                        }}
                      >
                        {item.title}
                      </h3>
                      <p 
                        className="text-sm"
                        style={{ 
                          color: theme?.colors?.textSecondary,
                          fontFamily: theme?.fonts?.secondary
                        }}
                      >
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
                className="border-2 border-dashed rounded-xl p-6 transition-all duration-200 flex items-center justify-center h-40 mb-4 sm:mb-6 break-inside-avoid"
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
                  <span className="text-sm" style={{ color: theme?.colors?.textSecondary }}>Add Image</span>
                </div>
              </motion.button>
            )}
          </div>
        )}

        {/* Columns Layout */}
        {layout === 'columns' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            {/* Left Column */}
            <div className="space-y-6">
              {(isEditing ? content.items : filteredItems)
                .filter((_, i) => i % 2 === 0)
                .map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative group cursor-pointer"
                  >
                    {isEditing && (
                      <button
                        onClick={() => removeItem(index * 2)}
                        className="absolute top-2 right-2 z-10 w-6 h-6 text-white rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: theme?.colors?.error }}
                      >
                        ×
                      </button>
                    )}

                    <div 
                      className="relative overflow-hidden rounded-xl"
                      style={{ boxShadow: theme?.shadows?.md }}
                    >
                      {isEditing ? (
                        <ImageUpload
                          value={item.image}
                          onChange={(url) => handleItemChange(index * 2, 'image', url)}
                          className="w-full"
                          theme={theme}
                        />
                      ) : (
                        <>
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div 
                            className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center"
                            onClick={() => openLightbox(item)}
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
                            onChange={(e) => handleItemChange(index * 2, 'title', e.target.value)}
                            className="text-lg font-semibold mb-1 bg-transparent border-2 border-dashed rounded-lg p-2 w-full"
                            style={{ 
                              color: theme?.colors?.text,
                              borderColor: `${theme?.colors?.primary}50`,
                              fontFamily: theme?.fonts?.primary
                            }}
                            placeholder="Image title"
                          />
                          <select
                            value={item.category}
                            onChange={(e) => handleItemChange(index * 2, 'category', e.target.value)}
                            className="text-sm bg-transparent border rounded-lg px-2 py-1 w-full mb-2"
                            style={{ 
                              color: theme?.colors?.textSecondary,
                              borderColor: theme?.colors?.border,
                              fontFamily: theme?.fonts?.secondary
                            }}
                          >
                            {content.categories.map((category, catIndex) => (
                              <option key={catIndex} value={category}>{category}</option>
                            ))}
                          </select>
                        </>
                      ) : (
                        <>
                          <h3 
                            className="text-lg font-semibold mb-1"
                            style={{ 
                              color: theme?.colors?.text,
                              fontFamily: theme?.fonts?.primary
                            }}
                          >
                            {item.title}
                          </h3>
                          <p 
                            className="text-sm"
                            style={{ 
                              color: theme?.colors?.textSecondary,
                              fontFamily: theme?.fonts?.secondary
                            }}
                          >
                            {item.category}
                          </p>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {(isEditing ? content.items : filteredItems)
                .filter((_, i) => i % 2 === 1)
                .map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                    viewport={{ once: true }}
                    className="relative group cursor-pointer"
                  >
                    {isEditing && (
                      <button
                        onClick={() => removeItem(index * 2 + 1)}
                        className="absolute top-2 right-2 z-10 w-6 h-6 text-white rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: theme?.colors?.error }}
                      >
                        ×
                      </button>
                    )}

                    <div 
                      className="relative overflow-hidden rounded-xl"
                      style={{ boxShadow: theme?.shadows?.md }}
                    >
                      {isEditing ? (
                        <ImageUpload
                          value={item.image}
                          onChange={(url) => handleItemChange(index * 2 + 1, 'image', url)}
                          className="w-full"
                          theme={theme}
                        />
                      ) : (
                        <>
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div 
                            className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center"
                            onClick={() => openLightbox(item)}
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
                            onChange={(e) => handleItemChange(index * 2 + 1, 'title', e.target.value)}
                            className="text-lg font-semibold mb-1 bg-transparent border-2 border-dashed rounded-lg p-2 w-full"
                            style={{ 
                              color: theme?.colors?.text,
                              borderColor: `${theme?.colors?.primary}50`,
                              fontFamily: theme?.fonts?.primary
                            }}
                            placeholder="Image title"
                          />
                          <select
                            value={item.category}
                            onChange={(e) => handleItemChange(index * 2 + 1, 'category', e.target.value)}
                            className="text-sm bg-transparent border rounded-lg px-2 py-1 w-full mb-2"
                            style={{ 
                              color: theme?.colors?.textSecondary,
                              borderColor: theme?.colors?.border,
                              fontFamily: theme?.fonts?.secondary
                            }}
                          >
                            {content.categories.map((category, catIndex) => (
                              <option key={catIndex} value={category}>{category}</option>
                            ))}
                          </select>
                        </>
                      ) : (
                        <>
                          <h3 
                            className="text-lg font-semibold mb-1"
                            style={{ 
                              color: theme?.colors?.text,
                              fontFamily: theme?.fonts?.primary
                            }}
                          >
                            {item.title}
                          </h3>
                          <p 
                            className="text-sm"
                            style={{ 
                              color: theme?.colors?.textSecondary,
                              fontFamily: theme?.fonts?.secondary
                            }}
                          >
                            {item.category}
                          </p>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}

              {isEditing && content.items.length % 2 === 0 && (
                <motion.button
                  onClick={addItem}
                  className="border-2 border-dashed rounded-xl p-6 transition-all duration-200 flex items-center justify-center h-40"
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
                    <span className="text-sm" style={{ color: theme?.colors?.textSecondary }}>Add Image</span>
                  </div>
                </motion.button>
              )}
            </div>

            {isEditing && content.items.length % 2 === 1 && (
              <motion.button
                onClick={addItem}
                className="border-2 border-dashed rounded-xl p-6 transition-all duration-200 flex items-center justify-center h-40"
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
                  <span className="text-sm" style={{ color: theme?.colors?.textSecondary }}>Add Image</span>
                </div>
              </motion.button>
            )}
          </div>
        )}

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
                        style={{ fontFamily: theme?.fonts?.primary }}
                      >
                        {lightboxTitle}
                      </h3>
                    )}
                    {lightboxDescription && (
                      <p 
                        className="text-white/80"
                        style={{ fontFamily: theme?.fonts?.secondary }}
                      >
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
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );

  // Initialize default content if needed
  React.useEffect(() => {
    if (!content.categories || content.categories.length === 0) {
      handleChange('categories', ['Nature', 'Architecture', 'People', 'Travel', 'Food']);
    }
    
    if (!content.layout) {
      handleChange('layout', 'grid');
    }
  }, []);

  return renderGridGallery();
};

export default GallerySection;