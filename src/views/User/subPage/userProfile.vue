<template>
    <div>
        <ion-row>
            <ion-col size="12">
                <ion-text color="secondary">
                    <h1>
                        User profile
                    </h1>
                </ion-text>
            </ion-col>
            <ion-avatar>
                <img :src="this.avatar" />
            </ion-avatar>
            <ion-col size="12">
                <ion-item>
                    <ion-label position="floating">Name</ion-label>
                    <ion-input
                        type="username"
                        :value="username"
                        @ionInput="username = $event.target.value"
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
                <ion-item>
                    <ion-label position="floating">Confirm Password</ion-label>
                    <ion-input
                        type="password"
                        @ionInput="cofirmPassword = $event.target.value"
                    ></ion-input>
                </ion-item>
            </ion-col>
            <ion-col size="12">
                <ion-button expand="full" color="danger"
                  @click="updateUserProfile()"  >Save</ion-button
                >
            </ion-col>
            <ion-col size="12">
                <ion-button expand="full" color="primary" @click="logout()"
                    >Logout</ion-button
                >
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
    name: "user-profile",
    props: {
        editroute: {
            type: String,
            default: "",
        },
    },
    data: function() {
        return {
            username: "",
            password: "",
            cofirmPassword: "",
            avatar: "",
        };
    },
    methods: {
        logout() {
            global.clearStorage();
            global.openToast("by :)");
            setTimeout(async () => {
                // Enable the menu
                //this.emitter.emit("toogle-menu");
                // Send the user to the dash board
                this.$router.push({ name: "login" });
            }, 300);
        },
        async getUserInformation() {
            const sanctumToken = await this.getAuthToken();

            // Header with the sanctum token
            const config = {
                headers: {
                    Authorization: "Bearer " + sanctumToken,
                },
            };
            // Check if the token is valid with the endpoint
            const response = await axios
                .post(configEndpoint.GetUserInfo, {}, config)
                .then((res) => {
                    // On sucess
                    return res.data.data;
                })
                .catch((err) => {
                    return false;
                });
            this.username = response.name;
            this.avatar = response.avatar;
            // Add the user to the local storage
            this.setUser(response);
        },
        async updateUserProfile() {
            // First put loading state
            global.presentLoading();

            const sanctumToken = await global.getAuthToken();

            // Header with the sanctum token
            const config = {
                headers: {
                    Authorization: "Bearer " + sanctumToken,
                },
            };

            const response = await axios
                .post(configEndpoint.UpdateUserProfile, {
                    name: this.username,
                    password: this.password,
                    confirmPassword: this.cofirmPassword,
                }, config)
                .then(function(response) {
                    return response.data;
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
                console.log(response);
            }
        },
    },
    computed: {},
    created() {
        this.getUserInformation();
    },
};
</script>
<style></style>
