<template>
    <div class="view-container">
        <div class="row">
            <div class="col-12">
                <div class="alert alert-danger">This page does not exist!</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    created(){
        this.$store.dispatch('registerNavigation','not-found').then(
            ()=>{},
            ()=>{}
        )
    },
    computed: {

    },
    methods: {

    }
}
</script>

<style scoped>

</style>