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
                    <van-swipe-item v-for="(image, index) in images" :key="index" @click="image_PreviewShow = true">
                        <img v-lazy="image" />
                    </van-swipe-item>
                    <div
                        class="custom-indicator"
                        slot="indicator"
                    >{{ current + 1 }}/{{currentLength}}</div>
                </van-swipe>
                <div class="head-introduce"></div>
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
                <ul class="ul_item" slot="content" @click="ul_click">
                    <li class="li_item" v-for="(item,index) in goods.imgParameter" :key="index">
                        <img :src="item" />
                    </li>
                </ul>
            </div>
            <!-- 商品 属性 -->
            <div class="goodsDetail-attribute">
                <!-- 分期 -->
                <div class="installment" @click="installment_click">
                    <span class="title">分期</span>
                    <span class="content">小米分期&nbsp;/&nbsp;花呗分期</span>
                    <van-icon name="arrow" class="icon"/>
                </div>
                <!-- 以旧换新 -->
                <div class="trade-in">
                    <img src="https://gitee.com/liuzhao2580/Vue-Mobile/raw/master/src/assets/images/mobel/goods/20190905155136_03.png" lazy-load>
                </div>
                <!-- 基本信息 商品规则 收货地址 三包凭证 -->
                <div class="base-infomation">
                    <!-- 商品规则 -->
                    <div class="goods-base">
                        <span class="title">已选</span>
                        <span class="content">{{goods.moeblName}}&nbsp;3GB+32GB&nbsp;亮黑色&nbsp;x1</span>
                        <van-icon name="arrow" class="icon"/>
                    </div>
                    <!-- 收货地址 -->
                    <div class="goods-address">
                        <span class="title">送至</span>
                        <span class="content">武汉市&nbsp;江夏区&nbsp;
                            <i class="isStore">有现货</i>
                        </span>
                        <van-icon name="arrow" class="icon"/>
                    </div>
                    <!-- 三包凭证 -->
                    <div class="goods-certificate">
                        <div class="content">
                            <span class="content-span">
                                <i class="iconfont icon-iconfontdui"></i>
                                小米自营
                            </span>
                            <span class="content-span">
                                <i class="iconfont icon-iconfontdui"></i>
                                小米发货    
                            </span>
                            <span class="content-span">
                                <i class="iconfont icon-iconfontdui"></i>
                                七天无理由退货
                            </span>
                        </div>
                        <van-icon name="arrow" class="icon"/>
                    </div>
                </div>
            </div>
            <!-- 点击 图片参数的弹出框 -->
            <van-popup v-model="imgParameter_popupShow" round position="bottom" :style="{ height: '70%' }" class="imgParameter_popupShowBox">
                <!-- 关键参数 -->
                <div class="keyParameter-box">
                    <div class="keyParameter-title">关键参数</div>
                    <div class="keyParameter-content">
                        <ul class="ul_item" slot="content">
                            <li class="li_item" v-for="item in 20" :key="item">
                                <span class="li_title">一路向北</span>
                                <span class="li_content">你转身向北,侧脸还是很美</span>
                            </li>
                        </ul>
                    </div>
                    <van-button type="default" class="success_btn" @click="imgParameter_popupShow = false">完成</van-button>
                </div>
            </van-popup>

            <!-- 点击 分期 弹出框 -->
            <van-popup v-model="installment_popupShow" round position="bottom" :style="{ height: '70%' }" class="installment_popupShowBox">
                <div class="installment-box">
                    <!-- 头部 商品基本信息 -->
                    <div class="installment-head">
                        <div @click="current = 0;image_PreviewShow = true" class="head-img">
                            <img :src="images[0]" lazy-load>
                        </div>
                        <div class="head-introduce">
                            <div class="introduce-price">
                                <span class="newprice">
                                    <i>¥</i>
                                    <span>{{goods.newprice}}</span>
                                </span>
                                <span class="oldprice">
                                    <i>¥</i>
                                    <span>{{goods.oldprice}}</span>
                                </span>
                            </div>
                            <div class="introduce-text"></div>
                        </div>
                    </div>
                    <!-- 内容 分期信息 -->
                    <div class="installment-body"></div>
                    
                </div>
                <van-button type="default" class="success_btn" @click="installment_popupShow = false">立即抢购</van-button>
            </van-popup>
        </div>

        <!-- 图片预览 -->
        <van-image-preview  v-model="image_PreviewShow" :images="images" :showIndicators="true" :showIndex="false" :startPosition="current"/>
        
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
            installment_popupShow: false, // 点击 分期的弹框
            image_PreviewShow : false, // 图片预览
            /** 商品介绍 */

            /** 加入购物车 */
            getShopInfo: this.$store.getters.gettersShopNum
                ? this.$store.getters.gettersShopNum
                : 0,
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
            this.pushState()
        },
        // 分期点击事件
        installment_click() {
            this.installment_popupShow = true
            this.pushState()
        },
        // 点击加入购物车
        shopcar_Click() {
            this.getShopInfo += 1;
            this.$store.dispatch("actionsGetShopNum", this.getShopInfo);
        },
        // 点击购物车
        shopcar() {
            this.$router.push({ path: "/shopcar" });
        },
        // 初始化 用于处理用户点击物理返回按钮的事件
        pushState() {
            if (window.history && window.history.pushState) {
                history.pushState(null, null, document.URL);
                window.addEventListener("popstate", this.fun, false); //false阻止默认事件
            }
        },
        // 用于处理用户点击物理返回按钮的事件
        fun() {
            if (this.imgParameter_popupShow) {
                this.imgParameter_popupShow = false;
            }
        },
    },
    watch: {},
    destroyed() {
        // 用于处理用户点击物理返回按钮的事件
        window.removeEventListener("popstate", this.fun, false); //false阻止默认事件
    }
};
</script>

<style lang="scss" scoped>
@import "./goodsDetail.scss";
</style>