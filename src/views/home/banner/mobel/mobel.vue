<template>
    <ScrollModule :pulldown="true" @ScrollModuleFncPulldown="ScrollModuleFnc" :data="TranData" :listenScroll="true">
        <div class="mobel-box" slot="content">
            <!-- SlideShowBox 包含轮播图 和 分类  -->
            <SlideShowBox :SlideShowBox="SlideShowBox_Tran"></SlideShowBox>
            <!-- 推荐商品 -->
            <div class="mobel-recommend">
                <div class="img">
                    <img v-lazy="mobelRecommend.img" />
                </div>
                <div class="title-descripe">
                    <div class="text-left">
                        <p>{{mobelRecommend.text_header}}</p>
                        <p>{{mobelRecommend.text_content}}</p>
                    </div>
                    <div class="text-right">
                        <div class="price">
                            <span>
                                <i>¥</i>
                                <em>{{mobelRecommend.now_price}}</em>
                                <i>起</i>
                            </span>
                            <span>
                                <i>¥</i>
                                {{mobelRecommend.old_price}}
                            </span>
                        </div>
                        <van-button type="danger">立即购买</van-button>
                    </div>
                </div>
            </div>
            <!-- 商品 -->
            <div class="mobel-goods">
                <ul class="goods-ul">
                    <li
                        v-for="(item,index) in mobelGoods"
                        :key="index"
                        class="item-li"
                        @click="goods_detail(item)"
                    >
                        <div class="item-img">
                            <img v-lazy="item.url" />
                        </div>
                        <div class="item-title">{{item.title}}</div>
                        <div class="item-introduce">{{item.introduce}}</div>
                        <div class="item-price">
                            <div class="new-price">
                                <i>¥</i>
                                <em>{{item.newprice}}</em>
                                <i>起</i>
                            </div>
                            <div v-if="item.oldprice" class="old-price">
                                <i>¥</i>
                                <em>{{item.oldprice}}</em>
                            </div>
                        </div>
                        <div class="item-button">
                            <van-button type="default">{{item.button}}</van-button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </ScrollModule>
</template>

<script>
import("./mobel.scss");
import { mobel_sildershow } from "@/api/home";
export default {
    name: "mobel",
    components: {
        // 引入 SlideShowBox 组件
        SlideShowBox: () => import("@/components/SlideShowBox/SlideShowBox"),
        // 引入 better-scroll 组件
        ScrollModule: () => import("@/components/ScrollModule/ScrollModule"),
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
            // 推荐商品
            mobelRecommend: {},
            // 商品
            mobelGoods: [],

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
        // 初始化
        init() {
            mobel_sildershow().then(({ data }) => {
                console.log(data);
                // 获取轮播图的地址
                this.SlideShowBox_Tran.images = data.banner.url;
                // 分类 card
                this.SlideShowBox_Tran.classifyCard = data.classify;
                // 推荐商品
                this.mobelRecommend = data.recommend;
                // 商品
                this.mobelGoods = data.goods;
                if (this.getDataFlag) {
                    this.TranData = data
                }
            });
        },
        // 点击商品
        goods_detail(detail) {
            this.$router.push({ path: "/goodsDetail",query: {id:detail.id} });
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
