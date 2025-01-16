import { defineConfig } from 'vite'
import topLevelAwait from 'vite-plugin-top-level-await'

export default defineConfig({
  plugins: [topLevelAwait()],
  base: './',

  build: {
    rollupOptions: {
      input: {
        main: 'index.html', // Main entry point
        page1: 'pre-order.html', // Additional page 1
        page2: 'FormPage1.html', // Additional page 2
        page3: 'FormPage2.html',
        page4: 'FormPageEnd.html',
      },
    },
  },
});
