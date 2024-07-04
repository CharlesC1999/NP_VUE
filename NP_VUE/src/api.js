import axios from "axios";

const apiBaseUrl = "http://localhost:3005/api";
const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 8000,
  withCredentials: true,
});

// fetcher for swr
export const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

export const fetchWithToken = (url, token) => {
  return axiosInstance.get(`${url}&${token}`).then((res) => res.data);
};

export const fetcherWithObject = ({ url, args }) => {
  const extraParams = new URLSearchParams(args);
  const andSymbol = extraParams.toString() ? "&" : "";
  const combinedUrl = url + andSymbol + extraParams.toString();
  console.log(combinedUrl);
  return axiosInstance.get(combinedUrl).then((res) => res.data);
};

export const getHomePageInfo = async () => {
  try {
    const res = await axiosInstance.get("/homepage");
    const { data: dataHomePage } = res;
    if (dataHomePage.status !== "success") {
      throw new Error("Recipe API returned an error: " + dataHomePage.message);
    }
    return {
      hotProduct: dataHomePage.data.hotProduct,
      hotClass: dataHomePage.data.hotClass,
      recommendedRecipe: dataHomePage.data.recommendedRecipe,
      productCate: dataHomePage.data.productCate,
    };
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  }
};

export default axiosInstance;
