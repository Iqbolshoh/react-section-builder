import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

interface Service {
  icon: string;
  title: string;
  description: string;
}

interface ServicesSectionProps {
  content: {
    title: string;
    services: Service[];
  };
  isEditing: boolean;
  onChange: (content: any) => void;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ content, isEditing, onChange }) => {
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
    <section className="py-20 bg-gray-50">
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
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 bg-transparent border-2 border-dashed border-blue-300 rounded-lg p-2 text-center"
                placeholder="Enter section title"
              />
            ) : (
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
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
                      className="text-sm border border-gray-300 rounded px-2 py-1 mb-2 w-full"
                      placeholder="Icon name (e.g., Star)"
                    />
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                      className="text-xl font-semibold text-gray-900 mb-4 bg-transparent border-2 border-dashed border-blue-300 rounded-lg p-2 w-full"
                      placeholder="Service title"
                    />
                    <textarea
                      value={service.description}
                      onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                      className="text-gray-600 leading-relaxed bg-transparent border-2 border-dashed border-blue-300 rounded-lg p-2 w-full h-24 resize-none"
                      placeholder="Service description"
                    />
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
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
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <LucideIcons.Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <span className="text-gray-600">Add Service</span>
              </div>
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;