import Navigation from "../nav/index.vue";
import { db } from "../fb";
import firebase from "firebase";
import { ref } from "@vue/reactivity";

// const events = [
//   {
//     name: "The Event Title",
//     location: "The Location of the Event",
//     date: "17th May 2020 at 3:00PM",
//     tickets: "20",
//     description:
//       "Some very long or short Event description for the purposes of explaining the event in more detail",
//     image:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
//   },
//   // More people...
// ];

const events = ref([]);
const images = ref([]);

export default {
  data() {
    return {};
  },
  components: {
    Navigation,
  },
  setup() {

    events.value = []
    images.value = []

    db.collection("events")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data().event_name}`);
          events.value.push(doc.data());

          const storage = firebase.storage()

          storage
            .ref(doc.data().event_image_path)
            .getDownloadURL()
            .then((url) => {
              // Do something with the URL ...
              console.log(url)
              images.value.push(url)
            });
        });
        console.log(events.value);
      });

    
    return {
      events,
      images
    };
  },
  methods: {
    navigateToCreateEvent() {
      this.$router.push({ path: "/add-event" });
    },
  },
};
