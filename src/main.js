import Vue from "vue";
import VueSimpleAlert from "vue-simple-alert";
import App from "./App.vue";
import store from "./store";
import dateFilter from "@/filters/date.filter";

Vue.config.productionTip = false;

Vue.use(VueSimpleAlert);
Vue.filter("date", dateFilter);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
