import React from 'react';
import { motion } from 'framer-motion';
import { X, Navigation, Zap, Image, User, Briefcase, Award, Star, Folder, CreditCard, Mail, Globe, HelpCircle, Clock, TrendingUp, Send, Megaphone, Camera, Layout, Users, Target, ShieldCheck, Smartphone, Palette, Layers, MessageSquare, Coffee, ShoppingBag, Truck, Heart, Book, Headphones, Gift, Smile } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';
import { useTheme } from '../contexts/ThemeContext';

interface SectionSelectorProps {
  onClose: () => void;
  onSelect: () => void;
}

const SectionSelector: React.FC<SectionSelectorProps> = ({ onClose, onSelect }) => {
  const { addSection } = useProject();
  const { currentTheme } = useTheme();

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
        },
        {
          type: 'header-transparent',
          name: 'Transparent Header',
          description: 'Overlay header with transparent background',
          icon: Layers,
          preview: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'header-sidebar',
          name: 'Sidebar Header',
          description: 'Mobile-friendly sidebar navigation',
          icon: Layout,
          preview: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
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
        },
        {
          type: 'hero-animated',
          name: 'Animated Hero',
          description: 'Hero with animated elements and effects',
          icon: Zap,
          preview: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        }
      ]
    },
    {
      name: 'Slider/Carousel Sections',
      color: 'from-blue-500 to-cyan-600',
      sections: [
        {
          type: 'slider-testimonials',
          name: 'Testimonial Slider',
          description: 'Scrolling customer reviews and feedback',
          icon: MessageSquare,
          preview: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'slider-portfolio',
          name: 'Portfolio Slider',
          description: 'Showcase work and projects in slider',
          icon: Image,
          preview: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'slider-features',
          name: 'Feature Slider',
          description: 'Highlight key features and benefits',
          icon: Award,
          preview: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'slider-hero',
          name: 'Hero Slider',
          description: 'Multiple hero slides with transitions',
          icon: Zap,
          preview: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'slider-products',
          name: 'Product Slider',
          description: 'Product showcase with image carousel',
          icon: ShoppingBag,
          preview: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        }
      ]
    },
    {
      name: 'About Sections',
      color: 'from-orange-500 to-red-600',
      sections: [
        {
          type: 'about-story',
          name: 'Our Story',
          description: 'Company history, mission and vision',
          icon: Book,
          preview: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'about-team',
          name: 'Meet the Team',
          description: 'Team member profiles and bios',
          icon: Users,
          preview: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'about-values',
          name: 'Our Values',
          description: 'Company values and core principles',
          icon: Target,
          preview: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'about-timeline',
          name: 'Company Timeline',
          description: 'Historical milestones and achievements',
          icon: Clock,
          preview: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'about-stats',
          name: 'Company Statistics',
          description: 'Key numbers and achievements',
          icon: TrendingUp,
          preview: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        }
      ]
    },
    {
      name: 'Services Sections',
      color: 'from-pink-500 to-rose-600',
      sections: [
        {
          type: 'services-grid',
          name: 'Service Grid',
          description: 'Services displayed in grid layout',
          icon: Briefcase,
          preview: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'services-list',
          name: 'Service List',
          description: 'Detailed service descriptions in list',
          icon: Briefcase,
          preview: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'services-tabs',
          name: 'Service Tabs',
          description: 'Tabbed interface for service categories',
          icon: Briefcase,
          preview: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'services-cards',
          name: 'Service Cards',
          description: 'Interactive service cards with hover effects',
          icon: Briefcase,
          preview: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'services-process',
          name: 'Service Process',
          description: 'Step-by-step service workflow',
          icon: Briefcase,
          preview: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        }
      ]
    },
    {
      name: 'Features Sections',
      color: 'from-violet-500 to-purple-600',
      sections: [
        {
          type: 'features-grid',
          name: 'Feature Grid',
          description: 'Platform features in organized grid',
          icon: Award,
          preview: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'features-comparison',
          name: 'Feature Comparison',
          description: 'Compare features side by side',
          icon: Award,
          preview: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'features-showcase',
          name: 'Feature Showcase',
          description: 'Highlight key product innovations',
          icon: Award,
          preview: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'features-benefits',
          name: 'Feature Benefits',
          description: 'Features with detailed benefits',
          icon: Award,
          preview: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'features-interactive',
          name: 'Interactive Features',
          description: 'Interactive feature demonstration',
          icon: Award,
          preview: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        }
      ]
    },
    {
      name: 'Testimonials Sections',
      color: 'from-yellow-500 to-orange-600',
      sections: [
        {
          type: 'testimonials-grid',
          name: 'Testimonial Grid',
          description: 'Customer reviews in grid layout',
          icon: Star,
          preview: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'testimonials-carousel',
          name: 'Testimonial Carousel',
          description: 'Sliding customer testimonials',
          icon: Star,
          preview: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'testimonials-wall',
          name: 'Testimonial Wall',
          description: 'Masonry layout of customer reviews',
          icon: Star,
          preview: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'testimonials-video',
          name: 'Video Testimonials',
          description: 'Customer video testimonials',
          icon: Star,
          preview: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'testimonials-featured',
          name: 'Featured Testimonials',
          description: 'Highlighted customer success stories',
          icon: Star,
          preview: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        }
      ]
    },
    {
      name: 'Portfolio/Projects Sections',
      color: 'from-teal-500 to-green-600',
      sections: [
        {
          type: 'portfolio-grid',
          name: 'Portfolio Grid',
          description: 'Project gallery in organized grid',
          icon: Folder,
          preview: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'portfolio-masonry',
          name: 'Portfolio Masonry',
          description: 'Pinterest-style portfolio layout',
          icon: Folder,
          preview: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'portfolio-slider',
          name: 'Portfolio Slider',
          description: 'Sliding project showcase',
          icon: Folder,
          preview: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'portfolio-filter',
          name: 'Filterable Portfolio',
          description: 'Portfolio with category filters',
          icon: Folder,
          preview: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'portfolio-showcase',
          name: 'Portfolio Showcase',
          description: 'Featured project highlights',
          icon: Folder,
          preview: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        }
      ]
    },
    {
      name: 'Pricing Sections',
      color: 'from-indigo-500 to-blue-600',
      sections: [
        {
          type: 'pricing-cards',
          name: 'Pricing Cards',
          description: 'Standard pricing table with plans',
          icon: CreditCard,
          preview: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'pricing-comparison',
          name: 'Pricing Comparison',
          description: 'Detailed feature comparison table',
          icon: CreditCard,
          preview: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'pricing-toggle',
          name: 'Pricing Toggle',
          description: 'Monthly/yearly pricing switcher',
          icon: CreditCard,
          preview: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'pricing-simple',
          name: 'Simple Pricing',
          description: 'Clean and minimal pricing display',
          icon: CreditCard,
          preview: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'pricing-enterprise',
          name: 'Enterprise Pricing',
          description: 'Advanced pricing for business plans',
          icon: CreditCard,
          preview: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        }
      ]
    },
    {
      name: 'Contact Sections',
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
          type: 'contact-info',
          name: 'Contact Info',
          description: 'Contact details with map integration',
          icon: Mail,
          preview: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'contact-cta',
          name: 'Contact CTA',
          description: 'Call-to-action contact section',
          icon: Mail,
          preview: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'contact-offices',
          name: 'Office Locations',
          description: 'Multiple office locations and contacts',
          icon: Mail,
          preview: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'contact-support',
          name: 'Support Center',
          description: 'Customer support and help center',
          icon: Mail,
          preview: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        }
      ]
    },
    {
      name: 'Footer Sections',
      color: 'from-gray-600 to-slate-700',
      sections: [
        {
          type: 'footer-comprehensive',
          name: 'Comprehensive Footer',
          description: 'Full footer with all company links',
          icon: Globe,
          preview: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'footer-minimal',
          name: 'Minimal Footer',
          description: 'Simple footer with essential links',
          icon: Globe,
          preview: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'footer-newsletter',
          name: 'Newsletter Footer',
          description: 'Footer with email subscription',
          icon: Globe,
          preview: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'footer-social',
          name: 'Social Footer',
          description: 'Footer focused on social media',
          icon: Globe,
          preview: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'footer-corporate',
          name: 'Corporate Footer',
          description: 'Professional corporate footer',
          icon: Globe,
          preview: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        }
      ]
    },
    {
      name: 'E-commerce Sections',
      color: 'from-amber-500 to-yellow-600',
      sections: [
        {
          type: 'ecommerce-products',
          name: 'Product Grid',
          description: 'Display products in a grid layout',
          icon: ShoppingBag,
          preview: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'ecommerce-featured',
          name: 'Featured Products',
          description: 'Showcase featured or bestselling products',
          icon: Gift,
          preview: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'ecommerce-categories',
          name: 'Product Categories',
          description: 'Display product categories with images',
          icon: Layers,
          preview: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'ecommerce-cart',
          name: 'Shopping Cart',
          description: 'Cart summary with product list',
          icon: ShoppingBag,
          preview: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'ecommerce-checkout',
          name: 'Checkout Process',
          description: 'Multi-step checkout flow',
          icon: CreditCard,
          preview: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        }
      ]
    },
    {
      name: 'Blog Sections',
      color: 'from-sky-500 to-blue-600',
      sections: [
        {
          type: 'blog-grid',
          name: 'Blog Grid',
          description: 'Articles displayed in a grid layout',
          icon: Book,
          preview: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'blog-list',
          name: 'Blog List',
          description: 'Articles in a vertical list format',
          icon: Book,
          preview: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'blog-featured',
          name: 'Featured Articles',
          description: 'Highlight important blog posts',
          icon: Book,
          preview: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'blog-categories',
          name: 'Blog Categories',
          description: 'Display blog categories with counts',
          icon: Book,
          preview: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'blog-author',
          name: 'Author Profile',
          description: 'Blog author information and posts',
          icon: User,
          preview: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        }
      ]
    },
    {
      name: 'Utility Sections',
      color: 'from-cyan-500 to-blue-600',
      sections: [
        {
          type: 'faq-accordion',
          name: 'FAQ Accordion',
          description: 'Frequently asked questions with expandable answers',
          icon: HelpCircle,
          preview: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'timeline-vertical',
          name: 'Timeline',
          description: 'Company history and milestones timeline',
          icon: Clock,
          preview: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'stats-grid',
          name: 'Statistics',
          description: 'Animated counters and key metrics',
          icon: TrendingUp,
          preview: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'newsletter-centered',
          name: 'Newsletter Signup',
          description: 'Email subscription with call-to-action',
          icon: Send,
          preview: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'cta-gradient',
          name: 'Call to Action',
          description: 'Focused call-to-action section',
          icon: Megaphone,
          preview: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'cta-image',
          name: 'CTA with Background',
          description: 'Call-to-action with background image',
          icon: Megaphone,
          preview: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'gallery-grid',
          name: 'Image Gallery',
          description: 'Photo gallery with lightbox and filters',
          icon: Camera,
          preview: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        }
      ]
    },
    {
      name: 'Industry-Specific Sections',
      color: 'from-rose-500 to-pink-600',
      sections: [
        {
          type: 'restaurant-menu',
          name: 'Restaurant Menu',
          description: 'Food and beverage menu with categories',
          icon: Coffee,
          preview: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'healthcare-services',
          name: 'Healthcare Services',
          description: 'Medical services and specialties',
          icon: Heart,
          preview: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'education-courses',
          name: 'Education Courses',
          description: 'Course catalog with details',
          icon: Book,
          preview: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'real-estate-properties',
          name: 'Real Estate Listings',
          description: 'Property listings with details',
          icon: Home,
          preview: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&dpr=1'
        },
        {
          type: 'events-calendar',
          name: 'Events Calendar',
          description: 'Upcoming events with details',
          icon: Calendar,
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
        backdropFilter: 'blur(5px)'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-7xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl"
        style={{ 
          backgroundColor: currentTheme?.colors?.surface || '#ffffff',
          boxShadow: currentTheme?.shadows?.xl
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          className="p-6 border-b"
          style={{ 
            background: `linear-gradient(135deg, ${currentTheme?.colors?.primary || '#10b981'}, ${currentTheme?.colors?.secondary || '#06b6d4'})`,
            borderColor: currentTheme?.colors?.border || '#e2e8f0'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 
                className="text-2xl sm:text-3xl font-bold text-white"
                style={{ fontFamily: currentTheme?.fonts?.primary }}
              >
                Add Section
              </h2>
              <p 
                className="mt-1 text-white text-opacity-90"
                style={{ fontFamily: currentTheme?.fonts?.secondary }}
              >
                Choose a beautiful section for your website
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-white hover:bg-opacity-20 rounded-xl transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        <div 
          className="p-6 overflow-auto max-h-[calc(90vh-120px)]"
          style={{ backgroundColor: currentTheme?.colors?.background || '#f8fafc' }}
        >
          <div className="space-y-8">
            {sectionGroups.map((group) => (
              <div key={group.name}>
                <div 
                  className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl mb-6 text-white`}
                  style={{ 
                    background: `linear-gradient(135deg, ${currentTheme?.colors?.primary || '#10b981'}, ${currentTheme?.colors?.secondary || '#06b6d4'})`,
                    fontFamily: currentTheme?.fonts?.primary
                  }}
                >
                  <h3 className="text-lg font-bold">{group.name}</h3>
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  >
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
                        className="group overflow-hidden rounded-2xl border-2 transition-all duration-300 text-left"
                        style={{ 
                          backgroundColor: currentTheme?.colors?.surface || '#ffffff',
                          borderColor: currentTheme?.colors?.border || '#e2e8f0',
                          boxShadow: currentTheme?.shadows?.md
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = currentTheme?.colors?.primary || '#10b981';
                          e.currentTarget.style.boxShadow = currentTheme?.shadows?.lg || '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = currentTheme?.colors?.border || '#e2e8f0';
                          e.currentTarget.style.boxShadow = currentTheme?.shadows?.md || '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                        }}
                      >
                        {/* Preview Image */}
                        <div className="h-32 relative overflow-hidden">
                          <img 
                            src={section.preview} 
                            alt={section.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div 
                            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40"
                          >
                            <div 
                              className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                              style={{ 
                                background: `linear-gradient(135deg, ${currentTheme?.colors?.primary || '#10b981'}, ${currentTheme?.colors?.secondary || '#06b6d4'})`,
                                boxShadow: currentTheme?.shadows?.lg
                              }}
                            >
                              <Icon className="w-8 h-8 text-white" />
                            </div>
                          </div>
                          <div 
                            className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold"
                            style={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              color: currentTheme?.colors?.text || '#1f2937'
                            }}
                          >
                            Preview
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="p-4 text-left">
                          <h4 
                            className="text-lg font-bold mb-2 transition-colors"
                            style={{ 
                              color: currentTheme?.colors?.text || '#1f2937',
                              fontFamily: currentTheme?.fonts?.primary
                            }}
                          >
                            {section.name}
                          </h4>
                          <p 
                            className="text-sm leading-relaxed"
                            style={{ 
                              color: currentTheme?.colors?.textSecondary || '#6b7280',
                              fontFamily: currentTheme?.fonts?.secondary
                            }}
                          >
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

function Home(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
}

function Calendar(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;
}