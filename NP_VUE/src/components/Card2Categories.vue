<template>
  <a class="card3boxLink" @click="handleNewCategoryChange(id)">
    <div class="card3box">
      <div class="card3CategoryContent">
        <div class="cateImg">
          <img
            :src="`/images/index_images/card/${productCateIcon[id - 1]}`"
            alt=""
          />
        </div>
        <h6>{{ name }}</h6>
      </div>
    </div>
  </a>
</template>

<script setup>
const props = defineProps({
  name: String,
  id: Number,
});

const emits = defineEmits(["newCategoryChange"]);

const productCateIcon = [
  "cateVegetable01.png",
  "cateFruit.png",
  "cateMeat.png",
  "cateFish.png",
  "cateEgg.png",
  "cateMilk.png",
  "cateVegetable02.png",
];

const handleNewCategoryChange = (id) => {
  emits("newCategoryChange", id);
};
</script>

<style scoped>
@import "./Card2Categories.module.scss";
</style>
