<template>
  <div class="card2Box">
    <div class="card2BoxImg">
      <img :src="`/images/index_images/card/${image}`" alt="" />
    </div>
    <div class="card2BoxText">
      <h6>{{ title }}</h6>
      <div class="card2h6">
        <p>{{ description }}</p>
      </div>
      <a :href="url" class="card2btn" type="button"> {{ link }} → </a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  description: String,
  link: String,
  image: String,
  url: String,
});

// console.log(props.url);
</script>

<style lang="scss" scoped>
@import "./IndexCard1.module.scss";
</style>
