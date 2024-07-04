<template>
  <div class="">
    <HeroSlider class="hero" />
    <IndexContent />
  </div>
</template>

<script setup>
import HeroSlider from "../components/HeroSlider.vue";
import IndexContent from "../components/IndexContent.vue";
</script>

<style lang="scss" scoped>
.hero {
  margin-top: 175px;
}
</style>
