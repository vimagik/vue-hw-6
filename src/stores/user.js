import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";


export const useUserStore = defineStore('user', () => { 
    const username = ref('')
    const router = useRouter()
    
    function logout() {
        username.value = ''
        localStorage.setItem("user", '')
    }

    function login(name) {
        username.value = name
        localStorage.setItem("user", name)
        router.push('/')
    }

    const acronym = computed(() => {
        return username.value.slice(0, 2)
    })

    return { username, logout, login, acronym}
})