# AISEE - AI-First Web3 Project Visibility Platform

AISEE is a comprehensive AEO (AI Engine Optimization) toolkit designed for the AI-first internet, helping Web3 projects gain better visibility in the AI era.

## 🚀 Project Overview

AISEE is a modern Next.js application focused on providing AI-driven optimization solutions for Web3 projects. The project adopts the latest frontend technology stack, delivering smooth user experiences and rich animation effects.

## ✨ Key Features

### 🎨 Rich Animation Effects
- **GSAP Animations**: Smooth scroll animations using GSAP and ScrollTrigger
- **Framer Motion**: Modern interactive animations
- **Custom Animation Components**: Multiple reusable animation components
  - Stacked Cards Effect (StackedCards)
  - Falling Text Animation (FallingText)
  - Image Rotation Effect (ImageRotating)
  - Image Trail Animation (ImageTrail)
  - Scrolling Elements Animation (ScrollingElements)
  - Text Typing Effect (TextType)

### 📱 Responsive Design
- Fully responsive layout supporting desktop and mobile
- Mobile-optimized animation performance
- Adaptive font sizes and spacing

### 🎯 Core Function Modules
- **Homepage Display**: Multi-slider showcasing product features
- **Product Demo**: Real-time analytics functionality showcase
- **Animation Demo Pages**: Showcase of various animation effects
- **Interactive Components**: Rich user interaction experience

## 🛠️ Technology Stack

### Frontend Framework
- **Next.js 15.4.5**: React full-stack framework with App Router support
- **React 19.1.0**: Latest React version
- **TypeScript 5**: Type-safe JavaScript

### Styling and Animation
- **Tailwind CSS 4**: Utility-first CSS framework
- **GSAP 3.13.0**: Professional animation library
- **Framer Motion 12.23.12**: React animation library
- **Swiper 11.2.10**: Touch slider component

### Tools and Libraries
- **Lucide React**: Modern icon library
- **Matter.js**: 2D physics engine
- **Class Variance Authority**: Component variant management
- **Tailwind Merge**: Tailwind class name merging utility

### Development Tools
- **ESLint**: Code quality checking
- **PostCSS**: CSS post-processor
- **Turbopack**: Fast build tool

## 📁 Project Structure

```
aisee/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── home/              # Main page
│   │   │   ├── components/    # Homepage components
│   │   │   │   ├── slider_1.tsx
│   │   │   │   ├── slider_2.tsx
│   │   │   │   ├── slider_3.tsx
│   │   │   │   ├── slider_4.tsx
│   │   │   │   ├── slider_5.tsx
│   │   │   │   ├── slider_6.tsx
│   │   │   │   ├── bg-txt.tsx
│   │   │   │   └── tips.tsx
│   │   │   └── page.tsx
│   │   ├── animation/         # Animation demo pages
│   │   ├── animated-switcher-demo/
│   │   ├── falling-text-demo/
│   │   ├── scrolling-elements-demo/
│   │   ├── stacked-cards/
│   │   └── layout.tsx
│   ├── components/            # Reusable components
│   │   ├── ui/               # UI component library
│   │   │   ├── AnimatedSwitcher.tsx
│   │   │   ├── FallingText.tsx
│   │   │   ├── ImageRotating.tsx
│   │   │   ├── ImageTrail.tsx
│   │   │   ├── ScrollingElements.tsx
│   │   │   ├── StackedCards.tsx
│   │   │   ├── TextType.tsx
│   │   │   └── Stack.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── magicui/
│   ├── contexts/             # React Context
│   │   └── AnimationContext.tsx
│   ├── icons/               # Icon components
│   └── lib/                 # Utility functions
├── public/                  # Static assets
│   └── images/             # Image resources
└── styles/                 # Style files
```

## 🚀 Quick Start

### Requirements
- Node.js 18+ 
- pnpm (recommended package manager)

### Install Dependencies
```bash
# Install dependencies using pnpm
pnpm install
```

### Development Environment
```bash
# Start development server (using Turbopack)
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

### Build Production Version
```bash
# Build production version
pnpm build

# Start production server
pnpm start
```

### Code Linting
```bash
# Run ESLint check
pnpm lint
```

## 🎨 Animation System

The project uses a custom animation context system to manage component animations:

### AnimationContext
- **Register Animation**: Components can register their own animation states
- **Visibility Detection**: Visibility detection based on Intersection Observer
- **Repeat Animation**: Support for repeatable and one-time animations

### Usage Example
```tsx
import { useAnimation } from '@/contexts/AnimationContext';

function MyComponent() {
    const { registerAnimation, isVisible, setRef } = useAnimation();
    const ref = useRef(null);

    useEffect(() => {
        registerAnimation('my-component', true); // Repeatable animation
        setRef('my-component', ref);
    }, []);

    return (
        <div ref={ref} className={isVisible('my-component') ? 'animate' : ''}>
            {/* Component content */}
        </div>
    );
}
```

## 📱 Responsive Design

The project adopts a mobile-first responsive design:

- **Breakpoints**: Using Tailwind CSS responsive breakpoints
- **Mobile Optimization**: Animations automatically degrade to static effects on mobile
- **Performance Optimization**: Animation performance optimized for different devices

## 🎯 Demo Pages

The project includes multiple animation demo pages:

- `/animation` - Animation effects showcase
- `/animated-switcher-demo` - Animated switcher demo
- `/falling-text-demo` - Falling text effect demo
- `/scrolling-elements-demo` - Scrolling elements demo
- `/stacked-cards` - Stacked cards effect demo

## 🔧 Configuration

### Tailwind CSS Configuration
The project extends Tailwind CSS configuration with:
- Custom color variables
- 3D transform styles
- Custom animation keyframes
- Responsive design utilities

### Font Configuration
Uses local font `Gotu-Regular.ttf`, loaded through Next.js font optimization feature.

## 📦 Deployment

### Vercel Deployment (Recommended)
The project can be directly deployed to Vercel platform:

1. Connect GitHub repository
2. Select project
3. Automatic deployment

### Other Platforms
The project supports deployment to any Node.js-compatible platform.

## 🤝 Contributing

Welcome to submit Issues and Pull Requests to improve the project.

## 📄 License

This project is private.

---

**AISEE** - Make Your Web3 Project Visible to AI 🚀
