import Navigation from "../nav/index.vue";
import firebase from "firebase";
import { ref } from "@vue/reactivity";
import { db, auth } from "../fb";
import { useRoute } from "vue-router";

const eventname = ref("");
const eventlocation = ref("");
const eventdate = ref("");
const eventtime = ref("");
const eventdescription = ref("");
const imageName = ref("");
const percentage = ref("");
const eventId = ref("");

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
    const route = useRoute();

    console.log(route.params.event);
    eventId.value = route.params.event.toString();

    var docRef = db.collection("events").doc(eventId.value);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          eventname.value = doc.data().event_name;
          eventlocation.value = doc.data().event_location;
          eventdate.value = doc.data().event_date;
          eventtime.value = doc.data().event_time;
          eventdescription.value = doc.data().event_description;
          imageName.value = doc.data().event_image_path;
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    function setProjectFiles(val) {
      const fileList = val.target.files;
      console.log(fileList);

      imageName.value = `img/${auth.currentUser.uid}/${eventname.value.replace(
        /\s/g,
        ""
      )}/${fileList[0].name}`;

      console.log(auth.currentUser.uid);

      let storageRef = firebase
        .storage()
        .ref(
          `img/${auth.currentUser.uid}/${eventname.value.replace(/\s/g, "")}/${
            fileList[0].name
          }`
        );
      let task = storageRef.put(fileList[0]);
      task.on(
        "state_changed",
        function progress(snapshot) {
          let p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          percentage.value = Math.round(p);
          console.log(percentage.value);
          console.log(snapshot);
        },
        function error(err) {
          console.log(err);
        },
        function complete() {
          console.log(imageName.value);
        }
      );
    }

    return {
      setProjectFiles,
      eventname,
      eventlocation,
      eventdate,
      eventtime,
      eventdescription,
      imageName,
      percentage,
    };
  },
  methods: {
    navigateToCreateEvent() {
      this.$router.push({ path: "/add-event" });
    },
    async onClickUpdateEvent() {
      console.log(eventname.value);

      db.collection("events")
        .doc(eventId.value)
        .update({
          event_name: eventname.value,
          event_location: eventlocation.value,
          event_date: eventdate.value,
          event_time: eventtime.value,
          event_description: eventdescription.value,
          event_image_path: imageName.value,
        });

        this.$router.push({ path: "/dashboard" });
    },
  },
};
