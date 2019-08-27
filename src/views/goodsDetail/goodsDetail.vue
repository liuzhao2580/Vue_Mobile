<template>
    <div class="goodsDetail">
        <div class="goodsDetail-box">
            <!-- 头部的按钮 -->
            <div class="goodsDetail-header">
                <div class="back-btn">
                    <i class="iconfont icon-fanhui"></i>
                </div>
                <div class="more-btn">
                    <div class="share">
                        <i class="iconfont icon-fenxiang"></i>
                    </div>
                    <div class="more">
                        <i class="iconfont icon-gengduo1"></i>
                    </div>
                </div>
            </div>
            <!-- 商品图片 -->
            <div class="goodsDetail-imgIntroduce">
                <van-swipe @change="onChange">
                    <van-swipe-item v-for="(image, index) in images" :key="index">
                        <img v-lazy="image" />
                    </van-swipe-item>
                    <div class="custom-indicator" slot="indicator">{{ current + 1 }}/4</div>
                </van-swipe>
            </div>
        </div>
    </div>
</template>

<script>
import("./goodsDetail.scss");
import Vue from "vue";
import { Lazyload } from "vant";
Vue.use(Lazyload);
export default {
    name: "goodsDetail",
    components: {},
    props: {},
    data() {
        return {
            current: 0,
            images: [
                "https://img.yzcdn.cn/vant/apple-1.jpg",
                "https://img.yzcdn.cn/vant/apple-2.jpg"
            ]
        };
    },
    created() {},
    mounted() {},
    methods: {
        // 轮播图滑动事件
        onChange(index) {
            this.current = index;
        }
    },
    watch: {}
};
</script>
