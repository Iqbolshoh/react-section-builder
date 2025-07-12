import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Palette, Type, Sparkles, Eye } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ThemeCustomizerProps {
  onClose: () => void;
}

const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({ onClose }) => {
  const { currentTheme, availableThemes, availableFonts, updateTheme, updateFonts } = useTheme();
  const [activeSection, setActiveSection] = useState<'colors' | 'fonts'>('colors');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(10px)'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl platform-shadow-2xl"
        style={{ backgroundColor: 'var(--bg-primary)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="platform-gradient-primary p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl font-bold platform-font-primary">Theme Customizer</h2>
                <p className="text-white text-opacity-90 platform-font-secondary">
                  Personalize your website's appearance
                </p>
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
              onClick={() => setActiveSection('colors')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all font-semibold ${
                activeSection === 'colors'
                  ? 'bg-white text-indigo-600 shadow-lg'
                  : 'text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <Palette className="w-5 h-5" />
              Colors
            </button>
            <button
              onClick={() => setActiveSection('fonts')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all font-semibold ${
                activeSection === 'fonts'
                  ? 'bg-white text-indigo-600 shadow-lg'
                  : 'text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <Type className="w-5 h-5" />
              Fonts
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-auto max-h-[calc(90vh-200px)] platform-bg-secondary">
          {activeSection === 'colors' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 platform-gradient-primary rounded-xl flex items-center justify-center">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold platform-text-primary platform-font-primary">Color Themes</h3>
                  <p className="platform-text-secondary platform-font-secondary">
                    Choose your preferred color palette
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableThemes.map((theme) => (
                  <motion.button
                    key={theme.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => updateTheme(theme.id)}
                    className={`group p-4 rounded-2xl border-2 transition-all text-left relative ${
                      currentTheme.id === theme.id
                        ? 'ring-4 ring-opacity-30'
                        : 'hover:platform-shadow-md'
                    }`}
                    style={{
                      backgroundColor: currentTheme.id === theme.id ? `${theme.colors.primary}10` : 'var(--bg-primary)',
                      borderColor: currentTheme.id === theme.id ? theme.colors.primary : 'var(--border-primary)',
                      boxShadow: currentTheme.id === theme.id ? 'var(--shadow-lg)' : 'none',
                      ringColor: theme.colors.primary
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      {[theme.colors.primary, theme.colors.secondary, theme.colors.accent].map((color, index) => (
                        <div
                          key={index}
                          className={`w-8 h-8 rounded-xl shadow-sm border-2 border-white`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>

                    <div>
                      <h4 className="font-bold mb-1 platform-text-primary platform-font-primary">
                        {theme.name}
                      </h4>
                      <p className="text-sm platform-text-secondary platform-font-secondary">
                        {theme.description}
                      </p>
                    </div>

                    {currentTheme.id === theme.id && (
                      <div 
                        className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: theme.colors.primary }}
                      >
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
            </div>
          )}

          {activeSection === 'fonts' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 platform-gradient-primary rounded-xl flex items-center justify-center">
                  <Type className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold platform-text-primary platform-font-primary">Font Styles</h3>
                  <p className="platform-text-secondary platform-font-secondary">
                    Select your preferred typography
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {availableFonts.map((fontCollection) => (
                  <motion.button
                    key={fontCollection.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => updateFonts(fontCollection.id)}
                    className={`group p-5 rounded-2xl border-2 transition-all text-left relative ${
                      currentTheme.fonts.primary === fontCollection.fonts.primary
                        ? 'ring-4 ring-opacity-30'
                        : 'hover:platform-shadow-md'
                    }`}
                    style={{
                      backgroundColor: currentTheme.fonts.primary === fontCollection.fonts.primary 
                        ? `${currentTheme.colors.primary}10` 
                        : 'var(--bg-primary)',
                      borderColor: currentTheme.fonts.primary === fontCollection.fonts.primary 
                        ? currentTheme.colors.primary 
                        : 'var(--border-primary)',
                      boxShadow: currentTheme.fonts.primary === fontCollection.fonts.primary 
                        ? 'var(--shadow-lg)' 
                        : 'none',
                      ringColor: currentTheme.colors.primary
                    }}
                  >
                    <div className="space-y-3">
                      <h4 
                        className="text-2xl font-bold"
                        style={{ 
                          fontFamily: fontCollection.fonts.primary,
                          color: 'var(--text-primary)'
                        }}
                      >
                        {fontCollection.name}
                      </h4>
                      <p 
                        className="text-lg"
                        style={{ 
                          fontFamily: fontCollection.fonts.secondary,
                          color: 'var(--text-secondary)'
                        }}
                      >
                        {fontCollection.description}
                      </p>
                      <div 
                        className="text-sm font-semibold"
                        style={{ 
                          fontFamily: fontCollection.fonts.accent,
                          color: currentTheme.colors.primary
                        }}
                      >
                        Accent text example
                      </div>
                    </div>

                    {currentTheme.fonts.primary === fontCollection.fonts.primary && (
                      <div 
                        className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: currentTheme.colors.primary }}
                      >
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
            </div>
          )}

          {/* Preview Section */}
          <div className="mt-8 p-6 rounded-2xl" style={{ backgroundColor: `${currentTheme.colors.primary}10` }}>
            <h4 className="text-lg font-bold mb-4 flex items-center gap-2 platform-text-primary platform-font-primary">
              <Eye className="w-5 h-5" style={{ color: currentTheme.colors.primary }} />
              Live Preview
            </h4>
            <div 
              className="p-6 rounded-xl platform-shadow-lg"
              style={{ 
                backgroundColor: currentTheme.colors.surface,
                color: currentTheme.colors.text,
                fontFamily: currentTheme.fonts.primary
              }}
            >
              <h5 
                className="text-2xl font-bold mb-3"
                style={{ color: currentTheme.colors.primary }}
              >
                {currentTheme.name} Theme
              </h5>
              <p 
                className="mb-4"
                style={{ 
                  color: currentTheme.colors.textSecondary,
                  fontFamily: currentTheme.fonts.secondary
                }}
              >
                This is how your content will look with the selected theme. The {activeSection === 'colors' ? 'colors' : 'fonts'} will be applied across your entire website.
              </p>
              <div className="flex gap-3">
                <button
                  className="px-6 py-3 rounded-xl font-semibold text-white transition-all"
                  style={{ 
                    background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
                    boxShadow: currentTheme.shadows.md,
                    fontFamily: currentTheme.fonts.accent
                  }}
                >
                  Primary Action
                </button>
                <button
                  className="px-6 py-3 rounded-xl font-semibold border-2 transition-all"
                  style={{ 
                    borderColor: currentTheme.colors.secondary,
                    color: currentTheme.colors.secondary,
                    fontFamily: currentTheme.fonts.accent
                  }}
                >
                  Secondary Action
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6 platform-border platform-bg-primary">
          <div className="flex items-center justify-between">
            <div className="text-sm platform-text-secondary platform-font-secondary">
              <span className="font-semibold">Current:</span> {currentTheme.name} • {currentTheme.fonts.primary}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="btn-primary"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
                fontFamily: currentTheme.fonts.accent
              }}
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