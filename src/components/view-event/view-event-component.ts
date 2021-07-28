import { ref } from "@vue/reactivity";
import { db } from "../fb";
import { useRoute } from "vue-router";

const event = ref();
const eventId = ref("");

export default {
  data() {
    return {
      fileList: [],
    };
  },
  components: {},
  setup() {
    const route = useRoute();

    console.log(route.params.event);
    eventId.value = route.params.event.toString();

    var docRef = db.collection("events").doc(eventId.value);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          event.value = doc.data();
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    return {
      event,
    };
  },
  methods: {},
};
