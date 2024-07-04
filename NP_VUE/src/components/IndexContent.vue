<template>
  <div class="wrapper nutripollP">
    <div class="titleP">
      <h1 class="titleNutripoll">營養大選 Nutripolls</h1>
      <h6>精挑細選 賣自己想吃的好食物</h6>
      <br />
    </div>
    <div class="textNutripoll">
      <h5>
        「營養」不只是一個名稱，它象徵著我們對健康的深切關注與堅定不移的承諾。我們精選每一樣食材，希望您在品嚐美味的同時，也能感受到那份對身心健康的細心照料。
        「大選」意味著您在我們這裡擁有豐富的選擇。每一項食材背後，都是我們基於質量、新鮮度和營養價值的嚴格篩選
        選擇一種對生活的熱愛、對健康的追求，以及對飲食質量的不懈探索。讓我們攜手前行，將每一餐轉化為對身心的深刻滋養，共同經歷這場由內而外的健康與美好之旅。
      </h5>
    </div>
    <div class="buttonNutripoll">
      <a type="button" class="btn1">了解Nutripolls </a>
    </div>
  </div>

  <div class="wrapper NutripollCard1">
    <div class="card1Rwd">
      <div class="card1Img">
        <img src="/images/index_images/Herosection02.png" />
      </div>
      <div class="card1Text">
        <h3>從餐桌開始，做出更好的選擇</h3>
        <h6>
          在您日常享用的每一口食物中，您是否真正放心？當食品添加物與過度加工成為常態，農藥殘留悄悄侵入我們的餐盤，健康食物的美味被誤解，進口食材的碳足跡無形中加重，而包裝浪費更是環境的隱憂
        </h6>
        <h6>
          我們可以，也應該為自己、為環境作出更好的選擇！讓我們一同回歸飲食的本質
          —「減法」的智慧。不是減少食物的選擇，而是減少對健康和環境的負擔
        </h6>
        <h6>這場由內而外的轉變，就從您的餐桌開始</h6>
      </div>
    </div>
  </div>

  <div class="wrapper">
    <div class="Nutripollcard2">
      <IndexCard1
        v-for="v in cardData"
        :key="v.id"
        :title="v.title"
        :description="v.description"
        :link="v.link"
        :image="v.image"
        :url="v.url"
      />
    </div>
  </div>

  <div class="wrapper CategoryRwd">
    <div class="cateBtn">
      <h4 class="MeAuto">商品分類</h4>
    </div>
    <div class="Nutripollcard3">
      <Card2Categories
        v-for="v in productCate"
        :key="v.id"
        :name="v.name"
        :id="v.id"
        @newCategoryChange="handleNewCategoryChange"
      />
    </div>
  </div>

  <div class="wrapper">
    <div class="d-flex justify-content-between">
      <h4 class="MeAuto">熱銷商品</h4>
      <a class="TitleRwd" href="/product">
        <h5 class="MeAuto">更多<i class="fa-solid fa-chevron-right"></i></h5>
      </a>
    </div>
    <div class="Nutripollcard4">
      <Card3
        v-for="v in hotProduct"
        :key="v.id"
        :id="v.id"
        :name="v.product_name"
        :price="v.product_price"
        :d_price="v.discount_price"
        :image="v.image_urls"
      />
    </div>
  </div>

  <div class="lastIndexContent">
    <div class="card5Main">
      <div class="card5Title">
        <h4 class="MeAuto">熱門課程</h4>
        <a class="TitleRwd">
          <h5 class="MeAuto">更多 <i class="fa-solid fa-chevron-right"></i></h5>
        </a>
      </div>
      <div class="Nutripollcard5">
        <Card4
          v-for="v in hotClass"
          :key="v.class__i_d"
          :id="v.class__i_d"
          :name="v.class_name"
          :speaker_name="v.speaker_name"
          :speaker_title="v.speaker_title"
          :description="v.class_description"
          :price="v.c_price"
          :d_price="v.c_discount_price"
          :date="v.class_date"
          :image="v.image__u_r_l"
        />
      </div>
    </div>
    <div class="card6Main">
      <div class="card6Title">
        <h4 class="MeAuto">精選食譜</h4>
        <a class="TitleRwd">
          <h5 class="MeAuto">更多 <i class="fa-solid fa-chevron-right"></i></h5>
        </a>
      </div>
      <div class="Nutripollcard6">
        <Card5
          v-for="v in recipe"
          :key="v.recipe__i_d"
          :title="v.title__r_name"
          :content="v.content"
          :image="v.image__u_r_l"
          :id="v.recipe__i_d"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { getHomePageInfo } from "../api";
import { ref, onMounted } from "vue";
import IndexCard1 from "./IndexCard1.vue";
import Card2Categories from "./Card2Categories.vue";
import Card3 from "./Card3.vue";
import Card4 from "./Card4.vue";
import Card5 from "./Card5.vue";

const productCate = ref([
  { id: 1, name: "蔬菜" },
  { id: 2, name: "水果" },
  { id: 3, name: "肉類" },
  { id: 4, name: "魚類" },
  { id: 5, name: "蛋類" },
  { id: 6, name: "奶類" },
  { id: 7, name: "素料" },
]);

const cardData = ref([]);
onMounted(async () => {
  try {
    const response = await fetch("/data/index-brand-info.json");
    if (response.ok) {
      cardData.value = await response.json();
    } else {
      console.error("Failed to fetch data:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

const hotProduct = ref([]);
const hotClass = ref([]);
const recipe = ref([]);
const fetchHomeData = async () => {
  try {
    const {
      hotProduct: fetchedHotProduct,
      hotClass: fetchedHotClass,
      recommendedRecipe,
    } = await getHomePageInfo();
    hotProduct.value = fetchedHotProduct;
    hotClass.value = fetchedHotClass;
    recipe.value = recommendedRecipe;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

onMounted(() => {
  fetchHomeData();
});
</script>

<style lang="scss" scoped>
@import "./IndexContent.module.scss";
</style>
