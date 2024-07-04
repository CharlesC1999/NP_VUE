<template>
  <v-container>
    <v-pagination
      v-model:page="currentPage"
      :length="count"
      :total-visible="6"
      class="rounded-pagination"
      @input="handleInput"
    ></v-pagination>
  </v-container>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  count: Number,
  page: Number,
  onChange: Function,
});

const currentPage = ref(props.page);

watch(
  () => props.page,
  (newPage) => {
    currentPage.value = newPage;
  }
);

const handleInput = (value) => {
  currentPage.value = value;
  if (props.onChange) {
    props.onChange(value);
  }
  console.log("Page changed to:", value);
};
</script>

<style scoped>
.rounded-pagination :deep() .v-pagination__item {
  background-color: #f7f8f5 !important;
  color: #747e85 !important;
  font-weight: 700 !important;
  font-size: 15px !important;
  margin-inline: 8px !important;
  margin-bottom: 60px !important;
}

.rounded-pagination :deep() .v-pagination__item:hover {
  background-color: #cceadd !important;
  color: #505a60 !important;
}

.rounded-pagination :deep() .v-pagination__item--active {
  background-color: #50bf8b !important;
  color: #fefefe !important;
  font-weight: 700 !important;
  font-size: 15px !important;
}

.rounded-pagination :deep() .v-pagination__more {
  color: #747e85 !important;
  background-color: transparent !important;
  font-weight: 700 !important;
  font-size: 15px !important;
}

.rounded-pagination :deep() .v-pagination__more:hover {
  color: #747e85 !important;
  background-color: transparent !important;
  font-weight: 700 !important;
  font-size: 15px !important;
}
</style>
