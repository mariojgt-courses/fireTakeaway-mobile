<template>
    <div>
        <ion-row>
            <ion-col size="12">
                <ion-text color="secondary">
                    <h1>
                        Fire Create Account
                    </h1>
                </ion-text>
            </ion-col>
            <ion-col size="12">
                <ion-item>
                    <ion-label position="floating">Name</ion-label>
                    <ion-input
                        type="text"
                        @ionInput="name = $event.target.value"
                    ></ion-input>
                </ion-item>
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
                <ion-button expand="full" @click="submitData()"
                    >Create Account</ion-button
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
    name: "register",
    props: {
        editroute: {
            type: String,
            default: "",
        },
    },
    data: function() {
        return {
            name: "",
            email: "",
            password: "",
        };
    },
    methods: {
        async submitData() {
            // First put loading state
            global.presentLoading();
            // Do the Request And wait for the response
            const response = await axios
                .post(configEndpoint.RegisterApi, {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                })
                .then(function(response) {
                    return response.data.data;
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
                global.openToast(response, 'success');
            }
        },
    },
    computed: {},
};
</script>
<style></style>
