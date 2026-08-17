import { createRouter, createWebHashHistory } from "vue-router";

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
        name: "Homepage",
        component: Homepage,
    },
    {
        path: "/blockchain",
        name: "Blockchain",
        component: Blockchain,
        children: [
            {
                path: "",
                name: "BlockchainListing",
                component: BlockchainListing,
            },
        ],
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;