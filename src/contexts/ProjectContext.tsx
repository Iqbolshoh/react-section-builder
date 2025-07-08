import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Page {
  id: string;
  name: string;
  slug: string;
  sections: Section[];
  isHome: boolean;
}

interface Section {
  id: string;
  type: string; // Now supports all section types like 'hero-split', 'header-classic', etc.
  content: any;
  order: number;
}

interface Project {
  id: string;
  name: string;
  pages: Page[];
  createdAt: string;
  updatedAt: string;
}

interface ProjectContextType {
  projects: Project[];
  currentProject: Project | null;
  currentPage: Page | null;
  createProject: (name: string) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setCurrentProject: (project: Project | null) => void;
  createPage: (name: string, isHome?: boolean) => void;
  updatePage: (id: string, updates: Partial<Page>) => void;
  deletePage: (id: string) => void;
  setCurrentPage: (pageId: string | null) => void;
  addSection: (type: Section['type']) => void;
  updateSection: (id: string, content: any) => void;
  deleteSection: (id: string) => void;
  reorderSections: (sections: Section[]) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);

  const createProject = (name: string): Project => {
    const homePage: Page = {
      id: Date.now().toString() + '-home',
      name: 'Home',
      slug: 'home',
      sections: [],
      isHome: true
    };

    const newProject: Project = {
      id: Date.now().toString(),
      name,
      pages: [homePage],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setProjects(prev => [...prev, newProject]);
    setCurrentPage(homePage);
    return newProject;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, ...updates, updatedAt: new Date().toISOString() } : project
    ));
    if (currentProject?.id === id) {
      setCurrentProject(prev => prev ? { ...prev, ...updates, updatedAt: new Date().toISOString() } : null);
    }
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
    if (currentProject?.id === id) {
      setCurrentPage(null);
      setCurrentProject(null);
    }
  };

  const createPage = (name: string, isHome: boolean = false) => {
    if (!currentProject) return;
    
    // If creating a home page, ensure no other page is set as home
    let updatedPages = [...currentProject.pages];
    if (isHome) {
      updatedPages = updatedPages.map(page => ({
        ...page,
        isHome: false
      }));
    }
    
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    
    const newPage: Page = {
      id: Date.now().toString(),
      name,
      slug,
      sections: [],
      isHome
    };
    
    updatedPages.push(newPage);
    updateProject(currentProject.id, { pages: updatedPages });
    setCurrentPage(newPage);
  };

  const updatePage = (id: string, updates: Partial<Page>) => {
    if (!currentProject) return;
    
    // If updating isHome to true, ensure no other page is set as home
    let updatedPages = [...currentProject.pages];
    if (updates.isHome) {
      updatedPages = updatedPages.map(page => ({
        ...page,
        isHome: page.id === id ? updates.isHome : false
      }));
    } else {
      updatedPages = updatedPages.map(page => 
        page.id === id ? { ...page, ...updates } : page
      );
    }
    
    updateProject(currentProject.id, { pages: updatedPages });
    
    // Update currentPage if it's the one being updated
    if (currentPage?.id === id) {
      setCurrentPage(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const deletePage = (id: string) => {
    if (!currentProject) return;
    
    // Prevent deleting the last page
    if (currentProject.pages.length <= 1) {
      alert('You cannot delete the last page.');
      return;
    }
    
    // Prevent deleting the home page
    const pageToDelete = currentProject.pages.find(page => page.id === id);
    if (pageToDelete?.isHome) {
      alert('You cannot delete the home page. Please set another page as home first.');
      return;
    }
    
    const updatedPages = currentProject.pages.filter(page => page.id !== id);
    updateProject(currentProject.id, { pages: updatedPages });
    
    // If the deleted page was the current page, set the first available page as current
    if (currentPage?.id === id) {
      setCurrentPage(updatedPages[0]);
    }
  };

  const setCurrentPageById = (pageId: string | null) => {
    if (!currentProject || !pageId) {
      setCurrentPage(null);
      return;
    }
    
    const page = currentProject.pages.find(p => p.id === pageId);
    setCurrentPage(page || null);
  };

  const addSection = (type: Section['type']) => {
    if (!currentProject || !currentPage) return;
    
    const newSection: Section = {
      id: Date.now().toString(),
      type,
      content: getDefaultContent(type),
      order: currentPage.sections.length
    };

    const updatedSections = [...currentPage.sections, newSection];
    
    const updatedPages = currentProject.pages.map(page => 
      page.id === currentPage.id ? { ...page, sections: updatedSections } : page
    );
    
    updateProject(currentProject.id, { pages: updatedPages });
    setCurrentPage(prev => prev ? { ...prev, sections: updatedSections } : null);
  };

  const updateSection = (id: string, content: any) => {
    if (!currentProject || !currentPage) return;
    
    const updatedSections = currentPage.sections.map(section =>
      section.id === id ? { ...section, content } : section
    );
    
    const updatedPages = currentProject.pages.map(page => 
      page.id === currentPage.id ? { ...page, sections: updatedSections } : page
    );
    
    updateProject(currentProject.id, { pages: updatedPages });
    setCurrentPage(prev => prev ? { ...prev, sections: updatedSections } : null);
  };

  const deleteSection = (id: string) => {
    if (!currentProject || !currentPage) return;
    
    const updatedSections = currentPage.sections.filter(section => section.id !== id);
    
    const updatedPages = currentProject.pages.map(page => 
      page.id === currentPage.id ? { ...page, sections: updatedSections } : page
    );
    
    updateProject(currentProject.id, { pages: updatedPages });
    setCurrentPage(prev => prev ? { ...prev, sections: updatedSections } : null);
  };

  const reorderSections = (sections: Section[]) => {
    if (!currentProject || !currentPage) return;
    
    const updatedPages = currentProject.pages.map(page => 
      page.id === currentPage.id ? { ...page, sections } : page
    );
    
    updateProject(currentProject.id, { pages: updatedPages });
    setCurrentPage(prev => prev ? { ...prev, sections } : null);
  };

  const getDefaultContent = (type: Section['type']) => {
    const baseType = type.split('-')[0];
    
    switch (baseType) {
      case 'header':
        return {
          logo: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
          companyName: 'Your Company',
          menuItems: [
            { title: 'Home', url: '#home' },
            { title: 'About', url: '#about' },
            { title: 'Services', url: '#services' },
            { title: 'Portfolio', url: '#portfolio' },
            { title: 'Contact', url: '#contact' }
          ],
          language: 'EN',
          socialLinks: [
            { platform: 'Facebook', url: 'https://facebook.com' },
            { platform: 'Twitter', url: 'https://twitter.com' },
            { platform: 'Instagram', url: 'https://instagram.com' }
          ],
          contactInfo: { phone: '+1 (555) 123-4567', email: 'hello@company.com' }
        };
      case 'hero':
        return {
          title: 'Build Amazing Websites Without Code',
          subtitle: 'Create stunning, professional websites in minutes with our drag-and-drop builder. No technical skills required.',
          buttonText: 'Get Started Free',
          buttonLink: '#contact',
          image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        };
      case 'slider':
        if (type === 'slider-testimonials') {
          return {
            title: 'What Our Customers Say',
            slides: [
              {
                name: 'Sarah Johnson',
                role: 'CEO, TechStart',
                content: 'This platform completely transformed how we build our websites. The drag-and-drop interface is incredibly intuitive.',
                rating: 5,
                avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
              },
              {
                name: 'Michael Chen',
                role: 'Designer, Creative Studio',
                content: 'I can create beautiful, responsive websites in a fraction of the time it used to take. Absolutely love it!',
                rating: 5,
                avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
              },
              {
                name: 'Emily Rodriguez',
                role: 'Marketing Manager',
                content: 'The templates are gorgeous and the customization options are endless. Perfect for our marketing campaigns.',
                rating: 5,
                avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
              }
            ]
          };
        } else if (type === 'slider-portfolio') {
          return {
            title: 'Our Latest Projects',
            slides: [
              {
                title: 'E-commerce Platform',
                description: 'Modern online store with advanced features and seamless user experience',
                image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
                category: 'Web Development'
              },
              {
                title: 'Mobile Banking App',
                description: 'Secure and intuitive mobile banking solution with cutting-edge design',
                image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
                category: 'Mobile App'
              },
              {
                title: 'Corporate Website',
                description: 'Professional corporate website with modern design and powerful features',
                image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
                category: 'Corporate'
              }
            ]
          };
        }
        return { title: 'Feature Highlights', slides: [] };
      case 'about':
        return {
          title: 'About Our Company',
          description: 'We are passionate about creating innovative solutions that help businesses grow and succeed in the digital world. Our team of experts combines creativity with technical excellence to deliver outstanding results.',
          image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        };
      case 'services':
        return {
          title: 'Our Services',
          services: [
            { icon: 'Zap', title: 'Lightning Fast', description: 'Optimized for speed and performance with cutting-edge technology' },
            { icon: 'Shield', title: 'Secure & Reliable', description: 'Bank-level security with 99.9% uptime guarantee' },
            { icon: 'Users', title: 'Team Collaboration', description: 'Work together seamlessly with real-time collaboration tools' },
            { icon: 'Smartphone', title: 'Mobile Responsive', description: 'Perfect on all devices - mobile, tablet, and desktop' },
            { icon: 'Palette', title: 'Beautiful Design', description: 'Stunning templates and customization options' }
          ]
        };
      case 'features':
        return {
          title: 'Platform Features',
          subtitle: 'Everything you need to build amazing websites',
          features: [
            { icon: 'Zap', title: 'Drag & Drop Builder', description: 'Intuitive visual editor that anyone can use' },
            { icon: 'Smartphone', title: 'Mobile Responsive', description: 'Looks perfect on all devices automatically' },
            { icon: 'Palette', title: 'Beautiful Templates', description: 'Professional designs for every industry' },
            { icon: 'Shield', title: 'Secure Hosting', description: 'Fast, reliable, and secure web hosting included' },
            { icon: 'Users', title: 'Team Collaboration', description: 'Work together with your team in real-time' },
            { icon: 'BarChart', title: 'Analytics Dashboard', description: 'Track your website performance and visitors' }
          ]
        };
      case 'pricing':
        return {
          title: 'Simple, Transparent Pricing',
          plans: [
            { 
              name: 'Starter', 
              price: '$9', 
              features: ['5 Pages', 'Basic Templates', 'Mobile Responsive', 'SSL Certificate', 'Email Support'] 
            },
            { 
              name: 'Professional', 
              price: '$29', 
              features: ['Unlimited Pages', 'Premium Templates', 'Custom Domain', 'Advanced Analytics', 'Priority Support', 'E-commerce Ready'] 
            },
            { 
              name: 'Enterprise', 
              price: '$99', 
              features: ['Everything in Pro', 'White Label', 'API Access', 'Custom Integrations', '24/7 Phone Support', 'Dedicated Account Manager'] 
            }
          ]
        };
      case 'testimonials':
        return {
          title: 'What Our Customers Say',
          testimonials: [
            { 
              name: 'Alex Thompson', 
              role: 'Small Business Owner', 
              content: 'This platform helped me create a professional website for my business in just a few hours. The results exceeded my expectations!' 
            },
            { 
              name: 'Maria Garcia', 
              role: 'Freelance Designer', 
              content: 'As a designer, I appreciate the attention to detail and the beautiful templates. My clients love their new websites.' 
            },
            { 
              name: 'David Kim', 
              role: 'Startup Founder', 
              content: 'We launched our startup website in record time. The drag-and-drop builder made it so easy to iterate and improve.' 
            }
          ]
        };
      case 'portfolio':
        return {
          title: 'Our Work',
          subtitle: 'Check out some of our recent projects',
          projects: [
            {
              title: 'Restaurant Website',
              description: 'Modern restaurant website with online ordering and reservation system',
              image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
              category: 'Restaurant',
              url: '#'
            },
            {
              title: 'Tech Startup',
              description: 'Clean and modern website for a technology startup company',
              image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
              category: 'Technology',
              url: '#'
            },
            {
              title: 'Fashion Brand',
              description: 'Elegant e-commerce website for a luxury fashion brand',
              image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
              category: 'Fashion',
              url: '#'
            },
            {
              title: 'Healthcare Clinic',
              description: 'Professional website for a medical practice with appointment booking',
              image: 'https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
              category: 'Healthcare',
              url: '#'
            }
          ],
          categories: ['All', 'Restaurant', 'Technology', 'Fashion', 'Healthcare']
        };
      case 'contact':
        return {
          title: 'Get in Touch',
          subtitle: 'We would love to hear from you and discuss your project',
          email: 'hello@templates.uz',
          phone: '+998 90 123 45 67',
          address: 'Tashkent, Uzbekistan'
        };
      case 'footer':
        return {
          companyName: 'Templates.uz',
          links: [
            { title: 'About Us', url: '#about' },
            { title: 'Services', url: '#services' },
            { title: 'Portfolio', url: '#portfolio' },
            { title: 'Contact', url: '#contact' },
            { title: 'Privacy Policy', url: '#privacy' },
            { title: 'Terms of Service', url: '#terms' }
          ],
          socialLinks: [
            { platform: 'Twitter', url: 'https://twitter.com' },
            { platform: 'LinkedIn', url: 'https://linkedin.com' },
            { platform: 'Facebook', url: 'https://facebook.com' },
            { platform: 'Instagram', url: 'https://instagram.com' }
          ]
        };
      case 'faq':
        return {
          title: 'Frequently Asked Questions',
          subtitle: 'Find answers to common questions about our services',
          faqs: [
            {
              question: 'How does the website builder work?',
              answer: 'Our drag-and-drop website builder allows you to create professional websites without any coding knowledge. Simply choose a template, customize it with your content, and publish.'
            },
            {
              question: 'Can I use my own domain name?',
              answer: 'Yes, you can connect your own custom domain name to your website. We also provide free subdomains if you prefer.'
            },
            {
              question: 'Is there a free trial available?',
              answer: 'We offer a 14-day free trial with full access to all features. No credit card required to get started.'
            },
            {
              question: 'Can I export my website?',
              answer: 'Yes, you can export your website as HTML files and host it anywhere you like. Your content belongs to you.'
            }
          ]
        };
      case 'timeline':
        return {
          title: 'Our Journey',
          subtitle: 'Key milestones in our company history',
          items: [
            {
              year: '2020',
              title: 'Company Founded',
              description: 'Started with a vision to make website building accessible to everyone'
            },
            {
              year: '2021',
              title: 'First 1000 Users',
              description: 'Reached our first milestone of 1000 happy customers'
            },
            {
              year: '2022',
              title: 'Mobile App Launch',
              description: 'Launched our mobile app for building websites on the go'
            },
            {
              year: '2023',
              title: 'Global Expansion',
              description: 'Expanded our services to serve customers worldwide'
            }
          ]
        };
      case 'stats':
        return {
          title: 'Our Impact in Numbers',
          subtitle: 'See how we\'re making a difference',
          stats: [
            { number: '10000', label: 'Websites Created', suffix: '+' },
            { number: '50000', label: 'Happy Users', suffix: '+' },
            { number: '99', label: 'Uptime', suffix: '%' },
            { number: '24', label: 'Support Hours', suffix: '/7' }
          ]
        };
      case 'newsletter':
        return {
          title: 'Stay Updated',
          subtitle: 'Get the latest news, tips, and exclusive offers delivered to your inbox',
          placeholder: 'Enter your email address',
          buttonText: 'Subscribe'
        };
      case 'cta':
        return {
          title: 'Ready to Get Started?',
          subtitle: 'Join thousands of users who are already building amazing websites with our platform',
          buttonText: 'Start Building Now',
          buttonLink: '#contact'
        };
      case 'gallery':
        return {
          title: 'Our Gallery',
          subtitle: 'Explore our collection of beautiful work',
          items: [
            {
              image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
              title: 'Modern Design',
              category: 'Web Design'
            },
            {
              image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
              title: 'Mobile App',
              category: 'Mobile'
            },
            {
              image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
              title: 'Brand Identity',
              category: 'Branding'
            },
            {
              image: 'https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
              title: 'E-commerce',
              category: 'Web Design'
            }
          ],
          categories: ['Web Design', 'Mobile', 'Branding']
        };
      default:
        return {};
    }
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      currentProject,
      currentPage,
      createProject,
      updateProject,
      deleteProject,
      setCurrentProject,
      createPage,
      updatePage,
      deletePage,
      setCurrentPage: setCurrentPageById,
      addSection,
      updateSection,
      deleteSection,
      reorderSections
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};