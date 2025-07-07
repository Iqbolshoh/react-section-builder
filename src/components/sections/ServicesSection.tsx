import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { Plus, X } from 'lucide-react';

interface Service {
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

interface ServicesSectionProps {
  content: {
    title: string;
    subtitle?: string;
    services: Service[];
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
  variant?: string;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  content, 
  isEditing, 
  onChange, 
  theme,
  variant = 'services-grid'
}) => {
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

  // Grid Layout
  const renderGridServices = () => (
    <section 
      className="py-12 sm:py-20" 
      style={{ 
        backgroundColor: theme?.colors?.background || '#f9fafb',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={content.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="text-3xl sm:text-4xl font-bold mb-4 bg-transparent border-2 border-dashed rounded-xl p-3 text-center w-full max-w-2xl mx-auto"
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
                  className="text-3xl sm:text-4xl font-bold mb-4"
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
                className="rounded-xl p-8 transition-shadow duration-300 relative group"
                style={{
                  backgroundColor: theme?.colors?.surface,
                  boxShadow: theme?.shadows?.lg
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = theme?.shadows?.xl || '0 20px 25px -5px rgb(0 0 0 / 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = theme?.shadows?.lg || '0 10px 15px -3px rgb(0 0 0 / 0.1)';
                }}
              >
                {isEditing && (
                  <button
                    onClick={() => removeService(index)}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ 
                      backgroundColor: theme?.colors?.error,
                      color: '#ffffff'
                    }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  style={{ 
                    background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})` 
                  }}
                >
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
                        color: theme?.colors?.text,
                        backgroundColor: theme?.colors?.surface
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
                        borderColor: `${theme?.colors?.primary}50`,
                        fontFamily: theme?.fonts?.primary
                      }}
                      placeholder="Service title"
                    />
                    <textarea
                      value={service.description}
                      onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                      className="leading-relaxed bg-transparent border-2 border-dashed rounded-lg p-2 w-full h-24 resize-none"
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        borderColor: `${theme?.colors?.primary}50`,
                        fontFamily: theme?.fonts?.secondary
                      }}
                      placeholder="Service description"
                    />
                  </>
                ) : (
                  <>
                    <h3 
                      className="text-xl font-semibold mb-4"
                      style={{ 
                        color: theme?.colors?.text,
                        fontFamily: theme?.fonts?.primary
                      }}
                    >
                      {service.title}
                    </h3>
                    <p 
                      className="leading-relaxed"
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        fontFamily: theme?.fonts?.secondary
                      }}
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
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <Plus className="w-8 h-8 mx-auto mb-2" style={{ color: theme?.colors?.textSecondary }} />
                <span style={{ color: theme?.colors?.textSecondary }}>Add Service</span>
              </div>
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );

  // List Layout
  const renderListServices = () => (
    <section 
      className="py-12 sm:py-20" 
      style={{ 
        backgroundColor: theme?.colors?.surface || '#ffffff',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={content.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="text-3xl sm:text-4xl font-bold mb-4 bg-transparent border-2 border-dashed rounded-xl p-3 text-center w-full max-w-2xl mx-auto"
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
                  className="text-3xl sm:text-4xl font-bold mb-4"
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
          </motion.div>
        </div>

        <div className="space-y-8">
          {content.services.map((service, index) => {
            const Icon = getIcon(service.icon);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-6 rounded-xl p-6 transition-shadow duration-300 relative group"
                style={{
                  backgroundColor: theme?.colors?.background,
                  boxShadow: theme?.shadows?.md
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = theme?.shadows?.lg || '0 10px 15px -3px rgb(0 0 0 / 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = theme?.shadows?.md || '0 4px 6px -1px rgb(0 0 0 / 0.1)';
                }}
              >
                {isEditing && (
                  <button
                    onClick={() => removeService(index)}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ 
                      backgroundColor: theme?.colors?.error,
                      color: '#ffffff'
                    }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                
                <div className="md:w-1/4 flex justify-center md:justify-start">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ 
                      background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})` 
                    }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <div className="md:w-3/4">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={service.icon}
                        onChange={(e) => handleServiceChange(index, 'icon', e.target.value)}
                        className="text-sm border rounded px-2 py-1 mb-2"
                        style={{ 
                          borderColor: theme?.colors?.border,
                          color: theme?.colors?.text,
                          backgroundColor: theme?.colors?.surface
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
                          borderColor: `${theme?.colors?.primary}50`,
                          fontFamily: theme?.fonts?.primary
                        }}
                        placeholder="Service title"
                      />
                      <textarea
                        value={service.description}
                        onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                        className="leading-relaxed bg-transparent border-2 border-dashed rounded-lg p-2 w-full h-24 resize-none"
                        style={{ 
                          color: theme?.colors?.textSecondary,
                          borderColor: `${theme?.colors?.primary}50`,
                          fontFamily: theme?.fonts?.secondary
                        }}
                        placeholder="Service description"
                      />
                    </>
                  ) : (
                    <>
                      <h3 
                        className="text-xl font-semibold mb-4"
                        style={{ 
                          color: theme?.colors?.text,
                          fontFamily: theme?.fonts?.primary
                        }}
                      >
                        {service.title}
                      </h3>
                      <p 
                        className="leading-relaxed"
                        style={{ 
                          color: theme?.colors?.textSecondary,
                          fontFamily: theme?.fonts?.secondary
                        }}
                      >
                        {service.description}
                      </p>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
          
          {isEditing && (
            <motion.button
              onClick={addService}
              className="border-2 border-dashed rounded-xl p-8 transition-all duration-200 flex items-center justify-center w-full"
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
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="text-center">
                <Plus className="w-8 h-8 mx-auto mb-2" style={{ color: theme?.colors?.textSecondary }} />
                <span style={{ color: theme?.colors?.textSecondary }}>Add Service</span>
              </div>
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );

  // Cards Layout
  const renderCardsServices = () => (
    <section 
      className="py-12 sm:py-20" 
      style={{ 
        backgroundColor: theme?.colors?.background || '#f9fafb',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={content.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="text-3xl sm:text-4xl font-bold mb-4 bg-transparent border-2 border-dashed rounded-xl p-3 text-center w-full max-w-2xl mx-auto"
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
                  className="text-3xl sm:text-4xl font-bold mb-4"
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
                className="rounded-xl overflow-hidden transition-shadow duration-300 relative group"
                style={{
                  backgroundColor: theme?.colors?.surface,
                  boxShadow: theme?.shadows?.lg
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = theme?.shadows?.xl || '0 20px 25px -5px rgb(0 0 0 / 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = theme?.shadows?.lg || '0 10px 15px -3px rgb(0 0 0 / 0.1)';
                }}
              >
                {isEditing && (
                  <button
                    onClick={() => removeService(index)}
                    className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ 
                      backgroundColor: theme?.colors?.error,
                      color: '#ffffff'
                    }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                
                <div 
                  className="h-32 flex items-center justify-center relative overflow-hidden"
                  style={{ 
                    background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})` 
                  }}
                >
                  <Icon className="w-16 h-16 text-white" />
                  
                  {/* Decorative elements */}
                  <div 
                    className="absolute -top-6 -left-6 w-20 h-20 rounded-full opacity-20 bg-white"
                  ></div>
                  <div 
                    className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full opacity-20 bg-white"
                  ></div>
                </div>
                
                <div className="p-6">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={service.icon}
                        onChange={(e) => handleServiceChange(index, 'icon', e.target.value)}
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
                        value={service.title}
                        onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                        className="text-xl font-semibold mb-4 bg-transparent border-2 border-dashed rounded-lg p-2 w-full"
                        style={{ 
                          color: theme?.colors?.text,
                          borderColor: `${theme?.colors?.primary}50`,
                          fontFamily: theme?.fonts?.primary
                        }}
                        placeholder="Service title"
                      />
                      <textarea
                        value={service.description}
                        onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                        className="leading-relaxed bg-transparent border-2 border-dashed rounded-lg p-2 w-full h-24 resize-none"
                        style={{ 
                          color: theme?.colors?.textSecondary,
                          borderColor: `${theme?.colors?.primary}50`,
                          fontFamily: theme?.fonts?.secondary
                        }}
                        placeholder="Service description"
                      />
                    </>
                  ) : (
                    <>
                      <h3 
                        className="text-xl font-semibold mb-4"
                        style={{ 
                          color: theme?.colors?.text,
                          fontFamily: theme?.fonts?.primary
                        }}
                      >
                        {service.title}
                      </h3>
                      <p 
                        className="leading-relaxed"
                        style={{ 
                          color: theme?.colors?.textSecondary,
                          fontFamily: theme?.fonts?.secondary
                        }}
                      >
                        {service.description}
                      </p>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
          
          {isEditing && (
            <motion.button
              onClick={addService}
              className="border-2 border-dashed rounded-xl p-8 transition-all duration-200 flex items-center justify-center h-full"
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
                <span style={{ color: theme?.colors?.textSecondary }}>Add Service</span>
              </div>
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );

  // Initialize default content if needed
  React.useEffect(() => {
    if (!content.subtitle) {
      handleChange('subtitle', 'We offer a wide range of professional services to help your business grow');
    }
  }, []);

  switch (variant) {
    case 'services-list':
      return renderListServices();
    case 'services-cards':
      return renderCardsServices();
    default:
      return renderGridServices();
  }
};

export default ServicesSection;