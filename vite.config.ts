import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  // GitHubのリポジトリ名に変更
  base: '/ksgr-diagnosis/',
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        result: fileURLToPath(new URL('./result/result.html', import.meta.url)),
        characters: fileURLToPath(new URL('./characters/characters.html', import.meta.url)),
        credits: fileURLToPath(new URL('./credits/credits.html', import.meta.url)),
      },
    },
  },

});
