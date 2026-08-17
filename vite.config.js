import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	base: '/', // This sets the base URL for your app
	server: {
		port: 5173, // Ensure you're still running on port 3003
		host: '0.0.0.0',
	},
	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
			dirs: ["src/components"], // Add this line to auto-import your custom components
			extensions: ["vue"],
			deep: true, // Allows recursive search for components in subdirectories
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	//Feature flag __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ is not explicitly defined
	define: {
		__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true",
	},
});
