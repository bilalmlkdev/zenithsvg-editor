#  ZenithSVG Editor

> A free, open-source online SVG code editor with a live preview. Write SVG code, see instant real-time visual feedback, and export your designs as vector or raster images.

<p align="center">
  <img src="./public/logo.svg" alt="ZenithSVG Logo" width="120" height="120" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue" alt="Version 1.0.0" />
  <img src="https://img.shields.io/badge/license-MIT-green" alt="MIT License" />
  <img src="https://img.shields.io/badge/React-18-blue" alt="React 18" />
</p>

---

#  About

**ZenithSVG Editor** is a browser-based SVG design workspace built for designers and developers who work with vector graphics.

It combines a powerful code editor (powered by **Monaco Editor**) with a resizable, pan-and-zoom preview panel, allowing you to craft SVG graphics entirely in your browser.

All logic runs client-side-**no account required, completely free, and no limitations**.

Your projects are automatically saved to your browser's LocalStorage.

<p align="center">
  <img src="./public/preview.png" alt="Editor UI" width="800" />
  <br>
  <em>ZenithSVG Editor - Show Both layout (Dark Theme)</em>
</p>

---

#  Key Features

- **Live SVG Editing** - Syntax highlighting and full-featured code editing powered by **Monaco Editor** (the engine behind VS Code).
- **Instant Preview** - See SVG changes in real time with pan, zoom, and reset controls.
- **Flexible Layouts** - Switch between:
  - Show Both
  - Hide Preview
  - Hide Code Editor
- **Export & Download** - Save designs as:
  - `.svg`
  - `.png`
- **Local Storage Projects** - Automatically save projects in your browser and manage them from the **Files** page.
- **Dark & Light Themes**
- **Workspace Customisation**
  - Font size
  - Tab size
  - Line numbers
  - Minimap
  - Word wrap
  - Auto brackets
  - Whitespace rendering
- **Dedicated Pages**
  - About
  - Saved Projects
  - Search
  - Statistics

---

#  Technology Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI Library |
| **Tailwind CSS** | Styling & Responsive Design |
| **Monaco Editor** | Code editor (VS Code engine) |
| **React Router** | Routing (`/`, `/files`, `/about`) |
| **React Resizable Panels** | Resizable workspace |
| **React Zoom Pan Pinch** | Preview pan & zoom |
| **html-to-image** | Export SVG → PNG |
| **Vite** | Build tool & development server |

---

#  Getting Started

## Prerequisites

- Node.js (v16 or later)
- npm or yarn

## Installation

Clone the repository:

```bash
git clone https://github.com/byllzz/ZenithSVG.git
cd ZenithSVG
```

Install dependencies:

```bash
npm install

# or

yarn install
```

Start the development server:

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

(or whatever port Vite displays)




---

#  Usage Guide

## 1. Workspace Layout

###  Editor Panel

Write and edit SVG code.

###  Preview Panel

Visualize your SVG in real time.

- Drag to pan
- Scroll to zoom

###  Help Panel

Quick reference documentation.

---

## 2. Top Toolbar

| Control | Description |
|---------|-------------|
| **New** | Reset to a blank SVG template |
| **Open** | Load a local `.svg` file |
| **Download** | Export as SVG or PNG |
| **Save** | Save to LocalStorage |
| **Layout Views** | Show Both / Hide Preview / Hide Editor |
| **Settings** | Configure editor preferences |

---

## 3. Preview Toolbar

- Zoom In
- Zoom Out
- Reset View

### Background Options

- Transparent
- White
- Light Gray
- Dark Slate

### Canvas Size

Adjust SVG width and height.

---

## 4. Pages

### `/about`

Learn about:

- The project
- Developer
- Credits
- Open-source libraries

### `/files`

Manage saved projects.

Features include:

- Search
- Sort
- Storage statistics

---

# 📁 Project Structure

```text
src/
├── components/
│   ├── EditorPanel/
│   │   ├── EditorPanel.jsx
│   │   ├── EditorToolbar.jsx
│   │   ├── EditorStatus.jsx
│   │   └── EditorSettings.jsx
│   │
│   ├── PreviewPanel/
│   │   ├── PreviewPanel.jsx
│   │   ├── PreviewToolbar.jsx
│   │   ├── DimensionsDropdown.jsx
│   │   ├── bgOptions.jsx
│   │   ├── dimensionUtils.js
│   │   └── previewUtils.js
│   │
│   ├── Header/
│   │   ├── Header.jsx
│   │   └── UserDropdown.jsx
│   │
│   ├── Layout/
│   │   └── MainLayout.jsx
│   │
│   ├── Footer.jsx
│   └── HelpPanel.jsx
│
├── pages/
│   ├── EditorPage.jsx
│   ├── AboutPage.jsx
│   └── FilesPage.jsx
│
├── hooks/
│   ├── useLocalStorage.js
│   └── useEditorActions.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

#  Contributing

Contributions are welcome!

If you'd like to contribute:

1. Check existing GitHub Issues.
2. Open an issue if your bug or feature isn't already reported.
3. Fork the repository.
4. Create your changes.
5. Submit a pull request.

Please ensure your code follows the project's existing style and linting rules.

---

#  License

ZenithSVG Editor is released under the **MIT License**.

See the `LICENSE` file for details.

---

#  Acknowledgements

- Monaco Editor
- React Resizable Panels
- React Zoom Pan Pinch
- html-to-image
- React Icons
- Tailwind CSS
- Vite

---


<p align="center">
Made with ❤️ for the open-source community.
</p>


