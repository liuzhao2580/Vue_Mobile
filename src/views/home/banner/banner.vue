<template>
    <div class="banner-content">
        <!-- tab 标签页 -->
        <div class="banner-tab">
            <van-tabs
                @click="vanTabsClick"
                v-model="selectValue"
                animated
                :swipeable="tabs_swipeable"
            >
                <van-tab
                    v-for="item in bannerTabCard"
                    :title="item.title"
                    :key="item.title"
                >
                    <recommend v-if="item.title == '推荐'" @swipeableFun="swipeableFlag"></recommend>
                    <mobel v-else-if="item.title == '手机'"></mobel>
                </van-tab>
            </van-tabs>
            <!-- 按钮 -->
            <div class="tabOpen" @click="tabOpenBtn">
                <van-icon :name="tabBtnIcon" />
            </div>
            <!-- 标签栏 -->
            <div class="tabAllCard-box" v-show="tabCardBoxShow">
                <p class="title">全部</p>
                <div class="tag-box">
                    <template v-for="(item,index) in bannerTabCard">
                        <van-tag
                            :class="item.title == NowTitle? 'active': ''"
                            :title="item.title"
                            :key="item.title"
                            plain
                            size="large"
                            @click="tabAllCardClick(index,item.title)"
                        >{{item.title}}</van-tag>
                    </template>
                </div>
                <!-- 遮盖层 -->
                <div
                    class="Overlay-box"
                    @click="tabCardBoxShow = false, tabCardShow = true,tabBtnIcon='arrow-down'"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
import "./banner.scss";
import { recommend_sildershow } from "@/api/home";
export default {
    name: "banner",
    components: {
        recommend: () => import("./recommend/recommend"),
        mobel: () => import("./mobel/mobel")
    },
    props: {},
    data() {
        return {
            /** tab 标签页 */
            bannerTabCard: [
                {
                    title: "推荐"
                },
                {
                    title: "手机"
                },
                {
                    title: "智能"
                },
                {
                    title: "电视"
                },
                {
                    title: "笔记本"
                },
                {
                    title: "家电"
                },
                {
                    title: "生活周边"
                }
            ],
            // 选中的当前的标签
            selectValue: 0,
            tabs_swipeable: true,
            /** tab 标签页 */
            // 按钮
            tabBtnIcon: "arrow-down",
            // tab 显示隐藏
            tabCardShow: true,
            // 隐藏的 tab 的显示隐藏
            tabCardBoxShow: false,
            // 当前选中的tabs
            NowTitle: "",
            // 下拉刷新
            refreshLoading: false
        };
    },
    created() {
        this.init();
    },
    mounted() {
    },
    methods: {
        // 初始化
        init() {
            this.NowTitle = this.bannerTabCard[0].title;
        },
        // vanTabsClick tabs 的点击事件
        vanTabsClick(name, title) {
            this.NowTitle = title;
        },
        // 按钮点击事件
        tabOpenBtn() {
            this.tabCardShow = !this.tabCardShow;
            this.tabCardBoxShow = !this.tabCardBoxShow;
            if (this.tabCardShow) {
                this.tabBtnIcon = "arrow-down";
            } else {
                this.tabBtnIcon = "arrow-up";
            }
        },
        // 隐藏的tab 点击事件
        tabAllCardClick(index, title) {
            this.selectValue = index;
            this.vanTabsClick(index, title);
            this.tabCardShow = true;
            this.tabCardBoxShow = false;
        },
        // 下拉刷新
        onRefresh() {
            recommend_sildershow().then(() => {
                this.refreshLoading = false;
            });
        },
        // 接受子组件传递的参数
        swipeableFlag(flag) {
            this.tabs_swipeable = flag;
        }
    },
    watch: {}
};
</script>

<style>
[class*="van-hairline"]::after {
    display: none;
}
</style>
