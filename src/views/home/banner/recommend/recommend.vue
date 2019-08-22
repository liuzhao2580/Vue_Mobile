<template>
    <div class="recommend-box">
        <!-- 轮播图 -->
        <div class="recommend-slideshow">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(image, index) in images" :key="index">
                    <img  v-lazy="image" >
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- 分类标签 -->
        <div class="recommend-classify">

        </div>
    </div>
</template>

<script>
import "./recommend.scss"
import Vue from 'vue';
import { Lazyload } from 'vant';
Vue.use(Lazyload);
import { recommend_sildershow } from "@/api/home"
export default {
    name: "recommend",
    components: {},
    props: {},
    data() {
        return {
            // 轮播图
            images: []
        };
    },
    created() {
        recommend_sildershow().then(({data}) => {
            this.images = data.banner.url
        })
    },
    mounted() {},
    methods: {},
    watch: {}
};
</script>
