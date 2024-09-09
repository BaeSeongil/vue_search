import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    base: mode === 'production' ? '/' : '/vsearch', // base URL 설정
    build: {
      assetsDir: 'vue_search/assets', // assets 디렉토리 경로 설정
    },
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      proxy: {
        '/vsearch/ematenapi': { // Proxy 설정을 수정 (앞에 / 추가)
          target: 'http://127.0.0.1:21352', // 백엔드 서버 주소
          changeOrigin: true, // CORS 문제 해결
          rewrite: path => path.replace(/^\/vsearch/, '') // 프록시 요청 경로 수정
        }
      },
      hmr: {
        host: "127.0.0.1",
        protocol: "ws"
      }
    },
  };
});
