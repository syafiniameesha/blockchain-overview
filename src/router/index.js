import { createRouter, createWebHistory } from "vue-router";
import Homepage from "../views/Homepage.vue";
import Blockchain from "../views/Blockchain/Blockchain.vue";
import BlockchainListing from "../views/Blockchain/BlockchainListing.vue";
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    alias: "/home/",
    name: "Homepage",
    component: Homepage,
    meta: {
      title: "Homepage",
      icon: "",
    },
  },
  {
    path: "/blockchain",
    alias: "/blockchain/",
    name: "Blockchain",
    component: Blockchain,
    meta: {
      title: "Blockchain",
      icon: "",
    },
    children: [
      {
        path: "",
        name: "BlockchainListing",
        component: BlockchainListing,
        meta: {
          title: "BlockchainListing",
          icon: "",
        },
      },
    ]
  },
  {
    path: "/:pathMatch(.*)/",
    redirect: (to) => {
      const newPath = to.path.replace(/\/$/, ""); 
      return { path: newPath };
    },
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});


export default router;
