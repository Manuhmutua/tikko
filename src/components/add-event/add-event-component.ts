import Navigation from "../nav/index.vue";
import firebase from "firebase";
import { ref } from "@vue/reactivity";
// import { auth, eventsCollection } from "../firebase/index.ts";

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

    const eventname = ref("");
    const eventlocation = ref("");
    const eventdate = ref("");
    const eventime = ref("");
    const evendescription = ref("");

    function setProjectFiles(val) {
      const fileList = val.target.files;
      console.log(fileList);

      // const newEventKey = eventsCollection.push().key;
      // let eventData = {
      //   event_name: eventname.value,
      //   event_location: eventlocation.value,
      //   event_date: eventdate.value,
      //   event_time: eventime.value,
      //   event_description: evendescription.value,
      //   modified_at: Date.now(),
      //   created_by: auth.currentUser,
      // };
      // const updates = {};
      // updates[`${newEventKey}`] = eventData;
      // eventsCollection.update(updates);

      let storageRef = firebase
        .storage()
        .ref(`img/${fileList[0].name}`);
      var task = storageRef.put(fileList[0]);
      task.on(
        "state_changed",
        function progress(snapshot) {
          var percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(percentage);
        },
        function error(err) {
          console.log(err);
        },
        function complete() {}
      );
    }

    return {
      setProjectFiles,
      eventname,
      eventlocation,
      eventdate,
      eventime,
      evendescription,
    };
  },
  methods: {
    navigateToCreateEvent() {
      this.$router.push({ path: "/add-event" });
    },
  },
};
