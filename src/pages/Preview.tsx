import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Edit3, 
  Share2, 
  ExternalLink, 
  Globe, 
  Smartphone, 
  Monitor,
  Eye,
  Settings,
  Download,
  Sparkles,
  FileText,
  Home
} from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';
import { useTheme } from '../contexts/ThemeContext';
import SectionRenderer from '../components/SectionRenderer';

const Preview: React.FC = () => {
  const { id } = useParams();
  const { pageId } = useParams<{ pageId?: string }>();
  const navigate = useNavigate();
  const { projects, currentProject, currentPage, setCurrentProject, setCurrentPage } = useProject();
  const { currentTheme } = useTheme();
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    if (id) {
      const project = projects.find(p => p.id === id);
      if (project) {
        setCurrentProject(project);
        
        // If pageId is provided, set that page as current
        if (pageId) {
          const page = project.pages.find(p => p.id === pageId);
          if (page) {
            setCurrentPage(page.id);
          }
        } else {
          // Otherwise, set the home page as current
          const homePage = project.pages.find(p => p.isHome);
          if (homePage) {
            setCurrentPage(homePage.id);
          } else if (project.pages.length > 0) {
            setCurrentPage(project.pages[0].id);
          }
        }
      }
    }
  }, [id, pageId, projects, setCurrentProject, setCurrentPage]);

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePublish = () => {
    alert(`🎉 Your website has been published!\n\nYou can access it at: ${currentProject?.name.toLowerCase().replace(/\s+/g, '-')}.templates.uz`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentProject?.name,
        text: `Check out my website: ${currentProject?.name}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!currentProject) {
    return (
      <div className="min-h-screen platform-bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="platform-text-secondary text-lg">Loading preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Floating Header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: showHeader ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="fixed top-4 left-4 right-4 z-50 platform-bg-primary rounded-2xl platform-shadow-xl border platform-border backdrop-blur-xl bg-white/95"
      >
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(`/editor/${currentProject.id}`)}
              className="p-2 hover:platform-bg-tertiary rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 platform-text-secondary" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 platform-gradient-primary rounded-xl flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold platform-text-primary platform-font-primary">{currentProject.name}</h1>
                <p className="text-sm platform-text-secondary platform-font-secondary">Live Preview Mode</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Page Selector */}
            <div className="hidden sm:flex items-center gap-2 mr-2">
              {currentProject?.pages.map(page => (
                <Link
                  key={page.id}
                  to={`/preview/${currentProject.id}/${page.id}`}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    currentPage?.id === page.id 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-white/80 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page.isHome ? <Home className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                  {page.name}
                </Link>
              ))}
            </div>
            
            <button
              onClick={() => navigate(`/editor/${currentProject.id}`)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>

            <button
              onClick={handlePublish}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <Globe className="w-4 h-4" />
              Publish
            </button>
          </div>
        </div>
      </motion.div>

      {/* Website Content */}
      <div className="pt-20">
        {!currentPage?.sections.length ? (
          <div className="min-h-screen flex items-center justify-center platform-bg-secondary">
            <div className="text-center max-w-lg">
              <div className="relative mb-8">
                <div className="w-24 h-24 platform-bg-tertiary rounded-3xl flex items-center justify-center mx-auto">
                  <Globe className="w-12 h-12 platform-text-tertiary" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center animate-bounce">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold platform-text-primary mb-4 platform-font-primary">
                Your website is empty
              </h2>
              <p className="platform-text-secondary mb-8 text-lg platform-font-secondary">
                Add some sections to see your website come to life
              </p>
              <button
                onClick={() => navigate(`/editor/${currentProject.id}`)}
                className="btn-primary text-lg px-8 py-4"
              >
                Start Building
              </button>
            </div>
          </div>
        ) : (
          currentPage.sections
            .sort((a, b) => a.order - b.order)
            .map((section) => (
              <SectionRenderer
                key={section.id}
                section={section}
                isSelected={false}
                onSelect={() => {}}
                isPreview={true}
                theme={currentTheme}
                isEditing={false}
                onEdit={() => {}}
              />
            ))
        )}
      </div>

      {/* Preview Mode Indicator */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl px-6 py-3 text-white flex items-center gap-3 platform-shadow-lg"
        >
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="font-medium platform-font-secondary">Preview Mode Active</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Preview;