const db = firebase.firestore();
import Router from "./Router.js";
(async () => {
    try {
        Router.init();

    } catch (e) {
        console.error(e);
        alert('Error: ' + e.message);
    }
})();