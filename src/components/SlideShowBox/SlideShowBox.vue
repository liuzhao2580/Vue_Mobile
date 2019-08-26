<template>
    <div class="SlideShowBox-box">
        <!-- 轮播图 -->
        <div class="SlideShowBox-slideshow">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(image, index) in images" :key="index">
                    <img v-lazy="image" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- 分类标签 -->
        <div class="SlideShowBox-classify">
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
    </div>
</template>

<script>
import "./SlideShowBox.scss";
export default {
    name: "SlideShowBox",
    components: {},
    props: ["SlideShowBox"],
    data() {
        return {
            // 轮播图
            images: [],
            // 分类 card
            classifyCard: [],
        };
    },
    created() {
    },
    mounted() {},
    methods: {
        // 初始化
        init() {
            this.images = this.SlideShowBox.images
            this.classifyCard = this.SlideShowBox.classifyCard
        },
        // classify 的点击点击事件
        classify_liClick(title) {
            console.log(title);
        },
    },
    watch: {
        SlideShowBox: {
            handler(val) {
                console.log(val)
                this.init()
            },
            deep: true
        }
    }
};
</script>
