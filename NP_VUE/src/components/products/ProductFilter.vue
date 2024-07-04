<template>
  <div class="widthMax">
    <header class="productCountHeader">
      <p class="totalProducts">總共： {{ TotalRow }} 項商品</p>
      <div class="productCountControls">
        <div
          :class="sortByOpen ? 'sortBy open' : 'sortBy'"
          @click="handleSortByToggle"
          id="sortBy"
        >
          <span class="sortByLabel">排序 :</span>
          <span class="sortByValue" id="sortByValue">
            {{ sortByValue || "價錢" }}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            class="sortMobile"
          >
            <path
              fill="#8b96a5"
              d="M4 18h4c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1M3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1m1 6h10c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1"
            />
          </svg>

          <div class="sortByOptions">
            <div
              v-for="(option, index) in sortByOptions"
              :key="index"
              class="sortByOption"
              @click="
                (event) => {
                  setSortByValue(option.name);
                  setOrderby({ sort: option.sort, order: option.order });
                }
              "
              :data-value="option"
            >
              {{ option.name }}
            </div>
          </div>
        </div>

        <!-- 分類 -->
        <div
          :class="categoryOpen ? 'classSelect open' : 'classSelect'"
          @click="handleCategoryToggle"
        >
          <span class="classSelectLabel">
            {{ categoryValue || "分類" }}
          </span>
          <div v-if="categoryOpen" class="classSelectOptions">
            <div
              v-for="v in normalCategories"
              :key="v.cateId"
              class="classSelectOption"
              @click="() => handleCategorySelect(v.cateId, v.cateName)"
            >
              {{ v.cateName }}
            </div>
          </div>
        </div>
      </div>

      <div class="gridRowSelections">
        <button
          class="gridBtn"
          id="selection-btn"
          @click="onShowGrid"
          :style="buttonStyle('grid')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27px"
            height="27px"
            viewBox="0 0 24 24"
            class="selectionBtn"
          >
            <g fill="none" fill-rule="evenodd">
              <path
                d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
              />
              <path
                fill="#50bf8b"
                d="M9 13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2zm10 0a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2zM9 3a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm10 0a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
              />
            </g>
          </svg>
        </button>
        <button
          class="rowBtn"
          id="selection-btn-list"
          @click="onShowList"
          :style="buttonStyle('list')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30px"
            height="30px"
            viewBox="0 0 100 100"
            class="selectionBtnList"
          >
            <path
              fill="#50bf8b"
              d="M17.563 30.277h.012a2.268 2.268 0 0 0 2.246 2.267v.002H80.18v-.001a2.269 2.269 0 0 0 2.259-2.268h.01V19.818a2.269 2.269 0 0 0-2.269-2.265H19.821a2.27 2.27 0 0 0-2.269 2.269c0 .039.01.076.012.115zm62.616 12.227H19.821a2.27 2.27 0 0 0-2.269 2.269c0 .039.01.076.012.115v10.34h.012a2.268 2.268 0 0 0 2.246 2.267v.002h60.359v-.001a2.269 2.269 0 0 0 2.259-2.268h.01V44.769a2.272 2.272 0 0 0-2.271-2.265m0 24.95H19.821a2.27 2.27 0 0 0-2.269 2.269c0 .039.01.076.012.115v10.34h.012a2.268 2.268 0 0 0 2.246 2.267v.002h60.359v-.001a2.27 2.27 0 0 0 2.259-2.269h.01V69.718a2.272 2.272 0 0 0-2.271-2.264"
            />
          </svg>
        </button>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, defineProps, watch, onMounted, onUnmounted } from "vue";

const props = defineProps({
  onShowGrid: Function,
  onShowList: Function,
  activeButton: String,
  TotalRow: Number,
  setOrderby: Function,
  handleNewCategoryChanges: Function,
  // newCategories: Array,
  normalCategories: Array,
  setNewCategories: Function,
});

const defaultValue = ref(6);
const sortByOpen = ref(false);
const sortByValue = ref("");
const categoryOpen = ref(false);
const categoryValue = ref("產品分類");

const sortByOptions = [
  { name: "最新上架", order: "asc", sort: "upload_date" },
  { name: "價錢低至高", order: "asc", sort: "product_price" },
  { name: "價錢高至低", order: "desc", sort: "product_price" },
];

function handleCategoryToggle() {
  categoryOpen.value = !categoryOpen.value;
}

function handleSortByToggle() {
  sortByOpen.value = !sortByOpen.value;
}

function handleCategorySelect(key, label) {
  categoryValue.value = label;
  categoryOpen.value = false;
  props.setNewCategories([key]);
  console.log("Category selected:", label);
}

function handleOptionClick(value, event) {
  event.stopPropagation();
  sortByValue.value = value;
  sortByOpen.value = false;
}

watch(sortByValue, (newValue) => {
  console.log("Current sortByValue:", newValue);
});

onMounted(() => {
  function handleClickOutside(event) {
    if (sortByOpen.value && !event.target.closest(`.${styles.sortBy}`)) {
      sortByOpen.value = false;
    }
  }
  document.addEventListener("click", handleClickOutside);
  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
  });
});

const buttonStyle = (buttonType) => ({
  opacity: props.activeButton === buttonType ? "1" : "0.5",
  cursor: props.activeButton === buttonType ? "default" : "pointer",
});
</script>

<style scoped>
@import "./ProductFilter.module.scss";
</style>
