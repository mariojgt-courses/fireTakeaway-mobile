<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>{{ $route.params.id }}</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">{{ $route.params.id }}</ion-title>
                </ion-toolbar>
            </ion-header>

            <div id="container">
                <ion-slides pager="true" :options="slideOpts">
                    <!-- Beging User profile  -->
                    <ion-slide>
                        <userProfile> </userProfile>
                    </ion-slide>
                    <!-- End User profile  -->
                    <!-- Begin order creation -->
                    <ion-slide>
                        <addOrder> </addOrder>
                    </ion-slide>
                    <!-- End order creation -->
                    <!-- Begin My order -->
                    <ion-slide>
                        <myOrder> </myOrder>
                    </ion-slide>
                    <!-- End My order -->
                </ion-slides>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import addOrder from "./subPage/addOrder";
import userProfile from "./subPage/userProfile";
import myOrder from "./subPage/myOrder";

import {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/vue";

export default {
    name: "Folder",
    components: {
        IonButtons,
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        // My components
        addOrder,
        userProfile,
        myOrder,
    },
    methods: {},
};
</script>

<style scoped>
#container {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

#container strong {
    font-size: 20px;
    line-height: 26px;
}

#container p {
    font-size: 16px;
    line-height: 22px;
    color: #8c8c8c;
    margin: 0;
}

#container a {
    text-decoration: none;
}
</style>
