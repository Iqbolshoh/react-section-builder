import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

interface Feature {
  icon: string;
  title: string;
  description: string;
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
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

interface FeaturesSectionProps {
  content: {
    title: string;
    subtitle?: string;
    features: Feature[];
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
  variant?: string;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ 
  content, 
  isEditing, 
  onChange, 
  theme,
  variant = 'features-grid'
}) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const handleFeatureChange = (index: number, field: string, value: string) => {
    const updatedFeatures = [...content.features];
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
    handleChange('features', updatedFeatures);
  };

  const addFeature = () => {
    const newFeature: Feature = {
      icon: 'Star',
      title: 'New Feature',
      description: 'Feature description'
    };
    handleChange('features', [...content.features, newFeature]);
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = content.features.filter((_, i) => i !== index);
    handleChange('features', updatedFeatures);
  };

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.Star;
    return Icon;
  };

  const renderGridFeatures = () => (
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
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-transparent border-2 border-dashed rounded-lg p-2 text-center w-full max-w-2xl mx-auto"
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
                className="text-lg sm:text-xl bg-transparent border-2 border-dashed rounded-lg p-2 text-center w-full max-w-3xl mx-auto"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {content.features.map((feature, index) => {
            const Icon = getIcon(feature.icon);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-xl transition-shadow duration-300 relative group"
                style={{ 
                  backgroundColor: theme?.colors?.background || '#f9fafb',
                  boxShadow: theme?.shadows?.sm
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = theme?.shadows?.lg || '0 10px 15px -3px rgb(0 0 0 / 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = theme?.shadows?.sm || '0 1px 2px 0 rgb(0 0 0 / 0.05)';
                }}
              >
                {isEditing && (
                  <button
                    onClick={() => removeFeature(index)}
                    className="absolute top-2 right-2 w-6 h-6 text-white rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: theme?.colors?.error }}
                  >
                    ×
                  </button>
                )}
                
                <div 
                  className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})` }}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={feature.icon}
                      onChange={(e) => handleFeatureChange(index, 'icon', e.target.value)}
                      className="text-sm border rounded px-2 py-1 mb-2 w-full"
                      style={{ 
                        borderColor: theme?.colors?.border,
                        color: theme?.colors?.text,
                        backgroundColor: theme?.colors?.surface
                      }}
                      placeholder="Icon name (e.g., Star)"
                    />
                    <input
                      type="text"
                      value={feature.title}
                      onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                      className="text-lg sm:text-xl font-semibold mb-4 bg-transparent border-2 border-dashed rounded-lg p-2 w-full"
                      style={{ 
                        color: theme?.colors?.text,
                        borderColor: `${theme?.colors?.primary}50`,
                        fontFamily: theme?.fonts?.primary
                      }}
                      placeholder="Feature title"
                    />
                    <textarea
                      value={feature.description}
                      onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                      className="leading-relaxed bg-transparent border-2 border-dashed rounded-lg p-2 w-full h-24 resize-none text-sm"
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        borderColor: `${theme?.colors?.primary}50`,
                        fontFamily: theme?.fonts?.secondary
                      }}
                      placeholder="Feature description"
                    />
                  </>
                ) : (
                  <>
                    <h3 
                      className="text-lg sm:text-xl font-semibold mb-4"
                      style={{ 
                        color: theme?.colors?.text,
                        fontFamily: theme?.fonts?.primary
                      }}
                    >
                      {feature.title}
                    </h3>
                    <p 
                      className="leading-relaxed text-sm sm:text-base"
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        fontFamily: theme?.fonts?.secondary
                      }}
                    >
                      {feature.description}
                    </p>
                  </>
                )}
              </motion.div>
            );
          })}
          
          {isEditing && (
            <motion.button
              onClick={addFeature}
              className="border-2 border-dashed rounded-xl p-6 transition-all duration-200 flex items-center justify-center"
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
                <LucideIcons.Plus className="w-8 h-8 mx-auto mb-2" style={{ color: theme?.colors?.textSecondary }} />
                <span className="text-sm" style={{ color: theme?.colors?.textSecondary }}>Add Feature</span>
              </div>
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );

  const renderComparisonFeatures = () => (
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

        <div 
          className="rounded-2xl overflow-hidden"
          style={{ 
            backgroundColor: theme?.colors?.surface,
            boxShadow: theme?.shadows?.xl
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead 
                style={{ backgroundColor: theme?.colors?.background }}
              >
                <tr>
                  <th 
                    className="px-6 py-4 text-left text-sm font-semibold"
                    style={{ 
                      color: theme?.colors?.text,
                      fontFamily: theme?.fonts?.primary
                    }}
                  >
                    Feature
                  </th>
                  <th 
                    className="px-6 py-4 text-center text-sm font-semibold"
                    style={{ 
                      color: theme?.colors?.text,
                      fontFamily: theme?.fonts?.primary
                    }}
                  >
                    Basic
                  </th>
                  <th 
                    className="px-6 py-4 text-center text-sm font-semibold"
                    style={{ 
                      color: theme?.colors?.text,
                      fontFamily: theme?.fonts?.primary
                    }}
                  >
                    Pro
                  </th>
                  <th 
                    className="px-6 py-4 text-center text-sm font-semibold"
                    style={{ 
                      color: theme?.colors?.text,
                      fontFamily: theme?.fonts?.primary
                    }}
                  >
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody 
                className="divide-y"
                style={{ borderColor: theme?.colors?.border }}
              >
                {content.features.map((feature, index) => (
                  <tr 
                    key={index} 
                    className="transition-colors"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${theme?.colors?.primary}05` || '#f9fafb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})` }}
                        >
                          {React.createElement(getIcon(feature.icon), { className: "w-4 h-4 text-white" })}
                        </div>
                        <div>
                          {isEditing ? (
                            <>
                              <input
                                type="text"
                                value={feature.title}
                                onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                                className="font-semibold bg-transparent border border-gray-300 rounded px-2 py-1"
                                style={{ 
                                  color: theme?.colors?.text,
                                  borderColor: theme?.colors?.border,
                                  fontFamily: theme?.fonts?.primary
                                }}
                                placeholder="Feature title"
                              />
                              <input
                                type="text"
                                value={feature.description}
                                onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                                className="text-sm bg-transparent border border-gray-300 rounded px-2 py-1 mt-1"
                                style={{ 
                                  color: theme?.colors?.textSecondary,
                                  borderColor: theme?.colors?.border,
                                  fontFamily: theme?.fonts?.secondary
                                }}
                                placeholder="Feature description"
                              />
                            </>
                          ) : (
                            <>
                              <div 
                                className="font-semibold"
                                style={{ 
                                  color: theme?.colors?.text,
                                  fontFamily: theme?.fonts?.primary
                                }}
                              >
                                {feature.title}
                              </div>
                              <div 
                                className="text-sm"
                                style={{ 
                                  color: theme?.colors?.textSecondary,
                                  fontFamily: theme?.fonts?.secondary
                                }}
                              >
                                {feature.description}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <LucideIcons.Check className="w-5 h-5 mx-auto" style={{ color: theme?.colors?.success }} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <LucideIcons.Check className="w-5 h-5 mx-auto" style={{ color: theme?.colors?.success }} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <LucideIcons.Check className="w-5 h-5 mx-auto" style={{ color: theme?.colors?.success }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isEditing && (
          <div className="text-center mt-8">
            <button
              onClick={addFeature}
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
              <LucideIcons.Plus className="w-5 h-5" />
              Add Feature
            </button>
          </div>
        )}
      </div>
    </section>
  );

  switch (variant) {
    case 'features-comparison':
      return renderComparisonFeatures();
    case 'features-showcase':
      return renderGridFeatures(); // Similar to grid but with larger cards
    default:
      return renderGridFeatures();
  }
};

export default FeaturesSection;