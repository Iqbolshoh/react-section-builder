import { renderToStaticMarkup } from 'react-dom/server';

interface Project {
    id: string;
    name: string;
    sections: Section[];
}

interface Section {
    id: string;
    type: string;
    content: any;
    order: number;
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

export const generateCompleteHTML = (project: Project, theme: ThemeConfig): string => {
    const sectionsHTML = project.sections
        .sort((a, b) => a.order - b.order)
        .map(section => generateSectionHTML(section, theme))
        .join('\n');

    const fontFamilies = Object.values(theme.fonts);
    const fontImports = fontFamilies.map(font =>
        `family=${font.replace(' ', '+')}:wght@300;400;500;600;700;800;900`
    ).join('&');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${project.name}</title>
    <meta name="description" content="Professional website built with templates.uz">
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?${fontImports}&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS -->
    <meta name="description" content="Professional website built with templates.uz">
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?${fontImports}&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio"></script>
    
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Custom Styles -->
    <style>
        :root {
            /* Theme Colors */
            --color-primary: ${theme.colors.primary};
            --color-secondary: ${theme.colors.secondary};
            --color-accent: ${theme.colors.accent};
            --color-background: ${theme.colors.background};
            --color-surface: ${theme.colors.surface};
            --color-text: ${theme.colors.text};
            --color-text-secondary: ${theme.colors.textSecondary};
            --color-border: ${theme.colors.border};
            --color-success: ${theme.colors.success};
            --color-warning: ${theme.colors.warning || '#f59e0b'};
            --color-error: ${theme.colors.error || '#ef4444'};
            --color-primary-100: ${theme.colors.primary100 || '#e0f2fe'};
            --color-primary-200: ${theme.colors.primary200 || '#bae6fd'};
            --color-primary-300: ${theme.colors.primary300 || '#7dd3fc'};
            --color-secondary-100: ${theme.colors.secondary100 || '#cffafe'};
            --color-secondary-200: ${theme.colors.secondary200 || '#a5f3fc'};
            --color-accent-100: ${theme.colors.accent100 || '#fef3c7'};
            --color-accent-200: ${theme.colors.accent200 || '#fde68a'};
            
            /* Theme Fonts */
            --font-primary: '${theme.fonts.primary}', sans-serif;
            --font-secondary: '${theme.fonts.secondary}', sans-serif;
            --font-accent: '${theme.fonts.accent}', serif;
            
            /* Shadows */
            --shadow-sm: ${theme.shadows?.sm || '0 1px 2px 0 rgb(0 0 0 / 0.05)'};
            --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
            --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
            --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box !important;
        }
        
        body { 
            font-family: var(--font-primary);
            line-height: 1.6;
            color: var(--color-text);
            background-color: var(--color-background);
            overflow-x: hidden;
        }
        
        /* Utility Classes */
        .theme-primary { color: var(--color-primary); }
        .theme-secondary { color: var(--color-secondary); }
        .theme-accent { color: var(--color-accent); }
        .theme-text { color: var(--color-text); }
        .theme-text-primary { color: var(--color-primary); }
        .theme-text-secondary { color: var(--color-text-secondary); }
        
        .theme-bg-primary { background-color: var(--color-primary); }
        .theme-bg-secondary { background-color: var(--color-secondary); }
        .theme-bg-accent { background-color: var(--color-accent); }
        .theme-bg-surface { background-color: var(--color-surface); }
        
        .theme-gradient-primary {
            background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
        }
        
        .theme-gradient-accent {
            background: linear-gradient(135deg, var(--color-accent), var(--color-primary));
        }
        
        .theme-border-primary {
            border-color: var(--color-primary);
        }
        
        /* Button Styles */
        .btn-primary {
            background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
            color: white;
            padding: 12px 24px;
            border-radius: 12px;
            text-decoration: none;
            display: inline-block;
            font-weight: 600;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-family: var(--font-accent);
            box-shadow: var(--shadow-md);
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }
        
        .btn-secondary {
            background: transparent;
            color: var(--color-primary);
            border: 2px solid var(--color-primary);
            padding: 10px 22px;
            border-radius: 12px;
            text-decoration: none;
            display: inline-block;
            font-weight: 600;
            transition: all 0.3s ease;
            font-family: var(--font-accent);
            cursor: pointer;
        }
        
        .btn-secondary:hover {
            background: var(--color-primary);
            color: white;
        }
        
        /* Card Styles */
        .theme-card {
            background-color: var(--color-surface);
            border-radius: 1rem;
            box-shadow: var(--shadow-md);
            transition: all 0.3s ease;
            overflow: hidden;
        }
        
        .theme-card:hover {
            box-shadow: var(--shadow-lg);
            transform: translateY(-4px);
        }
        
        /* Container */
        .container { width: 100%; max-width: 1280px; margin: 0 auto; padding: 0 1rem; }
        /* Responsive Design */
        @media (max-width: 640px) {
            .container { 
                padding-left: 1rem; 
                padding-right: 1rem; 
            }
            
            .grid-cols-2 {
                grid-template-columns: 1fr;
                gap: 1rem;
            }
            
            .text-responsive-xl {
                font-size: 2rem;
                line-height: 2.5rem;
            }
            
            .text-responsive-lg {
                font-size: 1.5rem;
                line-height: 2rem;
            }
        }
        
        @media (min-width: 641px) and (max-width: 1024px) {
            .grid-cols-3, .grid-cols-4 {
                grid-template-columns: repeat(2, 1fr);
                gap: 1.5rem;
            }
            
            .text-responsive-xl {
                font-size: 3rem;
                line-height: 3.5rem;
            }
            
            .text-responsive-lg {
                font-size: 1.75rem;
                line-height: 2.25rem;
            }
        }
        
        @media (min-width: 1025px) {
            .grid-cols-4 {
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
            }
            
            .text-responsive-xl {
                font-size: 4rem;
                line-height: 4.5rem;
            }
            
            .text-responsive-lg {
                font-size: 2rem;
                line-height: 2.5rem;
            }
        }

        /* Grid */
        .grid { display: grid; }
        .flex { display: flex; }
        .items-center { align-items: center; }
        
        /* Smooth Scrolling */
        html { 
            scroll-behavior: smooth; 
        }
        
        /* Animations */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes fadeInRight {
            from {
                opacity: 0;
                transform: translateX(30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out;
        }
        
        .animate-fade-in-left {
            animation: fadeInLeft 0.8s ease-out;
        }
        
        .animate-fade-in-right {
            animation: fadeInRight 0.8s ease-out;
        }
        
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
        
        
        /* Loading States */
        .loading {
            background: linear-gradient(90deg, var(--color-border) 25%, transparent 50%, var(--color-border) 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
        }
        
        @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }

        @keyframes float {
            0%, 100% {
                transform: translateY(0);
            }
            50% { transform: translateY(-10px); }
        }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }
        
        ::-webkit-scrollbar-track {
            background: var(--color-background);
        }
        
        ::-webkit-scrollbar-thumb {
            background: var(--color-border);
            border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: var(--color-text-secondary);
        }
        
        /* Print Styles */
        @media print {
            .no-print { display: none !important; }
            body { background: white !important; }
        }

        /* Fix for mobile overflow issues */
        section {
            overflow-x: hidden;
        }
    </style>
</head>
<body>
    ${sectionsHTML}
    
    <!-- JavaScript for Interactivity -->
    <script>
        // Mobile menu toggle for header sections
        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            if (menu) {
                menu.classList.toggle('hidden');
            }
        }
        
        // Initialize on page load
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize any sliders
            initializeSliders();
            // Initialize any counters
            initializeCounters();
        });
        
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Initialize sliders if any
        function initializeSliders() {
            const sliders = document.querySelectorAll('.slider-container');
            sliders.forEach(slider => {
                // Simple slider functionality
                // In a real implementation, this would be more sophisticated
                console.log('Slider initialized');
            });
        }
        
        // Form submission handlers
        function handleFormSubmit(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            event.target.reset();
            
            // In a real implementation, you would send this data to your server
            console.log('Form data:', data);
        }
        
        // Newsletter submission
        function handleNewsletterSubmit(event) {
            event.preventDefault();
            const email = event.target.querySelector('input[type="email"]').value;
            
            if (email) {
                alert('Thank you for subscribing to our newsletter!');
                event.target.reset();
                
                // In a real implementation, you would send this to your server
                console.log('Newsletter signup:', email);
            }
        }
        
        // FAQ toggle functionality
        function toggleFAQ(index) {
            const content = document.getElementById('faq-content-' + index);
            const icon = document.getElementById('faq-icon-' + index);
            
            if (content && icon) {
                if (content.classList.contains('hidden')) {
                    content.classList.remove('hidden');
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    content.classList.add('hidden');
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        }
        
        // Intersection Observer for animations
        let hasInitializedObserver = false;
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                }
            });
        }, observerOptions);
        
        // Observe all sections for animation
        function initializeAnimations() {
            if (hasInitializedObserver) return;
            document.querySelectorAll('section').forEach(section => {
                observer.observe(section);
            });
            hasInitializedObserver = true;
        });
        
        // Counter animation
        function animateCounters() {
            const counters = document.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current);
                }, 16);
            });
        }
        
        // Initialize counter animation when visible
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.classList.contains('stats-section')) {
                    animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        document.addEventListener('DOMContentLoaded', () => {
            initializeAnimations();
            const statsSection = document.querySelector('.stats-section');
            if (statsSection) {
                counterObserver.observe(statsSection);
            }
            
        });
        
        // Back to top functionality
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // Show/hide back to top button
        window.addEventListener('scroll', () => {
            const backToTop = document.getElementById('back-to-top');
            if (backToTop) {
                if (window.pageYOffset > 300) {
                    backToTop.style.display = 'block';
                } else {
                    backToTop.style.display = 'none';
                }
            }
        });
    </script>
    
    <!-- Back to Top Button -->
    <div class="no-print">
    <button 
        id="back-to-top" 
        onclick="scrollToTop()" 
        style="display: none; position: fixed; bottom: 20px; right: 20px; z-index: 1000;"
        class="btn-primary rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
    >
        ↑
    </div>
    </button>
</body>
</html>`;
};

const generateSectionHTML = (section: Section, theme: ThemeConfig): string => {
    const { content, type } = section;

    switch (type) {
        case 'hero-split':
            return `
        <section class="relative min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center overflow-hidden" style="font-family: var(--font-primary); background-color: var(--color-background);">
            <div class="absolute inset-0 overflow-hidden">
                <div class="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
                <div class="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
            </div>
            <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
                    <div class="text-center lg:text-left order-2 lg:order-1 animate-fade-in-left">
                        <h1 class="text-responsive-xl font-bold mb-4 lg:mb-6 leading-tight" style="color: var(--color-primary); font-family: var(--font-primary);">
                            ${content.title}
                        </h1>
                        <p class="text-responsive-lg mb-6 lg:mb-8 leading-relaxed max-w-2xl" style="color: var(--color-text-secondary); font-family: var(--font-secondary);">
                            ${content.subtitle}
                        </p>
                        <a href="${content.buttonLink}" class="btn-primary">
                            ${content.buttonText}
                        </a>
                    </div>
                    <div class="relative order-1 lg:order-2 animate-fade-in-right">
                        <img src="${content.image}" alt="Hero" class="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-2xl">
                        <div class="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-24 sm:h-24 rounded-full opacity-20 theme-gradient-primary"></div>
                        <div class="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 rounded-full opacity-30 theme-gradient-accent"></div>
                    </div>
                </div>
            </div>
        </section>`;

        case 'hero-centered':
            return `
        <section class="relative min-h-screen flex items-center justify-center text-center bg-cover bg-center bg-no-repeat" style="background-image: ${content.image ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${content.image})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}; font-family: var(--font-primary);">
            <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
                <div class="animate-fade-in-up">
                    <h1 class="text-responsive-xl font-bold mb-6 leading-tight">
                        ${content.title}
                    </h1>
                    <p class="text-responsive-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                        ${content.subtitle}
                    </p>
                    <a href="${content.buttonLink}" class="inline-block px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl">
                        ${content.buttonText}
                    </a>
                </div>
            </div>
        </section>`;

        case 'hero-video':
            return `
        <section class="relative min-h-screen flex items-center justify-center overflow-hidden" style="font-family: var(--font-primary);">
            <div class="absolute inset-0">
                ${content.videoUrl ? `
                    <iframe src="${content.videoUrl.includes('youtube.com')
                        ? content.videoUrl.replace('watch?v=', 'embed/') + '?autoplay=1&mute=1&loop=1&controls=0'
                        : content.videoUrl
                    }" class="w-full h-full object-cover" allow="autoplay; encrypted-media"></iframe>
                ` : `
                    <img src="${content.image}" alt="Video Background" class="w-full h-full object-cover">
                `}
                <div class="absolute inset-0 bg-black/40"></div>
            </div>
            <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <div class="animate-fade-in-up">
                    <h1 class="text-responsive-xl font-bold mb-6 leading-tight">
                        ${content.title}
                    </h1>
                    <p class="text-responsive-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                        ${content.subtitle}
                    </p>
                    <a href="${content.buttonLink}" class="inline-block px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl">
                        ${content.buttonText}
                    </a>
                </div>
            </div>
        </section>`;

        case 'hero-gradient':
            return `
        <section class="relative min-h-screen flex items-center justify-center overflow-hidden theme-gradient-primary" style="font-family: var(--font-primary);">
            <div class="absolute inset-0 overflow-hidden">
                <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            </div>
            <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <div class="animate-fade-in-up">
                    <h1 class="text-responsive-xl font-bold mb-6 leading-tight">
                        ${content.title}
                    </h1>
                    <p class="text-responsive-lg mb-8 leading-relaxed max-w-2xl mx-auto opacity-90">
                        ${content.subtitle}
                    </p>
                    <a href="${content.buttonLink}" class="inline-block px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl">
                        ${content.buttonText}
                    </a>
                </div>
            </div>
        </section>`;

        case 'header-classic':
            return `
        <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50" style="border-color: var(--color-border);">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16 lg:h-20">
                    <div class="flex items-center gap-3">
                        ${content.logo ? `<img src="${content.logo}" alt="Logo" class="w-10 h-10 lg:w-12 lg:h-12 object-contain">` : ''}
                        <span class="text-lg lg:text-xl font-bold theme-primary" style="font-family: var(--font-primary);">${content.companyName}</span>
                    </div>
                    <nav class="hidden lg:flex items-center space-x-8">
                        ${content.menuItems.map((item: any) => `
                            <a href="${item.url}" class="text-gray-700 hover:text-blue-600 transition-colors font-medium" style="color: var(--color-text); font-family: var(--font-secondary);">${item.title}</a>
                        `).join('')}
                    </nav>
                    <div class="flex items-center gap-4">
                        <div class="hidden sm:flex items-center gap-2">
                            <span class="text-sm font-medium text-gray-700">${content.language}</span>
                        </div>
                        <button onclick="toggleMobileMenu()" class="lg:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div id="mobile-menu" class="lg:hidden hidden border-t border-gray-200 py-4">
                    <nav class="space-y-4">
                        ${content.menuItems.map((item: any) => `
                            <a href="${item.url}" class="block text-gray-700 hover:text-blue-600 transition-colors font-medium">${item.title}</a>
                        `).join('')}
                    </nav>
                </div>
            </div>
        </header>`;

        case 'contact-form':
            return `
        <section class="py-12 sm:py-20 bg-white" style="background-color: var(--color-surface); font-family: var(--font-primary);">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-8 sm:mb-16 animate-fade-in-up">
                    <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 theme-primary">${content.title}</h2>
                    <p class="text-lg sm:text-xl theme-text-secondary">${content.subtitle}</p>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    <div class="animate-fade-in-left">
                        <h3 class="text-xl lg:text-2xl font-bold mb-6 lg:mb-8 theme-text">Get in Touch</h3>
                        <div class="space-y-6">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="font-semibold theme-text">Email</h4>
                                    <p class="theme-text-secondary">${content.email}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="font-semibold theme-text">Phone</h4>
                                    <p class="theme-text-secondary">${content.phone}</p>
                                </div>
                            </div>
                            ${content.address ? `
                                <div class="flex items-center gap-4">
                                    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 class="font-semibold theme-text">Address</h4>
                                        <p class="theme-text-secondary">${content.address}</p>
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    <div class="animate-fade-in-right">
                        <form onsubmit="handleFormSubmit(event)" class="space-y-6">
                            <div>
                                <label class="block text-sm font-semibold mb-2 theme-text">Name</label>
                                <input type="text" name="name" required class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" style="border-color: var(--color-border);">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold mb-2 theme-text">Email</label>
                                <input type="email" name="email" required class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" style="border-color: var(--color-border);">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold mb-2 theme-text">Message</label>
                                <textarea name="message" required rows="6" class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" style="border-color: var(--color-border);"></textarea>
                            </div>
                            <button type="submit" class="btn-primary w-full">
                                <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                </svg>
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>`;

        case 'faq-accordion':
            return `
        <section class="py-12 sm:py-20 bg-white" style="background-color: var(--color-surface); font-family: var(--font-primary);">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-8 sm:mb-16 animate-fade-in-up">
                    <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 theme-primary">${content.title}</h2>
                    ${content.subtitle ? `<p class="text-lg sm:text-xl theme-text-secondary max-w-3xl mx-auto">${content.subtitle}</p>` : ''}
                </div>
                <div class="space-y-4">
                    ${content.faqs.map((faq: any, index: number) => `
                        <div class="bg-gray-50 rounded-xl overflow-hidden animate-fade-in-up" style="background-color: var(--color-background);">
                            <button onclick="toggleFAQ(${index})" class="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors">
                                <h3 class="text-lg font-semibold theme-text">${faq.question}</h3>
                                <svg class="w-5 h-5 theme-text-secondary transform transition-transform" id="faq-icon-${index}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            <div id="faq-content-${index}" class="hidden px-6 pb-6">
                                <p class="theme-text-secondary leading-relaxed">${faq.answer}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>`;

        case 'stats-grid':
            return `
        <section class="py-12 sm:py-20 bg-gradient-to-br from-blue-50 to-purple-50 stats-section" style="background: linear-gradient(135deg, var(--color-primary)10, var(--color-secondary)10); font-family: var(--font-primary);">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-8 sm:mb-16 animate-fade-in-up">
                    <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 theme-primary">${content.title}</h2>
                    ${content.subtitle ? `<p class="text-lg sm:text-xl theme-text-secondary max-w-3xl mx-auto">${content.subtitle}</p>` : ''}
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    ${content.stats.map((stat: any, index: number) => `
                        <div class="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in-up" style="background-color: var(--color-surface); animation-delay: ${index * 0.1}s;">
                            <div class="w-16 h-16 mx-auto mb-4 theme-gradient-primary rounded-2xl flex items-center justify-center">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                </svg>
                            </div>
                            <div class="text-3xl sm:text-4xl font-bold mb-2 theme-primary counter" data-target="${stat.number.replace(/\D/g, '')}">
                                0${stat.suffix || ''}
                            </div>
                            <div class="theme-text-secondary font-medium">${stat.label}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>`;

        case 'newsletter-centered':
            return `
        <section class="py-12 sm:py-20 theme-gradient-primary" style="font-family: var(--font-primary);">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div class="animate-fade-in-up">
                    <div class="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">${content.title}</h2>
                    <p class="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">${content.subtitle}</p>
                    <form onsubmit="handleNewsletterSubmit(event)" class="max-w-md mx-auto">
                        <div class="flex flex-col sm:flex-row gap-3">
                            <input type="email" name="email" required placeholder="${content.placeholder}" class="flex-1 px-6 py-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50">
                            <button type="submit" class="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                </svg>
                                ${content.buttonText}
                            </button>
                        </div>
                        <p class="text-white/70 text-sm mt-4">No spam, unsubscribe at any time</p>
                    </form>
                </div>
            </div>
        </section>`;

        case 'footer-comprehensive':
            return `
        <footer class="bg-gray-900 text-white py-12 lg:py-16" style="font-family: var(--font-primary);">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div class="col-span-1 md:col-span-2">
                        <div class="animate-fade-in-up">
                            <h3 class="text-2xl font-bold mb-4">${content.companyName}</h3>
                            <p class="text-gray-400 mb-6">Building beautiful websites made simple.</p>
                        </div>
                    </div>
                    <div>
                        <div class="animate-fade-in-up">
                            <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
                            <ul class="space-y-2">
                                ${content.links.map((link: any) => `
                                    <li><a href="${link.url}" class="text-gray-400 hover:text-white transition-colors">${link.title}</a></li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div class="animate-fade-in-up">
                            <h4 class="text-lg font-semibold mb-4">Follow Us</h4>
                            <div class="space-y-2">
                                ${content.socialLinks.map((social: any) => `
                                    <a href="${social.url}" class="text-gray-400 hover:text-white transition-colors block">${social.platform}</a>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="border-t border-gray-800 mt-12 pt-8">
                    <div class="text-center text-gray-400">
                        <p>&copy; ${new Date().getFullYear()} ${content.companyName}. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>`;

        default:
            return `
        <section class="py-12 sm:py-20 text-center" style="background-color: var(--color-surface); font-family: var(--font-primary);">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-2xl sm:text-3xl font-bold theme-primary mb-4">${type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')} Section</h2>
                <p class="theme-text-secondary">Professional content for ${type} section will be rendered here.</p>
            </div>
        </section>`;
    }
};