<template>
    <div>
        <ion-row>
            <ion-col size="12">
                <ion-text color="secondary">
                    <h1>
                        Fire Login
                    </h1>
                </ion-text>
            </ion-col>
            <ion-col size="12">
                <ion-item>
                    <ion-label position="floating">Email</ion-label>
                    <ion-input
                        type="email"
                        @ionInput="email = $event.target.value"
                    ></ion-input>
                </ion-item>
            </ion-col>
            <ion-col size="12">
                <ion-item>
                    <ion-label position="floating">Password</ion-label>
                    <ion-input
                        type="password"
                        @ionInput="password = $event.target.value"
                    ></ion-input>
                </ion-item>
            </ion-col>
            <ion-col size="12">
                <ion-button expand="full" @click="doLogin()">Login</ion-button>
            </ion-col>
        </ion-row>
    </div>
</template>
<script>
/* Axios import */
import axios from "axios";
// Import the reference
import * as configEndpoint from "../../../Core/apiEndpoint";

// Importing some global classes
import * as global from "../../../Core/mixin";

export default {
    name: "login-slide",
    data: function() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        async doLogin() {
            // First put loading state
            global.presentLoading();
            // Do the Request And wait for the response
            const response = await axios
                .post(configEndpoint.LoginApi, {
                    email: this.email,
                    password: this.password,
                })
                .then(function(response) {
                    return response.data.raw_token;
                })
                .catch((err) => {
                    // Create empty String
                    let message = "";
                    // Loop the error
                    for (const [key, value] of Object.entries(
                        err.response.data
                    )) {
                        message += value + "<br> ";
                    }
                    global.openToast(message);
                    global.hideLoading();
                });
            global.hideLoading();
            // If not empty display the good message
            if (response) {
                // Auth token response
                global.setAuthToken(response);
                // Redirect to the login page
                setTimeout(async () => {
                    // Enable the menu
                    //this.emitter.emit("toogle-menu");
                    // Send the user to the dash board
                    this.$router.push({ name: "user_home" });
                }, 300);
            }
        },
        async testToken() {
            console.log(await global.getAuthToken());
        },
    },
    computed: {},
    created() {
        this.testToken();
    },
};
</script>
<style></style>
