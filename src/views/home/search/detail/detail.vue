<template>
    <div class="detail-box">
        <!-- 输入框 -->
        <div class="detail-header">
            <!-- 输入框 -->
            <van-cell-group class="detail-header-input">
                <van-field v-model="detailInputValue" placeholder="液晶小黑板" />
                <div class="input-icon" @click="detailHeaderBack">
                    <van-icon name="arrow-left"/>
                </div>
            </van-cell-group>
            <!-- 按钮 -->
            <van-button type="default" class="detail-header-searchBtn">搜索</van-button>
        </div>
        <!-- 热门搜索 -->
        <div class="detail-HotSearch">
            <p class="title">热门搜索</p>
            <div class="img-box">
                <img :src="HotSearchImg">
            </div>
            <div class="tabs-box">
                <van-tag v-for="item in TagData" :key="item.title" :color="item.color" text-color="black" @click="TagBtn(item.title)" size="large" :style="{borderColor: item.borderColor}">{{item.title}}</van-tag>
            </div>
        </div>
        <!-- 常用分类 -->
        <div class="detail-classify">
            <p class="title">常用分类</p>
            <div class="tabs-box">
                <van-tag v-for="item in classifyTagData" :key="item.title" color="#F5F5F5" text-color="#5A5A5A" @click="classifyTagBtn(item.title)" size="large">{{item.title}}</van-tag>
            </div>
        </div>
        <!-- 搜索记录 -->
        <div class="detail-searchHis" v-show="showHis">
            <p class="title">搜索记录</p>
            <div class="history-list">
                <div class="list-detail" v-for="item in getHisData" :key="item" @click="listDetailBtn(item)">
                    <i class="iconfont icon-shijian"></i>
                    <span>{{item}}</span>
                </div>
            </div>
            <p class="clear" @click="clearBtn">清空搜索记录</p>
        </div>
    </div>
</template>

<script>
import("./detail.scss");
import { getDetail } from '@/api/home'
export default {
    name: "detail",
    components: {},
    props: {},
    data() {
        return {
            // input 
            detailInputValue: "",
            // 热门搜索图片
            HotSearchImg: require("@/assets/images/hotSearch.png"),
            // 标签 热门搜索
            TagData: [],
            // 标签 常用分类
            classifyTagData: [],
            // 获得历史记录
            getHisData: []
        };
    },
    created() {
        this.init()
    },
    mounted() {},
    methods: {
        // 初始化
        init() {
            this.$store.dispatch("actionsIsGetItem")
            this.getHisData = this.$store.getters.gettersSearchHis
            // 数据获取
            getDetail().then(({data}) => {
                this.TagData = data.data.hotSearch.tabs
                this.classifyTagData = data.data.classify
            })
        }, 
        // 搜索框的返回按钮
        detailHeaderBack() {
            this.$router.go(-1)
        },
        // Tag的点击事件
        TagBtn(title) {
            this.detailInputValue = title
        },
        // 常用分类 Tag的点击事件
        classifyTagBtn(title) {
            this.detailInputValue = title
            this.$store.commit("setSearchHis",title)
            this.getHisData = this.$store.getters.gettersSearchHis
        },
        // 历史纪录清空按钮
        clearBtn() {
            this.$store.commit("clearSearchHis")
        },
        // 每条历史纪录点击事件
        listDetailBtn(title) {
            this.detailInputValue = title
        }
    },
    computed: {
        showHis() {
            return this.$store.getters.gettersShowHis 
        },
    },
    watch: {}
};
</script>
