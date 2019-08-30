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
            <!-- 商品介绍 -->
            <div class="goodsDetail-textIntroduce">
                <div class="textIntroduce-miaosha" v-if="miaosha">
                    <div class="miaosha-price">
                        <span>秒杀价</span>
                        <i>¥</i>
                        <span>{{miaosha.miaoshaprice}}</span>
                    </div>
                    <div class="miaosha-time">
                        <CountDownTime :countDown_Time="miaosha.miaoshatime"></CountDownTime>
                    </div>
                </div>
            </div>
            <!-- 加入购物车按钮 -->
            <van-goods-action class="goodsDetail-shopcar">
                <van-goods-action-icon icon="chat-o" text="客服"/>
                <van-goods-action-icon icon="cart-o" text="购物车" :info="shopInfo" @click="shopcar"/>
                <van-goods-action-button type="warning" :text="miaosha ? '立即抢购' : '加入购物车' " @click="shopcar_Click"/>
            </van-goods-action>
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
    components: {
        CountDownTime: () => import("@/components/CountDownTime/CountDownTime")
    },
    props: {},
    data() {
        return {
            /** 轮播图 */
            current: 0,
            currentLength: 0,
            images: [],
            /** 轮播图 */

            /** 商品介绍 */
            miaosha: "",
            /** 商品介绍 */

            /** 加入购物车 */
            getShopInfo: this.$store.getters.gettersShopNum ? this.$store.getters.gettersShopNum : 0
            /** 加入购物车 */
        };
    },
    computed: {
        // 购物车上的数字显示
        shopInfo (){
            return this.getShopInfo ? this.getShopInfo : ""
        },
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
                this.miaosha = data.goods.miaosha
            })
        },
        // 轮播图滑动事件
        onChange(index) {
            this.current = index;
        },
        // 点击加入购物车
        shopcar_Click() {
            this.getShopInfo += 1
            this.$store.dispatch("actionsGetShopNum", this.getShopInfo)
        },
        // 点击购物车
        shopcar() {
            this.$router.push({path: "/shopcar"})
        }
    },
    watch: {}
};
</script>
