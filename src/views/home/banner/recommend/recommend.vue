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
                <li
                    v-for="item in classifyCard"
                    :key="item.title"
                    class="item-li"
                    @click="classify_liClick(item.title)"
                >
                    <div class="item-img">
                        <img :src="item.url" />
                    </div>
                    <p class="item-span">{{item.title}}</p>
                </li>
            </ul>
        </div>
        <!-- 商城早报 -->
        <div class="recommend-storeNews">
            <p class="title">商城早报</p>
            <div class="content">
                <van-swipe class="content-ul" vertical :show-indicators="false" :autoplay="3000">
                    <van-swipe-item v-for="item in storeNews" :key="item" class="item-li van-ellipsis">{{item}}</van-swipe-item>
                </van-swipe>
            </div>
        </div>
        <!-- 商城下面的图片 -->
        <div class="recommend-storeNewsImages">
            <div class="img-box" v-for="(item,index) in storeNewsImages" :key="index">
                <div v-if="item.pos == 'left'" class="img-left">
                    <img :src="item.img" alt="">
                </div>
                <div v-else-if="item.pos == 'right'" class="img-rigth">
                    <img v-for="item1 in item.children" :src="item1.img" alt="" :key="item1.img">
                </div>
                <div v-else-if="item.pos == 'bottom'" class="img-bottom">
                    <img :src="item.img" alt="">
                </div>
            </div>
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
            classifyCard: [],
            // 商城早报
            storeNews: [],
            // 商城下面的图片
            storeNewsImages: []
        };
    },
    created() {
        this.init();
    },
    mounted() {
    },
    methods: {
        // 初始化 调用接口
        init() {
            recommend_sildershow().then(({ data }) => {
                console.log(data);
                // 获取轮播图的地址
                this.images = data.banner.url;
                // 分类 card
                this.classifyCard = data.classify;
                // 商城早报
                this.storeNews = data.storeNews;
                // 商城下面的图片
                this.storeNewsImages = data.storeNewsImages
            });
        },
        // classify 的点击点击事件
        classify_liClick(title) {
            console.log(title);
        }
    },
    watch: {}
};
</script>
