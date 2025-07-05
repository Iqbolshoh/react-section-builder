import React from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Globe, Facebook, Twitter, Instagram } from 'lucide-react';

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
  theme?: any;
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
    <header className="bg-white shadow-sm border-b border-gray-200" style={{ fontFamily: theme?.fontFamily }}>
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
                  className="w-12 h-12 border-2 border-dashed border-blue-300 rounded-lg text-xs"
                  placeholder="Logo URL"
                />
                <input
                  type="text"
                  value={content.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className="text-xl font-bold bg-transparent border-2 border-dashed border-blue-300 rounded-lg p-2"
                  placeholder="Company Name"
                />
              </>
            ) : (
              <>
                {content.logo && (
                  <img src={content.logo} alt="Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
                )}
                <span className="text-lg sm:text-xl font-bold" style={{ color: theme?.primaryColor }}>
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
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="Menu item"
                    />
                    <input
                      type="url"
                      value={item.url}
                      onChange={(e) => handleMenuItemChange(index, 'url', e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded text-sm w-20"
                      placeholder="URL"
                    />
                    <button
                      onClick={() => removeMenuItem(index)}
                      className="text-red-500 text-xs"
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <a
                    href={item.url}
                    className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  >
                    {item.title}
                  </a>
                )}
              </div>
            ))}
            {isEditing && (
              <button
                onClick={addMenuItem}
                className="text-blue-600 text-sm"
              >
                + Add Item
              </button>
            )}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="hidden sm:flex items-center gap-2">
              <Globe className="w-4 h-4 text-gray-500" />
              {isEditing ? (
                <select
                  value={content.language}
                  onChange={(e) => handleChange('language', e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option value="en">EN</option>
                  <option value="uz">UZ</option>
                  <option value="ru">RU</option>
                </select>
              ) : (
                <span className="text-sm font-medium text-gray-700">{content.language}</span>
              )}
            </div>

            {/* Social Links */}
            <div className="hidden md:flex items-center gap-2">
              {content.socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  {social.platform === 'Facebook' && <Facebook className="w-4 h-4" />}
                  {social.platform === 'Twitter' && <Twitter className="w-4 h-4" />}
                  {social.platform === 'Instagram' && <Instagram className="w-4 h-4" />}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
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
            className="lg:hidden border-t border-gray-200 py-4"
          >
            <nav className="space-y-4">
              {content.menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
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
    <header className="bg-white shadow-sm border-b border-gray-200" style={{ fontFamily: theme?.fontFamily }}>
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
                  className="w-16 h-16 border-2 border-dashed border-blue-300 rounded-lg text-xs"
                  placeholder="Logo URL"
                />
                <input
                  type="text"
                  value={content.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className="text-2xl font-bold bg-transparent border-2 border-dashed border-blue-300 rounded-lg p-2"
                  placeholder="Company Name"
                />
              </>
            ) : (
              <>
                {content.logo && (
                  <img src={content.logo} alt="Logo" className="w-12 h-12 sm:w-16 sm:h-16 object-contain" />
                )}
                <h1 className="text-xl sm:text-2xl font-bold" style={{ color: theme?.primaryColor }}>
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
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="Menu item"
                    />
                    <button
                      onClick={() => removeMenuItem(index)}
                      className="text-red-500 text-xs"
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <a
                    href={item.url}
                    className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  >
                    {item.title}
                  </a>
                )}
              </div>
            ))}
            {isEditing && (
              <button
                onClick={addMenuItem}
                className="text-blue-600 text-sm"
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
    <header className="bg-white" style={{ fontFamily: theme?.fontFamily }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={content.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className="text-lg font-bold bg-transparent border-2 border-dashed border-blue-300 rounded-lg p-2"
                  placeholder="Company Name"
                />
              </>
            ) : (
              <span className="text-lg font-bold" style={{ color: theme?.primaryColor }}>
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
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="Menu item"
                    />
                    <button
                      onClick={() => removeMenuItem(index)}
                      className="text-red-500 text-xs"
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <a
                    href={item.url}
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
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
            className="sm:hidden p-2 rounded-md text-gray-700"
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