<template>
    <div class="ScrollModule" ref="ScrollModule">
        <slot name="content"></slot>
        <!-- <div class="ScrollModule_pulldown">
            <slot name="pulldown">
                <div class="pulldown-wrapper">
                    <div class="before-trigger" v-show="pullDown_show">{{ pullDownText }}</div>
                </div>
            </slot>
            <div class="ScrollModule_pullSuccess" v-show="pullSuccessShow">刷新成功</div>
        </div> -->
    </div>
</template>

<script>
import BScroll from "better-scroll";
import("./ScrollModule.scss");
export default {
    name: "ScrollModule",
    components: {},
    props: {
        probeType: {
            type: Number,
            default: 1
        },
        // 是否开启横向滚动  默认不开启
        scrollX: {
            type: Boolean,
            default: false
        },
        // 是否派发点击事件,  默认开启
        click: {
            type: Boolean,
            default: true
        },
        // 数据刷新延迟时间
        refreshDelay: {
            type: Number,
            default: 20
        },
        // 设置回弹动画的动画时长。
        bounceTime: {
            type: Number,
            default: 800
        },
        // 设置当运行 momentum 动画时，超过边缘后的回弹整个动画时间。
        swipeBounceTime: {
            type: Number,
            default: 500
        },
        // 是否派发滚动事件
        listenScroll: {
            type: Boolean,
            default: false
        },
        // 是否派发滚动到底部事件，用于上拉加载
        pullup: {
            type: Boolean,
            default: false
        },
        // 是否派发顶部下拉事件，用于下拉刷新
        pulldown: {
            type: Boolean,
            default: false
        },
        // 刷新成功
        pullSuccess: {
            type: Boolean,
            default: false
        },
        // 列表数据
        data: {
            default: null
        },
    },
    data() {
        return {
            isPullDown: false, // 正在刷新
            beforePullDown: true, // 未开始下拉刷新
            pullDownText: "下拉刷新",
            pullSuccessShow: false,
            // 下拉刷新
            pullDown_show: false
        };
    },
    created() {
    },
    mounted() {
        this.scrollModule();
    },
    methods: {
        // 初始化 scoll 插件
        scrollModule() {
            setTimeout(() => {
                this.$nextTick(() => {
                    let getRef = this.$refs["ScrollModule"];
                    this.scroll = new BScroll(getRef, {
                        // probeType: this.probeType,
                        // 派发 click 事件；
                        click: this.click,
                        swipeBounceTime: this.swipeBounceTime,
                        scrollX: this.scrollX
                    });
                    // 是否派发滚动事件
                    if (this.listenScroll) {
                        this.scroll.on("scroll", pos => {
                            this.pullDown_show = true
                            // if (pos.y < 50 ) {
                            //     this.pullDownText = "下拉刷新"
                            // }
                            // if (pos.y > 50) {
                            //     this.pullDownText = "释放即可刷新"
                            // }
                        });
                    }
                    // 是否派发滚动到底部事件，用于上拉加载
                    if (this.pullup) {
                        this.scroll.on("scrollEnd", () => {
                            if (this.scroll.y <= this.scroll.maxScrollY + 50) {
                                // this.$emit("scrollToEnd");
                            }
                        });
                    }
                    // 是否派发顶部下拉事件，用于下拉刷新
                    if (this.pulldown) {
                        this.scroll.on("touchEnd", pos => {
                            // 下拉动作
                            // if (pos.y > 50) {
                            //     // this.$emit("ScrollModuleFncPulldown")
                            // }
                        });
                    }
                    // 是否派发列表滚动开始的事件
                    if (this.beforeScroll) {
                        this.scroll.on("beforeScrollStart", () => {
                            // this.$emit("beforeScroll");
                        });
                    }
                });
            }, 20);
        },
        disable() {
            // 代理better-scroll的disable方法
            this.scroll && this.scroll.disable();
        },
        enable() {
            // 代理better-scroll的enable方法
            this.scroll && this.scroll.enable();
        },
        refresh() {
            // 代理better-scroll的refresh方法
            this.scroll && this.scroll.refresh();
        },
        scrollTo() {
            // 代理better-scroll的scrollTo方法
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
        },
        scrollToElement() {
            // 代理better-scroll的scrollToElement方法
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
        }
    },
    watch: {
        data: {
            handler(val) {
                console.log(val,"val")
            },
            deep: true
        }
    }
};
</script>

