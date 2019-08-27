<template>
    <div id="app">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <!-- <router-view v-if="!$route.meta.keepAlive"></router-view> -->
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    created () {
        console.log(this.$route.meta)
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/base.scss";
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $ThemeColor;
    
}
</style>
