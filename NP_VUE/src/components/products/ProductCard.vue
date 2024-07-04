<template>
  <li :key="id" class="list-unstyled">
    <div class="productCard">
      <router-link
        :to="`/product/productId?id=${id}`"
        class="text-decoration-none"
      >
        <div class="CardImg">
          <div class="loader"></div>
          <img
            :src="`/images/p-image/${img}`"
            alt="商品圖片"
            class="object-fit"
            @load="imageLoaded"
          />
        </div>
      </router-link>

      <div class="product-info">
        <h6 class="product-name my-2">{{ name }}</h6>
        <div class="stars-row d-flex flex-row justify-content-between mb-4">
          <div class="star">
            ★
            <span class="score">({{ average_rating }})</span>
          </div>
          <button
            class="favorite-btn d-flex justify-content-center align-items-center"
            style="border: none"
          >
            <!-- <FavIconProduct :id="id" /> -->
          </button>
        </div>
        <div
          class="product-price d-flex flex-row justify-content-between align-items-center"
        >
          <div
            class="product-price d-flex flex-row justify-content-between align-items-center"
          >
            <div
              class="price-buy d-flex flex-row align-items-center justify-content-between"
            >
              <template v-if="disPrice !== null">
                <div class="price">{{ disPrice }}</div>
                <div class="original-price px-3">
                  {{ price }}
                </div>
              </template>
              <template v-else>
                <div class="price">${{ price }}</div>
              </template>
            </div>
            <button
              type="button"
              class="btn justify-content-center align-centent-center d-flex"
              @click="handleAddToCart"
            >
              <font-awesome-icon
                :icon="['fas', 'cart-shopping']"
                style="color: #50bf8b"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import Swal from "sweetalert2";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
// import FavIconProduct from "@/components/favor/FavIconProduct.vue";
// import { useAuth } from "@/contexts/AuthContext";
// import { useCart } from "@/hooks/use-cart";

library.add(faShoppingCart);

const props = defineProps({
  id: Number,
  name: String,
  price: Number,
  disPrice: Number,
  img: String,
  image: String,
  average_rating: Number,
  qty: {
    type: Number,
    default: 1,
  },
});

// const { addProduct } = useCart();
// const { auth } = useAuth();
const toast = useToast();

const MySwal = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
  },
  buttonsStyling: false,
});

const notify = (productName) => {
  MySwal.fire({
    title: "成功加入",
    text: productName + "已成功加入購物車!",
    icon: "success",
  });
};

const imageLoaded = () => {
  const imgElements = document.querySelectorAll(".CardImg img");
  imgElements.forEach((img) => {
    if (img && img.previousElementSibling) {
      img.style.display = "block"; // 確保圖片顯示
      img.previousElementSibling.style.display = "none"; // 隱藏加載器
    }
  });
};

// const handleAddToCart = (e) => {
//   e.preventDefault();

//   if (!auth.isLoggedIn) {
//     return toast.error("請先登入再使用!");
//   }
//   notify(props.name);
//   addProduct({
//     id: props.id,
//     name: props.name,
//     price: props.price,
//     image: props.image,
//     qty: props.qty,
//   });
// };
</script>

<style scoped>
@import "./ProductCard.module.scss";
</style>
