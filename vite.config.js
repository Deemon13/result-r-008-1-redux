import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	base: 'result-r-008-1-redux',
	plugins: [react()],
	server: {
		open: true,
	},
});
