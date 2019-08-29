<template>
    <div class="ScrollModule" ref="ScrollModule">
        <slot name="content"></slot>
        <div class="ScrollModule_pulldown">
            <slot name="pulldown">
                <div class="pulldown-wrapper">
                    <div class="before-trigger" v-show="pullDown_show">{{ pullDownText }}</div>
                    <div class="before-trigger" v-show="pullDown_Loading">加载中...</div>
                </div>
            </slot>
            <div class="ScrollModule_pullSuccess" v-show="pullSuccessShow">刷新成功</div>
        </div>
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
        }
    },
    data() {
        return {
            isPullDown: false, // 正在刷新
            beforePullDown: true, // 未开始下拉刷新
            pullDownText: "下拉刷新",
            pullSuccessShow: false,
            // 下拉刷新
            pullDown_show: false,
            pullDown_Loading: false, // 加载中
        };
    },
    created() {},
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
                        scrollX: this.scrollX,
                        // startY: -100,
                        // 这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新
                        pullDownRefresh: this.pulldown
                            ? { threshold: 50, stop: 50 }
                            : false
                    });
                    // 是否派发滚动事件
                    if (this.listenScroll) {
                        // this.scroll.on("scroll", pos => {
                        //     if (pos.y > 50) {
                        //         this.pullDownText = "释放即可刷新"
                        //     }
                        // });
                        // this.scroll.on("scrollStart", (pos) => {
                        //     // 显示 下拉刷新 字样
                        //     this.pullDown_show = true;
                        //     this.pullDownText = "下拉刷新"
                        // });
                        // this.scroll.on("scrollEnd", (pos) => {
                        //     // 隐藏 加载中
                        //     this.pullDown_Loading = false;
                        // });
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
                        this.scroll.on("touchEnd",(pos) => {
                            if (pos.y > 50) {
                                this.pullDown_show = true;
                                this.pullDownText = "数据刷新中"
                            }
                        })
                        // 在一次下拉刷新的动作后
                        this.scroll.on("pullingDown", () => {
                            // 下拉动作
                            this.$emit("ScrollModuleFncPulldown");
                            // 显示 加载中 字样  隐藏 释放即可刷新 字样
                            // this.pullDown_Loading = true;
                            // this.pullDown_show = false;
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
            this.scroll &&
                this.scroll.scrollToElement.apply(this.scroll, arguments);
        },
    },
    watch: {
        data: {
            handler(val) {
                this.pullDown_show = false;
                // 当传递过来的数据存在 说明是下拉刷新事件触发完成, 调用方法, 让 下拉还原
                this.scroll.finishPullDown()
                // 重新计算 重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
                this.scroll.refresh();
                // 显示 刷新成功 
                this.pullSuccessShow = true
                setTimeout(() => {
                    this.pullSuccessShow = false
                }, 2000);
            },
            deep: true
        }
    }
};
</script>

