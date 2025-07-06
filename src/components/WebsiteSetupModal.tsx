import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, Upload, Image as ImageIcon, Check, AlertCircle } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';
import { useNavigate } from 'react-router-dom';

interface WebsiteSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WebsiteInfo {
  name: string;
  url: string;
  title: string;
  description: string;
  logo: string;
  favicon: string;
  category: string;
  language: string;
}

const WebsiteSetupModal: React.FC<WebsiteSetupModalProps> = ({ isOpen, onClose }) => {
  const { createProject } = useProject();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [urlAvailable, setUrlAvailable] = useState<boolean | null>(null);
  const [checkingUrl, setCheckingUrl] = useState(false);

  const [websiteInfo, setWebsiteInfo] = useState<WebsiteInfo>({
    name: '',
    url: '',
    title: '',
    description: '',
    logo: '',
    favicon: '',
    category: 'business',
    language: 'en'
  });

  const categories = [
    { id: 'business', name: 'Business & Corporate', icon: '🏢' },
    { id: 'portfolio', name: 'Portfolio & Creative', icon: '🎨' },
    { id: 'ecommerce', name: 'E-commerce & Shop', icon: '🛒' },
    { id: 'blog', name: 'Blog & News', icon: '📝' },
    { id: 'restaurant', name: 'Restaurant & Food', icon: '🍽️' },
    { id: 'health', name: 'Health & Medical', icon: '🏥' },
    { id: 'education', name: 'Education & Learning', icon: '🎓' },
    { id: 'nonprofit', name: 'Non-profit & Charity', icon: '❤️' },
    { id: 'technology', name: 'Technology & SaaS', icon: '💻' },
    { id: 'personal', name: 'Personal & Lifestyle', icon: '👤' }
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'uz', name: 'O\'zbekcha', flag: '🇺🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' }
  ];

  const handleInputChange = (field: keyof WebsiteInfo, value: string) => {
    setWebsiteInfo(prev => ({ ...prev, [field]: value }));
    
    // Auto-generate URL from name
    if (field === 'name' && !websiteInfo.url) {
      const urlSlug = value.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setWebsiteInfo(prev => ({ ...prev, url: urlSlug }));
    }
  };

  const checkUrlAvailability = async (url: string) => {
    if (!url) return;
    
    setCheckingUrl(true);
    
    // Simulate API call to check URL availability
    setTimeout(() => {
      // For demo purposes, make some URLs unavailable
      const unavailableUrls = ['test', 'demo', 'example', 'admin', 'api', 'www'];
      setUrlAvailable(!unavailableUrls.includes(url.toLowerCase()));
      setCheckingUrl(false);
    }, 1000);
  };

  const handleUrlChange = (value: string) => {
    const cleanUrl = value.toLowerCase()
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-');
    
    setWebsiteInfo(prev => ({ ...prev, url: cleanUrl }));
    setUrlAvailable(null);
    
    if (cleanUrl.length >= 3) {
      checkUrlAvailability(cleanUrl);
    }
  };

  const handleImageUpload = (field: 'logo' | 'favicon', file: File) => {
    // In a real app, this would upload to a server
    const reader = new FileReader();
    reader.onload = (e) => {
      setWebsiteInfo(prev => ({ ...prev, [field]: e.target?.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleCreateWebsite = async () => {
    setIsCreating(true);
    
    // Simulate website creation
    setTimeout(() => {
      const newProject = createProject(websiteInfo.name);
      setIsCreating(false);
      onClose();
      navigate(`/editor/${newProject.id}`);
    }, 2000);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return websiteInfo.name.length >= 2 && websiteInfo.url.length >= 3 && urlAvailable;
      case 2:
        return websiteInfo.title.length >= 2 && websiteInfo.description.length >= 10;
      case 3:
        return true; // Optional step
      default:
        return false;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Create Your Website</h2>
                <p className="text-blue-100 mt-1">Step {step} of 4</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-xl transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-6 bg-white/20 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(step / 4) * 100}%` }}
                className="bg-white rounded-full h-2"
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-auto max-h-[calc(90vh-200px)]">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Basic Information</h3>
                  <p className="text-gray-600">Let's start with the basics of your website</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Website Name *
                  </label>
                  <input
                    type="text"
                    value={websiteInfo.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="My Awesome Website"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Website URL *
                  </label>
                  <div className="flex items-center">
                    <span className="bg-gray-100 px-4 py-3 rounded-l-xl border border-r-0 border-gray-300 text-gray-600">
                      https://
                    </span>
                    <input
                      type="text"
                      value={websiteInfo.url}
                      onChange={(e) => handleUrlChange(e.target.value)}
                      placeholder="my-website"
                      className="flex-1 px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <span className="bg-gray-100 px-4 py-3 rounded-r-xl border border-l-0 border-gray-300 text-gray-600">
                      .templates.uz
                    </span>
                  </div>
                  
                  {websiteInfo.url.length >= 3 && (
                    <div className="mt-2 flex items-center gap-2">
                      {checkingUrl ? (
                        <>
                          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-sm text-gray-600">Checking availability...</span>
                        </>
                      ) : urlAvailable === true ? (
                        <>
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-600">URL is available!</span>
                        </>
                      ) : urlAvailable === false ? (
                        <>
                          <AlertCircle className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-red-600">URL is not available</span>
                        </>
                      ) : null}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleInputChange('category', category.id)}
                        className={`p-3 rounded-xl border-2 transition-all text-left ${
                          websiteInfo.category === category.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{category.icon}</span>
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Content Details</h3>
                  <p className="text-gray-600">Add your website's main content information</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Website Title *
                  </label>
                  <input
                    type="text"
                    value={websiteInfo.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Welcome to My Awesome Website"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <p className="text-sm text-gray-500 mt-1">This will appear in your header and browser title</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Website Description *
                  </label>
                  <textarea
                    value={websiteInfo.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe what your website is about, what services you offer, or what makes you unique..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                  <p className="text-sm text-gray-500 mt-1">This will be used in your footer and meta description</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Language
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {languages.slice(0, 6).map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleInputChange('language', language.code)}
                        className={`p-3 rounded-xl border-2 transition-all text-left ${
                          websiteInfo.language === language.code
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{language.flag}</span>
                          <span className="text-sm font-medium">{language.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Visual Identity</h3>
                  <p className="text-gray-600">Upload your logo and favicon (optional)</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Logo
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-400 transition-colors">
                      {websiteInfo.logo ? (
                        <div className="space-y-3">
                          <img src={websiteInfo.logo} alt="Logo" className="w-20 h-20 object-contain mx-auto" />
                          <button
                            onClick={() => setWebsiteInfo(prev => ({ ...prev, logo: '' }))}
                            className="text-sm text-red-600 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto" />
                          <div>
                            <p className="text-gray-600 mb-2">Upload your logo</p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload('logo', file);
                              }}
                              className="hidden"
                              id="logo-upload"
                            />
                            <label
                              htmlFor="logo-upload"
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                            >
                              Choose File
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Favicon
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-400 transition-colors">
                      {websiteInfo.favicon ? (
                        <div className="space-y-3">
                          <img src={websiteInfo.favicon} alt="Favicon" className="w-8 h-8 object-contain mx-auto" />
                          <button
                            onClick={() => setWebsiteInfo(prev => ({ ...prev, favicon: '' }))}
                            className="text-sm text-red-600 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Globe className="w-8 h-8 text-gray-400 mx-auto" />
                          <div>
                            <p className="text-gray-600 mb-2 text-sm">Upload favicon (16x16)</p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload('favicon', file);
                              }}
                              className="hidden"
                              id="favicon-upload"
                            />
                            <label
                              htmlFor="favicon-upload"
                              className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors cursor-pointer"
                            >
                              Choose File
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Review & Create</h3>
                  <p className="text-gray-600">Review your website information before creating</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Website Name</span>
                      <p className="font-semibold">{websiteInfo.name}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">URL</span>
                      <p className="font-semibold">{websiteInfo.url}.templates.uz</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Category</span>
                      <p className="font-semibold">{categories.find(c => c.id === websiteInfo.category)?.name}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Language</span>
                      <p className="font-semibold">{languages.find(l => l.code === websiteInfo.language)?.name}</p>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-gray-500">Title</span>
                    <p className="font-semibold">{websiteInfo.title}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-gray-500">Description</span>
                    <p className="text-sm">{websiteInfo.description}</p>
                  </div>

                  {(websiteInfo.logo || websiteInfo.favicon) && (
                    <div className="flex items-center gap-4">
                      {websiteInfo.logo && (
                        <div>
                          <span className="text-sm font-medium text-gray-500 block mb-1">Logo</span>
                          <img src={websiteInfo.logo} alt="Logo" className="w-12 h-12 object-contain" />
                        </div>
                      )}
                      {websiteInfo.favicon && (
                        <div>
                          <span className="text-sm font-medium text-gray-500 block mb-1">Favicon</span>
                          <img src={websiteInfo.favicon} alt="Favicon" className="w-6 h-6 object-contain" />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {isCreating && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Creating Your Website...</h4>
                    <p className="text-gray-600">Setting up your project and applying initial configuration</p>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Footer */}
          {!isCreating && (
            <div className="border-t border-gray-200 p-6 flex items-center justify-between">
              <button
                onClick={() => step > 1 ? setStep(step - 1) : onClose()}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
              >
                {step > 1 ? 'Back' : 'Cancel'}
              </button>

              <div className="flex items-center gap-3">
                {step < 4 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    disabled={!isStepValid()}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={handleCreateWebsite}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all font-semibold"
                  >
                    Create Website
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WebsiteSetupModal;