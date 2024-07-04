<template>
  <div>
    <Breadcrumb class="hero" />
    <div class="iconBG">
      <div class="container wrapper Top40">
        <div class="sideBar">
          <ProductSidebar
            @click="handleResetRating"
            :priceRange="priceRange"
            @keyDown="handleKeyDown"
            :price_gte="priceRange.min"
            :price_lte="priceRange.max"
            :rating="rating"
            :hoverRating="hoverRating"
            @startRating="handleStartRating"
            @startHoverRating="handleStartHoverRating"
            @priceChange="handlePriceChange"
            :filteredSubcategories="filteredSubcategories"
            :productCate="normalCategories"
            :selectedCategory="selectedCategory"
            @categorySelect="handleCategorySelect"
            @categoryCheckboxChange="handleCategoryCheckboxChange"
            @resetFilters="resetFilters"
            :categoryCounts="categoryCounts"
            :handleCategorySelect="handleCategorySelect"
            :handleKeyDown="handleKeyDown"
            :handlePriceChange="handlePriceChange"
            :handleStartRating="handleStartRating"
            :handleStartHoverRating="handleStartHoverRating"
            :handleCategoryCheckboxChange="handleCategoryCheckboxChange"
            :resetFilters="resetFilters"
            :newCategories="newCategories"
          />
        </div>
        <div class="productW d-flex justify-content-start">
          <div class="ProductFilter pt-sm-4 pt-0 d-flex justify-content-center">
            <ProductFilter
              @showGrid="showGrid"
              @showList="showList"
              :activeButton="activeButton"
              :TotalRow="TotalRow"
              @setOrderby="setOrderby"
              :normalCategories="normalCategories"
              @setNewCategories="setNewCategories"
            />
          </div>
          <div
            class="d-flex justify-content-center align-items-center productCardBox"
          >
            <div class="d-flex justify-content-start productCard1">
              <div v-if="products.length > 0" class="cardCon">
                <div v-for="item in products" :key="item.id" class="cardS">
                  <ProductCard
                    :id="item.id"
                    :img="item.image_urls"
                    :image="item.image_urls"
                    :category_id="item.category_id"
                    :name="item.product_name"
                    :description="item.product_description"
                    :price="item.product_price"
                    :disPrice="item.discount_price"
                    :average_rating="item.average_rating"
                  />
                </div>
              </div>
              <div v-else class="d-flex justify-content-center my-5">
                <div v-if="firstRenderComplete">
                  <div class="d-flex justify-content-center my-5">
                    <h3 class="d-flex justify-content-center text-align-center">
                      查詢無結果唷！
                    </h3>
                    <img src="/images/index_images/noResultBG.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-center mb-3">
            <div
              class="pagination justify-content-center d-sm-flex d-none mt-5"
            >
              <Pagination
                class="d-flex justify-contents-center"
                :count="pageCount"
                v-model:page="page"
                :onChange="changePage"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import Breadcrumb from "../../../components/BreadCump.vue";
import ProductCard from "../../../components/products/ProductCard.vue";
import ProductSidebar from "../../../components/products/ProductSidebar.vue";
import ProductFilter from "../../../components/products/ProductFilter.vue";
import Pagination from "../../../components/Pagination.vue";

import { useProductCategories } from "../../../hook/useProductCategories.js";

const displayGrid = ref(true);
const activeButton = ref("grid");
const page = ref(1);
const perpage = ref(12);
const products = ref([]);
const total = ref(0);
const pageCount = ref(1);
const productCate = ref([]);
const priceRange = reactive({ min: "", max: "" });
const rating = ref(0);
const hoverRating = ref(0);
const orderby = reactive({ sort: "product_price", order: "asc" });
const firstRenderComplete = ref(false);
const categoryCounts = ref({});
const selectedCategory = ref(null);
const activeParentCategories = ref(new Set());
const reviewCount = ref(0);

const { newCategories, setNewCategories } = useProductCategories();

