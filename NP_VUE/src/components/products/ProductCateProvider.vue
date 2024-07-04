<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, provide } from "vue";

const newCategories = ref([]);
const setNewCategories = (category_id) => {
  newCategories.value = category_id;
};

provide("newCategories", newCategories);
provide("setNewCategories", setNewCategories);
</script>
