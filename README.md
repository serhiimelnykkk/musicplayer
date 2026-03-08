# 🎵 Web Music Player

A modern, responsive web-based music player built with React and TypeScript. It features custom audio controls, playlist management, and a smooth user interface.

**Live Demo**

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](ВСТАВТЕ_ТУТ_ПОСИЛАННЯ_НА_VERCEL)

![App Screenshot](LINK_TO_YOUR_SCREENSHOT_HERE)
*(Add a screenshot of your player here. Put the image in your repo or use an external link)*

## 🚀 Features

- **Custom Audio Engine:** Built on top of `Howler.js` for reliable audio support.
- **Global State Management:** Uses `Zustand` to manage playlists, current track, and playback status efficiently.
- **Playback Controls:** Play, Pause, Skip Forward/Backward, Loop mode.
- **Interactive UI:**
  - Draggable progress bar (seek track).
  - Volume slider.
  - Playlist sidebar with track selection.
- **Responsive Design:** Fully adapted for desktop and mobile devices using `Tailwind CSS`.

## 🛠 Tech Stack

- **Core:** React, TypeScript, Vite
- **State Management:** Zustand
- **Styling:** Tailwind CSS, Radix UI Primitives (Slider/Progress)
- **Audio:** Howler.js
- **Icons:** Lucide React

## 💡 What I Learned

This project helped me understand:
- Managing complex global state (current track, isPlaying, volume, progress) without prop drilling.
- Creating custom accessible UI components (sliders) instead of using default HTML inputs.

## 📦 How to Run Locally

1. Clone the repository:
```bash
git clone https://github.com/serhiimelnykkk/musicplayer.git
```
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```
