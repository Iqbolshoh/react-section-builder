import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Plus, X } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string;
  category: string;
  url?: string;
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

interface PortfolioSectionProps {
  content: {
    title: string;
    subtitle?: string;
    projects: Project[];
    categories: string[];
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
  variant?: string;
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ 
  content, 
  isEditing, 
  onChange, 
  theme,
  variant = 'portfolio-grid'
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleChange = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const handleProjectChange = (index: number, field: string, value: string) => {
    const updatedProjects = [...content.projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    handleChange('projects', updatedProjects);
  };

  const addProject = () => {
    const newProject: Project = {
      title: 'New Project',
      description: 'Project description',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      category: 'Web Design',
      url: '#'
    };
    handleChange('projects', [...content.projects, newProject]);
  };

  const removeProject = (index: number) => {
    const updatedProjects = content.projects.filter((_, i) => i !== index);
    handleChange('projects', updatedProjects);
  };

  const filteredProjects = selectedCategory === 'All' 
    ? content.projects 
    : content.projects.filter(project => project.category === selectedCategory);

  const allCategories = ['All', ...content.categories];

  const renderGridPortfolio = () => (
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

        {/* Category Filter */}
        {!isEditing && (
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium transition-colors`}
                style={{
                  backgroundColor: selectedCategory === category ? theme?.colors?.primary : theme?.colors?.surface,
                  color: selectedCategory === category ? '#ffffff' : theme?.colors?.text,
                  fontFamily: theme?.fonts?.secondary
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.backgroundColor = `${theme?.colors?.primary}20` || '#f3f4f6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.backgroundColor = theme?.colors?.surface || '#ffffff';
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {(isEditing ? content.projects : filteredProjects).map((project, index) => (
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
                  onClick={() => removeProject(index)}
                  className="absolute top-2 right-2 z-10 w-6 h-6 text-white rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: theme?.colors?.error }}
                >
                  ×
                </button>
              )}

              <div className="relative overflow-hidden">
                {isEditing ? (
                  <div 
                    className="h-48 flex items-center justify-center"
                    style={{ backgroundColor: theme?.colors?.background }}
                  >
                    <input
                      type="url"
                      value={project.image}
                      onChange={(e) => handleProjectChange(index, 'image', e.target.value)}
                      className="w-full h-full px-4 py-2 text-center text-sm"
                      style={{ 
                        backgroundColor: 'transparent',
                        color: theme?.colors?.text,
                        border: `2px dashed ${theme?.colors?.primary}50`
                      }}
                      placeholder="Image URL"
                    />
                  </div>
                ) : (
                  <>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <a
                        href={project.url}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 transform"
                        style={{ boxShadow: theme?.shadows?.lg }}
                      >
                        <ExternalLink className="w-5 h-5" style={{ color: theme?.colors?.text }} />
                      </a>
                    </div>
                  </>
                )}
              </div>

              <div className="p-6">
                <div className="mb-3">
                  {isEditing ? (
                    <input
                      type="text"
                      value={project.category}
                      onChange={(e) => handleProjectChange(index, 'category', e.target.value)}
                      className="text-sm font-medium bg-transparent border border-gray-300 rounded px-2 py-1"
                      style={{ 
                        color: theme?.colors?.primary,
                        borderColor: theme?.colors?.border,
                        fontFamily: theme?.fonts?.secondary
                      }}
                      placeholder="Category"
                    />
                  ) : (
                    <span 
                      className="text-sm font-medium"
                      style={{ 
                        color: theme?.colors?.primary,
                        fontFamily: theme?.fonts?.secondary
                      }}
                    >
                      {project.category}
                    </span>
                  )}
                </div>

                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                      className="text-xl font-semibold mb-3 bg-transparent border-2 border-dashed rounded-lg p-2 w-full"
                      style={{ 
                        color: theme?.colors?.text,
                        borderColor: `${theme?.colors?.primary}50`,
                        fontFamily: theme?.fonts?.primary
                      }}
                      placeholder="Project title"
                    />
                    <textarea
                      value={project.description}
                      onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                      className="leading-relaxed bg-transparent border-2 border-dashed rounded-lg p-2 w-full h-20 resize-none text-sm"
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        borderColor: `${theme?.colors?.primary}50`,
                        fontFamily: theme?.fonts?.secondary
                      }}
                      placeholder="Project description"
                    />
                    <input
                      type="url"
                      value={project.url || ''}
                      onChange={(e) => handleProjectChange(index, 'url', e.target.value)}
                      className="mt-2 w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      style={{ 
                        borderColor: theme?.colors?.border,
                        color: theme?.colors?.text,
                        backgroundColor: theme?.colors?.surface
                      }}
                      placeholder="Project URL"
                    />
                  </>
                ) : (
                  <>
                    <h3 
                      className="text-xl font-semibold mb-3"
                      style={{ 
                        color: theme?.colors?.text,
                        fontFamily: theme?.fonts?.primary
                      }}
                    >
                      {project.title}
                    </h3>
                    <p 
                      className="leading-relaxed text-sm"
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        fontFamily: theme?.fonts?.secondary
                      }}
                    >
                      {project.description}
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          ))}
          
          {isEditing && (
            <motion.button
              onClick={addProject}
              className="border-2 border-dashed rounded-xl p-8 transition-all duration-200 flex items-center justify-center min-h-[300px]"
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
                <span style={{ color: theme?.colors?.textSecondary }}>Add Project</span>
              </div>
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );

  const renderMasonryPortfolio = () => (
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

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 sm:gap-8">
          {(isEditing ? content.projects : filteredProjects).map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="break-inside-avoid mb-6 sm:mb-8 rounded-xl overflow-hidden transition-shadow duration-300 relative group"
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
                  onClick={() => removeProject(index)}
                  className="absolute top-2 right-2 z-10 w-6 h-6 text-white rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: theme?.colors?.error }}
                >
                  ×
                </button>
              )}

              <div className="relative">
                {isEditing ? (
                  <div 
                    className="h-48 flex items-center justify-center"
                    style={{ backgroundColor: theme?.colors?.background }}
                  >
                    <input
                      type="url"
                      value={project.image}
                      onChange={(e) => handleProjectChange(index, 'image', e.target.value)}
                      className="w-full h-full px-4 py-2 text-center text-sm"
                      style={{ 
                        backgroundColor: 'transparent',
                        color: theme?.colors?.text,
                        border: `2px dashed ${theme?.colors?.primary}50`
                      }}
                      placeholder="Image URL"
                    />
                  </div>
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: `${Math.random() * 0.5 + 0.75}` }} // Random aspect ratio for masonry effect
                  />
                )}
              </div>

              <div className="p-4 sm:p-6">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                      className="text-lg font-semibold mb-2 bg-transparent border-2 border-dashed rounded-lg p-2 w-full"
                      style={{ 
                        color: theme?.colors?.text,
                        borderColor: `${theme?.colors?.primary}50`,
                        fontFamily: theme?.fonts?.primary
                      }}
                      placeholder="Project title"
                    />
                    <textarea
                      value={project.description}
                      onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                      className="leading-relaxed bg-transparent border-2 border-dashed rounded-lg p-2 w-full h-16 resize-none text-sm"
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        borderColor: `${theme?.colors?.primary}50`,
                        fontFamily: theme?.fonts?.secondary
                      }}
                      placeholder="Project description"
                    />
                  </>
                ) : (
                  <>
                    <h3 
                      className="text-lg font-semibold mb-2"
                      style={{ 
                        color: theme?.colors?.text,
                        fontFamily: theme?.fonts?.primary
                      }}
                    >
                      {project.title}
                    </h3>
                    <p 
                      className="leading-relaxed text-sm"
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        fontFamily: theme?.fonts?.secondary
                      }}
                    >
                      {project.description}
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {isEditing && (
          <div className="text-center mt-8">
            <button
              onClick={addProject}
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
              <Plus className="w-5 h-5" />
              Add Project
            </button>
          </div>
        )}
      </div>
    </section>
  );

  switch (variant) {
    case 'portfolio-masonry':
      return renderMasonryPortfolio();
    case 'portfolio-slider':
      return renderGridPortfolio(); // Could implement slider variant
    default:
      return renderGridPortfolio();
  }
};

export default PortfolioSection;