import Navigation from "../nav/index.vue";
import firebase from "firebase";

function setProjectFiles(val) {
  const fileList = val.target.files;
  console.log(fileList);

  let storageRef = firebase.storage().ref("img/" + fileList[0].name);
  var task = storageRef.put(fileList[0]);
  task.on(
    "state_changed",
    function progress(snapshot) {
      var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(percentage);
    },
    function error(err) {
      console.log(err);
    },
    function complete() {}
  );
}

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
    return {
      setProjectFiles,
    };
  },
  methods: {
    navigateToCreateEvent() {
      this.$router.push({ path: "/add-event" });
    },
  },
};
