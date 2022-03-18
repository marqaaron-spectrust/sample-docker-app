<template>
    <div class="view-container">
        <div class="row">
            <div class="col-12">
                <h4 class="text-center">Account Details</h4>
                <hr>
            </div>
            <div v-if="isLoggedIn" class="col-12">
                <div class="full-width-button-group">
                    <div class="btn-group">
                        <button type="button"
                                @click="onLogout()"
                                class="btn btn-danger btn-sm">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            <div v-else class="col-12">
                <div class="alert alert-danger">You are not logged in.  Please visit the Login page.</div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import {SweetAlert} from "../main";
import alerts from "../utilities/alerts";
import router from "../router";

export default {
    created(){
        this.$store.dispatch('registerNavigation','account').then(
            ()=>{},
            ()=>{}
        )
    },
    computed: {
        ...mapGetters([
            'isLoggedIn'
        ])
    },
    methods: {
        onLogout(){
            SweetAlert.fire(alerts.confirmLogout()).then(
                (result)=>{
                    if(result.isConfirmed){
                        this.$store.dispatch('requestLogout').then(
                            ()=>{
                                router.push('login')
                            }
                        )
                    }
                }
            )
        }
    }
}
</script>

<style scoped>

</style>