<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>Login</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Login</ion-title>
                </ion-toolbar>
            </ion-header>

            <div id="container">
                <ion-slides pager="true" :options="slideOpts">
                    <!-- Beging Login  -->
                    <ion-slide>
                        <LoginSlide> </LoginSlide>
                    </ion-slide>
                    <!-- End Login  -->

                    <!-- Begin User Registration -->
                    <ion-slide>
                        <Register> </Register>
                    </ion-slide>
                    <!-- End User Registration -->

                    <ion-slide>
                        <ion-row>
                            <ion-col size="12">
                                <ion-text color="secondary">
                                    <h1>
                                        Fire Settings
                                    </h1>
                                </ion-text>
                            </ion-col>
                            <ion-col size="12">
                                <ion-item>
                                    <ion-label position="floating"
                                        >Url</ion-label
                                    >
                                    <ion-input type="text"></ion-input>
                                </ion-item>
                            </ion-col>
                            <ion-col size="12">
                                <ion-button expand="full">Save</ion-button>
                            </ion-col>
                        </ion-row>
                    </ion-slide>
                </ion-slides>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
// The Register page
import Register from "./subPage/register";
import LoginSlide from "./subPage/loginSlide";

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
    name: "Login",
    components: {
        IonButtons,
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        // My components
        Register,
        LoginSlide,
    },
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
