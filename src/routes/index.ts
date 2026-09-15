import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/library",
    name: "library",
    component: () => import("@/views/LibraryView.vue"),
  },
  {
    path: "/create",
    name: "create",
    component: () => import("@/views/CreateView.vue"),
  },
  {
    path: "/snippet/:id",
    name: "snippet",
    component: () => import("@/views/CodeSnippetView.vue"),
    props: true,
  },
  {
    path: "/folio/:id?",
    name: "folio",
    component: () => import("@/views/FolioView.vue"),
    props: true,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/AboutView.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/NotFoundView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "404" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_, __, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0 };
  },
});

export default router;
