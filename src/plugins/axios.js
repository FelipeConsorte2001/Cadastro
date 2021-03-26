import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'https://cadastroanimal-ed670-default-rtdb.firebaseio.com/'

Vue.use({
    install(Vue){
        Vue.prototype.$http = axios
        
    }
})