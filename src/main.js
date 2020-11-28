import Vue from "vue";
import App from "./App.vue";
import * as firebase from "firebase";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyAXjFoz77ogpUvd8IuSPfwS6AxUgopMvpc",
      authDomain: "fir-meetup-f342f.firebaseapp.com",
      databaseURL: "https://fir-meetup-f342f.firebaseio.com",
      projectId: "fir-meetup-f342f",
      storageBucket: "gs://fir-meetup-f342f.appspot.com",
    });
    this.$store.dispatch("authChanged");
  },
}).$mount("#app");
