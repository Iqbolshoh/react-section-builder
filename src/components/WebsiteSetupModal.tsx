import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Globe,
  Image as ImageIcon,
  Check,
  AlertCircle,
  Briefcase,
  Palette,
  ShoppingCart,
  BookOpen,
  Utensils,
  HeartPulse,
  GraduationCap,
  HandHeart,
  Cpu,
  User,
  ArrowRight,
  Rocket,
  ChevronLeft,
  Loader2
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
    { id: 'business', name: 'Business & Corporate', icon: Briefcase, color: 'bg-blue-100 text-blue-600' },
    { id: 'portfolio', name: 'Portfolio & Creative', icon: Palette, color: 'bg-purple-100 text-purple-600' },
    { id: 'ecommerce', name: 'E-commerce & Shop', icon: ShoppingCart, color: 'bg-emerald-100 text-emerald-600' },
    { id: 'blog', name: 'Blog & News', icon: BookOpen, color: 'bg-rose-100 text-rose-600' },
    { id: 'restaurant', name: 'Restaurant & Food', icon: Utensils, color: 'bg-orange-100 text-orange-600' },
    { id: 'health', name: 'Health & Medical', icon: HeartPulse, color: 'bg-red-100 text-red-600' },
    { id: 'education', name: 'Education & Learning', icon: GraduationCap, color: 'bg-indigo-100 text-indigo-600' },
    { id: 'nonprofit', name: 'Non-profit & Charity', icon: HandHeart, color: 'bg-teal-100 text-teal-600' },
    { id: 'technology', name: 'Technology & SaaS', icon: Cpu, color: 'bg-cyan-100 text-cyan-600' },
    { id: 'personal', name: 'Personal & Lifestyle', icon: User, color: 'bg-amber-100 text-amber-600' }
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'uz', name: 'O\'zbekcha', flag: '🇺🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' }
  ];

  const reservedSubdomains = [
    'www', 'admin', 'api', 'test', 'demo', 'example',
    'mail', 'ftp', 'webmail', 'blog', 'shop', 'app'
  ];

  useEffect(() => {
    if (!isOpen) {
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

    try {
      await new Promise(resolve => setTimeout(resolve, 800));

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
          className="w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl"
          style={{ backgroundColor: '#f8fafc' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                    <Rocket className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold font-[Poppins]">Create Your Website</h2>
                </div>
                <p className="text-white/90 text-sm">
                  Step {step} of 4 • {
                    step === 1 ? 'Basic Information' :
                      step === 2 ? 'SEO Settings' :
                        step === 3 ? 'Visual Identity' :
                          'Review & Create'
                  }
                </p>
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
            <div className="mt-6 rounded-full h-2 bg-white/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(step / 4) * 100}%` }}
                className="bg-white rounded-full h-2"
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-auto max-h-[calc(90vh-200px)] bg-white">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800 font-[Poppins]">
                    Basic Information
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Let's start with the basics of your website
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Website Name *
                  </label>
                  <input
                    type="text"
                    value={websiteInfo.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="My Awesome Website"
                    className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-teal-200'} focus:ring-2 focus:outline-none transition-all`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Website URL *
                  </label>
                  <div className="flex items-center">
                    <span className="px-4 py-3 rounded-l-lg border border-r-0 bg-gray-50 text-gray-500">
                      https://
                    </span>
                    <input
                      type="text"
                      value={websiteInfo.url}
                      onChange={(e) => handleUrlChange(e.target.value)}
                      placeholder="subdomain"
                      className={`flex-1 px-4 py-3 border ${errors.url ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-teal-200'} focus:ring-2 focus:outline-none transition-all`}
                    />
                    <span className="px-4 py-3 rounded-r-lg border border-l-0 bg-gray-50 text-gray-500">
                      .templates.uz
                    </span>
                  </div>

                  {checkingUrl && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Checking availability...</span>
                    </div>
                  )}

                  {!checkingUrl && websiteInfo.url && (
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      {urlAvailable === true ? (
                        <>
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="text-green-500">
                            {websiteInfo.url}.templates.uz is available!
                          </span>
                        </>
                      ) : urlAvailable === false ? (
                        <>
                          <AlertCircle className="w-4 h-4 text-red-500" />
                          <span className="text-red-500">
                            This subdomain is not available
                          </span>
                        </>
                      ) : null}
                    </div>
                  )}

                  {errors.url && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.url}
                    </p>
                  )}

                  <p className="text-xs mt-2 text-gray-500">
                    Subdomain must be 3-63 characters, lowercase letters, numbers, and hyphens only.
                    Cannot start or end with hyphen.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Category
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleInputChange('category', category.id)}
                        className={`p-3 rounded-lg border-2 transition-all text-left flex items-center gap-3 ${websiteInfo.category === category.id
                            ? `border-teal-500 bg-teal-50 ${category.color.replace('text', 'text-teal-600')}`
                            : 'border-gray-200 bg-white hover:border-teal-200'
                          }`}
                        type="button"
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${category.color}`}>
                          <category.icon className="w-4 h-4" />
                        </div>
                        <span className={`text-sm font-medium ${websiteInfo.category === category.id
                            ? 'text-teal-700'
                            : 'text-gray-700'
                          }`}>
                          {category.name}
                        </span>
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
                  <h3 className="text-xl font-bold mb-2 text-gray-800 font-[Poppins]">
                    SEO Settings
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Add SEO keywords for your website
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    SEO Keywords *
                  </label>
                  <input
                    type="text"
                    value={websiteInfo.seoKeywords}
                    onChange={(e) => handleInputChange('seoKeywords', e.target.value)}
                    placeholder="website, business, services, products"
                    className={`w-full px-4 py-3 rounded-lg border ${errors.seoKeywords ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-teal-200'} focus:ring-2 focus:outline-none transition-all`}
                  />
                  {errors.seoKeywords && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.seoKeywords}
                    </p>
                  )}
                  <p className="text-sm mt-1 text-gray-500">
                    Enter comma-separated keywords for search engine optimization
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Language
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {languages.slice(0, 6).map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleInputChange('language', language.code)}
                        className={`p-3 rounded-lg border-2 transition-all text-left flex items-center gap-3 ${websiteInfo.language === language.code
                            ? 'border-teal-500 bg-teal-50'
                            : 'border-gray-200 hover:border-teal-200'
                          }`}
                        type="button"
                      >
                        <span className="text-lg">{language.flag}</span>
                        <span className={`text-sm font-medium ${websiteInfo.language === language.code
                            ? 'text-teal-700'
                            : 'text-gray-700'
                          }`}>
                          {language.name}
                        </span>
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
                  <h3 className="text-xl font-bold mb-2 text-gray-800 font-[Poppins]">
                    Visual Identity
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Upload your logo and favicon (optional)
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Logo
                    </label>
                    <div
                      className={`border-2 rounded-lg p-6 text-center transition-colors ${errors.logo ? 'border-red-500' : 'border-dashed border-gray-300 hover:border-teal-300 hover:bg-teal-50/30'
                        }`}
                    >
                      {websiteInfo.logo ? (
                        <div className="space-y-3">
                          <img
                            src={websiteInfo.logo}
                            alt="Logo"
                            className="w-20 h-20 object-contain mx-auto"
                          />
                          <button
                            onClick={() => setWebsiteInfo(prev => ({ ...prev, logo: '' }))}
                            className="text-sm text-red-500 hover:text-red-700"
                            type="button"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="w-12 h-12 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                            <ImageIcon className="w-5 h-5 text-gray-400" />
                          </div>
                          <div>
                            <p className="mb-2 text-gray-500">
                              Upload your logo
                            </p>
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
                              className="px-4 py-2 bg-teal-600 text-white rounded-lg cursor-pointer inline-block hover:bg-teal-700 transition-colors text-sm"
                            >
                              Choose File
                            </label>
                            {errors.logo && (
                              <p className="mt-2 text-sm text-red-500">
                                {errors.logo}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-xs mt-1 text-gray-500">
                      Recommended size: 200x50px, PNG format
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Favicon
                    </label>
                    <div
                      className={`border-2 rounded-lg p-6 text-center transition-colors ${errors.favicon ? 'border-red-500' : 'border-dashed border-gray-300 hover:border-teal-300 hover:bg-teal-50/30'
                        }`}
                    >
                      {websiteInfo.favicon ? (
                        <div className="space-y-3">
                          <img
                            src={websiteInfo.favicon}
                            alt="Favicon"
                            className="w-8 h-8 object-contain mx-auto"
                          />
                          <button
                            onClick={() => setWebsiteInfo(prev => ({ ...prev, favicon: '' }))}
                            className="text-sm text-red-500 hover:text-red-700"
                            type="button"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="w-8 h-8 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                            <Globe className="w-4 h-4 text-gray-400" />
                          </div>
                          <div>
                            <p className="mb-2 text-sm text-gray-500">
                              Upload favicon (16x16)
                            </p>
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
                              className="px-3 py-1 bg-gray-800 text-white rounded text-sm cursor-pointer inline-block hover:bg-gray-700 transition-colors"
                            >
                              Choose File
                            </label>
                            {errors.favicon && (
                              <p className="mt-2 text-sm text-red-500">
                                {errors.favicon}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-xs mt-1 text-gray-500">
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
                  <h3 className="text-xl font-bold mb-2 text-gray-800 font-[Poppins]">
                    Review & Create
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Review your website information before creating
                  </p>
                </div>

                <div className="rounded-lg p-6 space-y-4 bg-teal-50 border border-teal-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs font-medium text-teal-600 uppercase tracking-wider">
                        Website Name
                      </span>
                      <p className="font-semibold text-gray-800">
                        {websiteInfo.name || 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-teal-600 uppercase tracking-wider">
                        URL
                      </span>
                      <p className="font-semibold text-gray-800">
                        {websiteInfo.url ? `${websiteInfo.url}.templates.uz` : 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-teal-600 uppercase tracking-wider">
                        Category
                      </span>
                      <p className="font-semibold text-gray-800">
                        {categories.find(c => c.id === websiteInfo.category)?.name || 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-teal-600 uppercase tracking-wider">
                        Language
                      </span>
                      <p className="font-semibold text-gray-800">
                        {languages.find(l => l.code === websiteInfo.language)?.name || 'Not specified'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-medium text-teal-600 uppercase tracking-wider">
                      SEO Keywords
                    </span>
                    <p className="font-semibold text-gray-800">
                      {websiteInfo.seoKeywords || 'Not specified'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs font-medium text-teal-600 uppercase tracking-wider">
                        Logo
                      </span>
                      <div className="mt-1">
                        {websiteInfo.logo ? (
                          <img
                            src={websiteInfo.logo}
                            alt="Logo"
                            className="w-12 h-12 object-contain"
                          />
                        ) : (
                          <span className="text-gray-500 text-sm">Not uploaded</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-teal-600 uppercase tracking-wider">
                        Favicon
                      </span>
                      <div className="mt-1">
                        {websiteInfo.favicon ? (
                          <img
                            src={websiteInfo.favicon}
                            alt="Favicon"
                            className="w-6 h-6 object-contain"
                          />
                        ) : (
                          <span className="text-gray-500 text-sm">Not uploaded</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {errors.form && (
                  <div className="border-l-4 border-red-500 p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
                      <p className="text-red-500">{errors.form}</p>
                    </div>
                  </div>
                )}

                {isCreating && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-800 font-[Poppins]">
                      Creating Your Website...
                    </h4>
                    <p className="text-gray-500 text-sm">
                      Setting up your project and applying initial configuration
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Footer */}
          {!isCreating && (
            <div className="border-t p-6 border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => step > 1 ? setStep(step - 1) : onClose()}
                  className="px-6 py-3 transition-colors font-medium text-gray-600 hover:text-gray-800 flex items-center gap-2"
                  type="button"
                >
                  <ChevronLeft className="w-5 h-5" />
                  {step > 1 ? 'Back' : 'Cancel'}
                </button>

                <div className="flex items-center gap-3">
                  {step < 4 ? (
                    <button
                      onClick={handleNextStep}
                      className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium flex items-center gap-2"
                      type="button"
                    >
                      Continue
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      onClick={handleCreateWebsite}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all font-medium shadow-md"
                      type="button"
                    >
                      <Rocket className="w-5 h-5" />
                      Create Website
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WebsiteSetupModal;