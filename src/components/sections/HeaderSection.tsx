import React from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Globe, Facebook, Twitter, Instagram } from 'lucide-react';

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
    language: string;
    socialLinks: { platform: string; url: string }[];
    contactInfo?: { phone?: string; email?: string };
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
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleChange = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const handleMenuItemChange = (index: number, field: string, value: string) => {
    const updatedItems = [...content.menuItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    handleChange('menuItems', updatedItems);
  };

  const addMenuItem = () => {
    handleChange('menuItems', [...content.menuItems, { title: 'New Item', url: '#' }]);
  };

  const removeMenuItem = (index: number) => {
    const updatedItems = content.menuItems.filter((_, i) => i !== index);
    handleChange('menuItems', updatedItems);
  };

  const renderClassicHeader = () => (
    <header 
      className="shadow-sm border-b"
      style={{ 
        backgroundColor: theme?.colors?.surface || '#ffffff',
        borderColor: theme?.colors?.border || '#e2e8f0',
        fontFamily: theme?.fonts?.primary,
        boxShadow: theme?.shadows?.sm
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <input
                  type="url"
                  value={content.logo}
                  onChange={(e) => handleChange('logo', e.target.value)}
                  className="w-12 h-12 border-2 border-dashed rounded-lg text-xs"
                  style={{ borderColor: `${theme?.colors?.primary}50` }}
                  placeholder="Logo URL"
                />
                <input
                  type="text"
                  value={content.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className="text-xl font-bold bg-transparent border-2 border-dashed rounded-lg p-2"
                  style={{ 
                    color: theme?.colors?.primary,
                    borderColor: `${theme?.colors?.primary}50`,
                    fontFamily: theme?.fonts?.primary
                  }}
                  placeholder="Company Name"
                />
              </>
            ) : (
              <>
                {content.logo && (
                  <img src={content.logo} alt="Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
                )}
                <span 
                  className="text-lg sm:text-xl font-bold"
                  style={{ 
                    color: theme?.colors?.primary,
                    fontFamily: theme?.fonts?.primary
                  }}
                >
                  {content.companyName}
                </span>
              </>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {content.menuItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleMenuItemChange(index, 'title', e.target.value)}
                      className="px-2 py-1 border rounded text-sm"
                      style={{ 
                        borderColor: theme?.colors?.border,
                        color: theme?.colors?.text,
                        backgroundColor: theme?.colors?.surface
                      }}
                      placeholder="Menu item"
                    />
                    <input
                      type="url"
                      value={item.url}
                      onChange={(e) => handleMenuItemChange(index, 'url', e.target.value)}
                      className="px-2 py-1 border rounded text-sm w-20"
                      style={{ 
                        borderColor: theme?.colors?.border,
                        color: theme?.colors?.text,
                        backgroundColor: theme?.colors?.surface
                      }}
                      placeholder="URL"
                    />
                    <button
                      onClick={() => removeMenuItem(index)}
                      className="text-xs"
                      style={{ color: theme?.colors?.error }}
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <a
                    href={item.url}
                    className="font-medium transition-colors"
                    style={{ 
                      color: theme?.colors?.text,
                      fontFamily: theme?.fonts?.secondary
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = theme?.colors?.primary || '#3b82f6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = theme?.colors?.text || '#374151';
                    }}
                  >
                    {item.title}
                  </a>
                )}
              </div>
            ))}
            {isEditing && (
              <button
                onClick={addMenuItem}
                className="text-sm"
                style={{ color: theme?.colors?.primary }}
              >
                + Add Item
              </button>
            )}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="hidden sm:flex items-center gap-2">
              <Globe className="w-4 h-4" style={{ color: theme?.colors?.textSecondary }} />
              {isEditing ? (
                <select
                  value={content.language}
                  onChange={(e) => handleChange('language', e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                  style={{ 
                    borderColor: theme?.colors?.border,
                    color: theme?.colors?.text,
                    backgroundColor: theme?.colors?.surface
                  }}
                >
                  <option value="en">EN</option>
                  <option value="uz">UZ</option>
                  <option value="ru">RU</option>
                </select>
              ) : (
                <span 
                  className="text-sm font-medium"
                  style={{ 
                    color: theme?.colors?.text,
                    fontFamily: theme?.fonts?.secondary
                  }}
                >
                  {content.language}
                </span>
              )}
            </div>

            {/* Social Links */}
            <div className="hidden md:flex items-center gap-2">
              {content.socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ 
                    backgroundColor: `${theme?.colors?.primary}15`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${theme?.colors?.primary}25`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${theme?.colors?.primary}15`;
                  }}
                >
                  {social.platform === 'Facebook' && <Facebook className="w-4 h-4" style={{ color: theme?.colors?.primary }} />}
                  {social.platform === 'Twitter' && <Twitter className="w-4 h-4" style={{ color: theme?.colors?.primary }} />}
                  {social.platform === 'Instagram' && <Instagram className="w-4 h-4" style={{ color: theme?.colors?.primary }} />}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md transition-colors"
              style={{ 
                color: theme?.colors?.text,
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${theme?.colors?.primary}15`;
                e.currentTarget.style.color = theme?.colors?.primary || '#3b82f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = theme?.colors?.text || '#374151';
              }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t py-4"
            style={{ borderColor: theme?.colors?.border }}
          >
            <nav className="space-y-4">
              {content.menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  className="block font-medium transition-colors"
                  style={{ 
                    color: theme?.colors?.text,
                    fontFamily: theme?.fonts?.secondary
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = theme?.colors?.primary || '#3b82f6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = theme?.colors?.text || '#374151';
                  }}
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );

  const renderCenteredHeader = () => (
    <header 
      className="shadow-sm border-b"
      style={{ 
        backgroundColor: theme?.colors?.surface || '#ffffff',
        borderColor: theme?.colors?.border || '#e2e8f0',
        fontFamily: theme?.fonts?.primary,
        boxShadow: theme?.shadows?.sm
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-4">
            {isEditing ? (
              <>
                <input
                  type="url"
                  value={content.logo}
                  onChange={(e) => handleChange('logo', e.target.value)}
                  className="w-16 h-16 border-2 border-dashed rounded-lg text-xs"
                  style={{ borderColor: `${theme?.colors?.primary}50` }}
                  placeholder="Logo URL"
                />
                <input
                  type="text"
                  value={content.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className="text-2xl font-bold bg-transparent border-2 border-dashed rounded-lg p-2"
                  style={{ 
                    color: theme?.colors?.primary,
                    borderColor: `${theme?.colors?.primary}50`,
                    fontFamily: theme?.fonts?.primary
                  }}
                  placeholder="Company Name"
                />
              </>
            ) : (
              <>
                {content.logo && (
                  <img src={content.logo} alt="Logo" className="w-12 h-12 sm:w-16 sm:h-16 object-contain" />
                )}
                <h1 
                  className="text-xl sm:text-2xl font-bold"
                  style={{ 
                    color: theme?.colors?.primary,
                    fontFamily: theme?.fonts?.primary
                  }}
                >
                  {content.companyName}
                </h1>
              </>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {content.menuItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleMenuItemChange(index, 'title', e.target.value)}
                      className="px-2 py-1 border rounded text-sm"
                      style={{ 
                        borderColor: theme?.colors?.border,
                        color: theme?.colors?.text,
                        backgroundColor: theme?.colors?.surface
                      }}
                      placeholder="Menu item"
                    />
                    <button
                      onClick={() => removeMenuItem(index)}
                      className="text-xs"
                      style={{ color: theme?.colors?.error }}
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <a
                    href={item.url}
                    className="font-medium transition-colors"
                    style={{ 
                      color: theme?.colors?.text,
                      fontFamily: theme?.fonts?.secondary
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = theme?.colors?.primary || '#3b82f6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = theme?.colors?.text || '#374151';
                    }}
                  >
                    {item.title}
                  </a>
                )}
              </div>
            ))}
            {isEditing && (
              <button
                onClick={addMenuItem}
                className="text-sm"
                style={{ color: theme?.colors?.primary }}
              >
                + Add Item
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );

  const renderMinimalHeader = () => (
    <header 
      style={{ 
        backgroundColor: theme?.colors?.surface || '#ffffff',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            {isEditing ? (
              <input
                type="text"
                value={content.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="text-lg font-bold bg-transparent border-2 border-dashed rounded-lg p-2"
                style={{ 
                  color: theme?.colors?.primary,
                  borderColor: `${theme?.colors?.primary}50`,
                  fontFamily: theme?.fonts?.primary
                }}
                placeholder="Company Name"
              />
            ) : (
              <span 
                className="text-lg font-bold"
                style={{ 
                  color: theme?.colors?.primary,
                  fontFamily: theme?.fonts?.primary
                }}
              >
                {content.companyName}
              </span>
            )}
          </div>

          {/* Minimal Navigation */}
          <nav className="hidden sm:flex items-center space-x-6">
            {content.menuItems.slice(0, 4).map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleMenuItemChange(index, 'title', e.target.value)}
                      className="px-2 py-1 border rounded text-sm"
                      style={{ 
                        borderColor: theme?.colors?.border,
                        color: theme?.colors?.text,
                        backgroundColor: theme?.colors?.surface
                      }}
                      placeholder="Menu item"
                    />
                    <button
                      onClick={() => removeMenuItem(index)}
                      className="text-xs"
                      style={{ color: theme?.colors?.error }}
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <a
                    href={item.url}
                    className="text-sm font-medium transition-colors"
                    style={{ 
                      color: theme?.colors?.textSecondary,
                      fontFamily: theme?.fonts?.secondary
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = theme?.colors?.text || '#111827';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = theme?.colors?.textSecondary || '#6b7280';
                    }}
                  >
                    {item.title}
                  </a>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 rounded-md"
            style={{ color: theme?.colors?.text }}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );

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