import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  image: string;
  category: string;
  url?: string;
}

interface Portfolio2Props {
  title: string;
  subtitle?: string;
  projects: Project[];
  categories: string[];
  customData?: any;
}

const Portfolio2: React.FC<Portfolio2Props> = ({
  title,
  subtitle,
  projects,
  categories,
  customData
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const bgColor = customData?.bgColor || '#ffffff';
  const textColor = customData?.textColor || '#1f2937';
  const accentColor = customData?.accentColor || '#3b82f6';
  const secondaryTextColor = customData?.secondaryTextColor || '#6b7280';
  
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
                backgroundColor: selectedCategory === category ? accentColor : 'transparent',
                color: selectedCategory === category ? '#ffffff' : textColor,
                border: `1px solid ${selectedCategory === category ? accentColor : '#e5e7eb'}`
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="break-inside-avoid mb-6 sm:mb-8 rounded-xl overflow-hidden transition-shadow duration-300 group"
              style={{
                backgroundColor: bgColor,
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: `${Math.random() * 0.5 + 0.75}` }} // Random aspect ratio for masonry effect
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 w-full">
                    <span 
                      className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium mb-2 text-white"
                    >
                      {project.category}
                    </span>
                    <h3 
                      className="text-xl font-semibold mb-1 text-white"
                    >
                      {project.title}
                    </h3>
                    {project.url && (
                      <a
                        href={project.url}
                        className="inline-flex items-center gap-1 text-sm text-white/90 hover:text-white transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Project
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio2;