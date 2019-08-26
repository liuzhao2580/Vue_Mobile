<template>
    <div class="mobel-box">
         <!-- SlideShowBox 包含轮播图 和 分类  -->
        <SlideShowBox :SlideShowBox="SlideShowBox_Tran"></SlideShowBox>
        <!-- 推荐商品 -->
        <div class="mobel-recommend">
            <div class="img">
                <img v-lazy="img">
            </div>
            <div class="title-descripe">
                <div class="text-left"></div>
                <div class="text-right"></div>
            </div>  
        </div>
    </div>
</template>

<script>
import ("./mobel.scss")
import { mobel_sildershow } from "@/api/home";
export default {
    name: "mobel",
    components: {
        // 引入 SlideShowBox 组件
        SlideShowBox: () => import("@/components/SlideShowBox/SlideShowBox")
    },
    props: {},
    data() {
        return {
            /** 传递 SlideShowBox 组件 */
            SlideShowBox_Tran: {
                // 轮播图
                images: [],
                // 分类 card
                classifyCard: [],
            },
            /** 传递 SlideShowBox 组件 */
        };
    },
    created() {
        this.init()
    },
    mounted() {},
    methods: {
        // 初始化
        init() {
            mobel_sildershow().then(({data}) => {
                console.log(data)
                // 获取轮播图的地址
                this.SlideShowBox_Tran.images = data.banner.url;
                // 分类 card
                this.SlideShowBox_Tran.classifyCard = data.classify;
            })
        }
    },
    watch: {}
};
</script>
