Here's the fixed version with all missing closing brackets added:

```typescript
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';

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

interface ContactSectionProps {
  content: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    address?: string;
    mapUrl?: string;
    formTitle?: string;
    formSubtitle?: string;
    submitButtonText?: string;
    socialLinks?: { platform: string; url: string }[];
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
  variant?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ 
  content, 
  isEditing, 
  onChange, 
  theme,
  variant = 'contact-form'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    onChange({ ...content, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  // Initialize default content if needed
  RL=y)eml =muomoy
e => h{     mot5
oldFmtssor eTitle) {
      handleChange('formTitle', 'Send Us a Message');
    }
    if (!content.formSubtitle) {
      handleChange('formSubtitle', 'Fill out the form below and we\'ll get back to you as soon as possible.');
    }
    if (!content.submitButtonText) {
      handleChange('submitButtonText', 'Send Message');
    }
    if (variant === 'contact-map' && !content.mapUrl) {
      handleChange('mapUrl', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910525!2d-74.25986432970718!3d40.697149422113014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sca!4v1627325404342!5m2!1sen!2sca');
    }
  }, [variant]);

  switch (variant) {
    case 'contact-map':
      return renderContactMap();
    case 'contact-cta':
      return renderCtaContact();
    default:
      return renderContactForm();
  }
};

export default ContactSection;
```