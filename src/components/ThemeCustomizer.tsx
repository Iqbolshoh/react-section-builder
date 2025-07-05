import React from 'react';
import { motion } from 'framer-motion';
import { X, Palette, Type, Layout, Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ThemeCustomizerProps {
  onClose: () => void;
}

const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({ onClose }) => {
  const { theme, updateTheme } = useTheme();

  const colorSchemes = [
    { 
      name: 'Emerald Ocean', 
      primary: '#10B981', 
      secondary: '#06B6D4',
      gradient: 'from-emerald-500 to-cyan-500'
    },
    { 
      name: 'Purple Sunset', 
      primary: '#8B5CF6', 
      secondary: '#EC4899',
      gradient: 'from-violet-500 to-pink-500'
    },
    { 
      name: 'Orange Fire', 
      primary: '#F59E0B', 
      secondary: '#EF4444',
      gradient: 'from-amber-500 to-red-500'
    },
    { 
      name: 'Blue Sky', 
      primary: '#3B82F6', 
      secondary: '#8B5CF6',
      gradient: 'from-blue-500 to-violet-500'
    },
    { 
      name: 'Forest Green', 
      primary: '#059669', 
      secondary: '#10B981',
      gradient: 'from-emerald-600 to-emerald-400'
    },
    { 
      name: 'Royal Purple', 
      primary: '#7C3AED', 
      secondary: '#A855F7',
      gradient: 'from-violet-600 to-purple-500'
    },
    { 
      name: 'Sunset Orange', 
      primary: '#EA580C', 
      secondary: '#F97316',
      gradient: 'from-orange-600 to-orange-500'
    },
    { 
      name: 'Ocean Blue', 
      primary: '#0EA5E9', 
      secondary: '#06B6D4',
      gradient: 'from-sky-500 to-cyan-500'
    }
  ];

  const fonts = [
    { name: 'Inter', value: 'Inter', description: 'Modern and clean' },
    { name: 'Poppins', value: 'Poppins', description: 'Friendly and rounded' },
    { name: 'Roboto', value: 'Roboto', description: 'Professional and readable' },
    { name: 'Open Sans', value: 'Open Sans', description: 'Versatile and neutral' },
    { name: 'Montserrat', value: 'Montserrat', description: 'Elegant and stylish' },
    { name: 'Lato', value: 'Lato', description: 'Warm and approachable' },
    { name: 'Source Sans Pro', value: 'Source Sans Pro', description: 'Technical and clear' },
    { name: 'Nunito', value: 'Nunito', description: 'Soft and friendly' }
  ];

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
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Theme Customizer</h2>
                <p className="text-purple-100">Make your website uniquely yours</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-white hover:bg-opacity-20 rounded-xl transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-8">
            {/* Color Schemes */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Color Schemes</h3>
                  <p className="text-gray-600">Choose a beautiful color combination</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {colorSchemes.map((scheme) => (
                  <motion.button
                    key={scheme.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => updateTheme({ 
                      primaryColor: scheme.primary, 
                      secondaryColor: scheme.secondary 
                    })}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      theme.primaryColor === scheme.primary 
                        ? 'border-emerald-500 bg-emerald-50 shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <div className={`w-full h-16 rounded-xl bg-gradient-to-r ${scheme.gradient} mb-3`}></div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900 text-sm">{scheme.name}</div>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <div 
                          className="w-3 h-3 rounded-full border border-white"
                          style={{ backgroundColor: scheme.primary }}
                        />
                        <div 
                          className="w-3 h-3 rounded-full border border-white"
                          style={{ backgroundColor: scheme.secondary }}
                        />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Type className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Typography</h3>
                  <p className="text-gray-600">Select the perfect font for your brand</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fonts.map((font) => (
                  <motion.button
                    key={font.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => updateTheme({ fontFamily: font.value })}
                    className={`p-6 rounded-2xl border-2 transition-all text-left ${
                      theme.fontFamily === font.value 
                        ? 'border-emerald-500 bg-emerald-50 shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                    style={{ fontFamily: font.value }}
                  >
                    <div className="text-2xl font-bold mb-2">Aa Bb Cc</div>
                    <div className="font-semibold text-gray-900 mb-1">{font.name}</div>
                    <div className="text-sm text-gray-600">{font.description}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Button Styles */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Layout className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Button Style</h3>
                  <p className="text-gray-600">Choose your button appearance</p>
                </div>
              </div>
              <div className="flex gap-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => updateTheme({ buttonStyle: 'rounded' })}
                  className={`px-8 py-4 rounded-full border-2 transition-all font-semibold ${
                    theme.buttonStyle === 'rounded'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-600 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:shadow-md'
                  }`}
                >
                  Rounded Buttons
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => updateTheme({ buttonStyle: 'square' })}
                  className={`px-8 py-4 rounded-xl border-2 transition-all font-semibold ${
                    theme.buttonStyle === 'square'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-600 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:shadow-md'
                  }`}
                >
                  Square Buttons
                </motion.button>
              </div>
            </div>

            {/* Spacing */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Layout className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Spacing</h3>
                  <p className="text-gray-600">Adjust the overall spacing of your site</p>
                </div>
              </div>
              <div className="flex gap-4">
                {['compact', 'comfortable', 'spacious'].map((spacing) => (
                  <motion.button
                    key={spacing}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => updateTheme({ spacing: spacing as any })}
                    className={`px-6 py-3 rounded-xl border-2 transition-all capitalize font-semibold ${
                      theme.spacing === spacing
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-600 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:shadow-md'
                    }`}
                  >
                    {spacing}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Changes are applied instantly to your website
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all font-semibold shadow-lg"
            >
              Done Customizing
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ThemeCustomizer;