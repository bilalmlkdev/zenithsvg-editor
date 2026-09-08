<div align="center">

  <a href="https://zenithsvg-editor.vercel.app/">
    <img src="https://raw.githubusercontent.com/bilalmlkdev/zenithsvg-editor/main/public/logo.svg" alt="zenithsvg-editor logo" width="100%" height="120">
  </a>

# Zenithsvg - Online SVG Editor

  Stop fighting with static SVG files. ZenithSVG Editor is a free, open-source browser workspace <br> for writing, previewing, and exporting SVG code in real time, no build step, no account, no setup.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-black?style=for-the-badge)](https://zenithsvg-editor.vercel.app)
[![GitHub Stars](https://img.shields.io/github/stars/bilalmlkdev/zenithsvg-editor?style=for-the-badge&logo=github&color=yellow)](https://github.com/bilalmlkdev/zenithsvg-editor.git)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

</div>

<p align="center">
  <i>Created by <a href="https://bilalmlkdev.vercel.app" target="_blank">Bilal Malik</a></i><br>
  <i>Follow on Github <a href="https://github.com/bilalmlkdev" target="_blank">bilalmlkdev</a></i>
</p>


[![zenithsvg-editor Dashboard](https://raw.githubusercontent.com/bilalmlkdev/zenithsvg-editor/main/public/preview.png)](https://zenithsvg-editor.vercel.app/)


# The Problem

Working with raw SVG usually means one of two bad options: a heavyweight design tool that hides the markup from you, or a bare text editor with no visual feedback until you refresh a browser tab. Neither is built for someone who actually wants to hand-write or fine-tune SVG code and see the result instantly.

# What ZenithSVG Editor Solves

- **No context-switching** - write code and see the rendered output side by side, in the same window.
- **No tooling overhead** - no CLI, no bundler config, no account sign-up. Open the site and start editing.
- **No guesswork on validity** - a live status bar flags whether your `<svg>` markup is actually valid before you try to export it.
- **No manual formatting** - messy, unindented SVG/XML gets cleaned up with one click, or automatically on save.
- **No lost work** - projects are saved to your browser's LocalStorage and stay available across sessions.
- **No export friction** - download directly as `.svg` or rasterize to `.png` without leaving the tab.

# Key Features

- **Live SVG Editing** - full syntax highlighting powered by **Monaco Editor**, the same engine behind VS Code.
- **Instant Preview** - real-time rendering with pan, zoom, and one-click reset.
- **Code Formatting** - one-click SVG/XML formatting via **Prettier**, applied automatically on save.
- **Flexible Layouts** - toggle between Show Both and Hide Preview to focus on code.
- **Export & Download** - save designs as `.svg` or `.png`.
- **Local Storage Projects** - auto-save named projects and manage them from the Files page.
- **Live Validity Status** - instant feedback on whether your markup will export cleanly.
- **Canvas Background Switcher** - preview against transparent, white, light gray, or dark slate backgrounds.
- **Custom Canvas Dimensions** - set exact width/height directly on the root `<svg>` element.
- **Dark & Light Themes** - synced across the editor, preview, and UI chrome.
- **Workspace Customisation** - font size, tab size, line numbers, minimap, word wrap, auto-closing brackets, whitespace rendering, and smooth scrolling.

# Folder Structure

```text
src/
├── components/
│   ├── EditorPanel/       # Code editor, toolbar, status bar, settings
│   ├── PreviewPanel/      # Live preview, zoom/pan, background & dimension controls
│   ├── Header/            # Top nav and user dropdown
│   └── Layout/            # Main app shell
├── pages/
│   ├── EditorPage.jsx     # / - main editor workspace
│   ├── FilesPage.jsx      # /files - saved projects
│   └── AboutPage.jsx      # /about - project & stack info
├── context/
│   └── ThemeContext.jsx
├── hooks/
│   ├── useLocalStorage.js
│   └── useEditorActions.js
├── App.jsx
└── main.jsx
```

# Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI library |
| Vite 6 | Build tool & dev server |
| Tailwind CSS v4 | Styling & responsive design |
| Monaco Editor | Code editor (VS Code engine) |
| Prettier | SVG/XML formatting |
| React Router | Routing (`/`, `/files`, `/about`) |
| React Zoom Pan Pinch | Preview pan & zoom |
| html-to-image | SVG → PNG export |
| React Icons | Icon set |

<p align="left">
  <img src="https://skillicons.dev/icons?i=react,vite,tailwind,js,git" />
</p>

# Installation

```bash
git clone https://github.com/bilalmlkdev/zenithsvg-editor.git
cd zenithsvg-editor
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

# Usage

1. Write or paste SVG code into the editor - the preview updates live.
2. Use **Format** to clean up markup instantly with Prettier.
3. Switch preview backgrounds or set exact canvas dimensions from the toolbar.
4. Hit **Save** to store the project locally, or **Download** to export as `.svg`/`.png`.
5. Manage all saved work from the `/files` page.

# Contributing

Contributions are welcome:

1. Check existing [GitHub Issues](https://github.com/bilalmlkdev/zenithsvg-editor/issues).
2. Fork the repo and create a feature branch.
3. Make your changes, following the existing code style.
4. Submit a pull request with a clear description.

# License

This project is licensed under the MIT License - see below for the full text.

```text
MIT License

Copyright (c) 2026 Bilal Malik

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

