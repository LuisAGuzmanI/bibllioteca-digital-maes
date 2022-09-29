<template>
	<div class="layout-topbar">
		<router-link to="/" class="layout-topbar-logo">
			<img alt="Logo" :src="topbarImage()" />
			<span>Biblioteca Digital</span>
		</router-link>
		<button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle">
			<i class="pi pi-bars"></i>
		</button>

		<button class="p-link layout-topbar-menu-button layout-topbar-button"
			v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein', 
			leaveToClass: 'hidden', leaveActiveClass: 'fadeout', hideOnOutsideClick: true}">
			<i class="pi pi-ellipsis-v"></i>
		</button>
		<ul class="layout-topbar-menu hidden lg:flex origin-top">
			<li>
				<button class="p-link layout-topbar-button" @click="handleSingOut">
					<i class="pi pi-sign-out"></i>
					<span>Cerrar sesión</span>
				</button>
			</li>
		</ul>
	</div>
</template>

<script>
import { getAuth, signOut, /*onAuthStateChanged*/ } from '@firebase/auth';
import router from './router';
export default {
    methods: {
        onMenuToggle(event) {
            this.$emit('menu-toggle', event);
        },
		onTopbarMenuToggle(event) {
            this.$emit('topbar-menu-toggle', event);
        },
		topbarImage() {
			return this.$appState.darkTheme ? 'images/maeteca-logo.svg' : 'images/maeteca-logo.svg';
		},
		handleSingOut(){
			console.log('onSingOut!')
			const auth = getAuth();
			signOut(auth).then(() => {
				router.push('/login');
			})
		},
		// logUserInfo(){
		// 	const auth = getAuth();
		// 	onAuthStateChanged(auth, (user) => {
		// 	if (user) {
		// 		// User is signed in, see docs for a list of available properties
		// 		// https://firebase.google.com/docs/reference/js/firebase.User
		// 		// const uid = user.uid;
		// 		console.log('USER IS SIGNED IN')
		// 		console.log(user.email)
		// 		// ...
		// 	} else {
		// 		// User is signed out
		// 		console.log('USER IS SIGNED OUT')
		// 		// ...
		// 	}
		// 	});
		// }
    },
	computed: {
		darkTheme() {
			return this.$appState.darkTheme;
		}
	}
}
</script>