# 🏗️ AI Architecture & Design Platform

> A cutting-edge web application that leverages AI to generate, iterate, and evaluate 3D architectural models from natural language prompts.

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)
![Three.js](https://img.shields.io/badge/Three.js-0.165.0-000000.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## 📖 Overview

The **AI Architecture & Design Platform** is a modern React-based frontend application that enables users to:
- 🎨 **Generate** 3D architectural models from text descriptions
- 🔄 **Iterate** on designs with refinement prompts
- ⭐ **Evaluate** models with ratings and feedback
- 📚 **Browse** design history with interactive 3D previews
- 🎯 **Compare** iterations side-by-side

Built with a minimalist monochrome design philosophy, the platform offers a sleek, professional interface optimized for both desktop and mobile experiences.

---

## ✨ Key Features

### 🎯 Core Functionality
- **AI-Powered Generation**: Transform text prompts into 3D architectural models
- **Iterative Design**: Refine existing models with modification requests
- **Intelligent Evaluation**: Rate and provide feedback on generated designs
- **Design History**: Access and review all previous generations
- **Comparison Mode**: Toggle between current and previous iterations

### 🎨 User Experience
- **Minimal Monochrome UI**: Clean, professional dark mode interface
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Real-time 3D Preview**: Interactive GLB/GLTF model viewer with OrbitControls
- **Smooth Animations**: Powered by Framer Motion for fluid transitions
- **Error Handling**: Comprehensive error boundaries and user feedback

### 🚀 Technical Highlights
- **Modern React**: Built with React 18 and functional components
- **3D Rendering**: Three.js integration via React Three Fiber
- **Fast Development**: Vite for lightning-fast HMR and builds
- **Type Safety**: JSDoc comments for better IDE support
- **API Integration**: Clean axios-based API client architecture

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend Framework** | React 18.3.1 |
| **Build Tool** | Vite 5.3.1 |
| **3D Graphics** | Three.js 0.165.0 |
| **3D React Integration** | React Three Fiber 8.16.8 |
| **3D Helpers** | @react-three/drei 9.108.3 |
| **HTTP Client** | Axios 1.7.2 |
| **Animations** | Framer Motion 11.2.10 |
| **Styling** | TailwindCSS 3.4.17 + Custom CSS |
| **Icons** | Lucide React 0.395.0 |
| **Utilities** | clsx, tailwind-merge |

---

## 📦 Installation

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/blackholeinfiverse83-bit/AI-3D-model.git
   cd AI-3D-model
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables** (Optional)
   
   Create a `.env` file in the root directory:
   ```env
   # Backend API Base URL
   VITE_API_URL=http://localhost:8000
   
   # Authentication Token (JWT format)
   VITE_API_TOKEN=your_jwt_token_here
   ```
   
   *Note: Defaults are configured in `src/api/client.js` for demo purposes.*

4. **Start the development server**
   
   **Option A** - Using the batch file (Windows):
   ```bash
   run_app.bat
   ```
   
   **Option B** - Using npm:
   ```bash
   npm run dev
   ```

5. **Open in browser**
   
   Navigate to `http://localhost:3000` (or the port shown in terminal)

---

## 🎮 Usage Guide

### 1️⃣ Generate Your First Model

1. Enter a descriptive prompt in the main text area:
   ```
   Modern minimalist house with large windows and a flat roof
   ```

2. Click **"Generate"** and wait for the AI to create your 3D model

3. View the interactive 3D model in the canvas (drag to rotate, scroll to zoom)

### 2️⃣ Iterate on a Design

1. With a model loaded, click **"Iterate"**

2. Enter refinement instructions:
   ```
   Add a swimming pool in the backyard and increase the number of windows
   ```

3. Enable **"Show Previous"** to compare the old and new versions side-by-side

### 3️⃣ Evaluate Models

1. Click **"Evaluate"** on any generated design

2. Rate the model from 1-5 stars

3. Provide feedback comments

4. Submit to help improve the AI

### 4️⃣ Browse History

1. Open the **History Sidebar** (left panel)

2. Click any previous design to reload it

3. View all past prompts and iterations

---

## 📁 Project Structure

```
AI-3D-model/
├── dist/                      # Production build output
│   ├── assets/               # Compiled CSS/JS bundles
│   └── index.html            # Production HTML
├── src/                       # Source code
│   ├── api/                  # API integration layer
│   │   ├── client.js         # Axios instance & interceptors
│   │   └── endpoints.js      # API function wrappers
│   ├── components/           # React components
│   │   ├── ControlBar.jsx    # Action buttons (Iterate/Evaluate)
│   │   ├── ErrorBoundary.jsx # Error handling wrapper
│   │   ├── EvaluationModal.jsx # Rating/feedback modal
│   │   ├── HistorySidebar.jsx  # Design history panel
│   │   ├── IterationModal.jsx  # Iteration prompt modal
│   │   ├── PromptPanel.jsx     # Main input interface
│   │   └── ThreeCanvas.jsx     # 3D model viewer (R3F)
│   ├── assets/               # Static assets
│   │   └── logo.png          # Application logo
│   ├── App.jsx               # Main application logic
│   ├── index.css             # Global styles & CSS variables
│   └── main.jsx              # React entry point
├── .gitignore                # Git ignore rules
├── index.html                # HTML entry point
├── package.json              # Dependencies & scripts
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js        # Tailwind CSS config
├── vite.config.js            # Vite build configuration
├── run_app.bat               # Windows quick-start script
├── FRONTEND_HANDOVER.md      # Technical handover docs
└── README.md                 # This file
```

---

## 🔌 API Integration

The frontend communicates with a backend API expecting the following endpoints:

### Endpoints

| Method | Endpoint | Description | Request | Response |
|--------|----------|-------------|---------|----------|
| POST | `/generate` | Generate new 3D model | `{ query: string }` | `{ model_url: string, design_id: string }` |
| POST | `/iterate` | Refine existing model | `{ design_id: string, query: string }` | `{ model_url: string, design_id: string }` |
| POST | `/evaluate` | Submit rating/feedback | `{ design_id: string, rating: number, feedback: string }` | `{ status: string }` |
| GET | `/history` | Fetch design history | - | `{ designs: Array }` |

### Authentication

The API client includes a bearer token for authentication. Configure via environment variable:

```env
VITE_API_TOKEN=your_jwt_token_here
```

---

## 🏗️ Building for Production

### Create Production Build

```bash
npm run build
```

This generates optimized files in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Deployment

The `dist/` folder can be deployed to any static hosting service:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag-and-drop `dist/` folder or use CLI
- **GitHub Pages**: Push `dist/` to `gh-pages` branch
- **AWS S3**: Upload `dist/` contents to S3 bucket
- **Firebase Hosting**: `firebase deploy`

---

## ⚙️ Configuration

### Tailwind CSS

Customize the design system in `tailwind.config.js`:

```js
export default {
  theme: {
    extend: {
      colors: {
        // Add custom colors
      },
      fontFamily: {
        // Add custom fonts
      }
    }
  }
}
```

### Vite

Modify build settings in `vite.config.js`:

```js
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Additional server config
  }
})
```

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: Models not displaying
- **Solution**: Check that backend API is running and returning valid `.glb`/`.gltf` URLs with CORS enabled

**Issue**: API errors (401/403)
- **Solution**: Verify `VITE_API_TOKEN` is set correctly in `.env` file

**Issue**: Port already in use
- **Solution**: Vite will automatically use the next available port (3001, 3002, etc.)

**Issue**: Slow 3D rendering
- **Solution**: Ensure hardware acceleration is enabled in your browser

### Debug Mode

Enable verbose logging in `src/api/client.js`:

```js
axios.interceptors.request.use(request => {
  console.log('Starting Request:', request);
  return request;
});
```

---

## 📱 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |
| Opera | 76+ | ✅ Fully Supported |

*Note: Requires WebGL 2.0 support for 3D rendering*

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Style

- Use functional React components
- Follow ESLint configuration
- Write meaningful commit messages
- Add JSDoc comments for complex functions

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**blackholeinfiverse83-bit**

- GitHub: [@blackholeinfiverse83-bit](https://github.com/blackholeinfiverse83-bit)
- Email: blackholeinfiverse83@gmail.com

---

## 🙏 Acknowledgments

- **Three.js** team for the amazing 3D library
- **Pmndrs** for React Three Fiber and Drei helpers
- **Vercel** for Vite build tool
- **Lucide** for beautiful open-source icons

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review [FRONTEND_HANDOVER.md](FRONTEND_HANDOVER.md) for technical details
3. Open an [Issue](https://github.com/blackholeinfiverse83-bit/AI-3D-model/issues)
4. Contact via email: blackholeinfiverse83@gmail.com

---

## 🗺️ Roadmap

- [ ] User authentication & account management
- [ ] Export models in multiple formats (STL, OBJ, FBX)
- [ ] Collaborative design sharing
- [ ] Real-time multiplayer editing
- [ ] AI-powered design suggestions
- [ ] Material and texture customization
- [ ] Advanced lighting controls
- [ ] VR/AR preview support

---

<div align="center">

**⭐ Star this repo if you find it useful! ⭐**

Made with ❤️ by blackholeinfiverse83-bit

</div>
