import Navigation from "../nav/index.vue";
import firebase from "firebase";
import { ref } from "@vue/reactivity";

const eventname = ref("");
const eventlocation = ref("");
const eventdate = ref("");
const eventtime = ref("");
const eventdescription = ref("");
const imageName = ref("");

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

    let auth = firebase.auth();

    function setProjectFiles(val) {
      const fileList = val.target.files;
      console.log(fileList);

      imageName.value = `img/${auth.currentUser.uid}/${fileList[0].name}`;

      console.log(auth.currentUser.uid)

      let storageRef = firebase.storage().ref(`img/${auth.currentUser.uid}/${fileList[0].name}`);
      let task = storageRef.put(fileList[0]);
      task.on(
        "state_changed",
        function progress(snapshot) {
          let percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(percentage);
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
    };
  },
  methods: {
    navigateToCreateEvent() {
      this.$router.push({ path: "/add-event" });
    },
    async onClickSaveEvent() {
      console.log(eventname.value);

      let db = firebase.firestore();

      db.collection("events")
        .add({
          event_name: eventname.value,
          event_location: eventlocation.value,
          event_date: eventdate.value,
          event_time: eventtime.value,
          event_description: eventdescription.value,
          event_image_path: imageName.value,
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    },
  },
};
