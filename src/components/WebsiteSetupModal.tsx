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
  Sparkles
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
          className="w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl platform-shadow-2xl"
          style={{ backgroundColor: 'var(--bg-primary)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="platform-gradient-primary p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                    <Rocket className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold platform-font-primary">Create Your Website</h2>
                </div>
                <p className="text-white text-opacity-90 platform-font-secondary">
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
          <div className="p-6 overflow-auto max-h-[calc(90vh-200px)] platform-bg-secondary">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-bold mb-2 platform-text-primary platform-font-primary">
                    Basic Information
                  </h3>
                  <p className="platform-text-secondary platform-font-secondary">
                    Let's start with the basics of your website
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 platform-text-primary platform-font-primary">
                    Website Name *
                  </label>
                  <input
                    type="text"
                    value={websiteInfo.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="My Awesome Website"
                    className={`input ${errors.name ? 'border-red-500' : ''}`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 platform-text-primary platform-font-primary">
                    Website URL *
                  </label>
                  <div className="flex items-center">
                    <span className="px-4 py-3 rounded-l-xl border border-r-0 platform-border platform-bg-tertiary platform-text-secondary">
                      https://
                    </span>
                    <input
                      type="text"
                      value={websiteInfo.url}
                      onChange={(e) => handleUrlChange(e.target.value)}
                      placeholder="subdomain"
                      className={`flex-1 px-4 py-3 border rounded-none ${errors.url ? 'border-red-500' : 'platform-border'}`}
                    />
                    <span className="px-4 py-3 rounded-r-xl border border-l-0 platform-border platform-bg-tertiary platform-text-secondary">
                      .templates.uz
                    </span>
                  </div>

                  {checkingUrl && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm platform-text-secondary">
                        Checking availability...
                      </span>
                    </div>
                  )}

                  {!checkingUrl && websiteInfo.url && (
                    <div className="mt-2 flex items-center gap-2">
                      {urlAvailable === true ? (
                        <>
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-500">
                            {websiteInfo.url}.templates.uz is available!
                          </span>
                        </>
                      ) : urlAvailable === false ? (
                        <>
                          <AlertCircle className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-red-500">
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

                  <p className="text-xs mt-2 platform-text-secondary">
                    Subdomain must be 3-63 characters, lowercase letters, numbers, and hyphens only.
                    Cannot start or end with hyphen.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 platform-text-primary platform-font-primary">
                    Category
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleInputChange('category', category.id)}
                        className={`p-3 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${
                          websiteInfo.category === category.id 
                            ? 'border-indigo-500 bg-indigo-50' 
                            : 'platform-border platform-bg-primary'
                        }`}
                        type="button"
                      >
                        <category.icon 
                          className={`w-5 h-5 ${
                            websiteInfo.category === category.id 
                              ? 'text-indigo-500' 
                              : 'platform-text-secondary'
                          }`}
                        />
                        <span className={`text-sm font-medium ${
                          websiteInfo.category === category.id 
                            ? 'text-indigo-700' 
                            : 'platform-text-primary'
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
                  <h3 className="text-xl font-bold mb-2 platform-text-primary platform-font-primary">
                    SEO Settings
                  </h3>
                  <p className="platform-text-secondary platform-font-secondary">
                    Add SEO keywords for your website
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 platform-text-primary platform-font-primary">
                    SEO Keywords *
                  </label>
                  <input
                    type="text"
                    value={websiteInfo.seoKeywords}
                    onChange={(e) => handleInputChange('seoKeywords', e.target.value)}
                    placeholder="website, business, services, products"
                    className={`input ${errors.seoKeywords ? 'border-red-500' : ''}`}
                  />
                  {errors.seoKeywords && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.seoKeywords}
                    </p>
                  )}
                  <p className="text-sm mt-1 platform-text-secondary">
                    Enter comma-separated keywords for search engine optimization
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 platform-text-primary platform-font-primary">
                    Language
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {languages.slice(0, 6).map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleInputChange('language', language.code)}
                        className={`p-3 rounded-xl border-2 transition-all text-left ${
                          websiteInfo.language === language.code 
                            ? 'border-indigo-500 bg-indigo-50' 
                            : 'platform-border platform-bg-primary'
                        }`}
                        type="button"
                      >
                        <span className={`text-sm font-medium ${
                          websiteInfo.language === language.code 
                            ? 'text-indigo-700' 
                            : 'platform-text-primary'
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
                  <h3 className="text-xl font-bold mb-2 platform-text-primary platform-font-primary">
                    Visual Identity
                  </h3>
                  <p className="platform-text-secondary platform-font-secondary">
                    Upload your logo and favicon (optional)
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 platform-text-primary platform-font-primary">
                      Logo
                    </label>
                    <div 
                      className={`border-2 rounded-xl p-6 text-center transition-colors ${
                        errors.logo ? 'border-red-500' : 'border-dashed platform-border hover:border-indigo-300 hover:bg-indigo-50/30'
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
                          <ImageIcon 
                            className="w-12 h-12 mx-auto platform-text-tertiary" 
                          />
                          <div>
                            <p className="mb-2 platform-text-secondary">
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
                              className="px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer inline-block hover:bg-indigo-700 transition-colors"
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
                    <p className="text-xs mt-1 platform-text-secondary">
                      Recommended size: 200x50px, PNG format
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 platform-text-primary platform-font-primary">
                      Favicon
                    </label>
                    <div 
                      className={`border-2 rounded-xl p-6 text-center transition-colors ${
                        errors.favicon ? 'border-red-500' : 'border-dashed platform-border hover:border-indigo-300 hover:bg-indigo-50/30'
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
                          <Globe 
                            className="w-8 h-8 mx-auto platform-text-tertiary" 
                          />
                          <div>
                            <p className="mb-2 text-sm platform-text-secondary">
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
                    <p className="text-xs mt-1 platform-text-secondary">
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
                  <h3 className="text-xl font-bold mb-2 platform-text-primary platform-font-primary">
                    Review & Create
                  </h3>
                  <p className="platform-text-secondary platform-font-secondary">
                    Review your website information before creating
                  </p>
                </div>

                <div className="rounded-xl p-6 space-y-4 bg-indigo-50 border border-indigo-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-indigo-500">
                        Website Name
                      </span>
                      <p className="font-semibold platform-text-primary">
                        {websiteInfo.name || 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-indigo-500">
                        URL
                      </span>
                      <p className="font-semibold platform-text-primary">
                        {websiteInfo.url ? `${websiteInfo.url}.templates.uz` : 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-indigo-500">
                        Category
                      </span>
                      <p className="font-semibold platform-text-primary">
                        {categories.find(c => c.id === websiteInfo.category)?.name || 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-indigo-500">
                        Language
                      </span>
                      <p className="font-semibold platform-text-primary">
                        {languages.find(l => l.code === websiteInfo.language)?.name || 'Not specified'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-indigo-500">
                      SEO Keywords
                    </span>
                    <p className="font-semibold platform-text-primary">
                      {websiteInfo.seoKeywords || 'Not specified'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-indigo-500">
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
                          <span className="platform-text-secondary">Not uploaded</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-indigo-500">
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
                          <span className="platform-text-secondary">Not uploaded</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {errors.form && (
                  <div className="border-l-4 border-red-500 p-4 bg-red-50">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
                      <p className="text-red-500">{errors.form}</p>
                    </div>
                  </div>
                )}

                {isCreating && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <h4 className="text-lg font-semibold mb-2 platform-text-primary platform-font-primary">
                      Creating Your Website...
                    </h4>
                    <p className="platform-text-secondary platform-font-secondary">
                      Setting up your project and applying initial configuration
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Footer */}
          {!isCreating && (
            <div className="border-t p-6 platform-border platform-bg-primary">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => step > 1 ? setStep(step - 1) : onClose()}
                  className="px-6 py-3 transition-colors font-medium platform-text-secondary hover:platform-text-primary"
                  type="button"
                >
                  {step > 1 ? 'Back' : 'Cancel'}
                </button>

                <div className="flex items-center gap-3">
                  {step < 4 ? (
                    <button
                      onClick={handleNextStep}
                      className="btn-primary"
                      type="button"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleCreateWebsite}
                      className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all font-semibold platform-shadow-lg"
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