import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';

export default defineNuxtPlugin((app) => {
    app.vueApp.use(FloatingVue);
});