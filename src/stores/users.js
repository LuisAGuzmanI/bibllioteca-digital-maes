import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', {
    state: () => {
        return {
            userData: {
                email: '',
                name: '',
                surname: '',
                career: '',
                matricula: '',
                roles: {
                    admin: false,
                    coordi: false,
                    mae: false,
                    student: true
                }
            },
        }
    },
    actions: {
        updateUserData(newData) {
            this.userData = newData;
        }
    }
})