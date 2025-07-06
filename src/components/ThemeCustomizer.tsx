import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Palette, Type, Sparkles, Eye, Wand2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ThemeCustomizerProps {
  onClose: () => void;
}

const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({ onClose }) => {
  const { currentTheme, availableThemes, availableFonts, updateTheme, updateFonts } = useTheme();
  const [activeTab, setActiveTab] = useState<'colors' | 'fonts'>('colors');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Theme Customizer</h2>
                <p className="text-purple-100">Transform your website's look and feel instantly</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-white hover:bg-opacity-20 rounded-xl transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 mt-6 bg-white bg-opacity-20 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('colors')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all font-semibold ${
                activeTab === 'colors'
                  ? 'bg-white text-purple-600 shadow-lg'
                  : 'text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <Palette className="w-5 h-5" />
              Color Themes
            </button>
            <button
              onClick={() => setActiveTab('fonts')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all font-semibold ${
                activeTab === 'fonts'
                  ? 'bg-white text-purple-600 shadow-lg'
                  : 'text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <Type className="w-5 h-5" />
              Font Collections
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'colors' && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Color Collections</h3>
                  <p className="text-gray-600">Choose from our curated color palettes</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {availableThemes.map((theme) => (
                  <motion.button
                    key={theme.id}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => updateTheme(theme.id)}
                    className={`group p-4 rounded-2xl border-2 transition-all text-left ${
                      currentTheme.id === theme.id
                        ? 'border-purple-500 bg-purple-50 shadow-lg ring-4 ring-purple-100'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    {/* Color Preview */}
                    <div className="flex items-center gap-2 mb-3">
                      <div 
                        className="w-8 h-8 rounded-xl shadow-sm border-2 border-white"
                        style={{ backgroundColor: theme.colors.primary }}
                      />
                      <div 
                        className="w-6 h-6 rounded-lg shadow-sm border-2 border-white"
                        style={{ backgroundColor: theme.colors.secondary }}
                      />
                      <div 
                        className="w-4 h-4 rounded-md shadow-sm border border-white"
                        style={{ backgroundColor: theme.colors.accent }}
                      />
                    </div>

                    {/* Theme Info */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                        {theme.name}
                      </h4>
                      <div className="flex items-center gap-1">
                        {[theme.colors.primary, theme.colors.secondary, theme.colors.accent, theme.colors.background].map((color, index) => (
                          <div
                            key={index}
                            className="w-3 h-3 rounded-full border border-gray-200"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Active Indicator */}
                    {currentTheme.id === theme.id && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-3 h-3 bg-white rounded-full"
                        />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Live Preview */}
              <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Live Preview
                </h4>
                <div 
                  className="p-6 rounded-xl shadow-lg"
                  style={{ 
                    backgroundColor: currentTheme.colors.background,
                    color: currentTheme.colors.text,
                    fontFamily: currentTheme.fonts.primary
                  }}
                >
                  <h5 
                    className="text-2xl font-bold mb-3"
                    style={{ color: currentTheme.colors.primary }}
                  >
                    Your Website Title
                  </h5>
                  <p 
                    className="mb-4"
                    style={{ color: currentTheme.colors.textSecondary }}
                  >
                    This is how your content will look with the selected theme. The colors and fonts will be applied across your entire website.
                  </p>
                  <div className="flex gap-3">
                    <button
                      className="px-6 py-3 rounded-xl font-semibold text-white transition-all"
                      style={{ backgroundColor: currentTheme.colors.primary }}
                    >
                      Primary Button
                    </button>
                    <button
                      className="px-6 py-3 rounded-xl font-semibold border-2 transition-all"
                      style={{ 
                        borderColor: currentTheme.colors.secondary,
                        color: currentTheme.colors.secondary
                      }}
                    >
                      Secondary Button
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fonts' && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Type className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Font Collections</h3>
                  <p className="text-gray-600">Select the perfect typography for your brand</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {availableFonts.map((fontCollection) => (
                  <motion.button
                    key={fontCollection.id}
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => updateFonts(fontCollection.id)}
                    className={`group p-6 rounded-2xl border-2 transition-all text-left ${
                      currentTheme.fonts.primary === fontCollection.fonts.primary
                        ? 'border-purple-500 bg-purple-50 shadow-lg ring-4 ring-purple-100'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    {/* Font Preview */}
                    <div className="space-y-3 mb-4">
                      <div 
                        className="text-2xl font-bold text-gray-900"
                        style={{ fontFamily: fontCollection.fonts.primary }}
                      >
                        Heading Font
                      </div>
                      <div 
                        className="text-lg text-gray-700"
                        style={{ fontFamily: fontCollection.fonts.secondary }}
                      >
                        Body text font for paragraphs
                      </div>
                      <div 
                        className="text-sm font-semibold text-gray-600"
                        style={{ fontFamily: fontCollection.fonts.accent }}
                      >
                        Accent font for buttons and highlights
                      </div>
                    </div>

                    {/* Font Info */}
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                        {fontCollection.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">{fontCollection.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {Object.values(fontCollection.fonts).map((font, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                          >
                            {font}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Active Indicator */}
                    {currentTheme.fonts.primary === fontCollection.fonts.primary && (
                      <div className="absolute top-4 right-4 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-3 h-3 bg-white rounded-full"
                        />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Typography Preview */}
              <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Wand2 className="w-5 h-5" />
                  Typography Preview
                </h4>
                <div className="space-y-4">
                  <h1 
                    className="text-4xl font-bold"
                    style={{ 
                      fontFamily: currentTheme.fonts.primary,
                      color: currentTheme.colors.primary
                    }}
                  >
                    Main Heading (H1)
                  </h1>
                  <h2 
                    className="text-2xl font-semibold"
                    style={{ 
                      fontFamily: currentTheme.fonts.secondary,
                      color: currentTheme.colors.text
                    }}
                  >
                    Secondary Heading (H2)
                  </h2>
                  <p 
                    className="text-lg leading-relaxed"
                    style={{ 
                      fontFamily: currentTheme.fonts.secondary,
                      color: currentTheme.colors.textSecondary
                    }}
                  >
                    This is how your body text will appear throughout your website. It should be easy to read and complement your overall design aesthetic.
                  </p>
                  <button
                    className="px-6 py-3 rounded-xl font-semibold text-white"
                    style={{ 
                      fontFamily: currentTheme.fonts.accent,
                      backgroundColor: currentTheme.colors.accent
                    }}
                  >
                    Call to Action Button
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <span className="font-semibold">Current Theme:</span> {currentTheme.name} • 
              <span className="font-semibold ml-2">Font:</span> {currentTheme.fonts.primary}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all font-semibold shadow-lg"
            >
              Apply Changes
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ThemeCustomizer;