<template>
    <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 mt-5 xl:mt-0 text-center">
                <img :src="'images/logo-maes.svg'" alt="MAE" class="mb-5" style="width:200px; height:150px;">
            </div>
            <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
                <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                    <div class="text-center mb-5">
                        <span class="text-600 font-medium">Ingresa tus datos para continuar</span>
                    </div>
                
                    <div class="w-full md:w-10 mx-auto">
                        <label for="name1" class="block text-900 text-xl font-medium mb-2">Nombre</label>
                        <InputText id="name1" v-model="name" type="text" class="w-full mb-3" placeholder="Nombre" style="padding:1rem;" />
                        <label for="surname1" class="block text-900 text-xl font-medium mb-2">Apellido</label>
                        <InputText id="surname1" v-model="surname" type="text" class="w-full mb-3" placeholder="Apellido" style="padding:1rem;" />
                        <label for="career1" class="block text-900 text-xl font-medium mb-2">Carrera (Siglas)</label>
                        <InputText id="career1" v-model="career" type="text" class="w-full mb-3" placeholder="Ej. ITC, MC, LAF" style="padding:1rem;" />
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Correo</label>
                        <InputText id="email1" v-model="email" type="text" class="w-full mb-3" placeholder="example@tec.mx" style="padding:1rem;" />
                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Contraseña</label>
                        <Password id="password1" v-model="password" placeholder="Contraseña" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>
                        <span v-if="errorMsg" class="font-medium p-error">
                            {{errorMsg}}
                        </span>
                        <Button v-if="!areFieldsFilled" disabled="disabled" label="Registrarse" class="w-full mt-4 p-3 text-xl"></button>
                        <Button v-else @click="register" label="Registrarse" class="w-full mt-4 p-3 text-xl"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import { createUser } from "../firebase/firestore/users"
import router from "../router";
// import { useRouter } from "vue-router";

export default {

    data() {
        return {
            email: '',
            password: '',
            name: '',
            surname: '',
            career: '',
            errorMsg: '',
            checked: false
        }
    },
    methods: {
        async register() {
            try {
                const matricula = this.email.split('@')[0];
                const data = {
                    email: this.email,
                    name: this.name,
                    surname: this.surname,
                    career: this.career,
                    uid: ''
                }
            
                const auth = getAuth();
                await createUserWithEmailAndPassword(auth, this.email, this.password)
                .then(async (cred) =>{
                    await sendEmailVerification(cred.user)
                })

                data.uid = auth.currentUser.uid;
                
                await createUser(data, matricula);
                
                alert("Se envió un correo de verificación, por favor verifica tu correo para iniciar sesión");
                router.push('/login');

            } catch (error) {
                console.log(error)
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
            }

        },
    },
    computed: {
        areFieldsFilled(){
            return (!!this.email && !!this.password && !!this.name && !!this.surname && !!this.career);
        },
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