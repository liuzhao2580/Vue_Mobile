<template>
    <div class="searchModule-box">
        <!-- 信息框 -->
        <div class="search-info" @click="searchInfoClick">
            <van-goods-action-icon class="iconfont icon-6" info="." />
        </div>
        <!-- 输入框 -->
        <div class="search-input">
            <input type="text" v-model="searchInputValue" @focus="searchInputFocus" />
            <div class="search-icon">
                <i class="iconfont icon-sousuo-copy"></i>
            </div>
        </div>
        <!-- 扫码 -->
        <div class="search-saoma" @click="saomaBtn">
            <i class="iconfont icon-scancode"></i>
            <!-- <input type="file" accept="image/*" capture="camera" @change="saomaBtn"> -->
        </div>

        <!-- 消息弹出框 -->
        <van-popup
            v-model="searchInfoPopup"
            position="right"
            :style="{ height: '100%', width: '100%' }"
            :duration="0.4"
        >
            <div class="searchInfoPopup-box">
                <!-- 头部 -->
                <div class="searchInfoPopup-head">
                    <div class="searchInfo-back" @click="searchInfoBackBtn">
                        <van-icon name="arrow-left" />
                        <span>消息通知</span>
                    </div>
                    <div class="searchInfo-clear">
                        <i class="iconfont icon-qingkong"></i>
                    </div>
                </div>
                <!-- 内容 -->
                <div class="searchInfoPopup-content">
                    <div class="content">
                        <div class="card">
                            <!-- 物流 -->
                            <div class="wuliu" @click="InfoPopupCard('交易物流')">
                                <img src="../../../assets/images/wuliu.png" />
                                <p>交易物流</p>
                            </div>
                            <!-- 通知 -->
                            <div class="tongzhi" @click="InfoPopupCard('服务通知')">
                                <img src="../../../assets/images/tongzhi.png" />
                                <p>服务通知</p>
                            </div>
                        </div>
                        <!-- 空消息内容 -->
                        <div class="empty">
                            <i class="iconfont icon-kong"></i>
                            <p>当前没有任何消息哦</p>
                        </div>
                    </div>
                </div>
            </div>
        </van-popup>

        <!-- 消息弹出框  点击交易物流或者服务通知卡片 -->
        <van-popup
            v-model="searchInfoPopupCard"
            position="right"
            :style="{ height: '100%', width: '100%' }"
            :duration="0.4"
        >
            <div class="searchInfoPopup-box">
                <!-- 头部 -->
                <div class="searchInfoPopup-head">
                    <div class="searchInfo-back" @click="searchInfoCardBackBtn">
                        <van-icon name="arrow-left" />
                        <span>{{searchInfoPopupCard_Title}}</span>
                    </div>
                    <!-- 空消息内容 -->
                    <div class="empty" style="margin-top: 200px;color: #C1C1C1">
                        <i class="iconfont icon-kong" style="font-size: 70px;"></i>
                        <p style="color: #727272;font-size: 16px;">当前没有任何消息哦</p>
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import("./search.scss");
export default {
    name: "search",
    components: {},
    props: {},
    data() {
        return {
            // 输入框
            searchInputValue: "液晶小电视",
            // 消息弹出框
            searchInfoPopup: false,
            /** 点击交易物流或者服务通知卡片 */
            // 点击交易物流或者服务通知卡片
            searchInfoPopupCard: false,
            // 消息弹出框 title
            searchInfoPopupCard_Title: ""
            /** 点击交易物流或者服务通知卡片 */
        };
    },
    created() {},
    mounted() {},
    methods: {
        // 初始化 用于处理用户点击物理返回按钮的事件
        init() {
            if (window.history && window.history.pushState) {
                history.pushState(null, null, document.URL);
                window.addEventListener("popstate", this.fun, false); //false阻止默认事件
            }
        },
        // 用于处理用户点击物理返回按钮的事件
        fun() {
            if (this.searchInfoPopup && !this.searchInfoPopupCard) {
                this.searchInfoPopup = false;
            }
            if (this.searchInfoPopupCard) {
                this.searchInfoPopupCard = false;
            }
        },
        // 信息框点击事件
        searchInfoClick() {
            this.searchInfoPopup = true;
            this.init();
        },
        // 输入框的获取焦点事件
        searchInputFocus() {
            this.$router.push({ path: "detail" });
        },
        // 消息框的弹出框 点击返回事件
        searchInfoBackBtn() {
            this.searchInfoPopup = false;
        },
        /** 点击交易物流或者服务通知卡片 */
        // 消息框的弹出框 卡片的点击事件
        InfoPopupCard(card) {
            this.searchInfoPopupCard = true;
            this.searchInfoPopupCard_Title = card;
            this.init();
        },
        // 点击返回事件
        searchInfoCardBackBtn() {
            this.searchInfoPopupCard = false;
        },
        /** 点击交易物流或者服务通知卡片 */

        /** 扫码 */
        saomaBtn() {
            // alert(window.plus)
        }
        /** 扫码 */
    },
    watch: {},
    destroyed() {
        // 用于处理用户点击物理返回按钮的事件
        window.removeEventListener("popstate", this.fun, false); //false阻止默认事件
    }
};
</script>
