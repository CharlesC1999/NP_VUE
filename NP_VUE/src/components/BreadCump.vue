<template>
  <div class="styleSetting">
    <nav class="widthSetting">
      <router-link :to="'/'" :style="anchorStyle" class="homeFont">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
        >
          <path fill="#78CEA6" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z" />
        </svg>
        首頁
      </router-link>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        viewBox="0 0 1024 1024"
        style="vertical-align: middle"
      >
        <path
          fill="#78CEA6"
          d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8l-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0"
        />
      </svg>
      <span
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="index"
        class="routerFont"
        style="display: inline"
      >
        <svg
          v-if="index > 0"
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 1024 1024"
          style="vertical-align: middle"
        >
          <path
            fill="#78CEA6"
            d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8l-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0"
          />
        </svg>
        <router-link :to="breadcrumb.href" :style="anchorStyle">
          {{ breadcrumb.name }}
        </router-link>
      </span>
    </nav>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const anchorStyle = {
  color: "#78cea6",
  textDecoration: "none",
  marginInline: "10px",
};

const pathNameMapping = {
  "search-result": "搜尋結果",
  "class-page": "精選課程",
  "class-detail": "課程介紹",
  speaker: "講師陣容",
  "speaker-detail": "講師介紹",
  member: "會員",
  "member-page": "修改資料",
  "password-reset": "修改密碼",
  favor: "願望清單",
  recipe: "健康食譜",
  recipeId: "食譜介紹",
  products: "商品列表",
  productId: "商品介紹",
  promote: "優惠活動",
  "member-buy": "購買清單",
  "member-coupon": "優惠券",
  "member-level": "會員等級",
  "coupons-box": "優惠券",
  // 繼續添加其他路徑和對應的中文名稱
};

const route = useRoute();

const breadcrumbs = computed(() => {
  const pathSegments = route.path
    .split("?")[0]
    .split("/")
    .filter((v) => v);

  return pathSegments.map((segment, index) => {
    const nextSegment = pathSegments[index + 1];
    const baseHref = "/" + pathSegments.slice(0, index + 1).join("/");
    let href = `${baseHref}`;

    if (segment === "class-detail" && nextSegment === undefined) {
      href += `?${route.fullPath.split("?")[1]}`;
    }

    if (segment === "speaker-detail" && nextSegment === undefined) {
      href += `?${route.fullPath.split("?")[1]}`;
    }

    const displayName = pathNameMapping[segment] || segment;

    return { name: displayName, href };
  });
});
</script>

<style scoped>
@import "./BreadCump.module.scss";
</style>
