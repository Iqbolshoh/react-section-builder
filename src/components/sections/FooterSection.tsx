import React from 'react';
import { motion } from 'framer-motion';
import { Plus, X, ArrowRight, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, Github } from 'lucide-react';

interface Link {
  title: string;
  url: string;
}

interface SocialLink {
  platform: string;
  url: string;
}

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

interface FooterSectionProps {
  content: {
    companyName: string;
    description?: string;
    links: Link[];
    socialLinks: SocialLink[];
    contactInfo?: {
      address?: string;
      phone?: string;
      email?: string;
    };
    newsletterEnabled?: boolean;
    newsletterTitle?: string;
    newsletterPlaceholder?: string;
    copyrightText?: string;
    columns?: {
      title: string;
      links: Link[];
    }[];
    logo?: string;
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
  variant?: string;
}

const FooterSection: React.FC<FooterSectionProps> = ({ content, isEditing, onChange, theme, variant = 'footer-comprehensive' }) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const handleLinkChange = (index: number, field: string, value: string) => {
    const updatedLinks = [...content.links];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    handleChange('links', updatedLinks);
  };

  const handleSocialLinkChange = (index: number, field: string, value: string) => {
    const updatedSocialLinks = [...content.socialLinks];
    updatedSocialLinks[index] = { ...updatedSocialLinks[index], [field]: value };
    handleChange('socialLinks', updatedSocialLinks);
  };

  const handleColumnLinkChange = (columnIndex: number, linkIndex: number, field: string, value: string) => {
    if (!content.columns) return;
    
    const updatedColumns = [...content.columns];
    updatedColumns[columnIndex].links[linkIndex] = { 
      ...updatedColumns[columnIndex].links[linkIndex], 
      [field]: value 
    };
    handleChange('columns', updatedColumns);
  };

  const handleColumnTitleChange = (columnIndex: number, value: string) => {
    if (!content.columns) return;
    
    const updatedColumns = [...content.columns];
    updatedColumns[columnIndex].title = value;
    handleChange('columns', updatedColumns);
  };

  const addLink = () => {
    handleChange('links', [...content.links, { title: 'New Link', url: '#' }]);
  };

  const removeLink = (index: number) => {
    const updatedLinks = content.links.filter((_, i) => i !== index);
    handleChange('links', updatedLinks);
  };

  const addSocialLink = () => {
    handleChange('socialLinks', [...content.socialLinks, { platform: 'New Platform', url: '#' }]);
  };

  const removeSocialLink = (index: number) => {
    const updatedSocialLinks = content.socialLinks.filter((_, i) => i !== index);
    handleChange('socialLinks', updatedSocialLinks);
  };

  const addColumnLink = (columnIndex: number) => {
    if (!content.columns) return;
    
    const updatedColumns = [...content.columns];
    updatedColumns[columnIndex].links.push({ title: 'New Link', url: '#' });
    handleChange('columns', updatedColumns);
  };

