<template>
    <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 mt-5 xl:mt-0 text-center">
                <img :src="'images/logo-maes.svg'" alt="MAE" class="mb-5" style="width:200px; height:150px;">
            </div>
            <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
                <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">Bienvenid@ a la Biblioteca Digital MAEs</div>
                        <span class="text-600 font-medium">Inicia sesión para continuar</span>
                    </div>
                
                    <div class="w-full md:w-10 mx-auto">
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Correo</label>
                        <InputText id="email1" v-model="email" type="text" class="w-full mb-3" placeholder="example@tec.mx" style="padding:1rem;" />
                
                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Contraseña</label>
                        <Password v-on:keyup.enter="signIn" id="password1" v-model="password" placeholder="Contraseña" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>
                
                        <div class="flex align-items-center justify-content-between mb-5">
                            <!-- TODO: Agregar opción para recordar login manualmente -->
                            <!-- <div class="flex align-items-center">
                                <Checkbox id="rememberme1" v-model="checked" :binary="true" class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div> -->
                            <!-- TODO: Agregar una opción para recuperar contraseña -->
                            <!-- <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Olvidaste tu contraseña?</a> -->
                        </div>
                        <span v-if="errorMsg" class="font-medium p-error">
                            {{errorMsg}}
                        </span>
                        <Button @click="signIn" label="Iniciar sesión" class="w-full mt-4 p-3 text-xl"></button>
                        <Button @click="goToRegister" label="Registrarse" class="w-full mt-4 p-3 text-xl"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { getUser } from "../firebase/firestore/users"
import router from "../router";
import { useUsersStore } from "../stores/users"

const userStore = useUsersStore();

export default {

    data() {
        return {
            email: '',
            password: '',
            errorMsg: '',
            checked: false
        }
    },
    methods: {
        goToRegister(){
            router.push('/singup')
        },
        signIn() {
            signInWithEmailAndPassword(getAuth(), this.email, this.password)
            .then( async (data) => {
                console.log("Succesfully signed!", data)
                if(getAuth().currentUser.emailVerified){
                    userStore.userData = await getUser(getAuth().currentUser.uid)
                    router.push('/'); // Envía al usuario a la pantalla de inicio
                }
                else{
                    alert("Por favor verifica tu correo para continuar")
                }
            })
            .catch((error) => {
                console.log(error.code)
                switch(error.code) {
                    case "auth/invalid-email":
                        this.errorMsg = 'Correo no válido'
                        break;
                    case "auth/user-not-found":
                        this.errorMsg = 'No se encontró un usuario con ese correo'
                        break;
                    case "auth/wrong-password":
                        this.errorMsg = 'Contraseña incorrecta'
                        break;
                    default:
                        this.errorMsg = 'El correo o la constraseña no son válidos'
                        break;
                }
                // alert(error.message)
            })
        },
    },
    computed: {
        logoColor() {
            if (this.$appState.darkTheme) return 'white';
            return 'dark';
        }
    }
}
</script>

<style scoped>
.pi-eye {
    transform:scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform:scale(1.6);
    margin-right: 1rem;
}
</style>