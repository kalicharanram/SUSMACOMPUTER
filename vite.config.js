import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Relative asset paths.
//
// GitHub Pages serves this project from a sub-path
// (https://<user>.github.io/SUSMACOMPUTER/), not the domain root. With the
// default base of '/', the built HTML asks for /assets/index-*.js, which the
// browser resolves to https://<user>.github.io/assets/... — one level too high,
// so every JS and CSS file 404s and the page renders blank.
//
// './' keeps the URLs relative to whatever path the page is served from, so the
// same build works at the root, inside a sub-path, or on a custom domain.
// Safe here because the site navigates with #anchors rather than real routes.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})