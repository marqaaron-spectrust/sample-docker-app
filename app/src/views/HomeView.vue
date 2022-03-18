<template>
    <div class="view-container">
        <div id="summaryHeader">
            <div id="symbolContainer">
                <img id="specTrustSymbol" src="../assets/marqaaron-logo.png" alt="SpecTrust Symbol">
            </div>
            <div id="titleMessage">
                <h3>Simple User Application</h3>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    created(){
        this.$store.dispatch('registerNavigation','home').then(
            ()=>{},
            ()=>{}
        )
    }
}
</script>

<style>
#summaryHeader {
    height:100%;
    display: grid;
    grid-template-areas: "top top top"
                         "left center right"
                         "bottom bottom bottom";
    grid-template-rows: 150px 100px 100px;
    grid-template-columns: 15% 1fr 15%;
}

#symbolContainer {
    grid-area: center;
    margin: auto;
}

#titleMessage {
    grid-area: bottom;
    text-align: center;
    margin: auto 0;
}

#specTrustSymbol {
    width:350px;
}
</style>