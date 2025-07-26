# Yupeng's Personal Blog

A modern, high-performance personal blog built with Lit Web Components, featuring a beautiful glassmorphism design and seamless dark/light mode switching.

🌐 **Live Site:** [https://chaoyupeng.github.io](https://chaoyupeng.github.io)

## ✨ Features

- **🎨 Modern Glassmorphism UI** - Beautiful translucent design with backdrop blur effects
- **🌓 Smart Theme Switching** - Smooth transitions between light and dark modes with localStorage persistence
- **📱 Fully Responsive** - Optimized for all devices and screen sizes
- **⚡ High Performance** - Optimized images and minimal bundle size for fast loading
- **🔧 Component-Based Architecture** - Built with Lit Web Components for maintainability
- **🚀 Fast Development** - Hot module replacement with Vite
- **📊 View Counter** - Track page visits (component ready for analytics integration)

## 🛠️ Tech Stack

- **Frontend Framework:** [Lit](https://lit.dev/) (Web Components)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (CDN for simplicity) + Custom CSS-in-JS
- **Deployment:** GitHub Pages with GitHub Actions
- **Node.js:** v22+ (required for Vite 7)

## 📁 Project Structure

```
chaoyupeng.github.io/
├── .github/workflows/       # GitHub Actions deployment
│   └── deploy.yml
├── public/                  # Static assets
│   ├── Avatar.jpeg         # Profile picture
│   ├── background_day.jpg  # Light theme background
│   └── background_night.jpg # Dark theme background
├── src/
│   ├── components/         # Lit Web Components
│   │   ├── Categories.tsx  # Category navigation
│   │   ├── Content.tsx     # Main content area
│   │   ├── ContactForm.tsx # Contact form
│   │   ├── Header.tsx      # Header with theme toggle
│   │   ├── Profile.tsx     # Profile sidebar
│   │   └── ViewCounter.tsx # Page view tracking
│   ├── App.css            # Global styles
│   ├── App.tsx            # Main app component
│   ├── index.css          # Base styles
│   └── main.tsx           # Entry point
├── index.html             # HTML template
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- **Node.js 22+** (required for Vite 7)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chaoyupeng/chaoyupeng.github.io.git
   cd chaoyupeng.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📜 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🎨 Theme System

The blog features a sophisticated theme system with:

- **Automatic Theme Detection** - Respects user's system preference
- **Manual Toggle** - Sun/moon icon in header for manual switching
- **Persistent Storage** - Remembers user's preference via localStorage
- **Smooth Transitions** - 0.6s fade between light/dark backgrounds
- **Component-Level Theming** - Each component adapts to theme changes

## 🏗️ Component Architecture

Built with **Lit Web Components** for:

- **🔄 Reactive State Management** - Automatic UI updates with `@state` decorators
- **🎯 Event-Driven Communication** - Clean component interaction via custom events
- **🎨 Scoped Styling** - CSS-in-JS with Lit's `css` template literal
- **♻️ Reusability** - Self-contained components with clear APIs
- **🔧 TypeScript Integration** - Full type safety and IntelliSense

## 🚀 Deployment

Automated deployment to GitHub Pages via GitHub Actions:

1. **Push to main branch** triggers deployment
2. **Node.js 22** environment for Vite 7 compatibility
3. **Build optimization** with TypeScript compilation
4. **Automatic publishing** to `https://chaoyupeng.github.io`

## 🎯 Performance Optimizations

- **📦 Minimal Bundle Size** - Tree-shaking and code splitting
- **🖼️ Optimized Images** - Compressed assets for fast loading
- **⚡ Fast Build Times** - Vite's lightning-fast HMR
- **🗜️ CSS Optimization** - Removed unused styles and dependencies
- **🌐 CDN Assets** - Tailwind CSS served from CDN (note: production warning expected)

## ⚠️ About Tailwind CDN Usage

This project uses Tailwind CSS via CDN for simplicity and fast development. While Tailwind shows a production warning, this approach is acceptable for:

- **Personal blogs** like this project
- **Prototypes** and quick development
- **Small sites** with minimal custom CSS

For larger production applications, consider installing Tailwind locally via PostCSS. The current setup provides excellent performance and maintainability for this use case.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Yupeng Chao** - ML/AI Enthusiast
- GitHub: [@chaoyupeng](https://github.com/chaoyupeng)
- Website: [chaoyupeng.github.io](https://chaoyupeng.github.io)

---

⭐ **Star this repo if you found it useful!**