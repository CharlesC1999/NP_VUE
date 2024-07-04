<template>
  <a :href="`/recipe/recipeId?id=${id}`" class="Card6RecipeLink">
    <div class="card6">
      <div class="card6Img">
        <img :src="`/images/r-images/${image}`" alt="" />
      </div>
      <div class="card6Text">
        <h5>{{ title }}</h5>
        <p>{{ content }}</p>
      </div>
    </div>
  </a>
</template>

<script setup>
const props = defineProps({
  id: Number,
  title: String,
  image: String,
  content: String,
});
</script>

<style scoped>
@import "./Card5.module.scss";
</style>
