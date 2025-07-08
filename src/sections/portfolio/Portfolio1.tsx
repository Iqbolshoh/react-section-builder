import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  image: string;
  category: string;
  url?: string;
}

interface Portfolio1Props {
  title: string;
  subtitle?: string;
  projects: Project[];
  categories: string[];
  customData?: any;
}

const Portfolio1: React.FC<Portfolio1Props> = ({
  title,
  subtitle,
  projects,
  categories,
  customData
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const bgColor = customData?.bgColor || '#f9fafb';
  const textColor = customData?.textColor || '#1f2937';
  const accentColor = customData?.accentColor || '#3b82f6';
  const secondaryTextColor = customData?.secondaryTextColor || '#6b7280';
  const surfaceColor = customData?.surfaceColor || '#ffffff';
  
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const allCategories = ['All', ...categories];

  return (
    <section 
      className="py-12 sm:py-20"
      style={{ 
        backgroundColor: bgColor,
        color: textColor
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
              style={{ color: accentColor }}
            >
              {title}
            </h2>
            {subtitle && (
              <p 
                className="text-lg sm:text-xl max-w-3xl mx-auto"
                style={{ color: secondaryTextColor }}
              >
                {subtitle}
              </p>
            )}
          </motion.div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium transition-colors"
              style={{
                backgroundColor: selectedCategory === category ? accentColor : surfaceColor,
                color: selectedCategory === category ? '#ffffff' : textColor
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden transition-shadow duration-300 group"
              style={{
                backgroundColor: surfaceColor,
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  {project.url && (
                    <a
                      href={project.url}
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 transform"
                      style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: textColor }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="mb-3">
                  <span 
                    className="text-sm font-medium"
                    style={{ color: accentColor }}
                  >
                    {project.category}
                  </span>
                </div>
                <h3 
                  className="text-xl font-semibold mb-3"
                  style={{ color: textColor }}
                >
                  {project.title}
                </h3>
                <p 
                  className="leading-relaxed"
                  style={{ color: secondaryTextColor }}
                >
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio1;