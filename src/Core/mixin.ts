// Ionic framework
import {
    toastController,
    loadingController,
    actionSheetController,
} from "@ionic/vue";

// Ionic icons importer
import { close, thumbsUp } from "ionicons/icons";

/* Local storage */
import { Storage } from "@ionic/storage";
const store = new Storage();

export default {
    methods: {
        /* TOKEN AUTENTICATION LOGIN BEGIN */
        // App hosy end poin settings Get|set storage
        getAuthToken: async function() {
            await store.create();
            return await store.get("auth_token");
        },
        setAuthToken: async function(token: any) {
            await store.create();
            await store.set("auth_token", token);
            return token;
        },
        // User Ref
        getUser: async function() {
            await store.create();
            return await store.get("auth_user");
        },
        setUser: async function(user: any) {
            await store.create();
            await store.set("auth_user", user);
            return user;
        },
        /* STORAGE CLEAR ACTION START */
        // General clear storage functions
        clearStorage: async function() {
            // Delete all the storage
            await store.create();
            await store.clear();
            return true;
        },
        /* GENERAL USEFULL FUNCTION START */
        // Generic Message
        async openToast(message: string, color = "danger") {
            // Generict toast
            const toast = await toastController.create({
                message: message,
                duration: 2000,
                color: color,
                position: "top",
            });
            return toast.present();
        },
        // Loading actions
        async presentLoading(timeout = 0) {
            const loading = await loadingController.create({
                cssClass: "my-custom-class",
                message: "Please wait...",
                duration: timeout,
            });

            await loading.present();
        },
        async hideLoading() {
            const loading = await loadingController;
            await loading.dismiss();
        },

        // Action confimation
        async presentDeleteAction(dialog = "Are you sure ?") {
            const actionSheet = await actionSheetController.create({
                header: dialog,
                cssClass: "my-custom-class",
                buttons: [
                    {
                        text: "Confirm",
                        role: "true",
                        icon: thumbsUp,
                        handler: () => {
                            console.log("Action", true);
                        },
                    },
                    {
                        text: "Cancel",
                        icon: close,
                        role: "false",
                        handler: () => {
                            console.log("Action ", false);
                        },
                    },
                ],
            });
            await actionSheet.present();

            const { role } = await actionSheet.onDidDismiss();

            return role;
        },
        /* GENERAL USEFULL FUNCTION END */
    },
};
