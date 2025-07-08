import React from 'react';
import { motion } from 'framer-motion';
import { X, Navigation, Zap, User, Briefcase, Award, Star, Folder, CreditCard, Mail, Globe, HelpCircle, TrendingUp, Send, Megaphone, Layout, Layers} from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';

interface SectionSelectorProps {
  onClose: () => void;
  onSelect: () => void;
}

const SectionSelector: React.FC<SectionSelectorProps> = ({ onClose, onSelect }) => {
  const { addSection } = useProject();

  const sectionGroups = [
    {
      name: 'Header Sections',
      color: 'from-purple-500 to-indigo-600',
      sections: [
        {
          type: 'header-classic',
          name: 'Classic Header',
          description: 'Traditional header with logo and horizontal navigation',
          icon: Navigation,
          preview: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'header-centered',
          name: 'Centered Header',
          description: 'Centered logo with navigation menu below',
          icon: Layout,
          preview: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'header-minimal',
          name: 'Minimal Header',
          description: 'Clean and simple header design',
          icon: Navigation,
          preview: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        }
      ]
    },
    {
      name: 'Hero Sections',
      color: 'from-emerald-500 to-teal-600',
      sections: [
        {
          type: 'hero-split',
          name: 'Split Hero',
          description: 'Text content on one side, image on the other',
          icon: Zap,
          preview: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'hero-centered',
          name: 'Centered Hero',
          description: 'Centered content with background image',
          icon: Zap,
          preview: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'hero-video',
          name: 'Video Hero',
          description: 'Hero section with background video',
          icon: Zap,
          preview: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'hero-gradient',
          name: 'Gradient Hero',
          description: 'Modern hero with gradient background',
          icon: Zap,
          preview: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        }
      ]
    },
    {
      name: 'Content Sections',
      color: 'from-blue-500 to-cyan-600',
      sections: [
        {
          type: 'about-story',
          name: 'About Story',
          description: 'Company story with image and text',
          icon: User,
          preview: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'services-grid',
          name: 'Services Grid',
          description: 'Services displayed in grid layout',
          icon: Briefcase,
          preview: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'features-grid',
          name: 'Features Grid',
          description: 'Platform features in organized grid',
          icon: Award,
          preview: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        }
      ]
    },
    {
      name: 'Social Proof',
      color: 'from-yellow-500 to-orange-600',
      sections: [
        {
          type: 'testimonials-grid',
          name: 'Testimonials',
          description: 'Customer reviews and feedback',
          icon: Star,
          preview: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'stats-grid',
          name: 'Statistics',
          description: 'Key metrics and achievements',
          icon: TrendingUp,
          preview: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        }
      ]
    },
    {
      name: 'Business Sections',
      color: 'from-indigo-500 to-blue-600',
      sections: [
        {
          type: 'pricing-cards',
          name: 'Pricing Cards',
          description: 'Pricing plans and packages',
          icon: CreditCard,
          preview: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'portfolio-grid',
          name: 'Portfolio',
          description: 'Showcase your work and projects',
          icon: Folder,
          preview: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        }
      ]
    },
    {
      name: 'Contact & Footer',
      color: 'from-green-500 to-emerald-600',
      sections: [
        {
          type: 'contact-form',
          name: 'Contact Form',
          description: 'Contact form with company information',
          icon: Mail,
          preview: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'footer-comprehensive',
          name: 'Footer',
          description: 'Complete footer with links and info',
          icon: Globe,
          preview: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        }
      ]
    },
    {
      name: 'Utility Sections',
      color: 'from-cyan-500 to-blue-600',
      sections: [
        {
          type: 'faq-accordion',
          name: 'FAQ',
          description: 'Frequently asked questions',
          icon: HelpCircle,
          preview: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'newsletter-centered',
          name: 'Newsletter',
          description: 'Email subscription signup',
          icon: Send,
          preview: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'cta-gradient',
          name: 'Call to Action',
          description: 'Focused call-to-action section',
          icon: Megaphone,
          preview: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        }
      ]
    }
  ];

  const handleAddSection = (type: any) => {
    addSection(type);
    onSelect();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(10px)'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-7xl max-h-[90vh] overflow-hidden rounded-3xl platform-shadow-2xl"
        style={{ backgroundColor: 'var(--bg-primary)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="platform-gradient-primary p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl font-bold platform-font-primary">Add Section</h2>
                <p className="text-white text-opacity-90 platform-font-secondary">
                  Choose from our collection of beautiful, responsive sections
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-white hover:bg-opacity-20 rounded-xl transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-auto max-h-[calc(90vh-140px)] platform-bg-secondary">
          <div className="space-y-8">
            {sectionGroups.map((group) => (
              <div key={group.name}>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-10 h-10 bg-gradient-to-r ${group.color} rounded-xl flex items-center justify-center`}
                  >
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold platform-text-primary platform-font-primary">{group.name}</h3>
                    <span className="text-sm platform-text-secondary platform-font-secondary">
                      {group.sections.length} options available
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {group.sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <motion.button
                        key={section.type}
                        whileHover={{ scale: 1.02, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAddSection(section.type)}
                        className="group overflow-hidden rounded-2xl border-2 transition-all duration-300 text-left platform-bg-primary platform-border hover:platform-shadow-xl"
                      >
                        {/* Preview Image */}
                        <div className="h-32 relative overflow-hidden">
                          <img
                            src={section.preview}
                            alt={section.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                            <div className={`w-16 h-16 bg-gradient-to-r ${group.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform platform-shadow-lg`}>
                              <Icon className="w-8 h-8 text-white" />
                            </div>
                          </div>
                          <div className="absolute top-2 right-2 px-2 py-1 bg-white bg-opacity-90 rounded-full text-xs font-semibold platform-text-primary">
                            New
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          <h4 className="text-lg font-bold mb-2 platform-text-primary platform-font-primary group-hover:brand-primary transition-colors">
                            {section.name}
                          </h4>
                          <p className="text-sm platform-text-secondary platform-font-secondary leading-relaxed">
                            {section.description}
                          </p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SectionSelector;