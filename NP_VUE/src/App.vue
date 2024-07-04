<template>
  <main>
    <Header />
    <ProductCateProvider style="width: 100%">
      <router-view class="pageSet"></router-view>
    </ProductCateProvider>
    <Footer />
  </main>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import ProductCateProvider from "./components/products/ProductCateProvider.vue";
</script>
<style scoped>
main {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pageSet {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
