import { createApp } from "vue";
import { createPinia } from "pinia";

import * as ElIcon from "@element-plus/icons-vue";

import App from "./App.vue";
import router from "./router";

import "/src/assets/css/base.css";
import "/src/assets/css/compiled.css";

import mitt from "mitt";

const emitter = mitt();

const app = createApp(App);

app.config.globalProperties.emitter = emitter;

// Pinia
const pinia = createPinia();
app.use(pinia);

// Element Plus Icons
Object.keys(ElIcon).forEach((key) => {
    app.component(key, ElIcon[key]);
});

// Router
app.use(router);

app.mount("#app");