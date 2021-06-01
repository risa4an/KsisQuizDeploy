import View from "../View.js";

const resultsNode = document.getElementById('main');

export default {
    render(){
        resultsNode.innerHTML = View.render('register');
        const form = document.getElementById("registerForm");
        form.onsubmit = function (evt){
            evt.preventDefault();
            firebase.auth().createUserWithEmailAndPassword(form.elements.email.value, form.elements.password.value)
                .then((userCredential) => {
                    // Signed in
                    let user = userCredential.user;
                    user.updateProfile({displayName: form.elements.username.value});
                    document.getElementById("usernameHeader").innerText = form.elements.username.value;
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
    },

}