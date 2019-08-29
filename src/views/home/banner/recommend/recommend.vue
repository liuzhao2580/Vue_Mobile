<template>
    <ScrollModule :pulldown="true" @ScrollModuleFncPulldown="ScrollModuleFnc" :data="TranData" :listenScroll="true">
        <div class="recommend-box" slot="content">
            <!-- SlideShowBox 包含轮播图 和 分类  -->
            <SlideShowBox :SlideShowBox="SlideShowBox_Tran"></SlideShowBox>
            <!-- 商城早报 -->
            <div class="recommend-storeNews">
                <p class="title">商城早报</p>
                <div class="content">
                    <van-swipe
                        class="content-ul"
                        vertical
                        :show-indicators="false"
                        :autoplay="3000"
                        :touchable="false"
                    >
                        <van-swipe-item
                            v-for="item in storeNews"
                            :key="item"
                            class="item-li van-ellipsis"
                        >{{item}}</van-swipe-item>
                    </van-swipe>
                </div>
            </div>
            <!-- 商城下面的图片 -->
            <div class="recommend-storeNewsImages clearfix">
                <template v-for="(item,index) in storeNewsImages">
                    <div v-if="item.pos == 'left'" class="img-left" :key="index">
                        <img :src="item.img" alt />
                    </div>
                    <div v-else-if="item.pos == 'right'" class="img-right" :key="index">
                        <img v-for="item1 in item.children" :src="item1.img" alt :key="item1.img" />
                    </div>
                    <div v-else-if="item.pos == 'bottom'" class="img-bottom" :key="index">
                        <img :src="item.img" alt />
                    </div>
                </template>
            </div>
            <!-- 秒杀 -->
            <div class="recommend-miaosha">
                <div class="title">
                    <h2>小米秒杀</h2>
                    <div class="time">
                        <div class="time-title">{{Time_title}}点场</div>
                        <div class="time-countdown">
                            <span>{{countDownHours0}}{{countDownHours}}</span>
                            <i>:</i>
                            <span>{{countDownMinute0}}{{countDownMinute}}</span>
                            <i>:</i>
                            <span>{{countDownSecond0}}{{countDownSecond}}</span>
                        </div>
                    </div>
                </div>
                <div @touchstart="touchstart" @touchend="touchend">
                    <ScrollModule class="store" :scrollX="true">
                        <div class="store-content" slot="content">
                            <div
                                v-for="(item,index) in miaoshaStore"
                                :key="index"
                                class="store-box"
                            >
                                <div class="item-img">
                                    <img v-lazy="item.url" />
                                </div>
                                <div class="item-price">
                                    <span class="price-new">¥{{item.nowPrice}}</span>
                                    <span class="price-old">¥{{item.oldPrice}}</span>
                                </div>
                            </div>
                        </div>
                    </ScrollModule>
                </div>
            </div>
            <!-- 秒杀下面的图片 -->
            <div class="recommend-image-box">
                <img v-lazy="miaoshaImage.url" />
            </div>
            <!-- 小米众筹 -->
            <div class="recommend-zhonchou">
                <div class="title">
                    <h2>小米众筹</h2>
                    <div class="more">
                        <span>更多</span>
                        <van-icon name="arrow" />
                    </div>
                </div>
            </div>
        </div>
    </ScrollModule>
</template>

<script>
import "./recommend.scss";
import Vue from "vue";
import { Lazyload } from "vant";
Vue.use(Lazyload);
import { recommend_sildershow } from "@/api/home";
export default {
    name: "recommend",
    components: {
        // 引入 SlideShowBox 组件
        SlideShowBox: () => import("@/components/SlideShowBox/SlideShowBox"),
        ScrollModule: () => import("@/components/ScrollModule/ScrollModule")
    },
    props: {},
    data() {
        return {
            /** 传递 SlideShowBox 组件 */
            SlideShowBox_Tran: {
                // 轮播图
                images: [],
                // 分类 card
                classifyCard: []
            },
            /** 传递 SlideShowBox 组件 */
            // 商城早报
            storeNews: [],
            // 商城下面的图片
            storeNewsImages: [],
            /** 秒杀 */
            countDownHours0: "",
            countDownHours: "",
            countDownMinute0: "",
            countDownMinute: "",
            countDownSecond0: "",
            countDownSecond: "",
            // 商品
            miaoshaStore: [],
            // 秒杀下面的图片
            miaoshaImage: [],
            /** 秒杀 */

            
            /** ScrollModule 组件 */
            getDataFlag: false, // 下拉刷新的时候 判断字段 
            TranData: "",  // 用于获取 数据
            /** ScrollModule 组件 */
        };
    },
    created() {
        this.init();
    },
    methods: {
        // 初始化 调用接口
        init() {
            this.getTime_title();
            recommend_sildershow().then(({ data }) => {
                console.log(data);
                // 获取轮播图的地址
                this.SlideShowBox_Tran.images = data.banner.url;
                // 分类 card
                this.SlideShowBox_Tran.classifyCard = data.classify;
                // 商城早报
                this.storeNews = data.storeNews;
                // 商城下面的图片
                this.storeNewsImages = data.storeNewsImages;
                // 秒杀商品
                this.miaoshaStore = data.miaosha;
                // 秒杀下面的图片
                this.miaoshaImage = data.miaoshaImage;
                if (this.getDataFlag) {
                    this.TranData = data
                }
            });
        },
        // 点场 title
        getTime_title() {
            let now = new Date();
            let hours = now.getHours();
            let minute = now.getMinutes();
            if (hours <= 9) {
                this.Time_title = 10;
            } else if (10 <= hours && hours <= 13) {
                this.Time_title = 14;
            } else if (14 <= hours && hours <= 19) {
                this.Time_title = 20;
            } else if (20 <= hours && hours <= 24) {
                this.Time_title = "00";
            }
            this.countDown(`${this.Time_title}:00`);
        },
        // 倒计时
        countDown(funTime) {
            setInterval(() => {
                let now = new Date();
                let year = now.getFullYear();
                let mouth = now.getMonth() + 1;
                let day = now.getDate();
                let hours = now.getHours();
                let time = `${year}-${mouth}-${day} ${funTime}`;
                // 剩余全部秒
                let residueTime = (new Date(time) - now) / 1000;
                // 小时倒计时 Math.floor(hour%10)
                this.countDownHours0 = Math.floor(
                    parseInt((residueTime / 60 / 60) % 24) / 10
                );
                this.countDownHours = Math.floor(
                    parseInt((residueTime / 60 / 60) % 24) % 10
                );
                // 分钟倒计时
                this.countDownMinute0 = Math.floor(
                    parseInt((residueTime / 60) % 60) / 10
                );
                this.countDownMinute = Math.floor(
                    parseInt((residueTime / 60) % 60) % 10
                );
                // 秒数倒计时
                this.countDownSecond0 = Math.floor(
                    parseInt(residueTime % 60) / 10
                );
                this.countDownSecond = Math.floor(
                    parseInt(residueTime % 60) % 10
                );
            }, 1000);
        },
        // 手指触摸到屏幕会触发
        touchstart() {
            this.$emit("swipeableFun", false);
        },
        // 当手指离开屏幕时，会触发
        touchend() {
            this.$emit("swipeableFun", true);
        },
        // 下拉刷新
        ScrollModuleFnc() {
            this.getDataFlag = true
            setTimeout(() => {
                this.init()
            }, 1000);
            console.log("下拉刷新")
        }
    },
    watch: {}
};
</script>
