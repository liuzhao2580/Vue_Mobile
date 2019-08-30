<template>
    <div class="Home-box">
        <keep-alive>
            <router-view />
        </keep-alive>
        <div class="bottomNav">
            <ul class="bottomNav-box">
                <li v-for="item in bottomNavData" :key="item.name" class="bottomNav-li">
                    <router-link :to="item.path">
                        <div class="imgBox">
                            <van-icon v-if="item.name == '购物车'" name="shopping-cart-o" :info="gettersShopNum" />
                            <i v-else :class="item.icon"></i>
                        </div>
                        <span>{{item.name}}</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: "Home",
    components: {},
    props: {},
    data() {
        return {
            bottomNavData: [
                {
                    icon: "iconfont icon-shouye",
                    name: "首页",
                    path: "/home"
                },
                {
                    icon: "iconfont icon-shangpin",
                    name: "商品",
                    path: "/shop"
                },
                {
                    icon: "iconfont icon-gouwuche",
                    name: "购物车",
                    path: "/shopcar"
                },
                {
                    icon: "iconfont icon-yonghu",
                    name: "我的",
                    path: "/mine"
                }
            ],
        };
    },
    computed: {
        ...mapGetters(["gettersShopNum"])
    },
    created() {},
    mounted() {},
    methods: {},
    watch: {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/base.scss";
.Home-box {
    .bottomNav {
        position: fixed;
        height: $HeightBottomNav;
        background-color: $Color_fff;
        bottom: 0;
        width: 100%;
        text-align: center;
        z-index: 9999;
        .bottomNav-box {
            display: flex;
            .bottomNav-li {
                width: 25%;
                .imgBox {
                    height: 70px;
                    i {
                        font-size: 50px;
                    }
                }
                .active {
                    color: $Color_red;
                }
            }
        }
        .van-info {
            font-size: $FontSize30;
            height: 30px;
            line-height: 30px;
            min-width: 50px;
        }
    }
}
</style>
