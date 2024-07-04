<template>
  <div>
    <div class="sideBarBox">
      <div class="sideTitle">
        <p class="adjS">篩選</p>
      </div>
      <div class="line"></div>
      <br />
      <h6 class="mb-3">商品類別</h6>
      <div
        v-for="category in productCate.filter((cate) => cate.parentId === null)"
        :key="category.cateId"
        class="input-group d-flex flex-row mb-1"
      >
        <input
          type="checkbox"
          :id="`category-${category.cateId}`"
          :name="`category-${category.cateId}`"
          class="checkbox"
          @change="
            () => {
              handleCategoryCheckboxChange(category.cateId);
              handleCategorySelect(category.cateId);
            }
          "
        />
        <label
          :for="`category-${category.cateId}`"
          class="label-checkbox d-flex flex-row ms-2"
        >
          {{ category.cateName }}
          <span class="ms-1">
            ({{ categoryCounts[category.cateName] || 0 }})
          </span>
        </label>
      </div>

      <h6 class="mt-4">子類別</h6>
      <div
        v-for="subCategory in filteredSubcategories"
        :key="subCategory.cateId"
        class="input-group d-flex flex-row mb-1"
      >
        <input
          type="checkbox"
          :id="`sub-category-${subCategory.cateId}`"
          :name="`sub-category-${subCategory.cateId}`"
          class="my-2 me-2 checkbox"
          @change="
            () => {
              handleCategoryCheckboxChange(subCategory.cateId);
              handleCategorySelect(subCategory.cateId);
            }
          "
        />
        <label
          :for="`sub-category-${subCategory.cateId}`"
          class="label-checkbox"
          style="color: #747e85"
        >
          {{ subCategory.cateName }}
        </label>
      </div>

      <h6 class="my-4">價格</h6>
      <div class="input-group d-flex flex-row priceRange">
        <input
          type="number"
          :value="priceRange.min"
          @input="(e) => handlePriceChange(e.target.value, 'min')"
          class="form-control"
          style="width: 80px; height: 25px"
        />
        <span style="color: #747e85">~</span>
        <input
          type="number"
          :value="priceRange.max"
          @input="(e) => handlePriceChange(e.target.value, 'max')"
          @keydown="(e) => handleKeyDown(e, 'max')"
          class="form-control"
          style="width: 80px; height: 25px"
        />
      </div>

      <h6 class="my-4">評分</h6>
      <div class="d-flex flex-row">
        <div
          v-for="score in 5"
          :key="score"
          class="d-flex flex-row me-4"
          @click="() => handleStartRating(score)"
          @mouseenter="() => handleStartHoverRating(score)"
          @mouseleave="() => handleStartHoverRating(0)"
        >
          <!-- <FaLeaf
            class="{
              [faLeafOn]: score <= rating || score <= hoverRating,
              [faLeafOff]: score > rating && score > hoverRating,
            }"
          /> -->
        </div>
      </div>

      <button class="clearFilter btn my-3" @click="resetFilters">
        重新篩選
      </button>
    </div>
  </div>
</template>

<script setup>
// import { FaLeaf } from "react-icons/fa";

const props = defineProps({
  productCate: Array,
  handleCategorySelect: Function,
  filteredSubcategories: Array,
  handleKeyDown: Function,
  priceRange: Object,
  rating: Number,
  hoverRating: Number,
  handlePriceChange: Function,
  handleStartRating: Function,
  handleStartHoverRating: Function,
  handleCategoryCheckboxChange: Function,
  resetFilters: Function,
  newCategories: Array,
  categoryCounts: Object,
});
</script>

<style scoped>
@import "./ProductSidebar.module.scss";
</style>
