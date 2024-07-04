<template>
  <div class="card4">
    <div class="card4Img">
      <a :href="`/product/productId?id=${id}`">
        <img :src="`/images/p-image/${image}`" class="card4ImgTop" alt="..." />
      </a>
    </div>
    <div class="card4Body">
      <h5 class="card4Title">{{ name }}</h5>
      <div class="card4Content">
        <div class="card4Text">
          <p>$ {{ price }}</p>
          <h6>NT$ {{ d_price }}</h6>
        </div>
        <div>
          <!-- <FavIconProduct :id="id" /> -->
        </div>
      </div>
      <a class="card4Btn" type="button" @click="handleAddToCart">
        <font-awesome-icon :icon="['fas', 'cart-shopping']" />
        <p>加入購物車</p>
      </a>
    </div>
  </div>
</template>

<script setup>
// import { useAuth } from "@/contexts/AuthContext";
// import { useCart } from "@/hooks/use-cart";
// import FavIconProduct from "../favor/FavIconProduct.vue";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css"; // 引入樣式
import { useToast } from "vue-toast-notification"; // 引入 vue-toast-notification
import "vue-toast-notification/dist/theme-sugar.css"; // 引入樣式

const props = defineProps({
  id: Number,
  name: String,
  price: Number,
  d_price: Number,
  image: String,
  qty: {
    type: Number,
    default: 1,
  },
});

// const { auth } = useAuth();
// const { addProduct } = useCart();
const toast = useToast(); // 初始化 toast

const notify = (productName) => {
  Swal.fire({
    title: "成功加入",
    text: productName + "已成功加入購物車!",
    icon: "success",
  });
};

// const handleAddToCart = () => {
//   if (!auth.isLoggedIn) {
//     return toast.error("請先登入再使用!");
//   }
//   console.log(auth.isLoggedIn);
//   notify(props.name);
//   addProduct({
//     id: props.id,
//     name: props.name,
//     price: props.d_price,
//     image: props.image,
//     qty: 1,
//   });
// };
</script>

<style scoped>
@import "./Card3.module.scss";
</style>
