import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
        testTimeout: 15000, // 15s timeout for tests
        hookTimeout: 15000, // 15s timeout for hooks
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html', 'json'],
        },
    },
});
