<template>
    <div class="PopupModule-box">
        <!-- 遮盖层 -->
        <div class="PopupModule-coat" :style="{height : coatHeight}"></div>
        <!-- 内容 -->
        <div class="PopupModule-content" :style="{height : contentHeight}"></div>
    </div>
</template>

<script>
export default {
    name: "PopupModule",
    components: {},
    props: {
        // 遮盖层高度
        coatHeight: {
            default: "30%"
        },
        // 内容高度
        contentHeight: {
            default: "70%"
        }
    },
    data() {
        return {};
    },
    created() {},
    mounted() {},
    methods: {},
    watch: {}
};
</script>

<style lang="scss" scoped>
@import "./PopupModule.scss";
</style>
