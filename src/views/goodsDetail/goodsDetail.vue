<template>
    <div class="goodsDetail">
        <div class="goodsDetail-box">
            <!-- 头部的按钮 -->
            <div class="goodsDetail-header">
                <!-- 返回按钮 -->
                <div class="back-btn" @click="$router.back()">
                    <i class="iconfont icon-fanhui"></i>
                </div>
                <div class="more-btn">
                    <!-- 分享按钮 -->
                    <div class="share">
                        <i class="iconfont icon-fenxiang"></i>
                    </div>
                    <!-- 更多操作按钮 -->
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
                    <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{currentLength}}</div>
                </van-swipe>
            </div>
        </div>
    </div>
</template>

<script>
import ("./goodsDetail.scss");
import { detail_post } from "@/api/home";
import Vue from "vue";
import { Lazyload } from "vant";
Vue.use(Lazyload);
export default {
    name: "goodsDetail",
    components: {},
    props: {},
    data() {
        return {
            /** 轮播图 */
            current: 0,
            currentLength: 0,
            images: [],
            /** 轮播图 */
        };
    },
    created() {
        this.init()
    },
    mounted() {},
    methods: {
        // 初始化
        init() {
            // 获取传递的数据
            let params = {
                id : this.$route.query.id
            }
            detail_post(params).then(({data}) => {
                console.log(data)
                this.images = data.goods.img
                this.currentLength = data.goods.img.length
            })
        },
        // 轮播图滑动事件
        onChange(index) {
            this.current = index;
        }
    },
    watch: {}
};
</script>
