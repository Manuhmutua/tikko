import { ref } from "vue";

const mobileMenuOpen = ref(true);

export default {
  data() {
    return {
      phNo: "",
      appVerifier: "",
      otp: "",
    };
  },
  setup() {
    return {
      mobileMenuOpen,
    };
  },
};
