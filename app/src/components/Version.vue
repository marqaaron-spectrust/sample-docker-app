<template>
    <div id="versionContainer" v-if="appConfig.server">
        <span class="badge bg-info">Version: {{appConfig.server.VERSION}}</span>
    </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
    computed: {
        ...mapGetters([
            'appConfig'
        ])
    }
}
</script>
<style>
#versionContainer {
    text-align: center;
}
</style>