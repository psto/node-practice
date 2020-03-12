import Vue from "vue";
import Router from "vue-router";
import HomePage from "@/components/HomePage";
import Login from "@/components/Login";
import Register from "@/components/Register";
import Profile from "@/components/Profile";
import SingleImage from "@/components/Single";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", component: HomePage },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/profile", component: Profile },
    { path: "/:id", component: SingleImage }
  ]
});
