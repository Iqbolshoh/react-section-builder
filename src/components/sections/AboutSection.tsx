import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import ImageUpload from '../ImageUpload';
import IconSelector from '../IconSelector';

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

interface AboutSectionProps {
  content: {
    title: string;
    description: string;
    image: string;
    stats?: { label: string; value: string }[];
    team?: { name: string; role: string; image: string }[];
    values?: { title: string; description: string; icon: string }[];
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
  variant?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ 
  content, 
  isEditing, 
  onChange, 
  theme,
  variant = 'about-story'
}) => {
  const [iconSelectorOpen, setIconSelectorOpen] = useState(false);
  const [editingIconIndex, setEditingIconIndex] = useState<number | null>(null);

  const handleChange = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const handleIconSelect = (iconName: string) => {
    if (editingIconIndex !== null && content.values) {
      const updatedValues = [...content.values];
      updatedValues[editingIconIndex] = { ...updatedValues[editingIconIndex], icon: iconName };
      handleChange('values', updatedValues);
    }
    setIconSelectorOpen(false);
    setEditingIconIndex(null);
  };

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.Star;
    return Icon;
  };

  const renderStoryAbout = () => (
    <section 
      className="py-12 sm:py-20" 
      style={{ 
        fontFamily: theme?.fonts?.primary,
        backgroundColor: theme?.colors?.surface || '#ffffff'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              {isEditing ? (
                <ImageUpload
                  value={content.image}
                  onChange={(url) => handleChange('image', url)}
                  placeholder="Add about image"
                  className="w-full h-64 sm:h-80 lg:h-96"
                  theme={theme}
                />
              ) : (
                <div className="relative">
                  <img
                    src={content.image}
                    alt="About"
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-3xl"
                    style={{ boxShadow: theme?.shadows?.xl }}
                  />
                  
                  {/* Decorative elements */}
                  <div 
                    className="absolute -top-6 -left-6 w-20 h-20 sm:w-28 sm:h-28 rounded-3xl opacity-20"
                    style={{ 
                      background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})` 
                    }}
                  ></div>
                  <div 
                    className="absolute -bottom-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl opacity-30"
                    style={{ 
                      background: `linear-gradient(135deg, ${theme?.colors?.accent}, ${theme?.colors?.primary})` 
                    }}
                  ></div>
                  
                  {/* Floating badge */}
                  <div 
                    className="absolute top-6 right-6 px-4 py-2 rounded-2xl text-white font-semibold text-sm backdrop-blur-sm"
                    style={{ 
                      backgroundColor: `${theme?.colors?.primary}90`,
                      fontFamily: theme?.fonts?.accent
                    }}
                  >
                    Our Story
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {isEditing ? (
                <input
                  type="text"
                  value={content.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 bg-transparent border-2 border-dashed rounded-xl p-3 w-full"
                  style={{ 
                    color: theme?.colors?.primary,
                    borderColor: `${theme?.colors?.primary}50`,
                    fontFamily: theme?.fonts?.primary
                  }}
                  placeholder="Enter section title"
                />
              ) : (
                <h2 
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6" 
                  style={{ 
                    color: theme?.colors?.primary,
                    fontFamily: theme?.fonts?.primary
                  }}
                >
                  {content.title}
                </h2>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {isEditing ? (
                <textarea
                  value={content.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="text-base sm:text-lg leading-relaxed bg-transparent border-2 border-dashed rounded-xl p-4 w-full h-32 sm:h-48 resize-none"
                  style={{ 
                    color: theme?.colors?.textSecondary,
                    borderColor: `${theme?.colors?.primary}50`,
                    fontFamily: theme?.fonts?.secondary
                  }}
                  placeholder="Enter description"
                />
              ) : (
                <p 
                  className="text-base sm:text-lg leading-relaxed mb-8"
                  style={{ 
                    color: theme?.colors?.textSecondary,
                    fontFamily: theme?.fonts?.secondary
                  }}
                >
                  {content.description}
                </p>
              )}
            </motion.div>

            {/* Stats */}
            {content.stats && content.stats.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 lg:mt-8"
              >
                {content.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => {
                            const updatedStats = [...content.stats];
                            updatedStats[index] = { ...updatedStats[index], value: e.target.value };
                            handleChange('stats', updatedStats);
                          }}
                          className="text-2xl sm:text-3xl font-bold mb-2 bg-transparent border rounded-lg px-2 py-1 w-full text-center"
                          style={{ 
                            color: theme?.colors?.primary,
                            borderColor: theme?.colors?.border,
                            fontFamily: theme?.fonts?.accent
                          }}
                          placeholder="Value"
                        />
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => {
                            const updatedStats = [...content.stats];
                            updatedStats[index] = { ...updatedStats[index], label: e.target.value };
                            handleChange('stats', updatedStats);
                          }}
                          className="bg-transparent border rounded-lg px-2 py-1 w-full text-center text-sm"
                          style={{ 
                            color: theme?.colors?.textSecondary,
                            borderColor: theme?.colors?.border,
                            fontFamily: theme?.fonts?.secondary
                          }}
                          placeholder="Label"
                        />
                      </>
                    ) : (
                      <>
                        <div 
                          className="text-2xl sm:text-3xl font-bold mb-2" 
                          style={{ 
                            color: theme?.colors?.primary,
                            fontFamily: theme?.fonts?.accent
                          }}
                        >
                          {stat.value}
                        </div>
                        <div 
                          className="text-sm sm:text-base"
                          style={{ 
                            color: theme?.colors?.textSecondary,
                            fontFamily: theme?.fonts?.secondary
                          }}
                        >
                          {stat.label}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </motion.div>
            )}

            {/* CTA Button */}
            {!isEditing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <button
                  className="px-8 py-4 rounded-2xl text-white font-semibold transition-all duration-300 hover:scale-105"
                  style={{ 
                    background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                    boxShadow: theme?.shadows?.lg,
                    fontFamily: theme?.fonts?.accent
                  }}
                >
                  Learn More About Us
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );

  const renderTeamAbout = () => (
    <section 
      className="py-12 sm:py-20" 
      style={{ 
        fontFamily: theme?.fonts?.primary,
        backgroundColor: theme?.colors?.background || '#f9fafb'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-16">
          {isEditing ? (
            <input
              type="text"
              value={content.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-transparent border-2 border-dashed rounded-xl p-3 text-center w-full max-w-2xl mx-auto"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {content.team?.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-2xl transition-all duration-300 hover:scale-105"
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
              {isEditing ? (
                <>
                  <input
                    type="url"
                    value={member.image}
                    onChange={(e) => {
                      const updatedTeam = [...(content.team || [])];
                      updatedTeam[index] = { ...updatedTeam[index], image: e.target.value };
                      handleChange('team', updatedTeam);
                    }}
                    className="w-full mb-4 px-2 py-1 border rounded-lg text-sm"
                    style={{ 
                      borderColor: theme?.colors?.border,
                      fontFamily: theme?.fonts?.secondary
                    }}
                    placeholder="Image URL"
                  />
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => {
                      const updatedTeam = [...(content.team || [])];
                      updatedTeam[index] = { ...updatedTeam[index], name: e.target.value };
                      handleChange('team', updatedTeam);
                    }}
                    className="text-lg font-semibold mb-2 bg-transparent border rounded-lg px-2 py-1 w-full text-center"
                    style={{ 
                      color: theme?.colors?.text,
                      borderColor: theme?.colors?.border,
                      fontFamily: theme?.fonts?.primary
                    }}
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    value={member.role}
                    onChange={(e) => {
                      const updatedTeam = [...(content.team || [])];
                      updatedTeam[index] = { ...updatedTeam[index], role: e.target.value };
                      handleChange('team', updatedTeam);
                    }}
                    className="bg-transparent border rounded-lg px-2 py-1 w-full text-center text-sm"
                    style={{ 
                      color: theme?.colors?.textSecondary,
                      borderColor: theme?.colors?.border,
                      fontFamily: theme?.fonts?.secondary
                    }}
                    placeholder="Role"
                  />
                </>
              ) : (
                <>
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mx-auto object-cover"
                      style={{ boxShadow: theme?.shadows?.md }}
                    />
                    <div 
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ 
                        background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})` 
                      }}
                    >
                      <LucideIcons.Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h3 
                    className="text-lg font-semibold mb-2"
                    style={{ 
                      color: theme?.colors?.text,
                      fontFamily: theme?.fonts?.primary
                    }}
                  >
                    {member.name}
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ 
                      color: theme?.colors?.textSecondary,
                      fontFamily: theme?.fonts?.secondary
                    }}
                  >
                    {member.role}
                  </p>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderValuesAbout = () => (
    <section 
      className="py-12 sm:py-20" 
      style={{ 
        fontFamily: theme?.fonts?.primary,
        backgroundColor: theme?.colors?.surface || '#ffffff'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-16">
          {isEditing ? (
            <input
              type="text"
              value={content.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-transparent border-2 border-dashed rounded-xl p-3 text-center w-full max-w-2xl mx-auto"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {content.values?.map((value, index) => {
            const Icon = getIcon(value.icon);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl transition-all duration-300 hover:scale-105"
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
                <div className="relative mb-6">
                  <div 
                    className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center relative"
                    style={{ 
                      background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})` 
                    }}
                  >
                    <Icon 
                      className="w-10 h-10 text-white" 
                      style={{ color: '#ffffff' }}
                    />
                  </div>
                  
                  {isEditing && (
                    <button
                      onClick={() => {
                        setEditingIconIndex(index);
                        setIconSelectorOpen(true);
                      }}
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold transition-all hover:scale-110"
                      style={{ backgroundColor: theme?.colors?.accent }}
                    >
                      ✎
                    </button>
                  )}
                </div>
                
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={value.title}
                      onChange={(e) => {
                        const updatedValues = [...(content.values || [])];
                        updatedValues[index] = { ...updatedValues[index], title: e.target.value };
                        handleChange('values', updatedValues);
                      }}
                      className="text-lg font-semibold mb-4 bg-transparent border-2 border-dashed rounded-xl p-2 w-full text-center"
                      style={{ 
                        color: theme?.colors?.text,
                        borderColor: `${theme?.colors?.primary}50`,
                        fontFamily: theme?.fonts?.primary
                      }}
                      placeholder="Value title"
                    />
                    <textarea
                      value={value.description}
                      onChange={(e) => {
                        const updatedValues = [...(content.values || [])];
                        updatedValues[index] = { ...updatedValues[index], description: e.target.value };
                        handleChange('values', updatedValues);
                      }}
                      className="leading-relaxed bg-transparent border-2 border-dashed rounded-xl p-2 w-full h-20 resize-none text-sm"
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        borderColor: `${theme?.colors?.primary}50`,
                        fontFamily: theme?.fonts?.secondary
                      }}
                      placeholder="Value description"
                    />
                  </>
                ) : (
                  <>
                    <h3 
                      className="text-lg font-semibold mb-4"
                      style={{ 
                        color: theme?.colors?.text,
                        fontFamily: theme?.fonts?.primary
                      }}
                    >
                      {value.title}
                    </h3>
                    <p 
                      className="leading-relaxed text-sm"
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        fontFamily: theme?.fonts?.secondary
                      }}
                    >
                      {value.description}
                    </p>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Icon Selector Modal */}
      <IconSelector
        isOpen={iconSelectorOpen}
        onClose={() => {
          setIconSelectorOpen(false);
          setEditingIconIndex(null);
        }}
        onSelect={handleIconSelect}
        currentIcon={editingIconIndex !== null ? content.values?.[editingIconIndex]?.icon : undefined}
      />
    </section>
  );

  // Initialize default content based on variant
  React.useEffect(() => {
    if (variant === 'about-team' && !content.team) {
      handleChange('team', [
        { name: 'Sarah Johnson', role: 'CEO & Founder', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
        { name: 'Michael Chen', role: 'CTO', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
        { name: 'Emily Rodriguez', role: 'Head of Design', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
        { name: 'David Kim', role: 'Lead Developer', image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' }
      ]);
    } else if (variant === 'about-values' && !content.values) {
      handleChange('values', [
        { title: 'Innovation', description: 'We constantly push boundaries and explore new possibilities', icon: 'Lightbulb' },
        { title: 'Teamwork', description: 'Together we achieve more than we ever could alone', icon: 'Users' },
        { title: 'Excellence', description: 'Quality and attention to detail in everything we do', icon: 'Award' },
        { title: 'Integrity', description: 'Honest, transparent, and ethical in all our dealings', icon: 'Shield' },
        { title: 'Growth', description: 'Continuous learning and improvement for our team and clients', icon: 'TrendingUp' },
        { title: 'Impact', description: 'Making a positive difference in the world around us', icon: 'Target' }
      ]);
    } else if (variant === 'about-story' && !content.stats) {
      handleChange('stats', [
        { value: '10+', label: 'Years Experience' },
        { value: '500+', label: 'Happy Clients' },
        { value: '1000+', label: 'Projects Completed' },
        { value: '50+', label: 'Team Members' },
        { value: '25+', label: 'Countries Served' },
        { value: '99%', label: 'Client Satisfaction' }
      ]);
    }
  }, [variant]);

  switch (variant) {
    case 'about-team':
      return renderTeamAbout();
    case 'about-values':
      return renderValuesAbout();
    default:
      return renderStoryAbout();
  }
};

export default AboutSection;