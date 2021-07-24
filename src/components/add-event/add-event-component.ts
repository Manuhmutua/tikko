import Navigation from "../nav/index.vue";
import firebase from "firebase";
import { ref } from "@vue/reactivity";
import { db, auth } from "../fb";

const eventname = ref("");
const eventlocation = ref("");
const eventdate = ref("");
const eventtime = ref("");
const eventdescription = ref("");
const imageName = ref("");
const percentage = ref();

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
    function setProjectFiles(val) {
      const fileList = val.target.files;
      console.log(fileList);

      const storage = firebase.storage();

      // imageName.value = `img/${auth.currentUser.uid}/${eventname.value.replace(
      //   /\s/g,
      //   ""
      // )}/${fileList[0].name}`;

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

          storage
            .ref(
              `img/${auth.currentUser.uid}/${eventname.value.replace(
                /\s/g,
                ""
              )}/${fileList[0].name}`
            )
            .getDownloadURL()
            .then((url) => {
              // Do something with the URL ...
              console.log(url);
              imageName.value = url;
            });
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
    async onClickSaveEvent() {
      console.log(eventname.value);

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
          eventname.value = "";
          eventlocation.value = "";
          eventdate.value = "";
          eventtime.value = "";
          eventdescription.value = "";
          imageName.value = "";
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    },
  },
};
