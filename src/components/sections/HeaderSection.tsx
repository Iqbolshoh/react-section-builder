import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Globe, Facebook, Twitter, Instagram, Linkedin, Youtube, ChevronDown, Search, ShoppingCart, User, Heart, Bell, Phone, Mail } from 'lucide-react';

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
    menuItems: { title: string; url: string; submenu?: { title: string; url: string }[] }[];
    language: string;
    socialLinks: { platform: string; url: string }[];
    contactInfo?: { phone?: string; email?: string };
    searchEnabled?: boolean;
    cartEnabled?: boolean;
    userEnabled?: boolean;
    notificationsEnabled?: boolean;
    wishlistEnabled?: boolean;
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
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);

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

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return <Facebook className="w-4 h-4" />;
      case 'twitter': return <Twitter className="w-4 h-4" />;
      case 'instagram': return <Instagram className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      case 'youtube': return <Youtube className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  // Classic Header
  const renderClassicHeader = () => (
    <header 
      className="shadow-sm border-b sticky top-0 z-50"
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
              <div key={index} className="relative group">
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleMenuItemChange(index, 'title', e.target.value)}
                      className="px-2 py-1 border rounded text-sm"
                      style={{ 
                        borderColor: theme?.colors?.border,
                        color: theme?.colors?.text,
                        backgroundColor: theme?.colors?.surface,
                        fontFamily: theme?.fonts?.secondary
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
                  </div>
                ) : (
                  <>
                    <a
                      href={item.url}
                      className="font-medium transition-colors flex items-center gap-1"
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
                      {item.submenu && <ChevronDown className="w-4 h-4" />}
                    </a>
                    
                    {item.submenu && (
                      <div 
                        className="absolute left-0 mt-2 w-48 rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 z-50"
                        style={{ 
                          backgroundColor: theme?.colors?.surface,
                          boxShadow: theme?.shadows?.lg,
                          border: `1px solid ${theme?.colors?.border}`
                        }}
                      >
                        {item.submenu.map((subitem, subindex) => (
                          <a
                            key={subindex}
                            href={subitem.url}
                            className="block px-4 py-2 text-sm transition-colors"
                            style={{ 
                              color: theme?.colors?.text,
                              fontFamily: theme?.fonts?.secondary
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = `${theme?.colors?.primary}10`;
                              e.currentTarget.style.color = theme?.colors?.primary || '#3b82f6';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.color = theme?.colors?.text || '#374151';
                            }}
                          >
                            {subitem.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
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
            {/* Action Icons */}
            {!isEditing && (
              <div className="hidden md:flex items-center gap-3">
                {content.searchEnabled && (
                  <button 
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    style={{ backgroundColor: `${theme?.colors?.primary}15` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${theme?.colors?.primary}25`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = `${theme?.colors?.primary}15`;
                    }}
                  >
                    <Search className="w-5 h-5" style={{ color: theme?.colors?.primary }} />
                  </button>
                )}
                
                {content.cartEnabled && (
                  <button 
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors relative"
                    style={{ backgroundColor: `${theme?.colors?.primary}15` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${theme?.colors?.primary}25`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = `${theme?.colors?.primary}15`;
                    }}
                  >
                    <ShoppingCart className="w-5 h-5" style={{ color: theme?.colors?.primary }} />
                    <span 
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center text-white font-semibold"
                      style={{ backgroundColor: theme?.colors?.accent }}
                    >
                      2
                    </span>
                  </button>
                )}
                
                {content.userEnabled && (
                  <button 
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    style={{ backgroundColor: `${theme?.colors?.primary}15` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${theme?.colors?.primary}25`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = `${theme?.colors?.primary}15`;
                    }}
                  >
                    <User className="w-5 h-5" style={{ color: theme?.colors?.primary }} />
                  </button>
                )}
              </div>
            )}

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

  // Centered Header
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
          <div className="flex items-center justify-center gap-3 mb-6">
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
              <div key={index} className="relative group">
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleMenuItemChange(index, 'title', e.target.value)}
                      className="px-2 py-1 border rounded text-sm"
                      style={{ 
                        borderColor: theme?.colors?.border,
                        color: theme?.colors?.text,
                        backgroundColor: theme?.colors?.surface,
                        fontFamily: theme?.fonts?.secondary
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
                  </div>
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
          
          {/* Social Links */}
          {!isEditing && content.socialLinks && content.socialLinks.length > 0 && (
            <div className="flex items-center justify-center gap-3 mt-6">
              {content.socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
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
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );

  // Minimal Header
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
                        backgroundColor: theme?.colors?.surface,
                        fontFamily: theme?.fonts?.secondary
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

          {/* Action Icons */}
          {!isEditing && (
            <div className="flex items-center gap-3">
              {content.searchEnabled && (
                <button 
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: `${theme?.colors?.primary}15` }}
                >
                  <Search className="w-4 h-4" style={{ color: theme?.colors?.primary }} />
                </button>
              )}
              
              {content.userEnabled && (
                <button 
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: `${theme?.colors?.primary}15` }}
                >
                  <User className="w-4 h-4" style={{ color: theme?.colors?.primary }} />
                </button>
              )}
            </div>
          )}

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

  // Transparent Header
  const renderTransparentHeader = () => (
    <header 
      className="absolute top-0 left-0 right-0 z-50"
      style={{ 
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <input
                  type="url"
                  value={content.logo}
                  onChange={(e) => handleChange('logo', e.target.value)}
                  className="w-12 h-12 border-2 border-dashed rounded-lg text-xs text-white"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.5)' }}
                  placeholder="Logo URL"
                />
                <input
                  type="text"
                  value={content.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className="text-xl font-bold bg-transparent border-2 border-dashed rounded-lg p-2 text-white"
                  style={{ 
                    borderColor: 'rgba(255, 255, 255, 0.5)',
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
                  className="text-lg sm:text-xl font-bold text-white"
                  style={{ fontFamily: theme?.fonts?.primary }}
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
                      className="px-2 py-1 border rounded text-sm text-white bg-transparent"
                      style={{ borderColor: 'rgba(255, 255, 255, 0.5)' }}
                      placeholder="Menu item"
                    />
                    <button
                      onClick={() => removeMenuItem(index)}
                      className="text-xs text-white"
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <a
                    href={item.url}
                    className="font-medium text-white text-opacity-90 hover:text-opacity-100 transition-opacity"
                    style={{ fontFamily: theme?.fonts?.secondary }}
                  >
                    {item.title}
                  </a>
                )}
              </div>
            ))}
            {isEditing && (
              <button
                onClick={addMenuItem}
                className="text-sm text-white"
              >
                + Add Item
              </button>
            )}
          </nav>

          {/* Action Button */}
          {!isEditing && (
            <a
              href="#contact"
              className="hidden md:inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-medium transition-colors"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(8px)',
                color: 'white',
                fontFamily: theme?.fonts?.secondary
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              Get Started
            </a>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden py-4 rounded-lg mt-2"
            style={{ 
              backgroundColor: theme?.colors?.surface,
              boxShadow: theme?.shadows?.lg
            }}
          >
            <nav className="space-y-4 px-4">
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

  // Mega Menu Header
  const renderMegaMenuHeader = () => (
    <header 
      className="shadow-sm border-b sticky top-0 z-50"
      style={{ 
        backgroundColor: theme?.colors?.surface || '#ffffff',
        borderColor: theme?.colors?.border || '#e2e8f0',
        fontFamily: theme?.fonts?.primary,
        boxShadow: theme?.shadows?.sm
      }}
    >
      {/* Top Bar */}
      <div 
        className="border-b py-2"
        style={{ 
          backgroundColor: theme?.colors?.background,
          borderColor: theme?.colors?.border
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              {content.contactInfo?.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" style={{ color: theme?.colors?.primary }} />
                  <span style={{ color: theme?.colors?.textSecondary }}>{content.contactInfo.phone}</span>
                </div>
              )}
              {content.contactInfo?.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" style={{ color: theme?.colors?.primary }} />
                  <span style={{ color: theme?.colors?.textSecondary }}>{content.contactInfo.email}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" style={{ color: theme?.colors?.textSecondary }} />
                <span style={{ color: theme?.colors?.textSecondary }}>{content.language}</span>
              </div>
              
              {/* Social Links */}
              <div className="hidden md:flex items-center gap-2">
                {content.socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="w-6 h-6 rounded-full flex items-center justify-center transition-colors"
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
                    {getSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
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
              <div key={index} className="relative group">
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleMenuItemChange(index, 'title', e.target.value)}
                      className="px-2 py-1 border rounded text-sm"
                      style={{ 
                        borderColor: theme?.colors?.border,
                        color: theme?.colors?.text,
                        backgroundColor: theme?.colors?.surface,
                        fontFamily: theme?.fonts?.secondary
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
                  </div>
                ) : (
                  <>
                    <a
                      href={item.url}
                      className="font-medium transition-colors flex items-center gap-1"
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
                      {item.submenu && <ChevronDown className="w-4 h-4" />}
                    </a>
                    
                    {item.submenu && (
                      <div 
                        className="absolute left-0 mt-2 w-48 rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 z-50"
                        style={{ 
                          backgroundColor: theme?.colors?.surface,
                          boxShadow: theme?.shadows?.lg,
                          border: `1px solid ${theme?.colors?.border}`
                        }}
                      >
                        {item.submenu.map((subitem, subindex) => (
                          <a
                            key={subindex}
                            href={subitem.url}
                            className="block px-4 py-2 text-sm transition-colors"
                            style={{ 
                              color: theme?.colors?.text,
                              fontFamily: theme?.fonts?.secondary
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = `${theme?.colors?.primary}10`;
                              e.currentTarget.style.color = theme?.colors?.primary || '#3b82f6';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.color = theme?.colors?.text || '#374151';
                            }}
                          >
                            {subitem.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
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
            {/* Action Icons */}
            {!isEditing && (
              <div className="hidden md:flex items-center gap-3">
                {content.searchEnabled && (
                  <button 
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    style={{ backgroundColor: `${theme?.colors?.primary}15` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${theme?.colors?.primary}25`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = `${theme?.colors?.primary}15`;
                    }}
                  >
                    <Search className="w-5 h-5" style={{ color: theme?.colors?.primary }} />
                  </button>
                )}
                
                {content.cartEnabled && (
                  <button 
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors relative"
                    style={{ backgroundColor: `${theme?.colors?.primary}15` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${theme?.colors?.primary}25`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = `${theme?.colors?.primary}15`;
                    }}
                  >
                    <ShoppingCart className="w-5 h-5" style={{ color: theme?.colors?.primary }} />
                    <span 
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center text-white font-semibold"
                      style={{ backgroundColor: theme?.colors?.accent }}
                    >
                      2
                    </span>
                  </button>
                )}
                
                {content.userEnabled && (
                  <button 
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    style={{ backgroundColor: `${theme?.colors?.primary}15` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${theme?.colors?.primary}25`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = `${theme?.colors?.primary}15`;
                    }}
                  >
                    <User className="w-5 h-5" style={{ color: theme?.colors?.primary }} />
                  </button>
                )}
              </div>
            )}

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

  // Sidebar Header
  const renderSidebarHeader = () => (
    <header 
      className="fixed top-0 left-0 bottom-0 w-64 z-50 border-r hidden lg:block"
      style={{ 
        backgroundColor: theme?.colors?.surface || '#ffffff',
        borderColor: theme?.colors?.border || '#e2e8f0',
        fontFamily: theme?.fonts?.primary,
        boxShadow: theme?.shadows?.sm
      }}
    >
      <div className="h-full flex flex-col">
        {/* Logo */}
        <div 
          className="p-6 border-b" 
          style={{ borderColor: theme?.colors?.border }}
        >
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
                  <img src={content.logo} alt="Logo" className="w-10 h-10 object-contain" />
                )}
                <span 
                  className="text-lg font-bold"
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
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            {content.menuItems.map((item, index) => (
              <div key={index}>
                {isEditing ? (
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleMenuItemChange(index, 'title', e.target.value)}
                      className="px-2 py-1 border rounded text-sm"
                      style={{ 
                        borderColor: theme?.colors?.border,
                        color: theme?.colors?.text,
                        backgroundColor: theme?.colors?.surface,
                        fontFamily: theme?.fonts?.secondary
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
                  </div>
                ) : (
                  <a
                    href={item.url}
                    className="block font-medium py-2 transition-colors"
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
                
                {item.submenu && (
                  <div 
                    className="pl-4 mt-2 space-y-2 border-l-2" 
                    style={{ borderColor: theme?.colors?.border }}
                  >
                    {item.submenu.map((subitem, subindex) => (
                      <a
                        key={subindex}
                        href={subitem.url}
                        className="block text-sm transition-colors"
                        style={{ 
                          color: theme?.colors?.textSecondary,
                          fontFamily: theme?.fonts?.secondary
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = theme?.colors?.primary || '#3b82f6';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = theme?.colors?.textSecondary || '#6b7280';
                        }}
                      >
                        {subitem.title}
                      </a>
                    ))}
                  </div>
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
          </div>
        </nav>

        {/* Footer */}
        <div 
          className="p-6 border-t"
          style={{ borderColor: theme?.colors?.border }}
        >
          {/* Social Links */}
          <div className="flex items-center justify-center gap-3 mb-4">
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
                {getSocialIcon(social.platform)}
              </a>
            ))}
          </div>
          
          {/* Contact Info */}
          {content.contactInfo && (
            <div 
              className="text-sm text-center"
              style={{ 
                color: theme?.colors?.textSecondary,
                fontFamily: theme?.fonts?.secondary
              }}
            >
              {content.contactInfo.email && (
                <div className="mb-1">{content.contactInfo.email}</div>
              )}
              {content.contactInfo.phone && (
                <div>{content.contactInfo.phone}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );

  // Initialize default content if needed
  React.useEffect(() => {
    // Add submenu example for transparent header
    if (variant === 'header-transparent' && content.menuItems.length > 0 && !content.menuItems[0].submenu) {
      const updatedItems = [...content.menuItems];
      updatedItems[0] = {
        ...updatedItems[0],
        submenu: [
          { title: 'Submenu Item 1', url: '#' },
          { title: 'Submenu Item 2', url: '#' }
        ]
      };
      handleChange('menuItems', updatedItems);
    }
    
    // Add action buttons for classic header
    if (variant === 'header-classic' && content.searchEnabled === undefined) {
      handleChange('searchEnabled', true);
      handleChange('cartEnabled', true);
      handleChange('userEnabled', true);
    }
  }, [variant]);

  switch (variant) {
    case 'header-centered':
      return renderCenteredHeader();
    case 'header-minimal':
      return renderMinimalHeader();
    case 'header-transparent':
      return renderTransparentHeader();
    case 'header-sidebar':
      return renderSidebarHeader();
    case 'header-mega-menu':
      return renderMegaMenuHeader();
    default:
      return renderClassicHeader();
  }
};

export default HeaderSection;