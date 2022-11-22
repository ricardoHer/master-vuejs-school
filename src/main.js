// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import AppDate from "@/components/AppDate";
import firebase from "firebase/app";

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyAvnEpfO-kAIqNZvxrkkvg3RPsMTf8Q9sg",
  authDomain: "vue-school-forum-b2098.firebaseapp.com",
  projectId: "vue-school-forum-b2098",
  storageBucket: "vue-school-forum-b2098.appspot.com",
  messagingSenderId: "116633056512",
  appId: "1:116633056512:web:0054a425ff94cb0f40efe5",
  databaseURL: 'https://vue-school-forum-b2098-default-rtdb.firebaseio.com/'
};

firebase.initializeApp(firebaseConfig);

Vue.component('AppDate', AppDate)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
