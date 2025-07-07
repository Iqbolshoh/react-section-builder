import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Palette, Type, Sparkles, Eye, Wand2, Check, Sliders, ColorPicker, Brush, Layers, Droplet, Feather } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ThemeCustomizerProps {
  onClose: () => void;
}

const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({ onClose }) => {
  const { currentTheme, availableThemes, availableFonts, updateTheme, updateFonts } = useTheme();
  const [activeTab, setActiveTab] = useState<'colors' | 'fonts' | 'advanced'>('colors');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(5px)'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="max-w-6xl w-full max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl"
        style={{ 
          backgroundColor: currentTheme.colors.surface,
          boxShadow: currentTheme.shadows.xl
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className="text-white p-6"
          style={{ 
            background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
            fontFamily: currentTheme.fonts.primary
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 
                  className="text-2xl font-bold"
                  style={{ fontFamily: currentTheme.fonts.primary }}
                >
                  Theme Customizer
                </h2>
                <p 
                  className="text-white text-opacity-90"
                  style={{ fontFamily: currentTheme.fonts.secondary }}
                >
                  Transform your website's look and feel instantly
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
          <div 
            className="flex items-center gap-1 mt-6 rounded-xl p-1"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
          >
            <button
              onClick={() => setActiveTab('colors')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all font-semibold ${
                activeTab === 'colors'
                  ? 'bg-white shadow-lg'
                  : 'text-white hover:bg-white hover:bg-opacity-10'
              }`}
              style={{ 
                color: activeTab === 'colors' ? currentTheme.colors.primary : 'white',
                fontFamily: currentTheme.fonts.primary
              }}
            >
              <Palette className="w-5 h-5" />
              Color Themes
            </button>
            <button
              onClick={() => setActiveTab('fonts')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all font-semibold ${
                activeTab === 'fonts'
                  ? 'bg-white shadow-lg'
                  : 'text-white hover:bg-white hover:bg-opacity-10'
              }`}
              style={{ 
                color: activeTab === 'fonts' ? currentTheme.colors.primary : 'white',
                fontFamily: currentTheme.fonts.primary
              }}
            >
              <Type className="w-5 h-5" />
              Font Collections
            </button>
            <button
              onClick={() => setActiveTab('advanced')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all font-semibold ${
                activeTab === 'advanced'
                  ? 'bg-white shadow-lg'
                  : 'text-white hover:bg-white hover:bg-opacity-10'
              }`}
              style={{ 
                color: activeTab === 'advanced' ? currentTheme.colors.primary : 'white',
                fontFamily: currentTheme.fonts.primary
              }}
            >
              <Sliders className="w-5 h-5" />
              Advanced
            </button>
          </div>
        </div>

        {/* Content */}
        <div 
          className="p-6 overflow-auto max-h-[calc(90vh-200px)]"
          style={{ 
            backgroundColor: currentTheme.colors.background,
            color: currentTheme.colors.text,
            fontFamily: currentTheme.fonts.primary
          }}
        >
          {activeTab === 'colors' && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
                  }}
                >
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 
                    className="text-xl font-bold"
                    style={{ 
                      color: currentTheme.colors.text,
                      fontFamily: currentTheme.fonts.primary
                    }}
                  >
                    Color Collections
                  </h3>
                  <p 
                    style={{ 
                      color: currentTheme.colors.textSecondary,
                      fontFamily: currentTheme.fonts.secondary
                    }}
                  >
                    Choose from our curated color palettes
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {availableThemes.map((theme) => (
                  <motion.button
                    key={theme.id}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => updateTheme(theme.id)}
                    className={`group p-4 rounded-2xl border-2 transition-all text-left relative ${
                      currentTheme.id === theme.id
                        ? 'ring-4'
                        : 'hover:shadow-md'
                    }`}
                    style={{
                      backgroundColor: currentTheme.id === theme.id ? `${theme.colors.primary}10` : currentTheme.colors.surface,
                      borderColor: currentTheme.id === theme.id ? theme.colors.primary : currentTheme.colors.border,
                      boxShadow: currentTheme.id === theme.id ? currentTheme.shadows.lg : 'none',
                      ringColor: `${theme.colors.primary}30`
                    }}
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
                      <h4 
                        className="font-bold mb-1 transition-colors"
                        style={{ 
                          color: currentTheme.colors.text,
                          fontFamily: currentTheme.fonts.primary
                        }}
                      >
                        {theme.name}
                      </h4>
                      <div className="flex items-center gap-1">
                        {[theme.colors.primary, theme.colors.secondary, theme.colors.accent, theme.colors.background].map((color, index) => (
                          <div
                            key={index}
                            className="w-3 h-3 rounded-full border"
                            style={{ 
                              backgroundColor: color,
                              borderColor: currentTheme.colors.border
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Active Indicator */}
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

              {/* Live Preview */}
              <div 
                className="mt-8 p-6 rounded-2xl"
                style={{ backgroundColor: `${currentTheme.colors.primary}10` }}
              >
                <h4 
                  className="text-lg font-bold mb-4 flex items-center gap-2"
                  style={{ 
                    color: currentTheme.colors.text,
                    fontFamily: currentTheme.fonts.primary
                  }}
                >
                  <Eye className="w-5 h-5" style={{ color: currentTheme.colors.primary }} />
                  Live Preview
                </h4>
                <div 
                  className="p-6 rounded-xl shadow-lg"
                  style={{ 
                    backgroundColor: currentTheme.colors.surface,
                    color: currentTheme.colors.text,
                    fontFamily: currentTheme.fonts.primary,
                    boxShadow: currentTheme.shadows.lg
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
                    style={{ 
                      color: currentTheme.colors.textSecondary,
                      fontFamily: currentTheme.fonts.secondary
                    }}
                  >
                    This is how your content will look with the selected theme. The colors and fonts will be applied across your entire website.
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
                      Primary Button
                    </button>
                    <button
                      className="px-6 py-3 rounded-xl font-semibold border-2 transition-all"
                      style={{ 
                        borderColor: currentTheme.colors.secondary,
                        color: currentTheme.colors.secondary,
                        fontFamily: currentTheme.fonts.accent
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
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
                  }}
                >
                  <Type className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 
                    className="text-xl font-bold"
                    style={{ 
                      color: currentTheme.colors.text,
                      fontFamily: currentTheme.fonts.primary
                    }}
                  >
                    Font Collections
                  </h3>
                  <p 
                    style={{ 
                      color: currentTheme.colors.textSecondary,
                      fontFamily: currentTheme.fonts.secondary
                    }}
                  >
                    Select the perfect typography for your brand
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {availableFonts.map((fontCollection) => (
                  <motion.button
                    key={fontCollection.id}
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => updateFonts(fontCollection.id)}
                    className={`group p-6 rounded-2xl border-2 transition-all text-left relative ${
                      currentTheme.fonts.primary === fontCollection.fonts.primary
                        ? 'ring-4'
                        : 'hover:shadow-md'
                    }`}
                    style={{
                      backgroundColor: currentTheme.fonts.primary === fontCollection.fonts.primary 
                        ? `${currentTheme.colors.primary}10` 
                        : currentTheme.colors.surface,
                      borderColor: currentTheme.fonts.primary === fontCollection.fonts.primary 
                        ? currentTheme.colors.primary 
                        : currentTheme.colors.border,
                      boxShadow: currentTheme.fonts.primary === fontCollection.fonts.primary 
                        ? currentTheme.shadows.lg 
                        : 'none',
                      ringColor: `${currentTheme.colors.primary}30`
                    }}
                  >
                    {/* Font Preview */}
                    <div className="space-y-3 mb-4">
                      <div 
                        className="text-2xl font-bold"
                        style={{ 
                          fontFamily: fontCollection.fonts.primary,
                          color: currentTheme.colors.text
                        }}
                      >
                        Heading Font
                      </div>
                      <div 
                        className="text-lg"
                        style={{ 
                          fontFamily: fontCollection.fonts.secondary,
                          color: currentTheme.colors.textSecondary
                        }}
                      >
                        Body text font for paragraphs
                      </div>
                      <div 
                        className="text-sm font-semibold"
                        style={{ 
                          fontFamily: fontCollection.fonts.accent,
                          color: currentTheme.colors.primary
                        }}
                      >
                        Accent font for buttons and highlights
                      </div>
                    </div>

                    {/* Font Info */}
                    <div 
                      className="border-t pt-4"
                      style={{ borderColor: currentTheme.colors.border }}
                    >
                      <h4 
                        className="font-bold mb-1 transition-colors"
                        style={{ 
                          color: currentTheme.colors.text,
                          fontFamily: currentTheme.fonts.primary
                        }}
                      >
                        {fontCollection.name}
                      </h4>
                      <p 
                        className="text-sm mb-2"
                        style={{ 
                          color: currentTheme.colors.textSecondary,
                          fontFamily: currentTheme.fonts.secondary
                        }}
                      >
                        {fontCollection.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {Object.values(fontCollection.fonts).map((font, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 rounded text-xs font-medium"
                            style={{ 
                              backgroundColor: `${currentTheme.colors.primary}15`,
                              color: currentTheme.colors.text
                            }}
                          >
                            {font}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Active Indicator */}
                    {currentTheme.fonts.primary === fontCollection.fonts.primary && (
                      <div 
                        className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center"
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

              {/* Typography Preview */}
              <div 
                className="mt-8 p-6 rounded-2xl"
                style={{ backgroundColor: `${currentTheme.colors.primary}10` }}
              >
                <h4 
                  className="text-lg font-bold mb-4 flex items-center gap-2"
                  style={{ 
                    color: currentTheme.colors.text,
                    fontFamily: currentTheme.fonts.primary
                  }}
                >
                  <Wand2 className="w-5 h-5" style={{ color: currentTheme.colors.primary }} />
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
                      background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
                      fontFamily: currentTheme.fonts.accent,
                      boxShadow: currentTheme.shadows.md
                    }}
                  >
                    Call to Action Button
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'advanced' && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
                  }}
                >
                  <Sliders className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 
                    className="text-xl font-bold"
                    style={{ 
                      color: currentTheme.colors.text,
                      fontFamily: currentTheme.fonts.primary
                    }}
                  >
                    Advanced Customization
                  </h3>
                  <p 
                    style={{ 
                      color: currentTheme.colors.textSecondary,
                      fontFamily: currentTheme.fonts.secondary
                    }}
                  >
                    Fine-tune your website's appearance
                  </p>
                </div>
              </div>

              {/* Color Customization */}
              <div 
                className="p-6 rounded-2xl mb-6"
                style={{ 
                  backgroundColor: currentTheme.colors.surface,
                  boxShadow: currentTheme.shadows.md
                }}
              >
                <h4 
                  className="text-lg font-bold mb-4 flex items-center gap-2"
                  style={{ 
                    color: currentTheme.colors.text,
                    fontFamily: currentTheme.fonts.primary
                  }}
                >
                  <ColorPicker className="w-5 h-5" style={{ color: currentTheme.colors.primary }} />
                  Color Adjustments
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2"
                      style={{ 
                        color: currentTheme.colors.text,
                        fontFamily: currentTheme.fonts.secondary
                      }}
                    >
                      Primary Color
                    </label>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-lg"
                        style={{ backgroundColor: currentTheme.colors.primary }}
                      ></div>
                      <input 
                        type="text" 
                        value={currentTheme.colors.primary} 
                        readOnly
                        className="px-3 py-2 rounded-lg border text-sm"
                        style={{ 
                          borderColor: currentTheme.colors.border,
                          backgroundColor: currentTheme.colors.surface,
                          color: currentTheme.colors.text
                        }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2"
                      style={{ 
                        color: currentTheme.colors.text,
                        fontFamily: currentTheme.fonts.secondary
                      }}
                    >
                      Secondary Color
                    </label>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-lg"
                        style={{ backgroundColor: currentTheme.colors.secondary }}
                      ></div>
                      <input 
                        type="text" 
                        value={currentTheme.colors.secondary} 
                        readOnly
                        className="px-3 py-2 rounded-lg border text-sm"
                        style={{ 
                          borderColor: currentTheme.colors.border,
                          backgroundColor: currentTheme.colors.surface,
                          color: currentTheme.colors.text
                        }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2"
                      style={{ 
                        color: currentTheme.colors.text,
                        fontFamily: currentTheme.fonts.secondary
                      }}
                    >
                      Accent Color
                    </label>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-lg"
                        style={{ backgroundColor: currentTheme.colors.accent }}
                      ></div>
                      <input 
                        type="text" 
                        value={currentTheme.colors.accent} 
                        readOnly
                        className="px-3 py-2 rounded-lg border text-sm"
                        style={{ 
                          borderColor: currentTheme.colors.border,
                          backgroundColor: currentTheme.colors.surface,
                          color: currentTheme.colors.text
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Style Customization */}
              <div 
                className="p-6 rounded-2xl mb-6"
                style={{ 
                  backgroundColor: currentTheme.colors.surface,
                  boxShadow: currentTheme.shadows.md
                }}
              >
                <h4 
                  className="text-lg font-bold mb-4 flex items-center gap-2"
                  style={{ 
                    color: currentTheme.colors.text,
                    fontFamily: currentTheme.fonts.primary
                  }}
                >
                  <Brush className="w-5 h-5" style={{ color: currentTheme.colors.primary }} />
                  Style Preferences
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2"
                      style={{ 
                        color: currentTheme.colors.text,
                        fontFamily: currentTheme.fonts.secondary
                      }}
                    >
                      Button Style
                    </label>
                    <div className="flex items-center gap-3">
                      <button 
                        className="px-4 py-2 rounded-lg text-white text-sm"
                        style={{ 
                          backgroundColor: currentTheme.colors.primary,
                          fontFamily: currentTheme.fonts.accent
                        }}
                      >
                        Rounded
                      </button>
                      <button 
                        className="px-4 py-2 rounded-full text-white text-sm"
                        style={{ 
                          backgroundColor: currentTheme.colors.primary,
                          fontFamily: currentTheme.fonts.accent
                        }}
                      >
                        Pill
                      </button>
                      <button 
                        className="px-4 py-2 text-white text-sm"
                        style={{ 
                          backgroundColor: currentTheme.colors.primary,
                          fontFamily: currentTheme.fonts.accent
                        }}
                      >
                        Square
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2"
                      style={{ 
                        color: currentTheme.colors.text,
                        fontFamily: currentTheme.fonts.secondary
                      }}
                    >
                      Section Style
                    </label>
                    <div className="flex items-center gap-3">
                      <button 
                        className="px-4 py-2 rounded-lg text-sm border"
                        style={{ 
                          borderColor: currentTheme.colors.border,
                          color: currentTheme.colors.text,
                          fontFamily: currentTheme.fonts.secondary
                        }}
                      >
                        Boxed
                      </button>
                      <button 
                        className="px-4 py-2 rounded-lg text-sm border"
                        style={{ 
                          borderColor: currentTheme.colors.border,
                          color: currentTheme.colors.text,
                          fontFamily: currentTheme.fonts.secondary
                        }}
                      >
                        Full Width
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Effects Customization */}
              <div 
                className="p-6 rounded-2xl"
                style={{ 
                  backgroundColor: currentTheme.colors.surface,
                  boxShadow: currentTheme.shadows.md
                }}
              >
                <h4 
                  className="text-lg font-bold mb-4 flex items-center gap-2"
                  style={{ 
                    color: currentTheme.colors.text,
                    fontFamily: currentTheme.fonts.primary
                  }}
                >
                  <Feather className="w-5 h-5" style={{ color: currentTheme.colors.primary }} />
                  Effects & Transitions
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2"
                      style={{ 
                        color: currentTheme.colors.text,
                        fontFamily: currentTheme.fonts.secondary
                      }}
                    >
                      Animation Style
                    </label>
                    <div className="flex items-center gap-3">
                      <button 
                        className="px-4 py-2 rounded-lg text-sm border"
                        style={{ 
                          borderColor: currentTheme.colors.border,
                          color: currentTheme.colors.text,
                          fontFamily: currentTheme.fonts.secondary
                        }}
                      >
                        Subtle
                      </button>
                      <button 
                        className="px-4 py-2 rounded-lg text-sm border"
                        style={{ 
                          borderColor: currentTheme.colors.border,
                          color: currentTheme.colors.text,
                          fontFamily: currentTheme.fonts.secondary
                        }}
                      >
                        Dynamic
                      </button>
                      <button 
                        className="px-4 py-2 rounded-lg text-sm border"
                        style={{ 
                          borderColor: currentTheme.colors.border,
                          color: currentTheme.colors.text,
                          fontFamily: currentTheme.fonts.secondary
                        }}
                      >
                        None
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2"
                      style={{ 
                        color: currentTheme.colors.text,
                        fontFamily: currentTheme.fonts.secondary
                      }}
                    >
                      Shadow Intensity
                    </label>
                    <div className="flex items-center gap-3">
                      <button 
                        className="px-4 py-2 rounded-lg text-sm border"
                        style={{ 
                          borderColor: currentTheme.colors.border,
                          color: currentTheme.colors.text,
                          fontFamily: currentTheme.fonts.secondary
                        }}
                      >
                        Light
                      </button>
                      <button 
                        className="px-4 py-2 rounded-lg text-sm border"
                        style={{ 
                          borderColor: currentTheme.colors.border,
                          color: currentTheme.colors.text,
                          fontFamily: currentTheme.fonts.secondary
                        }}
                      >
                        Medium
                      </button>
                      <button 
                        className="px-4 py-2 rounded-lg text-sm border"
                        style={{ 
                          borderColor: currentTheme.colors.border,
                          color: currentTheme.colors.text,
                          fontFamily: currentTheme.fonts.secondary
                        }}
                      >
                        Heavy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div 
          className="border-t p-6"
          style={{ 
            borderColor: currentTheme.colors.border,
            backgroundColor: currentTheme.colors.background
          }}
        >
          <div className="flex items-center justify-between">
            <div 
              className="text-sm"
              style={{ 
                color: currentTheme.colors.textSecondary,
                fontFamily: currentTheme.fonts.secondary
              }}
            >
              <span className="font-semibold">Current Theme:</span> {currentTheme.name} • 
              <span className="font-semibold ml-2">Font:</span> {currentTheme.fonts.primary}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-8 py-3 rounded-xl text-white font-semibold shadow-lg"
              style={{ 
                background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
                boxShadow: currentTheme.shadows.lg,
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