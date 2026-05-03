# 🚀 Suryaraj CV — Modern Interactive Portfolio

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)
[![Security](https://img.shields.io/badge/Security-Policy-blue.svg)](SECURITY.md)

A high-performance, interactive, and SEO-optimized digital CV built with the cutting-edge **TanStack** ecosystem. This project showcases my professional journey, skills, and open-source contributions through a premium user experience.

🔗 **Live Site:** [cv.suryaraj.com](https://cv.suryaraj.com)

---

## ✨ Features

- **🎯 Interactive UX:** Smooth transitions and micro-interactions powered by Framer Motion.
- **📱 Responsive Design:** Pixel-perfect layout across mobile, tablet, and desktop.
- **🔍 SEO Optimized:** Automated sitemap generation, structured JSON-LD data, and meta tag management for maximum search visibility.
- **⚡ Performance:** Built on Vite and TanStack Start for near-instant load times and efficient hydration.
- **🎨 Modern Aesthetics:** Clean, dark-themed UI using Tailwind CSS v4 and professional typography (Space Grotesk & DM Sans).

---

## 🛠️ Technology Stack

### Core Frameworks
- **[TanStack Start](https://tanstack.com/start):** Full-stack React framework with incredible DX.
- **[TanStack Router](https://tanstack.com/router):** Type-safe routing for 100% predictable navigation.
- **[React 19](https://react.dev/):** The foundation for interactive UI components.

### Styling & UI
- **[Tailwind CSS v4](https://tailwindcss.com/):** Utility-first styling with the latest engine performance.
- **[Framer Motion](https://www.framer.com/motion/):** Industry-standard animation library.
- **[Lucide Icons](https://lucide.dev/):** Beautiful, consistent iconography.

### Infrastructure
- **[Vite](https://vitejs.dev/):** Ultra-fast build tool and dev server.
- **[Cloudflare Pages](https://pages.cloudflare.com/):** Global edge deployment for lightning-fast delivery.
- **[vite-plugin-sitemap](https://github.com/jbaubree/vite-plugin-sitemap):** Automated SEO sitemap generation integrated into the build pipeline.

---

## 📁 Project Structure

```text
.
├── src/
│   ├── routes/          # File-based routing (Index, About, Experience, Skills)
│   ├── components/      # Reusable UI components (Hero, Skills, Footer, etc.)
│   ├── styles/          # Global styles and Tailwind configuration
│   └── routeTree.gen.ts # Automatically generated TanStack route tree
├── public/              # Static assets (images, robots.txt, sitemap.xml)
├── index.html           # Main entry point with SEO meta tags
├── vite.config.ts       # Build configuration and SEO automation logic
└── package.json         # Project dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or Bun

### Installation & Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/suryakantamangaraj/cv.git
   cd cv
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```
   *Note: This will also automatically regenerate the `sitemap.xml` for the latest routes.*

---

## 🤝 Contributing

I welcome contributions to help maintain the accuracy and security of the site! Please refer to the following documents for guidelines:

- **[Contributing Guidelines](CONTRIBUTING.md):** For reporting security, spelling, or content issues.
- **[Code of Conduct](CODE_OF_CONDUCT.md):** Standards for a healthy community.
- **[Security Policy](SECURITY.md):** How to report vulnerabilities.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — feel free to use it as inspiration for your own portfolio!

---
*Created with ❤️ by Surya Mangaraj*