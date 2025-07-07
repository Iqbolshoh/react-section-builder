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
import { useTheme } from '../contexts/ThemeContext';

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
  const { currentTheme } = useTheme();
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
          backdropFilter: 'blur(5px)'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl"
          style={{ 
            backgroundColor: currentTheme.colors.surface,
            boxShadow: currentTheme.shadows.xl
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div 
            className="text-white p-6"
            style={{ 
              background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
              fontFamily: currentTheme.fonts.primary
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 
                  className="text-2xl font-bold"
                  style={{ fontFamily: currentTheme.fonts.primary }}
                >
                  Create Your Website
                </h2>
                <p 
                  className="mt-1 text-white text-opacity-90"
                  style={{ fontFamily: currentTheme.fonts.secondary }}
                >
                  Step {step} of 4
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
            <div 
              className="mt-6 rounded-full h-2"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(step / 4) * 100}%` }}
                className="bg-white rounded-full h-2"
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Content */}
          <div 
            className="p-6 overflow-auto max-h-[calc(90vh-200px)]"
            style={{ 
              backgroundColor: currentTheme.colors.background,
              color: currentTheme.colors.text
            }}
          >
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 
                    className="text-xl font-bold mb-2"
                    style={{ 
                      color: currentTheme.colors.text,
                      fontFamily: currentTheme.fonts.primary
                    }}
                  >
                    Basic Information
                  </h3>
                  <p 
                    style={{ 
                      color: currentTheme.colors.textSecondary,
                      fontFamily: currentTheme.fonts.secondary
                    }}
                  >
                    Let's start with the basics of your website
                  </p>
                </div>

                <div>
                  <label 
                    className="block text-sm font-semibold mb-2"
                    style={{ 
                      color: currentTheme.colors.text,
                      fontFamily: currentTheme.fonts.primary
                    }}
                  >
                    Website Name *
                  </label>
                  <input
                    type="text"
                    value={websiteInfo.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="My Awesome Website"
                    className={`w-full px-4 py-3 border rounded-xl transition-all`}
                    style={{ 
                      borderColor: errors.name ? currentTheme.colors.error : currentTheme.colors.border,
                      backgroundColor: currentTheme.colors.surface,
                      color: currentTheme.colors.text,
                      fontFamily: currentTheme.fonts.secondary
                    }}
                  />
                  {errors.name && (
                    <p 
                      className="mt-1 text-sm"
                      style={{ color: currentTheme.colors.error }}
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label 
                    className="block text-sm font-semibold mb-2"
                    style={{ 
                      color: currentTheme.colors.text,
                      fontFamily: currentTheme.fonts.primary
                    }}
                  >
                    Website URL *
                  </label>
                  <div className="flex items-center">
                    <span 
                      className="px-4 py-3 rounded-l-xl border border-r-0"
                      style={{ 
                        backgroundColor: `${currentTheme.colors.primary}15`,
                        borderColor: currentTheme.colors.border,
                        color: currentTheme.colors.textSecondary
                      }}
                    >
                      https://
                    </span>
                    <input
                      type="text"
                      value={websiteInfo.url}
                      onChange={(e) => handleUrlChange(e.target.value)}
                      placeholder="subdomain"
                      className={`flex-1 px-4 py-3 border rounded-none`}
                      style={{ 
                        borderColor: errors.url ? currentTheme.colors.error : currentTheme.colors.border,
                        backgroundColor: currentTheme.colors.surface,
                        color: currentTheme.colors.text,
                        fontFamily: currentTheme.fonts.secondary
                      }}
                    />
                    <span 
                      className="px-4 py-3 rounded-r-xl border border-l-0"
                      style={{ 
                        backgroundColor: `${currentTheme.colors.primary}15`,
                        borderColor: currentTheme.colors.border,
                        color: currentTheme.colors.textSecondary
                      }}
                    >
                      .iqbolshoh.com
                    </span>
                  </div>

                  {checkingUrl && (
                    <div className="mt-2 flex items-center gap-2">
                      <div 
                        className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
                        style={{ borderColor: currentTheme.colors.primary }}
                      ></div>
                      <span 
                        className="text-sm"
                        style={{ color: currentTheme.colors.textSecondary }}
                      >
                        Checking availability...
                      </span>
                    </div>
                  )}

                  {!checkingUrl && websiteInfo.url && (
                    <div className="mt-2 flex items-center gap-2">
                      {urlAvailable === true ? (
                        <>
                          <Check 
                            className="w-4 h-4" 
                            style={{ color: currentTheme.colors.success }}
                          />
                          <span 
                            className="text-sm"
                            style={{ color: currentTheme.colors.success }}
                          >
                            subdomain.iqbolshoh.com is available!
                          </span>
                        </>
                      ) : urlAvailable === false ? (
                        <>
                          <AlertCircle 
                            className="w-4 h-4" 
                            style={{ color: currentTheme.colors.error }}
                          />
                          <span 
                            className="text-sm"
                            style={{ color: currentTheme.colors.error }}
                          >
                            This subdomain is not available
                          </span>
                        </>
                      ) : null}
                    </div>
                  )}

                  {errors.url && (
                    <p 
                      className="mt-1 text-sm"
                      style={{ color: currentTheme.colors.error }}
                    >
                      {errors.url}
                    </p>
                  )}

                  <p 
                    className="text-xs mt-2"
                    style={{ color: currentTheme.colors.textSecondary }}
                  >
                    Subdomain must be 3-63 characters, lowercase letters, numbers, and hyphens only.
                    Cannot start or end with hyphen.
                  </p>
                </div>

                <div>
                  <label 
                    className="block text-sm font-semibold mb-2"
                    style={{ 
                      color: currentTheme.colors.text,
                      fontFamily: currentTheme.fonts.primary
                    }}
                  >
                    Category
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleInputChange('category', category.id)}
                        className={`p-3 rounded-xl border-2 transition-all text-left flex items-center gap-3`}
                        style={{ 
                          backgroundColor: websiteInfo.category === category.id 
                            ? `${currentTheme.colors.primary}15` 
                            : currentTheme.colors.surface,
                          borderColor: websiteInfo.category === category.id 
                            ? currentTheme.colors.primary 
                            : currentTheme.colors.border,
                          color: currentTheme.colors.text,
                          fontFamily: currentTheme.fonts.secondary
                        }}
                        type="button"
                      >
                        <category.icon 
                          className="w-5 h-5" 
                          style={{ color: currentTheme.colors.textSecondary }}
                        />
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
                  <h3 
                    className="text-xl font-bold mb-2"
                    style={{ 
                      color: currentTheme.colors.text,
                      fontFamily: currentTheme.fonts.primary
                    }}
                  >
                    SEO Settings
                  </h3>
                  <p 
                    style={{ 
                      color: currentTheme.colors.textSecondary,
                      fontFamily: currentTheme.fonts.secondary
                    }}
                  >
                    Add SEO keywords for your website
                  </p>
                </div>

                <div>
                  <label 
                    className="block text-sm font-semibold mb-2"
                    style={{ 
                      color: currentTheme.colors.text,
                      fontFamily: currentTheme.fonts.primary
                    }}
                  >
                    SEO Keywords *
                  </label>
                  <input
                    type="text"
                    value={websiteInfo.seoKeywords}
                    onChange={(e) => handleInputChange('seoKeywords', e.target.value)}
                    placeholder="website, business, services, products"
                    className={`w-full px-4 py-3 border rounded-xl transition-all`}
                    style={{ 
                      borderColor: errors.seoKeywords ? currentTheme.colors.error : currentTheme.colors.border,
                      backgroundColor: currentTheme.colors.surface,
                      color: currentTheme.colors.text,
                      fontFamily: currentTheme.fonts.secondary
                    }}
                  />
                  {errors.seoKeywords && (
                    <p 
                      className="mt-1 text-sm"
                      style={{ color: currentTheme.colors.error }}
                    >
                      {errors.seoKeywords}
                    </p>
                  )}
                  <p 
                    className="text-sm mt-1"
                    style={{ color: currentTheme.colors.textSecondary }}
                  >
                    Enter comma-separated keywords for search engine optimization
                  </p>
                </div>

                <div>
                  <label 
                    className="block text-sm font-semibold mb-2"
                    style={{ 
                      color: currentTheme.colors.text,
                      fontFamily: currentTheme.fonts.primary
                    }}
                  >
                    Language
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {languages.slice(0, 6).map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleInputChange('language', language.code)}
                        className={`p-3 rounded-xl border-2 transition-all text-left`}
                        style={{ 
                          backgroundColor: websiteInfo.language === language.code 
                            ? `${currentTheme.colors.primary}15` 
                            : currentTheme.colors.surface,
                          borderColor: websiteInfo.language === language.code 
                            ? currentTheme.colors.primary 
                            : currentTheme.colors.border,
                          color: currentTheme.colors.text,
                          fontFamily: currentTheme.fonts.secondary
                        }}
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
                  <h3 
                    className="text-xl font-bold mb-2"
                    style={{ 
                      color: currentTheme.colors.text,
                      fontFamily: currentTheme.fonts.primary
                    }}
                  >
                    Visual Identity
                  </h3>
                  <p 
                    style={{ 
                      color: currentTheme.colors.textSecondary,
                      fontFamily: currentTheme.fonts.secondary
                    }}
                  >
                    Upload your logo and favicon (optional)
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label 
                      className="block text-sm font-semibold mb-2"
                      style={{ 
                        color: currentTheme.colors.text,
                        fontFamily: currentTheme.fonts.primary
                      }}
                    >
                      Logo
                    </label>
                    <div 
                      className={`border-2 rounded-xl p-6 text-center transition-colors`}
                      style={{ 
                        borderColor: errors.logo 
                          ? currentTheme.colors.error 
                          : currentTheme.colors.border,
                        borderStyle: 'dashed',
                        backgroundColor: currentTheme.colors.surface
                      }}
                      onMouseEnter={(e) => {
                        if (!errors.logo) {
                          e.currentTarget.style.borderColor = currentTheme.colors.primary;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!errors.logo) {
                          e.currentTarget.style.borderColor = currentTheme.colors.border;
                        }
                      }}
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
                            className="text-sm hover:text-red-700"
                            style={{ color: currentTheme.colors.error }}
                            type="button"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <ImageIcon 
                            className="w-12 h-12 mx-auto" 
                            style={{ color: currentTheme.colors.textSecondary }}
                          />
                          <div>
                            <p 
                              className="mb-2"
                              style={{ color: currentTheme.colors.textSecondary }}
                            >
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
                              className="px-4 py-2 rounded-lg cursor-pointer inline-block"
                              style={{ 
                                backgroundColor: currentTheme.colors.primary,
                                color: '#ffffff',
                                fontFamily: currentTheme.fonts.secondary
                              }}
                            >
                              Choose File
                            </label>
                            {errors.logo && (
                              <p 
                                className="mt-2 text-sm"
                                style={{ color: currentTheme.colors.error }}
                              >
                                {errors.logo}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <p 
                      className="text-xs mt-1"
                      style={{ color: currentTheme.colors.textSecondary }}
                    >
                      Recommended size: 200x50px, PNG format
                    </p>
                  </div>

                  <div>
                    <label 
                      className="block text-sm font-semibold mb-2"
                      style={{ 
                        color: currentTheme.colors.text,
                        fontFamily: currentTheme.fonts.primary
                      }}
                    >
                      Favicon
                    </label>
                    <div 
                      className={`border-2 rounded-xl p-6 text-center transition-colors`}
                      style={{ 
                        borderColor: errors.favicon 
                          ? currentTheme.colors.error 
                          : currentTheme.colors.border,
                        borderStyle: 'dashed',
                        backgroundColor: currentTheme.colors.surface
                      }}
                      onMouseEnter={(e) => {
                        if (!errors.favicon) {
                          e.currentTarget.style.borderColor = currentTheme.colors.primary;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!errors.favicon) {
                          e.currentTarget.style.borderColor = currentTheme.colors.border;
                        }
                      }}
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
                            className="text-sm hover:text-red-700"
                            style={{ color: currentTheme.colors.error }}
                            type="button"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Globe 
                            className="w-8 h-8 mx-auto" 
                            style={{ color: currentTheme.colors.textSecondary }}
                          />
                          <div>
                            <p 
                              className="mb-2 text-sm"
                              style={{ color: currentTheme.colors.textSecondary }}
                            >
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
                              className="px-3 py-1 rounded text-sm cursor-pointer inline-block"
                              style={{ 
                                backgroundColor: currentTheme.colors.text,
                                color: '#ffffff',
                                fontFamily: currentTheme.fonts.secondary
                              }}
                            >
                              Choose File
                            </label>
                            {errors.favicon && (
                              <p 
                                className="mt-2 text-sm"
                                style={{ color: currentTheme.colors.error }}
                              >
                                {errors.favicon}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <p 
                      className="text-xs mt-1"
                      style={{ color: currentTheme.colors.textSecondary }}
                    >
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
                  <h3 
                    className="text-xl font-bold mb-2"
                    style={{ 
                      color: currentTheme.colors.text,
                      fontFamily: currentTheme.fonts.primary
                    }}
                  >
                    Review & Create
                  </h3>
                  <p 
                    style={{ 
                      color: currentTheme.colors.textSecondary,
                      fontFamily: currentTheme.fonts.secondary
                    }}
                  >
                    Review your website information before creating
                  </p>
                </div>

                <div 
                  className="rounded-xl p-6 space-y-4"
                  style={{ 
                    backgroundColor: `${currentTheme.colors.primary}10`,
                    fontFamily: currentTheme.fonts.secondary
                  }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span 
                        className="text-sm font-medium"
                        style={{ color: currentTheme.colors.textSecondary }}
                      >
                        Website Name
                      </span>
                      <p 
                        className="font-semibold"
                        style={{ color: currentTheme.colors.text }}
                      >
                        {websiteInfo.name || 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <span 
                        className="text-sm font-medium"
                        style={{ color: currentTheme.colors.textSecondary }}
                      >
                        URL
                      </span>
                      <p 
                        className="font-semibold"
                        style={{ color: currentTheme.colors.text }}
                      >
                        {websiteInfo.url ? `${websiteInfo.url}.iqbolshoh.com` : 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <span 
                        className="text-sm font-medium"
                        style={{ color: currentTheme.colors.textSecondary }}
                      >
                        Category
                      </span>
                      <p 
                        className="font-semibold"
                        style={{ color: currentTheme.colors.text }}
                      >
                        {categories.find(c => c.id === websiteInfo.category)?.name || 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <span 
                        className="text-sm font-medium"
                        style={{ color: currentTheme.colors.textSecondary }}
                      >
                        Language
                      </span>
                      <p 
                        className="font-semibold"
                        style={{ color: currentTheme.colors.text }}
                      >
                        {languages.find(l => l.code === websiteInfo.language)?.name || 'Not specified'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <span 
                      className="text-sm font-medium"
                      style={{ color: currentTheme.colors.textSecondary }}
                    >
                      SEO Keywords
                    </span>
                    <p 
                      className="font-semibold"
                      style={{ color: currentTheme.colors.text }}
                    >
                      {websiteInfo.seoKeywords || 'Not specified'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span 
                        className="text-sm font-medium"
                        style={{ color: currentTheme.colors.textSecondary }}
                      >
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
                          <span style={{ color: currentTheme.colors.textSecondary }}>Not uploaded</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <span 
                        className="text-sm font-medium"
                        style={{ color: currentTheme.colors.textSecondary }}
                      >
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
                          <span style={{ color: currentTheme.colors.textSecondary }}>Not uploaded</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {errors.form && (
                  <div 
                    className="border-l-4 p-4"
                    style={{ 
                      backgroundColor: `${currentTheme.colors.error}15`,
                      borderColor: currentTheme.colors.error
                    }}
                  >
                    <div className="flex items-center">
                      <AlertCircle 
                        className="w-5 h-5 mr-2" 
                        style={{ color: currentTheme.colors.error }}
                      />
                      <p style={{ color: currentTheme.colors.error }}>{errors.form}</p>
                    </div>
                  </div>
                )}

                {isCreating && (
                  <div className="text-center py-8">
                    <div 
                      className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
                      style={{ borderColor: currentTheme.colors.primary }}
                    ></div>
                    <h4 
                      className="text-lg font-semibold mb-2"
                      style={{ 
                        color: currentTheme.colors.text,
                        fontFamily: currentTheme.fonts.primary
                      }}
                    >
                      Creating Your Website...
                    </h4>
                    <p 
                      style={{ 
                        color: currentTheme.colors.textSecondary,
                        fontFamily: currentTheme.fonts.secondary
                      }}
                    >
                      Setting up your project and applying initial configuration
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Footer */}
          {!isCreating && (
            <div 
              className="border-t p-6 flex items-center justify-between"
              style={{ 
                borderColor: currentTheme.colors.border,
                backgroundColor: currentTheme.colors.background
              }}
            >
              <button
                onClick={() => step > 1 ? setStep(step - 1) : onClose()}
                className="px-6 py-3 transition-colors font-medium"
                style={{ 
                  color: currentTheme.colors.textSecondary,
                  fontFamily: currentTheme.fonts.secondary
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = currentTheme.colors.text;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = currentTheme.colors.textSecondary;
                }}
                type="button"
              >
                {step > 1 ? 'Back' : 'Cancel'}
              </button>

              <div className="flex items-center gap-3">
                {step < 4 ? (
                  <button
                    onClick={handleNextStep}
                    className="px-8 py-3 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    style={{ 
                      background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
                      boxShadow: currentTheme.shadows.md,
                      fontFamily: currentTheme.fonts.accent
                    }}
                    type="button"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={handleCreateWebsite}
                    className="px-8 py-3 text-white rounded-xl transition-all font-semibold"
                    style={{ 
                      background: `linear-gradient(135deg, ${currentTheme.colors.success}, ${currentTheme.colors.primary})`,
                      boxShadow: currentTheme.shadows.md,
                      fontFamily: currentTheme.fonts.accent
                    }}
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