import { createRouter, createWebHashHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import App from "./App.vue";

const routes = [
	{
		path: "/",
		name: "app",
		component: App,
		meta: {
			requiresAuth: true,
		},
		children: [
			{
				path: "",
				name: "inicio",
				component: () => import("./components/views/Inicio.vue"),
			},
			{
				path: "/explora",
				name: "explora",
				component: () => import("./components/views/Explora.vue"),
			},
			{
				path: "/dashboard",
				name: "dashboard",
				component: () => import("./components/views/Dashboard.vue"),
			},
		],
	},
	{
		path: "/login",
		name: "login",
		component: () => import("./pages/Login.vue"),
	},
	{
		path: "/singup",
		name: "singup",
		component: () => import("./pages/SingUp.vue"),
	},
	// {
	//     path: '/landing',
	//     name: 'landing',
	//     component: () => import('./pages/LandingDemo.vue')
	// },
	{
		path: "/error",
		name: "error",
		component: () => import("./pages/Error.vue"),
	},
	{
		path: "/notfound",
		name: "notfound",
		component: () => import("./pages/NotFound.vue"),
	},
	{
		path: "/access",
		name: "access",
		component: () => import("./pages/Access.vue"),
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const removeListener = onAuthStateChanged(
			getAuth(),
			(user) => {
				removeListener();
				resolve(user);
			},
			reject
		);
	});
};

router.beforeEach(async (to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (await getCurrentUser()) {
			next();
		} else {
			alert("No tienes acceso a esta página. Por favor inicia sesión");
			next("/login");
		}
	} else {
		next();
	}
});

export default router;
