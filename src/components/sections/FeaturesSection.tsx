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
  };
  colors: {
    primary: string;
    secondary: string;
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
    <section className="py-12 sm:py-20 bg-white" style={{ fontFamily: theme?.fonts?.primary }}>
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
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4" style={{ color: theme?.colors?.primary }}>
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
                className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300 relative group"
              >
                {isEditing && (
                  <button
                    onClick={() => removeFeature(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                )}
                
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={feature.icon}
                      onChange={(e) => handleFeatureChange(index, 'icon', e.target.value)}
                      className="text-sm border border-gray-300 rounded px-2 py-1 mb-2 w-full"
                      placeholder="Icon name (e.g., Star)"
                    />
                    <input
                      type="text"
                      value={feature.title}
                      onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                      className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 bg-transparent border-2 border-dashed border-blue-300 rounded-lg p-2 w-full"
                      placeholder="Feature title"
                    />
                    <textarea
                      value={feature.description}
                      onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                      className="text-gray-600 leading-relaxed bg-transparent border-2 border-dashed border-blue-300 rounded-lg p-2 w-full h-24 resize-none text-sm"
                      placeholder="Feature description"
                    />
                  </>
                ) : (
                  <>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
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
              className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <LucideIcons.Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <span className="text-gray-600 text-sm">Add Feature</span>
              </div>
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );

  const renderComparisonFeatures = () => (
    <section className="py-12 sm:py-20 bg-gray-50" style={{ fontFamily: theme?.fonts?.primary }}>
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
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4" style={{ color: theme?.colors?.primary }}>
              {content.title}
            </h2>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Basic</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Pro</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {content.features.map((feature, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          {React.createElement(getIcon(feature.icon), { className: "w-4 h-4 text-white" })}
                        </div>
                        <div>
                          {isEditing ? (
                            <input
                              type="text"
                              value={feature.title}
                              onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                              className="font-semibold text-gray-900 bg-transparent border border-gray-300 rounded px-2 py-1"
                              placeholder="Feature title"
                            />
                          ) : (
                            <div className="font-semibold text-gray-900">{feature.title}</div>
                          )}
                          {isEditing ? (
                            <input
                              type="text"
                              value={feature.description}
                              onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                              className="text-sm text-gray-600 bg-transparent border border-gray-300 rounded px-2 py-1 mt-1"
                              placeholder="Feature description"
                            />
                          ) : (
                            <div className="text-sm text-gray-600">{feature.description}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <LucideIcons.Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <LucideIcons.Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <LucideIcons.Check className="w-5 h-5 text-green-500 mx-auto" />
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
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
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