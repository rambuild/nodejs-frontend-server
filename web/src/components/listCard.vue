<template>
    <m-card :icon="icon" :title="title">
        <div class="nav jc-between">
            <div
                class="nav-item"
                :class="{active:curIndex==index}"
                v-for="(i,index) in data"
                :key="index"
                @click="$refs.swiperList.swiper.slideTo(index)"
            >
                <div class="nav-link">{{i.name}}</div>
            </div>
        </div>
        <div class="body-content pb-2">
            <swiper :options="swiperOptions" @slide-change='swiperChange' ref='swiperList'>
                <swiper-slide v-for="(i,index) in data" :key="index">
                    <!-- 具名插槽 -->
                    <slot name='customeSlot' :sendData='i'></slot>
                </swiper-slide>
                <!-- <div class="swiper-pagination cus-pagination" slot="pagination"></div> -->
            </swiper>
        </div>
    </m-card>
</template>

<script>
export default {
    data() {
        return {
            curIndex: 0,
            swiperOptions:{
                pagination: {
                }
            }
        }
    },
    props: {
        icon: { type: String, required: true },
        title: { type: String, required: true },
        data: { type: Array, required: true }
    },
    methods:{
        swiperChange(){
            this.curIndex = this.$refs.swiperList.swiper.activeIndex
            // console.log(this.$refs.swiperList.swiper)
        }
    }
}
</script>

<style>
</style>