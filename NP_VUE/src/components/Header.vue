<template>
  <div :class="['container', { shrink: shrink }]">
    <div :class="['page-container', { shrink: shrink }]">
      <div :class="['main-header', { shrink: shrink }]">
        <div :class="['header-content', { shrink: shrink }]">
          <div class="logo-container">
            <router-link to="/">
              <img
                loading="lazy"
                src="/images/np_logo.png"
                alt="Company Logo"
                class="logo-image"
              />
            </router-link>
          </div>
          <form class="search-form">
            <div class="search-input-container">
              <label for="categorySelect" class="visually-hidden"
                >Select Category</label
              >
              <select id="categorySelect" class="category-select">
                <option>所有分類</option>
              </select>
              <span class="separator">|</span>
              <label for="searchInput" class="visually-hidden"
                >Search for items</label
              >
              <input
                id="searchInput"
                type="text"
                placeholder="Search for items..."
                class="search-input"
              />
            </div>
            <button type="submit" class="search-button">
              <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
            </button>
          </form>
          <nav class="user-nav">
            <a href="#" class="nav-link cart-link">
              <font-awesome-icon :icon="['far', 'heart']" />
            </a>
            <a href="#" class="nav-link cart-link">
              <font-awesome-icon :icon="['fas', 'cart-shopping']" />
            </a>
            <a href="#" class="nav-link cart-link">
              <font-awesome-icon :icon="['far', 'user']" />
            </a>
          </nav>
        </div>
      </div>
      <nav class="main-nav">
        <ul class="nav-list">
          <li class="nav-item">
            <a href="#" class="nav-link">
              <span>優惠活動</span>
            </a>
          </li>
          <li class="nav-item">
            <router-link to="/products" class="nav-link">
              <span>商品列表</span>
            </router-link>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <span>食譜精選</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <span>精選課程</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <span>講師陣容</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <span>認識Nutripolls</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserSecret,
  faMagnifyingGlass,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faHeartRegular,
  faUser,
} from "@fortawesome/free-regular-svg-icons";

library.add(
  faUserSecret,
  faMagnifyingGlass,
  faShoppingCart,
  faUser,
  faHeartRegular
);

const shrink = ref(false);
const lastScrollY = ref(0);

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  const threshold = 300;
  if (Math.abs(currentScrollY - lastScrollY.value) > threshold) {
    shrink.value = currentScrollY > lastScrollY.value;
    lastScrollY.value = currentScrollY;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="scss" scoped>
@import "./Header.scss";
</style>
