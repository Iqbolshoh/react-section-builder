import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, TrendingUp } from 'lucide-react';

interface Stat {
  number: string;
  label: string;
  suffix?: string;
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

interface StatsSectionProps {
  content: {
    title: string;
    subtitle?: string;
    stats: Stat[];
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
  variant?: string;
}

const StatsSection: React.FC<StatsSectionProps> = ({ 
  content, 
  isEditing, 
  onChange, 
  theme,
  variant = 'stats-grid'
}) => {
  const [animatedNumbers, setAnimatedNumbers] = useState<{ [key: number]: number }>({});

  const handleChange = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const handleStatChange = (index: number, field: string, value: string) => {
    const updatedStats = [...content.stats];
    updatedStats[index] = { ...updatedStats[index], [field]: value };
    handleChange('stats', updatedStats);
  };

  const addStat = () => {
    const newStat: Stat = {
      number: '100',
      label: 'New Metric',
      suffix: '+'
    };
    handleChange('stats', [...content.stats, newStat]);
  };

  const removeStat = (index: number) => {
    const updatedStats = content.stats.filter((_, i) => i !== index);
    handleChange('stats', updatedStats);
  };

  // Animate numbers when component comes into view
  useEffect(() => {
    if (!isEditing) {
      content.stats.forEach((stat, index) => {
        const targetNumber = parseInt(stat.number.replace(/\D/g, ''));
        if (!isNaN(targetNumber)) {
          let current = 0;
          const increment = targetNumber / 50;
          const timer = setInterval(() => {
            current += increment;
            if (current >= targetNumber) {
              current = targetNumber;
              clearInterval(timer);
            }
            setAnimatedNumbers(prev => ({ ...prev, [index]: Math.floor(current) }));
          }, 30);
        }
      });
    }
  }, [content.stats, isEditing]);

  return (
    <section 
      className="py-12 sm:py-20" 
      style={{ 
        background: `linear-gradient(135deg, ${theme?.colors?.primary}10, ${theme?.colors?.secondary}10)`,
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {content.stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-xl transition-shadow duration-300 relative group"
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
                  onClick={() => removeStat(index)}
                  className="absolute top-2 right-2 w-6 h-6 text-white rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: theme?.colors?.error }}
                >
                  ×
                </button>
              )}

              <div 
                className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})` }}
              >
                <TrendingUp className="w-8 h-8 text-white" />
              </div>

              {isEditing ? (
                <>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <input
                      type="text"
                      value={stat.number}
                      onChange={(e) => handleStatChange(index, 'number', e.target.value)}
                      className="text-3xl sm:text-4xl font-bold bg-transparent border-2 border-dashed rounded-lg p-1 text-center w-20"
                      style={{ 
                        color: theme?.colors?.primary,
                        borderColor: `${theme?.colors?.primary}50`,
                        fontFamily: theme?.fonts?.accent
                      }}
                      placeholder="100"
                    />
                    <input
                      type="text"
                      value={stat.suffix || ''}
                      onChange={(e) => handleStatChange(index, 'suffix', e.target.value)}
                      className="text-3xl sm:text-4xl font-bold bg-transparent border border-gray-300 rounded p-1 text-center w-12"
                      style={{ 
                        color: theme?.colors?.primary,
                        borderColor: theme?.colors?.border,
                        fontFamily: theme?.fonts?.accent
                      }}
                      placeholder="+"
                    />
                  </div>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                    className="font-medium bg-transparent border-2 border-dashed rounded-lg p-2 w-full text-center"
                    style={{ 
                      color: theme?.colors?.textSecondary,
                      borderColor: `${theme?.colors?.primary}50`,
                      fontFamily: theme?.fonts?.secondary
                    }}
                    placeholder="Metric label"
                  />
                </>
              ) : (
                <>
                  <div 
                    className="text-3xl sm:text-4xl font-bold mb-2" 
                    style={{ 
                      color: theme?.colors?.primary,
                      fontFamily: theme?.fonts?.accent
                    }}
                  >
                    {animatedNumbers[index] || stat.number}{stat.suffix}
                  </div>
                  <div 
                    className="font-medium"
                    style={{ 
                      color: theme?.colors?.textSecondary,
                      fontFamily: theme?.fonts?.secondary
                    }}
                  >
                    {stat.label}
                  </div>
                </>
              )}
            </motion.div>
          ))}

          {isEditing && (
            <motion.button
              onClick={addStat}
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
                <Plus className="w-6 h-6 mx-auto mb-2" style={{ color: theme?.colors?.textSecondary }} />
                <span style={{ color: theme?.colors?.textSecondary }}>Add Stat</span>
              </div>
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;