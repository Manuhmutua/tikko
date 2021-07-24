import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/login/index.vue";
import Dashboard from "../components/dashboard/index.vue";
import AddEvent from "../components/add-event/index.vue";
import ViewEvent from "../components/view-event/index.vue";
import EditEvent from "../components/edit-event/index.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/add-event",
    name: "AddEvent",
    component: AddEvent,
  },
  {
    path: "/view-event",
    name: "ViewEvent",
    component: ViewEvent,
  },
  {
    path: "/edit-event",
    name: "EditEvent",
    component: EditEvent,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
