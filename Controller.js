import Model from './Model.js';
import gamesPage from './pages/games.js';
import createGamePage from "./pages/createGame.js";
import addQuestionsPage from "./pages/addQuestions.js";
import playGamePage from "./pages/playGame.js";

export default {
    async gamesRoute(params){
        const games = await Model.getGames();
        gamesPage.setData(games);
        gamesPage.render();
    },
    async createGameRoute(params){
        if (params.id == 'new'){
            const id = await Model.putNewGame(createGamePage.getData());

            window.location.href = window.location.href.split('/').slice(0, -2).join('/')
                + '#addQuestions/' + id;
            // window.location.href = window.location.href.split('/').slice(0, -2).join('/')
            //     + '/#addQuestions/' + id;
        } else {

            createGamePage.setData([]);
            createGamePage.render();
            // document.getElementById("createGame").addEventListener('submit', function(){
            //     window.location.href=window.location.href+'/new';
            // })
        }
    },
    async addQuestionsRoute(params){
        addQuestionsPage.render(params.id);
    },
    async playGameRoute(params){
        playGamePage.render(params.id);
    }

}