<template>
  <div
    class="hero"
    ref="heroRef"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <div class="slider position-relative" id="slider">
      <ul class="list-unstyled slideImage d-flex" ref="slideImageRef">
        <li v-for="(slider, index) in sliders" :key="index">
          <img :src="`/images/index_images/${slider}`" alt="" />
        </li>
      </ul>
      <div class="buttonSet">
        <a
          class="slideBtnLeft slideBtn slide-prev"
          role="button"
          @click="prevSlide"
        >
          <font-awesome-icon :icon="['fas', 'chevron-left']" />
        </a>
        <a
          class="slideBtnRight slideBtn slide-next"
          role="button"
          @click="nextSlide"
        >
          <font-awesome-icon :icon="['fas', 'chevron-right']" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

library.add(faChevronLeft, faChevronRight, faHeartRegular);

const slideIndex = ref(0);
const sliders = ["1.png", "2.png", "3.png", "4.png", "6.png"];
const slideCount = sliders.length;

const heroRef = ref(null);
const slideImageRef = ref(null);

let startX = 0;
let endX = 0;

const handleSlideGo = () => {
  const slideWidth = heroRef.value.offsetWidth;
  const slideMove = `-${slideWidth * slideIndex.value}px`;
  slideImageRef.value.style.transform = `translateX(${slideMove})`;
};

const autoSlide = setInterval(() => {
  slideIndex.value = (slideIndex.value + 1) % slideCount;
}, 8000);

const prevSlide = () => {
  slideIndex.value =
    slideIndex.value === 0 ? slideCount - 1 : slideIndex.value - 1;
};

const nextSlide = () => {
  slideIndex.value = (slideIndex.value + 1) % slideCount;
};

const onTouchStart = (e) => {
  startX = e.touches[0].clientX;
};

const onTouchMove = (e) => {
  endX = e.touches[0].clientX;
};

const onTouchEnd = () => {
  if (startX > endX) {
    nextSlide();
  } else if (startX < endX) {
    prevSlide();
  }
};

watch(slideIndex, handleSlideGo);
</script>

<style scoped>
@import "./HeroSlider.module.scss";
</style>
