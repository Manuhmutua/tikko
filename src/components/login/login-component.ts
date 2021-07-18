import firebase from "firebase";
import { ref } from "vue";

const viewSwitch = ref(true);

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
      viewSwitch
    }
  },
  methods: {
    sendOtp() {
      if (this.phNo.length != 9) {
        alert("Invalid Phone Number Format !");
      } else {
        //
        let countryCode = "+254"; //kenya
        let phoneNumber = countryCode + this.phNo;
        //
        let appVerifier = this.appVerifier;
        //
        firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then(function(confirmationResult) {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            //
            alert("SMS sent");
            viewSwitch.value = false
          })
          .catch(function(error) {
            console.log(error);
            // Error; SMS not sent
            // ...
            alert("Error ! SMS not sent");
          });
      }
    },
    //
    verifyOtp() {
      if (this.phNo.length != 9 || this.otp.length != 6) {
        alert("Invalid Phone Number/OTP Format !");
      } else {
        //
        let vm = this;
        let code = this.otp;
        //
        window.confirmationResult
          .confirm(code)
          .then(function(result) {
            // User signed in successfully.
            var user = result.user;
            console.log(user);
            // ...
            //route to set password !
            vm.$router.push({ path: "/dashboard" });
          })
          .catch(function(error) {
            console.log(error);
            // User couldn't sign in (bad verification code?)
            // ...
          });
      }
    },
    initReCaptcha() {
      setTimeout(() => {
        let vm = this;
        console.log(vm);
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: function(response) {
              console.log(response);
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              // ...
            },
            "expired-callback": function() {
              // Response expired. Ask user to solve reCAPTCHA again.
              // ...
            },
          }
        );
        //
        this.appVerifier = window.recaptchaVerifier;
      }, 1000);
    },
  },
  created() {
    this.initReCaptcha();
  },
};
