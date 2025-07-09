import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown, Search, ShoppingCart, User, Globe, Phone, Mail } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import ImageUpload from '../ImageUpload';

interface ThemeConfig {
  fonts: {
    primary: string;
    secondary: string;
    accent: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    primary100: string;
    primary200: string;
    primary300: string;
    secondary100: string;
    secondary200: string;
    accent100: string;
    accent200: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

interface HeaderSectionProps {
  content: {
    logo: string;
    companyName: string;
    menuItems: { title: string; url: string }[];
    language?: string;
    socialLinks?: { platform: string; url: string }[];
    contactInfo?: { phone?: string; email?: string };
    searchEnabled?: boolean;
    cartEnabled?: boolean;
    userEnabled?: boolean;
    ctaButton?: { text: string; url: string };
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
  variant?: string;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  content,
  isEditing,
  onChange,
  theme,
  variant = 'header-classic'
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleChange = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const handleMenuItemChange = (index: number, field: string, value: string) => {
    const updatedMenuItems = [...content.menuItems];
    updatedMenuItems[index] = { ...updatedMenuItems[index], [field]: value };
    handleChange('menuItems', updatedMenuItems);
  };

  const addMenuItem = () => {
    const newMenuItem = { title: 'New Item', url: '#' };
    handleChange('menuItems', [...content.menuItems, newMenuItem]);
  };

  const removeMenuItem = (index: number) => {
    const updatedMenuItems = content.menuItems.filter((_, i) => i !== index);
    handleChange('menuItems', updatedMenuItems);
  };

  const getSocialIcon = (platform: string) => {
    const iconMap: Record<string, keyof typeof LucideIcons> = {
      facebook: 'Facebook',
      twitter: 'Twitter',
      instagram: 'Instagram',
      linkedin: 'Linkedin',
      youtube: 'Youtube',
      github: 'Github',
      dribbble: 'Dribbble',
      behance: 'Figma',
      pinterest: 'PinIcon',
      tiktok: 'Music'
    };

    const IconComponent = LucideIcons[iconMap[platform.toLowerCase()] || 'Globe'];
    return <IconComponent className="w-5 h-5" />;
  };

  // Classic Header
  const renderClassicHeader = () => (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: theme?.colors?.surface || '#ffffff',
        borderBottom: `1px solid ${theme?.colors?.border}`,
        fontFamily: theme?.fonts?.primary,
        boxShadow: theme?.shadows?.sm
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            {isEditing ? (
              <div className="flex items-center gap-3">
                <ImageUpload
                  value={content.logo}
                  onChange={(url) => handleChange('logo', url)}
                  placeholder="Add logo"
                  className="w-10 h-10 lg:w-12 lg:h-12"
                  theme={theme}
                />
                <input
                  type="text"
                  value={content.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className="text-lg lg:text-xl font-bold bg-transparent border-2 border-dashed rounded-lg p-2"
                  style={{
                    color: theme?.colors?.primary,
                    borderColor: `${theme?.colors?.primary}50`
                  }}
                  placeholder="Company Name"
                />
              </div>
            ) : (
              <>
                {content.logo && (
                  <img
                    src={content.logo}
                    alt={content.companyName}
                    className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
                  />
                )}
                <span
                  className="text-lg lg:text-xl font-bold"
                  style={{ color: theme?.colors?.primary }}
                >
                  {content.companyName}
                </span>
              </>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {isEditing ? (
              <div className="flex items-center gap-4">
                {content.menuItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleMenuItemChange(index, 'title', e.target.value)}
                      className="px-2 py-1 text-sm bg-transparent border rounded-lg"
                      style={{
                        borderColor: theme?.colors?.border,
                        color: theme?.colors?.text
                      }}
                      placeholder="Menu item"
                    />
                    <input
                      type="text"
                      value={item.url}
                      onChange={(e) => handleMenuItemChange(index, 'url', e.target.value)}
                      className="px-2 py-1 text-sm bg-transparent border rounded-lg w-16"
                      style={{
                        borderColor: theme?.colors?.border,
                        color: theme?.colors?.textSecondary
                      }}
                      placeholder="URL"
                    />
                    <button
                      onClick={() => removeMenuItem(index)}
                      className="p-1 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addMenuItem}
                  className="px-3 py-1 text-sm rounded-lg transition-colors"
                  style={{
                    backgroundColor: `${theme?.colors?.primary}15`,
                    color: theme?.colors?.primary
                  }}
                >
                  + Add
                </button>
              </div>
            ) : (
              <>
                {content.menuItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.url}
                    className="transition-colors font-medium"
                    style={{
                      color: theme?.colors?.text,
                      fontFamily: theme?.fonts?.secondary
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = theme?.colors?.primary || '#3b82f6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = theme?.colors?.text || '#1f2937';
                    }}
                  >
                    {item.title}
                  </a>
                ))}
              </>
            )}
          </nav>

          {/* Right Side Elements */}
          <div className="flex items-center gap-4">
            {/* Contact Info */}
            {content.contactInfo?.phone && (
              <a
                href={`tel:${content.contactInfo.phone}`}
                className="hidden lg:flex items-center gap-2"
                style={{ color: theme?.colors?.textSecondary }}
              >
                <Phone className="w-4 h-4" style={{ color: theme?.colors?.primary }} />
                <span className="text-sm">{content.contactInfo.phone}</span>
              </a>
            )}

            {/* Language Selector */}
            {content.language && (
              <div className="hidden sm:flex items-center gap-2">
                <Globe className="w-4 h-4" style={{ color: theme?.colors?.primary }} />
                <span
                  className="text-sm font-medium"
                  style={{ color: theme?.colors?.textSecondary }}
                >
                  {content.language}
                </span>
              </div>
            )}

            {/* CTA Button */}
            {content.ctaButton && (
              <a
                href={content.ctaButton.url}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-colors"
                style={{
                  background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                  fontFamily: theme?.fonts?.accent
                }}
              >
                {content.ctaButton.text}
              </a>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors"
              style={{
                color: theme?.colors?.text,
                backgroundColor: mobileMenuOpen ? `${theme?.colors?.primary}15` : 'transparent'
              }}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 py-4' : 'max-h-0'}`}
          style={{ borderTop: mobileMenuOpen ? `1px solid ${theme?.colors?.border}` : 'none' }}
        >
          <nav className="flex flex-col space-y-4">
            {content.menuItems.map((item, index) => (
              <a
                key={index}
                href={item.url}
                className="py-2 transition-colors font-medium"
                style={{
                  color: theme?.colors?.text,
                  fontFamily: theme?.fonts?.secondary
                }}
              >
                {item.title}
              </a>
            ))}
            {content.ctaButton && (
              <a
                href={content.ctaButton.url}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-medium transition-colors mt-4"
                style={{
                  background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                  fontFamily: theme?.fonts?.accent
                }}
              >
                {content.ctaButton.text}
              </a>
            )}
          </nav>
        </div>
      </div>
    </header>
  );

  // Centered Header
  const renderCenteredHeader = () => (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: theme?.colors?.surface || '#ffffff',
        borderBottom: `1px solid ${theme?.colors?.border}`,
        fontFamily: theme?.fonts?.primary,
        boxShadow: theme?.shadows?.sm
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar with Contact & Social */}
        <div
          className="hidden lg:flex items-center justify-between py-2 text-sm"
          style={{ borderBottom: `1px solid ${theme?.colors?.border}` }}
        >
          {/* Contact Info */}
          <div className="flex items-center gap-6">
            {content.contactInfo?.phone && (
              <a
                href={`tel:${content.contactInfo.phone}`}
                className="flex items-center gap-2"
                style={{ color: theme?.colors?.textSecondary }}
              >
                <Phone className="w-4 h-4" style={{ color: theme?.colors?.primary }} />
                <span>{content.contactInfo.phone}</span>
              </a>
            )}
            {content.contactInfo?.email && (
              <a
                href={`mailto:${content.contactInfo.email}`}
                className="flex items-center gap-2"
                style={{ color: theme?.colors?.textSecondary }}
              >
                <Mail className="w-4 h-4" style={{ color: theme?.colors?.primary }} />
                <span>{content.contactInfo.email}</span>
              </a>
            )}
          </div>

          {/* Social Links */}
          {content.socialLinks && (
            <div className="flex items-center gap-3">
              {content.socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="transition-colors"
                  style={{ color: theme?.colors?.textSecondary }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = theme?.colors?.primary || '#3b82f6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = theme?.colors?.textSecondary || '#6b7280';
                  }}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Main Header */}
        <div className="flex flex-col items-center py-4">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-4">
            {isEditing ? (
              <div className="flex items-center gap-3">
                <ImageUpload
                  value={content.logo}
                  onChange={(url) => handleChange('logo', url)}
                  placeholder="Add logo"
                  className="w-12 h-12 lg:w-16 lg:h-16"
                  theme={theme}
                />
                <input
                  type="text"
                  value={content.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className="text-xl lg:text-2xl font-bold bg-transparent border-2 border-dashed rounded-lg p-2"
                  style={{
                    color: theme?.colors?.primary,
                    borderColor: `${theme?.colors?.primary}50`
                  }}
                  placeholder="Company Name"
                />
              </div>
            ) : (
              <>
                {content.logo && (
                  <img
                    src={content.logo}
                    alt={content.companyName}
                    className="w-12 h-12 lg:w-16 lg:h-16 object-contain"
                  />
                )}
                <span
                  className="text-xl lg:text-2xl font-bold"
                  style={{ color: theme?.colors?.primary }}
                >
                  {content.companyName}
                </span>
              </>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {isEditing ? (
              <div className="flex items-center gap-4">
                {content.menuItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleMenuItemChange(index, 'title', e.target.value)}
                      className="px-2 py-1 text-sm bg-transparent border rounded-lg"
                      style={{
                        borderColor: theme?.colors?.border,
                        color: theme?.colors?.text
                      }}
                      placeholder="Menu item"
                    />
                    <input
                      type="text"
                      value={item.url}
                      onChange={(e) => handleMenuItemChange(index, 'url', e.target.value)}
                      className="px-2 py-1 text-sm bg-transparent border rounded-lg w-16"
                      style={{
                        borderColor: theme?.colors?.border,
                        color: theme?.colors?.textSecondary
                      }}
                      placeholder="URL"
                    />
                    <button
                      onClick={() => removeMenuItem(index)}
                      className="p-1 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addMenuItem}
                  className="px-3 py-1 text-sm rounded-lg transition-colors"
                  style={{
                    backgroundColor: `${theme?.colors?.primary}15`,
                    color: theme?.colors?.primary
                  }}
                >
                  + Add
                </button>
              </div>
            ) : (
              <>
                {content.menuItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.url}
                    className="transition-colors font-medium"
                    style={{
                      color: theme?.colors?.text,
                      fontFamily: theme?.fonts?.secondary
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = theme?.colors?.primary || '#3b82f6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = theme?.colors?.text || '#1f2937';
                    }}
                  >
                    {item.title}
                  </a>
                ))}
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden absolute right-4 top-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg transition-colors"
              style={{
                color: theme?.colors?.text,
                backgroundColor: mobileMenuOpen ? `${theme?.colors?.primary}15` : 'transparent'
              }}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 py-4' : 'max-h-0'}`}
          style={{ borderTop: mobileMenuOpen ? `1px solid ${theme?.colors?.border}` : 'none' }}
        >
          <nav className="flex flex-col space-y-4">
            {content.menuItems.map((item, index) => (
              <a
                key={index}
                href={item.url}
                className="py-2 transition-colors font-medium text-center"
                style={{
                  color: theme?.colors?.text,
                  fontFamily: theme?.fonts?.secondary
                }}
              >
                {item.title}
              </a>
            ))}
            {content.ctaButton && (
              <a
                href={content.ctaButton.url}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-medium transition-colors mt-4"
                style={{
                  background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                  fontFamily: theme?.fonts?.accent
                }}
              >
                {content.ctaButton.text}
              </a>
            )}
          </nav>
        </div>
      </div>
    </header>
  );

  // Minimal Header
  const renderMinimalHeader = () => (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        fontFamily: theme?.fonts?.primary,
        boxShadow: theme?.shadows?.sm
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            {isEditing ? (
              <div className="flex items-center gap-3">
                <ImageUpload
                  value={content.logo}
                  onChange={(url) => handleChange('logo', url)}
                  placeholder="Add logo"
                  className="w-8 h-8 lg:w-10 lg:h-10"
                  theme={theme}
                />
                <input
                  type="text"
                  value={content.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className="text-base lg:text-lg font-bold bg-transparent border-2 border-dashed rounded-lg p-2"
                  style={{
                    color: theme?.colors?.primary,
                    borderColor: `${theme?.colors?.primary}50`
                  }}
                  placeholder="Company Name"
                />
              </div>
            ) : (
              <>
                {content.logo && (
                  <img
                    src={content.logo}
                    alt={content.companyName}
                    className="w-8 h-8 lg:w-10 lg:h-10 object-contain"
                  />
                )}
                <span
                  className="text-base lg:text-lg font-bold"
                  style={{ color: theme?.colors?.primary }}
                >
                  {content.companyName}
                </span>
              </>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {isEditing ? (
              <div className="flex items-center gap-4">
                {content.menuItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleMenuItemChange(index, 'title', e.target.value)}
                      className="px-2 py-1 text-sm bg-transparent border rounded-lg"
                      style={{
                        borderColor: theme?.colors?.border,
                        color: theme?.colors?.text
                      }}
                      placeholder="Menu item"
                    />
                    <input
                      type="text"
                      value={item.url}
                      onChange={(e) => handleMenuItemChange(index, 'url', e.target.value)}
                      className="px-2 py-1 text-sm bg-transparent border rounded-lg w-16"
                      style={{
                        borderColor: theme?.colors?.border,
                        color: theme?.colors?.textSecondary
                      }}
                      placeholder="URL"
                    />
                    <button
                      onClick={() => removeMenuItem(index)}
                      className="p-1 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addMenuItem}
                  className="px-3 py-1 text-sm rounded-lg transition-colors"
                  style={{
                    backgroundColor: `${theme?.colors?.primary}15`,
                    color: theme?.colors?.primary
                  }}
                >
                  + Add
                </button>
              </div>
            ) : (
              <>
                {content.menuItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.url}
                    className="transition-colors text-sm font-medium"
                    style={{
                      color: theme?.colors?.text,
                      fontFamily: theme?.fonts?.secondary
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = theme?.colors?.primary || '#3b82f6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = theme?.colors?.text || '#1f2937';
                    }}
                  >
                    {item.title}
                  </a>
                ))}
              </>
            )}
          </nav>

          {/* Right Side Elements */}
          <div className="flex items-center gap-3">
            {/* Search */}
            {content.searchEnabled && (
              <button
                className="p-2 rounded-full transition-colors"
                style={{
                  backgroundColor: `${theme?.colors?.primary}10`,
                  color: theme?.colors?.primary
                }}
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            {/* Cart */}
            {content.cartEnabled && (
              <button
                className="p-2 rounded-full transition-colors"
                style={{
                  backgroundColor: `${theme?.colors?.primary}10`,
                  color: theme?.colors?.primary
                }}
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
            )}

            {/* User */}
            {content.userEnabled && (
              <button
                className="p-2 rounded-full transition-colors"
                style={{
                  backgroundColor: `${theme?.colors?.primary}10`,
                  color: theme?.colors?.primary
                }}
              >
                <User className="w-4 h-4" />
              </button>
            )}

            {/* CTA Button */}
            {content.ctaButton && (
              <a
                href={content.ctaButton.url}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors"
                style={{
                  background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                  fontFamily: theme?.fonts?.accent
                }}
              >
                {content.ctaButton.text}
              </a>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors"
              style={{
                color: theme?.colors?.text,
                backgroundColor: mobileMenuOpen ? `${theme?.colors?.primary}15` : 'transparent'
              }}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 py-4' : 'max-h-0'}`}
          style={{ borderTop: mobileMenuOpen ? `1px solid ${theme?.colors?.border}` : 'none' }}
        >
          <nav className="flex flex-col space-y-3">
            {content.menuItems.map((item, index) => (
              <a
                key={index}
                href={item.url}
                className="py-2 transition-colors font-medium"
                style={{
                  color: theme?.colors?.text,
                  fontFamily: theme?.fonts?.secondary
                }}
              >
                {item.title}
              </a>
            ))}
            {content.ctaButton && (
              <a
                href={content.ctaButton.url}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-medium transition-colors mt-2"
                style={{
                  background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
                  fontFamily: theme?.fonts?.accent
                }}
              >
                {content.ctaButton.text}
              </a>
            )}
          </nav>
        </div>
      </div>
    </header>
  );

  // Initialize default content based on variant
  React.useEffect(() => {
    // Add CTA button if not present
    if (!content.ctaButton) {
      handleChange('ctaButton', { text: 'Get Started', url: '#contact' });
    }

    // Add social links if not present and variant is centered
    if (variant === 'header-centered' && !content.socialLinks) {
      handleChange('socialLinks', [
        { platform: 'Facebook', url: 'https://facebook.com' },
        { platform: 'Twitter', url: 'https://twitter.com' },
        { platform: 'Instagram', url: 'https://instagram.com' }
      ]);
    }

    // Add search, cart, user features for minimal header
    if (variant === 'header-minimal') {
      if (content.searchEnabled === undefined) handleChange('searchEnabled', true);
      if (content.userEnabled === undefined) handleChange('userEnabled', true);
    }
  }, [variant]);

  switch (variant) {
    case 'header-centered':
      return renderCenteredHeader();
    case 'header-minimal':
      return renderMinimalHeader();
    default:
      return renderClassicHeader();
  }
};

export default HeaderSection;