const normalCategories = computed(() =>
  productCate.value.filter(
    (cate) => cate.parentId === null && cate.cateId !== 23 && cate.cateId !== 22
  )
);
const discountCategories = computed(() =>
  productCate.value.filter((cate) =>
    [22, 14, 15, 16, 17, 18, 19, 20].includes(cate.cateId)
  )
);
const filteredSubcategories = computed(() =>
  productCate.value.filter((cate) =>
    activeParentCategories.value.has(cate.parentId)
  )
);

const router = useRouter();

const showGrid = () => {
  displayGrid.value = true;
  activeButton.value = "grid";
};

const showList = () => {
  displayGrid.value = false;
  activeButton.value = "list";
};

const resetFilters = () => {
  priceRange.min = "";
  priceRange.max = "";
  rating.value = 0;
  hoverRating.value = 0;
  setNewCategories([]);
};

const handleStartRating = (ratingValue) => {
  rating.value = ratingValue;
};

const handleStartHoverRating = (hover) => {
  hoverRating.value = hover;
};

const handleResetRating = () => {
  rating.value = 0;
};

const handleCategorySelect = (cateId) => {
  if (activeParentCategories.value.has(cateId)) {
    activeParentCategories.value.delete(cateId);
  } else {
    activeParentCategories.value.add(cateId);
  }
  selectedCategory.value = cateId;
};

const handleCategoryCheckboxChange = (cateId) => {
  setNewCategories((prev) => {
    let UICategories = [...prev];
    const currentIndex = prev.indexOf(cateId);
    if (currentIndex === -1) {
      if (childCategoryIds.includes(cateId)) {
        Object.keys(parentChildMap).forEach((parentId) => {
          if (parentChildMap[parentId].includes(cateId)) {
            UICategories = UICategories.filter(
              (id) => id !== parseInt(parentId)
            );
          }
        });
        UICategories.push(cateId);
      } else if (parentCategoryIds.includes(cateId)) {
        const hasChildSelected = parentChildMap[cateId].some((childId) =>
          UICategories.includes(childId)
        );
        if (!hasChildSelected) {
          UICategories.push(cateId);
        }
      }
    } else {
      UICategories.splice(currentIndex, 1);
      if (childCategoryIds.includes(cateId)) {
        const parentId = Object.keys(parentChildMap).find((pId) =>
          parentChildMap[pId].includes(cateId)
        );
        if (
          parentId &&
          !parentChildMap[parentId].some((childId) =>
            UICategories.includes(childId)
          )
        ) {
          UICategories.push(parseInt(parentId));
        }
      }
    }
    return UICategories;
  });
};

const handlePriceChange = (value, type) => {
  priceRange[type] = value;
};

const handleKeyDown = (e, type) => {
  if (e.key === "Enter") {
    priceRange.min = "";
    priceRange.max = "";
    e.preventDefault();
  }
};

watch(page, () => {
  queryParams.value.page = page.value;
  getProducts();
});

const changePage = (newPage) => {
  console.log("Changing page to:", newPage);
  page.value = newPage;
  queryParams.value.page = newPage;
  getProducts();
};

const queryParams = computed(() => {
  return {
    page: page.value,
    perpage: perpage.value,
    price_gte: priceRange.min || "",
    price_lte: priceRange.max || "",
    rating: rating.value || "",
    order: orderby.order,
    sort: orderby.sort,
  };
});

onMounted(() => {
  getProducts();
});

const getProducts = async () => {
  const searchParams = new URLSearchParams(queryParams.value).toString();
  const url = `http://localhost:3005/api/products?${searchParams}`;
  console.log(url);
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.status === "success") {
      products.value = data.data.products;
      pageCount.value = Math.ceil(
        data.data.totalRecords / queryParams.value.perpage
      );
      total.value = data.data.totalRecords;
      productCate.value = data.data.categories;
      categoryCounts.value = data.data.categoryCounts;
    } else {
      console.log("type not 'success'");
    }
  } catch (e) {
    console.error("Error", e);
  }
};
</script>

<style lang="scss" scoped>
@import "./ProductPage.module.scss";
.hero {
  width: 100%;
  margin-top: 175px;
}
</style>
