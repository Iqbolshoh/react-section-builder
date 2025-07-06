import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import {
  ArrowLeft,
  Plus,
  Settings,
  Eye,
  Download,
  Palette,
  Smartphone,
  Tablet,
  Monitor,
  Save,
  Menu,
  X,
  Check
} from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';
import { useTheme } from '../contexts/ThemeContext';
import SectionSelector from '../components/SectionSelector';
import SectionRenderer from '../components/SectionRenderer';
import ThemeCustomizer from '../components/ThemeCustomizer';
import DevicePreview from '../components/DevicePreview';

const Editor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, currentProject, setCurrentProject, reorderSections } = useProject();
  const { theme } = useTheme();
  const [showSectionSelector, setShowSectionSelector] = useState(false);
  const [showThemeCustomizer, setShowThemeCustomizer] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [devicePreview, setDevicePreview] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isSaving, setIsSaving] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    if (id) {
      const project = projects.find(p => p.id === id);
      if (project) {
        setCurrentProject(project);
      }
    }
  }, [id, projects, setCurrentProject]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !currentProject) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId !== overId) {
      const sections = [...currentProject.sections];
      const activeIndex = sections.findIndex(section => section.id === activeId);
      const overIndex = sections.findIndex(section => section.id === overId);

      if (activeIndex !== -1 && overIndex !== -1) {
        const [removed] = sections.splice(activeIndex, 1);
        sections.splice(overIndex, 0, removed);

        const updatedSections = sections.map((section, index) => ({
          ...section,
          order: index
        }));

        reorderSections(updatedSections);
      }
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    setTimeout(() => {
      setIsSaving(false);
      setEditingSection(null); // Exit editing mode after save
    }, 1000);
  };

  const handleExport = () => {
    if (currentProject) {
      const htmlContent = generateHTMLExport(currentProject, theme);

      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${currentProject.name.replace(/\s+/g, '-').toLowerCase()}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const generateHTMLExport = (project: any, theme: any) => {
    const sectionsHTML = project.sections
      .sort((a: any, b: any) => a.order - b.order)
      .map((section: any) => generateSectionHTML(section, theme))
      .join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${project.name}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=${theme.fontFamily.replace(' ', '+')}:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { 
            font-family: '${theme.fontFamily}', sans-serif; 
            margin: 0;
            padding: 0;
        }
        .primary-color { color: ${theme.primaryColor}; }
        .secondary-color { color: ${theme.secondaryColor}; }
        .primary-bg { background-color: ${theme.primaryColor}; }
        .secondary-bg { background-color: ${theme.secondaryColor}; }
        .gradient-bg { background: linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor}); }
        
        /* Responsive utilities */
        @media (max-width: 640px) {
            .container { padding-left: 1rem; padding-right: 1rem; }
        }
        
        /* Smooth scrolling */
        html { scroll-behavior: smooth; }
        
        /* Button styles */
        .btn-primary {
            background: linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor});
            color: white;
            padding: 12px 24px;
            border-radius: ${theme.buttonStyle === 'rounded' ? '9999px' : '8px'};
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s ease;
        }
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
    </style>
</head>
<body>
    ${sectionsHTML}
    
    <!-- JavaScript for interactivity -->
    <script>
        // Mobile menu toggle
        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            if (menu) {
                menu.classList.toggle('hidden');
            }
        }
        
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        // Form submission
        function handleFormSubmit(event) {
            event.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            event.target.reset();
        }
        
        // Newsletter submission
        function handleNewsletterSubmit(event) {
            event.preventDefault();
            alert('Thank you for subscribing!');
            event.target.reset();
        }
        
        // FAQ toggle
        function toggleFAQ(index) {
            const content = document.getElementById('faq-content-' + index);
            const icon = document.getElementById('faq-icon-' + index);
            
            if (content.classList.contains('hidden')) {
                content.classList.remove('hidden');
                icon.style.transform = 'rotate(180deg)';
            } else {
                content.classList.add('hidden');
                icon.style.transform = 'rotate(0deg)';
            }
        }
    </script>
