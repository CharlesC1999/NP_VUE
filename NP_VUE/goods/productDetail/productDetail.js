import { createApp } from "vue";
import "/src/reset.scss";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import Toast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const app = createApp(App);

app.mount("#productDetail");
