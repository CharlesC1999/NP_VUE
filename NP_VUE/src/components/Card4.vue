<template>
  <div class="card5">
    <div class="d-flex">
      <div class="card5Img">
        <img :src="`/images/class-images/${image}`" alt="" />
      </div>
      <div class="card5Text">
        <div class="card5TextRwd">
          <h5>{{ name }}</h5>
        </div>
        <div class="d-flex">
          <h6>{{ speaker_title }}</h6>
          &ensp;
          <h6>{{ speaker_name }}</h6>
        </div>
        <p class="BorderP">
          {{ description }}
        </p>
        <div class="card5P">
          <p class="lectureTime">課程時間&emsp;{{ date }}</p>
          <p>
            課程定價&emsp;<span :class="LineP">{{ price }}</span>
          </p>
          <p>
            限時優惠&emsp;
            <span class="ColorP">$ {{ d_price }}</span>
          </p>
        </div>
        <a href="#" class="card5Btn"> 了解更多 </a>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  id: Number,
  name: String,
  speaker_name: String,
  description: String,
  date: String,
  price: String,
  d_price: String,
  image: String,
  speaker_title: String,
});
</script>

<style scoped>
@import "./Card4.module.scss";
</style>
