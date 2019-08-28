<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="this.$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!this.$route.meta.keepAlive"></router-view>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/css/base.scss";
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $ThemeColor;
}
</style>
