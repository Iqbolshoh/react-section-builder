import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

interface Service {
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
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

interface ServicesSectionProps {
  content: {
    title: string;
    services: Service[];
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ content, isEditing, onChange, theme }) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const handleServiceChange = (index: number, field: string, value: string) => {
    const updatedServices = [...content.services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    handleChange('services', updatedServices);
  };

  const addService = () => {
    const newService: Service = {
      icon: 'Star',
      title: 'New Service',
      description: 'Service description'
    };
    handleChange('services', [...content.services, newService]);
  };

  const removeService = (index: number) => {
    const updatedServices = content.services.filter((_, i) => i !== index);
    handleChange('services', updatedServices);
  };

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.Star;
    return Icon;
  };

  return (
    <section 
      className="py-20" 
      style={{ 
        backgroundColor: theme?.colors?.background || '#f9fafb',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {isEditing ? (
              <input
                type="text"
                value={content.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="text-3xl sm:text-4xl font-bold mb-4 bg-transparent border-2 border-dashed rounded-lg p-2 text-center"
                style={{ 
                  color: theme?.colors?.primary,
                  borderColor: `${theme?.colors?.primary}50`
                }}
                placeholder="Enter section title"
              />
            ) : (
              <h2 
                className="text-3xl sm:text-4xl font-bold mb-4"
                style={{ color: theme?.colors?.primary }}
              >
                {content.title}
              </h2>
            )}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.services.map((service, index) => {
            const Icon = getIcon(service.icon);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 relative group"
                style={{
                  backgroundColor: theme?.colors?.surface,
                  boxShadow: theme?.shadows?.lg
                }}
              >
                {isEditing && (
                  <button
                    onClick={() => removeService(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                )}
                
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={service.icon}
                      onChange={(e) => handleServiceChange(index, 'icon', e.target.value)}
                      className="text-sm border rounded px-2 py-1 mb-2 w-full"
                      style={{ 
                        borderColor: theme?.colors?.border,
                        color: theme?.colors?.text
                      }}
                      placeholder="Icon name (e.g., Star)"
                    />
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                      className="text-xl font-semibold mb-4 bg-transparent border-2 border-dashed rounded-lg p-2 w-full"
                      style={{ 
                        color: theme?.colors?.text,
                        borderColor: `${theme?.colors?.primary}50`
                      }}
                      placeholder="Service title"
                    />
                    <textarea
                      value={service.description}
                      onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                      className="leading-relaxed bg-transparent border-2 border-dashed rounded-lg p-2 w-full h-24 resize-none"
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        borderColor: `${theme?.colors?.primary}50`
                      }}
                      placeholder="Service description"
                    />
                  </>
                ) : (
                  <>
                    <h3 
                      className="text-xl font-semibold mb-4"
                      style={{ color: theme?.colors?.text }}
                    >
                      {service.title}
                    </h3>
                    <p 
                      className="leading-relaxed"
                      style={{ color: theme?.colors?.textSecondary }}
                    >
                      {service.description}
                    </p>
                  </>
                )}
              </motion.div>
            );
          })}
          
          {isEditing && (
            <motion.button
              onClick={addService}
              className="border-2 border-dashed rounded-xl p-8 transition-all duration-200 flex items-center justify-center"
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
            >
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  style={{ background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})` }}
                >
                  <LucideIcons.Plus 
                    className="w-8 h-8 mx-auto mb-2" 
                    style={{ color: theme?.colors?.textSecondary }}
                  />
                </div>
                <span style={{ color: theme?.colors?.textSecondary }}>Add Service</span>
              </div>
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;