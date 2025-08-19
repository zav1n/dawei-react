import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import type { Plugin } from 'vite';
import mockjs from 'mockjs';
import url from 'node:url';
// vite插件
const viteMockServer = (): Plugin => {
    return {
        name: 'vite-plugin-mock',
        configureServer: (server) => {
            server.middlewares.use('/api/mock/list', (req, res) => {
                const parseurl = url.parse(req.originalUrl, true).query;
                // xxxx?key=xxxx&name=xxx {key: 'xxxx', name: 'xxx'}
                res.setHeader('Content-Type', 'application/json');
                const data = mockjs.mock({
                    'list|2000': [
                        {
                            id: '@guid',
                            // name: '@cword(2, 4)',
                            name: parseurl.key,
                            age: '@integer(18, 30)',
                            address: '@county(true)',
                        },
                    ],
                });
                res.end(JSON.stringify(data));
            });
        },
    };
};

// https://vite.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'https://m1.apifoxmock.com/m1/6974850-6692197-default',
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
    plugins: [react(), viteMockServer()],
});
