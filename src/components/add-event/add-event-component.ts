import Navigation from '../nav/index.vue'

export default {  
  data() {
    return {
      fileList: []
    };
  },
  components: {
    Navigation,
  },
  setup() {
    return {
      
    }
  },
  methods: {
    navigateToCreateEvent() {
      this.$router.push({ path: "/add-event" });
    }
  }
};
