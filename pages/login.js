import View from "../View.js";

const resultsNode = document.getElementById('main');

export default {
    render(){
        resultsNode.innerHTML = View.render('login');
        const form = document.getElementById("loginForm");
        form.onsubmit = function (evt){
            evt.preventDefault();
            firebase.auth().signInWithEmailAndPassword(form.elements.email.value, form.elements.password.value)
                .then((userCredential) => {
                    // Signed in
                    let user = userCredential.user;
                    document.getElementById("usernameHeader").innerText = user.displayName;
                    document.getElementById("userIcon").style.visibility = "visible";
                    document.getElementById("userIconAdd").style.visibility = "hidden";
                    window.location.href = "/#games";
                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ..
                });
        }
    }
}