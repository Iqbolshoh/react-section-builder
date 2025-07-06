import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, Image as ImageIcon, Check, AlertCircle } from 'lucide-react';
import {
  Briefcase,
  Palette,
  ShoppingCart,
  BookOpen,
  Utensils,
  HeartPulse,
  GraduationCap,
  HandHeart,
  Cpu,
  User
} from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';
import { useNavigate } from 'react-router-dom';

interface WebsiteSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WebsiteInfo {
  name: string;
  url: string;
  seoKeywords: string;
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [websiteInfo, setWebsiteInfo] = useState<WebsiteInfo>({
    name: '',
    url: '',
    seoKeywords: '',
    logo: '',
    favicon: '',
    category: 'business',
    language: 'en'
  });

  const categories = [
    { id: 'business', name: 'Business & Corporate', icon: Briefcase },
    { id: 'portfolio', name: 'Portfolio & Creative', icon: Palette },
    { id: 'ecommerce', name: 'E-commerce & Shop', icon: ShoppingCart },
    { id: 'blog', name: 'Blog & News', icon: BookOpen },
    { id: 'restaurant', name: 'Restaurant & Food', icon: Utensils },
    { id: 'health', name: 'Health & Medical', icon: HeartPulse },
    { id: 'education', name: 'Education & Learning', icon: GraduationCap },
    { id: 'nonprofit', name: 'Non-profit & Charity', icon: HandHeart },
    { id: 'technology', name: 'Technology & SaaS', icon: Cpu },
    { id: 'personal', name: 'Personal & Lifestyle', icon: User }
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'uz', name: 'O\'zbekcha' },
    { code: 'ru', name: 'Русский' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'it', name: 'Italiano' },
    { code: 'pt', name: 'Português' }
  ];

  // Reserved subdomains that can't be used
  const reservedSubdomains = [
    'www', 'admin', 'api', 'test', 'demo', 'example',
    'mail', 'ftp', 'webmail', 'blog', 'shop', 'app'
  ];

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal is closed
      setStep(1);
      setWebsiteInfo({
        name: '',
        url: '',
        seoKeywords: '',
        logo: '',
        favicon: '',
        category: 'business',
        language: 'en'
      });
      setUrlAvailable(null);
      setErrors({});
    }
  }, [isOpen]);

  const validateStep = (stepNumber: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepNumber === 1) {
      if (!websiteInfo.name || websiteInfo.name.length < 2) {
        newErrors.name = 'Website name must be at least 2 characters';
      }

      if (!websiteInfo.url || websiteInfo.url.length < 3) {
        newErrors.url = 'Subdomain must be at least 3 characters';
      } else if (!/^[a-z0-9-]+$/.test(websiteInfo.url)) {
        newErrors.url = 'Subdomain can only contain lowercase letters, numbers, and hyphens';
      } else if (reservedSubdomains.includes(websiteInfo.url)) {
        newErrors.url = 'This subdomain is reserved and cannot be used';
      } else if (urlAvailable === false) {
        newErrors.url = 'This subdomain is already taken';
      }
    }

    if (stepNumber === 2) {
      if (!websiteInfo.seoKeywords || websiteInfo.seoKeywords.length < 3) {
        newErrors.seoKeywords = 'Please enter at least 3 characters for SEO keywords';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo purposes, make some URLs unavailable
      const unavailableUrls = ['test', 'demo', 'example', 'admin', 'api', 'www'];
      const isAvailable = !unavailableUrls.includes(url.toLowerCase()) &&
        !reservedSubdomains.includes(url.toLowerCase());

      setUrlAvailable(isAvailable);
    } catch (error) {
      console.error('Error checking URL availability:', error);
      setUrlAvailable(null);
    } finally {
      setCheckingUrl(false);
    }
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
    if (!file.type.match('image.*')) {
      setErrors(prev => ({ ...prev, [field]: 'Please upload a valid image file' }));
      return;
    }

    if (field === 'logo' && file.size > 2 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, logo: 'Logo image must be less than 2MB' }));
      return;
    }

    if (field === 'favicon' && file.size > 500 * 1024) {
      setErrors(prev => ({ ...prev, favicon: 'Favicon must be less than 500KB' }));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setWebsiteInfo(prev => ({ ...prev, [field]: e.target?.result as string }));
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    };
    reader.readAsDataURL(file);
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handleCreateWebsite = async () => {
    if (!validateStep(4)) return;

    setIsCreating(true);

    try {
      // Simulate website creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      const newProject = createProject(websiteInfo.name);
      onClose();
      navigate(`/editor/${newProject.id}`);
    } catch (error) {
      console.error('Error creating website:', error);
      setErrors(prev => ({ ...prev, form: 'Failed to create website. Please try again.' }));
    } finally {
      setIsCreating(false);
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
                disabled={isCreating}
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
                    className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
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
                      placeholder="subdomain"
                      className={`flex-1 px-4 py-3 border ${errors.url ? 'border-red-500' : 'border-gray-300'} rounded-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    />
                    <span className="bg-gray-100 px-4 py-3 rounded-r-xl border border-l-0 border-gray-300 text-gray-600">
                      .iqbolshoh.com
                    </span>
                  </div>

                  {checkingUrl && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm text-gray-600">Checking availability...</span>
                    </div>
                  )}

                  {!checkingUrl && websiteInfo.url && (
                    <div className="mt-2 flex items-center gap-2">
                      {urlAvailable === true ? (
                        <>
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-600">subdomain.iqbolshoh.com is available!</span>
                        </>
                      ) : urlAvailable === false ? (
                        <>
                          <AlertCircle className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-red-600">This subdomain is not available</span>
                        </>
                      ) : null}
                    </div>
                  )}

                  {errors.url && (
                    <p className="mt-1 text-sm text-red-600">{errors.url}</p>
                  )}

                  <p className="text-xs text-gray-500 mt-2">
                    Subdomain must be 3-63 characters, lowercase letters, numbers, and hyphens only.
                    Cannot start or end with hyphen.
                  </p>
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
                        className={`p-3 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${websiteInfo.category === category.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                          }`}
                        type="button"
                      >
                        <category.icon className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium">{category.name}</span>
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
                  <h3 className="text-xl font-bold text-gray-900 mb-2">SEO Settings</h3>
                  <p className="text-gray-600">Add SEO keywords for your website</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    SEO Keywords *
                  </label>
                  <input
                    type="text"
                    value={websiteInfo.seoKeywords}
                    onChange={(e) => handleInputChange('seoKeywords', e.target.value)}
                    placeholder="website, business, services, products"
                    className={`w-full px-4 py-3 border ${errors.seoKeywords ? 'border-red-500' : 'border-gray-300'
                      } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  />
                  {errors.seoKeywords && (
                    <p className="mt-1 text-sm text-red-600">{errors.seoKeywords}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    Enter comma-separated keywords for search engine optimization
                  </p>
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
                        className={`p-3 rounded-xl border-2 transition-all text-left ${websiteInfo.language === language.code
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                          }`}
                        type="button"
                      >
                        <span className="text-sm font-medium">{language.name}</span>
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
                    <div className={`border-2 ${errors.logo ? 'border-red-500' : 'border-dashed border-gray-300'
                      } rounded-xl p-6 text-center hover:border-gray-400 transition-colors`}>
                      {websiteInfo.logo ? (
                        <div className="space-y-3">
                          <img
                            src={websiteInfo.logo}
                            alt="Logo"
                            className="w-20 h-20 object-contain mx-auto"
                          />
                          <button
                            onClick={() => setWebsiteInfo(prev => ({ ...prev, logo: '' }))}
                            className="text-sm text-red-600 hover:text-red-700"
                            type="button"
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
                            {errors.logo && (
                              <p className="mt-2 text-sm text-red-600">{errors.logo}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Recommended size: 200x50px, PNG format
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Favicon
                    </label>
                    <div className={`border-2 ${errors.favicon ? 'border-red-500' : 'border-dashed border-gray-300'
                      } rounded-xl p-6 text-center hover:border-gray-400 transition-colors`}>
                      {websiteInfo.favicon ? (
                        <div className="space-y-3">
                          <img
                            src={websiteInfo.favicon}
                            alt="Favicon"
                            className="w-8 h-8 object-contain mx-auto"
                          />
                          <button
                            onClick={() => setWebsiteInfo(prev => ({ ...prev, favicon: '' }))}
                            className="text-sm text-red-600 hover:text-red-700"
                            type="button"
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
                            {errors.favicon && (
                              <p className="mt-2 text-sm text-red-600">{errors.favicon}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Square image, 16x16 or 32x32px
                    </p>
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
                      <p className="font-semibold">{websiteInfo.name || 'Not specified'}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">URL</span>
                      <p className="font-semibold">
                        {websiteInfo.url ? `${websiteInfo.url}.iqbolshoh.com` : 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Category</span>
                      <p className="font-semibold">
                        {categories.find(c => c.id === websiteInfo.category)?.name || 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Language</span>
                      <p className="font-semibold">
                        {languages.find(l => l.code === websiteInfo.language)?.name || 'Not specified'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-gray-500">SEO Keywords</span>
                    <p className="font-semibold">
                      {websiteInfo.seoKeywords || 'Not specified'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Logo</span>
                      <div className="mt-1">
                        {websiteInfo.logo ? (
                          <img
                            src={websiteInfo.logo}
                            alt="Logo"
                            className="w-12 h-12 object-contain"
                          />
                        ) : (
                          <span className="text-gray-400">Not uploaded</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Favicon</span>
                      <div className="mt-1">
                        {websiteInfo.favicon ? (
                          <img
                            src={websiteInfo.favicon}
                            alt="Favicon"
                            className="w-6 h-6 object-contain"
                          />
                        ) : (
                          <span className="text-gray-400">Not uploaded</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {errors.form && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                      <p className="text-red-700">{errors.form}</p>
                    </div>
                  </div>
                )}

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
                type="button"
              >
                {step > 1 ? 'Back' : 'Cancel'}
              </button>

              <div className="flex items-center gap-3">
                {step < 4 ? (
                  <button
                    onClick={handleNextStep}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    type="button"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={handleCreateWebsite}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all font-semibold"
                    type="button"
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