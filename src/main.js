import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);
import '@/assets/css/swiper-bundle.min.css';
import '@/assets/css/default.css';
import '@/assets/css/font.css';
// import '@/assets/css/style6_5.css';
// import '@/assets/css/common6_5.css';
// import '@/assets/css/components-style.css';

import "@/assets/js/lib/jquery-2.2.4.js";
import "@/assets/js/lib/jquery-ui.js";
import "@/assets/js/lib/jquery.mCustomScrollbar.concat.min.js";
// import "@/assets/js/lib/common6_5.js"
import "@/assets/js/swiper/swiper-bundle.min.js";


app.use(createPinia());
app.use(router);

app.mount('#app');
