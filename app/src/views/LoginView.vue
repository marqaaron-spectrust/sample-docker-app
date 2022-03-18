<template>
    <div class="view-container">
        <div class="row" v-if="!isLoggedIn">
            <div class="col-2"></div>
            <div class="col-8">
                <h4 class="text-center">Login</h4>
                <hr>
                <div class="input-group mb-2">
                        <span class="input-group-text"
                              id="email">Email</span>
                    <input type="text"
                           v-model="email"
                           class="form-control"
                           placeholder="Email"
                           aria-label="Email"
                           aria-describedby="email">
                </div>
                <div class="input-group mb-2">
                        <span class="input-group-text"
                              id="password">Password</span>
                    <input type="password"
                           v-model="password"
                           class="form-control"
                           placeholder="Password"
                           aria-label="Password"
                           aria-describedby="password">
                </div>
                <div class="full-width-button-group">
                    <div class="btn-group">
                        <button type="button"
                                :disabled="disableSubmit"
                                @click="onLogin()"
                                class="btn btn-primary btn-sm">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-2"></div>
        </div>
        <div v-else class="row">
            <div class="col-12">
                <div class="alert alert-success">You're already logged in.  Visit your Account page to Logout.</div>
            </div>
        </div>
    </div>
</template>

<script>
import {SweetAlert} from "../main";
import alerts from "../utilities/alerts";
import {mapGetters} from "vuex";
import router from "../router";
export default {
    data(){
        return {
            email: '',
            password: ''
        }
    },
    created(){
        this.$store.dispatch('registerNavigation','login').then(
            ()=>{},
            ()=>{}
        )
    },
    computed: {
        ...mapGetters([
            'isLoggedIn'
        ]),
        disableSubmit(){
            return (this.email === '' || this.password === '')
        }
    },
    methods: {
        onLogin(){
            let payload = {
                email: this.email,
                password: this.password
            }
            this.$store.dispatch('requestLogin',payload).then(
                ()=>{
                    router.push('/account')
                },
                (result)=>{
                    SweetAlert.fire(alerts.genericError(result.title,result.message))
                }
            )
        }
    }
}
</script>

<style scoped>
.input-group-text {
    min-width: 100px;
    max-width: 150px;
}
</style>