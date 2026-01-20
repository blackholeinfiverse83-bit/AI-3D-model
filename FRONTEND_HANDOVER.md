# Frontend Handover - AI Architecture & Design Platform

This document contains setup instructions and details for the React frontend application built for the AI Architecture & Design Platform.

## 🚀 Setup Instructions

1.  **Prerequisites**:
    *   Ensure **Node.js** (v18+) is installed. (It was missing during initial setup).
    *   Ensure **npm** is available.

2.  **Installation**:
    Navigate to the project directory and run:
    ```bash
    npm install
    ```

3.  **Running the Application**:
    *   **Option A (Easy)**: Double-click `run_app.bat` to install dependencies and start the app automatically.
    *   **Option B (Manual)**:
        ```bash
        npm run dev
        ```
    The app will start at `http://localhost:3000` (or the next available port).

## 📱 Features & UI
*   **Minimal Monochrome Design**: sleek dark mode interface.
*   **Mobile Responsive**: Fully usable on mobile devices with stacked layout.
*   **Comparison View**: Toggle between previous and current iterations during design refinement.
*   **Logo Integration**: Custom branding supported in `src/assets/logo.png`.

## 🌍 Environment Variables

Create a `.env` file in the root directory if you need to override defaults:

```env
# Base URL for the backend API
VITE_API_URL=http://localhost:8000

# Authentication Token (Standard JWT format)
VITE_API_TOKEN=your_jwt_token_here
```

*Defaults are set in `src/api/client.js` for fallback/demo purposes.*

## 🏗️ Project Structure

```
src/
├── api/
│   ├── client.js      # Axios instance & interceptors
│   └── endpoints.js   # API function wrappers
├── components/
│   ├── ControlBar.jsx      # Buttons for Iterate/Evaluate
│   ├── EvaluationModal.jsx # Rating system modal
│   ├── HistorySidebar.jsx  # History list sidebar
│   ├── IterationModal.jsx  # Iteration prompt modal
│   ├── PromptPanel.jsx     # Main input area
│   └── ThreeCanvas.jsx     # 3D GLB Viewer (R3F)
├── index.css          # Global styles & Tailwind-like utilities
├── App.jsx            # Main Layout & Business Logic
└── main.jsx           # Entry point
```

## ⚠️ Known Limitations & Notes

1.  **Backend Dependency**: The app expects the backend endpoints (`/generate`, `/iterate`, `/evaluate`, `/history`) to be active. If the API is down, you will see error messages in the UI.
2.  **Authentication**: Currently uses a static token from env vars. For real production usage, implement a full login flow to retrieve this token dynamically.
3.  **3D Models**: The `ThreeCanvas` component expects `.glb` or `.gltf` URLs. Ensure the backend returns valid CORS-accessible URLs for the models.

## 🛠️ Tech Stack

*   **React 18** + **Vite**
*   **Three.js** + **React Three Fiber** (3D Rendering)
*   **Axios** (API Communication)
*   **Vanilla CSS** (Styled with modern CSS variables & HSL colors)
