import axios from "axios";

const instance = axios.create({
  baseURL: falcon_seo_obj.api_base,
  timeout: 5000,
  headers: { "X-WP-Nonce": falcon_seo_obj.nonce },
});

export default instance;
