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
                    <div
                        class="custom-indicator"
                        slot="indicator"
                    >{{ current + 1 }}/{{currentLength}}</div>
                </van-swipe>
            </div>
            <!-- 商品介绍 -->
            <div class="goodsDetail-textIntroduce">
                <!-- 当存在 秒杀的时候 -->
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
                <!-- 详情文字介绍 -->
                <div class="textIntroduce-text">
                    <!-- 标题 -->
                    <div class="text-title">{{goods.moeblName}}</div>
                    <!-- 文字 -->
                    <div class="text-box">
                        <span class="texttitle">{{goods.texttitle}}</span>
                        <span class="textcontent" ref="textcontent_ref">{{goods.textcontent}}</span>
                        <button
                            class="text-button"
                            v-show="textButton"
                            @click="textButton_Click($event)"
                        >全文</button>
                    </div>
                    <!-- 价格 -->
                    <div class="price-box">
                        <span class="new-price">
                            <i>¥</i>
                            <span>{{goods.newprice}}</span>
                        </span>
                        <span class="old-price" v-if="goods.oldprice">
                            <i>¥</i>
                            <span>{{goods.oldprice}}</span>
                        </span>
                    </div>
                </div>
            </div>
            <!-- 商品参数图片介绍 -->
            <div class="goodsDetail-imgParameter">
                <ScrollModule :scrollX="true">
                    <ul class="ul_item" slot="content" @click="ul_click">
                        <li class="li_item" v-for="(item,index) in goods.imgParameter" :key="index">
                            <img :src="item" />
                        </li>
                    </ul>
                </ScrollModule>
            </div>
            <!-- 商品 属性 -->
            <div class="goodsDetail-attribute">
                <!-- 分期 -->
                <div class="installment">
                    <span class="title">分期</span>
                    <span class="content">小米分期&nbsp;/&nbsp;花呗分期</span>
                    <van-icon name="arrow" class="icon"/>
                </div>
            </div>
            <!-- 点击 图片参数的弹出框 -->
            <van-popup v-model="imgParameter_popupShow" round position="bottom" :style="{ height: '70%' }" class="imgParameter_popupShowBox" :lazy-render="false">
                <!-- 关键参数 -->
                <div class="keyParameter-box">
                    <div class="keyParameter-title">关键参数</div>
                    <div class="keyParameter-content">
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
                <van-button type="default" class="success_btn" @click="imgParameter_popupShow = false">完成</van-button>
            </van-popup>
        </div>
        <!-- 加入购物车按钮 -->
        <van-goods-action class="goodsDetail-shopcar">
            <van-goods-action-icon icon="chat-o" text="客服" />
            <van-goods-action-icon icon="cart-o" text="购物车" :info="shopInfo" @click="shopcar" />
            <van-goods-action-button
                type="warning"
                :text="miaosha ? '立即抢购' : '加入购物车' "
                @click="shopcar_Click"
            />
        </van-goods-action>
    </div>
</template>

<script>
import { detail_post } from "@/api/home";
import ScrollModule from "@/components/ScrollModule/ScrollModule"
import Vue from "vue";
import { Lazyload } from "vant";
Vue.use(Lazyload);
export default {
    name: "goodsDetail",
    components: {
        CountDownTime: () => import("@/components/CountDownTime/CountDownTime"),
        ScrollModule
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
            goods: "",
            textButton: true, // 显示全文按钮

            imgParameter_popupShow: false,// 点击 图片参数的弹出框
            /** 商品介绍 */

            /** 加入购物车 */
            getShopInfo: this.$store.getters.gettersShopNum
                ? this.$store.getters.gettersShopNum
                : 0
            /** 加入购物车 */
        };
    },
    computed: {
        // 购物车上的数字显示
        shopInfo() {
            return this.getShopInfo ? this.getShopInfo : "";
        }
    },
    created() {
        this.init();
    },
    mounted() {},
    methods: {
        // 初始化
        init() {
            // 获取传递的数据
            let params = {
                id: this.$route.query.id
            };
            detail_post(params).then(({ data }) => {
                console.log(data);
                this.images = data.goods.img;
                this.currentLength = data.goods.img.length;
                this.miaosha = data.goods.miaosha;
                this.goods = data.goods;
            });
        },
        // 轮播图滑动事件
        onChange(index) {
            this.current = index;
        },
        // 显示全文按钮
        textButton_Click(e) {
            let getEl = e.currentTarget;
            this.textButton = false;
            getEl.parentElement.style.overflow = "inherit";
            getEl.parentElement.style.height = "100%";
            getEl.parentElement.style.display = "inherit";
        },
        // 获取文字的高度
        getText_Height() {
            this.$nextTick(() => {
                let getRef = this.$refs["textcontent_ref"];
                if (getRef.offsetHeight < 300) {
                    this.textButton = false;
                }
            });
        },
        // 点击图片参数
        ul_click() {
            this.imgParameter_popupShow = true
        },
        // 点击加入购物车
        shopcar_Click() {
            this.getShopInfo += 1;
            this.$store.dispatch("actionsGetShopNum", this.getShopInfo);
        },
        // 点击购物车
        shopcar() {
            this.$router.push({ path: "/shopcar" });
        }
    },
    watch: {}
};
</script>

<style lang="scss" scoped>
@import "./goodsDetail.scss";
</style>