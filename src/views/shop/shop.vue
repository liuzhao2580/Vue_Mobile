<template>
    <div>
        <h1>shop</h1>
        <div class="div-box">
            <ScrollModule>
                <ul class="ul_item" slot="content">
                    <li class="li_item" v-for="item in 20" :key="item">
                        <span class="li_title">一路向北</span>
                        <span class="li_content">你转身向北,侧脸还是很美</span>
                    </li>
                </ul>
            </ScrollModule>
        </div>
    </div>
</template>

<script>
export default {
    name: "shop",
    components: {
        ScrollModule: () => import("@/components/ScrollModule/ScrollModule")
    },
    props: {},
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
@import "./shop.scss";
</style>
