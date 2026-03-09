# 🎵 Web Music Player

A modern, responsive web-based music player built with React and TypeScript. It features custom audio controls, playlist management, and a smooth user interface.

**Live Demo**

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://musicplayer-ten-rose.vercel.app/)

[![App Screenshot](https://i.postimg.cc/FKnjPQmj/image.png)](https://postimg.cc/zLKbB6yB)

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
- **Styling:** Tailwind CSS, Radix UI Primitives (sliders, modals, scroll views)
- **Audio:** Howler.js
- **Icons:** Lucide React

## 💡 What I Learned

This project helped me understand:
- Managing complex global state (current track, isPlaying, volume, progress) without prop drilling.
- Using unstyled Radix UI primitives (sliders, modals, scroll views) instead of using default HTML inputs.
- Using RAF loops to sync Howler.js state with UI state (progress bar moving as song is playing)

## 📦 How to Run Locally

1. Clone the repository:
```bash
git clone https://github.com/serhiimelnykkk/musicplayer.git
```
2. Install dependencies:
```bash
npm install
```
3. Generate DB:
```bash
npm run generate-db
```
4. Start the development server:
```bash
npm run dev
```
