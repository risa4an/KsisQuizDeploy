const db = firebase.firestore();
import Router from "./Router.js";
(async () => {
    try {
        const data = {

            5:{
                gameImage: "'img/download20210403221014.png'",
                gameName: "ANIME",
                gameCreator: "Kate",
                numOfQuestions: 10,
                gameId: 5,
                questions: []
            }
        };
        if (!localStorage.games) {
            localStorage.setItem('games', JSON.stringify(data));
        }
        Router.init();

    } catch (e) {
        console.error(e);
        alert('Error: ' + e.message);
    }
})();