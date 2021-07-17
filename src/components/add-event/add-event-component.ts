import Navigation from "../nav/index.vue";
import { saveEventBanner } from "../api";
import { ref } from "vue";

const documents = ref<FileList>([]);

export default {
  data() {
    return {
      fileList: [],
    };
  },
  components: {
    Navigation,
  },
  setup() {
    function setProjectFiles(val: Event) {
      
      const element = val.target as HTMLInputElement;

      documents.value = element.files || undefined;

      if (documents.value !== undefined)
        saveEventBanner(`test`, documents.value);
    }

    return {
      documents,
      setProjectFiles
    };
  },
  methods: {
    navigateToCreateEvent() {
      this.$router.push({ path: "/add-event" });
    },
  },
};
