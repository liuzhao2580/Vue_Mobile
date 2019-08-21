<template>
    <div class="home-box">
        <!-- 固定的搜索框 -->
        <div class="search-box">
            <search></search>
        </div>
        <!-- banner 包含轮播图和 分类选项-->
        <div class="banner-box">
            <banner></banner>
        </div>
    </div>
</template>

<script>
import ("./home.scss")
import { getIndex } from "@/api/index";
export default {
    name: "home",
    components: {
        search: () => import("./search/search.vue"),
        banner: () => import("./banner/banner")
    },
    props: {},
    data() {
        return {};
    },
    created() {
        this.init();
    },
    mounted() {},
    methods: {
        init() {
            getIndex().then(({ data }) => {
                console.log(data);
            });
        }
    },
    watch: {}
};
</script>
