<template>
    <div>
        <ion-row>
            <ion-col size="12">
                <ion-text color="secondary">
                    <h1>
                        Order Creation
                    </h1>
                </ion-text>
            </ion-col>

            <!-- Product Search -->
            <ion-col size="12">
                <ion-item>
                    <ion-label position="floating">search</ion-label>
                    <ion-input
                        type="text"
                        @ionInput="search = $event.target.value"
                    ></ion-input>
                </ion-item>
            </ion-col>

            <ion-col size="12">
                <ion-button
                    expand="full"
                    @click="productlookup()"
                    color="primary"
                    >Search</ion-button
                >
            </ion-col>

            <!-- Product List -->
            <ion-text color="secondary">
                <h1>
                    Avaliable Products
                </h1>
            </ion-text>
            <ion-col size="12">
                <ion-list>
                    <ion-item v-for="(item, index) in products" :key="index">
                        <ion-avatar>
                            <img :src="item.img_path" />
                        </ion-avatar>
                        <ion-label>{{ item.name }}</ion-label>
                        <ion-label>{{ item.price }}</ion-label>
                        <ion-button
                            expand="full"
                            color="primary"
                            @click="addProductToOrder(item)"
                            >Add to Order</ion-button
                        >
                    </ion-item>
                </ion-list>
            </ion-col>
            <ion-text color="secondary">
                <h1>
                    Added Products
                </h1>
            </ion-text>
            <!-- Added product list -->
            <ion-col size="12">
                <ion-list>
                    <ion-item
                        v-for="(item, index) in addedProducts"
                        :key="index"
                    >
                        <ion-avatar>
                            <img :src="item.img_path" />
                        </ion-avatar>
                        <ion-label>{{ item.name }}</ion-label>
                        <ion-label>{{ item.price }}</ion-label>
                        <ion-button
                            expand="full"
                            color="danger"
                            @click="removeProductFromOrder(index)"
                            >Remove</ion-button
                        >
                    </ion-item>
                </ion-list>
            </ion-col>
            <!-- COnfirm order -->
            <ion-col size="12">
                <ion-button expand="full" color="primary" @click="cofirmOrder()"
                    >Confirm</ion-button
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
    name: "add-order",
    props: {
        editroute: {
            type: String,
            default: "",
        },
    },
    data: function() {
        return {
            search: "",
            products: [],
            addedProducts: [],
        };
    },
    methods: {
        async productlookup() {
            // First put loading state
            this.presentLoading();

            const sanctumToken = await this.getAuthToken();

            // Header with the sanctum token
            const config = {
                headers: {
                    Authorization: "Bearer " + sanctumToken,
                },
            };
            // where i do the request
            const response = await axios
                .post(
                    configEndpoint.ProductSearch,
                    {
                        search: this.search,
                    },
                    config
                )
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
                    this.hideLoading();
                });

            this.hideLoading();
            // If not empty display the good message
            if (response) {
                this.products = response.data;
            }
        },
        addProductToOrder(productRef) {
            // Add the value to a temp array
            this.addedProducts.push(productRef);
        },
        removeProductFromOrder(index) {
            // Remove the item from the array
            this.addedProducts.splice(index, 1);
        },
        async cofirmOrder () {

            // User ref
            const userInfo = await this.getUser();

            if (this.addedProducts[0]) {

            // First put loading state
            this.presentLoading();

            const sanctumToken = await this.getAuthToken();

            // Header with the sanctum token
            const config = {
                headers: {
                    Authorization: "Bearer " + sanctumToken,
                },
            };
            // where i do the request
            const response = await axios
                .post(
                    configEndpoint.CreateOrder,
                    {
                        products: this.addedProducts, // Products
                        userid  : userInfo.id, // Use ref
                    },
                    config
                )
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
                    this.hideLoading();
                });

            this.hideLoading();
            // If not empty display the good message
            if (response) {
                this.openToast('Order placed.', 'primary');
            }

            } else {
                this.openToast('Sorry you need to add a item to the order.');
            }
        }
    },
    computed: {},
};
</script>
<style></style>
