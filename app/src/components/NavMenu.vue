<template>
    <div id="navMenuContainer">
        <div class="nav-menu-item"
             v-for="(menuItem,index) in menuItems"
             v-show="!menuItem.protected || isLoggedIn"
             :key="index">
            <RouterLink :to="menuItem.to">
                <span class="nav-menu-text">
                    {{ menuItem.title }}
                </span>
            </RouterLink>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
    data(){
        return {
            menuItems: [
                {
                    title: 'Home',
                    to: '/',
                    protected: false
                },
                {
                    title: 'Login',
                    to: '/login',
                    protected: false
                },
                {
                    title: 'Account',
                    to: '/account',
                    protected: true
                }
            ]
        }
    },
    computed: {
        ...mapGetters([
            'isLoggedIn'
        ])
    }
}
</script>

<style scoped>

.nav-menu-item > a {
    display:block;
    padding-bottom:5px;
    padding-top:5px;
    margin: 4px 10px;
    text-align:center;
    text-decoration:none;
    color: #322b2b;
    border-radius: 5px;
}

.nav-menu-text {
    padding: 0.35rem 0.65rem;
}
.nav-menu-item > a:hover{
    background-color: rgb(226 197 249);
}

.nav-menu-item > .router-link-active {
    background-color:rgb(132, 91, 166);
    color:white;
}

.nav-menu-item > .router-link-active:hover {
    background-color:rgb(132, 91, 166);
    color:white;
}

</style>