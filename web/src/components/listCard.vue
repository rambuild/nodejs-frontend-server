<template>
    <m-card :icon="icon" :title="title">
        <div class="nav jc-between">
            <div
                class="nav-item"
                :class="{active:curIndex==index}"
                v-for="(i,index) in data"
                :key="index"
                @click="curIndex = index"
            >
                <div class="nav-link">{{i.title}}</div>
            </div>
        </div>
        <div class="body-content pb-2">
            <swiper :options="swiperOptions">
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
    }
}
</script>

<style>
</style>