  const removeColumnLink = (columnIndex: number, linkIndex: number) => {
    if (!content.columns) return;
    
    const updatedColumns = [...content.columns];
    updatedColumns[columnIndex].links = updatedColumns[columnIndex].links.filter((_, i) => i !== linkIndex);
    handleChange('columns', updatedColumns);
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return <Facebook className="w-4 h-4" />;
      case 'twitter': return <Twitter className="w-4 h-4" />;
      case 'instagram': return <Instagram className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      case 'youtube': return <Youtube className="w-4 h-4" />;
      case 'github': return <Github className="w-4 h-4" />;
      default: return null;
    }
  };

  const renderComprehensiveFooter = () => (
    <footer 
      className="py-16"
      style={{ 
        backgroundColor: theme?.colors?.text || '#1f2937',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                {isEditing ? (
                  <input
                    type="url"
                    value={content.logo || ''}
                    onChange={(e) => handleChange('logo', e.target.value)}
                    className="w-12 h-12 border-2 border-dashed rounded-lg text-xs text-white"
                    style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
                    placeholder="Logo URL"
                  />
                ) : content.logo ? (
                  <img src={content.logo} alt="Logo" className="w-10 h-10 object-contain" />
                ) : null}
                
                {isEditing ? (
                  <input
                    type="text"
                    value={content.companyName}
                    onChange={(e) => handleChange('companyName', e.target.value)}
                    className="text-2xl font-bold mb-4 bg-transparent border-2 border-dashed rounded-lg p-2 text-white"
                    style={{ 
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      fontFamily: theme?.fonts?.primary
                    }}
                    placeholder="Company Name"
                  />
                ) : (
                  <h3 
                    className="text-2xl font-bold"
                    style={{ 
                      color: theme?.colors?.surface || '#ffffff',
                      fontFamily: theme?.fonts?.primary
                    }}
                  >
                    {content.companyName}
                  </h3>
                )}
              </div>
              
              {isEditing ? (
                <textarea
                  value={content.description || ''}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="mb-6 bg-transparent border-2 border-dashed rounded-lg p-2 w-full h-24 resize-none text-white"
                  style={{ 
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    fontFamily: theme?.fonts?.secondary
                  }}
                  placeholder="Company description"
                />
              ) : (
                <p 
                  className="mb-6"
                  style={{ 
                    color: `rgba(255, 255, 255, 0.7)`,
                    fontFamily: theme?.fonts?.secondary
                  }}
                >
                  {content.description || 'Building beautiful websites made simple.'}
                </p>
              )}
              
              {/* Contact Info */}
              {(content.contactInfo || isEditing) && (
                <div className="space-y-3 mb-6">
                  {isEditing ? (
                    <>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-white opacity-70" />
                        <input
                          type="email"
                          value={content.contactInfo?.email || ''}
                          onChange={(e) => handleChange('contactInfo', { ...content.contactInfo, email: e.target.value })}
                          className="bg-transparent border border-white/30 rounded p-1 text-sm text-white"
                          placeholder="Email address"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-white opacity-70" />
                        <input
                          type="tel"
                          value={content.contactInfo?.phone || ''}
                          onChange={(e) => handleChange('contactInfo', { ...content.contactInfo, phone: e.target.value })}
                          className="bg-transparent border border-white/30 rounded p-1 text-sm text-white"
                          placeholder="Phone number"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-white opacity-70" />
                        <input
                          type="text"
                          value={content.contactInfo?.address || ''}
                          onChange={(e) => handleChange('contactInfo', { ...content.contactInfo, address: e.target.value })}
                          className="bg-transparent border border-white/30 rounded p-1 text-sm text-white"
                          placeholder="Address"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {content.contactInfo?.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-white opacity-70" />
                          <span 
                            className="text-sm"
                            style={{ 
                              color: 'rgba(255, 255, 255, 0.7)',
                              fontFamily: theme?.fonts?.secondary
                            }}
                          >
                            {content.contactInfo.email}
                          </span>
                        </div>
                      )}
                      {content.contactInfo?.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-white opacity-70" />
                          <span 
                            className="text-sm"
                            style={{ 
                              color: 'rgba(255, 255, 255, 0.7)',
                              fontFamily: theme?.fonts?.secondary
                            }}
                          >
                            {content.contactInfo.phone}
                          </span>
                        </div>
                      )}
                      {content.contactInfo?.address && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-white opacity-70" />
                          <span 
                            className="text-sm"
                            style={{ 
                              color: 'rgba(255, 255, 255, 0.7)',
                              fontFamily: theme?.fonts?.secondary
                            }}
                          >
                            {content.contactInfo.address}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
              
              {/* Social Links */}
              <div className="flex flex-wrap gap-3">
                {content.socialLinks.map((social, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={social.platform}
                          onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                          className="flex-1 bg-transparent border border-white/30 rounded p-1 text-sm text-white"
                          placeholder="Platform"
                        />
                        <input
                          type="url"
                          value={social.url}
                          onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                          className="flex-1 bg-transparent border border-white/30 rounded p-1 text-sm text-white"
                          placeholder="URL"
                        />
                        <button
                          onClick={() => removeSocialLink(index)}
                          className="w-4 h-4 text-white rounded-full flex items-center justify-center text-xs"
                          style={{ backgroundColor: theme?.colors?.error }}
                        >
                          <X className="w-2 h-2" />
                        </button>
                      </>
                    ) : (
                      <a
                        href={social.url}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        }}
                      >
                        {getSocialIcon(social.platform)}
                      </a>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <button
                    onClick={addSocialLink}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: theme?.colors?.primary }}
                  >
                    <Plus className="w-4 h-4" />
                    Add Social
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 
                className="text-lg font-semibold mb-4"
                style={{ 
                  color: theme?.colors?.surface || '#ffffff',
                  fontFamily: theme?.fonts?.primary
                }}
              >
                Quick Links
              </h4>
              <ul className="space-y-2">
                {content.links.map((link, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={link.title}
                          onChange={(e) => handleLinkChange(index, 'title', e.target.value)}
                          className="flex-1 bg-transparent border border-white/30 rounded p-1 text-sm text-white"
                          placeholder="Link title"
                        />
                        <input
                          type="url"
                          value={link.url}
                          onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                          className="flex-1 bg-transparent border border-white/30 rounded p-1 text-sm text-white"
                          placeholder="URL"
                        />
                        <button
                          onClick={() => removeLink(index)}
                          className="w-4 h-4 text-white rounded-full flex items-center justify-center text-xs"
                          style={{ backgroundColor: theme?.colors?.error }}
                        >
                          <X className="w-2 h-2" />
                        </button>
                      </>
                    ) : (
                      <a
                        href={link.url}
                        className="transition-colors flex items-center gap-1"
                        style={{ 
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontFamily: theme?.fonts?.secondary
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = theme?.colors?.surface || '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                        }}
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 -ml-4 transition-all group-hover:opacity-100 group-hover:ml-0" />
                        {link.title}
                      </a>
                    )}
                  </li>
                ))}
                {isEditing && (
                  <li>
                    <button
                      onClick={addLink}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: theme?.colors?.primary }}
                    >
                      <Plus className="w-4 h-4" />
                      Add Link
                    </button>
                  </li>
                )}
              </ul>
            </motion.div>
          </div>

          {/* Newsletter */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 
                className="text-lg font-semibold mb-4"
                style={{ 
                  color: theme?.colors?.surface || '#ffffff',
                  fontFamily: theme?.fonts?.primary
                }}
              >
                {isEditing ? (
                  <input
                    type="text"
                    value={content.newsletterTitle || 'Subscribe'}
                    onChange={(e) => handleChange('newsletterTitle', e.target.value)}
                    className="bg-transparent border border-white/30 rounded p-1 text-white"
                    placeholder="Newsletter title"
                  />
                ) : (
                  content.newsletterTitle || 'Subscribe'
                )}
              </h4>
              
              {isEditing ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={content.newsletterEnabled || false}
                      onChange={(e) => handleChange('newsletterEnabled', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm text-white">Enable newsletter</span>
                  </div>
                  <input
                    type="text"
                    value={content.newsletterPlaceholder || 'Your email'}
                    onChange={(e) => handleChange('newsletterPlaceholder', e.target.value)}
                    className="bg-transparent border border-white/30 rounded p-2 text-white w-full"
                    placeholder="Placeholder text"
                  />
                </div>
              ) : content.newsletterEnabled !== false ? (
                <div className="flex">
                  <input
                    type="email"
                    placeholder={content.newsletterPlaceholder || "Your email"}
                    className="flex-1 px-4 py-2 rounded-l-lg"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                      color: 'white',
                      borderColor: 'rgba(255, 255, 255, 0.2)'
                    }}
                  />
                  <button
                    className="px-4 py-2 rounded-r-lg"
                    style={{ 
                      backgroundColor: theme?.colors?.primary,
                      color: 'white'
                    }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              ) : null}
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="border-t mt-12 pt-8"
          style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <div className="text-center">
            <p 
              style={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: theme?.fonts?.secondary
              }}
            >
              {isEditing ? (
                <input
                  type="text"
                  value={content.copyrightText || `© ${new Date().getFullYear()} ${content.companyName}. All rights reserved.`}
                  onChange={(e) => handleChange('copyrightText', e.target.value)}
                  className="bg-transparent border border-white/30 rounded p-1 text-white text-center w-full"
                  placeholder="Copyright text"
                />
              ) : (
                content.copyrightText || `© ${new Date().getFullYear()} ${content.companyName}. All rights reserved.`
              )}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );

  const renderMinimalFooter = () => (
    <footer 
      className="py-8"
      style={{ 
        backgroundColor: theme?.colors?.surface || '#ffffff',
        borderTop: `1px solid ${theme?.colors?.border || '#e5e7eb'}`,
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo and Copyright */}
          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <input
                  type="url"
                  value={content.logo || ''}
                  onChange={(e) => handleChange('logo', e.target.value)}
                  className="w-10 h-10 border-2 border-dashed rounded-lg text-xs"
                  style={{ borderColor: `${theme?.colors?.primary}50` }}
                  placeholder="Logo URL"
                />
                <input
                  type="text"
                  value={content.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className="text-lg font-bold bg-transparent border-2 border-dashed rounded-lg p-2"
                  style={{ 
                    color: theme?.colors?.text,
                    borderColor: `${theme?.colors?.primary}50`,
                    fontFamily: theme?.fonts?.primary
                  }}
                  placeholder="Company Name"
                />
              </>
            ) : (
              <>
                {content.logo && (
                  <img src={content.logo} alt="Logo" className="w-8 h-8 object-contain" />
                )}
                <span 
                  className="text-lg font-bold"
                  style={{ 
                    color: theme?.colors?.text,
                    fontFamily: theme?.fonts?.primary
                  }}
                >
                  {content.companyName}
                </span>
              </>
            )}
          </div>
          
          {/* Links */}
          <div className="flex flex-wrap items-center gap-6">
            {content.links.slice(0, 5).map((link, index) => (
              <div key={index} className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={link.title}
                      onChange={(e) => handleLinkChange(index, 'title', e.target.value)}
                      className="bg-transparent border border-gray-300 rounded p-1 text-sm"
                      style={{ 
                        borderColor: theme?.colors?.border,
                        color: theme?.colors?.text
                      }}
                      placeholder="Link title"
                    />
                    <button
                      onClick={() => removeLink(index)}
                      className="text-xs"
                      style={{ color: theme?.colors?.error }}
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <a
                    href={link.url}
                    className="text-sm transition-colors"
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
                    {link.title}
                  </a>
                )}
              </div>
            ))}
            {isEditing && (
              <button
                onClick={addLink}
                className="text-xs"
                style={{ color: theme?.colors?.primary }}
              >
                + Add
              </button>
            )}
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-3">
            {content.socialLinks.map((social, index) => (
              <div key={index} className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={social.platform}
                      onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                      className="w-20 bg-transparent border border-gray-300 rounded p-1 text-xs"
                      style={{ 
                        borderColor: theme?.colors?.border,
                        color: theme?.colors?.text
                      }}
                      placeholder="Platform"
                    />
                    <button
                      onClick={() => removeSocialLink(index)}
                      className="text-xs"
                      style={{ color: theme?.colors?.error }}
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <a
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
                )}
              </div>
            ))}
            {isEditing && (
              <button
                onClick={addSocialLink}
                className="text-xs"
                style={{ color: theme?.colors?.primary }}
              >
                + Add
              </button>
            )}
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center mt-6">
          <p 
            className="text-sm"
            style={{ 
              color: theme?.colors?.textSecondary,
              fontFamily: theme?.fonts?.secondary
            }}
          >
            {isEditing ? (
              <input
                type="text"
                value={content.copyrightText || `© ${new Date().getFullYear()} ${content.companyName}. All rights reserved.`}
                onChange={(e) => handleChange('copyrightText', e.target.value)}
                className="bg-transparent border border-gray-300 rounded p-1 text-center w-full"
                style={{ 
                  borderColor: theme?.colors?.border,
                  color: theme?.colors?.textSecondary
                }}
                placeholder="Copyright text"
              />
            ) : (
              content.copyrightText || `© ${new Date().getFullYear()} ${content.companyName}. All rights reserved.`
            )}
          </p>
        </div>
      </div>
    </footer>
  );

  const renderMultiColumnFooter = () => (
    <footer 
      className="py-16"
      style={{ 
        backgroundColor: theme?.colors?.text || '#1f2937',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                {isEditing ? (
                  <input
                    type="url"
                    value={content.logo || ''}
                    onChange={(e) => handleChange('logo', e.target.value)}
                    className="w-12 h-12 border-2 border-dashed rounded-lg text-xs text-white"
                    style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
                    placeholder="Logo URL"
                  />
                ) : content.logo ? (
                  <img src={content.logo} alt="Logo" className="w-10 h-10 object-contain" />
                ) : null}
                
                {isEditing ? (
                  <input
                    type="text"
                    value={content.companyName}
                    onChange={(e) => handleChange('companyName', e.target.value)}
                    className="text-xl font-bold bg-transparent border-2 border-dashed rounded-lg p-2 text-white"
                    style={{ 
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      fontFamily: theme?.fonts?.primary
                    }}
                    placeholder="Company Name"
                  />
                ) : (
                  <h3 
                    className="text-xl font-bold"
                    style={{ 
                      color: theme?.colors?.surface || '#ffffff',
                      fontFamily: theme?.fonts?.primary
                    }}
                  >
                    {content.companyName}
                  </h3>
                )}
              </div>
              
              {isEditing ? (
                <textarea
                  value={content.description || ''}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="mb-6 bg-transparent border-2 border-dashed rounded-lg p-2 w-full h-24 resize-none text-white"
                  style={{ 
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    fontFamily: theme?.fonts?.secondary
                  }}
                  placeholder="Company description"
                />
              ) : (
                <p 
                  className="mb-6"
                  style={{ 
                    color: `rgba(255, 255, 255, 0.7)`,
                    fontFamily: theme?.fonts?.secondary
                  }}
                >
                  {content.description || 'Building beautiful websites made simple.'}
                </p>
              )}
              
              {/* Social Links */}
              <div className="flex flex-wrap gap-3">
                {content.socialLinks.map((social, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={social.platform}
                          onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                          className="flex-1 bg-transparent border border-white/30 rounded p-1 text-sm text-white"
                          placeholder="Platform"
                        />
                        <input
                          type="url"
                          value={social.url}
                          onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                          className="flex-1 bg-transparent border border-white/30 rounded p-1 text-sm text-white"
                          placeholder="URL"
                        />
                        <button
                          onClick={() => removeSocialLink(index)}
                          className="w-4 h-4 text-white rounded-full flex items-center justify-center text-xs"
                          style={{ backgroundColor: theme?.colors?.error }}
                        >
                          <X className="w-2 h-2" />
                        </button>
                      </>
                    ) : (
                      <a
                        href={social.url}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        }}
                      >
                        {getSocialIcon(social.platform)}
                      </a>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <button
                    onClick={addSocialLink}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: theme?.colors?.primary }}
                  >
                    <Plus className="w-4 h-4" />
                    Add Social
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Columns */}
          {content.columns?.map((column, columnIndex) => (
            <div key={columnIndex}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + (columnIndex * 0.1) }}
                viewport={{ once: true }}
              >
                <h4 
                  className="text-lg font-semibold mb-4"
                  style={{ 
                    color: theme?.colors?.surface || '#ffffff',
                    fontFamily: theme?.fonts?.primary
                  }}
                >
                  {isEditing ? (
                    <input
                      type="text"
                      value={column.title}
                      onChange={(e) => handleColumnTitleChange(columnIndex, e.target.value)}
                      className="bg-transparent border border-white/30 rounded p-1 text-white"
                      placeholder="Column title"
                    />
                  ) : (
                    column.title
                  )}
                </h4>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="flex items-center gap-2">
                      {isEditing ? (
                        <>
                          <input
                            type="text"
                            value={link.title}
                            onChange={(e) => handleColumnLinkChange(columnIndex, linkIndex, 'title', e.target.value)}
                            className="flex-1 bg-transparent border border-white/30 rounded p-1 text-sm text-white"
                            placeholder="Link title"
                          />
                          <input
                            type="url"
                            value={link.url}
                            onChange={(e) => handleColumnLinkChange(columnIndex, linkIndex, 'url', e.target.value)}
                            className="flex-1 bg-transparent border border-white/30 rounded p-1 text-sm text-white"
                            placeholder="URL"
                          />
                          <button
                            onClick={() => removeColumnLink(columnIndex, linkIndex)}
                            className="w-4 h-4 text-white rounded-full flex items-center justify-center text-xs"
                            style={{ backgroundColor: theme?.colors?.error }}
                          >
                            <X className="w-2 h-2" />
                          </button>
                        </>
                      ) : (
                        <a
                          href={link.url}
                          className="transition-colors group flex items-center gap-1"
                          style={{ 
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontFamily: theme?.fonts?.secondary
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = theme?.colors?.surface || '#ffffff';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                          }}
                        >
                          <ArrowRight className="w-3 h-3 opacity-0 -ml-4 transition-all group-hover:opacity-100 group-hover:ml-0" />
                          {link.title}
                        </a>
                      )}
                    </li>
                  ))}
                  {isEditing && (
                    <li>
                      <button
                        onClick={() => addColumnLink(columnIndex)}
                        className="flex items-center gap-2 text-sm"
                        style={{ color: theme?.colors?.primary }}
                      >
                        <Plus className="w-4 h-4" />
                        Add Link
                      </button>
                    </li>
                  )}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div 
          className="border-t mt-12 pt-8"
          style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p 
              style={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: theme?.fonts?.secondary
              }}
            >
              {isEditing ? (
                <input
                  type="text"
                  value={content.copyrightText || `© ${new Date().getFullYear()} ${content.companyName}. All rights reserved.`}
                  onChange={(e) => handleChange('copyrightText', e.target.value)}
                  className="bg-transparent border border-white/30 rounded p-1 text-white w-full md:w-auto"
                  placeholder="Copyright text"
                />
              ) : (
                content.copyrightText || `© ${new Date().getFullYear()} ${content.companyName}. All rights reserved.`
              )}
            </p>
            
            {/* Additional Links */}
            <div className="flex flex-wrap items-center gap-4">
              {content.links.slice(0, 3).map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-sm transition-colors"
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontFamily: theme?.fonts?.secondary
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = theme?.colors?.surface || '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                  }}
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  const renderNewsletterFooter = () => (
    <footer 
      className="py-16"
      style={{ 
        backgroundColor: theme?.colors?.text || '#1f2937',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div 
          className="rounded-2xl p-8 mb-12"
          style={{ 
            background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
            boxShadow: theme?.shadows?.lg
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 
                className="text-2xl font-bold mb-4 text-white"
                style={{ fontFamily: theme?.fonts?.primary }}
              >
                {isEditing ? (
                  <input
                    type="text"
                    value={content.newsletterTitle || 'Subscribe to our newsletter'}
                    onChange={(e) => handleChange('newsletterTitle', e.target.value)}
                    className="bg-transparent border-2 border-dashed border-white/50 rounded-lg p-2 w-full text-white"
                    placeholder="Newsletter title"
                  />
                ) : (
                  content.newsletterTitle || 'Subscribe to our newsletter'
                )}
              </h3>
              <p 
                className="text-white text-opacity-90"
                style={{ fontFamily: theme?.fonts?.secondary }}
              >
                Stay updated with our latest news, updates, and offers.
              </p>
            </div>
            <div>
              <div className="flex">
                <input
                  type="email"
                  placeholder={content.newsletterPlaceholder || "Your email address"}
                  className="flex-1 px-4 py-3 rounded-l-lg"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    fontFamily: theme?.fonts?.secondary
                  }}
                />
                <button
                  className="px-6 py-3 rounded-r-lg font-medium"
                  style={{ 
                    backgroundColor: 'white',
                    color: theme?.colors?.primary,
                    fontFamily: theme?.fonts?.accent
                  }}
                >
                  Subscribe
                </button>
              </div>
              {isEditing && (
                <input
                  type="text"
                  value={content.newsletterPlaceholder || 'Your email address'}
                  onChange={(e) => handleChange('newsletterPlaceholder', e.target.value)}
                  className="mt-2 bg-transparent border border-white/30 rounded p-1 text-white w-full"
                  placeholder="Placeholder text"
                />
              )}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                {isEditing ? (
                  <input
                    type="url"
                    value={content.logo || ''}
                    onChange={(e) => handleChange('logo', e.target.value)}
                    className="w-12 h-12 border-2 border-dashed rounded-lg text-xs text-white"
                    style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
                    placeholder="Logo URL"
                  />
                ) : content.logo ? (
                  <img src={content.logo} alt="Logo" className="w-10 h-10 object-contain" />
                ) : null}
                
                {isEditing ? (
                  <input
                    type="text"
                    value={content.companyName}
                    onChange={(e) => handleChange('companyName', e.target.value)}
                    className="text-xl font-bold bg-transparent border-2 border-dashed rounded-lg p-2 text-white"
                    style={{ 
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      fontFamily: theme?.fonts?.primary
                    }}
                    placeholder="Company Name"
                  />
                ) : (
                  <h3 
                    className="text-xl font-bold"
                    style={{ 
                      color: theme?.colors?.surface || '#ffffff',
                      fontFamily: theme?.fonts?.primary
                    }}
                  >
                    {content.companyName}
                  </h3>
                )}
              </div>
              
              {isEditing ? (
                <textarea
                  value={content.description || ''}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="mb-6 bg-transparent border-2 border-dashed rounded-lg p-2 w-full h-24 resize-none text-white"
                  style={{ 
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    fontFamily: theme?.fonts?.secondary
                  }}
                  placeholder="Company description"
                />
              ) : (
                <p 
                  className="mb-6"
                  style={{ 
                    color: `rgba(255, 255, 255, 0.7)`,
                    fontFamily: theme?.fonts?.secondary
                  }}
                >
                  {content.description || 'Building beautiful websites made simple.'}
                </p>
              )}
              
              {/* Contact Info */}
              {(content.contactInfo || isEditing) && (
                <div className="space-y-3 mb-6">
                  {isEditing ? (
                    <>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-white opacity-70" />
                        <input
                          type="email"
                          value={content.contactInfo?.email || ''}
                          onChange={(e) => handleChange('contactInfo', { ...content.contactInfo, email: e.target.value })}
                          className="bg-transparent border border-white/30 rounded p-1 text-sm text-white"
                          placeholder="Email address"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-white opacity-70" />
                        <input
                          type="tel"
                          value={content.contactInfo?.phone || ''}
                          onChange={(e) => handleChange('contactInfo', { ...content.contactInfo, phone: e.target.value })}
                          className="bg-transparent border border-white/30 rounded p-1 text-sm text-white"
                          placeholder="Phone number"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-white opacity-70" />
                        <input
                          type="text"
                          value={content.contactInfo?.address || ''}
                          onChange={(e) => handleChange('contactInfo', { ...content.contactInfo, address: e.target.value })}
                          className="bg-transparent border border-white/30 rounded p-1 text-sm text-white"
                          placeholder="Address"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {content.contactInfo?.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-white opacity-70" />
                          <span 
                            className="text-sm"
                            style={{ 
                              color: 'rgba(255, 255, 255, 0.7)',
                              fontFamily: theme?.fonts?.secondary
                            }}
                          >
                            {content.contactInfo.email}
                          </span>
                        </div>
                      )}
                      {content.contactInfo?.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-white opacity-70" />
                          <span 
                            className="text-sm"
                            style={{ 
                              color: 'rgba(255, 255, 255, 0.7)',
                              fontFamily: theme?.fonts?.secondary
                            }}
                          >
                            {content.contactInfo.phone}
                          </span>
                        </div>
                      )}
                      {content.contactInfo?.address && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-white opacity-70" />
                          <span 
                            className="text-sm"
                            style={{ 
                              color: 'rgba(255, 255, 255, 0.7)',
                              fontFamily: theme?.fonts?.secondary
                            }}
                          >
                            {content.contactInfo.address}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </motion.div>
          </div>

          {/* Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 
                className="text-lg font-semibold mb-4"
                style={{ 
                  color: theme?.colors?.surface || '#ffffff',
                  fontFamily: theme?.fonts?.primary
                }}
              >
                Quick Links
              </h4>
              <ul className="space-y-2">
                {content.links.map((link, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={link.title}
                          onChange={(e) => handleLinkChange(index, 'title', e.target.value)}
                          className="flex-1 bg-transparent border border-white/30 rounded p-1 text-sm text-white"
                          placeholder="Link title"
                        />
                        <input
                          type="url"
                          value={link.url}
                          onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                          className="flex-1 bg-transparent border border-white/30 rounded p-1 text-sm text-white"
                          placeholder="URL"
                        />
                        <button
                          onClick={() => removeLink(index)}
                          className="w-4 h-4 text-white rounded-full flex items-center justify-center text-xs"
                          style={{ backgroundColor: theme?.colors?.error }}
                        >
                          <X className="w-2 h-2" />
                        </button>
                      </>
                    ) : (
                      <a
                        href={link.url}
                        className="transition-colors group flex items-center gap-1"
                        style={{ 
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontFamily: theme?.fonts?.secondary
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = theme?.colors?.surface || '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                        }}
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 -ml-4 transition-all group-hover:opacity-100 group-hover:ml-0" />
                        {link.title}
                      </a>
                    )}
                  </li>
                ))}
                {isEditing && (
                  <li>
                    <button
                      onClick={addLink}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: theme?.colors?.primary }}
                    >
                      <Plus className="w-4 h-4" />
                      Add Link
                    </button>
                  </li>
                )}
              </ul>
            </motion.div>
          </div>

          {/* Social Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 
                className="text-lg font-semibold mb-4"
                style={{ 
                  color: theme?.colors?.surface || '#ffffff',
                  fontFamily: theme?.fonts?.primary
                }}
              >
                Follow Us
              </h4>
              <div className="flex flex-wrap gap-3">
                {content.socialLinks.map((social, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={social.platform}
                          onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                          className="flex-1 bg-transparent border border-white/30 rounded p-1 text-sm text-white"
                          placeholder="Platform"
                        />
                        <input
                          type="url"
                          value={social.url}
                          onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                          className="flex-1 bg-transparent border border-white/30 rounded p-1 text-sm text-white"
                          placeholder="URL"
                        />
                        <button
                          onClick={() => removeSocialLink(index)}
                          className="w-4 h-4 text-white rounded-full flex items-center justify-center text-xs"
                          style={{ backgroundColor: theme?.colors?.error }}
                        >
                          <X className="w-2 h-2" />
                        </button>
                      </>
                    ) : (
                      <a
                        href={social.url}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        }}
                      >
                        {getSocialIcon(social.platform)}
                      </a>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <button
                    onClick={addSocialLink}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: theme?.colors?.primary }}
                  >
                    <Plus className="w-4 h-4" />
                    Add Social
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="border-t mt-12 pt-8"
          style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <div className="text-center">
            <p 
              style={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: theme?.fonts?.secondary
              }}
            >
              {isEditing ? (
                <input
                  type="text"
                  value={content.copyrightText || `© ${new Date().getFullYear()} ${content.companyName}. All rights reserved.`}
                  onChange={(e) => handleChange('copyrightText', e.target.value)}
                  className="bg-transparent border border-white/30 rounded p-1 text-white text-center w-full"
                  placeholder="Copyright text"
                />
              ) : (
                content.copyrightText || `© ${new Date().getFullYear()} ${content.companyName}. All rights reserved.`
              )}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );

  // Initialize default content if needed
  React.useEffect(() => {
    if (variant === 'footer-multi-column' && !content.columns) {
      handleChange('columns', [
        {
          title: 'Products',
          links: [
            { title: 'Features', url: '#' },
            { title: 'Pricing', url: '#' },
            { title: 'Testimonials', url: '#' }
          ]
        },
        {
          title: 'Resources',
          links: [
            { title: 'Documentation', url: '#' },
            { title: 'Guides', url: '#' },
            { title: 'Support', url: '#' }
          ]
        }
      ]);
    }
    
    if (variant === 'footer-newsletter' && !content.newsletterTitle) {
      handleChange('newsletterTitle', 'Subscribe to our newsletter');
      handleChange('newsletterPlaceholder', 'Your email address');
      handleChange('newsletterEnabled', true);
    }
    
    if (!content.contactInfo) {
      handleChange('contactInfo', {
        email: 'hello@example.com',
        phone: '+1 (555) 123-4567'
      });
    }
    
    if (!content.description) {
      handleChange('description', 'Building beautiful websites made simple with our powerful drag-and-drop builder.');
    }
  }, [variant]);

  switch (variant) {
    case 'footer-minimal':
      return renderMinimalFooter();
    case 'footer-newsletter':
      return renderNewsletterFooter();
    case 'footer-multi-column':
      return renderMultiColumnFooter();
    default:
      return renderComprehensiveFooter();
  }
};

export default FooterSection;