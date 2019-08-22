<template>
    <div class="recommend-box">
        <!-- 轮播图 -->
        <div class="recommend-slideshow">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(image, index) in images" :key="index">
                    <img v-lazy="image" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- 分类标签 -->
        <div class="recommend-classify">
            <ul class="classify-ul">
                <li v-for="item in classifyCard" :key="item.title" class="item-li" @click="classify_liClick(item.title)">
                    <div class="item-img">
                        <img :src="item.url">
                    </div>
                    <p class="item-span">{{item.title}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import "./recommend.scss";
import Vue from "vue";
import { Lazyload } from "vant";
Vue.use(Lazyload);
import { recommend_sildershow } from "@/api/home";
export default {
    name: "recommend",
    components: {},
    props: {},
    data() {
        return {
            // 轮播图
            images: [],
            // 分类 card
            classifyCard: []
        };
    },
    created() {
        this.init();
    },
    mounted() {},
    methods: {
        // 初始化 调用接口
        init() {
            recommend_sildershow().then(({ data }) => {
                console.log(data)
                // 获取轮播图的地址
                this.images = data.banner.url;
                // 分类 card
                this.classifyCard = data.classify
            });
        },
        // classify 的点击点击事件
        classify_liClick(title) {
            console.log(title)
        }
    },
    watch: {}
};
</script>
