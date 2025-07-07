import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, ChevronRight, Heart, ArrowRight } from 'lucide-react';
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

interface FooterSectionProps {
  content: {
    companyName: string;
    logo?: string;
    description?: string;
    links: { title: string; url: string }[];
    socialLinks: { platform: string; url: string }[];
    contactInfo?: { 
      address?: string;
      phone?: string;
      email?: string;
    };
    copyright?: string;
    newsletterEnabled?: boolean;
    newsletterTitle?: string;
    newsletterSubtitle?: string;
    linkGroups?: {
      title: string;
      links: { title: string; url: string }[];
    }[];
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
  variant?: string;
}

const FooterSection: React.FC<FooterSectionProps> = ({ 
  content, 
  isEditing, 
  onChange, 
  theme,
  variant = 'footer-comprehensive'
}) => {
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

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return <Facebook className="w-5 h-5" />;
      case 'twitter': return <Twitter className="w-5 h-5" />;
      case 'instagram': return <Instagram className="w-5 h-5" />;
      case 'linkedin': return <Linkedin className="w-5 h-5" />;
      case 'youtube': return <Youtube className="w-5 h-5" />;
      default: return null;
    }
  };

  // Comprehensive Footer
  const renderComprehensiveFooter = () => (
    <footer 
      style={{ 
        backgroundColor: theme?.colors?.text || '#1f2937',
        color: '#ffffff',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              {isEditing ? (
                <ImageUpload
                  value={content.logo || ''}
                  onChange={(url) => handleChange('logo', url)}
                  placeholder="Add logo"
                  className="w-10 h-10"
                  theme={theme}
                />
              ) : content.logo ? (
                <img src={content.logo} alt={content.companyName} className="w-10 h-10 object-contain" />
              ) : null}
              
              {isEditing ? (
                <input
                  type="text"
                  value={content.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className="text-xl font-bold bg-transparent border-2 border-dashed rounded-lg p-2 text-white border-white/50"
                  placeholder="Company name"
                />
              ) : (
                <h3 
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: theme?.fonts?.primary }}
                >
                  {content.companyName}
                </h3>
              )}
            </div>
            
            {isEditing ? (
              <textarea
                value={content.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                className="text-gray-400 mb-6 bg-transparent border-2 border-dashed rounded-lg p-2 w-full h-24 resize-none border-white/50"
                style={{ fontFamily: theme?.fonts?.secondary }}
                placeholder="Company description"
              />
            ) : content.description ? (
              <p 
                className="text-gray-400 mb-6"
                style={{ fontFamily: theme?.fonts?.secondary }}
              >
                {content.description}
              </p>
            ) : null}
            
            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {isEditing ? (
                <div className="space-y-2 w-full">
                  {content.socialLinks.map((social, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <select
                        value={social.platform}
                        onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                        className="bg-transparent border border-white/30 rounded text-white p-1 text-sm"
                      >
                        <option value="Facebook">Facebook</option>
                        <option value="Twitter">Twitter</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Linkedin">LinkedIn</option>
                        <option value="Youtube">YouTube</option>
                      </select>
                      <input
                        type="url"
                        value={social.url}
                        onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                        className="bg-transparent border border-white/30 rounded text-white p-1 text-sm flex-1"
                        placeholder="https://"
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => handleChange('socialLinks', [...content.socialLinks, { platform: 'Facebook', url: 'https://facebook.com' }])}
                    className="px-3 py-1 bg-white/20 text-white rounded-lg text-sm"
                  >
                    + Add Social Link
                  </button>
                </div>
              ) : (
                content.socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: '#ffffff'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = theme?.colors?.primary || '#3b82f6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                ))
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 
              className="text-lg font-semibold mb-4 text-white"
              style={{ fontFamily: theme?.fonts?.primary }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {isEditing ? (
                <div className="space-y-2">
                  {content.links.slice(0, 6).map((link, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={link.title}
                        onChange={(e) => handleLinkChange(index, 'title', e.target.value)}
                        className="bg-transparent border border-white/30 rounded text-white p-1 text-sm"
                        placeholder="Link title"
                      />
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                        className="bg-transparent border border-white/30 rounded text-white p-1 text-sm w-16"
                        placeholder="URL"
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => handleChange('links', [...content.links, { title: 'New Link', url: '#' }])}
                    className="px-3 py-1 bg-white/20 text-white rounded-lg text-sm"
                  >
                    + Add Link
                  </button>
                </div>
              ) : (
                content.links.slice(0, 6).map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.url}
                      className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                      style={{ fontFamily: theme?.fonts?.secondary }}
                    >
                      <ChevronRight className="w-4 h-4" style={{ color: theme?.colors?.primary }} />
                      {link.title}
                    </a>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 
              className="text-lg font-semibold mb-4 text-white"
              style={{ fontFamily: theme?.fonts?.primary }}
            >
              Contact Us
            </h4>
            <ul className="space-y-4">
              {isEditing ? (
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Address</label>
                    <input
                      type="text"
                      value={content.contactInfo?.address || ''}
                      onChange={(e) => handleChange('contactInfo', { ...content.contactInfo, address: e.target.value })}
                      className="bg-transparent border border-white/30 rounded text-white p-2 text-sm w-full"
                      placeholder="123 Main St, City, State"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Phone</label>
                    <input
                      type="tel"
                      value={content.contactInfo?.phone || ''}
                      onChange={(e) => handleChange('contactInfo', { ...content.contactInfo, phone: e.target.value })}
                      className="bg-transparent border border-white/30 rounded text-white p-2 text-sm w-full"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Email</label>
                    <input
                      type="email"
                      value={content.contactInfo?.email || ''}
                      onChange={(e) => handleChange('contactInfo', { ...content.contactInfo, email: e.target.value })}
                      className="bg-transparent border border-white/30 rounded text-white p-2 text-sm w-full"
                      placeholder="contact@example.com"
                    />
                  </div>
                </div>
              ) : (
                <>
                  {content.contactInfo?.address && (
                    <li className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 mt-1" style={{ color: theme?.colors?.primary }} />
                      <span 
                        className="text-gray-400"
                        style={{ fontFamily: theme?.fonts?.secondary }}
                      >
                        {content.contactInfo.address}
                      </span>
                    </li>
                  )}
                  {content.contactInfo?.phone && (
                    <li className="flex items-center gap-3">
                      <Phone className="w-5 h-5" style={{ color: theme?.colors?.primary }} />
                      <span 
                        className="text-gray-400"
                        style={{ fontFamily: theme?.fonts?.secondary }}
                      >
                        {content.contactInfo.phone}
                      </span>
                    </li>
                  )}
                  {content.contactInfo?.email && (
                    <li className="flex items-center gap-3">
                      <Mail className="w-5 h-5" style={{ color: theme?.colors?.primary }} />
                      <span 
                        className="text-gray-400"
                        style={{ fontFamily: theme?.fonts?.secondary }}
                      >
                        {content.contactInfo.email}
                      </span>
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>

          {/* Newsletter */}
          {content.newsletterEnabled && (
            <div>
              <h4 
                className="text-lg font-semibold mb-4 text-white"
                style={{ fontFamily: theme?.fonts?.primary }}
              >
                {isEditing ? (
                  <input
                    type="text"
                    value={content.newsletterTitle || 'Newsletter'}
                    onChange={(e) => handleChange('newsletterTitle', e.target.value)}
                    className="bg-transparent border border-white/30 rounded text-white p-2 text-lg w-full"
                    placeholder="Newsletter Title"
                  />
                ) : (
                  content.newsletterTitle || 'Newsletter'
                )}
              </h4>
              
              {isEditing ? (
                <textarea
                  value={content.newsletterSubtitle || 'Subscribe to our newsletter for updates'}
                  onChange={(e) => handleChange('newsletterSubtitle', e.target.value)}
                  className="text-gray-400 mb-4 bg-transparent border border-white/30 rounded p-2 w-full h-20 resize-none"
                  placeholder="Newsletter subtitle"
                />
              ) : (
                <p 
                  className="text-gray-400 mb-4"
                  style={{ fontFamily: theme?.fonts?.secondary }}
                >
                  {content.newsletterSubtitle || 'Subscribe to our newsletter for updates'}
                </p>
              )}
              
              <form className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="px-4 py-3 rounded-l-lg w-full"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      border: 'none',
                      fontFamily: theme?.fonts?.secondary
                    }}
                  />
                  <button
                    type="submit"
                    className="px-4 py-3 rounded-r-lg text-white"
                    style={{ 
                      backgroundColor: theme?.colors?.primary,
                      fontFamily: theme?.fonts?.secondary
                    }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
                <p 
                  className="text-xs text-gray-500"
                  style={{ fontFamily: theme?.fonts?.secondary }}
                >
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          )}
        </div>

        {/* Copyright */}
        <div 
          className="border-t mt-12 pt-8 text-center text-gray-400"
          style={{ 
            borderColor: 'rgba(255, 255, 255, 0.1)',
            fontFamily: theme?.fonts?.secondary
          }}
        >
          {isEditing ? (
            <input
              type="text"
              value={content.copyright || `© ${new Date().getFullYear()} ${content.companyName}. All rights reserved.`}
              onChange={(e) => handleChange('copyright', e.target.value)}
              className="bg-transparent border border-white/30 rounded text-gray-400 p-2 text-sm w-full text-center"
              placeholder="Copyright text"
            />
          ) : (
            <p>
              {content.copyright || `© ${new Date().getFullYear()} ${content.companyName}. All rights reserved.`}
            </p>
          )}
        </div>
      </div>
    </footer>
  );

  // Minimal Footer
  const renderMinimalFooter = () => (
    <footer 
      className="py-8"
      style={{ 
        backgroundColor: theme?.colors?.surface || '#ffffff',
        borderTop: `1px solid ${theme?.colors?.border}`,
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {isEditing ? (
              <ImageUpload
                value={content.logo || ''}
                onChange={(url) => handleChange('logo', url)}
                placeholder="Add logo"
                className="w-8 h-8"
                theme={theme}
              />
            ) : content.logo ? (
              <img src={content.logo} alt={content.companyName} className="w-8 h-8 object-contain" />
            ) : null}
            
            {isEditing ? (
              <input
                type="text"
                value={content.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="text-sm font-semibold bg-transparent border-2 border-dashed rounded-lg p-1"
                style={{ 
                  color: theme?.colors?.text,
                  borderColor: `${theme?.colors?.primary}50`,
                  fontFamily: theme?.fonts?.primary
                }}
                placeholder="Company name"
              />
            ) : (
              <span 
                className="text-sm font-semibold"
                style={{ 
                  color: theme?.colors?.text,
                  fontFamily: theme?.fonts?.primary
                }}
              >
                {content.companyName}
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {isEditing ? (
              <div className="flex flex-wrap gap-2">
                {content.links.slice(0, 5).map((link, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <input
                      type="text"
                      value={link.title}
                      onChange={(e) => handleLinkChange(index, 'title', e.target.value)}
                      className="bg-transparent border rounded px-2 py-1 text-sm"
                      style={{ 
                        borderColor: theme?.colors?.border,
                        color: theme?.colors?.text
                      }}
                      placeholder="Link title"
                    />
                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                      className="bg-transparent border rounded px-2 py-1 text-sm w-12"
                      style={{ 
                        borderColor: theme?.colors?.border,
                        color: theme?.colors?.textSecondary
                      }}
                      placeholder="URL"
                    />
                  </div>
                ))}
              </div>
            ) : (
              content.links.slice(0, 5).map((link, index) => (
                <a
                  key={index}
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
              ))
            )}
          </div>
          
          <div className="flex gap-3">
            {isEditing ? (
              <div className="flex flex-wrap gap-2">
                {content.socialLinks.slice(0, 4).map((social, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <select
                      value={social.platform}
                      onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                      className="bg-transparent border rounded px-2 py-1 text-sm"
                      style={{ 
                        borderColor: theme?.colors?.border,
                        color: theme?.colors?.text
                      }}
                    >
                      <option value="Facebook">Facebook</option>
                      <option value="Twitter">Twitter</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Linkedin">LinkedIn</option>
                      <option value="Youtube">YouTube</option>
                    </select>
                  </div>
                ))}
              </div>
            ) : (
              content.socialLinks.slice(0, 4).map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ 
                    backgroundColor: `${theme?.colors?.primary}15`,
                    color: theme?.colors?.primary
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme?.colors?.primary || '#3b82f6';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${theme?.colors?.primary}15`;
                    e.currentTarget.style.color = theme?.colors?.primary || '#3b82f6';
                  }}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))
            )}
          </div>
        </div>
        
        <div 
          className="text-center text-xs mt-6"
          style={{ 
            color: theme?.colors?.textSecondary,
            fontFamily: theme?.fonts?.secondary
          }}
        >
          {isEditing ? (
            <input
              type="text"
              value={content.copyright || `© ${new Date().getFullYear()} ${content.companyName}. All rights reserved.`}
              onChange={(e) => handleChange('copyright', e.target.value)}
              className="bg-transparent border-2 border-dashed rounded-lg p-1 text-center w-full"
              style={{ 
                color: theme?.colors?.textSecondary,
                borderColor: `${theme?.colors?.primary}50`,
                fontFamily: theme?.fonts?.secondary
              }}
              placeholder="Copyright text"
            />
          ) : (
            <p>{content.copyright || `© ${new Date().getFullYear()} ${content.companyName}. All rights reserved.`}</p>
          )}
        </div>
      </div>
    </footer>
  );

  // Social Footer
  const renderSocialFooter = () => (
    <footer 
      className="py-12"
      style={{ 
        backgroundColor: theme?.colors?.surface || '#ffffff',
        borderTop: `1px solid ${theme?.colors?.border}`,
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          {isEditing ? (
            <ImageUpload
              value={content.logo || ''}
              onChange={(url) => handleChange('logo', url)}
              placeholder="Add logo"
              className="w-10 h-10"
              theme={theme}
            />
          ) : content.logo ? (
            <img src={content.logo} alt={content.companyName} className="w-10 h-10 object-contain" />
          ) : null}
          
          {isEditing ? (
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
              placeholder="Company name"
            />
          ) : (
            <h3 
              className="text-xl font-bold"
              style={{ 
                color: theme?.colors?.primary,
                fontFamily: theme?.fonts?.primary
              }}
            >
              {content.companyName}
            </h3>
          )}
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {isEditing ? (
            <div className="flex flex-wrap gap-2 justify-center">
              {content.links.slice(0, 6).map((link, index) => (
                <div key={index} className="flex items-center gap-1">
                  <input
                    type="text"
                    value={link.title}
                    onChange={(e) => handleLinkChange(index, 'title', e.target.value)}
                    className="bg-transparent border rounded px-2 py-1 text-sm"
                    style={{ 
                      borderColor: theme?.colors?.border,
                      color: theme?.colors?.text
                    }}
                    placeholder="Link title"
                  />
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                    className="bg-transparent border rounded px-2 py-1 text-sm w-12"
                    style={{ 
                      borderColor: theme?.colors?.border,
                      color: theme?.colors?.textSecondary
                    }}
                    placeholder="URL"
                  />
                </div>
              ))}
              <button
                onClick={() => handleChange('links', [...content.links, { title: 'New Link', url: '#' }])}
                className="px-3 py-1 rounded-lg transition-colors text-sm"
                style={{ 
                  backgroundColor: `${theme?.colors?.primary}15`,
                  color: theme?.colors?.primary
                }}
              >
                + Add Link
              </button>
            </div>
          ) : (
            content.links.slice(0, 6).map((link, index) => (
              <a
                key={index}
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
            ))
          )}
        </div>
        
        <div className="flex justify-center gap-4 mb-8">
          {isEditing ? (
            <div className="flex flex-wrap gap-2 justify-center">
              {content.socialLinks.map((social, index) => (
                <div key={index} className="flex items-center gap-1">
                  <select
                    value={social.platform}
                    onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                    className="bg-transparent border rounded px-2 py-1 text-sm"
                    style={{ 
                      borderColor: theme?.colors?.border,
                      color: theme?.colors?.text
                    }}
                  >
                    <option value="Facebook">Facebook</option>
                    <option value="Twitter">Twitter</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Linkedin">LinkedIn</option>
                    <option value="Youtube">YouTube</option>
                  </select>
                  <input
                    type="url"
                    value={social.url}
                    onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                    className="bg-transparent border rounded px-2 py-1 text-sm w-24"
                    style={{ 
                      borderColor: theme?.colors?.border,
                      color: theme?.colors?.textSecondary
                    }}
                    placeholder="URL"
                  />
                </div>
              ))}
              <button
                onClick={() => handleChange('socialLinks', [...content.socialLinks, { platform: 'Facebook', url: 'https://facebook.com' }])}
                className="px-3 py-1 rounded-lg transition-colors text-sm"
                style={{ 
                  backgroundColor: `${theme?.colors?.primary}15`,
                  color: theme?.colors?.primary
                }}
              >
                + Add Social
              </button>
            </div>
          ) : (
            content.socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                style={{ 
                  backgroundColor: `${theme?.colors?.primary}15`,
                  color: theme?.colors?.primary
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme?.colors?.primary || '#3b82f6';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = `${theme?.colors?.primary}15`;
                  e.currentTarget.style.color = theme?.colors?.primary || '#3b82f6';
                }}
              >
                {getSocialIcon(social.platform)}
              </motion.a>
            ))
          )}
        </div>
        
        <div 
          className="text-sm"
          style={{ 
            color: theme?.colors?.textSecondary,
            fontFamily: theme?.fonts?.secondary
          }}
        >
          {isEditing ? (
            <input
              type="text"
              value={content.copyright || `© ${new Date().getFullYear()} ${content.companyName}. All rights reserved.`}
              onChange={(e) => handleChange('copyright', e.target.value)}
              className="bg-transparent border-2 border-dashed rounded-lg p-1 text-center w-full mb-2"
              style={{ 
                color: theme?.colors?.textSecondary,
                borderColor: `${theme?.colors?.primary}50`,
                fontFamily: theme?.fonts?.secondary
              }}
              placeholder="Copyright text"
            />
          ) : (
            <p className="mb-2">{content.copyright || `© ${new Date().getFullYear()} ${content.companyName}. All rights reserved.`}</p>
          )}
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4" style={{ color: theme?.colors?.error }} /> by {content.companyName}
          </p>
        </div>
      </div>
    </footer>
  );

  // Initialize default content if needed
  React.useEffect(() => {
    if (variant === 'footer-newsletter' && !content.newsletterEnabled) {
      handleChange('newsletterEnabled', true);
      handleChange('newsletterTitle', 'Stay Updated');
      handleChange('newsletterSubtitle', 'Subscribe to our newsletter for the latest news and updates');
    }
    
    if (variant === 'footer-corporate' && !content.linkGroups) {
      handleChange('linkGroups', [
        {
          title: 'Company',
          links: [
            { title: 'About Us', url: '#about' },
            { title: 'Careers', url: '#careers' },
            { title: 'News', url: '#news' },
            { title: 'Contact', url: '#contact' }
          ]
        },
        {
          title: 'Services',
          links: [
            { title: 'Web Design', url: '#web-design' },
            { title: 'Development', url: '#development' },
            { title: 'Marketing', url: '#marketing' },
            { title: 'Consulting', url: '#consulting' }
          ]
        },
        {
          title: 'Legal',
          links: [
            { title: 'Privacy Policy', url: '#privacy' },
            { title: 'Terms of Service', url: '#terms' },
            { title: 'Cookie Policy', url: '#cookies' }
          ]
        }
      ]);
    }
    
    // Ensure contact info exists
    if (!content.contactInfo) {
      handleChange('contactInfo', {
        address: '123 Main Street, City, Country',
        phone: '+1 (555) 123-4567',
        email: 'info@example.com'
      });
    }
  }, [variant]);

  switch (variant) {
    case 'footer-minimal':
      return renderMinimalFooter();
    case 'footer-social':
      return renderSocialFooter();
    default:
      return renderComprehensiveFooter();
  }
};

export default FooterSection;