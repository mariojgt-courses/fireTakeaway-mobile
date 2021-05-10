<template>
    <div>
        <ion-row>
            <ion-col size="12">
                <ion-text color="secondary">
                    <h1>
                        My Order
                    </h1>
                </ion-text>
            </ion-col>

            <!-- Order List -->
            <ion-text color="secondary">
                <h1>
                    My Orders
                </h1>
            </ion-text>
            <ion-col size="12">
                <ion-list>
                    <ion-item v-for="(item, index) in data" :key="index">
                        <ion-label>{{ item.user.name }}</ion-label>
                        <ion-label>{{ item.created_at }}</ion-label>
                        <ion-badge color="success">{{
                            item.status.name
                        }}</ion-badge>
                    </ion-item>
                </ion-list>
            </ion-col>
            <ion-col size="12">
                <ion-button
                    expand="full"
                    color="primary"
                    @click="getUserOrders()"
                    >Reload</ion-button
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

export default {
    name: "my-order",
    props: {
        editroute: {
            type: String,
            default: "",
        },
    },
    data: function() {
        return {
            data: [],
        };
    },
    methods: {
        async getUserOrders() {
            // User ref
            const userInfo = await this.getUser();

            // First put loading state
            //this.presentLoading();

            const sanctumToken = await this.getAuthToken();

            // Header with the sanctum token
            const config = {
                headers: {
                    Authorization: "Bearer " + sanctumToken,
                },
            };
            // where i do the request
            const response = await axios
                .get(configEndpoint.getUserOrders, config)
                .then(function(response) {
                    return response.data;
                })
                .catch((err) => {
                    // Create empty String
                    let message = "";
                    // Loop the error
                    for (const [key, value] of Object.entries(
                        err.response.data.errors
                    )) {
                        message += value + "<br> ";
                    }
                    this.openToast(message);
                    //this.hideLoading();
                });

            //this.hideLoading();
            // If not empty display the good message
            if (response) {
                this.data = response.data;
            }
        },
    },
    computed: {},
    mounted() {
        // Get the order list
        this.getUserOrders();
        // Set a time out and get the order status each 5 sec
        setInterval(() => {
            this.getUserOrders();
        }, 5000);
    },
};
</script>
<style></style>
