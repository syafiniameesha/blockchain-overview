import { createApp } from "vue";
import { createPinia } from "pinia"; 

import * as ElIcon from "@element-plus/icons-vue";

import App from "./App.vue";
import router from "./router";

import "/src/assets/css/base.css";
import "/src/assets/css/compiled.css";

import mitt from "mitt";

const emiiter = mitt();

const app = createApp(App);

app.config.globalProperties.emitter = emiiter;

// Create a Pinia instance
const pinia = createPinia();
app.use(pinia);

Object.keys(ElIcon).forEach((key) => {
	app.component(key, ElIcon[key]);
});

app.use(router);
app.mount("#app");
