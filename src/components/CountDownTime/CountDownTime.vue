<template>
    <div class="CountDownTime-box">
        <div class="countDown-title">{{title}}</div>
        <div class="countDown-time">
            <span v-if="countDownDay">{{countDownDay}}天&nbsp;</span>
            <span>{{countDownHours0}}{{countDownHours}}</span>
            <i>:</i>
            <span>{{countDownMinute0}}{{countDownMinute}}</span>
            <i>:</i>
            <span>{{countDownSecond0}}{{countDownSecond}}</span>
        </div>
    </div>
</template>

<script>
import("./CountDownTime.scss");
export default {
    name: "CountDownTime",
    components: {},
    props: {
        // 倒计时的 标题
        title : {
            default: "距结束",
        },
        // 指定的 结束时间
        countDown_Time: {
            default: new Date()
        }
    },
    data() {
        return {
            countDownDay: "",
            countDownHours0: "",
            countDownHours: "",
            countDownMinute0: "",
            countDownMinute: "",
            countDownSecond0: "",
            countDownSecond: "",
        };
    },
    created() {
        this.countDown()
    },
    mounted() {},
    methods: {
        // 倒计时
        countDown() {
            // 获取现在时间的时间戳
            let now = new Date();
            // 获取指定时间
            let getTime = this.countDown_Time
            // 剩余全部秒
            let residueTime = (new Date(getTime) - now) / 1000;
            let clearTime = setInterval(() => {
                // 获取现在时间的时间戳
                let now = new Date();
                // 获取指定时间
                let getTime = this.countDown_Time
                // 剩余全部秒
                let residueTime = (new Date(getTime) - now) / 1000;
                // 天数倒计时
                this.countDownDay = Math.floor(
                    parseInt((residueTime / 60 / 60) / 24)
                );
                // 小时倒计时
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
            if (residueTime <=0) {
                clearInterval(clearTime)
            }
        },
    },
    watch: {}
};
</script>
