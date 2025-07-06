import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award } from 'lucide-react';
import ImageUpload from '../ImageUpload';

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
  theme?: any;
  variant?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ 
  content, 
  isEditing, 
  onChange, 
  theme,
  variant = 'about-story'
}) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const renderStoryAbout = () => (
    <section className="py-12 sm:py-20 bg-white" style={{ fontFamily: theme?.fontFamily }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {isEditing ? (
                <ImageUpload
                  value={content.image}
                  onChange={(url) => handleChange('image', url)}
                  placeholder="Add about image"
                  className="w-full h-64 sm:h-80 lg:h-96"
                />
              ) : (
                <img
                  src={content.image}
                  alt="About"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-lg"
                />
              )}
              
              {/* Decorative elements */}
              {!isEditing && (
                <>
                  <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20"></div>
                  <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-30"></div>
                </>
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
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6 bg-transparent border-2 border-dashed border-blue-300 rounded-lg p-2 w-full"
                  placeholder="Enter section title"
                />
              ) : (
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6" style={{ color: theme?.primaryColor }}>
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
                  className="text-base sm:text-lg text-gray-600 leading-relaxed bg-transparent border-2 border-dashed border-blue-300 rounded-lg p-4 w-full h-32 sm:h-48 resize-none"
                  placeholder="Enter description"
                />
              ) : (
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
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
                          className="text-2xl sm:text-3xl font-bold mb-2 bg-transparent border border-gray-300 rounded px-2 py-1 w-full text-center"
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
                          className="text-gray-600 bg-transparent border border-gray-300 rounded px-2 py-1 w-full text-center text-sm"
                          placeholder="Label"
                        />
                      </>
                    ) : (
                      <>
                        <div className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: theme?.primaryColor }}>
                          {stat.value}
                        </div>
                        <div className="text-gray-600 text-sm sm:text-base">{stat.label}</div>
                      </>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );

  const renderTeamAbout = () => (
    <section className="py-12 sm:py-20 bg-gray-50" style={{ fontFamily: theme?.fontFamily }}>
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
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4" style={{ color: theme?.primaryColor }}>
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
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
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
                    className="w-full mb-4 px-2 py-1 border border-gray-300 rounded text-sm"
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
                    className="text-lg font-semibold mb-2 bg-transparent border border-gray-300 rounded px-2 py-1 w-full text-center"
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
                    className="text-gray-600 bg-transparent border border-gray-300 rounded px-2 py-1 w-full text-center text-sm"
                    placeholder="Role"
                  />
                </>
              ) : (
                <>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-gray-600 text-sm">{member.role}</p>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderValuesAbout = () => (
    <section className="py-12 sm:py-20 bg-white" style={{ fontFamily: theme?.fontFamily }}>
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
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4" style={{ color: theme?.primaryColor }}>
              {content.title}
            </h2>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {content.values?.map((value, index) => {
            const icons = { Users, Target, Award };
            const Icon = icons[value.icon as keyof typeof icons] || Target;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Icon className="w-8 h-8 text-white" />
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
                      className="text-lg font-semibold mb-4 bg-transparent border-2 border-dashed border-blue-300 rounded-lg p-2 w-full text-center"
                      placeholder="Value title"
                    />
                    <textarea
                      value={value.description}
                      onChange={(e) => {
                        const updatedValues = [...(content.values || [])];
                        updatedValues[index] = { ...updatedValues[index], description: e.target.value };
                        handleChange('values', updatedValues);
                      }}
                      className="text-gray-600 leading-relaxed bg-transparent border-2 border-dashed border-blue-300 rounded-lg p-2 w-full h-20 resize-none text-sm"
                      placeholder="Value description"
                    />
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {value.description}
                    </p>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );

  // Initialize default content based on variant
  React.useEffect(() => {
    if (variant === 'about-team' && !content.team) {
      handleChange('team', [
        { name: 'John Doe', role: 'CEO', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
        { name: 'Jane Smith', role: 'CTO', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' }
      ]);
    } else if (variant === 'about-values' && !content.values) {
      handleChange('values', [
        { title: 'Innovation', description: 'We constantly push boundaries', icon: 'Target' },
        { title: 'Teamwork', description: 'Together we achieve more', icon: 'Users' },
        { title: 'Excellence', description: 'Quality in everything we do', icon: 'Award' }
      ]);
    } else if (variant === 'about-story' && !content.stats) {
      handleChange('stats', [
        { value: '10+', label: 'Years Experience' },
        { value: '500+', label: 'Happy Clients' },
        { value: '1000+', label: 'Projects Completed' }
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