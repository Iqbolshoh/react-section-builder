import React from 'react';
import { motion } from 'framer-motion';
import { X, Navigation, Zap, Image, User, Briefcase, Award, Star, Folder, CreditCard, Mail, Globe, HelpCircle, Clock, TrendingUp, Send, Megaphone, Camera } from 'lucide-react';
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
          type: 'header-classic' as const,
          name: 'Classic Header',
          description: 'Traditional header with logo and horizontal navigation',
          icon: Navigation,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'header-centered' as const,
          name: 'Centered Header',
          description: 'Centered logo with navigation menu below',
          icon: Navigation,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'header-minimal' as const,
          name: 'Minimal Header',
          description: 'Clean and simple header design',
          icon: Navigation,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'header-transparent' as const,
          name: 'Transparent Header',
          description: 'Overlay header with transparent background',
          icon: Navigation,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'header-sidebar' as const,
          name: 'Sidebar Header',
          description: 'Mobile-friendly sidebar navigation',
          icon: Navigation,
          preview: '/api/placeholder/300/150'
        }
      ]
    },
    {
      name: 'Hero Sections',
      color: 'from-emerald-500 to-teal-600',
      sections: [
        {
          type: 'hero-split' as const,
          name: 'Split Hero',
          description: 'Text content on one side, image on the other',
          icon: Zap,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'hero-centered' as const,
          name: 'Centered Hero',
          description: 'Centered content with background image',
          icon: Zap,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'hero-video' as const,
          name: 'Video Hero',
          description: 'Hero section with background video',
          icon: Zap,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'hero-gradient' as const,
          name: 'Gradient Hero',
          description: 'Modern hero with gradient background',
          icon: Zap,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'hero-animated' as const,
          name: 'Animated Hero',
          description: 'Hero with animated elements and effects',
          icon: Zap,
          preview: '/api/placeholder/300/150'
        }
      ]
    },
    {
      name: 'Slider/Carousel Sections',
      color: 'from-blue-500 to-cyan-600',
      sections: [
        {
          type: 'slider-testimonials' as const,
          name: 'Testimonial Slider',
          description: 'Scrolling customer reviews and feedback',
          icon: Image,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'slider-portfolio' as const,
          name: 'Portfolio Slider',
          description: 'Showcase work and projects in slider',
          icon: Image,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'slider-features' as const,
          name: 'Feature Slider',
          description: 'Highlight key features and benefits',
          icon: Image,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'slider-hero' as const,
          name: 'Hero Slider',
          description: 'Multiple hero slides with transitions',
          icon: Image,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'slider-products' as const,
          name: 'Product Slider',
          description: 'Product showcase with image carousel',
          icon: Image,
          preview: '/api/placeholder/300/150'
        }
      ]
    },
    {
      name: 'About Sections',
      color: 'from-orange-500 to-red-600',
      sections: [
        {
          type: 'about-story' as const,
          name: 'Our Story',
          description: 'Company history, mission and vision',
          icon: User,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'about-team' as const,
          name: 'Meet the Team',
          description: 'Team member profiles and bios',
          icon: User,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'about-values' as const,
          name: 'Our Values',
          description: 'Company values and core principles',
          icon: User,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'about-timeline' as const,
          name: 'Company Timeline',
          description: 'Historical milestones and achievements',
          icon: User,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'about-stats' as const,
          name: 'Company Statistics',
          description: 'Key numbers and achievements',
          icon: User,
          preview: '/api/placeholder/300/150'
        }
      ]
    },
    {
      name: 'Services Sections',
      color: 'from-pink-500 to-rose-600',
      sections: [
        {
          type: 'services-grid' as const,
          name: 'Service Grid',
          description: 'Services displayed in grid layout',
          icon: Briefcase,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'services-list' as const,
          name: 'Service List',
          description: 'Detailed service descriptions in list',
          icon: Briefcase,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'services-tabs' as const,
          name: 'Service Tabs',
          description: 'Tabbed interface for service categories',
          icon: Briefcase,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'services-cards' as const,
          name: 'Service Cards',
          description: 'Interactive service cards with hover effects',
          icon: Briefcase,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'services-process' as const,
          name: 'Service Process',
          description: 'Step-by-step service workflow',
          icon: Briefcase,
          preview: '/api/placeholder/300/150'
        }
      ]
    },
    {
      name: 'Features Sections',
      color: 'from-violet-500 to-purple-600',
      sections: [
        {
          type: 'features-grid' as const,
          name: 'Feature Grid',
          description: 'Platform features in organized grid',
          icon: Award,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'features-comparison' as const,
          name: 'Feature Comparison',
          description: 'Compare features side by side',
          icon: Award,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'features-showcase' as const,
          name: 'Feature Showcase',
          description: 'Highlight key product innovations',
          icon: Award,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'features-benefits' as const,
          name: 'Feature Benefits',
          description: 'Features with detailed benefits',
          icon: Award,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'features-interactive' as const,
          name: 'Interactive Features',
          description: 'Interactive feature demonstration',
          icon: Award,
          preview: '/api/placeholder/300/150'
        }
      ]
    },
    {
      name: 'Testimonials Sections',
      color: 'from-yellow-500 to-orange-600',
      sections: [
        {
          type: 'testimonials-grid' as const,
          name: 'Testimonial Grid',
          description: 'Customer reviews in grid layout',
          icon: Star,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'testimonials-carousel' as const,
          name: 'Testimonial Carousel',
          description: 'Sliding customer testimonials',
          icon: Star,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'testimonials-wall' as const,
          name: 'Testimonial Wall',
          description: 'Masonry layout of customer reviews',
          icon: Star,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'testimonials-video' as const,
          name: 'Video Testimonials',
          description: 'Customer video testimonials',
          icon: Star,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'testimonials-featured' as const,
          name: 'Featured Testimonials',
          description: 'Highlighted customer success stories',
          icon: Star,
          preview: '/api/placeholder/300/150'
        }
      ]
    },
    {
      name: 'Portfolio/Projects Sections',
      color: 'from-teal-500 to-green-600',
      sections: [
        {
          type: 'portfolio-grid' as const,
          name: 'Portfolio Grid',
          description: 'Project gallery in organized grid',
          icon: Folder,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'portfolio-masonry' as const,
          name: 'Portfolio Masonry',
          description: 'Pinterest-style portfolio layout',
          icon: Folder,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'portfolio-slider' as const,
          name: 'Portfolio Slider',
          description: 'Sliding project showcase',
          icon: Folder,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'portfolio-filter' as const,
          name: 'Filterable Portfolio',
          description: 'Portfolio with category filters',
          icon: Folder,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'portfolio-showcase' as const,
          name: 'Portfolio Showcase',
          description: 'Featured project highlights',
          icon: Folder,
          preview: '/api/placeholder/300/150'
        }
      ]
    },
    {
      name: 'Pricing Sections',
      color: 'from-indigo-500 to-blue-600',
      sections: [
        {
          type: 'pricing-cards' as const,
          name: 'Pricing Cards',
          description: 'Standard pricing table with plans',
          icon: CreditCard,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'pricing-comparison' as const,
          name: 'Pricing Comparison',
          description: 'Detailed feature comparison table',
          icon: CreditCard,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'pricing-toggle' as const,
          name: 'Pricing Toggle',
          description: 'Monthly/yearly pricing switcher',
          icon: CreditCard,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'pricing-simple' as const,
          name: 'Simple Pricing',
          description: 'Clean and minimal pricing display',
          icon: CreditCard,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'pricing-enterprise' as const,
          name: 'Enterprise Pricing',
          description: 'Advanced pricing for business plans',
          icon: CreditCard,
          preview: '/api/placeholder/300/150'
        }
      ]
    },
    {
      name: 'Contact Sections',
      color: 'from-green-500 to-emerald-600',
      sections: [
        {
          type: 'contact-form' as const,
          name: 'Contact Form',
          description: 'Contact form with company information',
          icon: Mail,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'contact-info' as const,
          name: 'Contact Info',
          description: 'Contact details with map integration',
          icon: Mail,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'contact-cta' as const,
          name: 'Contact CTA',
          description: 'Call-to-action contact section',
          icon: Mail,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'contact-offices' as const,
          name: 'Office Locations',
          description: 'Multiple office locations and contacts',
          icon: Mail,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'contact-support' as const,
          name: 'Support Center',
          description: 'Customer support and help center',
          icon: Mail,
          preview: '/api/placeholder/300/150'
        }
      ]
    },
    {
      name: 'Footer Sections',
      color: 'from-gray-600 to-slate-700',
      sections: [
        {
          type: 'footer-comprehensive' as const,
          name: 'Comprehensive Footer',
          description: 'Full footer with all company links',
          icon: Globe,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'footer-minimal' as const,
          name: 'Minimal Footer',
          description: 'Simple footer with essential links',
          icon: Globe,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'footer-newsletter' as const,
          name: 'Newsletter Footer',
          description: 'Footer with email subscription',
          icon: Globe,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'footer-social' as const,
          name: 'Social Footer',
          description: 'Footer focused on social media',
          icon: Globe,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'footer-corporate' as const,
          name: 'Corporate Footer',
          description: 'Professional corporate footer',
          icon: Globe,
          preview: '/api/placeholder/300/150'
        }
      ]
    },
    {
      name: 'Utility Sections',
      color: 'from-cyan-500 to-blue-600',
      sections: [
        {
          type: 'faq-accordion' as const,
          name: 'FAQ Accordion',
          description: 'Frequently asked questions with expandable answers',
          icon: HelpCircle,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'timeline-vertical' as const,
          name: 'Timeline',
          description: 'Company history and milestones timeline',
          icon: Clock,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'stats-grid' as const,
          name: 'Statistics',
          description: 'Animated counters and key metrics',
          icon: TrendingUp,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'newsletter-centered' as const,
          name: 'Newsletter Signup',
          description: 'Email subscription with call-to-action',
          icon: Send,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'cta-gradient' as const,
          name: 'Call to Action',
          description: 'Focused call-to-action section',
          icon: Megaphone,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'cta-image' as const,
          name: 'CTA with Background',
          description: 'Call-to-action with background image',
          icon: Megaphone,
          preview: '/api/placeholder/300/150'
        },
        {
          type: 'gallery-grid' as const,
          name: 'Image Gallery',
          description: 'Photo gallery with lightbox and filters',
          icon: Camera,
          preview: '/api/placeholder/300/150'
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
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Add Section</h2>
              <p className="text-emerald-100 mt-1">Choose a beautiful section for your website</p>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-white hover:bg-opacity-20 rounded-xl transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-8">
            {sectionGroups.map((group) => (
              <div key={group.name}>
                <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r ${group.color} text-white mb-6`}>
                  <h3 className="text-lg font-bold">{group.name}</h3>
                  <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs font-semibold">
                    {group.sections.length} options
                  </span>
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
                        className="group bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-emerald-400 hover:shadow-xl transition-all duration-300"
                      >
                        {/* Preview Image */}
                        <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${group.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                              <Icon className="w-8 h-8 text-white" />
                            </div>
                          </div>
                          <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-semibold text-gray-600">
                            Preview
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="p-4 text-left">
                          <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                            {section.name}
                          </h4>
                          <p className="text-gray-600 text-sm leading-relaxed">
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