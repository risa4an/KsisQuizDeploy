
import Router from "./Router.js";
(async () => {
    try {
        let user = await firebase.auth().currentUser;

        if (user) {
            document.getElementById("usernameHeader").innerText = user.displayName;
            document.getElementById("userIcon").style.visibility = "visible";
            document.getElementById("userIconAdd").style.visibility = "hidden";
        } else {
        }
        Router.init();

    } catch (e) {
        console.error(e);
        alert('Error: ' + e.message);
    }
})();