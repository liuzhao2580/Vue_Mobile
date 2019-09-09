<template>
    <div class="PopupModule-box" v-show="showFlag">
        <!-- 遮盖层 -->
        <div class="PopupModule-coat" :style="{height : coatHeight}"></div>
        <!-- 内容 -->
        <div class="PopupModule-content" :style="{height : contentHeight}">
            <slot></slot>
        </div>
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
        },
        // 显示flag
        showFlag: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {};
    },
    created() {},
    mounted() {},
    methods: {},
    watch: {
        showFlag: {
            handler(val) {
                console.log(val,"val")
                this.showFlag = val
            },
            deep: true
        }
    }
};
</script>

<style lang="scss" scoped>
@import "./PopupModule.scss";
</style>
