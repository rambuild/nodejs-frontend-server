<template>
    <div class="home">
        <div class="swiperWrapper">
            <swiper ref="mySwiper" :options="swiperOptions">
                <swiper-slide>
                    <img src="../assets/images/banner1.jpeg" class="w-100 h-100" alt />
                </swiper-slide>
                <swiper-slide>
                    <img src="../assets/images/banner2.jpeg" class="w-100 h-100" alt />
                </swiper-slide>
                <swiper-slide>
                    <img src="../assets/images/banner3.jpeg" class="w-100 h-100" alt />
                </swiper-slide>
                <div class="swiper-pagination cus-pagination" slot="pagination"></div>
            </swiper>
        </div>
        <div class="guideContent d-flex flex-wrap">
            <div class="wraplist" v-for="i in 12" :key="i">
                <div class="wrap text-gray6">
                    <i class="iconfont icon-icon-test"></i>
                    <span>爆料站</span>
                </div>
            </div>
            <div class="shouqi text-center flex-1 py-2">
                <i class="iconfont icon-double-arrow-top"></i>
                <span>收起</span>
            </div>
        </div>
        <!-- <div class="card bg-white px-4">
            <div class="card-header d-flex py-3 text-gray3">
                <i class="iconfont icon-menu"></i>
                <div class="fs-xl flex-1 px-2">新闻资讯</div>
                <i class="iconfont icon-menu1"></i>
            </div>
            <div class="card-body">
                <div class="nav jc-between">
                    <div class="nav-item active">
                        <div class="nav-link">热门</div>
                    </div>
                    <div class="nav-item">
                        <div class="nav-link">新闻</div>
                    </div>
                    <div class="nav-item">
                        <div class="nav-link">公告</div>
                    </div>
                    <div class="nav-item">
                        <div class="nav-link">活动</div>
                    </div>
                    <div class="nav-item">
                        <div class="nav-link">赛事</div>
                    </div>
                </div>
                <div class="body-content">
                    <swiper @click-slide="handleClickSlide">
                        <swiper-slide v-for="i in 5" :key="i">
                            <div v-for="i in 5" :key="i" class="py-2 d-flex">
                                <span>公告</span>
                                <span class="flex-1 pl-2">7月22日体验服停机更新公告</span>
                                <span>07/22</span>
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
        </div>-->
        <m-list-card title="测试" icon="menu" :data="newsList">
            <template #customeSlot="{sendData}">
                <div v-for="(i,index) in sendData.data" :key="index" class="py-2 d-flex">
                    <span>{{i.type}}</span>
                    <span class="flex-1 pl-2">{{i.subTitle}}</span>
                    <span>{{i.date}}</span>
                </div>
            </template>
        </m-list-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loop: [
                { src: '../assets/images/banner1.jpeg' }
            ],
            swiperOptions: {
                // autoplay: {
                //     delay: 3000,
                //     disableOnInteraction: false
                // },
                speed: 600,  // 切换图片速度
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }
            },
            newsList: [
                {
                    title: '热门',
                    data: new Array(5).fill({}).map(v => ({
                        type: '热门公告',
                        subTitle: '7月22日体验服停机更新公告',
                        date: '06/16'
                    }))
                },
                {
                    title: '新闻',
                    data: new Array(5).fill({}).map(v => ({
                        type: '新闻公告',
                        subTitle: '7月22日体验服停机更新公告',
                        date: '06/16'
                    }))
                },
                {
                    title: '公告',
                    data: new Array(5).fill({}).map(v => ({
                        type: '公告公告',
                        subTitle: '7月22日体验服停机更新公告',
                        date: '06/16'
                    }))
                },
                {
                    title: '活动',
                    data: new Array(5).fill({}).map(v => ({
                        type: '活动公告',
                        subTitle: '7月22日体验服停机更新公告',
                        date: '06/16'
                    }))
                },
                {
                    title: '赛事',
                    data: new Array(5).fill({}).map(v => ({
                        type: '赛事公告',
                        subTitle: '7月22日体验服停机更新公告',
                        date: '06/16'
                    }))
                }
            ]
        }
    },
    methods: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.swiper-wrapper,
.swiper-container {
    height: 165px;
}
.my-bullet {
    border-radius: 0.02rem;
    width: 0.04rem;
    height: 0.04rem;
    margin: 0 0.03rem;
    display: inline-block;
    background: rgba(0, 0, 0, 0.2);
}
.my-bullet-active {
    background: #3cdbc0;
    width: 0.16rem;
}
.cus-pagination {
    text-align: right;
    padding-right: 20px;
    /deep/ .swiper-pagination-bullet {
        border-radius: 2px;
        background-color: #fff;
        opacity: 0.9;
    }
    /deep/ .swiper-pagination-bullet-active {
        background-color: #4b67af;
        opacity: 1;
    }
}
.guideContent {
    background-color: #fff;
    margin: 1rem 0;
    .wraplist {
        width: 25%;
        height: 70px;
        padding-top: 1rem;
        .wrap {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-right: solid 1px #d4d9de;
        }
        &:nth-child(4n) {
            .wrap {
                border-right: none;
            }
        }
        i {
            font-size: 25px;
            margin-bottom: 0.8rem;
        }
    }
    .shouqi {
        background-color: rgb(249, 249, 249);
        i,
        span {
            font-size: 12px !important;
        }
    }
}
</style>
