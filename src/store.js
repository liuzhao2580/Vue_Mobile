import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        searchHis: localStorage.getItem("searchHis") ? localStorage.getItem("searchHis").split(",") : [],
        // 是否展示搜索记录
        showHis: true,
        // 购物车的数量显示
        stateShopNum: parseInt(localStorage.getItem("shopNum")) ? parseInt(localStorage.getItem("shopNum")) : ""
    },
    mutations: {
        // 存入搜索历史纪录
        setSearchHis(state, SearchHisName) {
            state.showHis = true
            let hisFlag = state.searchHis.some((item) => {
                return SearchHisName == item
            })
            if (!hisFlag) {
                state.searchHis.push(SearchHisName)
            }
            localStorage.setItem("searchHis", state.searchHis)
        },
        // 清空历史纪录
        clearSearchHis(state) {
            localStorage.removeItem("searchHis")
            state.searchHis = []
            state.showHis = false
        },
        // 判断local storage中是否有数据
        isGetItem(state) {
            if (state.searchHis.length == 0) {
                state.showHis = false
            }
        },
        // 存入购物车
        setShopNum(state, setItemShopNum) {
            localStorage.setItem("shopNum", setItemShopNum)
            state.stateShopNum = parseInt(localStorage.getItem("shopNum"))
        }
    },
    actions: {
        //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
        actionsIsGetItem(context) {
            context.commit("isGetItem")
        },
        actionsGetShopNum(context, setItemShopNum) {
            context.commit("setShopNum", setItemShopNum)
        }
    },
    getters: {
        gettersSearchHis(state) {
            return state.searchHis
        },
        // 是否展示搜索记录
        gettersShowHis(state) {
            return state.showHis
        },
        // 展示 加入购物车的数量
        gettersShopNum: state => state.stateShopNum
    }
})
