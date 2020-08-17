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
        <m-list-card title="新闻资讯" icon="menu" :data="newsList">
            <template #customeSlot="{sendData}">
                <div
                    v-for="(i,index) in sendData.newsList"
                    :key="index"
                    class="py-2 d-flex newsContent"
                >
                    <span class="text-primary">{{i.categoryName}}</span>
                    <span class="flex-1 px-2 ellipsis">{{i.title}}</span>
                    <span class="text-gray6">{{i.createdAt | dateFormat}}</span>
                </div>
            </template>
        </m-list-card>
        <m-list-card title="英雄列表" icon="huiyuanhuangguanguanjun-xianxing" :data="heroList">
            <template #customeSlot="{sendData}">
                <div class="d-flex flex-wrap">
                    <div class="heroBox" v-for="(i,index) in sendData.heroList" :key="index">
                        <div class="heroItem d-flex flex-column jc-center ai-center">
                            <img :src="i.avatar" alt />
                            <span class="fs-sm p-2">{{i.name}}</span>
                        </div>
                    </div>
                </div>
            </template>
        </m-list-card>
    </div>
</template>

<script>
import dayjs from 'dayjs'
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
            newsList: [],
            heroList: []
        }
    },
    filters: {
        dateFormat(val) {
            return dayjs(val).format('MM/DD')
        }
    },
    created() {
        this.getNewsList()
        this.getHeroList()
    },
    methods: {
        async getNewsList() {
            let { data: res } = await this.$http.get('news/list')
            this.newsList = res.data
        },
        async getHeroList() {
            let { data: res } = await this.$http.get('heroes/list')
            this.heroList = res.data
        }
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
.heroBox {
    width: 20%;
    .heroItem {
        margin-left: 4px;
        img {
            width: 100%;
        }
    }
}
</style>