</body>
</html>`;
  };

  const generateSectionHTML = (section: any, theme: any) => {
    const { content, type } = section;

    switch (type) {
      case 'hero-split':
        return `
        <section class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div class="text-center lg:text-left">
                        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style="color: ${theme.primaryColor}">
                            ${content.title}
                        </h1>
                        <p class="text-xl text-gray-600 mb-8">${content.subtitle}</p>
                        <a href="${content.buttonLink}" class="btn-primary">${content.buttonText}</a>
                    </div>
                    <div class="relative">
                        <img src="${content.image}" alt="Hero" class="w-full h-96 object-cover rounded-2xl shadow-2xl">
                    </div>
                </div>
            </div>
        </section>`;

      case 'header-classic':
        return `
        <header class="bg-white shadow-sm border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center gap-3">
                        ${content.logo ? `<img src="${content.logo}" alt="Logo" class="w-10 h-10 object-contain">` : ''}
                        <span class="text-xl font-bold" style="color: ${theme.primaryColor}">${content.companyName}</span>
                    </div>
                    <nav class="hidden lg:flex items-center space-x-8">
                        ${content.menuItems.map((item: any) => `
                            <a href="${item.url}" class="text-gray-700 hover:text-blue-600 transition-colors font-medium">${item.title}</a>
                        `).join('')}
                    </nav>
                    <button onclick="toggleMobileMenu()" class="lg:hidden p-2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
                <div id="mobile-menu" class="lg:hidden hidden py-4">
                    ${content.menuItems.map((item: any) => `
                        <a href="${item.url}" class="block py-2 text-gray-700 hover:text-blue-600">${item.title}</a>
                    `).join('')}
                </div>
            </div>
        </header>`;

      case 'contact-form':
        return `
        <section class="py-20 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold text-gray-900 mb-4" style="color: ${theme.primaryColor}">${content.title}</h2>
                    <p class="text-xl text-gray-600">${content.subtitle}</p>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h3>
                        <div class="space-y-6">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-gray-900">Email</h4>
                                    <p class="text-gray-600">${content.email}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-gray-900">Phone</h4>
                                    <p class="text-gray-600">${content.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <form onsubmit="handleFormSubmit(event)" class="space-y-6">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                                <input type="text" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                <input type="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                                <textarea required rows="6" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"></textarea>
                            </div>
                            <button type="submit" class="btn-primary w-full">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>`;

      case 'faq-accordion':
        return `
        <section class="py-20 bg-white">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold text-gray-900 mb-4" style="color: ${theme.primaryColor}">${content.title}</h2>
                    ${content.subtitle ? `<p class="text-xl text-gray-600">${content.subtitle}</p>` : ''}
                </div>
                <div class="space-y-4">
                    ${content.faqs.map((faq: any, index: number) => `
                        <div class="bg-gray-50 rounded-xl overflow-hidden">
                            <button onclick="toggleFAQ(${index})" class="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors">
                                <h3 class="text-lg font-semibold text-gray-900">${faq.question}</h3>
                                <svg class="w-5 h-5 text-gray-500 transform transition-transform" id="faq-icon-${index}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            <div id="faq-content-${index}" class="hidden px-6 pb-6">
                                <p class="text-gray-600 leading-relaxed">${faq.answer}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>`;

      case 'stats-grid':
        return `
        <section class="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold text-gray-900 mb-4" style="color: ${theme.primaryColor}">${content.title}</h2>
                    ${content.subtitle ? `<p class="text-xl text-gray-600">${content.subtitle}</p>` : ''}
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    ${content.stats.map((stat: any) => `
                        <div class="text-center p-6 bg-white rounded-xl shadow-lg">
                            <div class="text-4xl font-bold mb-2" style="color: ${theme.primaryColor}">
                                ${stat.number}${stat.suffix || ''}
                            </div>
                            <div class="text-gray-600 font-medium">${stat.label}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>`;

      case 'newsletter-centered':
        return `
        <section class="py-20 bg-gradient-to-br from-blue-600 to-purple-700">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-4xl font-bold text-white mb-4">${content.title}</h2>
                <p class="text-xl text-white/90 mb-8">${content.subtitle}</p>
                <form onsubmit="handleNewsletterSubmit(event)" class="max-w-md mx-auto">
                    <div class="flex gap-3">
                        <input type="email" required placeholder="${content.placeholder}" class="flex-1 px-6 py-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50">
                        <button type="submit" class="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors">${content.buttonText}</button>
                    </div>
                </form>
            </div>
        </section>`;

      default:
        return `<div class="py-20 text-center">
            <h2 class="text-2xl font-bold text-gray-900">${type} Section</h2>
            <p class="text-gray-600 mt-2">Content for ${type} section</p>
        </div>`;
    }
  };

  if (!currentProject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 flex flex-col">
      {/* Mobile Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 lg:hidden shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-900 truncate max-w-32">{currentProject.name}</h1>
              <p className="text-xs text-gray-500">{currentProject.sections.length} sections</p>
            </div>
          </div>

          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 space-y-3"
            >
              {/* Device Preview Toggle */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setDevicePreview('mobile')}
                  className={`flex-1 p-2 rounded-lg transition-colors text-xs ${devicePreview === 'mobile' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-600'
                    }`}
                >
                  <Smartphone className="w-4 h-4 mx-auto" />
                </button>
                <button
                  onClick={() => setDevicePreview('tablet')}
                  className={`flex-1 p-2 rounded-lg transition-colors text-xs ${devicePreview === 'tablet' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-600'
                    }`}
                >
                  <Tablet className="w-4 h-4 mx-auto" />
                </button>
                <button
                  onClick={() => setDevicePreview('desktop')}
                  className={`flex-1 p-2 rounded-lg transition-colors text-xs ${devicePreview === 'desktop' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-600'
                    }`}
                >
                  <Monitor className="w-4 h-4 mx-auto" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setShowSectionSelector(true);
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center justify-center gap-2 px-3 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all text-sm font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  Add Section
                </button>

                <button
                  onClick={() => {
                    setShowThemeCustomizer(true);
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center justify-center gap-2 px-3 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all text-sm font-semibold"
                >
                  <Settings className="w-4 h-4" />
                  Theme
                </button>

                <button
                  onClick={() => navigate(`/preview/${currentProject.id}`)}
                  className="flex items-center justify-center gap-2 px-3 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all text-sm font-semibold"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </button>

                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center justify-center gap-2 px-3 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 text-sm font-semibold"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : editingSection ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {isSaving ? 'Saving...' : editingSection ? 'Done' : 'Save'}
                </button>
              </div>

              <button
                onClick={handleExport}
                className="w-full flex items-center justify-center gap-2 px-3 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:from-orange-600 hover:to-red-700 transition-all text-sm font-semibold"
              >
                <Download className="w-4 h-4" />
                Export HTML
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block bg-white border-b border-gray-200 px-6 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{currentProject.name}</h1>
                <p className="text-sm text-gray-500">{currentProject.sections.length} sections</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Device Preview Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setDevicePreview('mobile')}
                className={`p-3 rounded-lg transition-colors ${devicePreview === 'mobile' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
                  }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDevicePreview('tablet')}
                className={`p-3 rounded-lg transition-colors ${devicePreview === 'tablet' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
                  }`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDevicePreview('desktop')}
                className={`p-3 rounded-lg transition-colors ${devicePreview === 'desktop' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
                  }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>

            {/* Action Buttons */}
            <button
              onClick={() => setShowSectionSelector(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all font-semibold shadow-lg"
            >
              <Plus className="w-4 h-4" />
              Add Section
            </button>

            <button
              onClick={() => setShowThemeCustomizer(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all font-semibold shadow-lg"
            >
              <Settings className="w-4 h-4" />
              Theme
            </button>

            <button
              onClick={() => navigate(`/preview/${currentProject.id}`)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all font-semibold shadow-lg"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 font-semibold shadow-lg"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : editingSection ? (
                <Check className="w-4 h-4" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSaving ? 'Saving...' : editingSection ? 'Done Editing' : 'Save'}
            </button>

            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:from-orange-600 hover:to-red-700 transition-all font-semibold shadow-lg"
            >
              <Download className="w-4 h-4" />
              Export HTML
            </button>
          </div>
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 flex">
        {/* Canvas */}
        <div className="flex-1 overflow-auto">
          <DevicePreview device={devicePreview}>
            <DndContext onDragEnd={handleDragEnd}>
              <SortableContext
                items={currentProject.sections.map(s => s.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="min-h-full" style={{ fontFamily: theme.fontFamily }}>
                  {currentProject.sections.length === 0 ? (
                    <div className="h-full flex items-center justify-center p-8">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                          <Plus className="w-10 h-10 text-emerald-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          Start Building Your Website
                        </h3>
                        <p className="text-gray-500 mb-6 text-lg max-w-md mx-auto">
                          Add your first section to create something amazing
                        </p>
                        <button
                          onClick={() => setShowSectionSelector(true)}
                          className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all font-semibold text-lg shadow-lg"
                        >
                          Add Your First Section
                        </button>
                      </div>
                    </div>
                  ) : (
                    currentProject.sections
                      .sort((a, b) => a.order - b.order)
                      .map((section) => (
                        <SectionRenderer
                          key={section.id}
                          section={section}
                          isSelected={selectedSection === section.id}
                          onSelect={() => setSelectedSection(section.id)}
                          theme={theme}
                          isEditing={editingSection === section.id}
                          onEdit={(editing) => {
                            if (editing) {
                              setEditingSection(section.id);
                            } else {
                              setEditingSection(null);
                            }
                          }}
                        />
                      ))
                  )}
                </div>
              </SortableContext>
            </DndContext>
          </DevicePreview>
        </div>
      </div>

      {/* Modals */}
      {showSectionSelector && (
        <SectionSelector
          onClose={() => setShowSectionSelector(false)}
          onSelect={() => setShowSectionSelector(false)}
        />
      )}

      {showThemeCustomizer && (
        <ThemeCustomizer
          onClose={() => setShowThemeCustomizer(false)}
        />
      )}
    </div>
  );
};

export default Editor;