<template>
    <div id="appContainer">
        <div id="layoutContainer">
            <div id="navMenu">
                <NavMenu />
                <Version class="mt-3" />
            </div>
            <div id="routerViewContainer" class="container">
                <div style="height:100%" class="row">
                    <div class="col-12">
                        <RouterView />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import {SweetAlert} from "./main";
import alerts from "./utilities/alerts";
import NavMenu from "./components/NavMenu.vue";
import Version from "./components/Version.vue";

export default{
    components: {
        RouterLink,
        RouterView,
        NavMenu,
        Version
    },
    created(){
        this.$store.dispatch('fetchServerConfig').then(
            ()=>{

            },
            (result)=>{
                SweetAlert.fire(alerts.genericError(result.title,result.message))
            }
        )
    }
}
</script>

<style>

#appContainer {
    height:100vh;
    overflow-y:auto;
    background: url(./assets/shutterstock-734350459.jpeg) 0% 0% / cover no-repeat;
}

#layoutContainer {
    display:grid;
    grid-template-columns: 250px 1fr;
}

#navMenu {
    padding-top:10px;
}

.view-container {
    padding-top:10px;
}

.full-width-button-group {
    display:grid;
}

.scroll-test{
    height:5000px;
    background-color:yellow;
}

</style>
