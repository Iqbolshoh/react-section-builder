import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import {
  ArrowLeft,
  Plus,
  Eye,
  Download,
  Save,
  Menu,
  X,
  Check,
  Sparkles,
  Palette,
  Layers,
  Code,
  FileText,
  Home,
  Edit2,
  Trash,
} from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';
import { useTheme } from '../contexts/ThemeContext';
import SectionSelector from '../components/SectionSelector';
import SectionRenderer from '../components/SectionRenderer';
import ThemeCustomizer from '../components/ThemeCustomizer';
import { generateCompleteHTML } from '../utils/htmlExporter';
import AddSectionButton from '../components/AddSectionButton';

interface PageTabProps {
  page: {
    id: string;
    name: string;
    isHome: boolean;
  };
  isActive: boolean;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const PageTab: React.FC<PageTabProps> = ({ page, isActive, onClick, onEdit, onDelete }) => {
  return (
    <div 
      className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${
        isActive ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      {page.isHome ? (
        <Home className="w-4 h-4" />
      ) : (
        <FileText className="w-4 h-4" />
      )}
      <span className="font-medium">{page.name}</span>
      {isActive && (
        <div className="flex items-center ml-2">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
            className="p-1 text-gray-500 hover:text-indigo-600 transition-colors"
          >
            <Edit2 className="w-3 h-3" />
          </button>
          {!page.isHome && (
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="p-1 text-gray-500 hover:text-red-600 transition-colors"
            >
              <Trash className="w-3 h-3" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const Editor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    projects, 
    currentProject, 
    currentPage,
    setCurrentProject, 
    setCurrentPage,
    createPage,
    updatePage,
    deletePage,
    reorderSections 
  } = useProject();
  const { currentTheme } = useTheme();
  const [showSectionSelector, setShowSectionSelector] = useState(false);
  const [showThemeCustomizer, setShowThemeCustomizer] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showPageModal, setShowPageModal] = useState(false);
  const [pageFormData, setPageFormData] = useState({ name: '', isHome: false });
  const [editingPageId, setEditingPageId] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const project = projects.find(p => p.id === id);
      if (project) {
        setCurrentProject(project);
        // Set the home page as the current page by default
        const homePage = project.pages.find(page => page.isHome);
        if (homePage) {
          setCurrentPage(homePage.id);
        } else if (project.pages.length > 0) {
          setCurrentPage(project.pages[0].id);
        }
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
      setEditingSection(null);
    }, 1000);
  };
  
  const handleCreatePage = () => {
    setPageFormData({ name: '', isHome: false });
    setEditingPageId(null);
    setShowPageModal(true);
  };
  
  const handleEditPage = (pageId: string) => {
    const page = currentProject?.pages.find(p => p.id === pageId);
    if (page) {
      setPageFormData({ name: page.name, isHome: page.isHome });
      setEditingPageId(pageId);
      setShowPageModal(true);
    }
  };
  
  const handleSavePage = () => {
    if (!pageFormData.name.trim()) {
      alert('Page name cannot be empty');
      return;
    }
    
    if (editingPageId) {
      // Update existing page
      updatePage(editingPageId, {
        name: pageFormData.name,
        isHome: pageFormData.isHome,
        slug: pageFormData.name.toLowerCase().replace(/\s+/g, '-')
      });
    } else {
      // Create new page
      createPage(pageFormData.name, pageFormData.isHome);
    }
    
    setShowPageModal(false);
  };

  const handleExport = () => {
    if (currentProject && currentTheme) {
      const htmlContent = generateCompleteHTML(currentProject, currentTheme);
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${currentProject.name.replace(/\s+/g, '-').toLowerCase()}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // Show success message
      alert('Website exported successfully! The HTML file has been downloaded.');
      
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);
    }
  };

  const generateHTMLExport = (project: any, theme: any) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${project.name}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <h1>Website: ${project.name}</h1>
    <p>Sections: ${project.sections.length}</p>
    <!-- Website content would be rendered here -->
</body>
</html>`;
  };

  if (!currentProject) {
    return (
      <div className="min-h-screen platform-bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="platform-text-secondary text-lg">Loading your project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen platform-bg-secondary flex flex-col">
      {/* Mobile Header */}
      <div className="platform-bg-primary border-b platform-border px-4 py-4 lg:hidden platform-shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:platform-bg-tertiary rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5 platform-text-secondary" />
            </button>
            <div>
              <h1 className="text-lg font-bold platform-text-primary truncate max-w-32 platform-font-primary">{currentProject.name}</h1>
              <p className="text-xs platform-text-secondary platform-font-secondary">{currentProject.sections.length} sections</p>
            </div>
          </div>

          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 hover:platform-bg-tertiary rounded-xl transition-colors"
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
              className="mt-4 space-y-4"
            >
              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setShowSectionSelector(true);
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 platform-gradient-primary text-white rounded-xl hover:opacity-90 transition-all text-sm font-semibold platform-shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  Add Section
                </button>

                <button
                  onClick={() => {
                    setShowThemeCustomizer(true);
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all text-sm font-semibold platform-shadow-md"
                >
                  <Palette className="w-4 h-4" />
                  Theme
                </button>

                <button
                  onClick={() => navigate(`/preview/${currentProject.id}`)}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm font-semibold platform-shadow-md"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </button>

                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all disabled:opacity-50 text-sm font-semibold platform-shadow-md"
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
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all text-sm font-semibold platform-shadow-md"
              >
                <Download className="w-4 h-4" />
                Export HTML
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block platform-bg-primary border-b platform-border px-6 py-5 platform-shadow-md backdrop-blur-xl bg-white/95">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-3 hover:platform-bg-tertiary rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5 platform-text-secondary" />
            </button>

            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 platform-gradient-primary rounded-2xl flex items-center justify-center platform-shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold platform-text-primary platform-font-primary">{currentProject.name}</h1>
                <p className="text-sm platform-text-secondary platform-font-secondary">
                  {currentProject.sections.length} sections • Last saved {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSectionSelector(true)}
              className="btn-primary"
            >
              <Plus className="w-4 h-4" />
              Add Section
            </button>

            <button
              onClick={() => setShowThemeCustomizer(true)}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all font-semibold platform-shadow-lg"
            >
              <Palette className="w-4 h-4" />
              Customize
            </button>

            <button
              onClick={() => navigate(`/preview/${currentProject.id}`)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold platform-shadow-lg"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all disabled:opacity-50 font-semibold platform-shadow-lg"
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
              className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all font-semibold platform-shadow-lg"
            >
              <Code className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 flex">
        {/* Canvas */}
        <div className="flex-1 overflow-auto">
          {/* Page Tabs */}
          <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-2 overflow-x-auto">
            {currentProject?.pages.map(page => (
              <PageTab
                key={page.id}
                page={page}
                isActive={currentPage?.id === page.id}
                onClick={() => setCurrentPage(page.id)}
                onEdit={() => handleEditPage(page.id)}
                onDelete={() => deletePage(page.id)}
              />
            ))}
            <button
              onClick={handleCreatePage}
              className="flex items-center gap-1 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">New Page</span>
            </button>
          </div>
          
          <DndContext onDragEnd={handleDragEnd}>
            <SortableContext
              items={currentPage?.sections.map(s => s.id) || []}
              strategy={verticalListSortingStrategy}
            >
              <div className="min-h-full" style={{ fontFamily: currentTheme?.fonts?.primary }}>
                {!currentPage?.sections.length ? (
                  <div className="h-full flex items-center justify-center p-8">
                    <div className="text-center max-w-lg">
                      <div className="relative mb-8">
                        <div className="w-24 h-24 platform-gradient-primary rounded-3xl flex items-center justify-center mx-auto platform-shadow-xl">
                          <Layers className="w-12 h-12 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold platform-text-primary mb-4 platform-font-primary">
                        Ready to Build Something Amazing?
                      </h3>
                      <p className="platform-text-secondary mb-8 text-lg platform-font-secondary leading-relaxed">
                        Start by adding your first section. Choose from headers, heroes, content blocks, and more to create your perfect website.
                      </p>
                      {currentPage && (
                      <button
                        onClick={() => setShowSectionSelector(true)}
                        className="btn-primary text-lg px-8 py-4"
                      >
                        <Plus className="w-5 h-5" />
                        Add Your First Section
                      </button>
                      )}
                    </div>
                  </div>
                ) : (
                  currentPage.sections
                    .sort((a, b) => a.order - b.order)
                    .map((section, index) => (
                      <React.Fragment key={section.id}>
                        {index === 0 && (
                          <AddSectionButton 
                            onAdd={() => {
                              setShowSectionSelector(true);
                              setSelectedSection(null);
                            }}
                            position="above"
                            theme={currentTheme}
                          />
                        )}
                        <SectionRenderer
                          section={section}
                          isSelected={selectedSection === section.id}
                          onSelect={() => setSelectedSection(section.id)}
                          theme={currentTheme}
                          isEditing={editingSection === section.id}
                          onEdit={(editing) => {
                            if (editing) {
                              setEditingSection(section.id);
                            } else {
                              setEditingSection(null);
                            }
                          }}
                        />
                        <AddSectionButton 
                          onAdd={() => {
                            setShowSectionSelector(true);
                            setSelectedSection(null);
                          }}
                          position="below"
                          theme={currentTheme}
                        />
                      </React.Fragment>
                    ))
                )}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/* Modals */}
      {showSectionSelector && (
        <SectionSelector
          onClose={() => setShowSectionSelector(false)}
          onSelect={() => setShowSectionSelector(false)}
        />
      )}

      {/* Page Modal */}
      {showPageModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 platform-text-primary">
              {editingPageId ? 'Edit Page' : 'Create New Page'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 platform-text-primary">
                  Page Name
                </label>
                <input
                  type="text"
                  value={pageFormData.name}
                  onChange={(e) => setPageFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., About Us, Services, Contact"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isHome"
                  checked={pageFormData.isHome}
                  onChange={(e) => setPageFormData(prev => ({ ...prev, isHome: e.target.checked }))}
                  className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="isHome" className="platform-text-primary">
                  Set as Home Page
                </label>
              </div>
              {pageFormData.isHome && currentProject?.pages.some(p => p.isHome && p.id !== editingPageId) && (
                <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
                  Note: This will replace the current home page.
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowPageModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePage}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {editingPageId ? 'Update Page' : 'Create Page'}
              </button>
            </div>
          </div>
        </div>
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